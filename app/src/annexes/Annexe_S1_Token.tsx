import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : un token volé traverse 4 barrières — la flèche d'attaque s'affaiblit à chaque mur
const BARRIERS = [
  { num: '01', title: 'Expiration 15 min', detail: 'access token à courte durée' },
  { num: '02', title: 'Rotation + famille', detail: 'réutilisation → révocation totale' },
  { num: '03', title: '2FA TOTP', detail: 'second facteur requis' },
  { num: '04', title: 'Rate limiting', detail: '5 essais / 15 min / IP' },
]

// Épaisseur décroissante de la flèche d'attaque après chaque barrière
const ARROW = [{ h: 10, o: 1 }, { h: 7, o: 0.75 }, { h: 4.5, o: 0.5 }, { h: 2.5, o: 0.3 }, { h: 1.5, o: 0.18 }]

export default function Annexe_S1_Token() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      {/* ── Le flux d'attaque ── */}
      <div className="flex items-center" style={{ height: '34cqh' }}>

        {/* Origine : token volé */}
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            width: '11cqw', height: '11cqw', borderRadius: '50%',
            border: '2px solid #c8102e', background: 'rgba(200,16,46,0.15)', gap: '0.4cqh',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.15em', color: '#ff8896' }}>TOKEN</span>
          <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff' }}>VOLÉ</span>
        </motion.div>

        {/* Barrières traversées par la flèche qui s'affaiblit */}
        {BARRIERS.map((b, i) => (
          <div key={b.num} className="flex items-center flex-1" style={{ minWidth: 0 }}>
            {/* Segment de flèche — s'amincit */}
            <motion.div
              className="flex-1"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.35, ease }}
              style={{
                height: ARROW[i].h, background: '#c8102e', opacity: ARROW[i].o,
                transformOrigin: 'left', borderRadius: 2,
              }}
            />
            {/* Le mur */}
            <motion.div
              className="flex flex-col items-center flex-shrink-0"
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.35, ease }}
              style={{ width: '2.2cqw' }}
            >
              <div style={{
                width: '1.4cqw', height: '26cqh', borderRadius: '0.7cqw',
                background: 'linear-gradient(180deg, #c8102e 0%, #c8102e 12%, rgba(255,255,255,0.14) 12%, rgba(255,255,255,0.14) 100%)',
                border: '1px solid rgba(255,255,255,0.25)',
              }} />
            </motion.div>
          </div>
        ))}

        {/* Dernier filet de flèche + impact résiduel */}
        <motion.div
          className="flex-1"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.5 + 4 * 0.35, ease }}
          style={{ height: ARROW[4].h, background: '#c8102e', opacity: ARROW[4].o, transformOrigin: 'left', borderRadius: 2 }}
        />
        <motion.div
          className="flex flex-col items-center justify-center flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.2, ease }}
          style={{
            width: '10cqw', height: '10cqw', borderRadius: '50%',
            border: '1px dashed rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.03)', gap: '0.4cqh',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>IMPACT</span>
          <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff' }}>≤ 15 min</span>
          <span style={{ fontSize: '1.2cqh', fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>détecté · révoqué</span>
        </motion.div>
      </div>

      {/* ── Légendes sous les murs ── */}
      <div className="flex" style={{ marginTop: '2.5cqh' }}>
        <div style={{ width: '11cqw' }} className="flex-shrink-0" />
        {BARRIERS.map((b, i) => (
          <motion.div
            key={b.num}
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.35, ease }}
            style={{ gap: '0.3cqh', textAlign: 'center' }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700, color: '#c8102e' }}>
              {b.num}
            </span>
            <span style={{ fontSize: '1.9cqh', fontWeight: 800, color: '#fff' }}>{b.title}</span>
            <span style={{ fontSize: '1.4cqh', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{b.detail}</span>
          </motion.div>
        ))}
        <div style={{ width: '10cqw' }} className="flex-shrink-0" />
      </div>

      {/* Note bcrypt discrète */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.6, ease }}
        style={{
          textAlign: 'center', margin: '3.5cqh 0 0', fontSize: '1.5cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        En amont : mots de passe bcrypt (coût 12) — jamais stockés en clair.
      </motion.p>
    </div>
  )
}
