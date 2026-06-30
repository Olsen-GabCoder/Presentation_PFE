import { motion } from 'framer-motion'

// Full animation cycle: 8 seconds
// 0-3s: Walking forward
// 3-4.5s: Reaching for diploma
// 4.5-6s: Raising diploma triumphantly
// 6-7.5s: Celebrating
// 7.5-8s: Fade for loop

const CYCLE = 8

export default function GraduateScene() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        right: '4cqw',
        bottom: '20cqh',
        width: '35cqw',
        height: '52cqh',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      <svg
        viewBox="0 0 700 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* ===== GROUND LINE ===== */}
        <motion.line
          x1="50" y1="440" x2="650" y2="440"
          stroke="#c8102e" strokeWidth="1.5" opacity="0.08"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        />

        {/* ===== PODIUM / STAND for diploma ===== */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.07, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {/* Podium base */}
          <rect x="430" y="380" width="60" height="60" rx="4" fill="#1a1a1a" />
          <rect x="420" y="375" width="80" height="10" rx="3" fill="#1a1a1a" />
          {/* Small decorative emblem on podium */}
          <circle cx="460" cy="410" r="12" fill="none" stroke="#c8102e" strokeWidth="1.5" />
          <path d="M454,410 L460,404 L466,410 L460,416 Z" fill="#c8102e" />
        </motion.g>

        {/* ===== CONFETTI PARTICLES (appear during celebration) ===== */}
        {[
          { x: 320, delay: 0.0, dur: 2.5, dx: -30 },
          { x: 360, delay: 0.2, dur: 2.8, dx: 20 },
          { x: 340, delay: 0.4, dur: 2.3, dx: -15 },
          { x: 380, delay: 0.1, dur: 2.6, dx: 35 },
          { x: 300, delay: 0.3, dur: 2.4, dx: -40 },
          { x: 400, delay: 0.5, dur: 2.2, dx: 25 },
          { x: 350, delay: 0.15, dur: 2.7, dx: -10 },
          { x: 310, delay: 0.35, dur: 2.1, dx: -25 },
        ].map((c, i) => (
          <motion.rect
            key={i}
            x={c.x}
            width={i % 2 === 0 ? 4 : 3}
            height={i % 2 === 0 ? 8 : 5}
            rx="1"
            fill={i % 3 === 0 ? '#c8102e' : '#1a1a1a'}
            opacity="0.06"
            animate={{
              y: [300, 150 + (i % 3) * 40, 500],
              x: [c.x, c.x + c.dx, c.x + c.dx * 2],
              rotate: [0, 180 + i * 45, 360],
              opacity: [0, 0.08, 0],
            }}
            transition={{
              duration: c.dur,
              delay: c.delay + 4.5,
              repeat: Infinity,
              repeatDelay: CYCLE - c.dur,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ===== THE GRADUATE FIGURE ===== */}
        <motion.g
          // Walk forward then stop
          animate={{
            x: [0, 0, 100, 100, 100, 100, 100, 0],
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.05, 0.38, 0.5, 0.7, 0.85, 0.92, 1],
            ease: 'easeInOut',
          }}
        >
          {/* ===== HEAD ===== */}
          <motion.g>
            {/* Mortarboard */}
            <motion.g
              animate={{
                y: [0, 0, 0, 0, -8, 0, 0, 0],
              }}
              transition={{
                duration: CYCLE,
                repeat: Infinity,
                times: [0, 0.4, 0.55, 0.62, 0.7, 0.78, 0.9, 1],
                ease: 'easeInOut',
              }}
            >
              {/* Board */}
              <motion.polygon
                points="220,115 280,98 340,115 280,132"
                fill="#1a1a1a"
                opacity="0.065"
              />
              {/* Button on top */}
              <circle cx="280" cy="112" r="3" fill="#c8102e" opacity="0.08" />
              {/* Tassel string */}
              <motion.path
                d="M310,115 Q320,125 318,145"
                stroke="#c8102e"
                strokeWidth="2"
                fill="none"
                opacity="0.07"
                animate={{
                  d: [
                    'M310,115 Q320,125 318,145',
                    'M310,115 Q325,128 322,148',
                    'M310,115 Q315,128 312,148',
                    'M310,115 Q320,125 318,145',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Tassel end */}
              <motion.circle
                cx="318" cy="148" r="4"
                fill="#c8102e" opacity="0.07"
                animate={{
                  cx: [318, 322, 312, 318],
                  cy: [148, 151, 151, 148],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* Head shape */}
            <ellipse cx="280" cy="145" rx="22" ry="26" fill="#1a1a1a" opacity="0.06" />
            {/* Neck */}
            <rect x="272" y="169" width="16" height="14" rx="5" fill="#1a1a1a" opacity="0.06" />
          </motion.g>

          {/* ===== TORSO (toga/gown) ===== */}
          <path
            d="M245,183 C250,180 310,180 315,183 L330,310 C330,315 228,315 228,310 Z"
            fill="#1a1a1a"
            opacity="0.06"
          />
          {/* Collar V-shape */}
          <path
            d="M260,183 L280,210 L300,183"
            fill="none"
            stroke="#c8102e"
            strokeWidth="2"
            opacity="0.05"
          />
          {/* Gown drape left */}
          <path
            d="M245,183 L215,200 L210,285 L228,310 Z"
            fill="#1a1a1a"
            opacity="0.05"
          />
          {/* Gown drape right */}
          <path
            d="M315,183 L345,200 L350,285 L330,310 Z"
            fill="#1a1a1a"
            opacity="0.05"
          />

          {/* ===== LEFT ARM — holds then raises diploma ===== */}
          <motion.g
            animate={{
              rotate: [0, 5, -5, 5, -20, -160, -160, 0],
            }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.38, 0.5, 0.6, 0.85, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '248px 195px' }}
          >
            {/* Upper arm */}
            <path
              d="M248,195 L218,260"
              stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round"
              opacity="0.06"
            />
            {/* Forearm */}
            <path
              d="M218,260 L225,310"
              stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round"
              opacity="0.06"
            />
            {/* Hand */}
            <circle cx="225" cy="313" r="8" fill="#1a1a1a" opacity="0.06" />

            {/* ===== DIPLOMA (appears when grabbed) ===== */}
            <motion.g
              animate={{
                opacity: [0, 0, 0, 0, 0.08, 0.08, 0.08, 0],
                scale: [0.5, 0.5, 0.5, 0.5, 1, 1, 1, 0.5],
              }}
              transition={{
                duration: CYCLE,
                repeat: Infinity,
                times: [0, 0.3, 0.45, 0.52, 0.58, 0.8, 0.92, 1],
                ease: 'easeInOut',
              }}
            >
              {/* Scroll body */}
              <rect x="205" y="295" width="42" height="30" rx="3" fill="#c8102e" />
              {/* Scroll curl top */}
              <ellipse cx="226" cy="295" rx="21" ry="5" fill="#c8102e" />
              {/* Scroll curl bottom */}
              <ellipse cx="226" cy="325" rx="21" ry="5" fill="#a00d24" />
              {/* Ribbon */}
              <rect x="218" y="302" width="16" height="2" rx="1" fill="white" opacity="0.5" />
              <rect x="220" y="308" width="12" height="2" rx="1" fill="white" opacity="0.4" />
              {/* Seal */}
              <circle cx="226" cy="318" r="5" fill="white" opacity="0.3" />
            </motion.g>
          </motion.g>

          {/* ===== RIGHT ARM — swings while walking, then raises ===== */}
          <motion.g
            animate={{
              rotate: [10, -10, 10, -10, 0, -150, -150, 10],
            }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: [0, 0.12, 0.24, 0.36, 0.45, 0.62, 0.85, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '312px 195px' }}
          >
            <path
              d="M312,195 L342,260"
              stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round"
              opacity="0.06"
            />
            <path
              d="M342,260 L335,310"
              stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round"
              opacity="0.06"
            />
            <circle cx="335" cy="313" r="8" fill="#1a1a1a" opacity="0.06" />
          </motion.g>

          {/* ===== LEFT LEG — walking cycle then stands ===== */}
          <motion.g
            animate={{
              rotate: [15, -15, 15, -15, 15, 0, 0, 15],
            }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.38, 0.45, 0.92, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '265px 308px' }}
          >
            {/* Thigh */}
            <path
              d="M265,308 L255,370"
              stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round"
              opacity="0.06"
            />
            {/* Shin */}
            <path
              d="M255,370 L250,430"
              stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round"
              opacity="0.06"
            />
            {/* Shoe */}
            <ellipse cx="245" cy="435" rx="18" ry="7" fill="#1a1a1a" opacity="0.06" />
          </motion.g>

          {/* ===== RIGHT LEG — walking cycle then stands ===== */}
          <motion.g
            animate={{
              rotate: [-15, 15, -15, 15, -15, 0, 0, -15],
            }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.38, 0.45, 0.92, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '295px 308px' }}
          >
            <path
              d="M295,308 L305,370"
              stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round"
              opacity="0.06"
            />
            <path
              d="M305,370 L310,430"
              stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round"
              opacity="0.06"
            />
            <ellipse cx="315" cy="435" rx="18" ry="7" fill="#1a1a1a" opacity="0.06" />
          </motion.g>
        </motion.g>

        {/* ===== CELEBRATION BURST (radiating lines) ===== */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const cx = 380
          const cy = 130
          const r1 = 30
          const r2 = 55 + (i % 3) * 10
          return (
            <motion.line
              key={i}
              x1={cx + Math.cos(rad) * r1}
              y1={cy + Math.sin(rad) * r1}
              x2={cx + Math.cos(rad) * r2}
              y2={cy + Math.sin(rad) * r2}
              stroke="#c8102e"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                opacity: [0, 0, 0, 0, 0, 0.08, 0.04, 0],
                scale: [0.5, 0.5, 0.5, 0.5, 0.5, 1.2, 1, 0.5],
              }}
              transition={{
                duration: CYCLE,
                repeat: Infinity,
                times: [0, 0.4, 0.5, 0.55, 0.6, 0.65, 0.82, 1],
                ease: 'easeOut',
                delay: i * 0.02,
              }}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}
