import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : le transformateur — chaos dispersé à gauche, la plateforme au centre, processus tracés à droite
const ROWS = [
  { avant: 'Excel dispersés', apres: 'dashboard temps réel' },
  { avant: 'WhatsApp sans trace', apres: 'messagerie structurée' },
  { avant: 'devis saisis à la main', apres: 'DQE + barème intégré' },
  { avant: 'papier · appels · pertes', apres: 'workflow DMA — 7 étapes tracées' },
  { avant: 'aucun KPI', apres: 'KPI consolidés + alertes' },
  { avant: 'PV rédigés à la main', apres: 'PV auto-générés · PDF' },
]

export default function Annexe_C4_Gains() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: 0 }}>

        {/* ── Avant : le chaos ── */}
        <div className="flex flex-col justify-center" style={{ flex: 4, gap: '1.4cqh', paddingRight: '1.5cqw' }}>
          {ROWS.map((r, i) => (
            <motion.span
              key={r.avant}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease }}
              style={{
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                transform: `rotate(${i % 3 === 0 ? -1.5 : i % 3 === 1 ? 2 : -0.5}deg)`,
                padding: '1cqh 1.2cqw', borderRadius: '0.6cqh',
                border: '1px dashed rgba(255,255,255,0.3)',
                fontSize: '1.75cqh', fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
              }}
            >
              {r.avant}
            </motion.span>
          ))}
        </div>

        {/* Lignes convergentes gauche */}
        <motion.svg
          viewBox="0 0 100 400" preserveAspectRatio="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1, ease }}
          style={{ width: '6cqw', height: '52cqh', alignSelf: 'center' }}
        >
          {ROWS.map((_, i) => (
            <path
              key={i}
              d={`M 0 ${35 + i * 66} C 55 ${35 + i * 66} 45 200 100 200`}
              fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 5"
            />
          ))}
        </motion.svg>

        {/* ── La plateforme : le transformateur ── */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease }}
          style={{
            width: '12cqw', alignSelf: 'center', padding: '4cqh 0.5cqw', gap: '1cqh',
            background: 'rgba(200,16,46,0.12)', border: '2px solid #c8102e', borderRadius: '1.2cqh',
          }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700,
            letterSpacing: '0.3em', color: '#c8102e', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          }}>
            PLATEFORME
          </span>
        </motion.div>

        {/* Lignes divergentes droite */}
        <motion.svg
          viewBox="0 0 100 400" preserveAspectRatio="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.8, ease }}
          style={{ width: '6cqw', height: '52cqh', alignSelf: 'center' }}
        >
          {ROWS.map((_, i) => (
            <path
              key={i}
              d={`M 0 200 C 55 200 45 ${35 + i * 66} 100 ${35 + i * 66}`}
              fill="none" stroke="#c8102e" strokeWidth="2.5"
            />
          ))}
        </motion.svg>

        {/* ── Après : l'ordre ── */}
        <div className="flex flex-col justify-center" style={{ flex: 4, gap: '1.4cqh', paddingLeft: '1.5cqw' }}>
          {ROWS.map((r, i) => (
            <motion.span
              key={r.apres}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 2 + i * 0.1, ease }}
              style={{
                padding: '1cqh 1.2cqw', borderRadius: '0.6cqh',
                background: 'rgba(200,16,46,0.10)', border: '1px solid rgba(200,16,46,0.65)',
                fontSize: '1.75cqh', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap',
              }}
            >
              {r.apres}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Des opérations qui reposaient sur des personnes et du papier reposent désormais sur des processus tracés — sans licence par utilisateur d’un ERP étranger.
      </motion.p>
    </div>
  )
}
