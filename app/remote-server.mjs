// Serveur de la soutenance : sert le build (dist/) + relais WebSocket télécommande sur le même port.
// - Prod (Render Web Service) : PORT fourni par Render, wss:// sur la même URL que les slides
// - Local : node remote-server.mjs (port 3535) à côté de `npm run dev:lan` (le client vise ws://<ip>:3535)
import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { WebSocketServer } from 'ws'

const PORT = Number(process.env.PORT) || 3535
const DIST = path.join(import.meta.dirname, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
}

function lanIps() {
  const out = []
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const i of ifaces ?? []) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address)
    }
  }
  return out
}

const server = http.createServer((req, res) => {
  if (!existsSync(DIST)) {
    res.writeHead(404).end('dist/ absent — lancer npm run build (en local, ce serveur ne sert que le WebSocket)')
    return
  }
  // Résolution sûre dans dist/ (SPA fallback sur index.html)
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let filePath = path.normalize(path.join(DIST, urlPath))
  if (!filePath.startsWith(DIST) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html')
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] ?? 'application/octet-stream' })
  createReadStream(filePath).pipe(res)
})

const wss = new WebSocketServer({ server })
const clients = new Set()

wss.on('connection', (ws) => {
  clients.add(ws)
  // L'écran utilise cette liste pour construire l'URL du QR code en local (LAN)
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

server.listen(PORT, () => {
  console.log(`Serveur soutenance (statique + relais WS) sur port ${PORT}`)
  console.log(`IP(s) LAN detectee(s) : ${lanIps().join(', ') || 'aucune'}`)
})
