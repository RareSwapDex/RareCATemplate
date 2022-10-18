import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { Text } from 'rebass';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Logo from '../../assets/images/rareswap.png';
import CertikLogo from '../../assets/images/certik_logo.png';
// import LogoDark from '../../assets/svg/header_logo.png';
import { useActiveWeb3React } from '../../hooks';
// import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';

import { LightCard } from '../Card';
// import { Moon, Sun } from 'react-feather';
import Row, { RowFixed } from '../Row';
import Web3Status from '../Web3Status';
import NetworkSwitch from './NetworkSwitch';

const HeaderFrame = styled.div`
  width: 100vw;
  // margin: 0.8rem auto;
  padding: 0.8rem 2.6rem;
  z-index: 2;
  // display: grid;
  grid-template-columns: 120px 1fr 120px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: #0d0928;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 60px 1fr 120px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 60px 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0.5rem 1rem;
  `}
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`;

// const HeaderElementWrap = styled.div`
//   display: flex;
//   align-items: center;

//   // ${({ theme }) => theme.mediaWidth.upToSmall`
//   //   margin-top: 0.5rem;
//   // `};

//   // ${({ theme }) => theme.mediaWidth.upToSmall`
//   //   display: none;
//   // `};
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     position: fixed;
//     bottom: 0;
//     padding: .5rem;
//     width: 100%;
//     left: 50%;
//     transform: translateX(-50%);
//     border-radius: 0;
//     border-top: 1px solid ${({ theme }) => theme.bg3};
//   `};
// `

const HeaderRow = styled(RowFixed)`
  display: flex;
  align-items: center;
  margin-left: -20px;

  // ${({ theme }) => theme.mediaWidth.upToMedium`
  //   width: 100%;
  // `};
`;

const HeaderCertikRow = styled(RowFixed)`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
  `};
`;

const HeaderLinks = styled(Row)`
  width: auto;
  // display: flex;
  margin: 0 auto;
  padding: 0.1rem;
  justify-content: center;
  border-radius: 30px;
  

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 0;
    // margin-right: auto;
    // box-shadow: 0 0 0.25rem #fff, inset 0 0 0.25rem #0d032d, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    position: fixed;
    bottom: 0;
    padding: .5rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.bg3};
    background: #0d0928;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    // position: fixed;
    bottom: 0;
    padding: .5rem;
    background: #0d0928;
    // width: 100%;
    // left: 50%;
    transform: translateX(-50%);
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.bg3};
  `};
`;

const RoundStyle = styled.div`
  width: auto;
  display: flex;
  margin: 0 auto;
  padding: 0.1rem;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0 0 0.25rem #fff, inset 0 0 0.25rem #0d032d, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 0;
    // margin-right: auto;
    box-shadow: 0 0 0.25rem #fff, inset 0 0 0.25rem #0d032d, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a, 0 0 1rem #fad63a, inset 0 0 0rem #fad63a;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    bottom: 0;
    left: 50%;
    // border-top: 1px solid ${({ theme }) => theme.bg3};
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    // position: fixed;
    bottom: 0;
    // padding: .5rem;
    // width: 100%;
    // left: 50%;
    // border-top: 1px solid ${({ theme }) => theme.bg3};
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 0.8rem;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  :focus {
    border: 1px solid blue;
  }
  // ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  //   display: none;
  // `}
`;

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`;

const NetworkCard = styled(LightCard)`
  background-color: #2792d6;
  border-radius: 0.8rem;
  padding: 8px 12px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: scale(1.1);
  }
`;

const activeClassName = 'ACTIVE';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 0.9rem;
  width: fit-content;
  padding: 0.3rem 0.6rem;
  font-weight: 500;
  transition: 0.3s;
  width: 100px;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 0.16rem;
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
    // background-color: ${({ theme }) => theme.bg3};
    background-color: rgb(2, 200, 255);
    box-shadow: rgb(255 255 255) 0px 0px 0.25rem, rgb(255 255 255) 0px 0px 0.25rem inset, rgb(0 229 255) 0px 0px 1rem,
      rgb(0 229 255) 0px 0px 1rem inset, rgb(0 229 255) 0px 0px 2rem, rgb(0 229 255) 0px 0px 2rem inset;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // border-radius: 8px;
    padding: 0.3rem 7%;
    // border: 1px solid ${({ theme }) => theme.bg3};

    &:not(:last-child) {
      margin-right: 2%;
    }
  `};
`;

export const MenuIcon = styled.button`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
    background-color: #0d0928;
    width: 40px;
    height: 35px;
    margin-right: 16px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
  `};
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  // [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.BSCNET]: 'Binance',
};

export default function Header(props) {
  const { account, chainId } = useActiveWeb3React();
  const { t } = useTranslation();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];
  const menuOpened = props.menuOpened;
  const setMenuOpened = props.setMenuOpened;
  // const [darkMode, toggleDarkMode] = useDarkModeManager();
  return (
    <HeaderFrame>
      <HeaderRow>
        <Title href=".">
          <Icon>
            <img width={'150px'} src={Logo} alt="logo" />
          </Icon>
        </Title>
      </HeaderRow>
      <HeaderCertikRow>
        <Icon>
          <img width={'100px'} src={CertikLogo} alt="certik-logo" />
        </Icon>
      </HeaderCertikRow>

      <HeaderLinks>
        <MenuIcon onClick={()=>setMenuOpened(!menuOpened)}>
          <img src='assets/svg/msic-menu.svg' alt='more-icon' />
        </MenuIcon>
        <RoundStyle>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            swap
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            pool
          </StyledNavLink>
        </RoundStyle>
        <NetworkSwitch />
      </HeaderLinks>

      <HeaderControls>
        <HeaderElement>
          

          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} {chainId === ChainId.MAINNET ? 'ETH' : 'BNB'}
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>

        
      </HeaderControls>
    </HeaderFrame>
  );
}
