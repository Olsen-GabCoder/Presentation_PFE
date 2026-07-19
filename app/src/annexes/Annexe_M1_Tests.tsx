import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : pyramide de tests — strates cibles en pointillé, existant en rouge plein
export default function Annexe_M1_Tests() {
  return (
    <div className="w-full h-full flex items-center" style={{ padding: '0 6cqw 4cqh' }}>

      {/* ── La pyramide (SVG) ── */}
      <div style={{ width: '46cqw', flexShrink: 0 }}>
        <svg viewBox="0 0 900 620" style={{ width: '100%' }}>
          {/* Strate base — Unitaires (partiellement en place) */}
          <motion.polygon
            points="450,20 640,300 260,300"
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="8 8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1, ease }}
          />
          <motion.polygon
            points="640,300 830,580 70,580 260,300"
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="8 8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7, ease }}
          />
          {/* Existant : coin rouge plein dans la base (6 tests ciblés) */}
          <motion.polygon
            points="160,580 260,435 360,580"
            fill="rgba(200,16,46,0.55)" stroke="#c8102e" strokeWidth="3"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ transformOrigin: '260px 580px' }}
          />
          {/* Labels des strates */}
          <motion.text x="450" y="200" textAnchor="middle" fill="rgba(255,255,255,0.8)"
            fontFamily="'JetBrains Mono', monospace" fontSize="26" fontWeight="700" letterSpacing="3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            E2E
          </motion.text>
          <motion.text x="450" y="460" textAnchor="middle" fill="rgba(255,255,255,0.8)"
            fontFamily="'JetBrains Mono', monospace" fontSize="26" fontWeight="700" letterSpacing="3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            UNITAIRE + INTÉGRATION
          </motion.text>
        </svg>
      </div>

      {/* ── Légende & lecture ── */}
      <div className="flex-1 flex flex-col" style={{ gap: '3cqh', paddingLeft: '4cqw' }}>

        {/* Aujourd'hui */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4, ease }}
          style={{ gap: '0.8cqh' }}
        >
          <div className="flex items-center" style={{ gap: '1cqw' }}>
            <div style={{ width: '2.2cqh', height: '2.2cqh', background: 'rgba(200,16,46,0.55)', border: '2px solid #c8102e', borderRadius: 3, flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#c8102e' }}>
              EN PLACE AUJOURD’HUI
            </span>
          </div>
          <span style={{ fontSize: '2cqh', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            6 tests JUnit/MockK ciblés (389 lignes)
          </span>
          <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>
            + Postman systématique par module · recette manuelle à chaque vague
          </span>
        </motion.div>

        {/* Cible */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.9, ease }}
          style={{ gap: '0.8cqh' }}
        >
          <div className="flex items-center" style={{ gap: '1cqw' }}>
            <div style={{ width: '2.2cqh', height: '2.2cqh', border: '2px dashed rgba(255,255,255,0.5)', borderRadius: 3, flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>
              CIBLE POST-STAGE
            </span>
          </div>
          <span style={{ fontSize: '2cqh', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            JUnit 5 + MockK · Vitest + RTL · Playwright
          </span>
          <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>
            automatisés en CI/CD (GitHub Actions)
          </span>
        </motion.div>

        {/* L'arbitrage */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.5, ease }}
          className="flex items-center"
          style={{
            gap: '1.2cqw', padding: '1.4cqh 1.5cqw', borderRadius: '0.8cqh',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
          <p style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
            Arbitrage documenté (§2.5.5) : 1 dev · 6 mois · 19 domaines —
            priorité à la couverture métier, dette <b style={{ color: '#fff' }}>identifiée et planifiée</b>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
