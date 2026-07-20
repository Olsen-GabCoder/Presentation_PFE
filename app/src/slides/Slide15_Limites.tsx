import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma miroir : sous l'axe la limite et sa cause, au-dessus la mitigation en place
const LIMITS = [
  { id: 'L1', title: 'Tests', limit: 'Tests automatisés limités', cause: '1 développeur · 6 mois', mit: 'Couverture fonctionnelle priorisée sur les modules critiques' },
  { id: 'L2', title: 'QSHE', limit: 'QSHE & Qualité partiels', cause: 'règles métier à finaliser', mit: 'Noyau opérationnel livré · structure extensible en place' },
  { id: 'L3', title: 'PWA', limit: 'PWA plutôt que natif', cause: 'notifications iOS partielles', mit: 'Adoptée sur le terrain · natif = 2× l\u2019effort pour un ROI limité' },
  { id: 'L4', title: 'État', limit: 'Triple state management', cause: 'Redux + TanStack + Zustand', mit: 'Une librairie par nature d\u2019état · frontière documentée' },
  { id: 'L5', title: 'Solo', limit: 'Développement solo', cause: 'bus factor = 1 · pas de peer review', mit: 'Documentation · commits atomiques · conventions uniformes' },
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
        transition={{ duration: 2.5, ease }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        {/* Header */}
        <div className="overflow-hidden" style={{ flexShrink: 0 }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
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

        {/* ── Schéma miroir ── */}
        <div className="flex-1 flex flex-col justify-center" style={{ minHeight: 0 }}>

          {/* Légendes des deux moitiés */}
          <div className="flex justify-between" style={{ marginBottom: '1.2cqh' }}>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}
            >
              ▲ MITIGATION EN PLACE
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}
            >
              ▼ LIMITE · CAUSE
            </motion.span>
          </div>

          <div className="relative flex" style={{ height: '56cqh', gap: '1.2cqw' }}>
            {/* Axe central */}
            <motion.div
              className="absolute"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.8, ease }}
              style={{ left: 0, right: 0, top: '50%', height: 3, background: 'rgba(255,255,255,0.3)', transformOrigin: 'left', zIndex: 0 }}
            />

            {LIMITS.map((l, i) => (
              <div key={l.id} className="flex-1 relative flex flex-col" style={{ zIndex: 1 }}>

                {/* Mitigation — au-dessus */}
                <motion.div
                  className="flex flex-col justify-end items-center"
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.22, ease }}
                  style={{ height: '41%', textAlign: 'center', gap: '0.5cqh', padding: '0 0.3cqw' }}
                >
                  <span style={{ fontSize: '1.75cqh', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>{l.mit}</span>
                  <div style={{ width: 3, height: '3.5cqh', background: '#c8102e', borderRadius: 2 }} />
                </motion.div>

                {/* Badge sur l'axe */}
                <motion.div
                  className="flex flex-col items-center justify-center self-center"
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 1.0 + i * 0.14, ease }}
                  style={{
                    height: '17%', aspectRatio: '1', borderRadius: '50%', gap: '0.1cqh',
                    background: '#141416', border: '2px solid #c8102e',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1 }}>{l.id}</span>
                  <span style={{ fontSize: '1.35cqh', fontWeight: 700, color: '#fff' }}>{l.title}</span>
                </motion.div>

                {/* Limite + cause — en dessous */}
                <motion.div
                  className="flex flex-col justify-start items-center"
                  initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.22, ease }}
                  style={{ height: '42%', textAlign: 'center', gap: '0.5cqh', padding: '0 0.3cqw' }}
                >
                  <div style={{ width: 0, height: '3cqh', borderLeft: '3px dashed rgba(255,255,255,0.35)' }} />
                  <span style={{ fontSize: '1.8cqh', fontWeight: 700, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>{l.limit}</span>
                  <span style={{ fontSize: '1.55cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{l.cause}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.2, ease }}
            style={{
              textAlign: 'center', margin: '2cqh 0 0', fontSize: '1.7cqh', fontWeight: 500,
              color: 'rgba(255,255,255,0.5)', fontStyle: 'italic',
            }}
          >
            Aucune limite cachée : chacune est documentée au rapport, avec sa cause et le garde-fou déjà en place.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
