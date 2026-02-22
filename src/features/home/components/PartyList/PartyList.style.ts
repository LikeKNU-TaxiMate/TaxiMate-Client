import styled, { keyframes } from 'styled-components';

export const PartyListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 20px var(--footer-height);
`;

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ActivePartyListContainer = styled.ul`
  margin: 0 auto;
  max-width: 380px;
  width: 90%;
  padding: 0 20px;

  background-color: var(--color-white);

  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 90px;
  border-radius: 16px;

  animation: ${fadeIn} 0.5s ease-in-out;
  opacity: 0;
  animation-fill-mode: forwards;
`;
