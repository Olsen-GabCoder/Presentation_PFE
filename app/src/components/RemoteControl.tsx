import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react'
import { useRemoteSocket } from '../engine/useRemote'

// Interface télécommande affichée sur le smartphone (?remote=1)
export default function RemoteControl() {
  const [slide, setSlide] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  const { connected, send } = useRemoteSocket((msg) => {
    if (msg.type === 'state') {
      if (typeof msg.slide === 'number') setSlide(msg.slide)
      if (typeof msg.total === 'number') setTotal(msg.total)
    }
  })

  // Demande l'état courant dès la connexion (sinon le compteur reste vide jusqu'à la 1re commande)
  useEffect(() => {
    if (connected) send({ type: 'cmd', action: 'sync' })
  }, [connected, send])

  const cmd = (action: 'next' | 'prev' | 'blackout') => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action })
  }

  return (
    <div
      className="fixed inset-0 flex flex-col select-none"
      style={{ background: '#0a0a0c', color: '#fff', touchAction: 'manipulation' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '16px 20px' }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <img src="/mika-logo.png" alt="MIKA" style={{ height: 22, objectFit: 'contain' }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Télécommande
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 6 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: connected ? '#34d399' : '#c8102e',
          }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            {connected ? 'Connecté' : 'Connexion...'}
          </span>
        </div>
      </div>

      {/* Slide courante */}
      <div className="flex flex-col items-center justify-center" style={{ padding: '10px 0 18px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 44, fontWeight: 800, margin: 0, lineHeight: 1, color: '#fff',
        }}>
          {slide !== null ? slide + 1 : '–'}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 24, fontWeight: 600 }}>
            {' '}/ {total ?? '–'}
          </span>
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '6px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Slide courante
        </p>
      </div>

      {/* Bouton principal — Suivant */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => cmd('next')}
        className="flex-1 flex flex-col items-center justify-center"
        style={{
          margin: '0 16px',
          borderRadius: 20,
          border: 'none',
          background: 'linear-gradient(160deg, #c8102e 0%, #8f0b21 100%)',
          color: '#fff', cursor: 'pointer',
        }}
      >
        <ChevronRight style={{ width: 64, height: 64 }} strokeWidth={2.5} />
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Suivant
        </span>
      </motion.button>

      {/* Rangée secondaire */}
      <div className="flex" style={{ gap: 12, padding: 16 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => cmd('prev')}
          className="flex-1 flex items-center justify-center"
          style={{
            height: 84, borderRadius: 16, border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', gap: 8,
          }}
        >
          <ChevronLeft style={{ width: 28, height: 28 }} strokeWidth={2.5} />
          <span style={{ fontSize: 15, fontWeight: 600 }}>Précédent</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => cmd('blackout')}
          className="flex items-center justify-center"
          style={{
            width: 100, height: 84, borderRadius: 16, border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
          }}
          title="Écran noir"
        >
          <Moon style={{ width: 26, height: 26 }} strokeWidth={2} />
        </motion.button>
      </div>
    </div>
  )
}
