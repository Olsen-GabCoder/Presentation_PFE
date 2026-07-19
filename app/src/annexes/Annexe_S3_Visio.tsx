import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : diagramme de séquence — l'identité reste chez nous, le média est délégué
const ACTORS = [
  { x: 210, label: 'UTILISATEUR', sub: 'PWA authentifiée', red: false },
  { x: 800, label: 'PLATEFORME', sub: 'Spring Boot', red: true },
  { x: 1390, label: 'JAAS · 8X8', sub: 'infrastructure Jitsi', red: false },
]

export default function Annexe_S3_Visio() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 4cqw 3cqh' }}>

      <svg viewBox="0 0 1600 600" style={{ width: '100%' }}>

        {/* Lignes de vie */}
        {ACTORS.map((a, i) => (
          <motion.g key={a.label} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}>
            <rect
              x={a.x - 150} y="20" width="300" height="78" rx="14"
              fill={a.red ? 'rgba(200,16,46,0.12)' : 'rgba(255,255,255,0.04)'}
              stroke={a.red ? '#c8102e' : 'rgba(255,255,255,0.35)'} strokeWidth="2"
            />
            <text x={a.x} y="55" textAnchor="middle" fill={a.red ? '#c8102e' : 'rgba(255,255,255,0.7)'} fontFamily="'JetBrains Mono', monospace" fontSize="21" fontWeight="700" letterSpacing="3">{a.label}</text>
            <text x={a.x} y="84" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">{a.sub}</text>
            <line x1={a.x} y1="98" x2={a.x} y2="560" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="7 8" />
          </motion.g>
        ))}

        {/* 1 — connexion + permissions */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9, ease }}>
          <line x1="210" y1="180" x2="780" y2="180" stroke="#fff" strokeWidth="3.5" />
          <path d="M 780 180 l -22 -12 v 24 z" fill="#fff" />
          <text x="495" y="164" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">connexion authentifiée · permissions RBAC</text>
        </motion.g>

        {/* 2 — JWT signé RS256 */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4, ease }}>
          <line x1="790" y1="280" x2="230" y2="280" stroke="#c8102e" strokeWidth="5" />
          <path d="M 230 280 l 24 -13 v 26 z" fill="#c8102e" />
          <text x="510" y="262" textAnchor="middle" fill="#ff8896" fontFamily="'JetBrains Mono', monospace" fontSize="21" fontWeight="700">JWT SIGNÉ RS256</text>
          <text x="510" y="308" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="19" fontStyle="italic">clé privée RSA en variable d’environnement — jamais exposée</text>
        </motion.g>

        {/* 3 — rejoint la salle avec le token */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.9, ease }}>
          <line x1="210" y1="390" x2="1370" y2="390" stroke="#fff" strokeWidth="3.5" />
          <path d="M 1370 390 l -22 -12 v 24 z" fill="#fff" />
          <text x="790" y="374" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">rejoint la Salle MIKA avec le token (iframe) — pas d’accès par simple URL</text>
        </motion.g>

        {/* 4 — vérification + média chiffré */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.4, ease }}>
          <rect x="1180" y="440" width="420" height="100" rx="12" fill="rgba(200,16,46,0.08)" stroke="rgba(200,16,46,0.55)" strokeWidth="2" />
          <text x="1390" y="480" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">vérifie la signature du token</text>
          <text x="1390" y="514" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="20">flux audio/vidéo chiffrés — infra spécialisée</text>
        </motion.g>

        {/* Séparation des responsabilités */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.9, ease }}>
          <line x1="1095" y1="120" x2="1095" y2="560" stroke="rgba(200,16,46,0.5)" strokeWidth="2" strokeDasharray="4 8" />
          <text x="1060" y="580" textAnchor="end" fill="#c8102e" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="700" letterSpacing="2">IDENTITÉ · CHEZ NOUS</text>
          <text x="1130" y="580" fill="rgba(255,255,255,0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="700" letterSpacing="2">MÉDIA · DÉLÉGUÉ</text>
        </motion.g>
      </svg>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.2, ease }}
        style={{
          textAlign: 'center', margin: '1.5cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Choix assumé : ne pas réinventer un serveur de visioconférence — le même modèle que les grandes suites collaboratives.
      </motion.p>
    </div>
  )
}
