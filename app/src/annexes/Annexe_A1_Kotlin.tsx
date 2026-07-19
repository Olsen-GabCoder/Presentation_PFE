import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : 3 chemins candidats — 2 s'arrêtent (éliminés), Kotlin traverse jusqu'à la cible
const LANES = [
  {
    label: 'JAVA', stop: '42%', reason: 'NullPointerException à l’exécution · verbosité',
  },
  {
    label: 'NODE.JS', stop: '58%', reason: 'typage faible · briques d’entreprise (Security, JPA) à réinventer',
  },
]

export default function Annexe_A1_Kotlin() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh', gap: '4.5cqh' }}>

      {/* ── Chemins éliminés ── */}
      {LANES.map((l, i) => (
        <div key={l.label} className="flex items-center" style={{ height: '9cqh' }}>
          <motion.span
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.25, ease }}
            style={{
              width: '9cqw', flexShrink: 0, fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.8cqh', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)',
            }}
          >
            {l.label}
          </motion.span>
          <div className="flex-1 relative" style={{ height: '100%' }}>
            {/* Trait pointillé qui s'arrête */}
            <motion.div
              className="absolute"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.25, ease }}
              style={{
                top: '50%', left: 0, width: l.stop, height: 0, transformOrigin: 'left',
                borderTop: '3px dashed rgba(255,255,255,0.3)',
              }}
            />
            {/* Croix d'arrêt */}
            <motion.span
              className="absolute"
              initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.95 + i * 0.25, ease }}
              style={{
                left: l.stop, top: '50%', transform: 'translate(-50%, -54%)',
                fontSize: '3.4cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1,
              }}
            >
              ✕
            </motion.span>
            {/* Raison sous le point d'arrêt */}
            <motion.span
              className="absolute"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.15 + i * 0.25, ease }}
              style={{
                left: l.stop, top: '78%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                fontSize: '1.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)',
              }}
            >
              {l.reason}
            </motion.span>
          </div>
          {/* Espace réservé cible */}
          <div style={{ width: '17cqw', flexShrink: 0 }} />
        </div>
      ))}

      {/* ── Chemin Kotlin — traverse jusqu'au bout ── */}
      <div className="flex items-center" style={{ height: '13cqh' }}>
        <motion.span
          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          style={{
            width: '9cqw', flexShrink: 0, fontFamily: "'JetBrains Mono', monospace",
            fontSize: '2.1cqh', fontWeight: 800, letterSpacing: '0.15em', color: '#c8102e',
          }}
        >
          KOTLIN
        </motion.span>
        <div className="flex-1 relative flex items-center">
          <motion.div
            className="flex-1"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            style={{ height: 6, background: '#c8102e', transformOrigin: 'left', borderRadius: 3 }}
          />
          {/* Jalons sur le trajet */}
          {['null-safety compilée', 'écosystème Spring intact'].map((t, i) => (
            <motion.span
              key={t}
              className="absolute"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.25, ease }}
              style={{
                left: `${28 + i * 34}%`, top: '-3.4cqh', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.35cqh', fontWeight: 700,
                letterSpacing: '0.12em', color: '#ff8896',
              }}
            >
              {t}
            </motion.span>
          ))}
          {/* Pointe de flèche */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1.75, ease }}
            style={{
              width: 0, height: 0, flexShrink: 0,
              borderTop: '1.1cqh solid transparent', borderBottom: '1.1cqh solid transparent',
              borderLeft: '1.4cqh solid #c8102e',
            }}
          />
        </div>
        {/* La cible atteinte */}
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.9, ease }}
          style={{
            width: '17cqw', padding: '2cqh 0', borderRadius: '1.2cqh', gap: '0.4cqh',
            border: '2px solid #c8102e', background: 'rgba(200,16,46,0.10)',
          }}
        >
          <span style={{ fontSize: '2.6cqh', fontWeight: 800, color: '#fff', lineHeight: 1 }}>366 endpoints</span>
          <span style={{ fontSize: '1.5cqh', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>81 entités · 1 dev</span>
        </motion.div>
      </div>

      {/* Note pérennité */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.3, ease }}
        style={{
          textAlign: 'center', margin: 0, fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Kotlin : choix officiel de Spring et de Google · 100 % interopérable JVM — tout l’écosystème Java reste disponible.
      </motion.p>
    </div>
  )
}
