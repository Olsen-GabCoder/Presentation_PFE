import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : 10 vagues — toutes franchissent la ligne « livré en production » ;
// sur 2 d'entre elles, la profondeur prévue reste en pointillé (arbitrage, pas dérapage)
const WAVES = [
  { h: 78 }, { h: 84 }, { h: 74 }, { h: 88 }, { h: 80 },
  { h: 72, planned: 92, tag: 'QSHE' }, { h: 82 }, { h: 70, planned: 90, tag: 'IA' }, { h: 86 }, { h: 76 },
]
const THRESHOLD = 56 // % — ligne « livré en production »

export default function Annexe_M5_Planification() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 6cqw 4cqh' }}>

      {/* ── Le graphique ── */}
      <div className="relative" style={{ height: '52cqh' }}>

        {/* Ligne seuil */}
        <motion.div
          className="absolute flex items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.8, ease }}
          style={{ left: 0, right: 0, bottom: `${THRESHOLD}%`, zIndex: 2 }}
        >
          <div className="flex-1" style={{ borderTop: '3px dashed #c8102e' }} />
        </motion.div>
        <motion.span
          className="absolute"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2, ease }}
          style={{
            right: 0, bottom: `calc(${THRESHOLD}% + 1cqh)`, zIndex: 2,
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700,
            letterSpacing: '0.18em', color: '#c8102e',
          }}
        >
          LIVRÉ EN PRODUCTION — 10/10
        </motion.span>

        {/* Barres */}
        <div className="absolute flex items-end" style={{ inset: 0, gap: '1.2cqw', zIndex: 1 }}>
          {WAVES.map((w, i) => (
            <div key={i} className="flex-1 relative flex flex-col justify-end" style={{ height: '100%' }}>
              {/* Profondeur prévue non atteinte (pointillé) */}
              {w.planned && (
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.3, ease }}
                  style={{
                    left: 0, right: 0, bottom: `${w.h}%`, height: `${w.planned - w.h}%`,
                    border: '2px dashed rgba(255,255,255,0.35)', borderBottom: 'none',
                    borderRadius: '0.6cqh 0.6cqh 0 0',
                  }}
                />
              )}
              {/* Barre livrée */}
              <motion.div
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease }}
                style={{
                  height: `${w.h}%`, transformOrigin: 'bottom',
                  background: w.planned ? 'rgba(200,16,46,0.45)' : 'rgba(200,16,46,0.75)',
                  border: '1px solid #c8102e', borderRadius: '0.6cqh 0.6cqh 0 0',
                }}
              />
              {/* Tag arbitrage */}
              {w.tag && (
                <motion.span
                  className="absolute"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.5, ease }}
                  style={{
                    left: '50%', bottom: `${w.planned! + 2}%`, transform: 'translateX(-50%)',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh', fontWeight: 700,
                    color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap',
                  }}
                >
                  {w.tag}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Axe + numéros */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.3)' }} />
      <div className="flex" style={{ gap: '1.2cqw', marginTop: '0.8cqh' }}>
        {WAVES.map((_, i) => (
          <span key={i} className="flex-1" style={{
            textAlign: 'center', fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.4cqh', fontWeight: 700, color: 'rgba(255,255,255,0.45)',
          }}>
            V{i + 1}
          </span>
        ))}
      </div>

      {/* Légende */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.7, ease }}
        style={{ gap: '2.5cqw', marginTop: '2.5cqh' }}
      >
        <div className="flex items-center" style={{ gap: '0.7cqw' }}>
          <div style={{ width: '2cqh', height: '2cqh', background: 'rgba(200,16,46,0.75)', border: '1px solid #c8102e', borderRadius: 3 }} />
          <span style={{ fontSize: '1.6cqh', fontWeight: 600, color: '#fff' }}>périmètre livré — a tenu</span>
        </div>
        <div className="flex items-center" style={{ gap: '0.7cqw' }}>
          <div style={{ width: '2cqh', height: '2cqh', border: '2px dashed rgba(255,255,255,0.4)', borderRadius: 3 }} />
          <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>profondeur reportée — QSHE, extraction IA, tests (§2.5.5)</span>
        </div>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '2cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Les vagues bornent le risque : un retard n’affecte pas les précédentes. On a sacrifié de la profondeur locale — jamais la livraison en production.
      </motion.p>
    </div>
  )
}
