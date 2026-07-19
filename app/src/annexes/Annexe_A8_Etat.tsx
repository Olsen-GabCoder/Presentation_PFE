import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : arbre de triage — une question par branche, un outil par nature d'état
const BRANCHES = [
  { q: 'Vient de l’API ?', tool: 'TanStack Query', detail: 'cache 5 min · invalidation · resync arrière-plan', highlight: true },
  { q: 'Partagé par toute l’app ?', tool: 'Redux Toolkit', detail: '23 slices persistées — session, permissions, préférences', highlight: false },
  { q: 'Local à un écran ?', tool: 'Zustand', detail: 'panneaux, sélections — léger, sans cérémonie', highlight: false },
]

export default function Annexe_A8_Etat() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center" style={{ padding: '0 6cqw 4cqh' }}>

      {/* ── Racine ── */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
        style={{
          padding: '1.8cqh 3cqw', borderRadius: '1cqh',
          border: '2px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)',
        }}
      >
        <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
          État de l’application — quelle nature ?
        </span>
      </motion.div>

      {/* ── Connecteurs ── */}
      <div className="relative" style={{ width: '76cqw', height: '9cqh' }}>
        {/* Tronc vertical */}
        <motion.div
          className="absolute"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3, delay: 0.6, ease }}
          style={{ left: '50%', top: 0, width: 2, height: '40%', background: 'rgba(255,255,255,0.35)', transformOrigin: 'top' }}
        />
        {/* Barre horizontale */}
        <motion.div
          className="absolute"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.8, ease }}
          style={{ left: '16.66%', right: '16.66%', top: '40%', height: 2, background: 'rgba(255,255,255,0.35)', transformOrigin: 'center' }}
        />
        {/* Trois descentes */}
        {['16.66%', '50%', '83.33%'].map((x, i) => (
          <motion.div
            key={x}
            className="absolute"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3, delay: 1.1 + i * 0.1, ease }}
            style={{ left: x, top: '40%', width: 2, height: '60%', background: 'rgba(255,255,255,0.35)', transformOrigin: 'top' }}
          />
        ))}
      </div>

      {/* ── Les trois branches ── */}
      <div className="flex items-stretch" style={{ width: '76cqw', gap: '2cqw' }}>
        {BRANCHES.map((b, i) => (
          <div key={b.tool} className="flex-1 flex flex-col items-center" style={{ gap: '1.4cqh' }}>
            {/* La question de triage */}
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 1.3 + i * 0.15, ease }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
                letterSpacing: '0.12em', color: '#c8102e', textTransform: 'uppercase',
              }}
            >
              {b.q}
            </motion.span>
            {/* L'outil */}
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.45 + i * 0.15, ease }}
              style={{
                padding: '2.2cqh 1.2cqw', borderRadius: '1cqh', gap: '0.7cqh', textAlign: 'center',
                border: b.highlight ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.18)',
                background: b.highlight ? 'rgba(200,16,46,0.08)' : 'rgba(255,255,255,0.04)',
              }}
            >
              <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff' }}>{b.tool}</span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>
                {b.detail}
              </span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.2, ease }}
        style={{
          textAlign: 'center', margin: '4cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Trois natures d’état, trois outils spécialisés — frontière nette et documentée. Tout forcer dans un seul store serait le vrai anti-pattern.
      </motion.p>
    </div>
  )
}
