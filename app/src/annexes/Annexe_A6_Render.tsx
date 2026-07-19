import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : ce que le développeur porte — pile légère (Render) vs pile qui déborde (AWS/Azure)
const RENDER_BLOCKS = ['git push → déploiement automatique', 'PostgreSQL géré · HTTPS inclus', 'facturation simple, adaptée PME']
const AWS_BLOCKS = ['puissance surdimensionnée', 'coûts imprévisibles', 'profil DevOps dédié', 'VPC · réseau', 'IAM']

export default function Annexe_A6_Render() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 8cqw 4cqh' }}>

      <div className="flex items-end" style={{ gap: '6cqw', height: '58cqh' }}>

        {/* ── Render : pile légère ── */}
        <div className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
              letterSpacing: '0.25em', color: '#c8102e', marginBottom: '1.5cqh',
            }}
          >
            RETENU · RENDER
          </motion.span>
          <div className="flex flex-col" style={{ gap: '0.8cqh' }}>
            {RENDER_BLOCKS.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (RENDER_BLOCKS.length - 1 - i) * 0.15, ease }}
                style={{
                  padding: '1.7cqh 1cqw', borderRadius: '0.7cqh', textAlign: 'center',
                  border: '1px solid rgba(200,16,46,0.6)', background: 'rgba(200,16,46,0.10)',
                }}
              >
                <span style={{ fontSize: '1.8cqh', fontWeight: 700, color: '#fff' }}>{b}</span>
              </motion.div>
            ))}
          </div>
          {/* Socle : le dev */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4, ease }}
            style={{
              marginTop: '1.2cqh', padding: '1.6cqh 0', borderRadius: '0.7cqh', gap: '1cqw',
              background: '#c8102e',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#fff' }}>1 DEV</span>
            <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>— focus produit</span>
          </motion.div>
        </div>

        {/* ── AWS/Azure : pile qui déborde ── */}
        <div className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3, ease }}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
              letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5cqh',
            }}
          >
            ÉCARTÉ · AWS / AZURE
          </motion.span>
          <div className="flex flex-col" style={{ gap: '0.8cqh' }}>
            {AWS_BLOCKS.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: -25, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.6 : 1.8 }}
                transition={{ duration: 0.5, delay: 1.1 + (AWS_BLOCKS.length - 1 - i) * 0.15, ease }}
                style={{
                  padding: '1.5cqh 1cqw', borderRadius: '0.7cqh', textAlign: 'center',
                  border: '1px dashed rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.03)',
                }}
              >
                <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{b}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1, ease }}
            style={{
              marginTop: '1.2cqh', padding: '1.6cqh 0', borderRadius: '0.7cqh', gap: '1cqw',
              border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>1 DEV</span>
            <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>— un métier d’ops à part entière</span>
          </motion.div>
        </div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.2, ease }}
        style={{
          textAlign: 'center', margin: '3.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Le bon outil pour le bon stade : production réelle sur Render depuis mars 2026 · architecture 3-tiers portable — migration cloud possible sans réécriture.
      </motion.p>
    </div>
  )
}
