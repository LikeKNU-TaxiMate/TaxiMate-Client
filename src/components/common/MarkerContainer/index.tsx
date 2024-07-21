import { useDispatch, useSelector } from 'react-redux';
import { Marker, useNavermaps } from 'react-naver-maps';

import { RootState } from '@/store';
import { MarkerContainerProps } from '@/types/props';

import { setActiveMarker } from '@/components/Home/Map/MapSlice.ts';

const MarkerContainer = ({
  position,
  title,
  id,
  anchor,
  showPlace,
}: MarkerContainerProps) => {
  const naverMaps = useNavermaps();

  const dispatch = useDispatch();
  const activeMarker = useSelector(
    (state: RootState) => state.mapSlice.activeMarker
  );

  return (
    <Marker
      position={new naverMaps.LatLng(position.latitude, position.longitude)}
      title={title}
      icon={{
        content: MarkerIcon(id, title, activeMarker, showPlace),
        anchor: [anchor[0], anchor[1]],
      }}
      onClick={(e) => {
        if (showPlace) {
          e.pointerEvent.stopPropagation();
          dispatch(setActiveMarker(id));
        }
      }}
    />
  );
};

export default MarkerContainer;

const MarkerIcon = (
  id: string,
  title: string,
  activeMarker: null | string,
  showPlace: boolean
) => {
  const content = showPlace ? `${title}<span> 도착</span>` : title;

  const isActive =
    activeMarker === null
      ? 'activeMarker'
      : activeMarker === id
        ? 'activeMarker'
        : 'nonActiveMarker';

  return `
    <div class="marker-icon-container ${isActive}">
      <div class="marker-content-box">
        ${content}
      </div>
      <div class="marker-bottom-triangle"></div>
    </div>
  `;
};
