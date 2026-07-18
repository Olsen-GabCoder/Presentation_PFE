// Relais WebSocket pour la télécommande smartphone.
// Usage : node remote-server.mjs  (à lancer à côté de `npm run dev -- --host`)
import { WebSocketServer } from 'ws'
import os from 'node:os'

const PORT = 3535

function lanIps() {
  const out = []
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const i of ifaces ?? []) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address)
    }
  }
  return out
}

const wss = new WebSocketServer({ port: PORT })
const clients = new Set()

wss.on('connection', (ws) => {
  clients.add(ws)
  // L'écran utilise cette liste pour construire l'URL du QR code
  ws.send(JSON.stringify({ type: 'hello', ips: lanIps(), port: PORT }))
  ws.on('message', (msg) => {
    // Relais simple : rediffuse à tous les autres clients
    for (const c of clients) {
      if (c !== ws && c.readyState === 1) c.send(msg.toString())
    }
  })
  ws.on('close', () => clients.delete(ws))
  ws.on('error', () => clients.delete(ws))
})

console.log(`Relais telecommande sur ws://0.0.0.0:${PORT}`)
console.log(`IP(s) LAN detectee(s) : ${lanIps().join(', ') || 'aucune'}`)
