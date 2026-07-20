import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// ── Matrice façon annexe : 5 critères en lignes × 5 solutions en colonnes ──
const CRITERES = [
  { t: 'Français', d: 'langue de travail des équipes' },
  { t: 'Hors ligne', d: 'tolérance à la connectivité variable' },
  { t: 'Coût PME', d: 'licences et hébergement soutenables' },
  { t: 'Cycle complet', d: 'du projet au barème matériel' },
  { t: 'Adapté Afrique', d: 'FCFA · DMA · barèmes locaux' },
]

// scores[i] = critère i couvert (ordre : Français, Hors ligne, Coût PME, Cycle, Afrique)
const SOLUTIONS = [
  { name: 'Procore', origin: 'USA', scores: [false, false, false, true, false] },
  { name: 'Aconex', origin: 'Australie', scores: [false, false, false, true, false] },
  { name: 'Buildertrend', origin: 'USA', scores: [false, false, true, true, false] },
  { name: 'BIM', origin: 'Revit · ArchiCAD', scores: [false, false, false, false, false] },
  { name: 'MIKA', origin: 'sur mesure', scores: [true, true, true, true, true], mika: true },
]

// Largeurs : critères flex 5, chaque solution flex 2 → colonne MIKA = 2/15 du total
const FLEX_TOTAL = 5 + SOLUTIONS.length * 2

export default function Slide05_EtatArt() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-panneau-chantier.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 20%',
          opacity: 0.07,
          filter: 'grayscale(1)',
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 2.5, ease }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '6cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        <div className="overflow-hidden" style={{ flexShrink: 0 }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            style={{
              fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.025em', margin: 0,
            }}
          >
            Aucune solution existante ne réunit les{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>5 critères essentiels</span>
          </motion.h1>
        </div>

        {/* ── Matrice — centrée verticalement, respiration façon annexe ── */}
        <div className="flex-1 flex flex-col justify-center" style={{ minHeight: 0, padding: '2cqh 0' }}>

          {/* En-têtes : noms des solutions */}
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            style={{ marginBottom: '1.6cqh' }}
          >
            <div style={{ flex: 5 }} />
            {SOLUTIONS.map((s) => (
              <div key={s.name} style={{ flex: 2, textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', margin: 0,
                  color: s.mika ? '#c8102e' : 'rgba(255,255,255,0.5)',
                }}>
                  {s.name}
                </p>
                <p style={{
                  fontSize: '1.25cqh', fontWeight: 500, margin: '0.3cqh 0 0',
                  color: s.mika ? 'rgba(255,136,150,0.75)' : 'rgba(255,255,255,0.3)',
                }}>
                  {s.origin}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Lignes critères */}
          <div className="relative flex flex-col">
            {/* Colonne MIKA surlignée — apparaît en dernier */}
            <motion.div
              className="absolute"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.4, ease }}
              style={{
                top: '-1cqh', bottom: '-1cqh', right: 0,
                width: `${(2 / FLEX_TOTAL) * 100}%`,
                border: '2px solid #c8102e', borderRadius: '1cqh',
                background: 'rgba(200,16,46,0.07)',
                pointerEvents: 'none',
              }}
            />

            {CRITERES.map((c, i) => (
              <motion.div
                key={c.t}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.15, ease }}
                style={{
                  padding: '2.1cqh 0',
                  borderBottom: i < CRITERES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                <div className="flex items-baseline" style={{ flex: 5, gap: '1cqw', paddingRight: '1.5cqw', minWidth: 0 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.6cqh', fontWeight: 700, color: '#c8102e', flexShrink: 0,
                  }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: '2.1cqh', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{c.t}</span>
                  <span style={{ fontSize: '1.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>{c.d}</span>
                </div>

                {SOLUTIONS.map((s, j) => (
                  <motion.span
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: s.mika ? 2.6 + i * 0.14 : 1.6 + j * 0.25 + i * 0.08,
                      ease,
                    }}
                    style={{
                      flex: 2, textAlign: 'center',
                      fontSize: '2.5cqh', fontWeight: 800,
                      color: s.mika ? '#c8102e' : s.scores[i] ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.22)',
                    }}
                  >
                    {s.scores[i] ? '✓' : '✕'}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Ligne des scores */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.6, ease }}
            style={{ marginTop: '2cqh' }}
          >
            <div style={{ flex: 5 }} />
            {SOLUTIONS.map((s) => (
              <span key={s.name} style={{
                flex: 2, textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: s.mika ? '2.3cqh' : '1.7cqh',
                fontWeight: s.mika ? 800 : 700,
                color: s.mika ? '#c8102e' : 'rgba(255,255,255,0.35)',
              }}>
                {s.scores.filter(Boolean).length}/5
              </span>
            ))}
          </motion.div>
        </div>

        {/* Synthèse */}
        <motion.p
          style={{
            fontSize: '1.8cqh', color: 'rgba(255,255,255,0.45)', margin: 0,
            fontStyle: 'italic', textAlign: 'center', flexShrink: 0,
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.0 }}
        >
          Une seule colonne coche les 5 cases — ce constat est le cahier des charges qui a justifié de construire plutôt qu'acheter.
        </motion.p>
      </div>
    </div>
  )
}
