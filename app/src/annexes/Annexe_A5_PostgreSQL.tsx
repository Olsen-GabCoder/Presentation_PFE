import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : graphe d'entités reliées (PostgreSQL, retenu) vs documents épars (MongoDB, écarté)
const NODES = [
  { id: 'Projets', x: 250, y: 60 },
  { id: 'Équipes', x: 90, y: 160 },
  { id: 'Matériel', x: 410, y: 160 },
  { id: 'DMA', x: 150, y: 285 },
  { id: 'Barèmes', x: 350, y: 285 },
]
const EDGES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4], [3, 4]]

const DOCS = [
  { x: 90, y: 60, r: -8 }, { x: 300, y: 45, r: 5 }, { x: 180, y: 160, r: 10 },
  { x: 390, y: 165, r: -6 }, { x: 100, y: 265, r: 7 }, { x: 290, y: 270, r: -10 },
]

export default function Annexe_A5_PostgreSQL() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      <div className="flex items-stretch" style={{ height: '56cqh', gap: '2.5cqw' }}>

        {/* ── PostgreSQL : le graphe relié ── */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            flex: 1, borderRadius: '1.2cqh', padding: '2cqh 1.5cqw',
            border: '1px solid rgba(200,16,46,0.55)', background: 'rgba(200,16,46,0.06)',
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}>
              RETENU · POSTGRESQL 17
            </span>
            <span style={{ fontSize: '1.5cqh', fontWeight: 700, color: '#fff' }}>81 entités reliées</span>
          </div>
          <svg viewBox="0 0 500 340" style={{ width: '100%', flex: 1 }}>
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
                stroke="#c8102e" strokeWidth="2.5" opacity="0.7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.1, ease }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                <circle cx={n.x} cy={n.y} r="42" fill="#141416" stroke="#fff" strokeWidth="2" />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">{n.id}</text>
              </motion.g>
            ))}
          </svg>
          <div className="flex justify-center" style={{ gap: '0.8cqw' }}>
            {['ACID', 'FK + CHECK en base', 'SQL · jointures'].map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.12, ease }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '1.35cqh', fontWeight: 700,
                  padding: '0.7cqh 0.9cqw', borderRadius: '0.6cqh', color: '#fff',
                  background: 'rgba(200,16,46,0.35)', border: '1px solid rgba(200,16,46,0.7)',
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── MongoDB : documents épars ── */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{
            flex: 1, borderRadius: '1.2cqh', padding: '2cqh 1.5cqw',
            border: '1px dashed rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)' }}>
              ÉCARTÉ · MONGODB
            </span>
            <span style={{ fontSize: '1.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>documents isolés</span>
          </div>
          <svg viewBox="0 0 500 340" style={{ width: '100%', flex: 1 }}>
            {/* Liens rompus */}
            {[[0, 2], [1, 3], [4, 5]].map(([a, b], i) => (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 + i * 0.15, ease }}>
                <line
                  x1={DOCS[a].x + 40} y1={DOCS[a].y + 25} x2={DOCS[b].x + 40} y2={DOCS[b].y + 25}
                  stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="6 8"
                />
                <text
                  x={(DOCS[a].x + DOCS[b].x) / 2 + 40} y={(DOCS[a].y + DOCS[b].y) / 2 + 20}
                  textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="20" fontWeight="700"
                >?</text>
              </motion.g>
            ))}
            {DOCS.map((d, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease }}
              >
                <rect
                  x={d.x} y={d.y} width="80" height="52" rx="6"
                  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                  transform={`rotate(${d.r} ${d.x + 40} ${d.y + 26})`}
                />
                <g transform={`rotate(${d.r} ${d.x + 40} ${d.y + 26})`}>
                  <line x1={d.x + 12} y1={d.y + 16} x2={d.x + 68} y2={d.y + 16} stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                  <line x1={d.x + 12} y1={d.y + 28} x2={d.x + 56} y2={d.y + 28} stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <line x1={d.x + 12} y1={d.y + 40} x2={d.x + 62} y2={d.y + 40} stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                </g>
              </motion.g>
            ))}
          </svg>
          <div className="flex justify-center" style={{ gap: '0.8cqw' }}>
            {['dénormalisation manuelle', 'validation dans le code'].map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.8 + i * 0.12, ease }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '1.35cqh', fontWeight: 500,
                  padding: '0.7cqh 0.9cqw', borderRadius: '0.6cqh', color: 'rgba(255,255,255,0.5)',
                  border: '1px dashed rgba(255,255,255,0.25)',
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.3, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Le métier BTP est profondément relationnel — l’intégrité garantie en base vaut plus que la flexibilité de schéma · gratuit, open source, supporté par Render.
      </motion.p>
    </div>
  )
}
