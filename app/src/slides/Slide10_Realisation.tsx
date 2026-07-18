import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrowserMockup from '../components/BrowserMockup'

const screens = [
  { img: '/images/screen-dashboard.png', label: 'Tableau de bord exécutif', desc: '12 projets · 71.5 Mds FCFA · KPI temps réel', url: 'mika.ga/dashboard' },
  { img: '/images/screen-projets.png', label: 'Gestion des projets', desc: '31 projets · filtres avancés · suivi budgétaire', url: 'mika.ga/projets' },
  { img: '/images/screen-equipements.png', label: 'Pilotage matériel', desc: 'Engins · mouvements · DMA · matériaux', url: 'mika.ga/equipements' },
  { img: '/images/screen-bareme.png', label: 'Barème des prix BTP', desc: '2 125 articles · import Excel · corps d\'état', url: 'mika.ga/bareme' },
]

const ROTATE_MS = 7000

export default function Slide10_Realisation() {
  const [active, setActive] = useState(0)

  // Rotation automatique — relancée à chaque sélection manuelle
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % screens.length), ROTATE_MS)
    return () => clearTimeout(t)
  }, [active])

  const current = screens[active]

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '3.5cqh', paddingBottom: '2.5cqh' }}>

        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: '2cqh' }}>
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                  color: '#fff', letterSpacing: '-0.025em', margin: 0,
                }}
              >
                En production depuis{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>mars 2026</span>
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Rail + grande capture */}
        <div className="flex-1 flex" style={{ gap: '2cqw', minHeight: 0 }}>

          {/* Rail latéral */}
          <div className="flex flex-col justify-center" style={{ width: '22cqw', flexShrink: 0, gap: '1.2cqh' }}>
            {screens.map((s, i) => {
              const isActive = i === active
              return (
                <motion.button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i) }}
                  className="text-left cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(200,16,46,0.10)' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '3px solid #c8102e' : '3px solid rgba(255,255,255,0.12)',
                    borderRadius: '0 0.6cqh 0.6cqh 0',
                    padding: '1.2cqh 1cqw',
                    transition: 'background 0.3s, border-color 0.3s',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.15em',
                    color: isActive ? '#c8102e' : 'var(--text-ghost)',
                    margin: 0,
                  }}>
                    0{i + 1}
                  </p>
                  <p style={{
                    fontSize: '2.2cqh', fontWeight: 700,
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    margin: 0, marginTop: '0.3cqh', lineHeight: 1.15,
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontSize: '1.7cqh', color: isActive ? 'var(--text-secondary)' : 'var(--text-ghost)',
                    margin: 0, marginTop: '0.3cqh',
                  }}>
                    {s.desc}
                  </p>
                  {/* Barre de progression du cycle auto */}
                  {isActive && (
                    <motion.div
                      key={`prog-${active}`}
                      style={{
                        height: 2, background: 'rgba(200,16,46,0.6)',
                        marginTop: '0.8cqh', transformOrigin: 'left', borderRadius: 1,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Grande capture */}
          <motion.div
            className="flex-1 relative"
            style={{ minWidth: 0 }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <BrowserMockup url={current.url}>
                  <img
                    src={current.img}
                    alt={current.label}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      objectPosition: 'top left',
                    }}
                  />
                </BrowserMockup>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          style={{ fontSize: '1.7cqh', color: 'var(--text-muted)', margin: 0, marginTop: '1.2cqh', textAlign: 'center', fontStyle: 'italic' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        >
          PWA bilingue FR/EN · Salle MIKA · Messagerie · Assistant IA · Mobile responsive
        </motion.p>
      </div>
    </div>
  )
}
