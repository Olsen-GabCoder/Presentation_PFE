import { motion } from 'framer-motion'
import { FileText, Cpu, MessageSquare } from 'lucide-react'
import CountUp from '../components/CountUp'

const pipeline = [
  { Icon: FileText, num: '01', title: 'Registre de guidance', desc: 'Contexte métier, actions RBAC, vocabulaire BTP, ton adapté' },
  { Icon: Cpu,      num: '02', title: 'System prompt dynamique', desc: 'Préambule global + route courante + profil utilisateur' },
  { Icon: MessageSquare, num: '03', title: 'MikaAssistantDrawer', desc: 'Streaming SSE mot par mot, historique 20 échanges' },
]

export default function Slide12_MikaAssistant() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/bg-assistant.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.14,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.14 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '3.5cqh', paddingBottom: '3cqh' }}>

        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: '2cqh' }}>
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                  color: '#fff', letterSpacing: '-0.025em', margin: 0,
                }}
              >
                Assistant IA{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>contextuel</span>
              </motion.h1>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            className="flex" style={{ gap: '2.5cqw' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          >
            {[
              { num: 85, suffix: '+', text: null, lab: 'routes couvertes' },
              { num: null, suffix: '', text: 'SSE', lab: 'streaming temps réel' },
              { num: null, suffix: '', text: 'Claude', lab: 'claude-sonnet-4-5' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '2.0cqh', fontWeight: 800, color: '#c8102e', margin: 0, lineHeight: 1,
                }}>
                  {s.num !== null
                    ? <CountUp value={s.num} suffix={s.suffix} delay={0.9 + i * 0.12} />
                    : <motion.span initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}>{s.text}</motion.span>
                  }
                </p>
                <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.3cqh' }}>{s.lab}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main: screenshot + pipeline */}
        <div className="flex-1 flex" style={{ gap: '2.5cqw' }}>

          {/* LEFT — Screenshot */}
          <motion.div
            className="relative overflow-hidden group"
            style={{
              width: '52cqw',
              borderRadius: '1cqh',
              border: '2px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}
            initial={{ opacity: 0, x: -20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/images/screen-assistant-open.png"
              alt="Mika Assistant ouvert"
              className="transition-transform duration-700 group-hover:scale-105"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.35) 100%)',
            }} />
            <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: '#c8102e' }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ padding: '1.2cqh 1.5cqw' }}>
              <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0 }}>
                Drawer contextuel sur la page Projets
              </p>
              <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.2cqh' }}>
                Aide adaptée au module consulté · suggestions d'actions
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Pipeline 3 cards stacked */}
          <div className="flex-1 flex flex-col" style={{ gap: '0.8cqh' }}>
            {pipeline.map((p, i) => (
              <motion.div
                key={i}
                className="flex-1 flex items-center"
                style={{
                  borderRadius: '0.8cqh',
                  background: i === 2
                    ? 'rgba(200,16,46,0.08)'
                    : 'var(--surface-card)',
                  border: i === 2
                    ? '1.5px solid rgba(200,16,46,0.25)'
                    : '1px solid var(--border-subtle)',
                  borderLeft: '3px solid #c8102e',
                  padding: '0 1.5cqw',
                  gap: '1.2cqw',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
              >
                <p.Icon
                  style={{ width: '2.8cqh', height: '2.8cqh', color: '#c8102e', flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div>
                  <div className="flex items-center" style={{ gap: '0.6cqw', marginBottom: '0.3cqh' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '3.6cqh', fontWeight: 800, color: '#c8102e',
                    }}>{p.num}</span>
                    <span style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff' }}>
                      {p.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Down arrows between cards */}
          </div>
        </div>

        {/* Footer */}
        <motion.p
          style={{ fontSize: '1.7cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '1cqh', textAlign: 'center', fontStyle: 'italic' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        >
          Guidance opérationnelle en production · Extraction IA (rapports, DQE scannés) au stade prototype
        </motion.p>
      </div>
    </div>
  )
}
