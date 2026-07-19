import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Trois natures d'état différentes → trois outils spécialisés
const STORES = [
  {
    kicker: 'ÉTAT SERVEUR',
    title: 'TanStack Query',
    detail: 'Données venant de l’API : cache 5 min, invalidation, resynchronisation en arrière-plan. Le problème le plus dur — délégué à l’outil fait pour.',
  },
  {
    kicker: 'ÉTAT GLOBAL MÉTIER',
    title: 'Redux Toolkit',
    detail: 'Session, permissions, préférences : 23 slices persistées (redux-persist), partagées par toute l’application.',
  },
  {
    kicker: 'ÉTAT UI LOCAL',
    title: 'Zustand',
    detail: 'États d’interface légers et isolés (panneaux, sélections) — sans la cérémonie Redux pour trois booléens.',
  },
]

export default function Annexe_A8_Etat() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.5cqw' }}>
        {STORES.map((s, i) => (
          <motion.div
            key={s.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
            }}>
              {s.kicker}
            </span>
            <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {s.title}
            </span>
            <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              {s.detail}
            </span>
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
          Pas de sur-ingénierie : <b style={{ color: '#fff' }}>trois natures d’état différentes, trois outils spécialisés</b>.
          Forcer tout dans un seul store serait le vrai anti-pattern — la frontière entre les trois est
          <b style={{ color: '#fff' }}> nette et documentée</b>.
        </p>
      </motion.div>
    </div>
  )
}
