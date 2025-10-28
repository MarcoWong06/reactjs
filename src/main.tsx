import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './test-index.css'
import App from './test-App.tsx'
import Top10Example from './Top10Example.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Top10Example />
  </StrictMode>,
)
