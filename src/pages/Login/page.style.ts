import styled from 'styled-components';

export const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: var(--font-large);

  span {
    font-weight: var(--weight-bold);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  position: fixed;
  bottom: 60px;

  & > img {
    margin: 0 auto;
  }
`;

export const Header = styled.header`
  padding: 10px 20px;
  position: absolute;
  top: 0;
  height: var(--header-height);
  display: flex;
  align-items: center;
`;
