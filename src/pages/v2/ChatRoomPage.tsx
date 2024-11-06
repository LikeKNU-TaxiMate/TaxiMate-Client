import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { GroupMessage } from '@/types/chat.ts';
import { useGetProfileQuery } from '@/api/userApi.ts';
import { useLeaveChatMutation } from '@/api/chatApi.ts';
import { useGetChatV2Query } from '@/api/v2/chatApi.ts';
import formatChatDate from '@/utils/formatChatDate.ts';
import useErrorHandle from '@/hooks/useErrorHandle.ts';
import useInAppNotificationHandler from '@/hooks/useInAppNotificationHandler.ts';

import Header from '@/components/common/Layout/Header';
import MessageList from '@/components/ChatRoom/MessageList.tsx';
import MessageInputBox from '@/components/ChatRoom/MessageInputBox.tsx';
import InAppNotification from '@/components/common/InAppNotification';
import MyMessageBox from '@/components/ChatRoom/MyMessageBox.tsx';
import OthersMessageBox from '@/components/ChatRoom/OthersMessageBox.tsx';
import LoadingIcon from '@/components/common/LoadingIcon';
import DropDown from '@/components/common/DropDown.tsx';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import {
  RoomTitle,
  SystemMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const ChatRoomPage = ({ client }: { client: Client | null }) => {
  const navigate = useNavigate();
  const currentPartyId = useLocation().pathname.split('/')[2];

  const { data: userData, isLoading } = useGetProfileQuery(null);
  const { data: chatData, isLoading: chatIsLoading } = useGetChatV2Query(
    currentPartyId,
    { refetchOnFocus: true }
  );
  const [leaveChat, { error: leaveChatError }] = useLeaveChatMutation();
  useErrorHandle(leaveChatError);

  const leaveChatHandler = async () => {
    const answer = confirm('팟을 나가시겠습니까?');
    if (answer) {
      await leaveChat(currentPartyId).unwrap();
      navigate('/');
    }
  };

  const {
    notification,
    showNotification,
    handleNewMessage,
    setShowNotification,
  } = useInAppNotificationHandler();
  const [initialChatMessage, setInitialChatMessage] = useState<GroupMessage[]>(
    []
  );

  useEffect(() => {
    if (!chatData) return;

    const array: GroupMessage[] = [];
    let currentDate = '';

    chatData.chats.forEach((message) => {
      const messageDate = formatChatDate(message.createdAt);

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        array.push({
          chat: [currentDate],
          createdAt: '',
          sender: null,
          type: 'SYSTEM',
        });
      }

      const lastMessage = array[array.length - 1];
      const isSameUser = lastMessage.sender?.id === message.sender?.id;
      const isSameTime =
        lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);
      const isSameType = lastMessage.type === message.type;

      if (isSameType && isSameUser && isSameTime) {
        // 이전 메시지와 같은 유저, 같은 시간대의 메시지라면 chat 배열에 추가
        lastMessage.chat.push(message.message);
      } else {
        // 새로운 유저이거나 시간이 다르면 새로운 그룹 추가
        array.push({ ...message, chat: [message.message] });
      }
    });

    setInitialChatMessage(array);
  }, [chatData]);

  if (isLoading || chatIsLoading) return <LoadingIcon />;
  if (!userData || !chatData) return <div>no data...</div>;

  return (
    <>
      {notification && showNotification && (
        <InAppNotification
          id={notification.id}
          showNotification={showNotification}
          partyTitle={notification?.partyTitle || ''}
          partyId={notification?.partyId || 0}
          message={notification?.message || ''}
          sender={{
            profileImage: notification.sender.profileImage || '',
            nickname: notification.sender.nickname || '',
            id: notification.sender.id,
          }}
          createdAt={''}
          type={'MESSAGE'}
          setShowNotification={() => {
            setShowNotification(false);
          }}
        />
      )}
      <Header>
        <BackButton onClick={() => navigate('/chat-list')}>
          <ArrowLeftIcon />
        </BackButton>
        <RoomTitle>{chatData.party.title}</RoomTitle>
        <DropDown
          // items={['']}
          danger={'나가기'}
          leaveChatHandler={leaveChatHandler}
        />
      </Header>
      <MessageList
        client={client}
        userId={userData.id}
        currentPartyId={currentPartyId}
        inAppNotificationHandler={handleNewMessage}
        initialChatMessage={initialChatMessage}
      >
        {initialChatMessage.map((message) =>
          message.type === 'SYSTEM' ? (
            message.chat.map((item, index) => (
              <SystemMessage key={index}>{item}</SystemMessage>
            ))
          ) : message.sender?.id === userData.id ? (
            <MyMessageBox
              key={message.createdAt}
              messages={message.chat}
              time={message.createdAt}
            />
          ) : (
            <OthersMessageBox
              key={message.createdAt}
              name={message.sender?.nickname || 'user'}
              img={message.sender?.profileImage || ''}
              messages={message.chat}
              time={message.createdAt}
            />
          )
        )}
      </MessageList>
      <MessageInputBox client={client} partyId={currentPartyId} />
    </>
  );
};

export default ChatRoomPage;
