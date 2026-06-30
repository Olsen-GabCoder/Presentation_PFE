import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

export default function Slide11_SalleMika() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Subtle background from immersive screenshot */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/salle-immersif.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12, filter: 'blur(8px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2 }}
      />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingLeft: '5cqw', paddingRight: '4cqw', paddingTop: '3.5cqh', paddingBottom: '3cqh' }}>

        {/* Header — centered */}
        <div style={{ textAlign: 'center', marginBottom: '1cqh' }}>
          <motion.div
            className="flex items-center justify-center" style={{ marginBottom: '1cqh' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span style={{
              padding: '0.3cqh 0.7cqw', borderRadius: '0.4cqh',
              background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.25)',
              fontSize: '1.9cqh', fontWeight: 700, color: '#c8102e',
            }}>
              Module phare
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Picture-in-Picture{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>réécrit de zéro</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.8cqh' }}
          >
            Naviguer sur la plateforme tout en restant en appel vidéo Jitsi
          </motion.p>
        </div>

        {/* Two screenshots side by side — the hero visual */}
        <div className="flex items-center justify-center" style={{ gap: '2cqw', marginTop: '2.5cqh', marginBottom: '2.5cqh' }}>

          {/* Immersive */}
          <motion.div
            className="relative overflow-hidden group"
            style={{
              width: '42cqw', height: '34cqh',
              borderRadius: '1cqh',
              border: '2px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/images/salle-immersif.png" alt="Mode immersif"
              className="transition-transform duration-700 group-hover:scale-105"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)',
            }} />
            <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: '#c8102e' }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ padding: '1.2cqh 1.5cqw' }}>
              <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0 }}>Mode immersif</p>
            </div>
          </motion.div>

          {/* PiP */}
          <motion.div
            className="relative overflow-hidden group"
            style={{
              width: '42cqw', height: '34cqh',
              borderRadius: '1cqh',
              border: '2px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/images/salle-pip.png" alt="Mode PiP"
              className="transition-transform duration-700 group-hover:scale-105"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top right' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)',
            }} />
            <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: '#c8102e' }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ padding: '1.2cqh 1.5cqw' }}>
              <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0 }}>Mode mini-player</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: '4cqw' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {[
            { num: 1094, text: null, lab: 'lignes TypeScript' },
            { num: 0, text: null, lab: 'dépendance npm' },
            { num: null, text: 'FLIP', lab: 'animation 60 FPS' },
            { num: null, text: 'WebSocket', lab: 'présence STOMP temps réel' },
            { num: null, text: 'RS256', lab: 'signature JWT Jitsi JaaS' },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline" style={{ gap: '0.5cqw' }}>
              {s.num !== null ? (
                <CountUp
                  value={s.num}
                  delay={1.2 + i * 0.1}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '3.6cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1,
                  }}
                />
              ) : (
                <motion.span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '3.6cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1,
                  }}
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
                >
                  {s.text}
                </motion.span>
              )}
              <span style={{ fontSize: '2.0cqh', color: 'var(--text-muted)' }}>
                {s.lab}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
