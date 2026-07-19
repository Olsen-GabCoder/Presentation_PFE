import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Les 4 difficultés techniques documentées dans le rapport (D1-D4)
const DIFFICULTIES = [
  { id: 'D1', title: 'Documents en base', pb: 'Stockage BYTEA saturait la mémoire', sol: 'Migration vers TEXT (base64) — flux maîtrisé' },
  { id: 'D2', title: 'Visio PiP', pb: 'Picture-in-Picture bloqué en cross-origin', sol: 'Réécrit de zéro : 1 894 lignes TS, 0 dépendance' },
  { id: 'D3', title: 'Performance N+1', pb: '150+ requêtes SQL sur les listes', sol: 'Fetch joins + projections → 1 à 3 requêtes' },
  { id: 'D4', title: 'Participants fantômes', pb: 'Déconnexions brutales non détectées', sol: 'Heartbeat 30 s + purge automatique à 90 s' },
]

export default function Annexe_M4_Difficultes() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {DIFFICULTIES.map((d, i) => (
          <motion.div
            key={d.id}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
            style={{
              padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1.2cqh',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div className="flex items-center" style={{ gap: '0.8cqw' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.4cqh', fontWeight: 700, color: '#c8102e',
              }}>
                {d.id}
              </span>
              <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {d.title}
              </span>
            </div>
            {/* Problème */}
            <div className="flex flex-col" style={{ gap: '0.4cqh' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1cqh', fontWeight: 700,
                letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)',
              }}>
                PROBLÈME
              </span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                {d.pb}
              </span>
            </div>
            {/* Solution */}
            <div className="flex flex-col" style={{ gap: '0.4cqh', marginTop: 'auto' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1cqh', fontWeight: 700,
                letterSpacing: '0.2em', color: '#c8102e',
              }}>
                SOLUTION
              </span>
              <span style={{ fontSize: '1.7cqh', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
                {d.sol}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
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
          Quatre difficultés réelles, <b style={{ color: '#fff' }}>documentées dans le rapport</b> avec leur diagnostic et leur résolution —
          la plus marquante : le module visioconférence, réécrit intégralement plutôt que contourné.
        </p>
      </motion.div>
    </div>
  )
}
