import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Chat, ChatMessage, GroupMessage } from '@/types/chat.ts';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';

import MyMessageBox from '@/components/chatRoom/MyMessageBox.tsx';
import OthersMessageBox from '@/components/chatRoom/OthersMessageBox.tsx';
import {
  Container,
  SystemMessage,
} from '@/components/chatRoom/chatRoom.style.ts';
import GoNewMessageButton from '@/components/chatRoom/GoNewMessageButton.tsx';

const MessageList = ({
  userId,
  currentPartyId,
  inAppNotificationHandler,
  chatData,
}: {
  userId: string;
  currentPartyId: string;
  inAppNotificationHandler: (message: ChatMessage) => void;
  chatData: Chat[];
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [initialChatMessage, setInitialChatMessage] = useState<GroupMessage[]>(
    []
  );
  const [messageList, setMessageList] = useState<GroupMessage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);

  const handleNewMessage = (message: ChatMessage) => {
    if (message.partyId === Number(currentPartyId)) {
      chatHandler(message, setMessageList);
    } else {
      inAppNotificationHandler(message);
    }
  };

  useMessageSubscription(handleNewMessage);

  useLayoutEffect(() => {
    if (isVisible) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // 화면에 요소가 보일 때 발생할 이벤트
    } else {
      if (
        messageList.length > 0 &&
        messageList[messageList.length - 1].sender.id !== userId
      ) {
        setShowUpButton(true);
      }
      // 화면에서 요소가 벗어났을 때 발생할 이벤트
    }
  }, [messageList]);

  // Intersection Observer를 사용해 요소 가시성 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = messageEndRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShowUpButton(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const array: GroupMessage[] = [];

    chatData.forEach((message, i) => {
      if (i === 0) {
        // 첫 번째 메시지를 처리
        array.push({ ...message, chat: [message.message] });
        return;
      }

      const lastMessage = array[array.length - 1];
      const isSameUser = lastMessage.sender.id === message.sender.id;
      const isSameTime =
        lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);

      if (isSameUser && isSameTime) {
        // 이전 메시지와 같은 유저, 같은 시간대의 메시지라면 chat 배열에 추가
        lastMessage.chat.push(message.message);
      } else {
        // 새로운 유저이거나 시간이 다르면 새로운 그룹 추가
        array.push({ ...message, chat: [message.message] });
      }
    });

    setInitialChatMessage(array);
  }, []);

  // 메시지가 업데이트될 때마다 최하단으로 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [initialChatMessage]);

  return (
    <>
      <Container>
        <SystemMessage>이준석님이 들어왔습니다.</SystemMessage>
        <SystemMessage>2024년 9월 21일 토요일</SystemMessage>
        {initialChatMessage.map((message) =>
          message.sender.id === userId ? (
            <MyMessageBox
              key={message.createdAt}
              messages={message.chat}
              time={message.createdAt}
            />
          ) : (
            <OthersMessageBox
              key={message.createdAt}
              name={message.sender.nickname}
              img={message.sender.profileImage}
              messages={message.chat}
              time={message.createdAt}
            />
          )
        )}
        {messageList.map((message) =>
          message.sender.id === userId ? (
            <MyMessageBox
              key={message.createdAt}
              messages={message.chat}
              time={message.createdAt}
            />
          ) : (
            <OthersMessageBox
              key={message.createdAt}
              name={message.sender.nickname}
              img={message.sender.profileImage}
              messages={message.chat}
              time={message.createdAt}
            />
          )
        )}
        <div ref={messageEndRef} style={{ height: '2px' }} />
      </Container>
      {showUpButton && messageList.length > 0 && (
        <GoNewMessageButton
          img={messageList[messageList.length - 1].sender.profileImage || ''}
          name={messageList[messageList.length - 1].sender.nickname || ''}
          message={
            messageList[messageList.length - 1].chat[
              messageList[messageList.length - 1].chat.length - 1
            ]
          }
          onClick={() => {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
};

export default MessageList;

const chatHandler = (
  message: ChatMessage,
  setMessageList: React.Dispatch<React.SetStateAction<GroupMessage[]>>
) => {
  const setMessage = { ...message, chat: [message.message] };

  setMessageList((prevState) => {
    if (prevState.length > 0) {
      const lastMessage = prevState[prevState.length - 1];
      const isSameUser = lastMessage.sender.id === message.sender.id;
      const isSameTime =
        lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);

      if (isSameUser && isSameTime) {
        const updatedMessage = {
          ...lastMessage,
          chat: [...lastMessage.chat, ...setMessage.chat],
        };
        return [...prevState.slice(0, prevState.length - 1), updatedMessage];
      }
    }
    return [...prevState, setMessage];
  });
};
