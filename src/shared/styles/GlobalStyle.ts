import { createGlobalStyle } from 'styled-components';

import { color, font, mixin } from './styles';
// import { mixin } from '';

export default createGlobalStyle`
  html, body, #root {
    font-family: 'Aleo', serif;
    font-family: 'Itim', cursive;
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'Playfair Display', serif;
    font-family: 'Roboto', sans-serif;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    color: ${color.textDarkest};
    -webkit-tap-highlight-color: transparent;
    line-height: 1.2;
    ${font.size(16)}
        padding: 60px 0 0;
      max-width: 700px;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-weight: 500;
  }

  *, *:after, *:before, input[type="search"] {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  ul, li, ol, dd, h1, h2, h3, h4, h5, h6, p {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    background: none;
    border: none;
  }

  /* Workaround for IE11 focus highlighting for select elements */
  select::-ms-value {
    background: none;
    color: #42413d;
  }

  [role="button"], button, input, select, textarea {
    outline: none;
    &:focus {
      outline: none;
    }
    &:disabled {
      opacity: 1;
    }
  }
  [role="button"], button, input, textarea {
    appearance: none;
  }
  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  select::-ms-expand {
    display: none;
  }
  select option {
    color: ${color.textDarkest};
  }

  p {
    line-height: 1.4285;
    a {
      ${mixin.link()}
    }
  }

  textarea {
    line-height: 1.4285;
  }

  body, select {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    touch-action: manipulation;
  }

  ${mixin.placeholderColor(color.textLight)}
`;