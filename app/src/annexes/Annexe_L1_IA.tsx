import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const COLS = [
  {
    kicker: 'OPÉRATIONNEL AUJOURD’HUI',
    highlight: true,
    items: [
      { t: 'Assistant contextuel', d: 'Registre de guidance par page — l’IA sait où se trouve l’utilisateur et ce qu’il peut y faire.' },
      { t: 'Prompt dynamique', d: 'Contexte métier injecté à chaque requête, réponses en streaming SSE mot à mot.' },
      { t: 'Analyse de rapports', d: 'Module backend dédié avec journal technique des analyses (traçabilité).' },
    ],
  },
  {
    kicker: 'EN CHANTIER · ASSUMÉ',
    highlight: false,
    items: [
      { t: 'Généralisation en production', d: 'Déploiement progressif — inscrit dans la feuille de route (perspectives).' },
      { t: 'Suivi coûts et qualité', d: 'Monitoring des appels et évaluation des réponses avant l’ouverture large.' },
    ],
  },
]

export default function Annexe_L1_IA() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '2cqw' }}>
        {COLS.map((c, i) => (
          <motion.div
            key={c.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.4cqh',
              background: c.highlight ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: c.highlight ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em',
              color: c.highlight ? '#c8102e' : 'rgba(255,255,255,0.4)',
            }}>
              {c.kicker}
            </span>
            {c.items.map((it) => (
              <div key={it.t} className="flex flex-col" style={{ gap: '0.3cqh' }}>
                <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff' }}>{it.t}</span>
                <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                  {it.d}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Pas de « magie IA » survendue : des fonctions <b style={{ color: '#fff' }}>démontrables en direct</b> aujourd’hui,
          et une trajectoire d’industrialisation <b style={{ color: '#fff' }}>explicitement inscrite dans les perspectives</b>.
        </p>
      </motion.div>
    </div>
  )
}
