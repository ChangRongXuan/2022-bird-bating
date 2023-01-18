import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ReactComponent as DonateSVG } from '../assets/donation.svg'
import { FaceBookIcon, LineIcon, LinkIcon } from './icons/social-icons'
import SidebarList from './sidebar-list'
import CopyAlert from './copy-alert'

const animationStyle = `
  transition-property: all; // all properties will get a transition effect
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
`
const Container = styled.div`
  ${animationStyle}
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.darkGrey};
  visibility: ${(prop) => (prop.show ? 'visible' : 'hidden')};
  padding: 122px 24px;
  transform: ${(prop) =>
    prop.show ? 'translateX(0px)' : 'translateX(-235px)'};

  ${({ theme }) => theme.breakpoint.xl} {
    background-color: transparent;
    visibility: visible;
    transform: translateX(0px);
    display: flex;
    justify-content: flex-end;
    padding: 122px 50px;

    .content-box {
      max-width: 250px;
    }
  }
`
const DonateButton = styled.button`
  background: ${({ theme }) => theme.backgroundColor.black};
  border-radius: 32px;
  color: ${({ theme }) => theme.textColor.white};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  svg {
    margin-right: 5px;
  }
`

const SocialIcon = styled.div`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    cursor: pointer;
    display: inline-block;
    width: 100px;
    display: flex;
    margin-bottom: 13px;
    svg {
      margin-right: 8px;
    }
  }
`

export default function SidebarContent({
  show,
  data = { blocks: [], entityMap: {} },
}) {
  const [origin, setOrigin] = useState('')
  const [alertShow, setAlertShow] = useState('')

  function handleCopy() {
    navigator.clipboard.writeText(origin)
    setAlertShow('animated fadeOut')
    setTimeout(() => {
      setAlertShow('')
    }, '3000')
  }

  const iconConfigs = [
    {
      index: 1,
      icon: <FaceBookIcon />,
      link: `https://www.facebook.com/share.php?u=${origin}`,
    },
    {
      index: 2,
      icon: <LineIcon />,
      link: `https://social-plugins.line.me/lineit/share?url=${origin}`,
    },
    {
      index: 3,
      icon: <LinkIcon />,
      click: handleCopy,
    },
  ]

  useEffect(() => {
    setOrigin(() => window.location.origin + window.location.pathname)
  }, [])

  const shareIcons = iconConfigs.map((cfg) => {
    return (
      <a
        href={cfg.link}
        target="_blank"
        rel="noopener noreferrer"
        key={cfg.index}
        onClick={cfg.click}
      >
        {cfg.icon}
      </a>
    )
  })
  return (
    <>
      <Container show={show}>
        <div className="content-box">
          <SocialIcon>{shareIcons}</SocialIcon>
          <DonateButton>
            <DonateSVG />
            <span>贊助本文</span>
          </DonateButton>
          <SidebarList data={data} />
        </div>
      </Container>
      <CopyAlert alertShow={alertShow} />
    </>
  )
}
