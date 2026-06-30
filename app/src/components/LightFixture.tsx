import { motion } from 'framer-motion'

type BulbMode = 'on' | 'off' | 'ember'

interface LightFixtureProps {
  mode?: BulbMode
  lightsOn?: boolean
  isPulling?: boolean
  pulse?: boolean
  showCord?: boolean
  left?: string
  zIndex?: number
}

export default function LightFixture({
  mode: modeProp,
  lightsOn: lightsOnProp,
  isPulling = false,
  pulse = false,
  showCord = true,
  left = '81%',
  zIndex = 47,
}: LightFixtureProps) {
  // Resolve mode: explicit mode wins, otherwise derive from lightsOn
  const mode: BulbMode = modeProp ?? (lightsOnProp ? 'on' : 'ember')
  const lightsOn = mode === 'on'
  const isEmber = mode === 'ember'
  return (
    <div
      className="absolute pointer-events-none"
      style={{ zIndex, left, top: 0, width: 0, height: '100%' }}
    >
      {/* Glow halo */}
      <motion.div
        style={{
          position: 'absolute', left: '50%', top: '-2cqh',
          width: lightsOn ? '35cqh' : '16cqh',
          height: lightsOn ? '35cqh' : '16cqh',
          transform: 'translate(-50%, -25%)',
          borderRadius: '50%',
          background: lightsOn
            ? 'radial-gradient(circle, rgba(255,200,70,0.7) 0%, rgba(255,185,50,0.30) 25%, rgba(255,175,40,0.10) 50%, transparent 72%)'
            : 'radial-gradient(circle, rgba(255,160,40,0.25) 0%, rgba(255,140,30,0.08) 40%, transparent 75%)',
          filter: lightsOn ? 'blur(10px)' : 'blur(6px)',
        }}
        animate={
          lightsOn
            ? { opacity: [0.8, 1, 0.8], scale: [0.97, 1.03, 0.97] }
            : isEmber
              ? { opacity: [0.5, 0.75, 0.5], scale: [0.95, 1.05, 0.95] }
              : { opacity: 0, scale: 0.15 }
        }
        transition={
          lightsOn
            ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            : isEmber
              ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.35 }
        }
      />

      {/* Ember pulse — rupture transition */}
      {pulse && (
        <motion.div
          style={{
            position: 'absolute', left: '50%', top: '-2cqh',
            width: '28cqh', height: '28cqh',
            transform: 'translate(-50%, -25%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,170,50,0.6) 0%, rgba(255,150,30,0.15) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.1, 0.8] }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}

      {/* Flicker on pull */}
      {isPulling && (
        <motion.div
          style={{
            position: 'absolute', left: '50%', top: '-2cqh',
            width: '40cqh', height: '40cqh',
            transform: 'translate(-50%, -25%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,230,120,0.8) 0%, rgba(255,200,80,0.2) 45%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{ opacity: [0, 1, 0, 0.8, 0, 0.5, 0] }}
          transition={{ duration: 0.55, times: [0, 0.08, 0.18, 0.28, 0.42, 0.55, 1] }}
        />
      )}

      {/* Edison bulb SVG */}
      <svg
        style={{
          position: 'absolute', left: '50%', top: '-1cqh',
          transform: 'translateX(-50%)',
          overflow: 'visible',
          width: '12cqh', height: '22cqh',
        }}
        viewBox="0 0 80 160"
      >
        <defs>
          <linearGradient id="bulbBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(90,85,70,0.85)" />
            <stop offset="100%" stopColor="rgba(60,55,45,0.75)" />
          </linearGradient>
          <radialGradient id="bulbGlass" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,220,100,0.50)" />
            <stop offset="55%" stopColor="rgba(255,200,80,0.18)" />
            <stop offset="100%" stopColor="rgba(255,190,70,0.06)" />
          </radialGradient>
          <radialGradient id="bulbGlassOff" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(120,110,80,0.10)" />
            <stop offset="100%" stopColor="rgba(80,70,50,0.04)" />
          </radialGradient>
        </defs>

        {/* Ceiling mount */}
        <rect x="30" y="0" width="20" height="10" rx="3" fill="rgba(50,45,38,0.85)" />
        <rect x="34" y="8" width="12" height="5" rx="2" fill="rgba(60,55,45,0.7)" />

        {/* Wire */}
        <line x1="40" y1="13" x2="40" y2="42" stroke="rgba(50,45,38,0.6)" strokeWidth="2" />

        {/* Screw base */}
        <path d="M30,42 L30,60 Q30,62 32,62 L48,62 Q50,62 50,60 L50,42 Z" fill="url(#bulbBase)" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="30" y1={44 + i * 3.6} x2="50" y2={44 + i * 3.6}
            stroke="rgba(110,100,75,0.4)" strokeWidth="0.8" />
        ))}
        <ellipse cx="40" cy="62" rx="10" ry="2.5" fill="rgba(100,90,70,0.5)" />

        {/* Glass envelope */}
        <motion.path
          d="M30,62 Q22,72 20,85 Q18,100 24,115 Q28,126 34,132 Q37,136 40,138 Q43,136 46,132 Q52,126 56,115 Q62,100 60,85 Q58,72 50,62"
          fill="none" strokeWidth="1.8"
          animate={{ stroke: lightsOn ? 'rgba(255,215,130,0.50)' : isEmber ? 'rgba(255,180,100,0.22)' : 'rgba(120,110,85,0.25)' }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M31,63 Q23,73 21,85 Q19,100 25,114 Q29,125 35,131 Q38,135 40,137 Q42,135 45,131 Q51,125 55,114 Q61,100 59,85 Q57,73 49,63 Z"
          animate={{ fill: lightsOn ? 'url(#bulbGlass)' : isEmber ? 'url(#bulbGlassOff)' : 'url(#bulbGlassOff)' }}
          transition={{ duration: 0.5 }}
        />

        {/* Glass reflection */}
        <motion.path
          d="M29,72 Q26,82 25,92 Q25,102 28,110"
          fill="none" strokeWidth="1.8" strokeLinecap="round"
          animate={{ stroke: lightsOn ? 'rgba(255,255,255,0.22)' : isEmber ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.05)' }}
          transition={{ duration: 0.5 }}
        />

        {/* Filament support pillars */}
        <motion.line x1="35" y1="65" x2="35" y2="125" strokeWidth="0.8" strokeLinecap="round"
          animate={{ stroke: lightsOn ? 'rgba(180,160,100,0.4)' : isEmber ? 'rgba(140,110,60,0.25)' : 'rgba(100,90,70,0.15)' }}
          transition={{ duration: 0.5 }}
        />
        <motion.line x1="45" y1="65" x2="45" y2="125" strokeWidth="0.8" strokeLinecap="round"
          animate={{ stroke: lightsOn ? 'rgba(180,160,100,0.4)' : isEmber ? 'rgba(140,110,60,0.25)' : 'rgba(100,90,70,0.15)' }}
          transition={{ duration: 0.5 }}
        />

        {/* Filament coils */}
        <motion.path
          d="M35,75 L45,80 L35,85 L45,90 L35,95 L45,100 L35,105 L45,110 L35,115 L45,120"
          fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          animate={
            lightsOn
              ? { stroke: 'rgba(255,200,60,0.9)' }
              : isEmber
                ? { stroke: ['rgba(255,140,30,0.35)', 'rgba(255,160,40,0.50)', 'rgba(255,140,30,0.35)'] }
                : { stroke: 'rgba(80,65,35,0.15)' }
          }
          transition={isEmber ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
        />
        {/* Filament bloom */}
        <motion.path
          d="M35,75 L45,80 L35,85 L45,90 L35,95 L45,100 L35,105 L45,110 L35,115 L45,120"
          fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: 'blur(4px)' }}
          animate={
            lightsOn
              ? { stroke: 'rgba(255,210,70,0.45)' }
              : isEmber
                ? { stroke: ['rgba(255,130,20,0.12)', 'rgba(255,150,30,0.22)', 'rgba(255,130,20,0.12)'] }
                : { stroke: 'rgba(80,65,35,0)' }
          }
          transition={isEmber ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
        />
        {/* Extra bloom */}
        <motion.path
          d="M35,75 L45,80 L35,85 L45,90 L35,95 L45,100 L35,105 L45,110 L35,115 L45,120"
          fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: 'blur(10px)' }}
          animate={
            lightsOn
              ? { stroke: 'rgba(255,200,60,0.18)' }
              : isEmber
                ? { stroke: ['rgba(255,120,20,0.05)', 'rgba(255,140,30,0.10)', 'rgba(255,120,20,0.05)'] }
                : { stroke: 'rgba(80,65,35,0)' }
          }
          transition={isEmber ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
        />

        {/* Nipple */}
        <motion.circle cx="40" cy="138" r="3.5"
          animate={{ fill: lightsOn ? 'rgba(255,210,100,0.35)' : isEmber ? 'rgba(255,150,50,0.15)' : 'rgba(110,100,75,0.15)' }}
          transition={{ duration: 0.5 }}
        />
      </svg>

      {/* Cord + knob — only when showCord */}
      {showCord && (
        <>
          <motion.div
            style={{
              position: 'absolute', left: '50%', top: '19cqh',
              width: 2, transformOrigin: 'top', transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, rgba(70,60,45,0.7) 0%, rgba(90,75,55,0.5) 100%)',
              borderRadius: 1,
            }}
            animate={{ height: isPulling ? '72cqh' : '66cqh' }}
            transition={{ duration: isPulling ? 0.2 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 12, borderRadius: '4px 4px 4px 4px / 3px 3px 6px 6px',
              background: 'linear-gradient(180deg, rgba(100,85,60,0.8) 0%, rgba(70,60,42,0.6) 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
            animate={{ top: isPulling ? 'calc(19cqh + 72cqh)' : 'calc(19cqh + 66cqh)' }}
            transition={{ duration: isPulling ? 0.2 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}
    </div>
  )
}
