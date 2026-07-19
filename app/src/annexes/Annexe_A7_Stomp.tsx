import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : deux canaux entre client et serveur — STOMP bidirectionnel, SSE descendant
const STOMP_CHIPS = ['présence en réunion', 'signalisation WebRTC', 'notifications · topics']

export default function Annexe_A7_Stomp() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      <div className="flex items-stretch" style={{ height: '52cqh' }}>

        {/* ── Client ── */}
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            width: '13cqw', borderRadius: '1.2cqh', gap: '0.5cqh',
            border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>CLIENT</span>
          <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff' }}>PWA React</span>
        </motion.div>

        {/* ── Les deux canaux ── */}
        <div className="flex-1 flex flex-col justify-around" style={{ padding: '2cqh 0' }}>

          {/* Canal STOMP — bidirectionnel */}
          <div className="flex flex-col" style={{ gap: '1.2cqh', padding: '0 2cqw' }}>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6, ease }}
              style={{ gap: '1cqw' }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}>
                WEBSOCKET STOMP
              </span>
              <span style={{ fontSize: '1.5cqh', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>bidirectionnel</span>
            </motion.div>
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1, ease }}
                style={{
                  width: 0, height: 0, flexShrink: 0,
                  borderTop: '1cqh solid transparent', borderBottom: '1cqh solid transparent',
                  borderRight: '1.3cqh solid #c8102e',
                }}
              />
              <motion.div
                className="flex-1"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.8, ease }}
                style={{ height: 5, background: '#c8102e', transformOrigin: 'center' }}
              />
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1, ease }}
                style={{
                  width: 0, height: 0, flexShrink: 0,
                  borderTop: '1cqh solid transparent', borderBottom: '1cqh solid transparent',
                  borderLeft: '1.3cqh solid #c8102e',
                }}
              />
            </div>
            <div className="flex justify-center" style={{ gap: '1cqw' }}>
              {STOMP_CHIPS.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 1.2 + i * 0.15, ease }}
                  style={{
                    padding: '0.9cqh 1.1cqw', borderRadius: '0.6cqh',
                    border: '1px solid rgba(200,16,46,0.6)', background: 'rgba(200,16,46,0.10)',
                    fontSize: '1.6cqh', fontWeight: 700, color: '#fff',
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Canal SSE — descendant */}
          <div className="flex flex-col" style={{ gap: '1.2cqh', padding: '0 2cqw' }}>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.7, ease }}
              style={{ gap: '1cqw' }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
                SSE
              </span>
              <span style={{ fontSize: '1.5cqh', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>descendant uniquement</span>
            </motion.div>
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 2.1, ease }}
                style={{
                  width: 0, height: 0, flexShrink: 0,
                  borderTop: '0.9cqh solid transparent', borderBottom: '0.9cqh solid transparent',
                  borderRight: '1.2cqh solid rgba(255,255,255,0.5)',
                }}
              />
              <motion.div
                className="flex-1"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 1.9, ease }}
                style={{
                  height: 0, transformOrigin: 'right',
                  borderTop: '3px dashed rgba(255,255,255,0.45)',
                }}
              />
            </div>
            <div className="flex justify-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 2.3, ease }}
                style={{
                  padding: '0.9cqh 1.1cqw', borderRadius: '0.6cqh',
                  border: '1px dashed rgba(255,255,255,0.3)',
                  fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.65)',
                }}
              >
                streaming IA — réponses mot à mot
              </motion.span>
            </div>
          </div>
        </div>

        {/* ── Serveur ── */}
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{
            width: '13cqw', borderRadius: '1.2cqh', gap: '0.5cqh',
            border: '1px solid rgba(200,16,46,0.55)', background: 'rgba(200,16,46,0.06)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}>SERVEUR</span>
          <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff' }}>Spring Boot</span>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.7, ease }}
        style={{
          textAlign: 'center', margin: '3.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Pas l’un contre l’autre : les deux coexistent, chacun là où il excelle — STOMP pour le bidirectionnel structuré, SSE quand un simple flux descendant suffit.
      </motion.p>
    </div>
  )
}
