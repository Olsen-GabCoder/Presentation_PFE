import { motion } from 'framer-motion'
import { Check, CircleDashed } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

// Contenu identique à la version d'origine — seule la mise en forme change.
const MODULES = [
  { name: 'Authentification & sécurité', full: true },
  { name: 'Projets, DQE & barèmes', full: true },
  { name: 'Matériel & workflow DMA', full: true },
  { name: 'Salle MIKA & messagerie', full: true },
  { name: 'Reporting & dashboard', full: true },
  { name: 'Qualité & conformité', full: false },
  { name: 'Pilotage & IA', full: false },
]

const PARCOURS = [
  'Auth complète',
  'Création projet + DQE',
  'Workflow DMA 7 étapes',
  'Session Salle MIKA + PV',
  'Dashboard exécutif',
]

// Remplissage des jauges : validé = 100 %, partiel = 60 %
const FILL_FULL = 100
const FILL_PARTIAL = 60

export default function Slide14_Validation() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/validation.jpg)',
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
            Une validation terrain itérative avec le sponsor,{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>à chaque release.</span>
          </motion.h1>
        </div>

        {/* ── Jauges de couverture + parcours/méthodes ── */}
        <div className="flex-1 flex items-center" style={{ gap: '5cqw', minHeight: 0, paddingTop: '5cqh', paddingLeft: '2cqw', paddingRight: '2cqw' }}>

          {/* Colonne jauges */}
          <div className="flex flex-col" style={{ flex: 11, minWidth: 0 }}>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                margin: '0 0 1.6cqh',
              }}
            >
              Macro-domaine · couverture
            </motion.p>

            <div className="flex flex-col" style={{ gap: '2.1cqh' }}>
              {MODULES.map((m, i) => {
                const color = m.full ? '#34d399' : '#fbbf24'
                const fill = m.full ? FILL_FULL : FILL_PARTIAL
                return (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.9 + i * 0.12, ease }}
                  >
                    {/* Nom + statut */}
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.6cqh' }}>
                      <span style={{ fontSize: '1.95cqh', fontWeight: 600, color: 'rgba(255,255,255,0.82)' }}>
                        {m.name}
                      </span>
                      <span className="flex items-center" style={{ gap: '0.4cqw', flexShrink: 0 }}>
                        {m.full
                          ? <Check style={{ width: '1.9cqh', height: '1.9cqh', color }} strokeWidth={2.5} />
                          : <CircleDashed style={{ width: '1.9cqh', height: '1.9cqh', color }} strokeWidth={2} />}
                        <span style={{ fontSize: '1.6cqh', fontWeight: 700, color }}>
                          {m.full ? 'Validé' : 'Validé partiel'}
                        </span>
                      </span>
                    </div>
                    {/* Jauge */}
                    <div style={{
                      height: '0.55cqh', borderRadius: '0.55cqh',
                      background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 0.9, delay: 1.2 + i * 0.15, ease }}
                        style={{
                          width: `${fill}%`, height: '100%', borderRadius: '0.55cqh',
                          background: color, transformOrigin: 'left',
                          boxShadow: `0 0 1.2cqh ${m.full ? 'rgba(52,211,153,0.35)' : 'rgba(251,191,36,0.35)'}`,
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.6, ease }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', margin: '1.8cqh 0 0',
              }}
            >
              <span style={{ color: '#34d399' }}>5 validés</span> · <span style={{ color: '#fbbf24' }}>2 partiels</span>
            </motion.p>
          </div>

          {/* Parcours */}
          <div className="flex flex-col" style={{ flex: 9, minWidth: 0, alignSelf: 'stretch' }}>

            <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
                  letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c8102e',
                  margin: '0 0 1.2cqh',
                }}
              >
                5 parcours critiques · à chaque livraison
              </motion.p>
              {/* Rail vertical + jalons numérotés */}
              <div className="relative flex-1 flex flex-col justify-between" style={{ minHeight: 0 }}>
                <motion.div
                  className="absolute"
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ duration: 0.9, delay: 1.4, ease }}
                  style={{
                    left: '1.7cqh', top: '1.7cqh', bottom: '1.7cqh', width: 2,
                    background: 'rgba(200,16,46,0.45)', transform: 'translateX(-50%)',
                    transformOrigin: 'top',
                  }}
                />
                {PARCOURS.map((p, i) => (
                  <motion.div
                    key={p}
                    className="flex items-center"
                    initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 1.5 + i * 0.16, ease }}
                    style={{ gap: '1cqw' }}
                  >
                    <span className="flex items-center justify-center" style={{
                      width: '3.4cqh', height: '3.4cqh', borderRadius: '50%', flexShrink: 0,
                      background: '#141416', border: '2px solid #c8102e',
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 800, color: '#ff8896',
                      position: 'relative', zIndex: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '2.1cqh', fontWeight: 600, color: 'rgba(255,255,255,0.78)' }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}
          style={{
            fontSize: '1.7cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '2cqh',
            textAlign: 'center', fontStyle: 'italic', flexShrink: 0,
          }}
        >
          Arbitrage assumé : couverture fonctionnelle large plutôt que tests exhaustifs sur un périmètre réduit.
        </motion.p>
      </div>
    </div>
  )
}
