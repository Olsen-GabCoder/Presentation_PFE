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
  action?: 'next' | 'prev' | 'goto' | 'blackout' | 'sync' | 'start' | 'mute'
  n?: number
  // state
  slide?: number
  total?: number
  started?: boolean
  muted?: boolean
  blackout?: boolean
  elapsed?: number
}

// Connexion au relais WebSocket avec reconnexion automatique.
export function useRemoteSocket(onMessage: (msg: RemoteMessage) => void) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const onMsgRef = useRef(onMessage)
  onMsgRef.current = onMessage

  useEffect(() => {
    // Prod (HTTPS) : le relais tourne sur la même origine que les slides → wss://
    // Local (HTTP/Vite) : relais séparé sur le port 3535 → ws://
    const wsUrl = window.location.protocol === 'https:'
      ? `wss://${window.location.host}`
      : `ws://${window.location.hostname}:${WS_PORT}`
    let closed = false
    let retry: ReturnType<typeof setTimeout> | null = null
    const connect = () => {
      if (closed) return
      let ws: WebSocket
      try {
        ws = new WebSocket(wsUrl)
      } catch {
        return // environnement sans WebSocket — on abandonne silencieusement
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
