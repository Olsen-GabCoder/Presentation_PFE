import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Chaîne d'application du RBAC — de la définition au contrôle
const CHAIN = [
  { kicker: 'MODÈLE', title: '13 rôles · 54 permissions', detail: 'Les rôles regroupent des permissions granulaires — on vérifie toujours la permission, jamais le rôle en dur.' },
  { kicker: 'BACKEND', title: 'Contrôle à chaque endpoint', detail: 'Spring Security filtre les 366 endpoints : sans la permission requise → 403. C’est la barrière qui fait foi.' },
  { kicker: 'FRONTEND', title: 'Interface adaptée', detail: 'Routes gardées et boutons masqués selon les permissions — confort d’usage, jamais une sécurité en soi.' },
]

export default function Annexe_S2_RBAC() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {CHAIN.map((c, i) => (
          <div key={c.kicker} className="flex items-center flex-1" style={{ gap: '1.2cqw' }}>
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
              style={{
                padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
                background: i === 1 ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
                border: i === 1 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e',
              }}>
                {c.kicker}
              </span>
              <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {c.title}
              </span>
              <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {c.detail}
              </span>
            </motion.div>
            {i < CHAIN.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.18, ease }}
                style={{ fontSize: '2.6cqh', color: '#c8102e', fontWeight: 700, flexShrink: 0 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Principe clé : le frontend <b style={{ color: '#fff' }}>adapte</b>, le backend <b style={{ color: '#fff' }}>applique</b>.
          Contourner l’interface ne donne aucun droit — chaque requête est revalidée côté serveur.
        </p>
      </motion.div>
    </div>
  )
}
