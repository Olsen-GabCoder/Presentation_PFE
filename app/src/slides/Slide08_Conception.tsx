import { motion } from 'framer-motion'

const domains = [
  { name: 'Projets',       count: 7  },
  { name: 'DQE',           count: 7  },
  { name: 'Logistique',    count: 6  },
  { name: 'DMA',           count: 3  },
  { name: 'QSHE',          count: 15 },
  { name: 'Qualité',       count: 10 },
  { name: 'Documents',     count: 2  },
  { name: 'Collaboration', count: 12 },
  { name: 'Salle MIKA',    count: 3  },
  { name: 'Pilotage & IA', count: 2  },
  { name: 'Sécurité',      count: 8  },
  { name: 'Référentiels',  count: 6  },
]

// All coordinates in a single SVG viewBox (1600x900 = 16:9)
const CX = 800, CY = 470
const RX = 560, RY = 320

function nodePos(i: number) {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2
  return { x: CX + Math.cos(a) * RX, y: CY + Math.sin(a) * RY }
}

export default function Slide08_Conception() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Title — top center */}
      <div className="absolute flex flex-col items-center" style={{ left: 0, right: 0, top: '2.5cqh' }}>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.025em', margin: 0,
            }}
          >
            Le modèle de{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>données</span>
          </motion.h1>
        </div>
      </div>

      {/* Pipeline — bottom center */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ left: 0, right: 0, bottom: '2.5cqh', gap: '0.8cqw' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
      >
        {['Entity', '→', 'Repository', '→', 'Service', '→', 'Controller'].map((s, i) => (
          <span key={i} style={{
            fontSize: '3.6cqh',
            fontFamily: s === '→' ? undefined : "'JetBrains Mono', monospace",
            fontWeight: s === '→' ? 400 : 600,
            color: s === '→' ? 'rgba(255,255,255,0.12)' : 'rgba(200,16,46,0.6)',
          }}>
            {s}
          </span>
        ))}
        <span style={{ fontSize: '1.9cqh', color: 'rgba(255,255,255,0.45)', marginLeft: '1cqw', fontStyle: 'italic' }}>
          Kotlin · null-safety · Spring
        </span>
      </motion.div>

      {/* ═══ SINGLE SVG — everything aligned in one coordinate system ═══ */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Radial glow */}
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#c8102e" stopOpacity="0.07" />
            <stop offset="70%" stopColor="#c8102e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r="350" fill="url(#glow)" />

        {/* Orbit ring */}
        <motion.ellipse
          cx={CX} cy={CY} rx={RX} ry={RY}
          fill="none" stroke="rgba(200,16,46,0.06)" strokeWidth="1.5"
          strokeDasharray="6 10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />

        {/* Connection lines — all converge to CX,CY */}
        {domains.map((_, i) => {
          const p = nodePos(i)
          return (
            <motion.line
              key={`line-${i}`}
              x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="#c8102e" strokeWidth="1" opacity="0.14"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.04, duration: 0.6, ease: 'easeOut' }}
            />
          )
        })}

        {/* Center hub circle — exactly at intersection */}
        <motion.circle
          cx={CX} cy={CY} r="75"
          fill="rgba(200,16,46,0.1)"
          stroke="rgba(200,16,46,0.3)" strokeWidth="2"
          initial={{ opacity: 0, r: 40 }}
          animate={{ opacity: 1, r: 75 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Center text */}
        <motion.text
          x={CX} y={CY - 8}
          textAnchor="middle" dominantBaseline="central"
          fill="#c8102e" fontWeight="800" fontSize="56"
          fontFamily="'JetBrains Mono', monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          81
        </motion.text>
        <motion.text
          x={CX} y={CY + 32}
          textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.5)" fontWeight="600" fontSize="16"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          entités JPA · 12 domaines
        </motion.text>

        {/* Domain nodes */}
        {domains.map((d, i) => {
          const p = nodePos(i)
          return (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.5 }}
            >
              {/* Dot */}
              <circle cx={p.x} cy={p.y} r="6" fill="#c8102e" />
              <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="rgba(200,16,46,0.2)" strokeWidth="1" />

              {/* Name */}
              <text
                x={p.x} y={p.y - 22}
                textAnchor="middle" dominantBaseline="central"
                fill="#fff" fontWeight="700" fontSize="22"
              >
                {d.name}
              </text>

              {/* Count with label */}
              <text
                x={p.x} y={p.y + 24}
                textAnchor="middle" dominantBaseline="central"
                fill="#c8102e" fontWeight="700" fontSize="17"
                fontFamily="'JetBrains Mono', monospace"
              >
                {d.count} entité{d.count > 1 ? 's' : ''}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
