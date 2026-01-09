import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavermaps } from 'react-naver-maps';

import { useLazyGetPostsQuery } from '@/api/postApi.ts';
import { defaultLocation } from '@/utils/location/getCurrentlocation.ts';
import { Location } from '@/types';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import Footer from '@/components/common/Layout/Footer';
import LoadingIcon from '@/components/common/LoadingIcon';

import Map from '@/domains/Home/components/Map';
import PostList from '@/domains/Home/components/PostList';
import { Main } from '@/domains/Home/components/Map/Map.style.ts';
import SearchBar from '@/domains/Home/components/SearchBar';
import ResearchButton from '@/domains/Home/components/ResearchButton';
import MoveCurrentLocationButton from '@/domains/Home/components/MoveCurrentLocationButton';
import useWatchLocation from '@/domains/Home/hooks/useWatchLocation.ts';
import { setCenterLocation } from '@/domains/Home/components/Map/HomeMapSlice.ts';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';

let isFirstLoading = true;

const HomePage = () => {
  const naverMaps = useNavermaps();
  const dispatch = useDispatch();
  const { userLocation } = useWatchLocation();

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isActiveMyLocationButton, setIsActiveMyLocationButton] =
    useState<boolean>(true);
  const [isActivePostItem, setIsActivePostItem] = useState<string | null>(null);
  const [postListHeight, setPostListHeight] = useState(0);
  const [showResearchButton, setShowResearchButton] = useState(false);
  const [trigger, { data, isLoading: getPostsIsLoading }] =
    useLazyGetPostsQuery();

  const getPostsQueryTrigger = () => {
    if (map) {
      const bounds = map.getBounds();

      const coords = {
        minLatitude: bounds.minY(),
        minLongitude: bounds.minX(),
        maxLatitude: bounds.maxY(),
        maxLongitude: bounds.maxX(),
      };

      trigger(coords);
      setShowResearchButton(false);
    }
  };

  const updateMapCenter = (map: naver.maps.Map | null, location: Location) => {
    if (map) {
      const latLng = new naverMaps.LatLng(location);
      map.setCenter(latLng);
      dispatch(setCenterLocation(location));
    }
  };

  const centerMapToUserLocation = (
    map: naver.maps.Map | null,
    userLocation: Location | undefined,
    isActiveMyLocationButton: boolean
  ) => {
    if (!userLocation) {
      alert('위치 접근 권한이 거부되었습니다.');
      return;
    }
    updateMapCenter(map, userLocation);
    getPostsQueryTrigger();
    setIsActiveMyLocationButton(isActiveMyLocationButton);
  };

  const moveCurrentLocationFunc = () => {
    centerMapToUserLocation(map, userLocation, true);
  };

  // 비동기로 사용자 현재 위치 받아오는 Effect
  useEffect(() => {
    if (isFirstLoading && map) {
      (async () => {
        const { lat, lng, isUserLocation } = await defaultLocation();
        centerMapToUserLocation(map, { lat, lng }, isUserLocation);
        isFirstLoading = false;
      })();
    }
    getPostsQueryTrigger();
  }, [map]);

  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
        // onClick={() => {
        //   reactNativePostMessage('like_knu');
        // }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <SearchBar path={'/search'} />
        {showResearchButton && (
          <ResearchButton onClick={getPostsQueryTrigger} />
        )}
        {(getPostsIsLoading || isFirstLoading) && <LoadingIcon />}
        <MoveCurrentLocationButton
          moveCurrentLocationFunc={moveCurrentLocationFunc}
          isActiveMyLocationButton={isActiveMyLocationButton}
          isActivePostItem={isActivePostItem}
          postListHeight={postListHeight}
        />
        <Map
          map={map}
          setMap={setMap}
          setIsActiveMyLocationButton={setIsActiveMyLocationButton}
          isActivePostItem={isActivePostItem}
          setIsActivePostItem={setIsActivePostItem}
          setShowResearchButton={setShowResearchButton}
          userLocation={userLocation || null}
          data={data || []}
          isFirstLoading={isFirstLoading}
        />
      </Main>
      <PostList
        isActivePostItem={isActivePostItem}
        data={data || []}
        setPostListHeight={setPostListHeight}
      />
      <Footer />
    </>
  );
};

export default HomePage;
