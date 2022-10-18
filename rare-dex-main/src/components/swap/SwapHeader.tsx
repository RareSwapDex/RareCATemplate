import React from 'react';
import styled from 'styled-components';
import Settings from '../Settings';
import { RowBetween } from '../Row';
import { TYPE } from '../../theme';

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: 0.4rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`;

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TYPE.black fontWeight={500} text-shadow={'rgb(255 255 255) 0px 0px 0.1em, rgb(255 255 255) 0px 0px 0.2em, rgb(255 255 255) 0px 0px 0.3em, rgb(255 119 255) 0px 0px 0.4em, rgb(255 0 255) 0px 0px 0.6em, rgb(255 0 255) 0px 0px 0.8em, rgb(255 0 255) 0px 0px 1em, rgb(255 0 255) 0px 0px 1.2em'}>Swap</TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  );
}
