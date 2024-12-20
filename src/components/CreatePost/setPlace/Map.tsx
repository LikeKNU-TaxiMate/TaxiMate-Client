import { Container as MapDiv, NaverMap } from 'react-naver-maps';

import {
  Main,
  MarkerContainer,
} from '@/components/CreatePost/setPlace/setPlace.style.ts';

const Map = ({
  map,
  setMap,
  setAddressInfo,
  defaultCenter,
  isOrigin,
}: {
  map: naver.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<naver.maps.Map | null>>;
  setAddressInfo: (lng: number, lat: number) => void;
  defaultCenter: { lat: number; lng: number };
  isOrigin: boolean;
}) => {
  const content = isOrigin ? '출발' : '도착';

  const onCenterChangedFunc = async () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();
    setAddressInfo(x, y);
  };

  return (
    <Main>
      <Marker content={content} />
      <MapDiv
        className={'map-wrapper'}
        onTouchEnd={onCenterChangedFunc}
        onMouseUp={onCenterChangedFunc}
      >
        <NaverMap
          ref={setMap}
          defaultCenter={defaultCenter}
          defaultZoom={15}
          minZoom={15}
          logoControl={false}
          onZoomChanged={onCenterChangedFunc}
        ></NaverMap>
      </MapDiv>
    </Main>
  );
};

export default Map;

const Marker = ({ content }: { content: string }) => {
  return (
    <MarkerContainer>
      <div className='marker-icon-container'>
        <div className='marker-content-box'>{content}</div>
        <div className='marker-bottom-triangle'></div>
      </div>
    </MarkerContainer>
  );
};
