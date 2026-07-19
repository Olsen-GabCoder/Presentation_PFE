import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Chaîne de preuves que « ça marche vraiment »
const PROOFS = [
  { kicker: 'PREUVE 1', title: 'Validation à chaque vague', detail: 'Rien ne passe en production sans recette avec l’encadrant professionnel (M. Jribi) — parcours critiques rejoués.' },
  { kicker: 'PREUVE 2', title: 'Production réelle', detail: 'En service depuis mars 2026 — pas une démo : l’outil de travail effectif de l’entreprise.' },
  { kicker: 'PREUVE 3', title: 'Usage terrain', detail: 'Installée sur les appareils des équipes (PWA) et utilisée dans les opérations quotidiennes.' },
  { kicker: 'PREUVE 4', title: 'Retours intégrés', detail: 'Les anomalies remontées par les utilisateurs sont corrigées en continu — le terrain pilote les priorités.' },
]

export default function Annexe_M3_Validation() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {PROOFS.map((p, i) => (
          <div key={p.kicker} className="flex items-center flex-1" style={{ gap: '1.2cqw' }}>
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
              style={{
                padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1cqh',
                background: i === 1 ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
                border: i === 1 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
              }}>
                {p.kicker}
              </span>
              <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {p.title}
              </span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                {p.detail}
              </span>
            </motion.div>
            {i < PROOFS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease }}
                style={{ fontSize: '2.6cqh', color: '#c8102e', fontWeight: 700, flexShrink: 0 }}
              >
                →
              </motion.span>
            )}
          </div>
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
          La preuve la plus forte n’est pas un rapport de tests : c’est une entreprise qui
          <b style={{ color: '#fff' }}> fait tourner ses opérations dessus</b>, chaque jour, depuis des mois.
        </p>
      </motion.div>
    </div>
  )
}
