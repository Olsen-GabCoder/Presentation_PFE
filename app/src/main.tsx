import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RemoteControl from './components/RemoteControl.tsx'
import { isRemoteMode } from './engine/useRemote.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRemoteMode() ? <RemoteControl /> : <App />}
  </StrictMode>,
)
