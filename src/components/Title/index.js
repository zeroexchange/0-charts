import { Flex } from 'rebass'
import Link from '../Link'
import Logo from '../../assets/0-icon.png'
import React from 'react'
import { RowFixed } from '../Row'
import Wordmark from '../../assets/zero-logo-text.png'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

export default function Title() {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
          <UniIcon id="link" onClick={() => history.push('/')}>
            <img width={'34px'} height={'34px'} src={Logo} alt="logo" />
          </UniIcon>
          <img width={'64px'} style={{ marginLeft: '8px', marginTop: '0px' }} src={Wordmark} alt="logo" />
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}
