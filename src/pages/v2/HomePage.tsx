import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsV2Query } from '@/api/v2/postApi.ts';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';
import { Post } from '@/types/v2/post.ts';
import formatChatDate from '@/utils/formatChatDate.ts';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import Footer from '@/components/common/Layout/Footer';
import OthersMessageBox from '@/components/v2/Home/OtherMessageBox.tsx';
import {
  ButtonBox,
  EventBox,
  Main,
  RefreshButton,
} from '@/components/v2/Home/Home.style.ts';
import MyMessageBox from '@/components/v2/Home/MyMessageBox.tsx';
import LoadingIcon from '@/components/common/LoadingIcon';
import { SystemMessage } from '@/components/ChatRoom/chatRoom.style.ts';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import RefreshButtonIcon from '@/assets/icons/refresh-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';
import CreateButtonIcon from '@/assets/icons/footer/create-button-icon.svg?react';

type PostOrString = Post | string;
type PostArray = PostOrString[];

const HomePage = () => {
  const [parties, setParties] = useState<PostArray>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetPostsV2Query(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;
    const array: PostArray = [];
    let currentDate = '';

    data.forEach((post) => {
      const messageDate = formatChatDate(post.createdAt);
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        array.push(currentDate);
      }
      array.push(post);
    });

    setParties(array);
  }, [data]);

  useEffect(() => {
    if (isFetching) {
      setIsSpinning(true);
    }
  }, [isFetching]);

  const handleAnimationEnd = () => {
    setIsSpinning(false);
  };

  const refetchFunc = () => {
    refetch();
  };

  const refetchHandler = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      refetch();
    }
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView();
    }
  }, [parties]);

  if (isLoading) return <LoadingIcon />;
  if (!data) return <div>no data...</div>;

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
        {parties.map((post) =>
          typeof post !== 'string' ? (
            post.host.isMe ? (
              <MyMessageBox
                key={post.id}
                id={post.id}
                messages={post.title}
                time={post.createdAt}
                status={post.status}
                currentParticipants={post.currentParticipants}
                maxParticipants={post.maxParticipants}
                refetchFunc={refetchFunc}
              />
            ) : (
              <OthersMessageBox
                key={post.id}
                id={post.id}
                messages={post.title}
                time={post.createdAt}
                status={post.status}
                name={post.host.nickname}
                img={post.host.profileImage}
                currentParticipants={post.currentParticipants}
                maxParticipants={post.maxParticipants}
                refetchFunc={refetchFunc}
              />
            )
          ) : (
            <SystemMessage key={post}>{post}</SystemMessage>
          )
        )}
        <div ref={endRef} style={{ height: '2px' }} />
      </Main>
      <ButtonBox>
        <RefreshButton onClick={refetchHandler} $isSpinning={isSpinning}>
          <RefreshButtonIcon onAnimationEnd={handleAnimationEnd} />
        </RefreshButton>
        <EventBox>
          🎉 택시팟 출시 이벤트 🎉
          <p>
            치킨 🍗 : 1명
            <br />
            커피☕️ : 10명
            <br />
            <span>자세한 내용은 내 정보에서 확인해주세요!</span>
          </p>
        </EventBox>
        <Link to={'/create-post'}>
          <CreateButtonIcon />
        </Link>
      </ButtonBox>
      <Footer />
    </>
  );
};

export default HomePage;
