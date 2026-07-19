import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : 10 vagues sur la frise — zoom sur l'anatomie d'une vague (cycle en 5 temps)
const CYCLE = ['Audit', 'Mockup', 'Code', 'Validation', 'Production']

export default function Annexe_M2_Vagues() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center" style={{ padding: '0 6cqw 4cqh' }}>

      {/* ── Frise des 10 vagues ── */}
      <div className="flex items-center" style={{ gap: '0.8cqw', width: '100%' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
            style={{
              height: '7cqh', borderRadius: '0.7cqh',
              background: i === 3 ? 'rgba(200,16,46,0.20)' : 'rgba(255,255,255,0.05)',
              border: i === 3 ? '2px solid #c8102e' : '1px solid rgba(255,255,255,0.16)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.7cqh', fontWeight: 700,
              color: i === 3 ? '#fff' : 'rgba(255,255,255,0.5)',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Lignes de zoom ── */}
      <div className="relative" style={{ width: '100%', height: '7cqh' }}>
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <motion.line
            x1="305" y1="0" x2="30" y2="100" stroke="rgba(200,16,46,0.6)" strokeWidth="2" strokeDasharray="7 6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2, ease }}
          />
          <motion.line
            x1="395" y1="0" x2="970" y2="100" stroke="rgba(200,16,46,0.6)" strokeWidth="2" strokeDasharray="7 6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2, ease }}
          />
        </svg>
      </div>

      {/* ── Anatomie d'une vague ── */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4, ease }}
        style={{
          width: '97%', padding: '3cqh 2cqw', borderRadius: '1.2cqh', gap: '1.2cqw',
          border: '2px solid #c8102e', background: 'rgba(200,16,46,0.05)',
        }}
      >
        {CYCLE.map((s, i) => (
          <div key={s} className="flex items-center" style={{ gap: '1.2cqw' }}>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.7 + i * 0.15, ease }}
              style={{
                padding: '1.6cqh 1.8cqw', borderRadius: '0.8cqh',
                background: i === 4 ? '#c8102e' : 'rgba(255,255,255,0.06)',
                border: i === 4 ? 'none' : '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff' }}>{s}</span>
            </motion.div>
            {i < CYCLE.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.8 + i * 0.15, ease }}
                style={{ fontSize: '2.4cqh', color: '#c8102e', fontWeight: 700 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>

      {/* ── Gardé / adapté ── */}
      <div className="flex" style={{ width: '97%', gap: '2cqw', marginTop: '3.5cqh' }}>
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 2.5, ease }}
          style={{ gap: '0.6cqh', borderLeft: '3px solid #c8102e', paddingLeft: '1.2cqw' }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e' }}>
            GARDÉ DE L’AGILE
          </span>
          <span style={{ fontSize: '1.7cqh', fontWeight: 600, color: '#fff', lineHeight: 1.5 }}>
            itérations courtes à valeur livrée · feedback sponsor à chaque cycle · priorisation par la valeur métier
          </span>
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 2.65, ease }}
          style={{ gap: '0.6cqh', borderLeft: '3px solid rgba(255,255,255,0.3)', paddingLeft: '1.2cqw' }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)' }}>
            ADAPTÉ AU CONTEXTE
          </span>
          <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            pas de daily/rétro pour une équipe d’une personne · vagues par domaine fonctionnel, pas de sprint fixe
          </span>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Pas du Scrum orthodoxe : de l’itératif incrémental adapté — les cérémonies à une personne auraient été du théâtre méthodologique.
      </motion.p>
    </div>
  )
}
