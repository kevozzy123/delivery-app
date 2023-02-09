import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './shared/styles/GlobalStyle'
import AppProvider from './shared/context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <App />
    </AppProvider>
  </React.StrictMode>,
)
