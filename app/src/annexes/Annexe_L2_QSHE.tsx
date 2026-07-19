import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : le bâtiment en coupe — structure porteuse achevée, pièces aménagées vs pièces en attente
const AMENAGE = ['Déclaration d’incidents', 'Inspections', 'Actions correctives', 'GED documentaire']
const EN_ATTENTE = ['Conformité environnementale', 'Évaluation des risques par projet']

export default function Annexe_L2_QSHE() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 8cqw 3cqh' }}>

      {/* ── Le bâtiment ── */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}
        style={{ border: '3px solid #c8102e', borderRadius: '1cqh', overflow: 'hidden' }}
      >
        {/* Toit : la structure */}
        <div className="flex items-center justify-center" style={{ padding: '1.4cqh 0', background: 'rgba(200,16,46,0.15)', borderBottom: '2px solid #c8102e' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.28em', color: '#fff' }}>
            MODULE QSHE — STRUCTURE PORTEUSE ACHEVÉE
          </span>
        </div>

        {/* Étage 1 : pièces aménagées */}
        <div className="flex" style={{ borderBottom: '2px solid rgba(200,16,46,0.5)' }}>
          {AMENAGE.map((p, i) => (
            <motion.div
              key={p}
              className="flex-1 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.8 + i * 0.18, ease }}
              style={{
                padding: '3cqh 0.8cqw', gap: '0.7cqh',
                background: 'rgba(200,16,46,0.08)',
                borderRight: i < AMENAGE.length - 1 ? '2px solid rgba(200,16,46,0.5)' : 'none',
              }}
            >
              <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#c8102e' }}>✓</span>
              <span style={{ fontSize: '1.8cqh', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>{p}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                OPÉRATIONNEL
              </span>
            </motion.div>
          ))}
        </div>

        {/* Étage 2 : pièces en attente d'aménagement */}
        <div className="flex">
          {EN_ATTENTE.map((p, i) => (
            <motion.div
              key={p}
              className="flex-1 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.7 + i * 0.2, ease }}
              style={{
                padding: '3cqh 0.8cqw', gap: '0.7cqh',
                borderRight: i < EN_ATTENTE.length - 1 ? '2px solid rgba(200,16,46,0.5)' : 'none',
                backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 20px)',
              }}
            >
              <span style={{ fontSize: '1.9cqh', fontWeight: 700, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.3 }}>{p}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                CRUD DE BASE — EN ATTENTE D’AMÉNAGEMENT
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* La clé manquante */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.4, ease }}
        style={{ gap: '1.2cqw', marginTop: '2.5cqh' }}
      >
        <div style={{
          width: 0, height: 0, transform: 'rotate(180deg)',
          borderLeft: '0.9cqh solid transparent', borderRight: '0.9cqh solid transparent', borderTop: '1.2cqh solid #c8102e',
        }} />
        <span style={{ fontSize: '1.9cqh', fontWeight: 700, color: '#fff' }}>
          Ce qui manque n’est pas du code —
          <span style={{ color: '#ff8896' }}> ce sont les règles métier, à spécifier avec les responsables QSHE</span>
        </span>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.9, ease }}
        style={{
          textAlign: 'center', margin: '2cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        L’architecture accueille la suite sans modification structurelle. Prioriser les 17 autres domaines pleinement utilisables : le bon arbitrage, documenté au chapitre 5.
      </motion.p>
    </div>
  )
}
