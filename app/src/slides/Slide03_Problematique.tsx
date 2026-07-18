import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

// Problématique — composition centrée en 3 temps (fidèle à l'introduction du rapport) :
// 1. Constat macro (titre) · 2. Chiffres clés · 3. Question centrale + triple exigence
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
        background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Red accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content — centré et équilibré verticalement */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingLeft: '9cqw', paddingRight: '9cqw', paddingTop: '6cqh', paddingBottom: '7cqh', gap: '4.5cqh' }}
      >
        {/* ── 1. Titre ── */}
        <div className="overflow-hidden" style={{ textAlign: 'center' }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: '5.2cqh', fontWeight: 800, lineHeight: 1.15,
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

        {/* ── 2. Chiffres clés — 3 colonnes centrées, séparées ── */}
        <div className="flex items-stretch justify-center" style={{ gap: '3.5cqw' }}>
          {[
            { num: 20, suffix: ' ans', label: 'de productivité stagnante', sub: 'Aucune transformation numérique du secteur' },
            { num: 38, suffix: ' %', label: "d'accès internet en Afrique", sub: 'Contre 68 % dans le monde — GSMA 2024' },
            { num: 23, suffix: ' %', label: 'de couverture en zone rurale', sub: 'Contre 57 % en zone urbaine — chantiers isolés' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="flex items-stretch"
              style={{ gap: '3.5cqw' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.12)' }} />}
              <div style={{ textAlign: 'center', width: '20cqw' }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '4.6cqh', fontWeight: 800, color: '#c8102e',
                  margin: 0, lineHeight: 1,
                }}>
                  <CountUp value={s.num} suffix={s.suffix} delay={0.9 + i * 0.15} />
                </p>
                <p style={{ fontSize: '2.1cqh', fontWeight: 600, color: '#fff', margin: 0, marginTop: '0.9cqh', lineHeight: 1.25 }}>
                  {s.label}
                </p>
                <p style={{ fontSize: '1.8cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.4cqh', lineHeight: 1.3 }}>
                  {s.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 3. Question centrale + triple exigence ── */}
        <motion.div
          style={{
            background: 'rgba(200,16,46,0.07)',
            border: '1px solid rgba(200,16,46,0.18)',
            borderRadius: '1cqh',
            padding: '3cqh 3.5cqw 2.6cqh',
            position: 'relative',
            maxWidth: '78cqw',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <span style={{
            position: 'absolute', top: '-2.2cqh', left: '2.5cqw',
            fontSize: '7cqh', fontWeight: 800, color: '#c8102e', opacity: 0.35,
            fontFamily: 'Georgia, serif', lineHeight: 1,
          }}>
            {'\u201C'}
          </span>

          <p style={{
            fontSize: '2.5cqh', fontWeight: 500, color: 'rgba(255,255,255,0.94)',
            margin: 0, lineHeight: 1.5, fontStyle: 'italic',
          }}>
            Comment concevoir pour MIKA Services une plateforme web unifiée qui réponde à la fois…
          </p>

          {/* Triple exigence — cœur de la problématique du rapport */}
          <div className="flex justify-center" style={{ gap: '1.2cqw', marginTop: '2.2cqh' }}>
            {[
              { n: '01', text: 'aux exigences opérationnelles du secteur BTP' },
              { n: '02', text: 'aux contraintes infrastructurelles du Gabon' },
              { n: '03', text: "aux standards d'ingénierie internationaux" },
            ].map((e, i) => (
              <motion.div
                key={e.n}
                className="flex-1 flex flex-col items-center"
                style={{
                  padding: '1.4cqh 1.2cqw',
                  borderRadius: '0.7cqh',
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  gap: '0.6cqh',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.5cqh', fontWeight: 700, color: '#c8102e', letterSpacing: '0.15em',
                }}>
                  {e.n}
                </span>
                <span style={{ fontSize: '1.85cqh', fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3 }}>
                  {e.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
