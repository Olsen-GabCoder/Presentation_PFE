import { motion } from 'framer-motion'
import { UserPen, HardHat, BriefcaseBusiness, Truck } from 'lucide-react'
import { useT } from '../i18n'

const ease = [0.22, 1, 0.36, 1] as const

const ICONS = [UserPen, HardHat, BriefcaseBusiness, Truck]

// Ligne (rôle) active pour chacun des 7 états — transitions vérifiées dans DemandeMaterielService
const STATE_LANE = [0, 1, 2, 3, 3, 3, 3]

const N_STATES = 7
const N_LANES = 4

// Centres de cellule en % (matrice 7 colonnes × 4 lignes)
const cx = (j: number) => ((j + 0.5) / N_STATES) * 100
const cy = (i: number) => ((i + 0.5) / N_LANES) * 100

export default function Slide13_WorkflowDMA() {
  const t = useT().slide13

  // Tracé "plan de métro" en segments pleins : chaque cercle est traversé
  // horizontalement sur sa ligne, la descente verticale se fait entre deux colonnes.
  // h : y fixe (c), de x=a à x=b — v : x fixe (c), de y=a à y=b
  const segs: { dir: 'h' | 'v'; a: number; b: number; c: number }[] = []
  for (let j = 1; j < STATE_LANE.length; j++) {
    const prev = STATE_LANE[j - 1]
    const lane = STATE_LANE[j]
    if (lane === prev) {
      const last = segs[segs.length - 1]
      if (last && last.dir === 'h' && last.c === cy(lane)) last.b = cx(j)
      else segs.push({ dir: 'h', a: cx(j - 1), b: cx(j), c: cy(lane) })
    } else {
      const xm = (cx(j - 1) + cx(j)) / 2
      segs.push({ dir: 'h', a: cx(j - 1), b: xm, c: cy(prev) })
      segs.push({ dir: 'v', a: cy(prev), b: cy(lane), c: xm })
      segs.push({ dir: 'h', a: xm, b: cx(j), c: cy(lane) })
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>
      <motion.div className="absolute inset-0" style={{ backgroundImage: 'url(/images/workflow.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1)', opacity: 0.1 }}
        initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2.5, ease }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.5) 100%)' }} />
      <motion.div className="absolute left-0 top-0 bottom-0" style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, ease }} />

      <div className="absolute inset-0 flex flex-col" style={{ paddingLeft: '6cqw', paddingRight: '5cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>
        {/* Header */}
        <div className="overflow-hidden" style={{ flexShrink: 0 }}>
          <motion.h1 initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease }}
            style={{ fontSize: '4.7cqh', fontWeight: 800, lineHeight: 1.15, color: '#fff', letterSpacing: '-0.025em', margin: 0 }}>
            {t.title}{' '}
            <span style={{ background: 'linear-gradient(90deg, #c8102e, #e8384f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t.titleAccent}
            </span>
          </motion.h1>
        </div>

        {/* ── Matrice : 4 rôles (lignes) × 7 états (colonnes), trajet rouge de la demande ── */}
        <div className="flex-1 flex flex-col justify-center" style={{ minHeight: 0, paddingTop: '2cqh' }}>
          <div className="flex" style={{ gap: '1.5cqw' }}>

            {/* Colonne rôles */}
            <div className="flex flex-col" style={{ width: '17cqw', flexShrink: 0 }}>
              <div style={{ height: '7cqh', flexShrink: 0 }} />
              <div className="flex-1 flex flex-col">
                {t.roles.map((r, i) => {
                  const Icon = ICONS[i]
                  return (
                    <motion.div
                      key={r.role}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.15, ease }}
                      style={{ flex: 1, gap: '0.9cqw', minHeight: 0 }}
                    >
                      <Icon style={{ width: '3.4cqh', height: '3.4cqh', color: '#c8102e', flexShrink: 0 }} strokeWidth={1.5} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', fontWeight: 700, color: '#ff8896', margin: 0, letterSpacing: '0.05em' }}>
                          {r.role}
                        </p>
                        <p style={{ fontSize: '1.4cqh', color: 'rgba(255,255,255,0.45)', margin: '0.2cqh 0 0', lineHeight: 1.25 }}>
                          {r.action}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Grille états */}
            <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>

              {/* En-têtes des 7 états */}
              <div className="flex" style={{ height: '7cqh', flexShrink: 0 }}>
                {t.steps.map((s, j) => (
                  <motion.div
                    key={s.num}
                    className="flex flex-col items-center justify-end"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.7 + j * 0.08, ease }}
                    style={{ flex: 1, paddingBottom: '1cqh', textAlign: 'center' }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5cqh', fontWeight: 800, color: 'rgba(255,255,255,0.35)' }}>
                      0{s.num}
                    </span>
                    <span style={{ fontSize: '1.35cqh', fontWeight: 600, color: 'rgba(255,255,255,0.6)', lineHeight: 1.2, marginTop: '0.3cqh' }}>
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Zone matrice */}
              <div className="relative flex-1" style={{ minHeight: '38cqh' }}>

                {/* Séparateurs de lignes (lanes) */}
                {Array.from({ length: N_LANES + 1 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-0 right-0"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.06, ease }}
                    style={{ top: `${(i / N_LANES) * 100}%`, height: 1, background: 'rgba(255,255,255,0.09)', transformOrigin: 'left' }}
                  />
                ))}

                {/* Points d'intersection inactifs — texture de la matrice */}
                {Array.from({ length: N_LANES }).map((_, i) =>
                  Array.from({ length: N_STATES }).map((_, j) =>
                    STATE_LANE[j] === i ? null : (
                      <motion.span
                        key={`${i}-${j}`}
                        className="absolute"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.3 + (i + j) * 0.03 }}
                        style={{
                          left: `${cx(j)}%`, top: `${cy(i)}%`,
                          width: '0.7cqh', height: '0.7cqh', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )
                  )
                )}

                {/* Trajet de la demande — segments pleins animés dans l'ordre du cycle */}
                {segs.map((s, k) => {
                  const TH = '0.45cqh' // épaisseur du trait
                  const lo = Math.min(s.a, s.b)
                  const len = Math.abs(s.b - s.a)
                  return (
                    <motion.div
                      key={k}
                      className="absolute"
                      initial={{ opacity: 0, [s.dir === 'h' ? 'scaleX' : 'scaleY']: 0 }}
                      animate={{ opacity: 1, [s.dir === 'h' ? 'scaleX' : 'scaleY']: 1 }}
                      transition={{ duration: 0.3, delay: 1.8 + k * 0.28, ease }}
                      style={s.dir === 'h'
                        ? {
                            left: `calc(${lo}% - ${TH} / 2)`, width: `calc(${len}% + ${TH})`,
                            top: `calc(${s.c}% - ${TH} / 2)`, height: TH,
                            background: '#c8102e', borderRadius: TH,
                            transformOrigin: s.a <= s.b ? 'left center' : 'right center',
                          }
                        : {
                            top: `calc(${lo}% - ${TH} / 2)`, height: `calc(${len}% + ${TH})`,
                            left: `calc(${s.c}% - ${TH} / 2)`, width: TH,
                            background: '#c8102e', borderRadius: TH,
                            transformOrigin: s.a <= s.b ? 'center top' : 'center bottom',
                          }}
                    />
                  )
                })}

                {/* Nœuds actifs : où le rôle agit */}
                {STATE_LANE.map((lane, j) => (
                  <div
                    key={j}
                    className="absolute"
                    style={{
                      left: `${cx(j)}%`, top: `${cy(lane)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.9 + j * 0.2, ease }}
                      style={{
                        width: '4.4cqh', height: '4.4cqh', borderRadius: '50%',
                        background: '#141416', border: '2.5px solid #c8102e',
                        boxShadow: '0 0 1.8cqh rgba(200,16,46,0.4)',
                      }}
                    >
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.9cqh', fontWeight: 800, color: '#ff8896' }}>
                        {j + 1}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }} style={{ marginTop: '2.5cqh', flexShrink: 0 }}>
            <p style={{ fontSize: '1.8cqh', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
              {t.footer}{' '}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6cqh', padding: '0.3cqh 0.6cqw',
                background: 'rgba(255,255,255,0.05)', borderRadius: '0.4cqh', border: '1px solid rgba(255,255,255,0.08)' }}>{t.footerCode}</span>.
            </p>
            <p style={{ fontSize: '1.6cqh', color: 'rgba(255,255,255,0.4)', margin: '0.5cqh 0 0', fontStyle: 'italic', textAlign: 'center' }}>{t.footerRef}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
