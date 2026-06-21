import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {useContext} from 'react'
import ProductProvider from './utils/context/ProductApi.jsx'
import ToastProvider from './utils/context/ToastContext.jsx'
import {Provider} from 'react-redux'
import store from './store/Store.js'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </ToastProvider>
    </Provider>
  </StrictMode>,
)
