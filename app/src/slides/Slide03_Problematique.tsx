import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Problématique — lecture verticale en 3 bandes : Constat → Obstacle → Question.
// Chiffres du rapport (chap. 1) : 5–12 % PIB (Banque mondiale 2024),
// 38/68 % accès Internet et 23/57 % couverture mobile (GSMA · UIT 2024).

function MiniBar({ label, value, color, delay }: {
  label: string; value: number; color: string; delay: number
}) {
  return (
    <div className="flex items-center" style={{ gap: '0.8cqw' }}>
      <span style={{
        fontSize: '1.7cqh', fontWeight: 600, color: 'rgba(255,255,255,0.65)',
        width: '4.5cqw', flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1.7cqh', background: 'rgba(255,255,255,0.07)', borderRadius: '0.35cqh', overflow: 'hidden' }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay, ease }}
          style={{
            width: `${value}%`, height: '100%',
            background: color, transformOrigin: 'left', borderRadius: '0.35cqh',
          }}
        />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1.9cqh', fontWeight: 800, color,
        width: '3.6cqw', flexShrink: 0, textAlign: 'right',
      }}>
        {value}%
      </span>
    </div>
  )
}

function BandLabel({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      style={{ width: '11cqw', flexShrink: 0, gap: '0.4cqh' }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4cqh',
        fontWeight: 800, color: '#c8102e', letterSpacing: '0.15em',
      }}>
        {num}
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '1.75cqh', fontWeight: 700,
        letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff',
      }}>
        {label}
      </span>
    </motion.div>
  )
}

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
        transition={{ duration: 2.5, ease }}
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
        transition={{ duration: 1.2, ease }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '6cqw', paddingTop: '4cqh', paddingBottom: '4cqh' }}
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.7cqh', fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c8102e', margin: 0, marginBottom: '2cqh',
            flexShrink: 0,
          }}
        >
          Problématique
        </motion.p>

        {/* ── Bande 1 : FRACTURE — barre empilée GSMA (rapport fig. 1) ── */}
        <div className="flex items-center" style={{ flex: 10, minHeight: 0, gap: '2.5cqw' }}>
          <BandLabel num="01" label="Fracture" delay={0.5} />
          <div className="flex flex-col" style={{ flex: 1, gap: '1.2cqh' }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6, ease }}
              style={{ fontSize: '2.5cqh', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}
            >
              En Afrique subsaharienne, seuls{' '}
              <span style={{ color: '#e8384f' }}>27 % des habitants utilisent l'internet mobile.</span>
            </motion.p>
            {/* Barre empilée 27 / 60 / 13 */}
            <div className="flex" style={{ height: '3.4cqh', borderRadius: '0.6cqh', overflow: 'hidden', gap: 2 }}>
              {[
                { v: 27, c: '#34d399', delay: 0.85 },
                { v: 60, c: '#fbbf24', delay: 1.0 },
                { v: 13, c: '#e8384f', delay: 1.15 },
              ].map((seg) => (
                <motion.div
                  key={seg.c}
                  className="flex items-center justify-center"
                  initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: seg.delay, ease }}
                  style={{
                    width: `${seg.v}%`, background: `${seg.c}26`,
                    border: `1px solid ${seg.c}66`, transformOrigin: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.9cqh', fontWeight: 800, color: seg.c,
                  }}>
                    {seg.v} %
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Légende des segments */}
            <motion.div
              className="flex"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {[
                { v: 27, t: 'Connectés', s: '≈ 320 M' },
                { v: 60, t: 'Couverts mais non-utilisateurs', s: '≈ 710 M — écart d\'usage' },
                { v: 13, t: 'Non couverts', s: '≈ 160 M' },
              ].map((l) => (
                <div key={l.t} style={{ width: `${l.v}%`, minWidth: 0, paddingRight: '0.8cqw' }}>
                  <p style={{ fontSize: '1.7cqh', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.2 }}>
                    {l.t}
                  </p>
                  <p style={{ fontSize: '1.5cqh', color: 'var(--text-muted)', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
                    {l.s}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          style={{ height: 1, background: 'rgba(255,255,255,0.12)', transformOrigin: 'left', flexShrink: 0 }}
        />

        {/* ── Bande 2 : OBSTACLE ── */}
        <div className="flex items-center" style={{ flex: 10, minHeight: 0, gap: '2.5cqw' }}>
          <BandLabel num="02" label="Terrain" delay={1.1} />
          <div className="flex items-center" style={{ flex: 1, gap: '4cqw' }}>
            {/* Accès Internet */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.25, ease }}
              style={{ flex: 1, gap: '0.9cqh' }}
            >
              <p style={{ fontSize: '2cqh', fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                Accès à Internet
              </p>
              <MiniBar label="Afrique" value={38} color="#e8384f" delay={1.45} />
              <MiniBar label="Monde" value={68} color="rgba(255,255,255,0.5)" delay={1.6} />
            </motion.div>
            {/* Couverture mobile */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.4, ease }}
              style={{ flex: 1, gap: '0.9cqh' }}
            >
              <p style={{ fontSize: '2cqh', fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                Couverture mobile en Afrique{' '}
                <span style={{ fontWeight: 500, color: 'var(--text-muted)', fontSize: '1.7cqh' }}>
                  — les chantiers sont en zone rurale
                </span>
              </p>
              <MiniBar label="Rural" value={23} color="#e8384f" delay={1.6} />
              <MiniBar label="Urbain" value={57} color="rgba(255,255,255,0.5)" delay={1.75} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.9 }}
              style={{
                fontSize: '1.5cqh', color: 'var(--text-muted)', margin: 0,
                fontFamily: "'JetBrains Mono', monospace", writingMode: 'vertical-rl',
                flexShrink: 0,
              }}
            >
              GSMA · UIT 2024
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.7, ease }}
          style={{ height: 1, background: 'rgba(255,255,255,0.12)', transformOrigin: 'left', flexShrink: 0 }}
        />

        {/* ── Bande 3 : QUESTION — composition typographique ── */}
        <div className="flex items-center" style={{ flex: 12, minHeight: 0, gap: '2.5cqw' }}>
          <BandLabel num="03" label="Question" delay={1.9} />
          <div className="flex items-center" style={{ flex: 1, gap: '3.5cqw' }}>

            {/* La question — grande italique avec guillemet */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.05, ease }}
              style={{ flex: 11, minWidth: 0, paddingLeft: '2.4cqw' }}
            >
              <span style={{
                position: 'absolute', left: 0, top: '-1.6cqh',
                fontSize: '8cqh', fontWeight: 800, color: '#c8102e', opacity: 0.5,
                fontFamily: 'Georgia, serif', lineHeight: 1,
              }}>
                {'\u201C'}
              </span>
              <p style={{
                fontSize: '2.9cqh', fontWeight: 500, color: '#fff',
                margin: 0, lineHeight: 1.5, fontStyle: 'italic',
              }}>
                Comment concevoir pour MIKA Services une{' '}
                <span style={{ fontWeight: 700, color: '#e8384f', fontStyle: 'normal' }}>
                  plateforme web unifiée
                </span>{' '}
                qui réponde à la fois…
              </p>
            </motion.div>

            {/* Les 3 exigences — liste typographique à filets rouges */}
            <div className="flex flex-col" style={{ flex: 10, minWidth: 0, gap: '1.5cqh' }}>
              {[
                { n: '01', text: 'aux exigences opérationnelles du secteur BTP' },
                { n: '02', text: 'aux contraintes infrastructurelles du Gabon' },
                { n: '03', text: "aux standards d'ingénierie internationaux" },
              ].map((e, i) => (
                <motion.div
                  key={e.n}
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.3 + i * 0.16, duration: 0.5, ease }}
                  style={{
                    gap: '1cqw',
                    borderLeft: '3px solid #c8102e',
                    paddingLeft: '1.1cqw',
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.6cqh', fontWeight: 800, color: '#c8102e',
                    flexShrink: 0,
                  }}>
                    {e.n}
                  </span>
                  <span style={{ fontSize: '2.05cqh', fontWeight: 600, color: 'rgba(255,255,255,0.92)', lineHeight: 1.3 }}>
                    {e.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
