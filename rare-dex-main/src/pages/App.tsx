import React, { Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
// import Polling from '../components/Header/Polling';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import AddLiquidity from './AddLiquidity';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './AddLiquidity/redirects';
import Swap from './Swap';
import Pool from './Pool';
import Staking from './Staking';
import GasLess from './GasLess';
import Community from './Community';
import Docs from './Docs';
import Developers from './Developers';
import PoolFinder from './PoolFinder';
import TokenLauncher from './TokenLauncher';
import RemoveLiquidity from './RemoveLiquidity';
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects';
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly } from './Swap/redirects';
import '../App.css';
import Sidebar from 'components/Sidebar';
// import { Layout } from 'react-feather';

const AppWrapper = styled.div`
  // min-height: 100vh;
  min-height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  background-color: #0d0928;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  background-color: #172c46;
  border-radius: 25px 0 0 0;
`;

export default function App() {
  const [menuOpened, setMenuOpened] = useState(false)
  return (
      <Suspense fallback={null}>
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <HeaderWrapper>
            <Header menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
          </HeaderWrapper>
          <Sidebar menuOpened={menuOpened} setMenuOpened={setMenuOpened}>
            <BodyWrapper>
              <Popups />
              {/* <Polling /> */}
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact strict path="/staking" component={Staking} />
                  <Route exact strict path="/tokenlauncher" component={TokenLauncher} />
                  <Route exact strict path="/developers" component={Developers} />
                  <Route exact strict path="/gasless" component={GasLess} />
                  <Route exact strict path="/Community" component={Community} />
                  <Route exact strict path="/Docs" component={Docs} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact path="/create" component={AddLiquidity} />
                  <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route component={RedirectPathToSwapOnly} />
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
          </Sidebar>
        </AppWrapper>
      </Suspense>
  );
}
