import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : axe de maturité — le démontrable à gauche de la ligne « aujourd'hui », la trajectoire en pointillé à droite
const LIVE = [
  { t: 'Assistant contextuel', d: 'registre de guidance par page', x: 10 },
  { t: 'Prompt dynamique', d: 'contexte métier injecté · streaming SSE', x: 27 },
  { t: 'Analyse de rapports', d: 'module backend + journal des analyses', x: 44 },
]
const NEXT = [
  { t: 'Généralisation en production', d: 'déploiement progressif — feuille de route', x: 66 },
  { t: 'Suivi coûts & qualité', d: 'monitoring des appels avant ouverture large', x: 85 },
]

export default function Annexe_L1_IA() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 3cqh' }}>

      <div className="relative" style={{ height: '50cqh' }}>

        {/* Zone démontrable */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            left: 0, top: '4cqh', bottom: '8cqh', width: '55%',
            background: 'rgba(200,16,46,0.06)', border: '1px solid rgba(200,16,46,0.35)', borderRadius: '1cqh',
          }}
        />
        <motion.span
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4, ease }}
          style={{
            left: '1cqw', top: '0.5cqh',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
            letterSpacing: '0.22em', color: '#c8102e',
          }}
        >
          OPÉRATIONNEL · DÉMONTRABLE EN DIRECT
        </motion.span>

        {/* Zone trajectoire */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.8, ease }}
          style={{
            right: 0, top: '4cqh', bottom: '8cqh', width: '41%',
            border: '2px dashed rgba(255,255,255,0.25)', borderRadius: '1cqh',
          }}
        />
        <motion.span
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2, ease }}
          style={{
            right: '1cqw', top: '0.5cqh',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
            letterSpacing: '0.22em', color: 'rgba(255,255,255,0.45)',
          }}
        >
          EN CHANTIER · ASSUMÉ
        </motion.span>

        {/* Ligne « aujourd'hui » */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 1.5, ease }}
          style={{ left: '57%', top: '2cqh', bottom: '4cqh', width: 3, background: '#c8102e', transformOrigin: 'top' }}
        />
        <motion.span
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6, ease }}
          style={{
            left: '57%', bottom: '1cqh', transform: 'translateX(-50%)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
            letterSpacing: '0.2em', color: '#ff8896',
          }}
        >
          AUJOURD’HUI
        </motion.span>

        {/* Jalons opérationnels */}
        {LIVE.map((m, i) => (
          <motion.div
            key={m.t}
            className="absolute flex flex-col"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.25, ease }}
            style={{
              left: `${m.x}%`, top: i % 2 === 0 ? '8cqh' : '25cqh', width: '15%',
              padding: '1.4cqh 0.9cqw', gap: '0.5cqh',
              background: '#341920', border: '1px solid #c8102e', borderRadius: '0.8cqh',
            }}
          >
            <span style={{ fontSize: '1.8cqh', fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>{m.t}</span>
            <span style={{ fontSize: '1.45cqh', fontWeight: 500, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{m.d}</span>
          </motion.div>
        ))}

        {/* Jalons trajectoire */}
        {NEXT.map((m, i) => (
          <motion.div
            key={m.t}
            className="absolute flex flex-col"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 + i * 0.25, ease }}
            style={{
              left: `${m.x}%`, top: i % 2 === 0 ? '10cqh' : '26cqh', width: '13%',
              padding: '1.4cqh 0.9cqw', gap: '0.5cqh',
              border: '1px dashed rgba(255,255,255,0.4)', borderRadius: '0.8cqh',
            }}
          >
            <span style={{ fontSize: '1.8cqh', fontWeight: 800, color: 'rgba(255,255,255,0.8)', lineHeight: 1.25 }}>{m.t}</span>
            <span style={{ fontSize: '1.45cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{m.d}</span>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '2.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Pas de « magie IA » survendue : ce qui est à gauche de la ligne se démontre en direct — la suite est inscrite dans les perspectives.
      </motion.p>
    </div>
  )
}
