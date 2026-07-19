import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Barrières successives limitant l'impact d'un token volé
const BARRIERS = [
  { kicker: 'BARRIÈRE 1', title: 'Access token : 15 min', detail: 'Fenêtre d’exploitation très courte — le token expire avant d’être rentable.' },
  { kicker: 'BARRIÈRE 2', title: 'Rotation + famille de tokens', detail: 'Chaque refresh est à usage unique. Réutilisation détectée → révocation de toute la famille.' },
  { kicker: 'BARRIÈRE 3', title: '2FA TOTP', detail: 'Un token seul ne suffit pas pour les opérations sensibles — second facteur requis.' },
  { kicker: 'BARRIÈRE 4', title: 'Rate limiting', detail: '5 tentatives / 15 min / IP — le rejeu massif est bloqué en amont.' },
]

export default function Annexe_S1_Token() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* Point de départ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
        className="flex items-center justify-center"
        style={{
          alignSelf: 'center', padding: '1.2cqh 3cqw', borderRadius: '0.8cqh', marginBottom: '2.5cqh',
          background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.55)',
        }}
      >
        <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff' }}>
          Token intercepté — et ensuite ?
        </span>
      </motion.div>

      {/* Quatre barrières successives */}
      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {BARRIERS.map((b, i) => (
          <div key={b.kicker} className="flex items-center flex-1" style={{ gap: '1.2cqw' }}>
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.18, ease }}
              style={{
                padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1cqh',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
              }}>
                {b.kicker}
              </span>
              <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {b.title}
              </span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                {b.detail}
              </span>
            </motion.div>
            {i < BARRIERS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.18, ease }}
                style={{ fontSize: '2.6cqh', color: '#c8102e', fontWeight: 700, flexShrink: 0 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Verdict */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Défense en profondeur : aucun mécanisme n’est suffisant seul, mais leur combinaison réduit
          l’impact d’un vol à une <b style={{ color: '#fff' }}>fenêtre de 15 minutes maximum</b>, détectée et révoquée.
          Mots de passe stockés en <b style={{ color: '#fff' }}>bcrypt (coût 12)</b> — jamais en clair.
        </p>
      </motion.div>
    </div>
  )
}
