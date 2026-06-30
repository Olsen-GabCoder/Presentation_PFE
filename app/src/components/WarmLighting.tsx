import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface WarmLightingProps {
  lightsOn: boolean
  originX?: string
  originY?: string
  intensity?: number
  dustCount?: number
}

export default function WarmLighting({
  lightsOn,
  originX = '82%',
  originY = '5%',
  intensity = 1,
  dustCount = 16,
}: WarmLightingProps) {
  const dust = useMemo(() =>
    Array.from({ length: dustCount }, (_, i) => {
      const near = i < dustCount * 0.6
      const ox = parseFloat(originX)
      const left = near ? (ox - 18) + Math.random() * 28 : 15 + Math.random() * 75
      const size = 1.5 + Math.random() * 2.5
      const alpha = near ? 0.18 + Math.random() * 0.22 : 0.06 + Math.random() * 0.08
      const yStart = 80 + Math.random() * 450
      const xDrift = -8 + Math.random() * 16
      const dur = 7 + Math.random() * 8
      const delay = Math.random() * 6
      return { left, size, alpha, yStart, xDrift, dur, delay }
    }),
  [dustCount, originX])

  const i = intensity

  return (
    <>
      {/* 1. Source glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 4,
          right: '-5%', top: '-15%',
          width: '60%', height: '70%',
          background: `radial-gradient(ellipse at 70% 25%, rgba(255,195,65,${0.55 * i}) 0%, rgba(255,185,55,${0.25 * i}) 18%, rgba(255,180,50,${0.08 * i}) 40%, transparent 65%)`,
          filter: 'blur(20px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: lightsOn ? 1.6 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* 2. Mid-range falloff */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background: `radial-gradient(ellipse at ${originX} ${originY}, rgba(255,190,60,${0.40 * i}) 0%, rgba(255,185,55,${0.22 * i}) 15%, rgba(255,182,50,${0.12 * i}) 30%, rgba(255,180,48,${0.05 * i}) 50%, transparent 75%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: lightsOn ? 1.4 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* 3. Ambient fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background: `linear-gradient(145deg, rgba(255,195,75,${0.02 * i}) 0%, rgba(255,190,65,${0.06 * i}) 40%, rgba(255,185,55,${0.15 * i}) 70%, rgba(255,180,50,${0.25 * i}) 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: lightsOn ? 1.8 : 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* 4. Shadows — far side darker */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background: `radial-gradient(ellipse at ${originX} ${originY}, transparent 25%, rgba(0,0,0,${0.03 * i}) 50%, rgba(0,0,0,${0.08 * i}) 75%, rgba(0,0,0,${0.14 * i}) 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: lightsOn ? 2.2 : 0.4 }}
      />

      {/* 5. Floating dust */}
      {lightsOn && dust.map((d, idx) => (
        <motion.div
          key={`dust-${idx}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            zIndex: 4,
            left: `${d.left}%`,
            width: d.size, height: d.size,
            background: `rgba(255,210,120,${d.alpha})`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [d.yStart, -20],
            x: [0, d.xDrift],
            opacity: [0, d.alpha, d.alpha * 1.2, d.alpha * 0.4, 0],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  )
}
