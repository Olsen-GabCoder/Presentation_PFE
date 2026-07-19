import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Fidèle au chapitre 5 : QSHE fonctionnel dans sa structure, sous-modules partiels, cause et plan
const BLOCKS = [
  {
    kicker: 'OPÉRATIONNEL',
    title: 'La structure fonctionne',
    lines: ['Déclaration d’incidents', 'Inspections', 'Actions correctives', 'GED documentaire'],
    highlight: true,
  },
  {
    kicker: 'PARTIEL · ASSUMÉ',
    title: 'Resté au CRUD de base',
    lines: ['Suivi de conformité environnementale', 'Évaluation des risques par projet'],
    highlight: false,
  },
  {
    kicker: 'POURQUOI & ENSUITE',
    title: 'Règles métier à spécifier',
    lines: ['Spécification conjointe avec les responsables QSHE', 'L’architecture existante accueille la suite', 'Aucune modification structurelle nécessaire'],
    highlight: false,
  },
]

export default function Annexe_L2_QSHE() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.5cqw' }}>
        {BLOCKS.map((b, i) => (
          <motion.div
            key={b.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
              background: b.highlight ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: b.highlight ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e',
            }}>
              {b.kicker}
            </span>
            <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {b.title}
            </span>
            <div className="flex flex-col" style={{ gap: '0.9cqh', marginTop: '0.5cqh' }}>
              {b.lines.map((l) => (
                <div key={l} className="flex items-baseline" style={{ gap: '0.8cqw' }}>
                  <span style={{ color: '#c8102e', fontSize: '1.6cqh', flexShrink: 0 }}>›</span>
                  <span style={{ fontSize: '1.8cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Ce qui manque n’est pas du code — c’est de la <b style={{ color: '#fff' }}>connaissance métier</b> que seuls
          les responsables QSHE peuvent formaliser. Prioriser les 17 autres domaines pleinement utilisables
          était le <b style={{ color: '#fff' }}>bon arbitrage</b>, documenté au chapitre 5.
        </p>
      </motion.div>
    </div>
  )
}
