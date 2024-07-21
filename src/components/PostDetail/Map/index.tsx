import { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';

import { usePolylinePathData } from '@/constants';
import MarkerContainer from '@/components/common/MarkerContainer';

const Map = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const polylinePath = usePolylinePathData();

  const navermaps = useNavermaps();
  map &&
    new naver.maps.Polyline({
      map: map,
      path: polylinePath,
    });

  const markerPlaces = [polylinePath[0], polylinePath[polylinePath.length - 1]];

  const bounds = new navermaps.LatLngBounds(
    polylinePath[0],
    polylinePath[polylinePath.length - 1]
  );

  useEffect(() => {
    for (let i = 1; i < polylinePath.length - 1; i += 2) {
      bounds.extend(polylinePath[i]);
    }
  }, []);

  return (
    <MapDiv className={'map-wrapper'}>
      <NaverMap defaultBounds={bounds} ref={setMap} logoControl={false}>
        {markerPlaces.map((item, index) => (
          <MarkerContainer
            key={index === 0 ? 'origin' : 'destination'}
            id={index === 0 ? 'origin' : 'destination'}
            position={{ longitude: item.x, latitude: item.y }}
            title={index === 0 ? '출발' : '도착'}
            anchor={[22, 53]}
            showPlace={false}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
