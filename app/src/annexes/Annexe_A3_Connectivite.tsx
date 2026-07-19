import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const DEVICE_LAYERS = [
  { t: 'Workbox · service worker', d: 'app + assets hors ligne' },
  { t: 'redux-persist', d: 'session & préférences' },
  { t: 'TanStack Query · 5 min', d: 'données serveur en cache' },
]

const SERVER_LAYERS = [
  { t: 'Cache Spring', d: 'référentiels coûteux' },
  { t: 'PostgreSQL 17', d: 'source de vérité' },
]

// Schéma d'architecture : appareil terrain ‖ réseau instable ‖ serveur
export default function Annexe_A3_Connectivite() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      <div className="flex items-stretch" style={{ height: '52cqh' }}>

        {/* ── Zone appareil ── */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            flex: 5, borderRadius: '1.2cqh', padding: '2cqh 1.5cqw', gap: '1.2cqh',
            border: '1px solid rgba(200,16,46,0.55)', background: 'rgba(200,16,46,0.06)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}>
            APPAREIL TERRAIN
          </span>
          <div className="flex-1 flex flex-col justify-center" style={{ gap: '1.2cqh' }}>
            {DEVICE_LAYERS.map((l, i) => (
              <motion.div
                key={l.t}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.45 + i * 0.15, ease }}
                style={{
                  padding: '1.5cqh 1.2cqw', borderRadius: '0.8cqh',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <span style={{ fontSize: '1.9cqh', fontWeight: 800, color: '#fff' }}>{l.t}</span>
                <span style={{ fontSize: '1.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{l.d}</span>
              </motion.div>
            ))}
          </div>
          {/* Bracket hors ligne */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6, ease }}
            className="flex items-center justify-center"
            style={{ gap: '0.8cqw', padding: '1cqh 0 0', borderTop: '2px solid #c8102e' }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#ff8896' }}>
              CONTINUE DE FONCTIONNER SANS RÉSEAU
            </span>
          </motion.div>
        </motion.div>

        {/* ── Zone réseau instable ── */}
        <div className="flex flex-col items-center justify-center" style={{ flex: 2, position: 'relative' }}>
          {/* Bande verticale hachurée */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9, ease }}
            style={{
              top: 0, bottom: 0, left: '38%', right: '38%',
              background: 'repeating-linear-gradient(135deg, rgba(200,16,46,0.18) 0 10px, transparent 10px 22px)',
              borderLeft: '2px dashed rgba(200,16,46,0.7)', borderRight: '2px dashed rgba(200,16,46,0.7)',
            }}
          />
          {/* Flèches qui traversent */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2, ease }}
            style={{ gap: '2.2cqh', zIndex: 1 }}
          >
            <span style={{ fontSize: '3cqh', color: '#fff', fontWeight: 700, lineHeight: 1 }}>⇄</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2, ease }}
            style={{
              position: 'absolute', bottom: '-3.6cqh', left: '-2cqw', right: '-2cqw', textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25cqh', fontWeight: 700,
              letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)',
            }}
          >
            RÉSEAU INSTABLE
          </motion.span>
        </div>

        {/* ── Zone serveur ── */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{
            flex: 4, borderRadius: '1.2cqh', padding: '2cqh 1.5cqw', gap: '1.2cqh',
            border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.03)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
            SERVEUR · RENDER
          </span>
          <div className="flex-1 flex flex-col justify-center" style={{ gap: '1.2cqh' }}>
            {SERVER_LAYERS.map((l, i) => (
              <motion.div
                key={l.t}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.15, ease }}
                style={{
                  padding: '1.5cqh 1.2cqw', borderRadius: '0.8cqh',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <span style={{ fontSize: '1.9cqh', fontWeight: 800, color: '#fff' }}>{l.t}</span>
                <span style={{ fontSize: '1.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{l.d}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Note reconnexion */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2, ease }}
        style={{
          textAlign: 'center', margin: '5.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Au retour du réseau : resynchronisation TanStack en arrière-plan · reconnexion automatique du WebSocket STOMP.
      </motion.p>
    </div>
  )
}
