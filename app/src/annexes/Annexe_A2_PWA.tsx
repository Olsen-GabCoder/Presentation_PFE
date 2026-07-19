import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : embranchement — depuis "1 dev · 6 mois", la voie PWA aboutit, la voie native se disperse
const PWA_STEPS = ['1 base de code · React + TS', 'Install 1 clic · navigateur', 'Hors ligne · service worker']
const NATIF_STEPS = ['3 bases de code', 'Stores · certificats · MAJ', 'Hors ligne à re-développer ×3']

export default function Annexe_A2_PWA() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      <div className="flex items-center" style={{ height: '58cqh' }}>

        {/* ── Origine ── */}
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            width: '12cqw', height: '12cqw', borderRadius: '50%', gap: '0.3cqh',
            border: '2px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)',
          }}
        >
          <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff', lineHeight: 1 }}>1 dev</span>
          <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>6 mois</span>
        </motion.div>

        {/* ── La fourche (SVG) ── */}
        <div className="flex-shrink-0" style={{ width: '7cqw', alignSelf: 'stretch' }}>
          <svg viewBox="0 0 100 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <motion.path
              d="M 0 200 C 55 200 45 48 100 48"
              fill="none" stroke="#c8102e" strokeWidth="5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
            />
            <motion.path
              d="M 0 200 C 55 200 45 352 100 352"
              fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeDasharray="10 9"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.75, ease }}
            />
          </svg>
        </div>

        {/* ── Les deux voies ── */}
        <div className="flex-1 flex flex-col justify-between" style={{ height: '100%', padding: '3cqh 0' }}>

          {/* Voie PWA — retenue */}
          <div className="flex items-center" style={{ gap: '0.8cqw' }}>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1, ease }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
                letterSpacing: '0.22em', color: '#c8102e', width: '6.5cqw', flexShrink: 0,
              }}
            >
              PWA
            </motion.span>
            {PWA_STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1" style={{ gap: '0.8cqw', minWidth: 0 }}>
                <motion.div
                  className="flex-1 flex items-center justify-center"
                  initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 1.1 + i * 0.2, ease }}
                  style={{
                    padding: '1.6cqh 0.5cqw', borderRadius: '0.8cqh', textAlign: 'center',
                    border: '1px solid rgba(200,16,46,0.55)', background: 'rgba(200,16,46,0.08)',
                  }}
                >
                  <span style={{ fontSize: '1.7cqh', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{s}</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.25 + i * 0.2, ease }}
                  style={{ color: '#c8102e', fontSize: '2cqh', fontWeight: 700 }}
                >
                  →
                </motion.span>
              </div>
            ))}
            <motion.div
              className="flex flex-col items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.85, ease }}
              style={{
                width: '13cqw', padding: '1.6cqh 0', borderRadius: '1cqh', gap: '0.3cqh',
                border: '2px solid #c8102e', background: 'rgba(200,16,46,0.14)',
              }}
            >
              <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff', lineHeight: 1 }}>19 domaines</span>
              <span style={{ fontSize: '1.4cqh', fontWeight: 600, color: '#ff8896' }}>COUVERTS</span>
            </motion.div>
          </div>

          {/* Voie native — écartée */}
          <div className="flex items-center" style={{ gap: '0.8cqw' }}>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.15, ease }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
                letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', width: '6.5cqw', flexShrink: 0,
              }}
            >
              NATIF
            </motion.span>
            {NATIF_STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1" style={{ gap: '0.8cqw', minWidth: 0 }}>
                <motion.div
                  className="flex-1 flex items-center justify-center"
                  initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1 - i * 0.22, x: 0 }}
                  transition={{ duration: 0.45, delay: 1.25 + i * 0.2, ease }}
                  style={{
                    padding: '1.6cqh 0.5cqw', borderRadius: '0.8cqh', textAlign: 'center',
                    border: '1px dashed rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.3 }}>{s}</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.3, delay: 1.4 + i * 0.2, ease }}
                  style={{ color: '#fff', fontSize: '2cqh', fontWeight: 700 }}
                >
                  →
                </motion.span>
              </div>
            ))}
            <motion.div
              className="flex flex-col items-center justify-center flex-shrink-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2, ease }}
              style={{
                width: '13cqw', padding: '1.6cqh 0', borderRadius: '1cqh', gap: '0.3cqh',
                border: '1px dashed rgba(255,255,255,0.3)', background: 'transparent',
              }}
            >
              <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>÷ 2</span>
              <span style={{ fontSize: '1.4cqh', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>COUVERTURE</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.4, ease }}
        style={{
          textAlign: 'center', margin: '2cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Choix validé avec l’encadrant professionnel · limite assumée : notifications iOS restreintes · évolution prévue : Capacitor.
      </motion.p>
    </div>
  )
}
