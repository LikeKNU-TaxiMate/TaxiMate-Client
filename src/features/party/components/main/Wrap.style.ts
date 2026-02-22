import styled from 'styled-components';

export const TitleInput = styled.input`
  margin-top: -10px;

  width: 100%;

  padding: 12px;

  border-radius: 12px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);
  font-weight: var(--weight-regular);

  &::placeholder {
    color: var(--color-gray-200);
  }

  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  margin-top: -10px;

  width: 100%;
  height: 150px;

  padding: 12px;

  border-radius: 12px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);
  font-weight: var(--weight-regular);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--color-gray-200);
  }
`;

export const DepartureTimeContainer = styled.button`
  display: flex;
  justify-content: space-between;

  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);

  div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export const CheckLength = styled.div`
  text-align: right;
  color: var(--color-gray-200);
  font-size: var(--font-semi-micro);
  font-weight: var(--weight-regular);

  padding: 2px 8px;
`;
