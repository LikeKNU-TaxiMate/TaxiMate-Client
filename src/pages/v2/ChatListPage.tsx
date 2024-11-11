import { useGetChatListQuery } from '@/api/chatApi.ts';

import NoData from '@/components/common/NoData.tsx';
import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import ChatListWrap from '@/components/ChatList/ChatListWrap.tsx';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import { Container } from '@/components/ChatList/chatList.style.ts';

import ChatIcon from '@/assets/icons/chat/chat-icon.svg?react';
import LoadingIcon from '@/components/common/LoadingIcon';

const ChatListPage = () => {
  const { data, isLoading } = useGetChatListQuery(null, {
    refetchOnFocus: true,
  });

  if (isLoading) return <LoadingIcon />;
  if (!data) return <div>no data...</div>;

  //const progressChatRoom = data.filter((chat) => chat.isProgress);

  return (
    <>
      <Header>
        <HeaderItem>
          채팅
          <ChatIcon />
        </HeaderItem>
      </Header>
      {data.length > 0 ? (
        <Container>
          {/*{progressChatRoom.length > 0 && (*/}
          <ChatListWrap chatRoomListProp={data} />
          {/*)}*/}
        </Container>
      ) : (
        <NoData>채팅 내역이 없습니다</NoData>
      )}
      <Footer />
    </>
  );
};
export default ChatListPage;

// 서버에 저장되거나 불러올 때 최신순으로 주기
