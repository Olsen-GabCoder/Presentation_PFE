import { motion, AnimatePresence } from 'framer-motion'
import { ANNEXES } from './index'

// Calque annexe FAQ — projeté par-dessus la slide courante pendant les questions du jury.
export default function AnnexeOverlay({ annex, onClose }: { annex: number | null; onClose: () => void }) {
  const def = annex !== null ? ANNEXES[annex] : null
  const Schema = def?.component

  return (
    <AnimatePresence>
      {def && Schema && (
        <motion.div
          className="absolute inset-0"
          style={{ background: '#141416', zIndex: 900 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Filet rouge — bord gauche, signature du deck */}
          <div className="absolute left-0 top-0 bottom-0" style={{ width: '0.3cqw', background: '#c8102e' }} />

          {/* Badge annexe + question */}
          <div
            className="absolute top-0 left-0 right-0 flex items-baseline"
            style={{ padding: '3.2cqh 4cqw 0 5cqw', gap: '1.5cqw' }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.5cqh', fontWeight: 700, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#c8102e', flexShrink: 0,
            }}>
              Annexe · {def.id}
            </span>
            <span style={{ fontSize: '2.4cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              {def.question}
            </span>
          </div>

          {/* Schéma-réponse */}
          <div className="absolute" style={{ top: '9cqh', left: 0, right: 0, bottom: 0 }}>
            <Schema />
          </div>

          {/* Fermeture au clic (secours) */}
          <div className="absolute inset-0" style={{ zIndex: 5 }} onDoubleClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
