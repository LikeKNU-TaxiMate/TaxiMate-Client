import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RoomTitle = styled.h2`
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: var(--weight-semi-bold);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MessageListContainer = styled.div`
  height: 100%;
  overflow: auto;

  padding: 0 20px;
  -webkit-overflow-scrolling: touch;
`;

export const NotificationContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-gray-300);
  margin-bottom: 10px;
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

export const MessageBox = styled.div`
  display: flex;
  max-width: 70%;
  margin-bottom: 10px;
`;

export const MyMessageBoxContainer = styled(MessageBox)`
  margin-left: auto;
`;

export const ResentMessage = styled.div`
  display: flex;
`;

export const MyResentMessage = styled(ResentMessage)`
  margin-left: auto;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MyMessageContainer = styled(MessageContainer)`
  margin-left: auto;
`;

const Message = styled.div`
  display: flex;
  width: fit-content;
  padding: 8px 12px;
  margin-bottom: 2px;

  font-size: var(--font-small);
  border-radius: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > svg {
    margin-left: 6px;
    margin-right: -6px;
  }
`;

export const OthersMessage = styled(Message)`
  background-color: var(--color-gray-300);
`;

export const MyMessage = styled(Message)`
  margin-left: auto;
  background-color: var(--color-main);
  color: var(--color-white);
`;

export const MessageTime = styled.span`
  margin-top: auto;
  padding: 0 2px 3px;
  color: var(--color-gray-100);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  white-space: nowrap;
`;

export const OthersProfile = styled.img`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;

  margin-right: 10px;
`;

export const OthersName = styled.span`
  margin-bottom: 5px;

  color: var(--color-gray-100);
  font-size: var(--font-semi-micro);
`;
export const MessageInputBoxContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
`;

export const MessageInput = styled.textarea<{ $inputLineLength: number }>`
  width: 90%;
  height: ${(props) => props.$inputLineLength * 20 + 20 + 'px'};

  max-height: 125px;

  padding: 10px 14px;
  resize: none;
  line-height: 1.5;

  margin-right: 10px;
  border-radius: 18px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);

  outline: none;
`;

export const SystemMessage = styled.div`
  width: fit-content;
  margin: 20px auto;

  display: flex;
  padding: 8px 16px;
  justify-content: center;

  background-color: var(--color-gray-300);
  color: var(--color-gray-100);
  font-size: var(--font-semi-micro);
  font-weight: var(--weight-regular);

  border-radius: 30px;
`;

export const GoNewMessageButtonContainer = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  margin: 0 10px 8px;
  gap: 8px;
  align-items: center;

  font-weight: var(--weight-regular);
  box-shadow: 0 0 2px 4px var(--color-gray-300);
  border-radius: 10px;

  & > div {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    & > span {
      color: var(--color-gray-200);
      font-size: var(--font-small);
      white-space: nowrap;
    }
  }

  & > svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
`;
