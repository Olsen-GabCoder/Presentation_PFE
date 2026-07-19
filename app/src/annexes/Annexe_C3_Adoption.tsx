import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : frise du point de non-retour — mars 2026 comme cliquet, retour en arrière barré
const SIGNAUX = [
  { label: 'Production, pas pilote', detail: 'outil de travail quotidien' },
  { label: 'Tous les profils', detail: 'direction → chantier → compta' },
  { label: 'Installée sur le terrain', detail: 'PWA · Android majoritaire' },
  { label: 'Rythme d’usage réel', detail: 'réunions hebdo · DMA · rapports' },
]

export default function Annexe_C3_Adoption() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 3cqh' }}>

      <div className="relative" style={{ height: '52cqh' }}>

        {/* Axe du temps */}
        <motion.div
          className="absolute"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }}
          style={{ left: 0, right: 0, bottom: '6cqh', height: 3, background: 'rgba(255,255,255,0.3)', transformOrigin: 'left' }}
        />

        {/* Avant : dispersion */}
        <motion.div
          className="absolute flex flex-col"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5, ease }}
          style={{ left: 0, bottom: '10cqh', width: '17%', gap: '0.6cqh' }}
        >
          {['Excel', 'WhatsApp', 'papier'].map((t, i) => (
            <span key={t} style={{
              alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
              transform: `rotate(${i % 2 === 0 ? -2 : 2.5}deg)`,
              padding: '0.7cqh 1cqw', borderRadius: '0.5cqh',
              border: '1px dashed rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.4)',
              fontSize: '1.6cqh', fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </motion.div>

        {/* Le cliquet : mars 2026 */}
        <motion.div
          className="absolute flex flex-col items-center"
          initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1, ease }}
          style={{ left: '22%', top: 0, bottom: '6cqh', width: 4 }}
        >
          <div style={{ width: 4, flex: 1, background: '#c8102e' }} />
        </motion.div>
        <motion.span
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2, ease }}
          style={{
            left: '22%', top: '-1cqh', transform: 'translateX(-50%)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
            letterSpacing: '0.2em', color: '#c8102e', whiteSpace: 'nowrap',
          }}
        >
          MARS 2026 · MISE EN PRODUCTION
        </motion.span>

        {/* Signaux après le cliquet */}
        {SIGNAUX.map((s, i) => (
          <motion.div
            key={s.label}
            className="absolute flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 + i * 0.25, ease }}
            style={{ left: `${28 + i * 18.5}%`, bottom: '6cqh', width: '16.5%' }}
          >
            <div className="flex flex-col items-center" style={{
              padding: '1.4cqh 0.8cqw', gap: '0.5cqh', width: '100%',
              background: 'rgba(200,16,46,0.10)', border: '1px solid rgba(200,16,46,0.6)',
              borderRadius: '0.8cqh', marginBottom: '1.2cqh',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25cqh', fontWeight: 700, color: '#ff8896' }}>
                SIGNE {i + 1}
              </span>
              <span style={{ fontSize: '1.8cqh', fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.25 }}>{s.label}</span>
              <span style={{ fontSize: '1.45cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>{s.detail}</span>
            </div>
            <div style={{ width: '1.4cqh', height: '1.4cqh', borderRadius: '50%', background: '#c8102e', marginBottom: '-0.7cqh' }} />
          </motion.div>
        ))}

        {/* Retour en arrière barré */}
        <motion.div
          className="absolute flex items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.8, ease }}
          style={{ left: '24%', right: '6%', bottom: '1.5cqh', gap: '1cqw' }}
        >
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#c8102e' }}>✕</span>
          <div className="flex-1" style={{ borderTop: '2px dashed rgba(255,255,255,0.3)' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.35cqh', fontWeight: 700,
            letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)',
          }}>
            RETOUR EN ARRIÈRE = PERDRE SES PROCESSUS DIGITALISÉS
          </span>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.2, ease }}
        style={{
          textAlign: 'center', margin: '2.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        La meilleure métrique d’adoption n’est pas un taux — c’est l’irréversibilité : l’entreprise ne pourrait plus revenir en arrière.
      </motion.p>
    </div>
  )
}
