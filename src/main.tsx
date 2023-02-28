import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './shared/styles/GlobalStyle'
import AppProvider from './shared/context'
import { Provider } from 'react-redux'
import store from './shared/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppProvider>
      <GlobalStyle />
      <App />
    </AppProvider>
  </Provider>
  // </React.StrictMode>,
)
