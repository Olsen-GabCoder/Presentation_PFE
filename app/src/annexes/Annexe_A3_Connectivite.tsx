import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Quatre niveaux de cache — du terrain vers le serveur
const LAYERS = [
  { kicker: 'NIVEAU 1 · APPAREIL', title: 'Workbox (service worker)', detail: 'Coquille de l’app et assets servis hors ligne — la PWA s’ouvre sans réseau.' },
  { kicker: 'NIVEAU 2 · ÉTAT LOCAL', title: 'redux-persist', detail: 'Session et préférences survivent aux coupures et redémarrages.' },
  { kicker: 'NIVEAU 3 · DONNÉES', title: 'TanStack Query', detail: 'Données serveur en cache 5 min — affichage instantané, resynchronisation en arrière-plan.' },
  { kicker: 'NIVEAU 4 · SERVEUR', title: 'Cache Spring', detail: 'Référentiels coûteux mis en cache côté backend — moins d’allers-retours BDD.' },
]

export default function Annexe_A3_Connectivite() {
  return (
    <div className="w-full h-full flex flex-col justify-center" style={{ padding: '2cqh 5cqw 3cqh' }}>

      {/* Quatre niveaux de cache */}
      <div className="flex items-stretch" style={{ gap: '1.2cqw' }}>
        {LAYERS.map((l, i) => (
          <div key={l.kicker} className="flex items-center flex-1" style={{ gap: '1.2cqw' }}>
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
              style={{
                padding: '2.2cqh 1.6cqw', borderRadius: '1cqh', gap: '1cqh',
                background: i === 0 ? 'rgba(200,16,46,0.10)' : 'rgba(255,255,255,0.04)',
                border: i === 0 ? '1px solid rgba(200,16,46,0.55)' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.2cqh', fontWeight: 700, letterSpacing: '0.18em', color: '#c8102e',
              }}>
                {l.kicker}
              </span>
              <span style={{ fontSize: '2cqh', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {l.title}
              </span>
              <span style={{ fontSize: '1.6cqh', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                {l.detail}
              </span>
            </motion.div>
            {i < LAYERS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.18, ease }}
                style={{ fontSize: '2.6cqh', color: '#c8102e', fontWeight: 700, flexShrink: 0 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Verdict */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}
        style={{
          gap: '1.5cqw', padding: '1.6cqh 2cqw', borderRadius: '0.8cqh', marginTop: '3cqh',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 3, alignSelf: 'stretch', background: '#c8102e', borderRadius: 2 }} />
        <p style={{ fontSize: '1.7cqh', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
          <b style={{ color: '#fff' }}>4 niveaux de cache complémentaires</b> : une coupure réseau ne bloque pas la consultation,
          et le temps réel (WebSocket STOMP) <b style={{ color: '#fff' }}>se reconnecte automatiquement</b> dès le retour du réseau.
          Contrainte du contexte gabonais traitée dès l’architecture, pas en rustine.
        </p>
      </motion.div>
    </div>
  )
}
