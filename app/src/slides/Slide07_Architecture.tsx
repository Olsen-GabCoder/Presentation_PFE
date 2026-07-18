import { motion } from 'framer-motion'

const stack = [
  {
    layer: 'Frontend',
    logos: [
      { src: '/images/logo-react.svg', name: 'React 19' },
      { src: '/images/logo-typescript.svg', name: 'TypeScript' },
    ],
    stat: 'PWA · i18n FR/EN · 1 500+ clés',
    accent: '#61dafb',
  },
  {
    layer: 'Backend',
    logos: [
      { src: '/images/logo-spring.svg', name: 'Spring Boot 4' },
      { src: '/images/logo-kotlin.svg', name: 'Kotlin 2.2' },
    ],
    stat: '366 endpoints REST · API stateless',
    accent: '#7c3aed',
  },
  {
    layer: 'Base de données',
    logos: [
      { src: '/images/logo-postgresql.svg', name: 'PostgreSQL 17' },
    ],
    stat: '81 entités JPA · 12 sous-domaines',
    accent: '#336791',
  },
]

const externals = [
  { src: '/images/logo-jitsi.svg', name: 'Jitsi', desc: 'Visio · RS256', invert: true },
  { src: '/images/logo-brevo.svg', name: 'Brevo', desc: 'Emails', invert: true },
  { src: '/images/logo-anthropic.svg', name: 'Claude', desc: 'IA · SSE', invert: true },
]

// Animated data particle along a vertical path
function DataParticle({ delay, duration, x }: { delay: number; duration: number; x: number }) {
  return (
    <motion.circle
      cx={x} r={2.5}
      fill="#c8102e"
      initial={{ cy: 0, opacity: 0 }}
      animate={{
        cy: [0, 100],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

// Animated data particle along a horizontal path (for externals)
function HDataParticle({ delay, duration, y }: { delay: number; duration: number; y: number }) {
  return (
    <motion.circle
      cy={y} r={2}
      fill="#c8102e"
      initial={{ cx: 100, opacity: 0 }}
      animate={{
        cx: [100, 0],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function Slide07_Architecture() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/architecture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingLeft: '5cqw', paddingRight: '4cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5cqh' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Architecture{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>3-tiers</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: '2.0cqh', color: 'rgba(255,255,255,0.55)', margin: 0, marginTop: '1cqh' }}
          >
            Conçue pour la résilience à la connectivité · Déployée sur Render
          </motion.p>
        </div>

        {/* ── Stack: 3 large cards + animated connections + external services ── */}
        <div className="flex items-center" style={{ gap: '4cqw', marginTop: '3cqh' }}>

          {/* Main stack with connection lines */}
          <div className="relative flex flex-col items-center" style={{ gap: '1cqh' }}>
            {stack.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  className="flex items-center justify-center"
                  style={{
                    width: '55cqw',
                    height: '14cqh',
                    borderRadius: '1.2cqh',
                    background: 'var(--surface-card)',
                    border: `1.5px solid ${s.accent}30`,
                    gap: '3cqw',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Accent glow */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '0.4cqw',
                    background: s.accent,
                  }} />

                  {/* Layer label */}
                  <span style={{
                    position: 'absolute', top: '1cqh', left: '1.5cqw',
                    fontSize: '1.6cqh', fontWeight: 600, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: s.accent, opacity: 0.5,
                  }}>
                    {s.layer}
                  </span>

                  {/* Logos + names */}
                  <div className="flex items-center" style={{ gap: '2.5cqw' }}>
                    {s.logos.map((l, j) => (
                      <div key={j} className="flex items-center" style={{ gap: '0.8cqw' }}>
                        <img
                          src={l.src} alt={l.name}
                          style={{ width: '4.5cqh', height: '4.5cqh', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff' }}>
                          {l.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stat */}
                  <span style={{
                    position: 'absolute', bottom: '1cqh', right: '1.5cqw',
                    fontSize: '1.9cqh', color: 'var(--text-muted)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {s.stat}
                  </span>
                </motion.div>

                {/* Connection line with data particles */}
                {i < stack.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    style={{ position: 'relative', width: 40, height: '1cqh', margin: '-0.1cqh 0' }}
                  >
                    {/* Animated SVG connection */}
                    <svg
                      viewBox="0 0 40 100"
                      preserveAspectRatio="none"
                      style={{ width: '100%', height: '100%', overflow: 'visible' }}
                    >
                      {/* Line that draws itself */}
                      <motion.line
                        x1={20} y1={0} x2={20} y2={100}
                        stroke="rgba(200,16,46,0.25)"
                        strokeWidth={1.5}
                        strokeDasharray="4 3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {/* Data particles */}
                      <DataParticle delay={1.2 + i * 0.5} duration={1.8} x={20} />
                      <DataParticle delay={2.0 + i * 0.5} duration={1.8} x={20} />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Connection lines to externals */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ position: 'relative', width: '2cqw', alignSelf: 'stretch' }}
          >
            <svg
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              {[0, 1, 2].map(i => (
                <g key={i}>
                  <motion.line
                    x1={0} y1={50 + i * 100} x2={100} y2={50 + i * 100}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                  />
                  <HDataParticle delay={1.8 + i * 0.7} duration={2} y={50 + i * 100} />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* External services */}
          <div className="flex flex-col" style={{ gap: '1cqh' }}>
            {externals.map((e, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center justify-center"
                style={{
                  width: '12cqw',
                  borderRadius: '1cqh',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
              >
                <img
                  src={e.src} alt={e.name}
                  style={{
                    width: '3.5cqh', height: '3.5cqh', objectFit: 'contain',
                    filter: e.invert ? 'brightness(0) invert(1)' : undefined,
                    marginBottom: '0.6cqh',
                  }}
                />
                <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0 }}>{e.name}</p>
                <p style={{ fontSize: '1.7cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.2cqh' }}>{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
