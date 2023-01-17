import ReactGA from 'react-ga'

export const initGA = () => {
  // ReactGA.initialize('UA-83609754-1'); 這邊放代碼
  ReactGA.initialize('UA-83609754')
}

export const logGAEvent = (action = '', label = '') => {
  if (action) {
    ReactGA.event({
      action,
      label,
      category: '2022BirdBating',
    })
  }
}
