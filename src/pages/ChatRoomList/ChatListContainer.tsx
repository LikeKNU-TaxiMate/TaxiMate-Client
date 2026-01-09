import { useGetChatListQuery } from '@/api/chatApi.ts';
import { Container, Divider } from './page.style.ts';
import NoData from '@/components/common/NoData.tsx';
import SuspenseContainer from '@/components/common/SuspenseContainer.tsx';
import ChatRoomListWrap from '@/domains/ChatRoomList/components/ChatRoomListWrap';

const ChatListContainer = () => {
  const { data, isLoading } = useGetChatListQuery(null, {
    refetchOnFocus: true,
  });

  if (isLoading) return <SuspenseContainer />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const progressChatRoom = data.filter((chat) => chat.isProgress);
  const closeChatRoom = data.filter((chat) => !chat.isProgress);

  return (
    <>
      {data.length > 0 ? (
        <Container>
          {progressChatRoom.length > 0 && (
            <ChatRoomListWrap chatRoomListProp={progressChatRoom} />
          )}
          {closeChatRoom.length > 0 && (
            <>
              <Divider>종료된 팟</Divider>{' '}
              <ChatRoomListWrap chatRoomListProp={closeChatRoom} />
            </>
          )}
        </Container>
      ) : (
        <NoData>채팅 내역이 없습니다</NoData>
      )}
    </>
  );
};

export default ChatListContainer;
