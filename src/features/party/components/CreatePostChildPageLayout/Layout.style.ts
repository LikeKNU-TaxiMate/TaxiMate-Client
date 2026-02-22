import styled from 'styled-components';

export const Container = styled.div<{ $subTitle?: string }>`
  height: 100%;
  overflow: auto;

  ${(props) => props.$subTitle && 'padding: 10px 20px;'}
`;

export const SubTitle = styled.h2`
  padding: 10px 0 20px;

  font-weight: var(--weight-bold);
  font-size: var(--font-medium);
`;
