import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : entonnoir vertical — du droit (non contraignant) à la pratique (implémentée)
const PRINCIPES = ['minimisation des données', 'droit d’accès', 'sécurisation du stockage']
const PRATIQUE = ['accès limité par rôles — RBAC', 'journal d’audit des actions', 'budgets · incidents · photos protégés']

export default function Annexe_S4_RGPD() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ padding: '0 6cqw 3cqh' }}>

      {/* ── Étage 1 : le droit (large, gris, pointillé) ── */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
        style={{
          width: '92%', padding: '2cqh 2cqw', gap: '0.6cqh',
          border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '1cqh',
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)' }}>
          RGPD — RÈGLEMENT EUROPÉEN
        </span>
        <span style={{ fontSize: '2cqh', fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>
          non applicable au Gabon — aucune obligation légale
        </span>
      </motion.div>

      {/* Flèche 1 */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8, ease }}
        style={{ padding: '0.6cqh 0' }}
      >
        <div style={{ width: 3, height: '3.2cqh', background: '#c8102e' }} />
        <div style={{
          width: 0, height: 0,
          borderLeft: '1cqh solid transparent', borderRight: '1cqh solid transparent', borderTop: '1.3cqh solid #c8102e',
        }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#ff8896', marginTop: '0.5cqh' }}>
          RETENU VOLONTAIREMENT COMME RÉFÉRENTIEL
        </span>
      </motion.div>

      {/* ── Étage 2 : les principes retenus (plus étroit, rouge) ── */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.3, ease }}
        style={{
          width: '72%', padding: '2cqh 2cqw', gap: '1.2cqh',
          background: 'rgba(200,16,46,0.10)', border: '2px solid #c8102e', borderRadius: '1cqh',
        }}
      >
        <div className="flex items-center justify-center" style={{ gap: '1.2cqw', width: '100%' }}>
          {PRINCIPES.map((p) => (
            <span key={p} style={{
              padding: '0.9cqh 1.2cqw', borderRadius: '0.6cqh',
              background: 'rgba(200,16,46,0.25)', border: '1px solid rgba(200,16,46,0.7)',
              fontSize: '1.8cqh', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap',
            }}>
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Flèche 2 */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.9, ease }}
        style={{ padding: '0.6cqh 0' }}
      >
        <div style={{ width: 3, height: '3.2cqh', background: '#c8102e' }} />
        <div style={{
          width: 0, height: 0,
          borderLeft: '1cqh solid transparent', borderRight: '1cqh solid transparent', borderTop: '1.3cqh solid #c8102e',
        }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', color: '#ff8896', marginTop: '0.5cqh' }}>
          TRADUIT DANS LA PLATEFORME
        </span>
      </motion.div>

      {/* ── Étage 3 : le concret (encore plus étroit, plein) ── */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.4, ease }}
        style={{
          width: '56%', padding: '2cqh 1.5cqw', gap: '1.2cqw',
          background: '#341920', border: '2px solid #c8102e', borderRadius: '1cqh',
        }}
      >
        <div className="flex flex-col" style={{ gap: '1cqh' }}>
          {PRATIQUE.map((p) => (
            <div key={p} className="flex items-center" style={{ gap: '0.8cqw' }}>
              <span style={{ color: '#c8102e', fontSize: '1.8cqh', fontWeight: 800 }}>✓</span>
              <span style={{ fontSize: '1.8cqh', fontWeight: 600, color: '#fff' }}>{p}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '3cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)', maxWidth: '80%',
        }}
      >
        Se conformer sans y être contraint : standards internationaux dès aujourd’hui, exigences futures déjà couvertes.
      </motion.p>
    </div>
  )
}
