import {
  Button,
  ButtonContainer,
  Container,
  PartyListContainer,
} from '../UsageHistoryPage.style.ts';
import PartyListItem from '@/components/common/PartyListItem';
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
        <PartyListContainer>
          {data.map((party) => (
            <PartyListItem
              key={party.id}
              id={party.id}
              title={party.title}
              currentParticipants={party.currentParticipants}
              maxParticipants={party.maxParticipants}
              departureTime={formatDate(party.departureTime)}
              origin={party.origin}
              destination={party.destination}
              isClose={isActive === 'close'}
            />
          ))}
        </PartyListContainer>
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
