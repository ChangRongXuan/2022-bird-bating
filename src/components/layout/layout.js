import styled from 'styled-components'
import Header from './header'

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.green};
`

const Main = styled.div`
  width: 100%;
`

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  )
}
