import styled from 'styled-components'
import { useState } from 'react'
import { ReactComponent as ToggleSVG } from '../assets/sidebar.svg'
import SidebarContent from './sidebar-content'
import { logGAEvent } from '../utils/analytics'

const SidebarContainer = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoint.md} {
    font-family: 'PingFang TC';
    z-index: 50;
    display: block;
    width: calc((100vw - 600px) / 2);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: calc((100vw - 776px) / 2);
  }
`

const ButtonWrapper = styled.div`
  display: none;
  ${({ theme }) => theme.breakpoint.md} {
    display: block;
    width: 235px;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: calc((100vw - 776px) / 2);
  }
`
const ToggleButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundColor.brown};
  position: absolute;
  top: 50;
  margin: 70px 24px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;

  svg {
    transition-duration: 0.3s;
    transform: ${(prop) => (prop.show ? 'rotate(90deg)' : 'rotate(0deg)')};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
export default function Sidebar() {
  const [show, setShow] = useState(false)

  return (
    <SidebarContainer>
      <ButtonWrapper>
        <ToggleButton
          onClick={() => {
            setShow(!show)
            logGAEvent('click', '點擊展開按鈕')
          }}
          show={show}
        >
          <ToggleSVG />
        </ToggleButton>
        <SidebarContent show={show} />
      </ButtonWrapper>
    </SidebarContainer>
  )
}
