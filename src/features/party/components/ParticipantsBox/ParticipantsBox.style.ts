import styled from 'styled-components';

export const ParticipantsBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    max-width: 50%;
    flex-grow: 0.5;
  }
`;
