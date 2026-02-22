import {
  Button,
  ButtonContainer,
  Container,
  PostListContainer,
} from '../UsageHistoryPage.style.ts';
import PostListItem from '@/components/common/PostListItem';
import formatDate from '@/utils/date/formatDate';
import NoData from '@/components/common/NoData.tsx';
import { useState } from 'react';
import { useGetClosePartysQuery, useGetJoinPartysQuery } from '@/api/partyApi.ts';
import SuspenseContainer from '@/components/common/SuspenseContainer.tsx';

const UsageHistoryContainer = () => {
  const [isActive, setIsActive] = useState('join');

  const getJoinPartysResult = useGetJoinPartysQuery('joinPartys');
  const getClosePartysResult = useGetClosePartysQuery('closePartys');

  const { data, isLoading } =
    isActive === 'join' ? getJoinPartysResult : getClosePartysResult;

  if (isLoading) return <SuspenseContainer />;

  return (
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
      {data && data.length > 0 ? (
        <PostListContainer>
          {data.map((post) => (
            <PostListItem
              key={post.id}
              id={post.id}
              title={post.title}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              departureTime={formatDate(post.departureTime)}
              origin={post.origin}
              destination={post.destination}
              isClose={isActive === 'close'}
            />
          ))}
        </PostListContainer>
      ) : (
        <NoData>
          {isActive === 'join'
            ? '참여 중인 팟이 없습니다'
            : '종료된 팟이 없습니다'}
        </NoData>
      )}
    </Container>
  );
};

export default UsageHistoryContainer;
