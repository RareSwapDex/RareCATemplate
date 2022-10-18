import React from 'react'

import { Styles } from '../styles/layoutStyle'

const Layout1 = (props: any) => {
  const {children} = props

  return (
    <Styles>
      <div className='layout'>
        <div className='main'>
          <div className='board'>
            {children}
          </div>
        </div>
      </div>
    </Styles>
  )
}
export default Layout1
