import { motion } from 'framer-motion'

const CRITERIA = [
  { label: 'Bases de code',          pwa: '1 seule (React + TS)',              natif: '3 (web + Android + iOS)' },
  { label: 'Distribution',           pwa: 'Navigateur — install 1 clic',       natif: 'Stores, certificats, MAJ OTA' },
  { label: 'Hors ligne',             pwa: 'Service worker natif',              natif: 'À développer par plateforme' },
  { label: '1 dev · 6 mois',         pwa: '19 domaines couverts',              natif: 'Couverture réduite de moitié' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Annexe_A2_PWA() {
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* En-têtes des deux options */}
      <div className="flex" style={{ gap: '2cqw', marginBottom: '1.5cqh' }}>
        <div style={{ width: '16cqw' }} />
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            padding: '1.2cqh 0', borderRadius: '0.8cqh',
            background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.55)', gap: '1cqw',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, color: '#c8102e', letterSpacing: '0.2em' }}>RETENU</span>
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff' }}>PWA</span>
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
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: 'rgba(255,255,255,0.55)' }}>Natif (RN / Flutter)</span>
        </motion.div>
      </div>

      {/* Lignes de critères */}
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
              width: '16cqw', flexShrink: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.6cqh', fontWeight: 700, color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {c.label}
            </span>
            <span className="flex-1" style={{ fontSize: '2.1cqh', fontWeight: 700, color: '#fff', textAlign: 'center' }}>
              {c.pwa}
            </span>
            <span className="flex-1" style={{ fontSize: '2.1cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
              {c.natif}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
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
          Choix <b style={{ color: '#fff' }}>validé avec l’encadrant professionnel</b> — installée et utilisée sur les appareils terrain.
          Limite assumée : notifications iOS restreintes. Évolution prévue : <b style={{ color: '#fff' }}>Capacitor</b> si l’usage exige du natif.
        </p>
      </motion.div>
    </div>
  )
}
