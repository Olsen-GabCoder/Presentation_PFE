import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Schéma : deux trajectoires — via l'interface (passe) et en contournant l'UI (bloquée 403 par le backend)
export default function Annexe_S2_RBAC() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '0 4cqw 3cqh' }}>

      <svg viewBox="0 0 1600 660" style={{ width: '100%' }}>

        {/* Modèle : 13 rôles · 54 permissions — alimente le mur */}
        <motion.g initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.4, ease }}>
          <rect x="790" y="20" width="340" height="64" rx="12" fill="rgba(200,16,46,0.12)" stroke="rgba(200,16,46,0.6)" strokeWidth="2" />
          <text x="960" y="60" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="800">13 rôles · 54 permissions</text>
          <line x1="960" y1="84" x2="960" y2="130" stroke="rgba(200,16,46,0.7)" strokeWidth="3" strokeDasharray="7 6" />
        </motion.g>

        {/* Utilisateur */}
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }} style={{ transformOrigin: '120px 330px' }}>
          <circle cx="120" cy="330" r="78" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
          <text x="120" y="338" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">UTILISATEUR</text>
        </motion.g>

        {/* Frontend — adapte */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4, ease }}>
          <rect x="420" y="190" width="270" height="280" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="10 8" />
          <text x="555" y="240" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="'JetBrains Mono', monospace" fontSize="22" fontWeight="700" letterSpacing="4">FRONTEND</text>
          <text x="555" y="285" textAnchor="middle" fill="#fff" fontSize="23" fontWeight="700">adapte l’interface</text>
          <text x="555" y="330" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="20">routes gardées</text>
          <text x="555" y="362" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="20">boutons masqués</text>
          <text x="555" y="424" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="19" fontStyle="italic">= confort, pas une sécurité</text>
        </motion.g>

        {/* Backend — le mur qui applique */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease }}>
          <rect x="925" y="130" width="70" height="440" rx="14" fill="rgba(200,16,46,0.35)" stroke="#c8102e" strokeWidth="3" />
          {/* Porte dans le mur */}
          <rect x="925" y="270" width="70" height="60" fill="#141416" stroke="#c8102e" strokeWidth="2" />
          <text x="1080" y="615" textAnchor="middle" fill="#c8102e" fontFamily="'JetBrains Mono', monospace" fontSize="21" fontWeight="700" letterSpacing="3">SPRING SECURITY</text>
          <text x="1080" y="643" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="19">contrôle sur 366 endpoints</text>
        </motion.g>

        {/* Données */}
        <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8, ease }} style={{ transformOrigin: '1440px 300px' }}>
          <ellipse cx="1440" cy="240" rx="105" ry="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
          <path d="M 1335 240 V 360 A 105 28 0 0 0 1545 360 V 240" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
          <text x="1440" y="330" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800">DONNÉES</text>
        </motion.g>

        {/* Trajet 1 : via l'interface — traverse la porte */}
        <motion.path
          d="M 200 300 H 420 M 690 300 H 925 M 995 300 H 1320"
          fill="none" stroke="#c8102e" strokeWidth="6" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 1, ease }}
        />
        <motion.path
          d="M 1320 300 l -26 -15 v 30 z"
          fill="#c8102e"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 2.1, ease }}
        />
        <motion.text
          x="795" y="270" textAnchor="middle" fill="#ff8896" fontFamily="'JetBrains Mono', monospace" fontSize="20" fontWeight="700"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 2.2, ease }}
        >
          permission ✓
        </motion.text>

        {/* Trajet 2 : contournement de l'UI — s'écrase sur le mur */}
        <motion.path
          d="M 160 400 C 380 560 700 560 900 480"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeDasharray="12 10"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.4, ease }}
        />
        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 3.3, ease }} style={{ transformOrigin: '918px 472px' }}>
          <text x="918" y="490" textAnchor="middle" fill="#c8102e" fontSize="46" fontWeight="800">✕</text>
          <rect x="815" y="505" width="90" height="42" rx="8" fill="#c8102e" />
          <text x="860" y="534" textAnchor="middle" fill="#fff" fontFamily="'JetBrains Mono', monospace" fontSize="24" fontWeight="800">403</text>
        </motion.g>
        <motion.text
          x="520" y="560" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="20" fontStyle="italic"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 2.9, ease }}
        >
          appel direct de l’API, interface contournée
        </motion.text>
      </svg>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 3.6, ease }}
        style={{
          textAlign: 'center', margin: '1cqh 0 0', fontSize: '1.6cqh', fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Le frontend adapte, le backend applique — chaque requête est revalidée côté serveur : on vérifie la permission, jamais le rôle en dur.
      </motion.p>
    </div>
  )
}
