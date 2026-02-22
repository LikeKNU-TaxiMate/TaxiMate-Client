import { useRef } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';

import formatDate from '@/utils/date/formatDate';

import {
  PartyListContainer,
  ActivePartyListContainer,
} from './PartyList.style.ts';
import PartyListItem from '@/components/common/PartyListItem';
import { Party } from '@/types/party.ts';
import NoData from '@/components/common/NoData.tsx';

const PartyList = ({
  isActivePartyItem,
  data,
  setPartyListHeight,
}: {
  isActivePartyItem: string | null;
  data: Party[];
  setPartyListHeight: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  if (isActivePartyItem) {
    const targetData = data.filter((item) => item.id === isActivePartyItem)[0];

    return (
      <ActivePartyListContainer>
        <PartyListItem
          id={targetData.id}
          title={targetData.title}
          currentParticipants={targetData.currentParticipants}
          maxParticipants={targetData.maxParticipants}
          departureTime={formatDate(targetData.departureTime)}
          origin={targetData.origin}
          destination={targetData.destination}
          activePartyList
        />
      </ActivePartyListContainer>
    );
  }

  return (
    <BottomSheet
      open
      blocking={false}
      ref={sheetRef}
      defaultSnap={({ maxHeight }) => Math.floor(maxHeight * 0.2)}
      snapPoints={({ maxHeight }) => [
        Math.floor(maxHeight * 0.9),
        Math.floor(maxHeight * 0.2),
      ]}
      expandOnContentDrag
      onSpringEnd={() => setPartyListHeight(sheetRef.current?.height || 0)}
    >
      {data.length > 0 ? (
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
            />
          ))}
        </PartyListContainer>
      ) : (
        <NoData>주위 검색된 팟이 없습니다</NoData>
      )}
    </BottomSheet>
  );
};

export default PartyList;
