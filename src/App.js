import DefaultLayout from './components/layout/layout'
import { GlobalStyle } from './styles/global-style'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import Main from './components/main'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <Main />
        </DefaultLayout>
      </ThemeProvider>
    </>
  )
}
