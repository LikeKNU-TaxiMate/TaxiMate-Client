import styled from 'styled-components';

export const ButtonBox = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 16px;

  & > button {
    width: 110px;
    min-height: 45px;
    font-size: 18px;
    font-weight: var(--weight-bold);
  }
`;

export const JoinButton = styled.button`
  border-radius: 6px;
  background-color: var(--color-main);

  color: var(--color-white);
`;

export const LeaveButton = styled.button`
  color: var(--color-red);
  text-decoration: underline;
`;
