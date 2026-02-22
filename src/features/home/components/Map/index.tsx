import { useEffect } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Container as MapDiv, NaverMap } from 'react-naver-maps';
import { SetActiveMarker, Location } from '@/types';
import { Party } from '@/types/party.ts';

import { setCenterLocation } from './HomeMapSlice.ts';
import getCurrentLocation from '@/utils/location/getCurrentlocation.ts';
import MarkerContainer from '@/components/common/MarkerContainer';
import UserCurrentLocationMarker from '@/components/common/UserCurrentLocationMarker';

interface HomeMapProps {
  map: naver.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<naver.maps.Map | null>>;
  setIsActiveMyLocationButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResearchButton: React.Dispatch<React.SetStateAction<boolean>>;
  isActivePostItem: string | null;
  setIsActivePostItem: SetActiveMarker;
  data: Party[];
  userLocation: Location | null;
  isFirstLoading: boolean;
}

const Map = ({
  map,
  setMap,
  setIsActiveMyLocationButton,
  isActivePostItem,
  setIsActivePostItem,
  setShowResearchButton,
  data,
  userLocation,
  isFirstLoading,
}: HomeMapProps) => {
  const dispatch = useDispatch();
  const centerLocation = useSelector(
    (state: RootState) => state.homeMapSlice.centerLocation
  );

  const onCenterChangedFunc = async () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();
    dispatch(setCenterLocation({ lat: y, lng: x }));

    // 내 위치로 이동 버트 비활성화
    setIsActiveMyLocationButton(false);
    setShowResearchButton(true);
  };

  useEffect(() => {
    if (isFirstLoading) return;
    const isMatch = async () => {
      try {
        const { lat, lng } = await getCurrentLocation();
        if (!(centerLocation.lat === lat && centerLocation.lng === lng)) {
          setIsActiveMyLocationButton(false);
        }
      } catch (e) {
        setIsActiveMyLocationButton(false);
      }
    };
    isMatch();
  }, []);

  return (
    <MapDiv
      className={'map-wrapper'}
      onClick={() => {
        setIsActivePostItem(null);
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
        {userLocation && <UserCurrentLocationMarker position={userLocation} />}
        {data.map((item) => (
          <MarkerContainer
            key={item.id}
            id={item.id}
            position={item.originLocation}
            title={item.destination}
            anchor={[item.destination.length * 6 + 22, 53]}
            showPlace
            activeMarker={isActivePostItem}
            setActiveMarker={setIsActivePostItem}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
