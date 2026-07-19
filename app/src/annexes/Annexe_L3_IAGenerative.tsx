import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : cercles concentriques — le cœur du travail est personnel, l'IA reste en périphérie, sous contrôle
const PERIPHERIE = [
  { label: 'mise en forme', x: 800, y: 82 },
  { label: 'suggestions de formulations', x: 1105, y: 200 },
  { label: 'gabarits techniques', x: 1105, y: 420 },
  { label: 'relecture', x: 800, y: 538 },
  { label: 'diagrammes · mise en page', x: 495, y: 420 },
  { label: 'aide ponctuelle', x: 495, y: 200 },
]

export default function Annexe_L3_IAGenerative() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 4cqw 3cqh' }}>

      <svg viewBox="0 0 1600 620" style={{ width: '100%' }}>

        {/* Cercle périphérie (IA en appui) */}
        <motion.circle
          cx="800" cy="310" r="285"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="8 9"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2, ease }}
        />
        {/* Cœur : 100 % personnel */}
        <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3, ease }} style={{ transformOrigin: '800px 310px' }}>
          <circle cx="800" cy="310" r="168" fill="rgba(200,16,46,0.14)" stroke="#c8102e" strokeWidth="4" />
          <text x="800" y="248" textAnchor="middle" fill="#c8102e" fontFamily="'JetBrains Mono', monospace" fontSize="21" fontWeight="700" letterSpacing="4">100 % PERSONNEL</text>
          <text x="800" y="296" textAnchor="middle" fill="#fff" fontSize="25" fontWeight="800">architecture de la plateforme</text>
          <text x="800" y="334" textAnchor="middle" fill="#fff" fontSize="25" fontWeight="800">choix de conception</text>
          <text x="800" y="372" textAnchor="middle" fill="#fff" fontSize="25" fontWeight="800">raisonnement · analyse · conclusions</text>
        </motion.g>

        {/* Satellites IA en périphérie */}
        {PERIPHERIE.map((p, i) => (
          <motion.g key={p.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.5 + i * 0.15, ease }}>
            <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <text
              x={p.x} y={p.y < 310 ? p.y - 22 : p.y + 40} textAnchor="middle"
              fill="rgba(255,255,255,0.6)" fontSize="22" fontWeight="600"
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* Étiquette du cercle périphérie */}
        <motion.text
          x="800" y="40" textAnchor="middle"
          fill="rgba(255,255,255,0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="19" fontWeight="700" letterSpacing="4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3, ease }}
        >
          IA EN APPUI — PONCTUEL · ENCADRÉ
        </motion.text>

        {/* Garde-fous : la frontière contrôlée */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.6, ease }}>
          <rect x="1245" y="245" width="330" height="130" rx="12" fill="rgba(200,16,46,0.08)" stroke="rgba(200,16,46,0.55)" strokeWidth="2" />
          <text x="1410" y="283" textAnchor="middle" fill="#ff8896" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="700" letterSpacing="3">GARDE-FOUS</text>
          <text x="1410" y="316" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">chaque élément vérifié et validé</text>
          <text x="1410" y="348" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="20">sources citées · annexe A (p. 126)</text>
          <line x1="1245" y1="310" x2="1092" y2="310" stroke="rgba(200,16,46,0.55)" strokeWidth="2" strokeDasharray="5 6" />
        </motion.g>
      </svg>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3, ease }}
        style={{
          textAlign: 'center', margin: '1.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        L’IA n’entre jamais dans le cœur : aucune partie du raisonnement déléguée — l’auteur assume l’entière responsabilité scientifique du travail.
      </motion.p>
    </div>
  )
}
