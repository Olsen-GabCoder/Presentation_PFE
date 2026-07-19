import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : escalier de preuves — chaque marche renforce la précédente
const STEPS = [
  { title: 'Recette à chaque vague', detail: 'parcours critiques rejoués avec l’encadrant professionnel', highlight: false },
  { title: 'Production réelle', detail: 'en service depuis mars 2026 — pas une démo', highlight: true },
  { title: 'Usage terrain', detail: 'installée (PWA) sur les appareils des équipes', highlight: false },
  { title: 'Retours intégrés', detail: 'le terrain remonte, les corrections suivent en continu', highlight: false },
]

export default function Annexe_M3_Validation() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 6cqw 4cqh' }}>

      {/* ── L'escalier ── */}
      <div className="relative flex items-end" style={{ height: '52cqh', gap: '1.2cqw', zIndex: 1 }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 + i * 0.3, ease }}
            style={{
              height: `${30 + i * 20}%`,
              borderRadius: '1cqh 1cqh 0 0', padding: '2cqh 1.2cqw', gap: '0.8cqh',
              background: s.highlight ? '#341920' : '#1d1d20',
              border: s.highlight ? '2px solid #c8102e' : '1px solid rgba(255,255,255,0.16)',
              borderBottom: 'none',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
              color: s.highlight ? '#c8102e' : 'rgba(255,255,255,0.4)',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>{s.title}</span>
            <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>{s.detail}</span>
          </motion.div>
        ))}
      </div>

      {/* Sol */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
        style={{ height: 3, background: 'rgba(255,255,255,0.3)', transformOrigin: 'left' }}
      />

      {/* ── La flèche qui monte ── */}
      <div className="relative" style={{ height: 0 }}>
        <svg
          viewBox="0 0 1000 520" preserveAspectRatio="none"
          className="absolute"
          style={{ left: 0, right: 0, bottom: '0.3cqh', width: '100%', height: '52cqh', pointerEvents: 'none', zIndex: 2 }}
        >
          <motion.path
            d="M 30 352 L 125 322 L 375 226 L 625 122 L 900 26"
            fill="none" stroke="#c8102e" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 1.5, ease }}
          />
          <motion.path
            d="M 900 26 l -36 -1 m 36 1 l -14 34"
            fill="none" stroke="#c8102e" strokeWidth="5" strokeLinecap="round"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2.9, ease }}
          />
        </svg>
      </div>

      {/* Légende de la flèche + note */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.1, ease }}
        style={{ marginTop: '2.5cqh' }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#ff8896' }}>
          CONFIANCE CROISSANTE
        </span>
        <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textAlign: 'right' }}>
          La preuve la plus forte n’est pas un rapport de tests : une entreprise fait tourner ses opérations dessus, chaque jour.
        </span>
      </motion.div>
    </div>
  )
}
