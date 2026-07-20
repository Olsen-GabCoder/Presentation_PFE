import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Contenu inchangé — mise en forme « plan d'architecte » (blueprint).
const sections = [
  { num: '01', title: 'Problématique',  sub: 'BTP & fracture numérique' },
  { num: '02', title: 'Contexte',       sub: 'MIKA Services & le besoin' },
  { num: '03', title: 'État de l\'art', sub: 'Positionnement & gap' },
  { num: '04', title: 'Méthodologie',   sub: '10 vagues itératives' },
  { num: '05', title: 'Architecture',   sub: 'Conception & sécurité' },
  { num: '06', title: 'Réalisation',    sub: '19 modules clés' },
  { num: '07', title: 'Bilan',          sub: 'Validation & perspectives' },
]

// Répartition en deux rangées de « pièces », largeurs volontairement inégales
const ROW1 = [
  { ...sections[0], flex: 5 },
  { ...sections[1], flex: 4 },
  { ...sections[2], flex: 4.5 },
]
const ROW2 = [
  { ...sections[3], flex: 4 },
  { ...sections[4], flex: 4.5 },
  { ...sections[5], flex: 5 },
  { ...sections[6], flex: 4 },
]

const LINE = 'rgba(255,255,255,0.28)'

function Room({ s, i, flex }: { s: typeof sections[0]; i: number; flex: number }) {
  return (
    <motion.div
      className="relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1 + i * 0.14, ease }}
      style={{
        flex, minWidth: 0,
        border: `1px solid ${LINE}`,
        padding: '1.1cqh 0.9cqw',
        margin: '-0.5px', // fusion des traits mitoyens
      }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1.7cqh', fontWeight: 800, color: '#c8102e', lineHeight: 1,
        marginBottom: '0.7cqh',
      }}>
        {s.num}
      </span>
      <p style={{
        fontSize: '2.05cqh', fontWeight: 700, color: '#fff',
        margin: 0, lineHeight: 1.15,
      }}>
        {s.title}
      </p>
      <p style={{
        fontSize: '1.45cqh', color: 'rgba(255,255,255,0.6)',
        margin: 0, marginTop: '0.35cqh', fontWeight: 500, lineHeight: 1.3,
      }}>
        {s.sub}
      </p>
      {/* Croix de repère en bas à droite de la pièce */}
      <span style={{
        position: 'absolute', right: '0.5cqw', bottom: '0.6cqh',
        fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3cqh',
        color: 'rgba(255,255,255,0.22)',
      }}>+</span>
    </motion.div>
  )
}

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
          filter: 'grayscale(1)',
          opacity: 0.16,
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.16 }}
        transition={{ duration: 2.5, ease }}
      />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.45) 100%)',
      }} />

      {/* Red accent — left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex"
        style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '6cqh', paddingBottom: '5cqh' }}
      >
        {/* ── Left: Title ── */}
        <div className="flex flex-col justify-between" style={{ width: '30cqw', paddingRight: '4cqw' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.7cqh', fontWeight: 700, letterSpacing: '0.45em',
                textTransform: 'uppercase', color: '#c8102e', margin: 0, marginBottom: '2cqh',
              }}
            >
              Sommaire
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
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
                transition={{ duration: 0.8, delay: 0.6, ease }}
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
                transition={{ duration: 0.8, delay: 0.7, ease }}
                style={{
                  fontSize: '6cqh', fontWeight: 800, lineHeight: 1.05,
                  letterSpacing: '-0.035em', margin: 0,
                  color: '#c8102e',
                }}
              >
                soutenance
              </motion.h1>
            </div>

            <motion.div
              style={{ height: 3, background: '#c8102e', borderRadius: 2 }}
              initial={{ width: 0 }}
              animate={{ width: '5cqw' }}
              transition={{ duration: 0.7, delay: 1, ease }}
            />
          </div>
        </div>

        {/* ── Right: Feuille blueprint ── */}
        <motion.div
          className="flex-1 relative flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            minWidth: 0,
            border: `1.5px solid ${LINE}`,
            outline: '1px solid rgba(255,255,255,0.1)',
            outlineOffset: '0.4cqh',
            padding: '2.2cqh 1.4cqw 1.4cqh',
            // Grille millimétrée
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
              'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '1.2cqh 1.2cqh, 1.2cqh 1.2cqh, 6cqh 6cqh, 6cqh 6cqh',
          }}
        >
          {/* Cote horizontale au-dessus des pièces */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ gap: '0.6cqw', marginBottom: '1.4cqh', flexShrink: 0 }}
          >
            <span style={{ color: LINE, fontSize: '1.5cqh', lineHeight: 1 }}>|</span>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1, ease }}
              style={{ flex: 1, height: 1, background: LINE, transformOrigin: 'left' }}
            />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.35cqh',
              fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase', flexShrink: 0,
            }}>
              7 sections
            </span>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1, ease }}
              style={{ flex: 1, height: 1, background: LINE, transformOrigin: 'right' }}
            />
            <span style={{ color: LINE, fontSize: '1.5cqh', lineHeight: 1 }}>|</span>
          </motion.div>

          {/* Pièces — rangée 1 */}
          <div className="flex" style={{ flex: 1, minHeight: 0 }}>
            {ROW1.map((s, i) => <Room key={s.num} s={s} i={i} flex={s.flex} />)}
          </div>
          {/* Pièces — rangée 2 */}
          <div className="flex" style={{ flex: 1, minHeight: 0 }}>
            {ROW2.map((s, i) => <Room key={s.num} s={s} i={i + 3} flex={s.flex} />)}
          </div>

          {/* Cartouche */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            style={{
              marginTop: '1.4cqh', flexShrink: 0,
              border: `1px solid ${LINE}`,
              padding: '0.8cqh 1cqw',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.3cqh', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            }}
          >
            <span>Plan de soutenance</span>
            <span style={{ color: '#c8102e' }}>MIKA Services</span>
            <span>Éch. 1:20 · 2026</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
