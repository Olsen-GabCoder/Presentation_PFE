import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const REASONS = [
  {
    kicker: 'VS JAVA',
    title: 'Null-safety à la compilation',
    detail: 'Toute une classe d’erreurs (NullPointerException) éliminée avant l’exécution. Syntaxe concise : data classes, valeurs par défaut.',
  },
  {
    kicker: 'VS NODE.JS',
    title: 'Typage fort + écosystème Spring',
    detail: 'Spring Boot, Spring Security, JPA : des briques éprouvées pour un backend d’entreprise à 81 entités — pas à réinventer.',
  },
  {
    kicker: 'PARI GAGNANT',
    title: '100 % interopérable JVM',
    detail: 'Tout l’écosystème Java reste disponible. Kotlin est le choix officiel de Spring et de Google — pérennité assurée.',
  },
]

export default function Annexe_A1_Kotlin() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* Trois raisons */}
      <div className="flex items-stretch" style={{ gap: '1.5cqw' }}>
        {REASONS.map((r, i) => (
          <motion.div
            key={r.kicker}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
            style={{
              padding: '2.4cqh 1.8cqw', borderRadius: '1cqh', gap: '1.2cqh',
              background: i === 2 ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
              border: i === 2 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.25em', color: '#c8102e',
            }}>
              {r.kicker}
            </span>
            <span style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {r.title}
            </span>
            <span style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              {r.detail}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          Résultat mesurable : un backend de <b style={{ color: '#fff' }}>366 endpoints</b> maintenu par un seul développeur,
          avec la robustesse de la JVM et <b style={{ color: '#fff' }}>moins de code à écrire et à relire</b> qu’en Java.
        </p>
      </motion.div>
    </div>
  )
}
