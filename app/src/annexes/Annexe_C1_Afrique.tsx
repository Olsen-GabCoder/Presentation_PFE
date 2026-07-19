import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : matrice de décision — 5 critères × (marché ✕ | sur-mesure ✓)
const CRITERIA = [
  { t: 'Interface en français', d: 'langue de travail des équipes' },
  { t: 'Tolérance hors ligne', d: '4 niveaux de cache' },
  { t: 'Coût soutenable PME', d: 'hébergement + licences locaux' },
  { t: 'Cycle BTP complet', d: 'du projet au barème matériel' },
  { t: 'Réalités locales', d: 'DMA · rôles réels · réglementaire' },
]

export default function Annexe_C1_Afrique() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 8cqw 3cqh' }}>

      {/* En-têtes de colonnes */}
      <motion.div
        className="flex"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
        style={{ marginBottom: '1cqh' }}
      >
        <div style={{ flex: 5 }} />
        <span style={{
          flex: 2, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)',
        }}>
          SOLUTIONS DU MARCHÉ
        </span>
        <span style={{
          flex: 2, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.18em', color: '#c8102e',
        }}>
          CONSTRUIT SUR MESURE
        </span>
      </motion.div>

      {/* Lignes de la matrice */}
      <div className="relative flex flex-col">
        {/* Colonne sur-mesure surlignée */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.2, ease }}
          style={{
            top: '-0.8cqh', bottom: '-0.8cqh', right: 0, width: `${(2 / 9) * 100}%`,
            border: '2px solid #c8102e', borderRadius: '1cqh', background: 'rgba(200,16,46,0.07)',
            pointerEvents: 'none',
          }}
        />
        {CRITERIA.map((c, i) => (
          <motion.div
            key={c.t}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.18, ease }}
            style={{ padding: '1.8cqh 0', borderBottom: i < CRITERIA.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <div className="flex items-baseline" style={{ flex: 5, gap: '1.2cqw', paddingRight: '1.5cqw' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 700, color: '#c8102e', flexShrink: 0 }}>
                0{i + 1}
              </span>
              <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{c.t}</span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{c.d}</span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.5 + i * 0.12, ease }}
              style={{ flex: 2, textAlign: 'center', fontSize: '2.6cqh', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}
            >
              ✕
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 2.4 + i * 0.12, ease }}
              style={{ flex: 2, textAlign: 'center', fontSize: '2.6cqh', fontWeight: 800, color: '#c8102e' }}
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.2, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Aucune solution du marché ne cochait les 5 cases — ce tableau est le cahier des charges qui a justifié de construire plutôt qu’acheter.
      </motion.p>
    </div>
  )
}
