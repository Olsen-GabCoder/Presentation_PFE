import { motion } from 'framer-motion'

export default function StatementA_Chiffre() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#101012' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-ouvrier-macon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.12,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Subtle radial glow — anchors the number */}
      <motion.div
        className="absolute"
        style={{
          left: '50%', top: '45%',
          width: '70cqw', height: '60cqh',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(200,16,46,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Thin horizontal rule — appears first, sets the stage */}
      <motion.div
        className="absolute"
        style={{
          left: '50%', top: '45%',
          transform: 'translate(-50%, -50%)',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.3), transparent)',
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '40cqw', opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* The number — monumental */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <div className="overflow-hidden">
          <motion.p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '18cqh',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0,
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ y: '110%', filter: 'blur(12px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            5 – 12 %
          </motion.p>
        </div>

        {/* Subtitle — mask reveal */}
        <div className="overflow-hidden" style={{ marginTop: '2.5cqh' }}>
          <motion.p
            style={{
              fontSize: '2.8cqh',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              letterSpacing: '0.06em',
              textAlign: 'center',
            }}
            initial={{ y: '120%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            du PIB des économies africaines francophones
          </motion.p>
        </div>

        {/* Contextual line */}
        <motion.p
          style={{
            fontSize: '2cqh',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            margin: 0,
            marginTop: '1.5cqh',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
        >
          et pourtant, le secteur le moins digitalisé au monde.
        </motion.p>
      </div>

      {/* Left red accent — thinner than content slides, marking it as different */}
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
