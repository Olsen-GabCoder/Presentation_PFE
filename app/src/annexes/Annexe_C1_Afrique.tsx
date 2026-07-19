import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Les 5 critères de l'état de l'art qu'aucune solution existante ne réunissait
const CRITERIA = [
  { t: 'Interface en français', d: 'Langue de travail des équipes — non négociable au Gabon.' },
  { t: 'Tolérance hors ligne', d: '4 niveaux de cache : la coupure réseau ne bloque pas le terrain.' },
  { t: 'Coût soutenable PME', d: 'Hébergement et licences dimensionnés pour une entreprise locale.' },
  { t: 'Cycle BTP complet', d: 'Du projet au barème matériel — pas un outil générique à adapter.' },
  { t: 'Réalités locales', d: 'Processus internes (DMA), rôles réels de l’entreprise, contexte réglementaire.' },
]

export default function Annexe_C1_Afrique() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex flex-col" style={{ gap: '0.3cqh' }}>
        {CRITERIA.map((c, i) => (
          <motion.div
            key={c.t}
            className="flex items-center"
            initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease }}
            style={{ gap: '2cqw', padding: '1.5cqh 0', borderBottom: i < CRITERIA.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '2.2cqh', fontWeight: 700, color: '#c8102e', width: '4cqw', flexShrink: 0,
            }}>
              0{i + 1}
            </span>
            <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', width: '24cqw', flexShrink: 0, letterSpacing: '-0.01em' }}>
              {c.t}
            </span>
            <span className="flex-1" style={{ fontSize: '1.8cqh', fontWeight: 500, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
              {c.d}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Ce sont les <b style={{ color: '#fff' }}>5 critères de l’état de l’art</b> : aucune solution du marché ne les réunissait.
          « Adapté à l’Afrique » n’est pas un slogan — c’est le cahier des charges qui a justifié de construire plutôt qu’acheter.
        </p>
      </motion.div>
    </div>
  )
}
