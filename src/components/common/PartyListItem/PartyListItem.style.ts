import styled from 'styled-components';

export const PartyListItemContainer = styled.li`
  padding: 16px 0;

  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--color-gray-300);

  a {
    width: 100%;
    min-width: 0;
  }
`;

export const PartyHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  & > div {
    display: flex;
    align-items: center;
    min-width: 0;

    h2 {
      font-weight: var(--weight-bold);
      margin-right: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.5;
    }
  }

  & > svg {
    margin-left: 6px;
    flex-shrink: 0;
  }
`;

export const PartyBodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  color: var(--color-gray-100);

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 4px;

    svg {
      margin-right: 4px;
    }
  }
`;

export const AddressWrapper = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
