import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma miroir : sous l'axe le problème rencontré, au-dessus la solution construite
const DIFFICULTIES = [
  { id: 'D1', title: 'Documents', pb: 'BYTEA saturait la mémoire', sol: 'migration TEXT (base64) — flux maîtrisé' },
  { id: 'D2', title: 'Visio PiP', pb: 'PiP bloqué en cross-origin', sol: 'réécrit de zéro · 1 894 lignes TS · 0 dépendance' },
  { id: 'D3', title: 'N+1', pb: '150+ requêtes SQL sur les listes', sol: 'fetch joins + projections → 1 à 3 requêtes' },
  { id: 'D4', title: 'Fantômes', pb: 'déconnexions brutales non détectées', sol: 'heartbeat 30 s · purge auto à 90 s' },
]

export default function Annexe_M4_Difficultes() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      {/* Légendes des deux moitiés */}
      <div className="flex justify-between" style={{ marginBottom: '1.5cqh' }}>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}
        >
          ▲ SOLUTION CONSTRUITE
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}
        >
          ▼ PROBLÈME RENCONTRÉ
        </motion.span>
      </div>

      <div className="relative flex" style={{ height: '52cqh', gap: '1.5cqw' }}>
        {/* Axe central */}
        <motion.div
          className="absolute"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3, ease }}
          style={{ left: 0, right: 0, top: '50%', height: 3, background: 'rgba(255,255,255,0.3)', transformOrigin: 'left', zIndex: 0 }}
        />

        {DIFFICULTIES.map((d, i) => (
          <div key={d.id} className="flex-1 relative flex flex-col" style={{ zIndex: 1 }}>

            {/* Solution — au-dessus */}
            <motion.div
              className="flex flex-col justify-end items-center"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.25, ease }}
              style={{ height: '41%', textAlign: 'center', gap: '0.5cqh', padding: '0 0.3cqw' }}
            >
              <span style={{ fontSize: '1.75cqh', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>{d.sol}</span>
              <div style={{ width: 3, height: '3.5cqh', background: '#c8102e', borderRadius: 2 }} />
            </motion.div>

            {/* Badge sur l'axe */}
            <motion.div
              className="flex flex-col items-center justify-center self-center"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.15, ease }}
              style={{
                height: '18%', aspectRatio: '1', borderRadius: '50%', gap: '0.1cqh',
                background: '#141416', border: '2px solid #c8102e',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1 }}>{d.id}</span>
              <span style={{ fontSize: '1.35cqh', fontWeight: 700, color: '#fff' }}>{d.title}</span>
            </motion.div>

            {/* Problème — en dessous */}
            <motion.div
              className="flex flex-col justify-start items-center"
              initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.25, ease }}
              style={{ height: '41%', textAlign: 'center', gap: '0.5cqh', padding: '0 0.3cqw' }}
            >
              <div style={{ width: 0, height: '3.5cqh', borderLeft: '3px dashed rgba(255,255,255,0.35)' }} />
              <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.35 }}>{d.pb}</span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.4, ease }}
        style={{
          textAlign: 'center', margin: '2.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Quatre difficultés réelles, documentées au rapport avec diagnostic et résolution — la plus marquante : la visio, réécrite intégralement plutôt que contournée.
      </motion.p>
    </div>
  )
}
