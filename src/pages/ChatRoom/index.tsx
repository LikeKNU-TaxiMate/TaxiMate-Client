import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GroupMessage } from '@/types/chat.ts';
import { CLIENT_PATH } from '@/constants/path.ts';
import formatDate from '@/utils/date/formatDate';
import formatPathWithParams from '@/utils/formatPathWithParams.ts';
import { useGetChatQuery } from '@/api/chatApi.ts';
import { useGetProfileQuery } from '@/api/userApi.ts';
import useInAppNotificationHandler from '@/hooks/useInAppNotificationHandler';

import NoData from '@/components/common/NoData.tsx';
import LoadingIcon from '@/components/common/LoadingIcon';
import Header from '@/components/common/Layout/Header';
import { PostBody } from '@/components/common/PostListItem';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import InAppNotification from '@/components/common/InAppNotification';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';

import {
  NotificationContainer,
  NotificationHeader,
  RoomTitle,
} from './page.style.ts';

import InitialChatMessage from '@/domains/ChatRoom/components/InitialChatMessage.tsx';
import useCustomNavigation from '@/hooks/useNavigate';
import formatPrevChatData from '@/domains/ChatRoom/utils/formatPrevChatData.ts';
import MessageList from '@/domains/ChatRoom/components/MessageList';
import MessageInputBox from '@/domains/ChatRoom/components/MessageInputBox';

const ChatRoomPage = () => {
  const currentPartyId = useLocation().pathname.split('/')[2];
  const { goTo } = useCustomNavigation();

  const { data: userData, isLoading } = useGetProfileQuery(null);
  const { data: chatData, isLoading: chatIsLoading } = useGetChatQuery(
    currentPartyId,
    { refetchOnFocus: true }
  );
  const [initialChatMessage, setInitialChatMessage] = useState<GroupMessage[]>(
    []
  );
  const {
    notification,
    showNotification,
    handleNewMessage,
    setShowNotification,
  } = useInAppNotificationHandler();

  useEffect(() => {
    if (!chatData) return;
    setInitialChatMessage(formatPrevChatData(chatData));
  }, [chatData]);

  if (isLoading || chatIsLoading) return <LoadingIcon />;
  if (!userData || !chatData) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  return (
    <>
      {notification && showNotification && (
        <InAppNotification
          notification={notification}
          showNotification={showNotification}
          setShowNotification={() => {
            setShowNotification(false);
          }}
        />
      )}
      <Header>
        <BackButton
          onClick={() =>
            goTo({ path: 'CHAT_LISTS', options: { replace: true } })
          }
        >
          <ArrowLeftIcon />
        </BackButton>
        <RoomTitle>{chatData.party.title}</RoomTitle>
      </Header>
      <NotificationContainer
        to={formatPathWithParams(CLIENT_PATH.POST_DETAIL, currentPartyId)}
      >
        <NotificationHeader>
          <PeopleCountTag
            currentParticipants={chatData.party.currentParticipants}
            maxParticipants={chatData.party.maxParticipants}
          />
          <ArrowRightIcon />
        </NotificationHeader>
        <PostBody
          departureTime={formatDate(chatData.party.departureTime) || ''}
          origin={chatData.party.origin || ''}
          destination={chatData.party.destination || ''}
        />
      </NotificationContainer>
      <MessageList
        userId={userData.id}
        currentPartyId={currentPartyId}
        inAppNotificationHandler={handleNewMessage}
        initialChatMessage={initialChatMessage}
      >
        {/*초기 메세지 children으로 전달*/}
        <InitialChatMessage
          initialChatMessage={initialChatMessage}
          userId={userData.id}
        />
      </MessageList>
      <MessageInputBox partyId={currentPartyId} />
    </>
  );
};

export default ChatRoomPage;
