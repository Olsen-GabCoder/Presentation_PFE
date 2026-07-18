import { useEffect, useRef, useState, useCallback } from 'react'

const WS_PORT = 3535

export function isRemoteMode(): boolean {
  return new URLSearchParams(window.location.search).has('remote')
}

export interface RemoteMessage {
  type: 'hello' | 'cmd' | 'state'
  // hello
  ips?: string[]
  port?: number
  // cmd
  action?: 'next' | 'prev' | 'goto' | 'blackout' | 'sync'
  n?: number
  // state
  slide?: number
  total?: number
}

// Connexion au relais WebSocket avec reconnexion automatique.
export function useRemoteSocket(onMessage: (msg: RemoteMessage) => void) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const onMsgRef = useRef(onMessage)
  onMsgRef.current = onMessage

  useEffect(() => {
    // La télécommande n'existe qu'en local : une page HTTPS (prod Render) ne peut pas ouvrir de ws://
    if (window.location.protocol === 'https:') return
    let closed = false
    let retry: ReturnType<typeof setTimeout> | null = null
    const connect = () => {
      if (closed) return
      let ws: WebSocket
      try {
        ws = new WebSocket(`ws://${window.location.hostname}:${WS_PORT}`)
      } catch {
        return // environnement sans WebSocket possible — on abandonne silencieusement
      }
      wsRef.current = ws
      ws.onopen = () => setConnected(true)
      ws.onmessage = (e) => {
        try { onMsgRef.current(JSON.parse(e.data)) } catch { /* message non JSON ignoré */ }
      }
      ws.onclose = () => {
        setConnected(false)
        if (!closed) retry = setTimeout(connect, 2000)
      }
      ws.onerror = () => ws.close()
    }
    connect()
    return () => {
      closed = true
      if (retry) clearTimeout(retry)
      wsRef.current?.close()
    }
  }, [])

  const send = useCallback((msg: RemoteMessage) => {
    const ws = wsRef.current
    if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg))
  }, [])

  return { connected, send }
}
