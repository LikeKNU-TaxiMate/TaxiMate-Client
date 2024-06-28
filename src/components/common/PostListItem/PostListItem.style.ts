import styled from 'styled-components';

export const PostListItemContainer = styled.li`
  padding: 10px;

  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--color-gray-300);
`;

export const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  h2 {
    font-weight: var(--weight-semi-bold);
  }
`;

export const PostBodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: var(--font-small);
  font-weight: var(--weight-light);
  color: var(--color-gray-100);

  div {
    display: flex;
    align-items: center;
    margin-bottom: 4px;

    svg {
      margin-right: 4px;
    }
  }
`;