import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '@/constants/path.ts';
import formatPathWithParams from '@/utils/formatPathWithParams.ts';

import {
  AddressWrapper,
  PartyBodyContainer,
  PartyHeaderContainer,
  PartyListItemContainer,
} from '@/components/common/PartyListItem/PartyListItem.style.ts';
import PeopleCountTag, {
  PeopleCountTagProps,
} from '@/components/common/PeopleCountTag';

import ClockIcon from '@/assets/icons/postList/clock-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';
import LocationIcon from '@/assets/icons/postList/location-dot-icon.svg?react';
import CaretRightIcon from '@/assets/icons/postList/caret-right-icon.svg?react';

interface PartyHeaderProps {
  title: string;
  activePartyList?: boolean;
}

interface PartyBodyProps {
  departureTime: string;
  origin: string;
  destination: string;
}

interface PartyListItemProps extends PartyHeaderProps, PartyBodyProps {
  id: string;
}
const PartyListItem = ({
  id,
  title,
  currentParticipants,
  maxParticipants,
  departureTime,
  origin,
  destination,
  activePartyList,
  isClose,
}: PartyListItemProps & PeopleCountTagProps) => {
  return (
    <PartyListItemContainer>
      <Link to={formatPathWithParams(CLIENT_PATH.POST_DETAIL, id)}>
        <PartyHeader
          title={title}
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
          activePartyList={activePartyList}
          isClose={isClose}
        />
        <PartyBody
          departureTime={departureTime}
          origin={origin}
          destination={destination}
        />
      </Link>
    </PartyListItemContainer>
  );
};

export default PartyListItem;

const PartyHeader = ({
  title,
  currentParticipants,
  maxParticipants,
  activePartyList,
  isClose,
}: PartyHeaderProps & PeopleCountTagProps) => {
  return (
    <PartyHeaderContainer>
      <div>
        <h2>{title}</h2>
        <PeopleCountTag
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
          isClose={isClose}
        />
      </div>
      {activePartyList && <ArrowRightIcon />}
    </PartyHeaderContainer>
  );
};

export const PartyBody = ({
  departureTime,
  origin,
  destination,
}: PartyBodyProps) => {
  return (
    <PartyBodyContainer>
      <div>
        <ClockIcon />
        {departureTime}
      </div>
      <div>
        <LocationIcon />
        <AddressWrapper>{origin}</AddressWrapper>
        <CaretRightIcon />
        <AddressWrapper>{destination}</AddressWrapper>
      </div>
    </PartyBodyContainer>
  );
};
