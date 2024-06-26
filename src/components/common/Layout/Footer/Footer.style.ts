import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.footer`
  height: var(--footer-height);

  display: flex;

  box-sizing: border-box;
  padding: 10px 20px;
  z-index: 999;

  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray-300);
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavItem = styled(Link)`
  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  color: var(--color-gray-200);
  font-weight: var(--weight-light);
  font-size: var(--font-micro);
`;
