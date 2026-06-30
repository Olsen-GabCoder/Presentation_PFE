import { motion } from 'framer-motion'
import { Search, PenTool, Code2, ShieldCheck, Rocket } from 'lucide-react'
import CountUp from '../components/CountUp'

const steps = [
  { num: '01', label: 'Audit',      desc: 'Analyser l\'existant,\nidentifier les besoins', Icon: Search },
  { num: '02', label: 'Mockup',     desc: 'Maquettes HTML\nhaute fidélité',                Icon: PenTool },
  { num: '03', label: 'Code',       desc: 'Backend Kotlin\n+ Frontend React',              Icon: Code2 },
  { num: '04', label: 'Validation', desc: 'Tests manuels\n+ revue sponsor',                Icon: ShieldCheck },
  { num: '05', label: 'Production', desc: 'Déploiement Render\n+ communication',            Icon: Rocket },
]

export default function Slide06_Methodologie() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/methodologie.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingLeft: '5cqw', paddingRight: '4cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        {/* ── Title ── */}
        <div style={{ textAlign: 'center', marginBottom: '1.5cqh' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Chaque vague suit le{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>même cycle</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '1cqh' }}
          >
            10 vagues fonctionnelles · Février → Juillet 2026
          </motion.p>
        </div>

        {/* ── 5-step flow — the hero visual ── */}
        <div
          className="flex items-stretch justify-center"
          style={{ gap: '0.8cqw', marginTop: '3cqh', marginBottom: '3.5cqh', width: '100%' }}
        >
          {steps.map((s, i) => (
            <div key={i} className="flex items-center" style={{ gap: '0.8cqw' }}>
              <motion.div
                className="flex flex-col items-center justify-center"
                style={{
                  width: '15cqw',
                  height: '28cqh',
                  borderRadius: '1.2cqh',
                  background: i === 2
                    ? 'linear-gradient(180deg, rgba(200,16,46,0.15) 0%, rgba(200,16,46,0.05) 100%)'
                    : 'var(--surface-card)',
                  border: i === 2
                    ? '1.5px solid rgba(200,16,46,0.35)'
                    : '1px solid rgba(255,255,255,0.07)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Number watermark */}
                <span style={{
                  position: 'absolute', top: '1cqh', right: '1cqw',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '6cqh', fontWeight: 800,
                  color: i === 2 ? 'rgba(200,16,46,0.12)' : 'var(--surface-card)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </span>

                {/* Content */}
                <s.Icon
                  size="3.2cqh"
                  strokeWidth={1.5}
                  style={{
                    width: '3.2cqh', height: '3.2cqh', marginBottom: '1.2cqh',
                    color: i === 2 ? '#c8102e' : 'rgba(255,255,255,0.5)',
                  }}
                />

                <p style={{
                  fontSize: '3.2cqh', fontWeight: 800,
                  color: i === 2 ? '#c8102e' : '#fff',
                  margin: 0, marginBottom: '0.8cqh',
                }}>
                  {s.label}
                </p>

                <p style={{
                  fontSize: '1.9cqh', color: 'var(--text-muted)',
                  margin: 0, textAlign: 'center', lineHeight: 1.45,
                  whiteSpace: 'pre-line', padding: '0 0.5cqw',
                }}>
                  {s.desc}
                </p>
              </motion.div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '2cqh', height: '2cqh' }}>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#c8102e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom stats ── */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: '5cqw' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {[
            { num: 208, lab: 'commits en 6 mois' },
            { num: 8, lab: 'mockups HTML produits' },
            { num: 6, lab: 'jalons majeurs' },
            { num: 19, lab: 'modules livrés' },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline" style={{ gap: '0.6cqw' }}>
              <CountUp
                value={s.num}
                delay={1.5 + i * 0.1}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '2.0cqh', fontWeight: 800, color: '#c8102e',
                  lineHeight: 1,
                }}
              />
              <span style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', fontWeight: 500 }}>
                {s.lab}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
