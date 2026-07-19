import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : le pont de reprise — le tablier repose sur 4 piliers au-dessus du vide
const PILLARS = [
  { kicker: 'ARCHITECTURE', label: 'un seul patron', detail: 'Entity → Repository → Service → Controller · 12 sous-domaines' },
  { kicker: 'STACK', label: 'standard', detail: 'React · Spring Boot · PostgreSQL — compétences du marché' },
  { kicker: 'TYPAGE', label: 'fort, partout', detail: 'TypeScript + Kotlin — le compilateur documente les contrats' },
  { kicker: 'DOCUMENTATION', label: 'versionnée', detail: '120+ pages · diagrammes annexe B · historique git' },
]

export default function Annexe_C2_BusFactor() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>

        {/* ── Rive gauche ── */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            width: '15cqw', padding: '2cqh 1cqw', gap: '0.8cqh', borderRadius: '1cqh',
            background: 'rgba(200,16,46,0.10)', border: '2px solid #c8102e',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#c8102e' }}>
            AUJOURD’HUI
          </span>
          <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.25 }}>
            Développeur unique
          </span>
          <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
            ~85 000 lignes
          </span>
        </motion.div>

        {/* ── Le pont ── */}
        <div className="flex-1 flex flex-col">

          {/* Tablier */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.7, ease }}
            style={{
              height: '6cqh', background: '#c8102e', borderRadius: '0.6cqh',
              transformOrigin: 'left', zIndex: 2,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#fff' }}>
              REPRISE SANS CONNAISSANCE TRIBALE
            </span>
          </motion.div>

          {/* Piliers au-dessus du vide */}
          <div className="flex items-stretch" style={{ gap: '1cqw', height: '30cqh', padding: '0 1.5cqw' }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.kicker}
                className="flex-1 flex flex-col items-center"
                initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.25, ease }}
                style={{
                  padding: '1.8cqh 0.8cqw', gap: '0.8cqh',
                  background: '#1d1d20', border: '1px solid rgba(200,16,46,0.55)',
                  borderTop: '4px solid #c8102e', borderRadius: '0 0 0.8cqh 0.8cqh',
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25cqh', fontWeight: 700, letterSpacing: '0.18em', color: '#ff8896', textAlign: 'center' }}>
                  {p.kicker}
                </span>
                <span style={{ fontSize: '1.9cqh', fontWeight: 800, color: '#fff', textAlign: 'center' }}>{p.label}</span>
                <span style={{ fontSize: '1.45cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.4 }}>
                  {p.detail}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Le vide */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.6, ease }}
            style={{ height: '5cqh', borderTop: '2px dashed rgba(255,255,255,0.25)' }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)' }}>
              LE RISQUE « BUS FACTOR » — RÉEL, ASSUMÉ COMME LIMITE
            </span>
          </motion.div>
        </div>

        {/* ── Rive droite ── */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 2.3, ease }}
          style={{
            width: '15cqw', padding: '2cqh 1cqw', gap: '0.8cqh', borderRadius: '1cqh',
            background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(255,255,255,0.35)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>
            DEMAIN
          </span>
          <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.25 }}>
            Repreneur
          </span>
          <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
            profil React/Spring standard
          </span>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        On ne supprime pas le risque d’un développeur unique — on construit le pont qui permet à un autre de traverser.
      </motion.p>
    </div>
  )
}
