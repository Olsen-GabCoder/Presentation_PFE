import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Mitigations du risque « développeur unique » sur ~85 000 lignes
const PILLARS = [
  {
    kicker: 'ARCHITECTURE',
    title: 'Un seul patron, partout',
    detail: 'Entity → Repository → Service → Controller, identique sur les 12 sous-domaines. Comprendre un module, c’est les comprendre tous.',
  },
  {
    kicker: 'STACK',
    title: 'Technologies standard',
    detail: 'React, Spring Boot, PostgreSQL : les compétences les plus répandues du marché — pas de framework maison.',
  },
  {
    kicker: 'TYPAGE',
    title: 'TypeScript + Kotlin',
    detail: 'Typage fort de bout en bout : le compilateur documente les contrats et bloque les régressions d’un repreneur.',
  },
  {
    kicker: 'DOCUMENTATION',
    title: 'Rapport + code versionné',
    detail: '120+ pages, diagrammes de classes par domaine (annexe B), historique git traçable — la connaissance n’est pas que dans une tête.',
  },
]

export default function Annexe_C2_BusFactor() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
            style={{
              padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1cqh',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
            }}>
              {p.kicker}
            </span>
            <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {p.title}
            </span>
            <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
              {p.detail}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Le risque est réel et <b style={{ color: '#fff' }}>assumé comme limite</b> — mais la reprise est préparée :
          un développeur React/Spring standard peut monter sur le projet <b style={{ color: '#fff' }}>sans connaissance tribale</b>.
        </p>
      </motion.div>
    </div>
  )
}
