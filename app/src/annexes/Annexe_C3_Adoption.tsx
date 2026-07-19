import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const SIGNS = [
  { kicker: 'SIGNE 1', title: 'Production, pas pilote', detail: 'En service depuis mars 2026 — la plateforme est l’outil de travail, pas une expérimentation parallèle.' },
  { kicker: 'SIGNE 2', title: 'Tous les profils', detail: 'Direction (KPI), chefs de projet, chefs de chantier, comptabilité, qualité, logistique — toute la chaîne de valeur sollicitée.' },
  { kicker: 'SIGNE 3', title: 'Installée sur le terrain', detail: 'PWA en un clic sur des appareils hétérogènes (Android majoritaire) — l’installation sans store a facilité l’adoption.' },
  { kicker: 'SIGNE 4', title: 'Rythme d’usage réel', detail: 'Réunions hebdomadaires en Salle MIKA avec rappels automatiques, DMA et rapports qui transitent par la plateforme.' },
]

export default function Annexe_C3_Adoption() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {SIGNS.map((s, i) => (
          <motion.div
            key={s.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
            style={{
              padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1cqh',
              background: i === 0 ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: i === 0 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
            }}>
              {s.kicker}
            </span>
            <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {s.title}
            </span>
            <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
              {s.detail}
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
          Le rapport l’assume : le choix de la couverture large a été <b style={{ color: '#fff' }}>« validé par l’adoption
          réelle de la plateforme »</b>. La meilleure métrique d’adoption : l’entreprise ne pourrait plus revenir en arrière
          sans perdre ses processus digitalisés.
        </p>
      </motion.div>
    </div>
  )
}
