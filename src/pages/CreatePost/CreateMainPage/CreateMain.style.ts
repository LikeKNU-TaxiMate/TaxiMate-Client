import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 10px 20px;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CreateSubmitButton = styled.button`
  font-weight: var(--weight-semi-bold);
  color: var(--color-blue);
`;
