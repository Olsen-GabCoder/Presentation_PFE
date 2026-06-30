import { motion } from 'framer-motion'
import { FlaskConical, ClipboardCheck, BrainCircuit, Activity, Smartphone } from 'lucide-react'

const items = [
  {
    Icon: FlaskConical,
    num: '01',
    title: 'Industrialisation des tests',
    desc: 'Pyramide unit / composant / E2E (Playwright) · CI/CD.',
  },
  {
    Icon: ClipboardCheck,
    num: '02',
    title: 'Finalisation QSHE & Qualité',
    desc: 'Spécification conjointe avec les acteurs métier MIKA.',
  },
  {
    Icon: BrainCircuit,
    num: '03',
    title: 'Extraction IA en production',
    desc: 'Upload, preview, validation humaine — backend déjà prêt.',
  },
  {
    Icon: Activity,
    num: '04',
    title: 'Monitoring avancé',
    desc: 'Sentry · métriques P95, taux d\'erreur 5xx · alertes automatiques.',
  },
  {
    Icon: Smartphone,
    num: '05',
    title: 'Évolution mobile',
    desc: 'Surveiller la stabilité des notifications iOS · Capacitor si besoin critique.',
  },
]

const STEP_OFFSET = 3.5 // cqw per step

export default function Slide17_Perspectives() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/perspectives.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.14,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.14 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>

        {/* Header */}
        <div style={{ marginBottom: '3cqh' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Une feuille de route claire{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>pour l'après-stage.</span>
            </motion.h1>
          </div>
        </div>

        {/* Staircase */}
        <div className="flex-1 relative">

          {/* Diagonal connector line */}
          <motion.div
            className="absolute"
            style={{
              top: 0, bottom: 0,
              left: `1.2cqw`,
              width: `${STEP_OFFSET * 4 + 2}cqw`,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <motion.line
                x1="0" y1="10" x2="85" y2="90"
                stroke="rgba(200,16,46,0.15)" strokeWidth="0.6"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </motion.div>

          <div className="relative flex flex-col h-full" style={{ gap: '0.6cqh' }}>
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                className="flex-1 flex items-center"
                style={{
                  marginLeft: `${i * STEP_OFFSET}cqw`,
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.65 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Number badge */}
                <div style={{
                  width: '4cqh', height: '4cqh', borderRadius: '50%',
                  background: i === 2 ? '#c8102e' : 'rgba(200,16,46,0.12)',
                  border: i === 2 ? '2px solid #c8102e' : '2px solid rgba(200,16,46,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, zIndex: 2,
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '3.6cqh', fontWeight: 800,
                    color: i === 2 ? '#fff' : '#c8102e',
                  }}>{item.num}</span>
                </div>

                {/* Card */}
                <div
                  className="flex-1 flex items-center"
                  style={{
                    marginLeft: '1.2cqw',
                    height: '100%',
                    borderRadius: '0.8cqh',
                    background: i === 2 ? 'rgba(200,16,46,0.08)' : 'var(--surface-card)',
                    border: i === 2
                      ? '1.5px solid rgba(200,16,46,0.25)'
                      : '1px solid var(--border-subtle)',
                    padding: '0 2cqw',
                    gap: '1.5cqw',
                  }}
                >
                  <item.Icon
                    style={{ width: '3cqh', height: '3cqh', color: i === 2 ? '#e8384f' : '#c8102e', flexShrink: 0 }}
                    strokeWidth={1.5}
                  />
                  <div>
                    <p style={{
                      fontSize: '2.4cqh', fontWeight: 700,
                      color: i === 2 ? '#fff' : 'rgba(255,255,255,0.85)',
                      margin: 0, lineHeight: 1.2,
                    }}>{item.title}</p>
                    <p style={{
                      fontSize: '1.9cqh', color: 'var(--text-muted)',
                      margin: 0, marginTop: '0.4cqh', lineHeight: 1.4,
                    }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
