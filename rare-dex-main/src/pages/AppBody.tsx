import React from 'react';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  padding: 0.2rem;
  border-radius: 1.6rem;
  box-shadow: 0 0 15px white;
  // background: ${({ theme }) => theme.bg1};
  background-color: #0d032d;
  box-shadow: 0 0 0.25rem #fff, inset 0 0 0.25rem #fff, 0 0 1rem #00e5ff, inset 0 0 1rem #00e5ff, 0 0 2rem #00e5ff, inset 0 0 2rem #00e5ff;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 90%;
  `}
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
