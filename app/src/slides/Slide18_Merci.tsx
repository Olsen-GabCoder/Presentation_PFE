import { motion } from 'framer-motion'
import { useT } from '../i18n'

const LETTERS_KEY = 'thanks' as const

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div className="absolute rounded-full"
      style={{ left: x, top: y, width: size, height: size, background: 'radial-gradient(circle, rgba(200,16,46,0.6) 0%, transparent 70%)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0.5], y: [0, -40, -80] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }} />
  )
}

const particles = [
  { delay: 1.5, x: '15%', y: '70%', size: 4 }, { delay: 2.2, x: '25%', y: '80%', size: 3 },
  { delay: 3.0, x: '72%', y: '65%', size: 5 }, { delay: 1.8, x: '80%', y: '75%', size: 3 },
  { delay: 2.8, x: '45%', y: '85%', size: 4 }, { delay: 3.5, x: '60%', y: '72%', size: 3 },
  { delay: 2.0, x: '35%', y: '68%', size: 5 }, { delay: 3.2, x: '88%', y: '60%', size: 3 },
  { delay: 1.2, x: '10%', y: '55%', size: 4 }, { delay: 2.5, x: '55%', y: '78%', size: 3 },
]

export default function Slide18_Merci() {
  const t = useT().slide18
  const letters = t[LETTERS_KEY].split('')

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#101012' }}>
      <motion.div className="absolute inset-0" style={{ backgroundImage: 'url(/images/merci.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}
        initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.7) 100%)' }} />

      <motion.div className="absolute" style={{ left: '50%', top: '42%', width: '80cqw', height: '60cqh', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(200,16,46,0.08) 0%, transparent 60%)', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, delay: 0.5 }} />
      <motion.div className="absolute" style={{ left: '50%', top: '40%', width: '30cqh', height: '30cqh', transform: 'translate(-50%, -50%)',
        borderRadius: '50%', border: '1px solid rgba(200,16,46,0.1)', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div className="absolute" style={{ left: '50%', top: '40%', width: '48cqh', height: '48cqh', transform: 'translate(-50%, -50%)',
        borderRadius: '50%', border: '1px solid rgba(200,16,46,0.05)', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }} />

      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div className="flex items-center" style={{ gap: '3cqw', marginBottom: '4cqh' }}
          initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <img src="/esprit-logo.png" alt="ESPRIT" style={{ height: '18cqh', objectFit: 'contain', margin: '-6cqh 0' }} />
          <div style={{ width: 2, height: '5cqh', background: 'rgba(255,255,255,0.1)', borderRadius: 1 }} />
          <img src="/mika-logo.png" alt="MIKA Services" style={{ height: '6cqh', objectFit: 'contain' }} />
        </motion.div>

        <div className="flex items-center justify-center" style={{ marginBottom: '1cqh', gap: '0.4cqw' }}>
          {letters.map((letter, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span style={{ display: 'block', fontSize: '16cqh', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em',
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                {letter}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p style={{ fontSize: '4.3cqh', fontWeight: 400, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5em', textTransform: 'uppercase', margin: 0 }}
          initial={{ opacity: 0, letterSpacing: '1em' }} animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          {t.subtitle}
        </motion.p>

        <motion.div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #c8102e, transparent)', borderRadius: 2, marginTop: '3cqh', marginBottom: '3cqh' }}
          initial={{ width: 0, opacity: 0 }} animate={{ width: '25cqw', opacity: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }} />

        <motion.p style={{ fontSize: '1.6cqh', fontWeight: 600, color: '#c8102e', margin: 0, marginBottom: '3.5cqh', letterSpacing: '0.2em' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}>
          {t.questionsLabel}
        </motion.p>

        <motion.p style={{ fontSize: '1.7cqh', color: 'rgba(255,255,255,0.55)', margin: 0, fontStyle: 'italic', textAlign: 'center' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }}>
          {t.acknowledgment}{' '}
          <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{t.school}</span>
          , à l&apos;équipe{' '}
          <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{t.team}</span>
          {t.ackEnd}
        </motion.p>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ padding: '2.5cqh 0' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.9cqh', fontWeight: 600, color: 'rgba(255,255,255,0.45)',
          margin: 0, letterSpacing: '0.15em' }}>{t.author}</p>
      </motion.div>
    </div>
  )
}
