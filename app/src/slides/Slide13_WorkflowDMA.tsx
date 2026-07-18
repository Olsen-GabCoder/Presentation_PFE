import { motion } from 'framer-motion'
import { UserPen, HardHat, BriefcaseBusiness, Truck } from 'lucide-react'
import { useT } from '../i18n'

const ICONS = [UserPen, HardHat, BriefcaseBusiness, Truck]

export default function Slide13_WorkflowDMA() {
  const t = useT().slide13

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>
      <motion.div className="absolute inset-0" style={{ backgroundImage: 'url(/images/workflow.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1)', opacity: 0.1 }}
        initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.5) 100%)' }} />
      <motion.div className="absolute left-0 top-0 bottom-0" style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />

      <div className="absolute inset-0 flex flex-col" style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5cqh' }}>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '4.7cqh', fontWeight: 800, lineHeight: 1.15, color: '#fff', letterSpacing: '-0.025em', margin: 0 }}>
              {t.title}{' '}
              <span style={{ background: 'linear-gradient(90deg, #c8102e, #e8384f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t.titleAccent}
              </span>
            </motion.h1>
          </div>
        </div>

        {/* 7 steps */}
        <motion.div className="flex items-stretch justify-between" style={{ gap: '0.5cqw', marginBottom: '3.5cqh' }}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
          {t.steps.map((step, i) => (
            <div key={step.num} className="flex items-center" style={{ flex: 1, gap: '0.5cqw' }}>
              <motion.div className="flex flex-col items-center justify-center"
                style={{ flex: 1, padding: '2cqh 0', borderRadius: '1cqh',
                  background: i === 3 ? 'rgba(200,16,46,0.16)' : 'rgba(18,18,20,0.85)',
                  border: i === 3 ? '1.5px solid rgba(200,16,46,0.35)' : '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.4 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '3.2cqh', fontWeight: 800,
                  color: i === 3 ? '#c8102e' : 'rgba(255,255,255,0.2)', lineHeight: 1 }}>{step.num}</span>
                <span style={{ fontSize: '2.0cqh', fontWeight: 600, color: i === 3 ? '#fff' : 'var(--text-muted)',
                  marginTop: '0.6cqh', whiteSpace: 'nowrap' }}>{step.label}</span>
              </motion.div>
              {i < t.steps.length - 1 && <span style={{ fontSize: '2.0cqh', color: 'rgba(255,255,255,0.12)' }}>&rarr;</span>}
            </div>
          ))}
        </motion.div>

        {/* Roles */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ fontSize: '1.6cqh', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0, marginBottom: '1.5cqh' }}>
          {t.rolesLabel}
        </motion.p>
        <div className="flex-1 grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2cqw', alignContent: 'center' }}>
          {t.roles.map((r, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div key={i} style={{ padding: '3.5cqh 1.8cqw', borderRadius: '1cqh', background: 'rgba(18,18,20,0.85)',
                border: '1px solid var(--border-subtle)', borderLeft: '4px solid #c8102e',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5cqh' }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}>
                <Icon style={{ width: '5.5cqh', height: '5.5cqh', color: '#c8102e' }} strokeWidth={1.5} />
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2.4cqh', fontWeight: 700, color: '#c8102e', margin: 0 }}>{r.role}</p>
                  <p style={{ fontSize: '2.3cqh', color: 'rgba(255,255,255,0.75)', margin: 0, marginTop: '0.8cqh', lineHeight: 1.4 }}>{r.action}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} style={{ marginTop: '2.5cqh' }}>
          <p style={{ fontSize: '1.9cqh', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            {t.footer}{' '}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.7cqh', padding: '0.3cqh 0.6cqw',
              background: 'rgba(255,255,255,0.05)', borderRadius: '0.4cqh', border: '1px solid rgba(255,255,255,0.08)' }}>{t.footerCode}</span>.
          </p>
          <p style={{ fontSize: '1.7cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '0.5cqh', fontStyle: 'italic', textAlign: 'center' }}>{t.footerRef}</p>
        </motion.div>
      </div>
    </div>
  )
}
