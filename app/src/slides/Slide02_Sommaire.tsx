import { motion } from 'framer-motion'

const sections = [
  { num: '01', title: 'Problématique',  sub: 'BTP & fracture numérique',    img: '/images/sommaire-1.jpg' },
  { num: '02', title: 'Contexte',       sub: 'MIKA Services & le besoin',   img: '/images/sommaire-2.jpg' },
  { num: '03', title: 'État de l\'art', sub: 'Positionnement & gap',        img: '/images/sommaire-3.jpg' },
  { num: '04', title: 'Méthodologie',   sub: '10 vagues itératives',        img: '/images/sommaire-4.jpg' },
  { num: '05', title: 'Architecture',   sub: 'Conception & sécurité',       img: '/images/sommaire-5.jpg' },
  { num: '06', title: 'Réalisation',    sub: '19 modules clés',             img: '/images/sommaire-6.jpg' },
  { num: '07', title: 'Bilan',          sub: 'Validation & perspectives',   img: '/images/sommaire-7.jpg' },
]

export default function Slide02_Sommaire() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* ── Hero image — full bleed, cinematic ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-btp.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.24,
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.24 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)',
      }} />

      {/* Red accent — left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '6cqh', paddingBottom: '5cqh' }}
      >
        {/* ── Left: Title ── */}
        <div className="flex flex-col justify-between" style={{ width: '34cqw', paddingRight: '4cqw' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                fontSize: '1.2cqh', fontWeight: 600, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#c8102e', margin: 0, marginBottom: '2cqh',
              }}
            >
              Sommaire
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '6cqh', fontWeight: 800, lineHeight: 1,
                  color: '#fff', letterSpacing: '-0.035em', margin: 0,
                }}
              >
                Plan
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '6cqh', fontWeight: 800, lineHeight: 1,
                  color: '#fff', letterSpacing: '-0.035em', margin: 0,
                }}
              >
                de la
              </motion.h1>
            </div>
            <div className="overflow-hidden" style={{ marginBottom: '2.5cqh' }}>
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '6cqh', fontWeight: 800, lineHeight: 1.05,
                  letterSpacing: '-0.035em', margin: 0,
                  background: 'linear-gradient(90deg, #c8102e 0%, #e8384f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                soutenance
              </motion.h1>
            </div>

            <motion.div
              style={{ height: 3, background: '#c8102e', borderRadius: 2 }}
              initial={{ width: 0 }}
              animate={{ width: '5cqw' }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Footer removed */}
        </div>

        {/* ── Right: Sections ── */}
        <div className="flex-1 flex flex-col justify-center" style={{ gap: '0.3cqh' }}>
          {sections.map((s, i) => (
            <motion.div
              key={s.num}
              className="relative group cursor-default"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.3cqh 0',
                borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, rgba(200,16,46,0.06) 0%, transparent 60%)',
                  borderRadius: '0.5cqh',
                }}
              />

              {/* Number */}
              <span
                className="relative"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '2.8cqh',
                  fontWeight: 800,
                  color: '#c8102e',
                  minWidth: '5.5cqw',
                  lineHeight: 1,
                }}
              >
                {s.num}
              </span>

              {/* Text */}
              <div className="relative" style={{ flex: 1 }}>
                <p style={{
                  fontSize: '2cqh', fontWeight: 700, color: '#fff',
                  margin: 0, lineHeight: 1.2,
                }}>
                  {s.title}
                </p>
                <p style={{
                  fontSize: '1.1cqh', color: 'rgba(255,255,255,0.55)',
                  margin: 0, marginTop: '0.2cqh', fontWeight: 500,
                }}>
                  {s.sub}
                </p>
              </div>

              {/* Section thumbnail */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: '8cqw',
                  height: '4.5cqh',
                  borderRadius: '0.5cqh',
                  border: '1px solid rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="transition-transform duration-500 group-hover:scale-110"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.5,
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(20,20,22,0.5) 0%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
