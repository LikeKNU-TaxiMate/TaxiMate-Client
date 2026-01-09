import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const RoomTitle = styled.h2`
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: var(--weight-semi-bold);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
