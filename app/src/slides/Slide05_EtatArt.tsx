import { motion } from 'framer-motion'

const criteres = ['Français', 'Hors ligne', 'Coût PME', 'Cycle complet', 'Adapté Afrique']

const solutions = [
  {
    name: 'Procore', origin: 'USA',
    desc: '16 000 clients · 80 pays · leader mondial',
    limit: 'Anglophone, coût élevé en $, connectivité stable requise, pas de spécificités locales (FCFA, barèmes)',
    scores: [false, false, false, true, false],
  },
  {
    name: 'Oracle Aconex', origin: 'Australie',
    desc: 'Grands projets d\'infrastructure · GED collaborative',
    limit: 'Surdimensionné pour PME, coût de licence prohibitif, complexe à déployer',
    scores: [false, false, false, true, false],
  },
  {
    name: 'Buildertrend', origin: 'USA',
    desc: 'PME résidentielles · marché nord-américain',
    limit: 'Marché US exclusif, intégrations bancaires US, aucune présence en Afrique',
    scores: [false, false, true, true, false],
  },
  {
    name: 'BIM (Revit / ArchiCAD)', origin: 'International',
    desc: 'Modélisation 3D · phases conception',
    limit: 'Conception uniquement, pas de suivi opérationnel, stations graphiques requises',
    scores: [false, false, false, false, false],
  },
]

export default function Slide05_EtatArt() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-panneau-chantier.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 20%',
          opacity: 0.14,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.14 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.35) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        <div className="overflow-hidden" style={{ marginBottom: '0.8cqh' }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.025em', margin: 0,
            }}
          >
            Aucune solution existante ne réunit les{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>5 critères essentiels</span>
          </motion.h1>
        </div>

        {/* Comparison table */}
        <motion.div
          className="flex-1 flex flex-col"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1cqh',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Headers */}
          <div className="flex items-center" style={{
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            padding: '1.4cqh 2cqw',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ width: '26cqw', fontSize: '1.5cqh', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Solution
            </span>
            {criteres.map(c => (
              <span key={c} style={{
                flex: 1, textAlign: 'center',
                fontSize: '1.5cqh', fontWeight: 700, color: 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {c}
              </span>
            ))}
          </div>

          {/* Competitor rows */}
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              className="flex items-center"
              style={{
                flex: 1,
                padding: '0 2cqw',
                borderBottom: i < solutions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div style={{ width: '26cqw' }}>
                <p style={{ fontSize: '2.2cqh', fontWeight: 700, color: '#fff', margin: 0 }}>{s.name}</p>
                <p style={{ fontSize: '1.6cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '0.3cqh' }}>
                  {s.origin} · {s.desc}
                </p>
              </div>
              {s.scores.map((v, j) => (
                <span key={j} style={{ flex: 1, textAlign: 'center', fontSize: '2.6cqh' }}>
                  {v
                    ? <span style={{ color: '#4ade80' }}>&#10003;</span>
                    : <span style={{ color: 'rgba(255,80,80,0.7)' }}>&#10007;</span>
                  }
                </span>
              ))}
            </motion.div>
          ))}

          {/* Our solution row */}
          <motion.div
            className="flex items-center"
            style={{
              flexShrink: 0,
              padding: '1.8cqh 2cqw',
              background: 'rgba(200,16,46,0.10)',
              borderTop: '2px solid rgba(200,16,46,0.35)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <div style={{ width: '26cqw' }}>
              <p style={{ fontSize: '2.2cqh', fontWeight: 800, color: '#c8102e', margin: 0 }}>
                Plateforme MIKA
              </p>
              <p style={{ fontSize: '1.6cqh', color: 'rgba(255,255,255,0.50)', margin: 0, marginTop: '0.3cqh' }}>
                PWA · FR/EN · FCFA · hors ligne · barèmes locaux
              </p>
            </div>
            {criteres.map((_, j) => (
              <span key={j} style={{ flex: 1, textAlign: 'center', fontSize: '2.6cqh', color: '#4ade80' }}>
                &#10003;
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Gap synthesis */}
        <motion.p
          style={{
            fontSize: '1.8cqh', color: 'rgba(255,255,255,0.40)', margin: 0, marginTop: '1.2cqh',
            fontStyle: 'italic', textAlign: 'center',
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        >
          Aucune solution existante ne réunit ces 5 critères — d'où la nécessité de concevoir une plateforme sur mesure.
        </motion.p>
      </div>
    </div>
  )
}
