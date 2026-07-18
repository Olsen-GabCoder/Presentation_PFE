import { motion } from 'framer-motion'

// Statement — bichromie stricte rouge / blanc sur fond sombre
export default function StatementA_Chiffre() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0e0e10' }}>

      {/* Background image — noir et blanc pour tenir la bichromie */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-ouvrier-macon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'grayscale(1)',
          opacity: 0.08,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Halo rouge discret derrière le chiffre */}
      <motion.div
        className="absolute"
        style={{
          left: '50%', top: '46%',
          width: '70cqw', height: '60cqh',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(200,16,46,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Composition centrale */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        {/* Kicker */}
        <motion.p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.7cqh', fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c8102e', margin: 0, marginBottom: '3cqh',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Le poids du BTP
        </motion.p>

        {/* Filet rouge supérieur */}
        <motion.div
          style={{ height: 2, background: '#c8102e', marginBottom: '3.5cqh' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '14cqw', opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Le chiffre — monumental, % en rouge */}
        <div className="overflow-hidden">
          <motion.p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '19cqh',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              margin: 0,
              color: '#ffffff',
            }}
            initial={{ y: '110%', filter: 'blur(12px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            5–12<span style={{ color: '#c8102e', fontSize: '13cqh', fontWeight: 800 }}> %</span>
          </motion.p>
        </div>

        {/* Sous-titre */}
        <div className="overflow-hidden" style={{ marginTop: '3cqh' }}>
          <motion.p
            style={{
              fontSize: '3cqh',
              fontWeight: 600,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '0.04em',
              textAlign: 'center',
            }}
            initial={{ y: '120%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            du PIB des économies d'Afrique francophone
          </motion.p>
        </div>

        {/* Filet rouge inférieur */}
        <motion.div
          style={{ height: 2, background: '#c8102e', marginTop: '3.5cqh', marginBottom: '3cqh' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '14cqw', opacity: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Chute */}
        <motion.p
          style={{
            fontSize: '2.3cqh',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            margin: 0,
            letterSpacing: '0.03em',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Et pourtant, c'est{' '}
          <span style={{ color: '#c8102e', fontWeight: 700 }}>le secteur le moins digitalisé au monde</span>.
        </motion.p>
      </div>

      {/* Accent rouge gauche */}
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
