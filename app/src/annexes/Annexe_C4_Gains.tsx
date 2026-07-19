import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Avant / après — repris de la slide Contexte (processus réels de l'entreprise)
const ROWS = [
  { proc: 'Suivi de projet',     avant: 'Excel dispersés',         apres: 'Dashboard temps réel' },
  { proc: 'Coordination',        avant: 'WhatsApp sans trace',     apres: 'Messagerie structurée' },
  { proc: 'Devis & DQE',         avant: 'Saisie manuelle',         apres: 'DQE + barème intégré' },
  { proc: 'Demandes matériel',   avant: 'Papier, appels, pertes',  apres: 'Workflow DMA · 7 étapes tracées' },
  { proc: 'Pilotage direction',  avant: 'Aucun KPI',               apres: 'KPI consolidés + alertes' },
  { proc: 'Rapports & PV',       avant: 'Rédaction manuelle',      apres: 'PV auto-générés, PDF' },
]

export default function Annexe_C4_Gains() {
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex" style={{ gap: '2cqw', marginBottom: '1cqh' }}>
        <div style={{ width: '16cqw' }} />
        <span className="flex-1" style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
          letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textAlign: 'center',
        }}>
          AVANT
        </span>
        <span className="flex-1" style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
          letterSpacing: '0.22em', color: '#c8102e', textAlign: 'center',
        }}>
          APRÈS
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center" style={{ gap: '0.3cqh' }}>
        {ROWS.map((r, i) => (
          <motion.div
            key={r.proc}
            className="flex items-center"
            initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
            style={{ gap: '2cqw', padding: '1.3cqh 0', borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span style={{
              width: '16cqw', flexShrink: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.5cqh', fontWeight: 700, color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {r.proc}
            </span>
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
              {r.avant}
            </span>
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#fff', textAlign: 'center' }}>
              {r.apres}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Le gain de fond : des opérations qui reposaient sur des personnes et du papier reposent désormais sur
          des <b style={{ color: '#fff' }}>processus tracés</b> — information centralisée, décisions informées,
          responsabilités auditables. Le tout <b style={{ color: '#fff' }}>sans licence par utilisateur</b> d’un ERP étranger.
        </p>
      </motion.div>
    </div>
  )
}
