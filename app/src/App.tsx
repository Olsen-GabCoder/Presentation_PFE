import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize, Minimize, Volume2, VolumeX } from 'lucide-react'
import { usePresentationEngine, PHASE_DURATIONS } from './engine/usePresentationEngine'
import { useT } from './i18n'
import { useFullscreen } from './engine/useFullscreen'
import { useIdleCursor } from './engine/useIdleCursor'
import { useWakeLock } from './engine/useWakeLock'
import { useMousePosition } from './engine/useMousePosition'
import { useSound } from './engine/useSound'
import GraduateCharacter from './components/GraduateCharacter'
import CelebrationEffect from './components/CelebrationEffect'
import LightFixture from './components/LightFixture'
import WarmLighting from './components/WarmLighting'
import DarkOverlay from './components/DarkOverlay'
import CursorSpotlight from './components/CursorSpotlight'
import RemoteQR from './components/RemoteQR'
import { useRemoteSocket } from './engine/useRemote'
import Slide01_Cover from './slides/Slide01_Cover'
import Slide02_Sommaire from './slides/Slide02_Sommaire'
import StatementA_Chiffre from './slides/StatementA_Chiffre'
import Slide03_Problematique from './slides/Slide03_Problematique'
import Slide04_Contexte from './slides/Slide04_Contexte'
import Slide05_EtatArt from './slides/Slide05_EtatArt'
import Slide06_Methodologie from './slides/Slide06_Methodologie'
import Slide07_Architecture from './slides/Slide07_Architecture'
import Slide08_Conception from './slides/Slide08_Conception'
import Slide09_Securite from './slides/Slide09_Securite'
import StatementB_Production from './slides/StatementB_Production'
import Slide10_Realisation from './slides/Slide10_Realisation'
import Slide11_SalleMika from './slides/Slide11_SalleMika'
import Slide12_MikaAssistant from './slides/Slide12_MikaAssistant'
import Slide13_WorkflowDMA from './slides/Slide13_WorkflowDMA'
import Slide14_Validation from './slides/Slide14_Validation'
import Slide15_Limites from './slides/Slide15_Limites'
import StatementC_Citation from './slides/StatementC_Citation'
import Slide16_Conclusion from './slides/Slide16_Conclusion'
import Slide17_Perspectives from './slides/Slide17_Perspectives'
import Slide18_Merci from './slides/Slide18_Merci'

const slides = [
  Slide01_Cover, Slide02_Sommaire, StatementA_Chiffre, Slide03_Problematique,
  Slide04_Contexte, Slide05_EtatArt, Slide06_Methodologie, Slide07_Architecture,
  Slide08_Conception, Slide09_Securite, StatementB_Production, Slide10_Realisation,
  Slide11_SalleMika, Slide12_MikaAssistant, Slide13_WorkflowDMA, Slide14_Validation,
  Slide15_Limites, StatementC_Citation, Slide16_Conclusion, Slide17_Perspectives,
  Slide18_Merci,
]

// Section indicator mapping: slide index → section label (null = hidden)
const SECTION_MAP: (string | null)[] = [
  null,                      // 0  Cover
  null,                      // 1  Sommaire
  '01 · Problématique',      // 2  Statement A
  '01 · Problématique',      // 3  Problématique
  '02 · Contexte',           // 4  Contexte
  '03 · État de l\'art',     // 5  État de l'art
  '04 · Méthodologie',       // 6  Méthodologie
  '05 · Architecture',       // 7  Architecture
  '05 · Architecture',       // 8  Conception
  '05 · Architecture',       // 9  Sécurité
  '06 · Réalisation',        // 10 Statement B
  '06 · Réalisation',        // 11 Réalisation
  '06 · Réalisation',        // 12 Salle MIKA
  '06 · Réalisation',        // 13 Mika Assistant
  '06 · Réalisation',        // 14 Workflow DMA
  '07 · Bilan',              // 15 Validation
  '07 · Bilan',              // 16 Limites
  '07 · Bilan',              // 17 Statement C
  '07 · Bilan',              // 18 Conclusion
  '07 · Bilan',              // 19 Perspectives
  null,                      // 20 Merci
]

const PULL_DUR = PHASE_DURATIONS.pulling / 1000
const GRAB_DUR = PHASE_DURATIONS.grabbing / 1000

// The page should NOT react during the first ~60% of the grab (arm extending).
// Only at the "contact" moment (last ~40%) does the page start to respond.
const GRAB_CONTACT_DELAY = GRAB_DUR * 0.55  // page reacts after 55% of grab phase
const GRAB_REACT_DUR = GRAB_DUR * 0.45      // remaining 45% for page reaction

// ── Images to preload during intro (while screen is dark) ──
const PRELOAD_IMAGES = [
  // Backgrounds
  '/images/hero-btp.jpg', '/images/problematique.jpg', '/images/contexte.jpg',
  '/images/etatart.jpg', '/images/methodologie.jpg', '/images/architecture.jpg',
  '/images/securite.jpg', '/images/workflow.jpg', '/images/bg-assistant.jpg',
  '/images/validation.jpg', '/images/limites.jpg', '/images/conclusion.jpg',
  '/images/perspectives.jpg', '/images/merci.jpg',
  // Sommaire thumbnails
  '/images/sommaire-1.jpg', '/images/sommaire-2.jpg', '/images/sommaire-3.jpg',
  '/images/sommaire-4.jpg', '/images/sommaire-5.jpg', '/images/sommaire-6.jpg',
  '/images/sommaire-7.jpg',
  // Screenshots (heavy PNGs)
  '/images/salle-immersif.png', '/images/salle-pip.png',
  '/images/screen-dashboard.png', '/images/screen-projets.png',
  '/images/screen-equipements.png', '/images/screen-bareme.png',
  '/images/screen-assistant-open.png',
]

// Skip splash if restoring a session (user was already past slide 0)
function getRestoredStart(): boolean {
  try {
    const v = sessionStorage.getItem('mika-slide')
    return v !== null && parseInt(v, 10) > 0
  } catch { return false }
}

export default function App() {
  const [started, setStarted] = useState(() => getRestoredStart())
  const engine = usePresentationEngine(started)
  const fullscreen = useFullscreen()
  const mouseX = useMousePosition()
  const sound = useSound()
  useIdleCursor(2500)
  useWakeLock()

  const handleStart = () => {
    fullscreen.enter()
    setStarted(true)
  }

  const [blackout, setBlackout] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // ── Télécommande smartphone — commandes entrantes + URL du QR code ──
  const [remoteUrl, setRemoteUrl] = useState<string | null>(null)
  const remote = useRemoteSocket((msg) => {
    if (msg.type === 'hello') {
      if (window.location.protocol === 'https:') {
        // Prod : le téléphone passe par la même URL publique
        setRemoteUrl(`${window.location.origin}/?remote=1`)
      } else if (msg.ips?.length) {
        // Local : URL LAN du laptop (le téléphone doit être sur le même réseau)
        const port = window.location.port || '5173'
        setRemoteUrl(`http://${msg.ips[0]}:${port}/?remote=1`)
      }
    } else if (msg.type === 'cmd') {
      if (msg.action === 'next') engine.next()
      else if (msg.action === 'prev') engine.prev()
      else if (msg.action === 'goto' && typeof msg.n === 'number') engine.goToSlide(msg.n)
      else if (msg.action === 'blackout') setBlackout((b) => !b)
      else if (msg.action === 'start') { setStarted(true) }
      else if (msg.action === 'mute') sound.toggleMute()
      else if (msg.action === 'sync') sendState()
    }
  })
  // Chrono de présentation (partagé avec le téléphone)
  const presStart = useRef<number | null>(null)
  if (engine.introComplete && presStart.current === null) presStart.current = Date.now()
  const sendState = () => {
    remote.send({
      type: 'state',
      slide: engine.currentSlide, total: engine.totalSlides,
      started, muted: sound.muted, blackout,
      elapsed: presStart.current ? Math.floor((Date.now() - presStart.current) / 1000) : 0,
    })
  }
  const sendStateRef = useRef(sendState)
  sendStateRef.current = sendState
  // Diffuse l'état vers le téléphone à chaque changement + battement de coeur (resync chrono)
  useEffect(() => {
    sendStateRef.current()
  }, [engine.currentSlide, started, sound.muted, blackout, remote.connected])
  useEffect(() => {
    const iv = setInterval(() => sendStateRef.current(), 5000)
    return () => clearInterval(iv)
  }, [])
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)
  const [goToBuffer, setGoToBuffer] = useState('')
  const goToTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sound triggers — react to phase changes
  const prevPhase = useRef(engine.characterPhase)
  const prevLights = useRef(engine.lightsOn)
  useEffect(() => {
    // Light switch sound
    if (engine.lightsOn !== prevLights.current) {
      sound.playSwitch()
      prevLights.current = engine.lightsOn
    }
    // Celebrate sound
    if (engine.characterPhase === 'celebrating' && prevPhase.current !== 'celebrating') {
      sound.playCelebrate()
    }
    prevPhase.current = engine.characterPhase
  }, [engine.characterPhase, engine.lightsOn, sound])

  // Page turn sound — au début de chaque transition, quel que soit son type
  const prevTransitioning = useRef(false)
  useEffect(() => {
    if (engine.isTransitioning && !prevTransitioning.current && !engine.isFinalTransition) {
      sound.playPageTurn()
    }
    prevTransitioning.current = engine.isTransitioning
  }, [engine.isTransitioning, engine.isFinalTransition, sound])

  // Preload all slide images on mount — decode happens while intro plays
  useEffect(() => {
    PRELOAD_IMAGES.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Double-click on any <img> → zoom fullscreen
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.tagName === 'IMG' && el.getAttribute('src')) {
        e.preventDefault()
        setZoomedImg(el.getAttribute('src'))
      }
    }
    window.addEventListener('dblclick', handler)
    return () => window.removeEventListener('dblclick', handler)
  }, [])

  // Blackout + Help + Go-to-slide overlays
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Go-to-slide: digits accumulate, Enter jumps
      if (e.key >= '0' && e.key <= '9' && !showHelp && !blackout) {
        e.preventDefault()
        setGoToBuffer(prev => {
          const next = (prev + e.key).slice(-2)
          if (goToTimer.current) clearTimeout(goToTimer.current)
          goToTimer.current = setTimeout(() => setGoToBuffer(''), 1500)
          return next
        })
        return
      }
      if (e.key === 'Enter' && goToBuffer) {
        e.preventDefault()
        const n = parseInt(goToBuffer, 10)
        if (n >= 1 && n <= engine.totalSlides) engine.jumpToSlide(n - 1)
        setGoToBuffer('')
        if (goToTimer.current) { clearTimeout(goToTimer.current); goToTimer.current = null }
        return
      }

      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        setBlackout(prev => !prev)
        setShowHelp(false)
      } else if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        setShowHelp(prev => !prev)
        setBlackout(false)
      } else if (e.key === 'Escape') {
        setShowHelp(false)
        setBlackout(false)
        setZoomedImg(null)
        setGoToBuffer('')
      } else if (blackout && ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', ' '].includes(e.key)) {
        setBlackout(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [blackout, showHelp, goToBuffer, engine.totalSlides, engine.jumpToSlide])

  const CurrentSlide = slides[engine.currentSlide]
  const NextSlide = engine.nextSlide !== null ? slides[engine.nextSlide] : null
  const isPulling = engine.characterPhase === 'pulling'
  const isGrabbing = engine.characterPhase === 'grabbing'
  const isFinal = engine.isFinalTransition
  const tType = engine.transitionType
  const isContinuity = tType === 'continuity'
  const isBreath = tType === 'breath'
  const isImpact = tType === 'impact'
  const isUnveil = tType === 'unveil'
  const isRupture = tType === 'rupture'
  const showSpotlight = engine.introComplete && engine.currentSlide > 0 && engine.currentSlide < slides.length - 1

  return (
    <div className="relative w-full h-full overflow-hidden" onContextMenu={e => e.preventDefault()}>

      {/* ═══ SLIDE LAYERS ═══ */}
      <div className="absolute inset-0">

        {/* Next slide underneath */}
        {NextSlide && (
          <motion.div
            className="absolute inset-0 bg-[#141416]"
            initial={
              isContinuity ? { x: '100%', y: 0, scale: 1 }
              : isImpact ? { x: 0, y: 0, scale: 0.95, opacity: 0 }
              : isUnveil ? { x: 0, y: '-100%', scale: 1 }
              : { x: 0, y: 0, scale: 1 }
            }
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            transition={
              isContinuity ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              : isImpact ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
              : isUnveil ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0 }
            }
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-y-auto">
              <NextSlide />
            </div>
            {!isContinuity && !isBreath && !isImpact && !isUnveil && !isRupture && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 25%, transparent 55%)',
                }}
                animate={{ opacity: isPulling ? 1 : isGrabbing ? 0.3 : 0 }}
                transition={{ duration: isPulling ? 0.6 : 0.25 }}
              />
            )}
          </motion.div>
        )}

        {/* Current slide — page turn */}
        <div className="absolute inset-0" style={{ perspective: '2200px' }}>
          <motion.div
            key={engine.currentSlide}
            className="absolute inset-0 bg-[#141416]"
            style={{
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
            initial={{ rotateY: 0, opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              rotateY: (isContinuity || isBreath || isImpact || isUnveil || isRupture) ? 0 : isFinal ? 0 : isPulling ? -105 : isGrabbing ? -4 : 0,
              opacity: (isFinal || (isBreath && engine.isTransitioning) || (isImpact && engine.isTransitioning) || (isRupture && engine.isTransitioning)) ? 0 : 1,
              x: isContinuity && engine.isTransitioning ? '-100%' : 0,
              y: isUnveil && engine.isTransitioning ? '-100%' : 0,
              scale: isImpact && engine.isTransitioning ? 0.92 : 1,
            }}
            transition={{
              rotateY: {
                duration: isPulling ? PULL_DUR : isGrabbing ? GRAB_REACT_DUR : 0,
                delay: isGrabbing ? GRAB_CONTACT_DELAY : 0,
                ease: isPulling ? [0.42, 0, 0.58, 1] : [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: isRupture ? 0.5 : isImpact ? 0.8 : isBreath ? 1.2 : isFinal ? 1.0 : 0,
                ease: [0.4, 0, 0.2, 1],
              },
              x: {
                duration: isContinuity ? 0.7 : 0,
                ease: [0.22, 1, 0.36, 1],
              },
              y: {
                duration: isUnveil ? 0.9 : 0,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: isImpact ? 0.9 : 0,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-y-auto">
              <CurrentSlide />
            </div>

            {/* Lighting — slide 0: full warm + dark overlay */}
            {engine.currentSlide === 0 && (
              <>
                <WarmLighting lightsOn={engine.lightsOn} />
                <DarkOverlay active={!engine.lightsOn} startDark />
              </>
            )}

            {/* Lighting — dark slides: ember ambient glow */}
            {engine.currentSlide > 0 && (
              <WarmLighting lightsOn intensity={0.18} originX="93%" originY="3%" dustCount={6} />
            )}

            {/* Contact point glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                right: -6, top: '54%',
                width: 24, height: 24, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,16,46,0.55) 0%, rgba(200,16,46,0.12) 50%, transparent 75%)',
                filter: 'blur(2px)',
              }}
              animate={{
                opacity: isGrabbing ? 1 : isPulling ? 0.3 : 0,
                scale: isGrabbing ? 1.4 : isPulling ? 0.6 : 0.2,
              }}
              transition={{ duration: 0.3, delay: isGrabbing ? GRAB_CONTACT_DELAY : 0 }}
            />

            {/* Edge glow strip */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 pointer-events-none"
              style={{
                width: 5,
                background: 'linear-gradient(to left, rgba(200,16,46,0.45), rgba(200,16,46,0.05))',
                boxShadow: '0 0 12px 2px rgba(200,16,46,0.10)',
              }}
              animate={{ opacity: isGrabbing ? 1 : isPulling ? 0.4 : 0 }}
              transition={{ duration: 0.25, delay: isGrabbing ? GRAB_CONTACT_DELAY : 0 }}
            />

            {/* Edge lift shadow */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 pointer-events-none"
              style={{
                width: 35,
                background: 'linear-gradient(to left, rgba(0,0,0,0.07), transparent)',
              }}
              animate={{ opacity: isGrabbing || isPulling ? 1 : 0 }}
              transition={{ duration: 0.3, delay: isGrabbing ? GRAB_CONTACT_DELAY : 0 }}
            />

            {/* Inner shadow during turn */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 15%)',
              }}
              animate={{ opacity: isPulling ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ RUPTURE DARKEN OVERLAY ═══ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#000', zIndex: 45 }}
        animate={{ opacity: isRupture && engine.isTransitioning ? 0.5 : 0 }}
        transition={{
          duration: isRupture && engine.isTransitioning ? 0.4 : 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* ═══ HERO #1 — Flash overlay (blackout → white flash → fade) ═══ */}
      <AnimatePresence>
        {engine.heroFlash && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 46 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Black base → white flash → fade to transparent */}
            <motion.div
              className="absolute inset-0"
              style={{ background: '#000' }}
              animate={{
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.2, 0.35, 1],
                ease: 'easeOut',
              }}
            />
            {/* White cold flash */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 81% 5%, rgba(220,230,255,0.9) 0%, rgba(200,215,255,0.3) 30%, transparent 65%)',
              }}
              animate={{
                opacity: [0, 0, 1, 0.6, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.2, 0.35, 0.6, 1],
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ CLICK NAVIGATION — prev (left 30%) / next (right 70%) ═══ */}
      {engine.introComplete && (
        <div className="absolute inset-0 flex" style={{ zIndex: 48 }}>
          <div
            className="h-full"
            style={{ width: '30%' }}
            onClick={engine.prev}
          />
          <div
            className="h-full"
            style={{ width: '70%' }}
            onClick={engine.next}
          />
        </div>
      )}

      {/* ═══ LIGHT FIXTURE — on all slides ═══ */}
      <LightFixture
        mode={engine.currentSlide === 0 ? (engine.lightsOn ? 'on' : 'off') : 'ember'}
        isPulling={engine.characterPhase === 'pullingCord'}
        pulse={engine.emberPulse}
        showCord={engine.currentSlide === 0}
        left={engine.currentSlide === 0 ? '81%' : '93%'}
      />

      {/* ═══ GROUND LINE ═══ */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: '1.5cqh',
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,16,46,0.04) 15%, rgba(200,16,46,0.04) 85%, transparent 100%)',
          zIndex: 49,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: engine.introComplete ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ═══ CURSOR SPOTLIGHT ═══ */}
      {showSpotlight && <CursorSpotlight />}

      {/* ═══ CHARACTER ═══ */}
      <GraduateCharacter phase={engine.characterPhase} mouseX={mouseX} />

      {/* ═══ CELEBRATION ═══ */}
      {engine.showCelebration && <CelebrationEffect />}

      {/* ═══ SECTION INDICATOR ═══ */}
      <AnimatePresence mode="wait">
        {engine.introComplete && SECTION_MAP[engine.currentSlide] && (
          <motion.div
            key={SECTION_MAP[engine.currentSlide]}
            className="absolute select-none pointer-events-none"
            style={{
              top: '0.9cqh', left: '6cqw', zIndex: 55,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.8cqw',
            }}>
              <span style={{ width: '1.4cqw', height: 2, background: '#c8102e', flexShrink: 0 }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.4cqh',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
              }}>
                {SECTION_MAP[engine.currentSlide]}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SLIDE NAV ═══ */}
      <SlideNav
        current={engine.currentSlide}
        total={engine.totalSlides}
        visible={engine.introComplete}
        isTransitioning={engine.isTransitioning}
        onJump={engine.jumpToSlide}
      />

      {/* ═══ FULLSCREEN BUTTON ═══ */}
      <motion.div
        className="absolute select-none"
        style={{ bottom: '2cqh', left: '2cqw', zIndex: 65 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: engine.introComplete ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          className="ui-control"
          onClick={fullscreen.toggle}
          title={fullscreen.isFullscreen ? useT().ui.exitFullscreen : useT().ui.fullscreen}
        >
          {fullscreen.isFullscreen
            ? <Minimize style={{ width: '2cqh', height: '2cqh' }} strokeWidth={2} />
            : <Maximize style={{ width: '2cqh', height: '2cqh' }} strokeWidth={2} />
          }
        </button>
      </motion.div>

      {/* ═══ MUTE BUTTON — stacked under fullscreen ═══ */}
      <motion.div
        className="absolute select-none"
        style={{ bottom: '7.5cqh', left: '2cqw', zIndex: 65 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: engine.introComplete ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          className="ui-control"
          onClick={sound.toggleMute}
          title={sound.muted ? 'Activer le son' : 'Couper le son'}
        >
          {sound.muted
            ? <VolumeX style={{ width: '2cqh', height: '2cqh' }} strokeWidth={2} />
            : <Volume2 style={{ width: '2cqh', height: '2cqh' }} strokeWidth={2} />
          }
        </button>
      </motion.div>

      {/* ═══ PRESENTER TIMER — bottom right, left of nav ═══ */}
      <motion.div
        className="absolute select-none"
        style={{ bottom: '2cqh', right: '9cqw', zIndex: 65 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: engine.introComplete ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <PresenterTimer started={engine.introComplete} />
      </motion.div>

      {/* ═══ GO-TO INDICATOR ═══ */}
      <AnimatePresence>
        {goToBuffer && (
          <motion.div
            className="absolute select-none"
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 998,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <div style={{
              background: 'rgba(22,22,22,0.9)',
              backdropFilter: 'blur(16px)',
              borderRadius: '1.2cqh',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '2cqh 3.5cqw',
              textAlign: 'center',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8cqh', fontWeight: 800, color: '#fff',
              }}>
                {goToBuffer}
              </span>
              <p style={{
                fontSize: '1.3cqh', color: 'rgba(255,255,255,0.4)',
                margin: 0, marginTop: '0.8cqh',
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>
                Entrée pour aller à la slide
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SEGMENTED PROGRESS BAR ═══ */}
      <SegmentedProgress
        currentSlide={engine.currentSlide}
        totalSlides={engine.totalSlides}
        visible={engine.introComplete}
      />

      {/* ═══ BLACKOUT OVERLAY — press B ═══ */}
      <AnimatePresence>
        {blackout && (
          <motion.div
            className="absolute inset-0"
            style={{ background: '#000', zIndex: 998, cursor: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setBlackout(false)}
          />
        )}
      </AnimatePresence>

      {/* ═══ HELP OVERLAY — press ? or H ═══ */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', zIndex: 998, backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(28,28,30,0.95)',
                borderRadius: '1.5cqh',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '4cqh 5cqw',
                maxWidth: '45cqw',
              }}
              onClick={e => e.stopPropagation()}
            >
              <p style={{
                fontSize: '2.2cqh', fontWeight: 800, color: '#fff',
                margin: 0, marginBottom: '2.5cqh', letterSpacing: '-0.02em',
              }}>
                Raccourcis clavier
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2cqh' }}>
                {[
                  { keys: '→  ↓  Space', desc: 'Slide suivante' },
                  { keys: '←  ↑', desc: 'Slide précédente' },
                  { keys: 'Home / End', desc: 'Première / Dernière slide' },
                  { keys: '1-21 + Entrée', desc: 'Aller à la slide N' },
                  { keys: 'B', desc: 'Blackout (écran noir)' },
                  { keys: 'F11', desc: 'Plein écran' },
                  { keys: 'Double-clic', desc: 'Zoomer une image' },
                  { keys: '?  H', desc: 'Afficher cette aide' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center" style={{ gap: '2cqw' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.5cqh', fontWeight: 600,
                      color: '#c8102e', minWidth: '14cqw',
                    }}>
                      {s.keys}
                    </span>
                    <span style={{
                      fontSize: '1.6cqh', color: 'rgba(255,255,255,0.7)',
                    }}>
                      {s.desc}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: '1.2cqh', color: 'rgba(255,255,255,0.3)',
                margin: 0, marginTop: '2.5cqh', textAlign: 'center',
              }}>
                Cliquer ou Escape pour fermer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ IMAGE ZOOM — double-click any screenshot ═══ */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', zIndex: 998, cursor: 'zoom-out' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoomedImg(null)}
          >
            <motion.img
              src={zoomedImg}
              alt=""
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '94%',
                maxHeight: '92%',
                objectFit: 'contain',
                borderRadius: '0.8cqh',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SPLASH — click to start in fullscreen ═══ */}
      <AnimatePresence>
        {!started && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: '#0a0a0c',
              zIndex: 9999,
              cursor: 'pointer',
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            onClick={handleStart}
          >
            {/* Background photo */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/mika-groupe-detente.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.35,
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />

            {/* QR télécommande — coin bas droit */}
            {remoteUrl && (
              <motion.div
                className="absolute"
                style={{ bottom: '3cqh', right: '2.5cqw' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <RemoteQR url={remoteUrl} />
              </motion.div>
            )}

            {/* Logos */}
            <motion.div
              className="flex items-center"
              style={{ gap: '5cqw', marginBottom: '4cqh', position: 'relative' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/esprit-logo.png" alt="ESPRIT"
                style={{ height: '28cqh', objectFit: 'contain', margin: '-8cqh 0' }} />
              <div style={{ width: 1, height: '6cqh', background: 'rgba(255,255,255,0.15)' }} />
              <img src="/mika-logo.png" alt="MIKA Services"
                style={{ height: '10cqh', objectFit: 'contain' }} />
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex items-center"
              style={{ gap: '1cqw' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div
                style={{
                  width: '1cqh', height: '1cqh', borderRadius: '50%',
                  background: '#c8102e',
                }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(200,16,46,0.5)',
                    '0 0 0 8px rgba(200,16,46,0)',
                    '0 0 0 0 rgba(200,16,46,0)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <span style={{
                fontSize: '1.8cqh', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.40)',
              }}>
                Cliquer pour commencer
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ── Presenter timer ───────────────────────────────────────
function PresenterTimer({ started }: { started: boolean }) {
  const [elapsed, setElapsed] = useState(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return
    startTime.current = Date.now()
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current!) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [started])

  if (!started) return null

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  const color = elapsed >= 900 ? '#ef4444'    // 15 min (durée officielle) → red
    : elapsed >= 720 ? '#f59e0b'               // 12 min → orange
    : 'var(--ui-text)'

  return (
    <div
      style={{
        height: 'var(--ui-size)',
        padding: '0 2cqw',
        borderRadius: '1.8cqh',
        background: 'rgba(22,22,22,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        color,
        transition: 'color 1s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1.7cqh',
        fontWeight: 700,
        letterSpacing: '0.08em',
      }}>
        {mm}:{ss}
      </span>
    </div>
  )
}

// ── Slide navigation ───────────────────────────────────────
function SlideNav({
  current, total, visible, isTransitioning, onJump,
}: {
  current: number
  total: number
  visible: boolean
  isTransitioning: boolean
  onJump: (i: number) => void
}) {
  const slideTitles = useT().ui.slideNav.titles
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const keepOpen = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const scheduleClose = () => {
    keepOpen()
    closeTimer.current = setTimeout(() => setOpen(false), 300)
  }

  return (
    <motion.div
      className="absolute select-none"
      style={{ bottom: '2cqh', right: '2cqw', zIndex: 65 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onMouseEnter={keepOpen}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger — progress ring */}
      <div
        onClick={() => setOpen(o => !o)}
        className="ui-control cursor-pointer"
        style={{
          marginLeft: 'auto',
          background: open ? 'var(--ui-bg-hover)' : 'var(--ui-bg)',
        }}
      >
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
          <circle
            cx="18" cy="18" r="14" fill="none" stroke="var(--color-primary)" strokeWidth="2.5"
            strokeDasharray={`${((current + 1) / total) * 88} 88`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
          <text x="18" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="700"
            fontFamily="'JetBrains Mono', monospace">
            {current + 1}
          </text>
        </svg>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0"
            style={{
              bottom: '100%',
              marginBottom: '0.8cqh',
              background: 'rgba(22,22,22,0.96)',
              backdropFilter: 'blur(24px)',
              borderRadius: '1.2cqh',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.10)',
              padding: '0.6cqh 0',
              width: '22cqw',
              maxHeight: '80cqh',
              overflowY: 'auto',
            }}
          >
            {slideTitles.map((title, i) => {
              const active = i === current
              const section = SECTION_MAP[i]
              const prevSection = i > 0 ? SECTION_MAP[i - 1] : null
              const showHeader = section && section !== prevSection
              return (
                <div key={i}>
                  {showHeader && (
                    <div style={{
                      padding: '0.6cqh 1.2cqw 0.3cqh',
                      marginTop: i > 0 ? '0.3cqh' : 0,
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                      <span style={{
                        fontSize: '0.9cqh', fontWeight: 700, letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: 'rgba(200,16,46,0.6)',
                      }}>
                        {section}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => { if (!isTransitioning) { onJump(i); setOpen(false) } }}
                    className="w-full text-left flex items-center"
                    style={{
                      padding: '0.7cqh 1.2cqw',
                      gap: '0.8cqw',
                      cursor: isTransitioning ? 'not-allowed' : 'pointer',
                      opacity: isTransitioning ? 0.4 : 1,
                      background: active ? 'rgba(200,16,46,0.15)' : 'transparent',
                      borderLeft: active ? '3px solid #c8102e' : '3px solid transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.1cqh', fontWeight: 600,
                      color: active ? '#c8102e' : 'rgba(255,255,255,0.50)',
                      minWidth: '2.5cqw',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.25cqh',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {title}
                    </span>
                  </button>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Segmented progress bar ───────────────────────────────
// 7 sections, each segment fills as slides within that section progress
const SECTION_RANGES = [
  { label: 'Problématique', start: 2, end: 3 },
  { label: 'Contexte', start: 4, end: 4 },
  { label: 'État de l\'art', start: 5, end: 5 },
  { label: 'Méthodologie', start: 6, end: 6 },
  { label: 'Architecture', start: 7, end: 9 },
  { label: 'Réalisation', start: 10, end: 14 },
  { label: 'Bilan', start: 15, end: 19 },
]

function SegmentedProgress({ currentSlide, visible }: {
  currentSlide: number
  totalSlides?: number
  visible: boolean
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex"
      style={{ height: 3, zIndex: 60, gap: 2, padding: '0 0.5cqw' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {SECTION_RANGES.map((section, i) => {
        const sectionSlides = section.end - section.start + 1
        let fill = 0
        if (currentSlide > section.end) {
          fill = 1
        } else if (currentSlide >= section.start) {
          fill = (currentSlide - section.start + 1) / sectionSlides
        }
        // For cover/sommaire (before sections) or merci (after) — show as filled/empty
        const isAfterAll = currentSlide > section.end
        const isActive = currentSlide >= section.start && currentSlide <= section.end

        return (
          <div
            key={i}
            className="relative flex-1"
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
            title={section.label}
          >
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                background: isActive
                  ? '#c8102e'
                  : isAfterAll
                    ? 'rgba(200,16,46,0.5)'
                    : 'transparent',
                borderRadius: 2,
                boxShadow: isActive ? '0 0 8px rgba(200,16,46,0.4)' : 'none',
              }}
              animate={{ width: `${fill * 100}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        )
      })}
    </motion.div>
  )
}
