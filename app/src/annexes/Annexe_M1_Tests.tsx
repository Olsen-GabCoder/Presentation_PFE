import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const BLOCKS = [
  {
    kicker: 'CONTEXTE',
    title: 'Arbitrage assumé',
    lines: ['1 développeur · 6 mois', '19 domaines fonctionnels', 'Priorité : couverture métier'],
    dim: true,
  },
  {
    kicker: 'STRATÉGIE ACTUELLE',
    title: 'Qualité sans automatisation massive',
    lines: ['Recette manuelle à chaque vague', 'Postman systématique par module', '6 tests JUnit ciblés (389 lignes) : barème, sessions, analyse IA'],
    dim: false,
  },
  {
    kicker: 'CIBLE POST-STAGE',
    title: 'Pyramide de tests',
    lines: ['Backend : JUnit 5 + MockK', 'Frontend : Vitest + RTL', 'E2E : Playwright · CI/CD GitHub Actions'],
    dim: true,
  },
]

export default function Annexe_M1_Tests() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* Trois blocs — flux gauche → droite */}
      <div className="flex items-stretch" style={{ gap: '1.5cqw' }}>
        {BLOCKS.map((b, i) => (
          <div key={b.kicker} className="flex items-center flex-1" style={{ gap: '1.5cqw' }}>
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease }}
              style={{
                padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
                background: b.dim ? 'rgba(255,255,255,0.04)' : 'rgba(200,16,46,0.10)',
                border: b.dim ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(200,16,46,0.55)',
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em',
                color: b.dim ? 'rgba(255,255,255,0.4)' : '#c8102e',
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
            {i < BLOCKS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.2, ease }}
                style={{ fontSize: '3cqh', color: '#c8102e', fontWeight: 700, flexShrink: 0 }}
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
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Un choix documenté (<b style={{ color: '#fff' }}>§2.5.5 du rapport</b>) : dans le temps imparti, tester automatiquement moitié moins
          de domaines n’aurait pas servi le besoin métier. La dette est <b style={{ color: '#fff' }}>identifiée, chiffrée et planifiée</b>.
        </p>
      </motion.div>
    </div>
  )
}
