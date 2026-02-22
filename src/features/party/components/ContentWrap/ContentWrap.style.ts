import styled from 'styled-components';

export const ContentContainer = styled.div`
  padding: 15px 0;

  & > button {
    width: 100%;
    text-align: left;
  }
`;

export const ContentTitle = styled.h2`
  padding: 10px 0 20px;

  display: flex;
  flex-direction: column;

  font-weight: var(--weight-semi-bold);
  font-size: 18px;

  svg {
    margin-left: 5px;
  }

  div {
    display: flex;
  }

  p {
    padding-top: 10px;
    font-size: var(--font-small);
    font-weight: var(--weight-regular);
    color: var(--color-gray-100);
  }
`;
