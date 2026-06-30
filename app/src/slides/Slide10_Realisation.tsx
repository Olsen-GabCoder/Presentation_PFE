import { motion } from 'framer-motion'
import BrowserMockup from '../components/BrowserMockup'

const screens = [
  { img: '/images/screen-dashboard.png', label: 'Tableau de bord exécutif', desc: '12 projets · 71.5 Mds FCFA · KPI temps réel', url: 'mika.ga/dashboard' },
  { img: '/images/screen-projets.png', label: 'Gestion des projets', desc: '31 projets · filtres avancés · suivi budgétaire', url: 'mika.ga/projets' },
  { img: '/images/screen-equipements.png', label: 'Pilotage matériel', desc: 'Engins · mouvements · DMA · matériaux', url: 'mika.ga/equipements' },
  { img: '/images/screen-bareme.png', label: 'Barème des prix BTP', desc: '2 125 articles · import Excel · corps d\'état', url: 'mika.ga/bareme' },
]

export default function Slide10_Realisation() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '3.5cqh', paddingBottom: '2.5cqh' }}>

        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: '2cqh' }}>
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                  color: '#fff', letterSpacing: '-0.025em', margin: 0,
                }}
              >
                En production depuis{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>mars 2026</span>
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Screenshots — 2x2 grid with browser mockups */}
        <div
          className="flex-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '1cqh',
          }}
        >
          {screens.map((s, i) => (
            <motion.div
              key={i}
              className="relative group cursor-default"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrowserMockup url={s.url}>
                {/* Screenshot image */}
                <img
                  src={s.img}
                  alt={s.label}
                  className="transition-transform duration-700 group-hover:scale-105"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: 'top left',
                  }}
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%)',
                }} />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0" style={{ padding: '1.5cqh 1.5cqw' }}>
                  <p style={{
                    fontSize: '2cqh', fontWeight: 700, color: '#fff',
                    margin: 0, lineHeight: 1.15,
                    textShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontSize: '1.6cqh', color: 'rgba(255,255,255,0.6)',
                    margin: 0, marginTop: '0.3cqh',
                  }}>
                    {s.desc}
                  </p>
                </div>
              </BrowserMockup>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          style={{ fontSize: '1.7cqh', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '1cqh', textAlign: 'center', fontStyle: 'italic' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        >
          PWA bilingue FR/EN · Salle MIKA · Messagerie · Assistant IA · Mobile responsive
        </motion.p>
      </div>
    </div>
  )
}
