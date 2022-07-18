import React from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'lib-flexible/flexible'
import App from '@/App.jsx'
// import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
