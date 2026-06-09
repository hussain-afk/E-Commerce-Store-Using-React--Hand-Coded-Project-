import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {useContext} from 'react'
import ProductProvider from './utils/context/ProductApi.jsx'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>,
)
