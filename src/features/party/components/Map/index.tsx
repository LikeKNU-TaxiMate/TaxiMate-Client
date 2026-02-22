import { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';

import MarkerContainer from '@/components/common/MarkerContainer';
import NoData from '@/components/common/NoData.tsx';
import {
  OpenOtherAppBox,
  OpenOtherMapAppBtn,
} from '@/features/party/styles/partyMapStyles.ts';

interface Props {
  taxiRoute: { latitude: number; longitude: number }[];
  handleOpenNaverMapApp: VoidFunction;
  handleOpenKakaoTaxiApp: VoidFunction;
}

const Map = ({
  taxiRoute,
  handleOpenNaverMapApp,
  handleOpenKakaoTaxiApp,
}: Props) => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const polylinePath = taxiRoute.map(
    (item) => new navermaps.LatLng(item.latitude, item.longitude)
  );

  map &&
    new naver.maps.Polyline({
      map: map,
      path: polylinePath,
    });

  // 첫 번째와 마지막 위치에 출발, 도착 마커 표시
  const markerPlaces = [polylinePath[0], polylinePath[polylinePath.length - 1]];
  const bounds = new navermaps.LatLngBounds(markerPlaces[0], markerPlaces[1]);
  const markerId = (index: number) => (index === 0 ? 'origin' : 'destination');

  useEffect(() => {
    for (let i = 1; i < polylinePath.length - 1; i += 2) {
      bounds.extend(polylinePath[i]);
    }
  }, []);

  return markerPlaces[0] ? (
    <MapDiv className={'map-wrapper'}>
      <OpenOtherAppBox>
        <OpenOtherMapAppBtn onClick={handleOpenKakaoTaxiApp}>
          <img
            width={19}
            src={'/kakao-taxi-logo.png'}
            alt={'kakao-taxi-logo'}
            style={{ margin: '1px' }}
          />
        </OpenOtherMapAppBtn>
        <OpenOtherMapAppBtn onClick={handleOpenNaverMapApp}>
          <img width={20} src={'/naver-map-logo.png'} alt={'naver-map-logo'} />
        </OpenOtherMapAppBtn>
      </OpenOtherAppBox>
      <NaverMap defaultBounds={bounds} ref={setMap} logoControl={false}>
        {markerPlaces.map((item, index) => (
          <MarkerContainer
            key={markerId(index)}
            id={markerId(index)}
            position={{ longitude: item.x, latitude: item.y }}
            title={index === 0 ? '출발' : '도착'}
            anchor={[22, 53]}
            showPlace={false}
            activeMarker={null}
          />
        ))}
      </NaverMap>
    </MapDiv>
  ) : (
    <NoData style={{ margin: 'auto' }}>경로 데이터를 찾을 수 없습니다</NoData>
  );
};

export default Map;
