import { motion } from 'framer-motion'

// Word-by-word stagger with blur reveal
function AnimatedLine({ children, delay, style }: { children: string; delay: number; style?: React.CSSProperties }) {
  const words = children.split(' ')
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap' as const, ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Floating particles — infinite
function FloatingParticles() {
  const particles = [
    { x: '82cqw', size: 4, dur: 7, delay: 0 },
    { x: '76cqw', size: 3, dur: 9, delay: 1.5 },
    { x: '88cqw', size: 5, dur: 8, delay: 0.8 },
    { x: '70cqw', size: 3, dur: 10, delay: 2.5 },
    { x: '92cqw', size: 4, dur: 7.5, delay: 3 },
    { x: '85cqw', size: 2, dur: 11, delay: 4 },
    { x: '73cqw', size: 3, dur: 8.5, delay: 1 },
    { x: '90cqw', size: 2, dur: 9.5, delay: 2 },
  ]
  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            width: p.size,
            height: p.size,
            background: `rgba(200,16,46,${0.10 + (i % 3) * 0.05})`,
          }}
          animate={{
            y: [800, -20],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  )
}

export default function Slide01_Cover() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0c0c0e' }}>

      {/* ===== BACKGROUND — Giant 2026 breathing ===== */}
      <motion.div
        className="absolute"
        style={{
          right: '-3cqw',
          bottom: '-6cqh',
          fontSize: '42cqh',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
          color: 'rgba(200,16,46,0.05)',
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          animate={{ opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'inherit' }}
        >
          2026
        </motion.span>
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* ===== LEFT RED BAND with gradient ===== */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '3.8cqw',
          background: 'linear-gradient(180deg, #d4213f 0%, #c8102e 40%, #a00d24 100%)',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Shine sweep on band */}
      <motion.div
        className="absolute left-0 top-0"
        style={{
          width: '3.8cqw',
          height: '25cqh',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
        initial={{ y: '-100%' }}
        animate={{ y: '500%' }}
        transition={{ duration: 2.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ===== DIVIDERS ===== */}
      <motion.div className="absolute"
        style={{ top: '16cqh', left: '7.5cqw', height: 1, background: 'rgba(255,255,255,0.08)' }}
        initial={{ width: 0 }} animate={{ width: '88cqw' }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div className="absolute"
        style={{ bottom: '19cqh', left: '7.5cqw', height: 1, background: 'rgba(255,255,255,0.08)' }}
        initial={{ width: 0 }} animate={{ width: '88cqw' }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />

      {/* ===== BOTTOM RED LINE ===== */}
      <motion.div className="absolute bottom-0 left-0 right-0"
        style={{ height: '0.5cqh', background: '#c8102e', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />

      {/* ===== CONTENT ===== */}
      <div className="absolute inset-0" style={{
        paddingLeft: '7.5cqw',
        paddingRight: '4.5cqw',
        paddingTop: '3.5cqh',
        paddingBottom: '3cqh',
        display: 'flex',
        flexDirection: 'column' as const,
      }}>

        {/* LOGOS */}
        <div className="flex items-center justify-between" style={{ marginBottom: '1.5cqh' }}>
          <motion.img src="/esprit-logo.png" alt="ESPRIT"
            style={{ height: '30cqh', objectFit: 'contain', margin: '-10cqh 0' }}
            initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          <motion.img src="/mika-logo.png" alt="MIKA Services"
            style={{ height: '10cqh', objectFit: 'contain' }}
            initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} />
        </div>

        {/* CENTER */}
        <div className="flex-1 flex flex-col justify-center items-center" style={{ textAlign: 'center' }}>

          {/* PFE label */}
          <motion.div className="flex items-center justify-center"
            style={{ gap: '1cqw', marginBottom: '3cqh' }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}>
            <motion.div
              style={{
                width: '1cqh', height: '1cqh', borderRadius: '50%', background: '#c8102e',
              }}
              animate={{
                boxShadow: ['0 0 0 0 rgba(200,16,46,0.5)', '0 0 0 8px rgba(200,16,46,0)', '0 0 0 0 rgba(200,16,46,0)'],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <p style={{
              fontSize: '1.7cqh', fontWeight: 700, letterSpacing: '0.3em',
              textTransform: 'uppercase' as const, color: '#c8102e', margin: 0,
            }}>
              Projet de Fin d'Études · 2025 / 2026
            </p>
          </motion.div>

          {/* TITLE */}
          <div style={{
            fontSize: '5.8cqh', fontWeight: 800, lineHeight: 1.12,
            letterSpacing: '-0.025em', color: 'rgba(255,255,255,0.95)', marginBottom: '2.5cqh',
          }}>
            <div><AnimatedLine delay={0.6}>Conception et développement d'une</AnimatedLine></div>
            <div><AnimatedLine delay={0.95}>plateforme web de pilotage</AnimatedLine></div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <AnimatedLine delay={1.2}>de</AnimatedLine>
              <AnimatedLine delay={1.3} style={{ color: '#c8102e' }}>chantiers BTP</AnimatedLine>
            </div>
          </div>

          {/* SUBTITLE — mask reveal */}
          <div style={{ overflow: 'hidden', marginBottom: '3cqh' }}>
            <motion.p
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '2.6cqh', color: 'rgba(255,255,255,0.55)', fontWeight: 400, margin: 0 }}>
              Application au cas de{' '}
              <strong style={{ color: 'rgba(255,255,255,0.90)', fontWeight: 700 }}>MIKA Services</strong>
              {' '}— Libreville, Gabon
            </motion.p>
          </div>

          {/* RED SEPARATOR */}
          <motion.div
            style={{ height: '0.5cqh', background: '#c8102e', borderRadius: 4 }}
            initial={{ width: 0 }} animate={{ width: '7cqw' }}
            transition={{ duration: 0.8, delay: 1.9, ease: [0.22, 1, 0.36, 1] }} />

          {/* SPECIALTY */}
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: '120%' }} animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '1.4cqh', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', marginTop: '2cqh',
              }}>
              Diplôme National d'Ingénieur · Génie Informatique · Dev Web & Mobile
            </motion.p>
          </div>
        </div>

        {/* BOTTOM — PEOPLE */}
        <div className="flex items-start justify-center" style={{ gap: '3.5cqw' }}>
          {[
            { label: 'Présenté par', name: 'KAMPALA NTSA Olsen Fauldy', detail: '5e année — ESPRIM, Monastir', red: true },
            { label: 'Encadrante universitaire', name: 'Mme Kawther Rabhi', detail: 'ESPRIM', red: false },
            { label: 'Encadrant professionnel', name: 'M. Ramzi Jribi', detail: 'Coordinateur Projets — MIKA Services', red: false },
          ].map((p, i) => (
            <div key={i} className="flex items-start" style={{ gap: '3.5cqw' }}>
              {i > 0 && (
                <motion.div
                  style={{
                    width: 1, height: '6cqh',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
                    marginTop: '0.5cqh', transformOrigin: 'top',
                  }}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 2.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <p style={{
                  fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: p.red ? '#c8102e' : 'rgba(255,255,255,0.40)',
                  margin: 0, marginBottom: '0.8cqh',
                }}>{p.label}</p>
                <p style={{
                  fontSize: '2.2cqh', fontWeight: 700, color: 'rgba(255,255,255,0.95)',
                  margin: 0, marginBottom: '0.3cqh',
                }}>{p.name}</p>
                <p style={{ fontSize: '1.5cqh', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{p.detail}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
