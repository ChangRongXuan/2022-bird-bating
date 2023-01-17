import styled from 'styled-components'

import MirrorMediaIcon from './mirror-icon'
import ShareButton from './share-button'

const Container = styled.div`
  z-index: 100;
  width: 100%;
  height: 46px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.breakpoint.md} {
    height: 70px;
  }
`

export default function Header() {
  return (
    <Container>
      <MirrorMediaIcon />
      <ShareButton />
    </Container>
  )
}
