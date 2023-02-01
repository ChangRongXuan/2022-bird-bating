import styled from 'styled-components'
import { useState } from 'react'
import { ReactComponent as ToggleSVG } from '../assets/sidebar.svg'
import SidebarContent from './sidebar-content'

const SidebarContainer = styled.div`
  font-family: 'PingFang TC';
  z-index: 50;
  display: block;
  width: calc((100vw - 600px) / 2);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  ${({ theme }) => theme.breakpoint.xl} {
    width: calc((100vw - 776px) / 2);
  }
`

const ButtonWrapper = styled.div`
  display: block;
  width: 235px;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;

  ${({ theme }) => theme.breakpoint.xl} {
    width: calc((100vw - 776px) / 2);
  }
`
const ToggleButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundColor.brown};
  position: absolute;
  top: 50;
  margin: 46px 11px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;

  svg {
    max-width: 10px;
    transition-duration: 0.3s;
    transform: ${(prop) => (prop.show ? 'rotate(90deg)' : 'rotate(0deg)')};
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin: 70px 27px 20px;
    width: 32px;
    height: 32px;

    svg {
      max-width: none;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
export default function Sidebar({ data = { blocks: [], entityMap: {} } }) {
  const [show, setShow] = useState(false)

  return (
    <SidebarContainer>
      <ButtonWrapper>
        <ToggleButton
          onClick={() => {
            setShow(!show)
          }}
          show={show}
        >
          <ToggleSVG />
        </ToggleButton>
        <SidebarContent show={show} data={data} setShow={setShow} />
      </ButtonWrapper>
    </SidebarContainer>
  )
}
