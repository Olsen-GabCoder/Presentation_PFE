import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const CRITERIA = [
  { label: 'Exploitation',  win: 'PaaS géré — deploy sur git push, zéro serveur à administrer', lose: 'IAM, VPC, réseau : un métier à part entière' },
  { label: 'Équipe',        win: 'Compatible « 1 développeur » — focus sur le produit', lose: 'Exige un profil DevOps dédié' },
  { label: 'Coût',          win: 'Facturation simple, adaptée à une PME', lose: 'Coûts difficiles à prévoir et à maîtriser' },
  { label: 'Besoin réel',   win: 'PostgreSQL géré + web service + HTTPS : tout y est', lose: 'Puissance surdimensionnée pour ce stade' },
]

export default function Annexe_A6_Render() {
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex" style={{ gap: '2cqw', marginBottom: '1.5cqh' }}>
        <div style={{ width: '14cqw' }} />
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            padding: '1.2cqh 0', borderRadius: '0.8cqh',
            background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.55)', gap: '1cqw',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, color: '#c8102e', letterSpacing: '0.2em' }}>RETENU</span>
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff' }}>Render</span>
        </motion.div>
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease }}
          style={{
            padding: '1.2cqh 0', borderRadius: '0.8cqh',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', gap: '1cqw',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>ÉCARTÉ</span>
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: 'rgba(255,255,255,0.55)' }}>AWS / Azure</span>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center" style={{ gap: '0.4cqh' }}>
        {CRITERIA.map((c, i) => (
          <motion.div
            key={c.label}
            className="flex items-center"
            initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease }}
            style={{ gap: '2cqw', padding: '1.6cqh 0', borderBottom: i < CRITERIA.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span style={{
              width: '14cqw', flexShrink: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.6cqh', fontWeight: 700, color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {c.label}
            </span>
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.4 }}>
              {c.win}
            </span>
            <span className="flex-1" style={{ fontSize: '1.9cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.4 }}>
              {c.lose}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Le bon outil pour le bon stade : Render héberge la production réelle depuis mars 2026.
          L’architecture 3-tiers reste <b style={{ color: '#fff' }}>portable</b> — une migration cloud ultérieure
          resterait possible <b style={{ color: '#fff' }}>sans réécriture</b>.
        </p>
      </motion.div>
    </div>
  )
}
