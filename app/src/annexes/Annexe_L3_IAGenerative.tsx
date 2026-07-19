import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Fidèle à l'annexe A du rapport (p. 126) : déclaration d'usage de l'IA générative
const BLOCKS = [
  {
    kicker: '100 % PERSONNEL',
    title: 'Le cœur du travail',
    lines: ['Architecture de la plateforme', 'Choix de conception et décisions techniques', 'Raisonnement, analyse, conclusions'],
    highlight: true,
  },
  {
    kicker: 'IA EN APPUI · ENCADRÉ',
    title: 'Tâches d’assistance ponctuelles',
    lines: ['Aide à la mise en forme', 'Suggestions de formulations', 'Gabarits techniques (diagrammes, mise en page)', 'Relecture'],
    highlight: false,
  },
  {
    kicker: 'GARDE-FOUS',
    title: 'Contrôle constant de l’auteur',
    lines: ['Chaque élément vérifié, corrigé, validé', 'Sources vérifiées individuellement et citées', 'Déclaration transparente : annexe A du rapport'],
    highlight: false,
  },
]

export default function Annexe_L3_IAGenerative() {
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
              background: b.highlight ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: b.highlight ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.22em', color: '#c8102e',
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

      {/* Verdict */}
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
          Oui — de manière <b style={{ color: '#fff' }}>ponctuelle, encadrée et déclarée</b> (annexe A, p. 126).
          Aucune partie du raisonnement n’a été déléguée : l’auteur assume
          l’<b style={{ color: '#fff' }}>entière responsabilité scientifique</b> du travail.
        </p>
      </motion.div>
    </div>
  )
}
