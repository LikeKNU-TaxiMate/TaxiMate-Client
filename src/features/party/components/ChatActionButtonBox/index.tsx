import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import useCustomNavigation from '@/hooks/useNavigate';
import { PostDetail, PostDetailStatus } from '@/types/post.ts';
import {
  useLeaveChatMutation,
  useParticipationChatMutation,
} from '@/api/chatApi.ts';

import {
  ButtonBox,
  JoinButton,
  LeaveButton,
} from './ChatActionButton.style.ts';

const ChatActionButtonBox = ({
  status,
  id,
  refetchFunc,
}: {
  status: PostDetailStatus;
  id: string;
  refetchFunc: () => Promise<PostDetail | undefined>;
}) => {
  const { goHome, goTo } = useCustomNavigation();

  const [participationChat] = useParticipationChatMutation();
  const [leaveChat] = useLeaveChatMutation();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);

  const goChatRoom = () => {
    goTo({ path: 'CHAT_ROOM', id });
  };

  const participationChatHandler = async () => {
    if (!isLogin) {
      return goTo({ path: 'LOGIN' });
    }
    try {
      await participationChat(id).unwrap();
      goChatRoom();
    } catch {
      refetchFunc();
    }
  };

  const leaveChatHandler = async () => {
    await leaveChat(id).unwrap();
    const result = await refetchFunc();
    if (result?.currentParticipants === 0) {
      goHome({ replace: true });
    }
  };

  return (
    <ButtonBox>
      {checkStatus(status) ? (
        <JoinButton onClick={goChatRoom}>채팅방</JoinButton>
      ) : (
        <JoinButton onClick={participationChatHandler}>팟참여</JoinButton>
      )}
      {status === 'PARTICIPATING' && (
        <LeaveButton onClick={leaveChatHandler}>나가기</LeaveButton>
      )}
    </ButtonBox>
  );
};

const checkStatus = (status: PostDetailStatus) => {
  return status === 'PARTICIPATING' || status === 'TERMINATED';
};

export default ChatActionButtonBox;
