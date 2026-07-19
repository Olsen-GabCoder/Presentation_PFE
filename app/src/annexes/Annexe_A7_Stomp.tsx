import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const COLS = [
  {
    kicker: 'WEBSOCKET STOMP',
    sub: 'Flux bidirectionnels',
    highlight: true,
    items: [
      { t: 'Présence en réunion', d: 'Qui est là, qui parle — l’état circule dans les deux sens.' },
      { t: 'Signalisation visio', d: 'Négociation WebRTC : offres, réponses, candidats.' },
      { t: 'Notifications temps réel', d: 'Abonnements par canal (topics STOMP) côté client.' },
    ],
  },
  {
    kicker: 'SSE',
    sub: 'Flux unidirectionnel',
    highlight: false,
    items: [
      { t: 'Streaming IA', d: 'Réponses de l’assistant diffusées mot à mot, serveur → client uniquement.' },
      { t: 'Simplicité HTTP', d: 'Pas de protocole à maintenir quand un simple flux descendant suffit.' },
    ],
  },
]

export default function Annexe_A7_Stomp() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '2cqw' }}>
        {COLS.map((c, i) => (
          <motion.div
            key={c.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.4cqh',
              background: c.highlight ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: c.highlight ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div className="flex items-baseline" style={{ gap: '1cqw' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em',
                color: c.highlight ? '#c8102e' : 'rgba(255,255,255,0.4)',
              }}>
                {c.kicker}
              </span>
              <span style={{ fontSize: '1.5cqh', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{c.sub}</span>
            </div>
            {c.items.map((it) => (
              <div key={it.t} className="flex flex-col" style={{ gap: '0.3cqh' }}>
                <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff' }}>{it.t}</span>
                <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                  {it.d}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Ce n’est pas l’un <b style={{ color: '#fff' }}>contre</b> l’autre : la plateforme utilise les deux,
          <b style={{ color: '#fff' }}> chacun là où il excelle</b>. STOMP quand il faut du bidirectionnel structuré,
          SSE quand un flux descendant simple suffit.
        </p>
      </motion.div>
    </div>
  )
}
