import { Container as MapDiv, NaverMap } from 'react-naver-maps';
import { useDispatch } from 'react-redux';
import { HomeMapProps } from '@/types/props';
import MarkerContainer from '@/components/common/MarkerContainer';
import { setCenterLocation } from '@/components/Home/Map/HomeMapSlice.ts';

const Map = ({
  map,
  setMap,
  setActiveButton,
  activeMarker,
  setActiveMarker,
  setShowResearchButton,
  data,
  centerLocation,
}: HomeMapProps) => {
  const dispatch = useDispatch();

  const onCenterChangedFunc = async () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();
    dispatch(setCenterLocation({ lat: y, lng: x }));

    // 내 위치로 이동 버트 비활성화
    setActiveButton(false);
    setShowResearchButton(true);
  };

  return (
    <MapDiv
      className={'map-wrapper'}
      onClick={() => {
        setActiveMarker(null);
      }}
      onMouseUp={onCenterChangedFunc}
      onTouchEnd={onCenterChangedFunc}
    >
      <NaverMap
        defaultCenter={centerLocation}
        defaultZoom={15}
        minZoom={12}
        ref={setMap}
        logoControl={false}
        onZoomChanged={onCenterChangedFunc}
      >
        {data.map((item) => (
          <MarkerContainer
            key={item.id}
            id={item.id}
            position={item.originLocation}
            title={item.destination}
            anchor={[item.destination.length * 6 + 22, 53]}
            showPlace
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
