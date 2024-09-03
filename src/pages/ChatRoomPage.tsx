import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/Layout/Header';
import DropDown from '@/components/common/DropDown.tsx';
import { PostBody } from '@/components/common/PostListItem';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import {
  NotificationContainer,
  NotificationHeader,
  RoomTitle,
} from '@/components/chatRoom/chatRoom.style.ts';

import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg?react';
import socket from '@/api/SocketTest.ts';
import MessageInputBox from '@/components/chatRoom/MessageInputBox.tsx';
import MessageList from '@/components/chatRoom/MessageList.tsx';

interface testUser {
  name: string;
  token: string;
  online: boolean;
}

const ChatRoomPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<testUser | null>();

  useEffect(() => {
    const name = prompt('닉네임을 입력해주세요');
    socket.emit('login', name, (response: { ok: boolean; user: testUser }) => {
      if (response.ok) {
        setUser(response.user);
      }
    });
  }, []);

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </BackButton>
        <RoomTitle>
          학생회관 앞 CU앞 종합버스 터미널생회관 앞 CU앞 종합버스 터미널
        </RoomTitle>
        <DropDown
          items={[{ name: '알림끄기', handler: () => {} }]}
          danger={'나가기'}
        />
      </Header>
      <NotificationContainer to={''}>
        <NotificationHeader>
          <PeopleCountTag currentParticipants={4} maxParticipants={4} />
          <ArrowRightIcon />
        </NotificationHeader>
        <PostBody
          departureTime={'오늘 오후 1:10쯤'}
          origin={'공주대학교 정문'}
          destination={'천안종합버스터미널'}
        />
      </NotificationContainer>
      <MessageList userName={user?.name || ''} />
      <MessageInputBox />
    </>
  );
};

export default ChatRoomPage;
