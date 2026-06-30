import { motion } from 'framer-motion'
import { Bug, ShieldQuestion, Smartphone, Layers, User } from 'lucide-react'

const limits = [
  {
    Icon: Bug,
    limit: 'Tests automatisés limités',
    cause: '1 développeur, 6 mois',
    mitigation: 'Couverture fonctionnelle priorisée sur modules critiques',
  },
  {
    Icon: ShieldQuestion,
    limit: 'QSHE & Qualité partiels',
    cause: 'Spécification métier à finaliser',
    mitigation: 'Noyau opérationnel livré, structure en place',
  },
  {
    Icon: Smartphone,
    limit: 'PWA vs natif',
    cause: 'Notifications iOS partielles',
    mitigation: 'Adoptée terrain · natif = 2× effort pour un ROI limité',
  },
  {
    Icon: Layers,
    limit: 'Triple state management',
    cause: 'Redux + TanStack + Zustand',
    mitigation: 'Séparation claire · barrière d\'entrée documentée',
  },
  {
    Icon: User,
    limit: 'Développement solo',
    cause: 'Bus factor = 1, pas de peer review',
    mitigation: 'Documentation · commits atomiques · conventions',
  },
]

export default function Slide15_Limites() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/limites.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.14,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.14 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>

        {/* Header */}
        <div style={{ marginBottom: '3cqh' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Des limites assumées et documentées,{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>chaque compromis justifié.</span>
            </motion.h1>
          </div>
        </div>

        {/* Table header */}
        <motion.div
          className="grid"
          style={{
            gridTemplateColumns: '5cqw 1fr 1fr 1.3fr',
            gap: '1.5cqw',
            padding: '1.5cqh 2cqw',
            borderRadius: '0.8cqh 0.8cqh 0 0',
            background: 'var(--surface-card)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          <span />
          <span style={{ fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Limite
          </span>
          <span style={{ fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Cause
          </span>
          <span style={{ fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Mitigation
          </span>
        </motion.div>

        {/* Table rows */}
        <div className="flex-1 flex flex-col">
          {limits.map((row, i) => (
            <motion.div
              key={i}
              className="flex-1 grid items-center"
              style={{
                gridTemplateColumns: '5cqw 1fr 1fr 1.3fr',
                gap: '1.5cqw',
                padding: '0 2cqw',
                background: 'rgba(255,255,255,0.015)',
                borderBottom: i < limits.length - 1 ? '1px solid var(--surface-card)' : 'none',
              }}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
            >
              <row.Icon
                style={{ width: '2.8cqh', height: '2.8cqh', color: '#c8102e' }}
                strokeWidth={1.5}
              />
              <span style={{ fontSize: '2.0cqh', fontWeight: 700, color: '#e8384f' }}>
                {row.limit}
              </span>
              <span style={{ fontSize: '2.0cqh', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                {row.cause}
              </span>
              <span style={{ fontSize: '2.0cqh', fontWeight: 600, color: '#34d399', lineHeight: 1.4 }}>
                {row.mitigation}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
