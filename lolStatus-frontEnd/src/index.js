import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './router';
import { createGlobalStyle } from 'styled-components'
import BgImage from "./assets/background.jpg";


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100%;
  }
  html, #root{
    height: 100%;
    background-image: url(${BgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <MainRouter className="App" />
  </React.StrictMode>,
  document.getElementById('root')
);
