import styled from 'styled-components';

export const PostDetailHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  color: var(--color-gray-100);
  font-size: var(--font-small);

  & > div {
    display: flex;
  }
`;

const statusTag = styled.div`
  margin-left: 5px;
  padding: 8px;
  border-radius: 20px;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
`;

export const ParticipationTag = styled(statusTag)`
  color: var(--color-available-text);
  background-color: var(--color-available-background);
`;

export const CloseTag = styled(statusTag)`
  color: var(--color-unavailable-text);
  background-color: var(--color-unavailable-background);
`;
