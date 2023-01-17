// export type ThemeType = typeof theme;

const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1440,
  '3xl': 1600,
  '4xl': 1920,
}
const sharedColor = {
  green: '#2B3A1B',
  black: '#000000',
  white: '#FFFFFF',
  brown: '#D4BC97',
}
export const theme = {
  backgroundColor: {
    green: sharedColor.green,
    brown: sharedColor.brown,
    grey: 'rgba(73, 73, 73, 0.8)',
    black: sharedColor.black,
    darkGrey: '#747474',
  },
  textColor: {
    white: sharedColor.white,
    green: sharedColor.green,
    brown: sharedColor.brown,
  },
  borderColor: {
    white: sharedColor.white,
    green: sharedColor.green,
    brown: sharedColor.brown,
  },
  fontSize: {
    'title-sm': 'font-size:22px; line-height: 1.8',
    'title-md': 'font-size:36px; line-height: 1.5',
    'title-xl': 'font-size:48px; line-height: 1.5',
    'subtitle-md': 'font-size:16px; line-height: 1.5',
    'subtitle-xl': 'font-size:21px; line-height: 1.5',
    'content-sm': 'font-size:18px; line-height: 1.5',
    'content-xl': 'font-size:28px; line-height: 1.5',
  },
  breakpoint: {
    xs: `@media (min-width: ${mediaSize.xs}px)`,
    sm: `@media (min-width: ${mediaSize.sm}px)`,
    md: `@media (min-width: ${mediaSize.md}px)`,
    lg: `@media (min-width: ${mediaSize.lg}px)`,
    xl: `@media (min-width: ${mediaSize.xl}px)`,
    xxl: `@media (min-width: ${mediaSize.xxl}px)`,
    '3xl': `@media (min-width: ${mediaSize['3xl']}px)`,
    '4xl': `@media (min-width: ${mediaSize['4xl']}px)`,
  },
}

export default theme
