import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon, Volume2, VolumeX, LayoutGrid, Play, X, MessageCircleQuestion } from 'lucide-react'
import { useRemoteSocket } from '../engine/useRemote'
import { useWakeLock } from '../engine/useWakeLock'
import { useT } from '../i18n'
import { ANNEXES } from '../annexes'

const TOTAL_SECONDS = 900 // 15 minutes

// Plan de vol : note orateur + budget-temps (secondes) par slide. Somme = 900 s.
const SLIDE_PLAN: { note: string; budget: number }[] = [
  { note: 'Saluer le jury. Sujet : plateforme web de pilotage de chantiers BTP, chez MIKA Services à Libreville.', budget: 30 },
  { note: 'Annoncer le plan en 7 parties — sans détailler, on y revient.', budget: 30 },
  { note: 'Chiffre choc : le BTP pèse 5-12 % du PIB en Afrique francophone… et reste le secteur le moins digitalisé.', budget: 15 },
  { note: '3 contraintes à concilier : exigences opérationnelles BTP, infrastructures du Gabon, standards internationaux.', budget: 60 },
  { note: 'MIKA : ~1 000 collaborateurs, 143 Md FCFA de projets — pilotés sans outil unifié. Dérouler l\u2019avant/après.', budget: 60 },
  { note: 'Aucune solution ne réunit les 5 critères : français, hors ligne, coût PME, cycle complet, adapté Afrique.', budget: 60 },
  { note: '10 vagues fonctionnelles, même cycle : audit → mockup → code → validation → production.', budget: 60 },
  { note: '3-tiers : React 19 + TypeScript / Spring Boot 4 Kotlin / PostgreSQL 17. Déployé sur Render.', budget: 60 },
  { note: '81 entités JPA en 12 sous-domaines techniques. Couches Entity → Repository → Service → Controller.', budget: 45 },
  { note: 'Sécurité multiniveau : JWT + refresh, 2FA TOTP, 13 rôles RBAC, 54 permissions, durcissement.', budget: 60 },
  { note: 'Laisser respirer : en production depuis mars 2026 — 19 domaines, 366 endpoints, ~85K lignes.', budget: 15 },
  { note: 'Visite guidée : dashboard exécutif, projets, pilotage matériel, barème. PWA bilingue FR/EN.', budget: 75 },
  { note: 'Salle MIKA : Picture-in-Picture réécrit de zéro — 1 894 lignes TypeScript, 0 dépendance npm.', budget: 45 },
  { note: 'Assistant IA contextuel : registre de guidance, prompt dynamique, streaming SSE mot par mot.', budget: 45 },
  { note: 'Workflow DMA : un processus papier digitalisé en 7 états tracés, avec matrice de rôles.', budget: 45 },
  { note: 'Validation terrain itérative avec le sponsor (M. Jribi) à chaque release — parcours critiques rejoués.', budget: 45 },
  { note: 'Limites assumées : tests, QSHE partiel, PWA vs natif — chaque compromis est justifié et mitigé.', budget: 45 },
  { note: 'Marquer une pause — laisser lire la conviction du projet.', budget: 15 },
  { note: '3 objectifs, 3 réponses : plateforme unifiée, adaptée au contexte gabonais, conforme aux standards.', budget: 45 },
  { note: 'Feuille de route claire : industrialisation des tests, QSHE, IA en production, monitoring, mobile.', budget: 30 },
  { note: 'Remercier le jury et ouvrir les questions.', budget: 15 },
]
// Instant idéal de début de chaque slide (cumul des budgets précédents)
const PLAN_START = SLIDE_PLAN.map((_, i) => SLIDE_PLAN.slice(0, i).reduce((a, s) => a + s.budget, 0))

// Poste de pilotage complet affiché sur le smartphone (?remote=1)
export default function RemoteControl() {
  const titles = useT().ui.slideNav.titles
  useWakeLock() // l'écran du téléphone ne doit jamais s'éteindre pendant la soutenance

  const [slide, setSlide] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [started, setStarted] = useState<boolean | null>(null)
  const [muted, setMuted] = useState(false)
  const [blackout, setBlackout] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)
  // Annexe actuellement projetée sur l'écran (null = aucune)
  const [annexActive, setAnnexActive] = useState<number | null>(null)

  // Chrono local resynchronisé par le battement de coeur de l'écran
  const [elapsed, setElapsed] = useState(0)
  const lastSync = useRef<{ elapsed: number; at: number } | null>(null)

  const { connected, send } = useRemoteSocket((msg) => {
    if (msg.type === 'state') {
      if (typeof msg.slide === 'number') setSlide(msg.slide)
      if (typeof msg.total === 'number') setTotal(msg.total)
      if (typeof msg.started === 'boolean') setStarted(msg.started)
      if (typeof msg.muted === 'boolean') setMuted(msg.muted)
      if (typeof msg.blackout === 'boolean') setBlackout(msg.blackout)
      setAnnexActive(typeof msg.annex === 'number' ? msg.annex : null)
      if (typeof msg.elapsed === 'number') {
        lastSync.current = { elapsed: msg.elapsed, at: Date.now() }
        setElapsed(msg.elapsed)
      }
    }
  })

  // Demande l'état courant dès la connexion
  useEffect(() => {
    if (connected) send({ type: 'cmd', action: 'sync' })
  }, [connected, send])

  // Tic local du chrono entre deux syncs
  useEffect(() => {
    const iv = setInterval(() => {
      if (lastSync.current && lastSync.current.elapsed > 0) {
        setElapsed(lastSync.current.elapsed + Math.floor((Date.now() - lastSync.current.at) / 1000))
      }
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const cmd = (action: 'next' | 'prev' | 'blackout' | 'start' | 'mute') => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action })
  }
  const goto = (n: number) => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action: 'goto', n })
    setGridOpen(false)
  }
  // Projette (n ≥ 0) ou masque (n = -1) une annexe FAQ sur l'écran
  const showAnnex = (n: number) => {
    if (navigator.vibrate) navigator.vibrate(15)
    send({ type: 'cmd', action: 'annex', n })
    setAnnexActive(n >= 0 ? n : null)
    setFaqOpen(false)
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')
  const chronoColor = elapsed >= 900 ? '#ef4444' : elapsed >= 720 ? '#f59e0b' : 'rgba(255,255,255,0.75)'

  const showSplashStart = started === false

  // Indicateur de rythme : position réelle vs plan de vol
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  let drift: { label: string; color: string } | null = null
  if (started && slide !== null && elapsed > 0 && slide < SLIDE_PLAN.length) {
    const idealStart = PLAN_START[slide]
    const idealEnd = idealStart + SLIDE_PLAN[slide].budget
    if (elapsed < idealStart) drift = { label: `avance ${fmt(idealStart - elapsed)}`, color: '#34d399' }
    else if (elapsed > idealEnd) drift = { label: `retard ${fmt(elapsed - idealEnd)}`, color: elapsed - idealEnd >= 60 ? '#ef4444' : '#f59e0b' }
    else drift = { label: 'dans les temps', color: 'rgba(255,255,255,0.45)' }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col select-none"
      style={{ background: '#0a0a0c', color: '#fff', touchAction: 'manipulation' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '14px 18px' }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <img src="/mika-logo.png" alt="MIKA" style={{ height: 20, objectFit: 'contain' }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Télécommande
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12 }}>
          {drift && (
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: drift.color }}>
              {drift.label}
            </span>
          )}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: chronoColor }}>
            {mm}:{ss}
          </span>
          {connected ? (
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
          ) : (
            <span className="flex items-center" style={{ gap: 6 }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8102e', display: 'inline-block' }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ff8896' }}>Reconnexion…</span>
            </span>
          )}
        </div>
      </div>

      {/* Barre de progression — 15 minutes */}
      <div style={{ margin: '0 18px 10px', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          width: `${Math.min(100, (elapsed / TOTAL_SECONDS) * 100)}%`,
          background: elapsed >= 900 ? '#ef4444' : elapsed >= 720 ? '#f59e0b' : '#c8102e',
          transition: 'width 1s linear',
        }} />
      </div>

      {/* Slide courante + titre + suivante */}
      <div className="flex flex-col items-center" style={{ padding: '4px 20px 14px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1, color: '#fff',
        }}>
          {slide !== null ? slide + 1 : '–'}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 22, fontWeight: 600 }}>
            {' '}/ {total ?? '–'}
          </span>
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', margin: '8px 0 0', textAlign: 'center' }}>
          {slide !== null ? titles[slide] ?? '' : 'En attente de l\u2019écran...'}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '3px 0 0', textAlign: 'center' }}>
          {slide !== null && total !== null && slide + 1 < total
            ? `Suivante : ${titles[slide + 1] ?? ''}`
            : slide !== null && total !== null ? 'Dernière slide' : ''}
        </p>
      </div>

      {/* Note orateur — message clé de la slide courante */}
      {!showSplashStart && slide !== null && SLIDE_PLAN[slide] && (
        <div style={{
          margin: '0 16px 12px', padding: '12px 14px', borderRadius: 14,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8102e',
            }}>
              Note orateur
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
              budget {fmt(SLIDE_PLAN[slide].budget)}
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.45, color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 500 }}>
            {SLIDE_PLAN[slide].note}
          </p>
        </div>
      )}

      {/* Bouton principal — Démarrer ou Suivant */}
      {showSplashStart ? (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => cmd('start')}
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            margin: '0 16px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(160deg, #1f8a4c 0%, #14532d 100%)',
            color: '#fff', cursor: 'pointer', gap: 10,
          }}
        >
          <Play style={{ width: 52, height: 52 }} strokeWidth={2} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Démarrer la présentation
          </span>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => cmd('next')}
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            margin: '0 16px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(160deg, #c8102e 0%, #8f0b21 100%)',
            color: '#fff', cursor: 'pointer',
          }}
        >
          <ChevronRight style={{ width: 60, height: 60 }} strokeWidth={2.5} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Suivant
          </span>
        </motion.button>
      )}

      {/* Rangée secondaire : Précédent + toggles */}
      <div className="flex" style={{ gap: 10, padding: '14px 16px 8px' }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => cmd('prev')}
          className="flex-1 flex items-center justify-center"
          style={{
            height: 72, borderRadius: 14, border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', gap: 8,
          }}
        >
          <ChevronLeft style={{ width: 26, height: 26 }} strokeWidth={2.5} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Précédent</span>
        </motion.button>
      </div>

      <div className="flex" style={{ gap: 10, padding: '0 16px 16px' }}>
        {[
          {
            key: 'grid', label: 'Slides', active: gridOpen,
            icon: <LayoutGrid style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => setGridOpen(true),
          },
          {
            key: 'mute', label: muted ? 'Muet' : 'Son', active: muted,
            icon: muted ? <VolumeX style={{ width: 22, height: 22 }} strokeWidth={2} /> : <Volume2 style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => cmd('mute'),
          },
          {
            key: 'blackout', label: 'Écran noir', active: blackout,
            icon: <Moon style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => cmd('blackout'),
          },
          {
            key: 'faq', label: 'FAQ jury', active: faqOpen || annexActive !== null,
            icon: <MessageCircleQuestion style={{ width: 22, height: 22 }} strokeWidth={2} />,
            onTap: () => setFaqOpen(true),
          },
        ].map((b) => (
          <motion.button
            key={b.key}
            whileTap={{ scale: 0.96 }}
            onClick={b.onTap}
            className="flex-1 flex flex-col items-center justify-center"
            style={{
              height: 68, borderRadius: 14,
              border: b.active ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.14)',
              background: b.active ? 'rgba(200,16,46,0.18)' : 'rgba(255,255,255,0.06)',
              color: b.active ? '#ff8896' : 'rgba(255,255,255,0.75)',
              cursor: 'pointer', gap: 5,
            }}
          >
            {b.icon}
            <span style={{ fontSize: 11, fontWeight: 600 }}>{b.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Bandeau annexe projetée — masquage en un geste */}
      <AnimatePresence>
        {annexActive !== null && ANNEXES[annexActive] && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => showAnnex(-1)}
            className="flex items-center justify-between"
            style={{
              margin: '0 16px 16px', padding: '12px 16px', borderRadius: 14,
              border: '1px solid rgba(200,16,46,0.6)', background: 'rgba(200,16,46,0.18)',
              color: '#fff', cursor: 'pointer', gap: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#ff8896', fontWeight: 700 }}>
                {ANNEXES[annexActive].id}
              </span>
              {' '}projetée à l’écran
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ff8896', flexShrink: 0 }}>
              Masquer
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panneau FAQ jury — annexes projetables */}
      <AnimatePresence>
        {faqOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col"
            style={{ background: '#0a0a0c', zIndex: 10 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between" style={{ padding: '16px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                FAQ jury — projeter une annexe
              </span>
              <button
                onClick={() => setFaqOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6 }}
              >
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 20px' }}>
              {[...new Set(ANNEXES.filter((a) => a.component).map((a) => a.cat))].map((cat) => (
                <div key={cat}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8102e',
                    margin: '14px 4px 8px',
                  }}>
                    {cat}
                  </p>
                  {ANNEXES.map((a, i) => {
                    if (a.cat !== cat || !a.component) return null
                    const active = i === annexActive
                    return (
                      <button
                        key={a.id}
                        onClick={() => showAnnex(active ? -1 : i)}
                        className="w-full flex items-center"
                        style={{
                          padding: '13px 14px', marginBottom: 6, borderRadius: 12, gap: 12,
                          border: active ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.08)',
                          background: active ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.04)',
                          color: '#fff', cursor: 'pointer', textAlign: 'left',
                        }}
                      >
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                          color: active ? '#ff8896' : 'rgba(255,255,255,0.4)', width: 26, flexShrink: 0,
                        }}>
                          {a.id}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{a.question}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panneau accès direct aux slides */}
      <AnimatePresence>
        {gridOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col"
            style={{ background: '#0a0a0c', zIndex: 10 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between" style={{ padding: '16px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Aller à la slide
              </span>
              <button
                onClick={() => setGridOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6 }}
              >
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 20px' }}>
              {titles.map((title, i) => {
                const active = i === slide
                return (
                  <button
                    key={i}
                    onClick={() => goto(i)}
                    className="w-full flex items-center"
                    style={{
                      padding: '13px 14px', marginBottom: 6, borderRadius: 12, gap: 12,
                      border: active ? '1px solid rgba(200,16,46,0.6)' : '1px solid rgba(255,255,255,0.08)',
                      background: active ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.04)',
                      color: '#fff', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                      color: active ? '#ff8896' : 'rgba(255,255,255,0.4)', width: 24, flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
