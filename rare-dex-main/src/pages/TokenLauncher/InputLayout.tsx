import React, { useContext, useCallback } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useENS from '../../hooks/useENS';
import { useActiveWeb3React } from '../../hooks';
import { ExternalLink, TYPE } from '../../theme';
import { AutoColumn } from '../../components/Column';
import { RowBetween } from '../../components/Row';
import { getEtherscanLink } from '../../utils';
import { ChainId } from '@uniswap/sdk';
import { Text } from 'rebass';

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  z-index: 1;
  width: 100%;
`;

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
`;

const InputContainer = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.text4};
  flex: 1 1 auto;
  width: 0;
  height: 48px;
  border-radius: 12px;
  background-color: #0d092885;
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;

export default function InputLayout({
  id,
  value,
  label,
  desc,
  onChange,
}: {
  id?: string;
  // the typed string value
  value: string;
  label: string;
  desc: string;
  // triggers whenever the typed value changes
  onChange: (value: string) => void;
}) {
  const { chainId } = useActiveWeb3React();
  // @ts-ignore
  const theme = useContext(ThemeContext);

  const handleInput = useCallback(
    (event) => {
      const input = event.target.value;
      const withoutSpaces = input.replace(/\s+/g, '');
      value = withoutSpaces;
      onChange(withoutSpaces);
    },
    [onChange]
  );

  return (
    <InputPanel id={id}>
      <ContainerRow error={false}>
        <InputContainer>
            <TYPE.black color={theme.text2} fontWeight={500} fontSize={16}>
                {label}
            </TYPE.black>
            <Input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              error={false}
            //   pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
            />
            <Text fontSize={12} color={theme.text2} mt={2}>{desc}</Text>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  );
}
