import { motion } from 'framer-motion'
import { Check, AlertCircle, Route, FlaskConical } from 'lucide-react'

const modules = [
  { name: 'Authentification & sécurité', status: 'full' },
  { name: 'Projets, DQE & barèmes', status: 'full' },
  { name: 'Matériel & workflow DMA', status: 'full' },
  { name: 'Salle MIKA & messagerie', status: 'full' },
  { name: 'Reporting & dashboard', status: 'full' },
  { name: 'Qualité & conformité', status: 'partial' },
  { name: 'Pilotage & IA', status: 'partial' },
]

const parcours = [
  'Auth complète',
  'Création projet + DQE',
  'Workflow DMA 7 étapes',
  'Session Salle MIKA + PV',
  'Dashboard exécutif',
]

export default function Slide14_Validation() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/validation.jpg)',
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

      {/* Left red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3.5cqh' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5cqh' }}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}
            >
              Une validation terrain itérative avec le sponsor,{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>à chaque release.</span>
            </motion.h1>
          </div>
        </div>

        {/* Main: 2 columns */}
        <div className="flex-1 flex" style={{ gap: '3cqw' }}>

          {/* LEFT — Module status table */}
          <motion.div
            className="flex-1 flex flex-col"
            style={{
              borderRadius: '1cqh',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Table header */}
            <div className="flex items-center justify-between"
              style={{
                padding: '1.5cqh 2cqw',
                background: 'var(--surface-card)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span style={{
                fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
              }}>Macro-domaine</span>
              <span style={{
                fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
              }}>Statut</span>
            </div>

            {/* Table rows */}
            {modules.map((m, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between"
                style={{
                  flex: 1,
                  padding: '0 2cqw',
                  background: 'rgba(255,255,255,0.015)',
                  borderBottom: i < modules.length - 1 ? '1px solid var(--surface-card)' : 'none',
                }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
              >
                <span style={{
                  fontSize: '2.0cqh', fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                }}>{m.name}</span>
                {m.status === 'full' ? (
                  <span className="flex items-center" style={{ gap: '0.5cqw' }}>
                    <Check style={{ width: '2cqh', height: '2cqh', color: '#34d399' }} strokeWidth={2.5} />
                    <span style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#34d399' }}>Validé</span>
                  </span>
                ) : (
                  <span className="flex items-center" style={{ gap: '0.5cqw' }}>
                    <AlertCircle style={{ width: '2cqh', height: '2cqh', color: '#fbbf24' }} strokeWidth={2} />
                    <span style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#fbbf24' }}>Validé partiel</span>
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT — Parcours + Méthodes */}
          <div className="flex flex-col" style={{ width: '38cqw', gap: '1.5cqh' }}>

            {/* 5 parcours critiques */}
            <motion.div
              className="flex-1"
              style={{
                padding: '2.5cqh 2cqw',
                borderRadius: '1cqh',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderLeft: '4px solid #c8102e',
                display: 'flex', flexDirection: 'column',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center" style={{ gap: '0.8cqw', marginBottom: '2cqh' }}>
                <Route style={{ width: '2.5cqh', height: '2.5cqh', color: '#c8102e' }} strokeWidth={1.5} />
                <span style={{
                  fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>5 parcours critiques &middot; à chaque livraison</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {parcours.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center"
                    style={{ gap: '1cqw' }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.07, duration: 0.4 }}
                  >
                    <div style={{
                      width: '0.8cqh', height: '0.8cqh', borderRadius: '50%',
                      background: '#c8102e', flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '2.0cqh', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                      {p}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Méthodes */}
            <motion.div
              style={{
                padding: '2.5cqh 2cqw',
                borderRadius: '1cqh',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderLeft: '4px solid #c8102e',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="flex items-center" style={{ gap: '0.8cqw', marginBottom: '1.2cqh' }}>
                <FlaskConical style={{ width: '2.5cqh', height: '2.5cqh', color: '#c8102e' }} strokeWidth={1.5} />
                <span style={{
                  fontSize: '1.6cqh', fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>Méthodes</span>
              </div>
              <p style={{
                fontSize: '2.0cqh', color: 'var(--text-muted)',
                margin: 0, lineHeight: 1.6,
              }}>
                5 recettes avec M. Ramzi Jribi (1–2 h, sur prod) · Postman par module · cross-browser · responsive sur appareils réels · JUnit 5 + MockK ciblés.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{
            fontSize: '1.7cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '2cqh',
            textAlign: 'center', fontStyle: 'italic',
          }}
        >
          Arbitrage assumé : couverture fonctionnelle large plutôt que tests exhaustifs sur un périmètre réduit.
        </motion.p>
      </div>
    </div>
  )
}
