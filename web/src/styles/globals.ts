import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  :root {
    --primary-color: #278CC5;
    --text-color: #676261;
    --text-color-secondary: #7E7978;
    --text-color-light: #F3F3F3;
    --background-color: #E5E5E5;
    --background-button-color: #5BBEC2;
    --background-button-danger-color: #E85545;
    --button-primary-color: #5BBEC2;
    --yellow-color: #F7AE3A;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: var(--background-color);
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
  }
  
  body, input, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    font-family: Ubuntu;
  }
`;

export default GlobalStyle;