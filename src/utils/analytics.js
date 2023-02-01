import ReactGA from 'react-ga'

export const initGA = () => {
  // ReactGA.initialize('UA-83609754-1') //production
  ReactGA.initialize('UA-83609754-2') //dev
}

export const logGAEvent = (action = '', label = '') => {
  if (action) {
    ReactGA.event({
      action,
      label,
      category: 'Projects',
    })
  }
}
