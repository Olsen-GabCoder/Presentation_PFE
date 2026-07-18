import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon, Volume2, VolumeX, LayoutGrid, Play, X } from 'lucide-react'
import { useRemoteSocket } from '../engine/useRemote'
import { useT } from '../i18n'

// Poste de pilotage complet affiché sur le smartphone (?remote=1)
export default function RemoteControl() {
  const titles = useT().ui.slideNav.titles

  const [slide, setSlide] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [started, setStarted] = useState<boolean | null>(null)
  const [muted, setMuted] = useState(false)
  const [blackout, setBlackout] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)

  // Chrono local resynchronisé par le battement de coeur de l'écran
  const [elapsed, setElapsed] = useState(0)
  const lastSync = useRef<{ elapsed: number; at: number } | null>(null)

  const { connected, send } = useRemoteSocket((msg) => {
    if (msg.type === 'state') {
      if (typeof msg.slide === 'number') setSlide(msg.slide)
      if (typeof msg.total === 'number') setTotal(msg.total)
      if (typeof msg.started === 'boolean') setStarted(msg.started)
      if (typeof msg.muted === 'boolean') setMuted(msg.muted)
      if (typeof msg.blackout === 'boolean') setBlackout(msg.blackout)
      if (typeof msg.elapsed === 'number') {
        lastSync.current = { elapsed: msg.elapsed, at: Date.now() }
        setElapsed(msg.elapsed)
      }
    }
  })

  // Demande l'état courant dès la connexion
  useEffect(() => {
    if (connected) send({ type: 'cmd', action: 'sync' })
  }, [connected, send])

  // Tic local du chrono entre deux syncs
  useEffect(() => {
    const iv = setInterval(() => {
      if (lastSync.current && lastSync.current.elapsed > 0) {
        setElapsed(lastSync.current.elapsed + Math.floor((Date.now() - lastSync.current.at) / 1000))
      }
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const cmd = (action: 'next' | 'prev' | 'blackout' | 'start' | 'mute') => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action })
  }
  const goto = (n: number) => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action: 'goto', n })
    setGridOpen(false)
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')
  const chronoColor = elapsed >= 900 ? '#ef4444' : elapsed >= 720 ? '#f59e0b' : 'rgba(255,255,255,0.75)'

  const showSplashStart = started === false

  return (
    <div
      className="fixed inset-0 flex flex-col select-none"
      style={{ background: '#0a0a0c', color: '#fff', touchAction: 'manipulation' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '14px 18px' }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <img src="/mika-logo.png" alt="MIKA" style={{ height: 20, objectFit: 'contain' }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Télécommande
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: chronoColor }}>
            {mm}:{ss}
          </span>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: connected ? '#34d399' : '#c8102e',
          }} />
        </div>
      </div>

      {/* Slide courante + titre + suivante */}
      <div className="flex flex-col items-center" style={{ padding: '4px 20px 14px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1, color: '#fff',
        }}>
          {slide !== null ? slide + 1 : '–'}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 22, fontWeight: 600 }}>
            {' '}/ {total ?? '–'}
          </span>
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', margin: '8px 0 0', textAlign: 'center' }}>
          {slide !== null ? titles[slide] ?? '' : 'En attente de l\u2019écran...'}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '3px 0 0', textAlign: 'center' }}>
          {slide !== null && total !== null && slide + 1 < total
            ? `Suivante : ${titles[slide + 1] ?? ''}`
            : slide !== null && total !== null ? 'Dernière slide' : ''}
        </p>
      </div>

      {/* Bouton principal — Démarrer ou Suivant */}
      {showSplashStart ? (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => cmd('start')}
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            margin: '0 16px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(160deg, #1f8a4c 0%, #14532d 100%)',
            color: '#fff', cursor: 'pointer', gap: 10,
          }}
        >
          <Play style={{ width: 52, height: 52 }} strokeWidth={2} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Démarrer la présentation
          </span>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => cmd('next')}
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            margin: '0 16px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(160deg, #c8102e 0%, #8f0b21 100%)',
            color: '#fff', cursor: 'pointer',
          }}
        >
          <ChevronRight style={{ width: 60, height: 60 }} strokeWidth={2.5} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Suivant
          </span>
        </motion.button>
      )}

      {/* Rangée secondaire : Précédent + toggles */}
      <div className="flex" style={{ gap: 10, padding: '14px 16px 8px' }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => cmd('prev')}
          className="flex-1 flex items-center justify-center"
          style={{
            height: 72, borderRadius: 14, border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', gap: 8,
          }}
        >
          <ChevronLeft style={{ width: 26, height: 26 }} strokeWidth={2.5} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Précédent</span>
        </motion.button>
      </div>

      <div className="flex" style={{ gap: 10, padding: '0 16px 16px' }}>
        {[
          {
            key: 'grid', label: 'Slides', active: gridOpen,
            icon: <LayoutGrid style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => setGridOpen(true),
          },
          {
            key: 'mute', label: muted ? 'Muet' : 'Son', active: muted,
            icon: muted ? <VolumeX style={{ width: 22, height: 22 }} strokeWidth={2} /> : <Volume2 style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => cmd('mute'),
          },
          {
            key: 'blackout', label: 'Écran noir', active: blackout,
            icon: <Moon style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => cmd('blackout'),
          },
        ].map((b) => (
          <motion.button
            key={b.key}
            whileTap={{ scale: 0.96 }}
            onClick={b.onTap}
            className="flex-1 flex flex-col items-center justify-center"
            style={{
              height: 68, borderRadius: 14,
              border: b.active ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.14)',
              background: b.active ? 'rgba(200,16,46,0.18)' : 'rgba(255,255,255,0.06)',
              color: b.active ? '#ff8896' : 'rgba(255,255,255,0.75)',
              cursor: 'pointer', gap: 5,
            }}
          >
            {b.icon}
            <span style={{ fontSize: 11, fontWeight: 600 }}>{b.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Panneau accès direct aux slides */}
      <AnimatePresence>
        {gridOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col"
            style={{ background: '#0a0a0c', zIndex: 10 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between" style={{ padding: '16px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Aller à la slide
              </span>
              <button
                onClick={() => setGridOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6 }}
              >
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 20px' }}>
              {titles.map((title, i) => {
                const active = i === slide
                return (
                  <button
                    key={i}
                    onClick={() => goto(i)}
                    className="w-full flex items-center"
                    style={{
                      padding: '13px 14px', marginBottom: 6, borderRadius: 12, gap: 12,
                      border: active ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.08)',
                      background: active ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.04)',
                      color: '#fff', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                      color: active ? '#ff8896' : 'rgba(255,255,255,0.4)', width: 24, flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
