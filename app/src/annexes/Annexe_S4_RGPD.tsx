import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Fidèle au §2 du rapport : RGPD non applicable au Gabon, retenu comme référentiel de bonne pratique
const BLOCKS = [
  {
    kicker: 'DROIT',
    title: 'Non applicable directement',
    lines: ['Le RGPD est un règlement européen', 'Le Gabon n’y est pas soumis'],
    dim: true,
  },
  {
    kicker: 'CHOIX DU PROJET',
    title: 'Retenu comme référentiel',
    lines: ['Minimisation des données collectées', 'Droit d’accès aux données', 'Sécurisation du stockage'],
    dim: false,
  },
  {
    kicker: 'EN PRATIQUE',
    title: 'Traduit dans la plateforme',
    lines: ['Données sensibles (budgets, incidents, photos)', 'Accès strictement limité par les rôles (RBAC)', 'Journal d’audit des actions'],
    dim: true,
  },
]

export default function Annexe_S4_RGPD() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      <div className="flex items-stretch" style={{ gap: '1.5cqw' }}>
        {BLOCKS.map((b, i) => (
          <motion.div
            key={b.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
              background: b.dim ? 'rgba(255,255,255,0.04)' : 'rgba(200,16,46,0.10)',
              border: b.dim ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(200,16,46,0.55)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e',
            }}>
              {b.kicker}
            </span>
            <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {b.title}
            </span>
            <div className="flex flex-col" style={{ gap: '0.9cqh', marginTop: '0.5cqh' }}>
              {b.lines.map((l) => (
                <div key={l} className="flex items-baseline" style={{ gap: '0.8cqw' }}>
                  <span style={{ color: '#c8102e', fontSize: '1.6cqh', flexShrink: 0 }}>›</span>
                  <span style={{ fontSize: '1.8cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
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
          Appliquer les principes RGPD <b style={{ color: '#fff' }}>sans y être contraint</b>, c’est se conformer aux
          standards internationaux du sujet — et préparer la plateforme à d’éventuelles exigences futures,
          locales ou de clients internationaux.
        </p>
      </motion.div>
    </div>
  )
}
