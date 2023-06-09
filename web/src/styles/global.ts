import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-transform: none;
    text-decoration: none;
  }

  body {
    background-color: ${(props) => props.theme.colors['gray-300']};
    color: ${(props) => props.theme.colors['gray-400']};
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;

    button {
      cursor: pointer;
    }
  }
`
