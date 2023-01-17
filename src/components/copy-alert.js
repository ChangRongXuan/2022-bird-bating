import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const CopyAlert = styled.div`
  p {
    padding: 21px 10px;
    border-radius: 16px;
    background: ${({ theme }) => theme.backgroundColor.grey};
    color: ${({ theme }) => theme.textColor.white};
    text-align: center;
    position: fixed;
    top: 54px;
    left: 50%;
    width: 200px;
    margin: auto;
    cursor: default;
    transform: translate(-50%, 0);
    opacity: 0;
  }

  .animated {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }

  @-webkit-keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export default function Alert({ alertShow = '' }) {
  return (
    <CopyAlert>
      <p className={alertShow}>已複製連結至剪貼簿</p>
    </CopyAlert>
  )
}
