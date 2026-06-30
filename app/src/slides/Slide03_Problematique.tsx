import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

export default function Slide03_Problematique() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Hero image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/mika-ouvrier-macon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.12,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content — CENTRED layout */}
      <div
        className="absolute inset-0 flex flex-col items-center"
        style={{ paddingLeft: '6cqw', paddingRight: '6cqw', paddingTop: '4.5cqh', paddingBottom: '3.5cqh' }}
      >
        <div className="overflow-hidden" style={{ marginBottom: '2.5cqh', textAlign: 'center' }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.025em', margin: 0,
            }}
          >
            Le BTP d'Afrique francophone est le secteur le{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c8102e, #e8384f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              moins digitalisé au monde.
            </span>
          </motion.h1>
        </div>

        {/* ── Stats row ── */}
        <div className="flex" style={{ gap: '3cqw', marginBottom: '3.5cqh', width: '100%' }}>
          {[
            { num: 20, suffix: ' ans', label: 'de productivité stagnante dans le BTP', sub: 'Aucune transformation numérique du secteur' },
            { num: 38, suffix: ' %', label: 'd\'accès internet en Afrique', sub: 'Contre 68 % dans le monde — GSMA 2024' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="flex-1"
              style={{
                borderLeft: '2px solid rgba(200,16,46,0.4)',
                paddingLeft: '1.5cqw',
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '4.3cqh', fontWeight: 800, color: '#c8102e',
                margin: 0, lineHeight: 1,
              }}>
                <CountUp value={s.num} suffix={s.suffix} delay={0.9 + i * 0.15} />
              </p>
              <p style={{ fontSize: '2.2cqh', fontWeight: 600, color: '#fff', margin: 0, marginTop: '0.8cqh', lineHeight: 1.25 }}>
                {s.label}
              </p>
              <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.4cqh' }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Constat terrain — compact inline rows ── */}
        <motion.p
          style={{ fontSize: '1.4cqh', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0, marginBottom: '1.2cqh', alignSelf: 'flex-start' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        >
          Constat terrain
        </motion.p>

        <div className="flex" style={{ gap: '1.5cqw', marginBottom: '3cqh', width: '100%' }}>
          {[
            { tool: 'Excel', desc: 'Suivi budgétaire, planification' },
            { tool: 'WhatsApp', desc: 'Coordination sans traçabilité' },
            { tool: 'Papier', desc: 'Plans, PV, consolidation laborieuse' },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="flex-1 flex items-center"
              style={{
                padding: '1.2cqh 1.2cqw',
                borderRadius: '0.6cqh',
                borderLeft: '3px solid #c8102e',
                background: 'var(--surface-card)',
                gap: '1cqw',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{ fontSize: '2cqh', fontWeight: 700, color: '#c8102e', whiteSpace: 'nowrap' }}>
                {p.tool}
              </span>
              <span style={{ fontSize: '1.8cqh', color: 'var(--text-secondary)', fontWeight: 400 }}>
                {p.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Question centrale — full width, compact ── */}
        <motion.div
          className="w-full"
          style={{
            background: 'rgba(200,16,46,0.06)',
            border: '1px solid rgba(200,16,46,0.12)',
            borderRadius: '0.8cqh',
            padding: '2cqh 2.5cqw',
            position: 'relative',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <span style={{
            position: 'absolute', top: '-1cqh', left: '2cqw',
            fontSize: '5cqh', fontWeight: 800, color: '#c8102e', opacity: 0.15,
            fontFamily: 'Georgia, serif', lineHeight: 1,
          }}>
            {'\u201C'}
          </span>

          <p style={{
            fontSize: '2cqh', fontWeight: 500, color: 'rgba(255,255,255,0.88)',
            margin: 0, lineHeight: 1.55, fontStyle: 'italic',
          }}>
            Comment concevoir pour MIKA Services une plateforme web unifiée qui réponde aux exigences
            opérationnelles du secteur BTP, aux contraintes infrastructurelles du Gabon,
            et aux standards d'ingénierie logicielle internationaux ?
          </p>

          <div className="flex items-center" style={{ marginTop: '1.2cqh', gap: '2cqw' }}>
            <p style={{ fontSize: '1.6cqh', color: 'var(--text-muted)', margin: 0 }}>
              Solutions existantes inadaptées : coût élevé, anglophones, connectivité stable requise.
            </p>
            <div className="flex items-center" style={{ gap: '1cqw', flexShrink: 0 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2cqh', fontWeight: 800, color: '#fff' }}>57 %</span>
              <span style={{ fontSize: '1.6cqh', color: 'var(--text-muted)' }}>urbain</span>
              <div style={{ width: 1, height: '1.8cqh', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2cqh', fontWeight: 800, color: '#fff' }}>23 %</span>
              <span style={{ fontSize: '1.6cqh', color: 'var(--text-muted)' }}>rural</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
