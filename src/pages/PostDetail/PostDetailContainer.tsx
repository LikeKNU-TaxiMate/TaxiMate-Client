import { useLocation } from 'react-router-dom';
import { Place } from '@/domains/PostDetail/types';
import { PostDetail } from '@/types/post.ts';
import { useGetPostByIdQuery } from '@/api/postApi.ts';
import {
  formatNaverMapUrl,
  getWebNaverMapUrl,
} from '@/domains/PostDetail/utiils/formatNaverMapUrl.ts';
import { formatKakaoTaxiUrl } from '@/domains/PostDetail/utiils/formatKakaoTaxiUrl.ts';
import openOtherApp from '@/domains/PostDetail/utiils/openOtherMapApp.ts';

import {
  NAVER_MAP_IOS_URL,
  NAVER_MAP_ANDROID_URL,
  KAKAO_TAXI_IOS_URL,
  KAKAO_TAXI_ANDROID_URL,
} from '@/domains/PostDetail/constants';

import {
  Container,
  ContentContainer,
  MoveInfoContainer,
} from './page.style.ts';
import PostDetailHeader from '@/domains/PostDetail/components/PostDetailHeader';
import PostDetailTitle from '@/domains/PostDetail/components/PostDetailTitle';
import LocationInfo from '@/components/common/LocationInfo';
import Map from '@/domains/PostDetail/components/Map';
import ParticipantsBox from '@/domains/PostDetail/components/ParticipantsBox';
import ChatActionButtonBox from '@/domains/PostDetail/components/ChatActionButtonBox';
import NoData from '@/components/common/NoData.tsx';
import getTimeAgoString from '@/utils/date/getTimeAgoString';
import SuspenseContainer from '@/components/common/SuspenseContainer.tsx';

const PostDetailContainer = () => {
  const id = useLocation().pathname.split('/')[2];
  const { data, isLoading, refetch } = useGetPostByIdQuery(id);

  const refetchFunc = async (): Promise<PostDetail | undefined> => {
    const result = await refetch();
    return result.data;
  };

  if (isLoading) return <SuspenseContainer />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const formatCreatedAt = getTimeAgoString(data.createdAt);

  const handleOpenNaverMapApp = () => {
    if (data.taxi.route.length === 0) return;
    const route = data.taxi.route;

    const origin: Place = {
      name: data.origin,
      lat: route[0].latitude,
      lng: route[0].longitude,
    };
    const destination: Place = {
      name: data.destination,
      lat: route.at(-1)!.latitude,
      lng: route.at(-1)!.longitude,
    };

    const NAVER_APP_LINK = formatNaverMapUrl({
      origin,
      destination,
    });
    const NAVER_MAP_WEB_URL = getWebNaverMapUrl(origin, destination);

    openOtherApp(
      NAVER_APP_LINK,
      NAVER_MAP_IOS_URL,
      NAVER_MAP_ANDROID_URL,
      NAVER_MAP_WEB_URL
    );
  };

  const handleOpenKakaoTaxiApp = () => {
    if (data.taxi.route.length === 0) return;
    const route = data.taxi.route;

    const destination: Omit<Place, 'name'> = {
      lat: route.at(-1)!.latitude,
      lng: route.at(-1)!.longitude,
    };

    const KAKAO_TAXI_APP_LINK = formatKakaoTaxiUrl(destination);

    openOtherApp(
      KAKAO_TAXI_APP_LINK,
      KAKAO_TAXI_IOS_URL,
      KAKAO_TAXI_ANDROID_URL
    );
  };

  return (
    <Container>
      <PostDetailHeader
        currentParticipants={data.currentParticipants}
        maxParticipants={data.maxParticipants}
        status={data.status}
        createdAt={formatCreatedAt}
        views={data.views}
      />
      <PostDetailTitle title={data.title} departureTime={data.departureTime} />
      <LocationInfo
        keyWord={'출발지'}
        place={data.origin}
        address={data.originAddress}
      />
      <LocationInfo
        keyWord={'도착지'}
        place={data.destination}
        address={data.destinationAddress}
      />
      <Map
        taxiRoute={data.taxi.route}
        handleOpenNaverMapApp={handleOpenNaverMapApp}
        handleOpenKakaoTaxiApp={handleOpenKakaoTaxiApp}
      />
      <ContentContainer>{data.explanation}</ContentContainer>
      <MoveInfoContainer>
        예상금액<span>{Number(data.taxi.fare).toLocaleString()}원</span>
        소요시간<span>{Math.ceil(Number(data.taxi.duration) / 60)}분</span>
      </MoveInfoContainer>
      <ParticipantsBox participants={data.participants} />
      <ChatActionButtonBox
        status={data.status}
        id={id}
        refetchFunc={refetchFunc}
      />
    </Container>
  );
};
export default PostDetailContainer;
