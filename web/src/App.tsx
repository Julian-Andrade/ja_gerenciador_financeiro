import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes />
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
