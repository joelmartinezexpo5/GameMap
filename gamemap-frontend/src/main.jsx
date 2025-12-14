import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppEnrutador from './routes/AppEnrutador.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEnrutador />
  </StrictMode>,
)
