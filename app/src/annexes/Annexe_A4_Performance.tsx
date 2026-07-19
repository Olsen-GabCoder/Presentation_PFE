import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : éventail N+1 — avant : 1 écran déclenche 150+ requêtes ; après : 1-3 requêtes
const FAN_LINES = 16

export default function Annexe_A4_Performance() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 5cqw 4cqh' }}>

      <div className="flex items-stretch" style={{ height: '54cqh', gap: '2cqw' }}>

        {/* ── AVANT : l'éventail ── */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            borderRadius: '1.2cqh', padding: '2cqh 1.5cqw',
            border: '1px dashed rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)' }}>
            AVANT · PROBLÈME N+1
          </span>
          <svg viewBox="0 0 500 300" style={{ width: '100%', flex: 1 }}>
            {/* Éventail de requêtes */}
            {Array.from({ length: FAN_LINES }).map((_, i) => (
              <motion.line
                key={i}
                x1="95" y1="150" x2="390" y2={28 + i * (244 / (FAN_LINES - 1))}
                stroke="#c8102e" strokeWidth="1.6" opacity="0.55"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.04, ease }}
              />
            ))}
            {/* Écran source */}
            <rect x="20" y="115" width="75" height="70" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <text x="57" y="145" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">1 écran</text>
            <text x="57" y="166" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12">liste</text>
            {/* Base */}
            <rect x="390" y="15" width="90" height="270" rx="10" fill="rgba(200,16,46,0.10)" stroke="rgba(200,16,46,0.6)" strokeWidth="2" />
            <text x="435" y="145" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">Postgre</text>
            <text x="435" y="163" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">SQL</text>
          </svg>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1, ease }}
            style={{ textAlign: 'center', fontSize: '2.3cqh', fontWeight: 800, color: '#c8102e' }}
          >
            150+ requêtes
          </motion.span>
        </motion.div>

        {/* ── Le correctif au centre ── */}
        <div className="flex flex-col items-center justify-center flex-shrink-0" style={{ width: '15cqw', gap: '1.4cqh' }}>
          {['@BatchSize 25', 'Projections DTO', 'JOIN FETCH ciblé'].map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 1.2 + i * 0.12, ease }}
              className="w-full flex items-center justify-center"
              style={{
                padding: '1.2cqh 0', borderRadius: '0.7cqh',
                background: '#c8102e', color: '#fff',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700 }}>{f}</span>
            </motion.div>
          ))}
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.6, ease }}
            style={{ fontSize: '3cqh', color: '#fff', fontWeight: 700, lineHeight: 1 }}
          >
            →
          </motion.span>
        </div>

        {/* ── APRÈS : 3 traits ── */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.7, ease }}
          style={{
            borderRadius: '1.2cqh', padding: '2cqh 1.5cqw',
            border: '1px solid rgba(200,16,46,0.55)', background: 'rgba(200,16,46,0.06)',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e' }}>
            APRÈS · OPTIMISÉ
          </span>
          <svg viewBox="0 0 500 300" style={{ width: '100%', flex: 1 }}>
            {[110, 150, 190].map((y, i) => (
              <motion.line
                key={y}
                x1="95" y1="150" x2="390" y2={y}
                stroke="#c8102e" strokeWidth="7" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.9 + i * 0.15, ease }}
              />
            ))}
            <rect x="20" y="115" width="75" height="70" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <text x="57" y="145" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">1 écran</text>
            <text x="57" y="166" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12">liste</text>
            <rect x="390" y="15" width="90" height="270" rx="10" fill="rgba(200,16,46,0.10)" stroke="rgba(200,16,46,0.6)" strokeWidth="2" />
            <text x="435" y="145" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">Postgre</text>
            <text x="435" y="163" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">SQL</text>
          </svg>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.3, ease }}
            style={{ textAlign: 'center', fontSize: '2.3cqh', fontWeight: 800, color: '#fff' }}
          >
            1 à 3 requêtes
          </motion.span>
        </motion.div>
      </div>

      {/* Note montée en charge */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.5, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        + pagination systématique · 4 niveaux de cache · backend stateless (JWT) → duplicable horizontalement sans réécriture · à venir : Sentry APM, P95, alerting.
      </motion.p>
    </div>
  )
}
