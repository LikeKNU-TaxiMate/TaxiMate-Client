import { useEffect, useState } from 'react';
import { useLazyGetPostsQuery } from '@/api/postApi.ts';

import getCurrentLocation from '@/utils/getCurrentlocation.ts';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import Footer from '@/components/common/Layout/Footer';
import Map from '@/components/Home/Map';
import PostList from '@/components/Home/PostList';
import { Main } from '@/components/Home/Map/Map.style.ts';
import SearchBar from '@/components/Home/SearchBar';
import ResearchButton from '@/components/Home/ResearchButton';
import MoveCurrentLocation from '@/components/Home/MoveCurrentLocation';
import LoadingIcon from '@/components/common/LoadingIcon';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';

const HomePage = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [postListHeight, setPostListHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [showResearchButton, setShowResearchButton] = useState(false);

  const [trigger, { data, isLoading: getPostsIsLoading }] =
    useLazyGetPostsQuery();

  const getPostsQueryTrigger = () => {
    if (!map) return;
    const minLatitude = map.getBounds().minY();
    const minLongitude = map.getBounds().minX();
    const maxLatitude = map.getBounds().maxY();
    const maxLongitude = map.getBounds().maxX();
    trigger({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    });
    setShowResearchButton(false);
  };

  useEffect(() => {
    getPostsQueryTrigger();
  }, [map]);

  useEffect(() => {
    const centerLocation = JSON.parse(localStorage.getItem('Location') || '');

    (async () => {
      const { lat, lng } = await getCurrentLocation();
      if (!(centerLocation.lat === lat && centerLocation.lng === lng)) {
        setActiveButton(false);
      }
    })();
  }, []);

  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
          onClick={() => {
            reactNativePostMessage('like_knu');
          }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <SearchBar path={'/search'} />
        {showResearchButton && (
          <ResearchButton onClick={getPostsQueryTrigger} />
        )}
        {(isLoading || getPostsIsLoading) && <LoadingIcon />}
        <MoveCurrentLocation
          map={map}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          activeMarker={activeMarker}
          postListHeight={postListHeight}
          setIsLoading={setIsLoading}
        />
        <Map
          map={map}
          setMap={setMap}
          setActiveButton={setActiveButton}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          setShowResearchButton={setShowResearchButton}
          data={data || []}
        />
      </Main>
      <PostList
        activeMarker={activeMarker}
        data={data || []}
        setPostListHeight={setPostListHeight}
      />
      <Footer />
    </>
  );
};

export default HomePage;
