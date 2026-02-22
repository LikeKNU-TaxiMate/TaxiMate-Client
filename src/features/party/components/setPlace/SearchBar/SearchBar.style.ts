import styled from 'styled-components';

export const SearchBarWrapper = styled.button`
  width: 100%;
  height: 46px;
  padding: 14px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 8px;
  background: var(--color-white);
  box-shadow: 0 0 2px 2px var(--color-gray-300);
`;

export const SearchBarContainer = styled.div`
  width: 90%;
  font-size: var(--font-small);

  border: none;
  border-radius: 8px;

  color: var(--color-gray-200);

  text-align: left;
`;
