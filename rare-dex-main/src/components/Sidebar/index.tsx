import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Styles } from '../styles/sidebarStyle'
// import Expand from './expand'
// import RightIcon from './rightIcon'
import { darken } from 'polished';

const Sidebar = ({ children, menuOpened, setMenuOpened }: {
  children: React.ReactElement;
  menuOpened: boolean;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  const activeClassName = 'ACTIVE';

const SubNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`;

console.log('menuOpenedqq', menuOpened)
  return (
    <Styles menuOpened={menuOpened}>
      <div className='sidebar'>
        <div className='topbar'>
          <div className='list'>

            <SubNavLink to={'/swap'} className={`item${location.pathname === '/swap'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/swap_icon.svg' alt='swap_icon' />
                </div>
                <div className='title'>Swap</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/pool'} className={`item${location.pathname === '/pool'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/pool_icon.svg' alt='pool_icon' />
                </div>
                <div className='title'>Pool</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/staking'} className={`item${location.pathname === '/staking'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/staking_icon.svg' alt='staking_icon' />
                </div>
                <div className='title'>Staking</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/tokenlauncher'} className={`item${location.pathname === '/tokenlauncher'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/gas_icon.svg' alt='token launcher_icon' />
                </div>
                <div className='title'>Token Launcher</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/developers'} className={`item${location.pathname === '/developers'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/dev_icon.svg' alt='developers_icon' />
                </div>
                <div className='title'>Developers</div>
              </div>
            </SubNavLink>

            
            <SubNavLink to={'/gasless'} className={`item${location.pathname === '/gasless'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/gas_icon.svg' alt='gasless_icon' />
                </div>
                <div className='title'>Gasless</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/community'} className={`item${location.pathname === '/community'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/dev_icon.svg' alt='community_icon' />
                </div>
                <div className='title'>Community</div>
              </div>
            </SubNavLink>

            <SubNavLink to={'/docs'} className={`item${location.pathname === '/docs'?' active':''}`} onClick={()=> setMenuOpened(false)}>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/docs_icon.svg' alt='docs_icon' />
                </div>
                <div className='title'>Docs</div>
              </div>
            </SubNavLink>

           
          </div>
        </div>
{/* 
        <div className='divider'>
          <div className='divider-line'></div>
        </div>

        
        <div className='topbar'>
          <div className='list'>
            <div className='item'>
              <div className='left-item'>
                <div className='left-icon'>
                  <img src='/assets/svg/entry-icon-trade.svg' alt='entry-icon-trade' />
                </div>
                <div className='title'>RPC (Triton)</div>
              </div>
              <div className='right-item'>
                <RightIcon />
              </div>
            </div>
          </div>
        </div> */}

      </div>
      {children}
    </Styles>
  )
}
export default Sidebar
