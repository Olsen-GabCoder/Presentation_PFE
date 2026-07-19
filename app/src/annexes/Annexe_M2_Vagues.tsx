import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Cycle d'une vague fonctionnelle
const CYCLE = ['Audit', 'Mockup', 'Code', 'Validation', 'Production']

const COMPARE = [
  { garde: 'Itérations courtes à valeur livrée', adapte: 'Pas de daily/rétro — équipe d’une personne' },
  { garde: 'Feedback client à chaque cycle (sponsor)', adapte: 'Le « product owner » est le sponsor terrain' },
  { garde: 'Priorisation par la valeur métier', adapte: 'Vagues par domaine fonctionnel, pas par sprint fixe' },
]

export default function Annexe_M2_Vagues() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* Cycle d'une vague */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
        className="flex items-center justify-center"
        style={{ gap: '1.2cqw', marginBottom: '3cqh' }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
          letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', marginRight: '1cqw',
        }}>
          10 VAGUES ×
        </span>
        {CYCLE.map((s, i) => (
          <div key={s} className="flex items-center" style={{ gap: '1.2cqw' }}>
            <motion.span
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease }}
              style={{
                padding: '1cqh 1.4cqw', borderRadius: '0.7cqh',
                background: i === 4 ? 'rgba(200,16,46,0.12)' : 'rgba(255,255,255,0.05)',
                border: i === 4 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.14)',
                fontSize: '1.9cqh', fontWeight: 700, color: '#fff',
              }}
            >
              {s}
            </motion.span>
            {i < CYCLE.length - 1 && (
              <span style={{ fontSize: '2cqh', color: '#c8102e', fontWeight: 700 }}>→</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Ce qu'on garde de l'agile / ce qu'on adapte */}
      <div className="flex flex-col" style={{ gap: '0.4cqh' }}>
        <div className="flex" style={{ gap: '2cqw', padding: '0 0 1cqh' }}>
          <span className="flex-1" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
            letterSpacing: '0.22em', color: '#c8102e', textAlign: 'center',
          }}>
            GARDÉ DE L’AGILE
          </span>
          <span className="flex-1" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
            letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textAlign: 'center',
          }}>
            ADAPTÉ AU CONTEXTE
          </span>
        </div>
        {COMPARE.map((c, i) => (
          <motion.div
            key={c.garde}
            className="flex items-center"
            initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease }}
            style={{ gap: '2cqw', padding: '1.4cqh 0', borderBottom: i < COMPARE.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.4 }}>
              {c.garde}
            </span>
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.4 }}>
              {c.adapte}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.3, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Ce n’est pas du Scrum orthodoxe — c’est de l’<b style={{ color: '#fff' }}>itératif incrémental adapté</b> à un
          développeur unique avec un sponsor terrain. Appliquer les cérémonies Scrum à une équipe d’une personne
          aurait été du <b style={{ color: '#fff' }}>théâtre méthodologique</b>.
        </p>
      </motion.div>
    </div>
  )
}
