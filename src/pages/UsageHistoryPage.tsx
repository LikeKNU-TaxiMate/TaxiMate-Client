import { useState } from 'react';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import {
  Button,
  ButtonContainer,
  Container,
  PostListContainer,
} from '@/components/usageHistiory/usageHistory.style.ts';

import UsageHistoryIcon from '@/assets/icons/header/usage-history-icon.svg?react';
import Footer from '@/components/common/Layout/Footer';
import PostListItem from '@/components/common/PostListItem';
import reformatDate from '@/utils/reformatDate.ts';
import { postData } from '@/constants';

const UsageHistoryPage = () => {
  const [isActive, setIsActive] = useState('join');

  const data = postData();

  return (
    <>
      <Header>
        <HeaderItem>
          이용내역
          <UsageHistoryIcon />
        </HeaderItem>
      </Header>
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsActive('join');
            }}
            $isJoined={isActive === 'join'}
          >
            참여 중인 팟
          </Button>
          <Button
            onClick={() => {
              setIsActive('close');
            }}
            $isJoined={isActive === 'close'}
          >
            종료된 팟
          </Button>
        </ButtonContainer>
        <PostListContainer>
          {data.map((post) => (
            <PostListItem
              key={post.id}
              title={post.title}
              currentPassengers={post.currentPassengers}
              maxPassengers={post.maxPassengers}
              departureTime={reformatDate(post.departureTime)}
              origin={post.origin}
              destination={post.destination}
            />
          ))}
        </PostListContainer>
      </Container>
      <Footer />
    </>
  );
};

export default UsageHistoryPage;