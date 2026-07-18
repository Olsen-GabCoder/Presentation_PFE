import { motion } from 'framer-motion'
import { CircleCheckBig, Globe, Award } from 'lucide-react'

const objectives = [
  {
    Icon: CircleCheckBig,
    badge: 'Objectif 1 · Atteint',
    badgeColor: '#34d399',
    title: 'Une plateforme unifiée',
    desc: '19 domaines, de l\'initialisation à la réception. 85 000 lignes · 81 entités · 366 endpoints · 85+ pages.',
  },
  {
    Icon: Globe,
    badge: 'Objectif 2 · Atteint',
    badgeColor: '#34d399',
    title: 'Adaptée au contexte gabonais',
    desc: 'PWA offline · i18n FR/EN · 13 rôles calqués sur l\'organigramme · autonomie technologique.',
  },
  {
    Icon: Award,
    badge: 'Objectif 3 · Nuancé',
    badgeColor: '#fbbf24',
    title: 'Conforme aux standards',
    desc: 'Architecture conforme · démarche agile ASIIN/EUR-ACE. Limites : tests ciblés, QSHE partiel, extraction IA en prototype.',
  },
]

export default function Slide16_Conclusion() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/conclusion.jpg)',
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

      <div className="absolute inset-0 flex flex-col items-center"
        style={{ paddingLeft: '6cqw', paddingRight: '6cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>

        {/* Header — centred */}
        <div style={{ marginBottom: '3cqh', textAlign: 'center' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Trois objectifs,{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>trois réponses.</span>
            </motion.h1>
          </div>
        </div>

        {/* 3 objective cards — full-width stacked */}
        <div className="flex-1 flex flex-col justify-center w-full" style={{ gap: '1.2cqh' }}>
          {objectives.map((o, i) => (
            <motion.div
              key={i}
              className="flex items-center"
              style={{
                padding: '2cqh 2.5cqw',
                borderRadius: '1cqh',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${o.badgeColor}`,
                gap: '2cqw',
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -25 : 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon */}
              <o.Icon
                style={{ width: '4cqh', height: '4cqh', color: o.badgeColor, flexShrink: 0 }}
                strokeWidth={1.5}
              />

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div className="flex items-center" style={{ gap: '1cqw', marginBottom: '0.6cqh' }}>
                  <span style={{
                    padding: '0.4cqh 0.8cqw',
                    borderRadius: '0.4cqh',
                    background: `${o.badgeColor}15`,
                    border: `1px solid ${o.badgeColor}40`,
                    fontSize: '1.3cqh', fontWeight: 700, color: o.badgeColor,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {o.badge}
                  </span>
                  <h3 style={{
                    fontSize: '2.6cqh', fontWeight: 800, color: '#fff',
                    margin: 0,
                  }}>
                    {o.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: '2.0cqh', color: 'rgba(255,255,255,0.60)',
                  margin: 0, lineHeight: 1.5,
                }}>
                  {o.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
