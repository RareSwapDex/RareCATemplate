import React, { useCallback } from 'react';
import { useActiveWeb3React } from '../../hooks';
import styled from 'styled-components';
import { ChainId } from '@uniswap/sdk';
import { useWalletModalToggle } from 'state/application/hooks';

const VersionLabel = styled.div<{ enabled: boolean }>`
  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  background: ${({ theme, enabled }) => (enabled ? theme.primary1 : 'none')};
  color: ${({ theme, enabled }) => (enabled ? theme.white : theme.text1)};
  font-size: 1rem;
  font-weight: ${({ enabled }) => (enabled ? '500' : '400')};
  :hover {
    user-select: ${({ enabled }) => (enabled ? 'none' : 'initial')};
    background: ${({ theme, enabled }) => (enabled ? theme.primary1 : 'none')};
    color: ${({ theme, enabled }) => (enabled ? theme.white : theme.text1)};
  }
`

const NetworkToggle = styled.div`
  border-radius: 12px;
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.primary1};
  display: flex;
  width: fit-content;
  margin-left: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`

export default function NetworkSwitch() {
  const { chainId, library, account } = useActiveWeb3React()
  const versionSwitchAvailable = chainId === ChainId.MAINNET
  const toggleWalletModal = useWalletModalToggle();
  let targetChainId = ChainId.MAINNET
  const handleChangeNetwork = useCallback((targetChainId: number) => {
    try {
      let targetChain = ''
      if (targetChainId === chainId) {
        return
      } else if (chainId === ChainId.MAINNET) {
        targetChain = '0x38'
      } else {
        targetChain = '0x1'
      }
      library?.provider.request!({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: targetChain
          }
        ]
      })
    } catch {}
  }, [library, chainId])

  return (
    <NetworkToggle >
      <VersionLabel enabled={versionSwitchAvailable} onClick={() => {console.log('here'); targetChainId = ChainId.MAINNET; account ? handleChangeNetwork(targetChainId) : toggleWalletModal(), handleChangeNetwork(targetChainId)}}>ETH</VersionLabel>
      <VersionLabel enabled={!versionSwitchAvailable} onClick={() => {console.log('here1'); targetChainId = ChainId.BSCNET; account ? handleChangeNetwork(targetChainId) : toggleWalletModal(), handleChangeNetwork(targetChainId)}}>BSC</VersionLabel>
    </NetworkToggle>
  )
}
