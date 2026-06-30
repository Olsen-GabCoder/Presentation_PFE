import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

const comparaison = [
  { proc: 'Suivi de projet',     avant: 'Excel dispersés',                 apres: 'Dashboard temps réel' },
  { proc: 'Coordination terrain', avant: 'WhatsApp sans trace',            apres: 'Messagerie structurée' },
  { proc: 'Devis & DQE',         avant: 'Saisie manuelle',                apres: 'DQE + barème intégré' },
  { proc: 'Demandes matériel',   avant: 'Papier, appels, pertes',         apres: 'Workflow DMA · 7 étapes' },
  { proc: 'Pilotage direction',  avant: 'Aucun KPI',                      apres: 'KPI consolidés + alertes' },
  { proc: 'Rapports & PV',       avant: 'Rédaction manuelle',             apres: 'PV auto-générés, PDF' },
]

export default function Slide04_Contexte() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Hero */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-route-perspective.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.16,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.16 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        {/* ── Header ── */}
        <div className="overflow-hidden" style={{ marginBottom: '0.8cqh' }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.025em', margin: 0,
            }}
          >
            MIKA Services — des chantiers pilotés{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>sans outil unifié</span>
          </motion.h1>
        </div>

        {/* ── Stats row ── */}
        <div className="flex" style={{ gap: '3cqw', marginBottom: '3cqh' }}>
          {[
            { num: 1000, prefix: '~', suffix: '', lab: 'collaborateurs', sub: 'Groupe ACK · 5 filiales · Libreville' },
            { num: 143, prefix: '', suffix: ' Md', lab: 'FCFA de projets', sub: 'Grand Libreville · Bongolo · Lowé' },
            { num: 90, prefix: '', suffix: ' %', lab: 'Colas Gabon racheté', sub: 'Avril 2026 · 254 salariés intégrés' },
            { num: null, text: 'FEG', lab: 'Fédération patronale', sub: 'Présidence A.-C. Kouakoua · 2025' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="flex-1"
              style={{ borderLeft: '2px solid rgba(200,16,46,0.4)', paddingLeft: '1.2cqw' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
            >
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '3.6cqh', fontWeight: 800, color: '#c8102e', margin: 0, lineHeight: 1,
              }}>
                {s.num !== null
                  ? <CountUp value={s.num} prefix={s.prefix} suffix={s.suffix} delay={0.8 + i * 0.12} />
                  : <motion.span initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}>{s.text}</motion.span>
                }
              </p>
              <p style={{ fontSize: '1.9cqh', fontWeight: 600, color: '#fff', margin: 0, marginTop: '0.5cqh' }}>{s.lab}</p>
              <p style={{ fontSize: '1.9cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.2cqh' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Avant / Après — compact rows ── */}
        <motion.p
          style={{ fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0, marginBottom: '1.5cqh' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        >
          Transformation des processus
        </motion.p>

        <div className="flex-1 flex flex-col justify-center" style={{ gap: '0.8cqh' }}>
          {comparaison.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-center"
              style={{ gap: '1.5cqw' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Processus label */}
              <span style={{
                width: '14cqw', flexShrink: 0,
                fontSize: '2cqh', fontWeight: 700, color: '#fff',
              }}>
                {r.proc}
              </span>

              {/* Avant */}
              <div style={{
                flex: 1,
                padding: '0.8cqh 1.2cqw',
                borderRadius: '0.5cqh',
                background: 'rgba(220,80,80,0.06)',
                border: '1px solid rgba(220,100,100,0.12)',
              }}>
                <span style={{ fontSize: '1.8cqh', color: 'rgba(220,140,140,0.9)' }}>
                  {r.avant}
                </span>
              </div>

              {/* Arrow */}
              <svg viewBox="0 0 24 24" style={{ width: '2cqh', height: '2cqh', flexShrink: 0 }}>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#c8102e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Après */}
              <div style={{
                flex: 1,
                padding: '0.8cqh 1.2cqw',
                borderRadius: '0.5cqh',
                background: 'rgba(80,200,120,0.06)',
                border: '1px solid rgba(100,200,130,0.12)',
              }}>
                <span style={{ fontSize: '1.8cqh', color: 'rgba(130,220,160,0.95)', fontWeight: 600 }}>
                  {r.apres}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
