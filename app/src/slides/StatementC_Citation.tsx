import { motion } from 'framer-motion'

const WORDS = "L'Afrique n'a pas vocation à être consommatrice de solutions numériques importées, mais bien créatrice de ses propres outils.".split(' ')

export default function StatementC_Citation() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#101012' }}>

      {/* Subtle glow */}
      <motion.div
        className="absolute"
        style={{
          left: '50%', top: '46%',
          width: '65cqw', height: '45cqh',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(200,16,46,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Giant quotation mark — decorative anchor */}
      <motion.span
        className="absolute pointer-events-none select-none"
        style={{
          left: '10cqw', top: '18cqh',
          fontSize: '28cqh',
          fontWeight: 900,
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
          color: 'rgba(200,16,46,0.08)',
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {'\u201C'}
      </motion.span>

      {/* Quote — word by word reveal */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ padding: '0 14cqw' }}>
        <p style={{
          fontSize: '4.2cqh',
          fontWeight: 500,
          lineHeight: 1.55,
          margin: 0,
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                color: word === 'créatrice' || word === 'propres' || word === 'outils.'
                  ? '#e8384f'
                  : 'rgba(255,255,255,0.80)',
                fontWeight: word === 'créatrice' || word === 'propres' || word === 'outils.'
                  ? 700
                  : 500,
              }}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Separator + attribution */}
      <div className="absolute flex flex-col items-center" style={{ left: 0, right: 0, bottom: '12cqh' }}>
        <motion.div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.35), transparent)',
            borderRadius: 1,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '12cqw', opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          style={{
            fontSize: '1.6cqh',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            margin: 0,
            marginTop: '1.5cqh',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Conviction du projet
        </motion.p>
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
