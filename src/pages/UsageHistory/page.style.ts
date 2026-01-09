import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 0 20px;

  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  padding: 10px 0;

  display: flex;
`;

export const Button = styled.button<{ $isJoined: boolean }>`
  padding: 8px 16px;
  margin-right: 10px;

  border-radius: 100px;
  font-weight: var(--weight-semi-bold);
  box-shadow: 0 0 8px 4px var(--color-shadow);

  ${({ $isJoined }) =>
    $isJoined &&
    css`
      color: var(--color-white);
      background-color: var(--color-main);
    `}
`;

export const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
