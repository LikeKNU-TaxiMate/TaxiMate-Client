import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';

import ChatIcon from '@/assets/icons/chat/chat-icon.svg?react';
import ChatListContainer from './ChatListContainer.tsx';

const ChatRoomListPage = () => {
  return (
    <>
      <Header>
        <HeaderItem>
          채팅
          <ChatIcon />
        </HeaderItem>
      </Header>
      <ChatListContainer />
      <Footer />
    </>
  );
};
export default ChatRoomListPage;
