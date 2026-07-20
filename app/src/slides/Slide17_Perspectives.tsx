import { motion } from 'framer-motion'
import { FlaskConical, ClipboardCheck, BrainCircuit, Activity, Smartphone } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

// Contenu inchangé — seule la mise en forme (roadmap horizontale) change.
const items = [
  {
    Icon: FlaskConical,
    num: '01',
    title: 'Industrialisation des tests',
    desc: 'Pyramide unit / composant / E2E (Playwright) · CI/CD.',
    top: true,
  },
  {
    Icon: ClipboardCheck,
    num: '02',
    title: 'Finalisation QSHE & Qualité',
    desc: 'Spécification conjointe avec les acteurs métier MIKA.',
    top: false,
  },
  {
    Icon: BrainCircuit,
    num: '03',
    title: 'Extraction IA en production',
    desc: 'Upload, preview, validation humaine — backend déjà prêt.',
    top: true,
  },
  {
    Icon: Activity,
    num: '04',
    title: 'Monitoring avancé',
    desc: 'Sentry · métriques P95, taux d\'erreur 5xx · alertes automatiques.',
    top: false,
  },
  {
    Icon: Smartphone,
    num: '05',
    title: 'Évolution mobile',
    desc: 'Surveiller la stabilité des notifications iOS · Capacitor si besoin critique.',
    top: true,
  },
]

const FOCUS = 2 // Extraction IA = jalon mis en avant

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
        transition={{ duration: 2.5, ease }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>

        {/* Header */}
        <div style={{ marginBottom: '1cqh', flexShrink: 0 }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
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

        {/* ── Roadmap horizontale ── */}
        <div className="flex-1 relative" style={{ minHeight: 0 }}>

          {/* Axe temporel */}
          <motion.div
            className="absolute"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            style={{
              left: 0, right: '2.5cqw', top: '50%', height: 2,
              background: 'linear-gradient(90deg, rgba(200,16,46,0.25), rgba(200,16,46,0.6))',
              transformOrigin: 'left',
            }}
          />
          {/* Pointe de flèche */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.8, ease }}
            style={{
              right: '1.6cqw', top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '0.9cqh solid transparent',
              borderBottom: '0.9cqh solid transparent',
              borderLeft: '1.6cqh solid rgba(200,16,46,0.75)',
            }}
          />

          {/* 5 jalons */}
          <div className="absolute inset-0 flex" style={{ paddingRight: '3.5cqw' }}>
            {items.map((item, i) => {
              const focus = i === FOCUS
              return (
                <div key={item.num} className="relative flex-1 flex flex-col" style={{ minWidth: 0 }}>

                  {/* Nœud sur l'axe */}
                  <motion.div
                    className="absolute flex items-center justify-center"
                    initial={{ scale: 0, x: '-50%', y: '-50%' }} animate={{ scale: 1, x: '-50%', y: '-50%' }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.18, ease }}
                    style={{
                      left: '50%', top: '50%',
                      width: focus ? '4.2cqh' : '3.4cqh', height: focus ? '4.2cqh' : '3.4cqh',
                      borderRadius: '50%', zIndex: 2,
                      background: focus ? '#c8102e' : '#141416',
                      border: '2px solid #c8102e',
                      boxShadow: focus ? '0 0 2.4cqh rgba(200,16,46,0.55)' : 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: focus ? '1.8cqh' : '1.5cqh', fontWeight: 800,
                      color: focus ? '#fff' : '#ff8896',
                    }}>{item.num}</span>
                  </motion.div>

                  {/* Connecteur vertical nœud → carte */}
                  <motion.div
                    className="absolute"
                    initial={{ scaleY: 0, x: '-50%' }} animate={{ scaleY: 1, x: '-50%' }}
                    transition={{ duration: 0.4, delay: 1.15 + i * 0.18, ease }}
                    style={{
                      left: '50%', width: 2, height: '6cqh',
                      top: item.top ? 'calc(50% - 6cqh - 1.7cqh)' : 'calc(50% + 1.7cqh)',
                      background: 'rgba(200,16,46,0.35)',
                      transformOrigin: item.top ? 'bottom' : 'top',
                    }}
                  />

                  {/* Carte (moitié haute ou basse) */}
                  <div
                    className="flex flex-col"
                    style={{
                      position: 'absolute', left: '2%', width: '96%',
                      ...(item.top
                        ? { bottom: 'calc(50% + 6cqh + 1.7cqh)', justifyContent: 'flex-end' }
                        : { top: 'calc(50% + 6cqh + 1.7cqh)', justifyContent: 'flex-start' }),
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: item.top ? 14 : -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 1.25 + i * 0.18, ease }}
                      style={{
                        borderRadius: '0.8cqh',
                        background: focus ? 'rgba(200,16,46,0.1)' : 'var(--surface-card)',
                        border: focus ? '1.5px solid rgba(200,16,46,0.35)' : '1px solid var(--border-subtle)',
                        padding: '1.4cqh 1cqw',
                      }}
                    >
                      <div className="flex items-center" style={{ gap: '0.6cqw', marginBottom: '0.6cqh' }}>
                        <item.Icon
                          style={{ width: '2.4cqh', height: '2.4cqh', color: focus ? '#e8384f' : '#c8102e', flexShrink: 0 }}
                          strokeWidth={1.5}
                        />
                        <p style={{
                          fontSize: '1.95cqh', fontWeight: 700,
                          color: focus ? '#fff' : 'rgba(255,255,255,0.85)',
                          margin: 0, lineHeight: 1.15,
                        }}>{item.title}</p>
                      </div>
                      <p style={{
                        fontSize: '1.6cqh', color: 'var(--text-muted)',
                        margin: 0, lineHeight: 1.35,
                      }}>{item.desc}</p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
