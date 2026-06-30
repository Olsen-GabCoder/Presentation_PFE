import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

const COLORS = ['#c8102e', '#d4213f', '#FFD700', '#FF6B6B', '#1a1a1a', '#4ECDC4', '#E8A838']
const FADE_AFTER = 18 // seconds before confetti starts fading
const FADE_DUR = 4   // seconds for the fade-out

export default function CelebrationEffect() {
  const [faded, setFaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setFaded(true), FADE_AFTER * 1000)
    return () => clearTimeout(id)
  }, [])

  const confetti = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        x: 5 + Math.random() * 90,
        delay: Math.random() * 2.5,
        duration: 2.8 + Math.random() * 2.5,
        size: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        drift: -25 + Math.random() * 50,
        shape: i % 3, // 0=rect, 1=circle, 2=diamond
      })),
    [],
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 45 }}>
      {/* Falling confetti — fades out after FADE_AFTER seconds */}
      <motion.div
        animate={{ opacity: faded ? 0 : 1 }}
        transition={{ duration: FADE_DUR, ease: 'easeOut' }}
      >
        {confetti.map((c, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: 0,
              width: c.size,
              height: c.shape === 0 ? c.size * 1.8 : c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === 1 ? '50%' : c.shape === 2 ? '2px' : '1px',
              transform: c.shape === 2 ? 'rotate(45deg)' : undefined,
            }}
            animate={{
              y: [-40, 1500],
              x: [0, c.drift],
              rotate: [c.rotation, c.rotation + 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      {/* Initial burst lines from center */}
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i * 360) / 14
        return (
          <motion.div
            key={`burst-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '45%',
              width: 2,
              height: 35 + (i % 3) * 12,
              backgroundColor: i % 2 === 0 ? '#c8102e' : '#FFD700',
              transformOrigin: 'center top',
              transform: `rotate(${angle}deg)`,
              borderRadius: 1,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1.3, 0], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )
      })}

      {/* Golden shimmer — fades with confetti */}
      <motion.div
        animate={{ opacity: faded ? 0 : 1 }}
        transition={{ duration: FADE_DUR, ease: 'easeOut' }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`shimmer-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              backgroundColor: '#FFD700',
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 40}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.15,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
