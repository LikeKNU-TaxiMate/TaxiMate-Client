import styled from 'styled-components';

export const OpenOtherAppBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  justify-content: center;
  align-items: flex-end;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const OpenOtherMapAppBtn = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;

  background-color: white;
  padding: 4px 6px;

  font-size: var(--font-semi-micro);
  font-weight: var(--weight-semi-bold);
  color: var(--color-gray-100);

  border: 1px solid var(--color-gray-200);
  border-radius: 5px;
`;
