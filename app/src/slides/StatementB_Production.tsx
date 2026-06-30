import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

export default function StatementB_Production() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#101012' }}>

      {/* Radial glow — warm, like something going live */}
      <motion.div
        className="absolute"
        style={{
          left: '50%', top: '44%',
          width: '60cqw', height: '50cqh',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(200,16,46,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Pulsing dot — "live" indicator */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ left: '50%', top: '30%', transform: 'translate(-50%, -50%)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          style={{
            width: '1.2cqh', height: '1.2cqh', borderRadius: '50%',
            background: '#c8102e',
          }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(200,16,46,0.6)',
              '0 0 0 12px rgba(200,16,46,0)',
              '0 0 0 0 rgba(200,16,46,0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          style={{
            marginLeft: '1cqw',
            fontSize: '1.6cqh', fontWeight: 600, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#c8102e',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Live
        </motion.span>
      </motion.div>

      {/* Main text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <div className="overflow-hidden">
          <motion.h1
            style={{
              fontSize: '14cqh',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#fff',
              margin: 0,
              textAlign: 'center',
            }}
            initial={{ y: '110%', filter: 'blur(10px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            En production
          </motion.h1>
        </div>

        <div className="overflow-hidden" style={{ marginTop: '1cqh' }}>
          <motion.p
            style={{
              fontSize: '6cqh',
              fontWeight: 800,
              lineHeight: 1,
              margin: 0,
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ y: '120%', filter: 'blur(8px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            depuis mars 2026
          </motion.p>
        </div>

        {/* Stats line — very understated */}
        <motion.div
          className="flex items-center"
          style={{ marginTop: '5cqh', gap: '3cqw' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { num: 19, prefix: '', suffix: '', lab: 'domaines' },
            { num: 191, prefix: '', suffix: '', lab: 'endpoints' },
            { num: 85, prefix: '', suffix: '+', lab: 'pages' },
            { num: 85, prefix: '~', suffix: 'K', lab: 'lignes' },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline" style={{ gap: '0.5cqw' }}>
              <CountUp
                value={s.num}
                prefix={s.prefix}
                suffix={s.suffix}
                delay={1.5 + i * 0.12}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '2.2cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1,
                }}
              />
              <span style={{ fontSize: '1.8cqh', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                {s.lab}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.15cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
