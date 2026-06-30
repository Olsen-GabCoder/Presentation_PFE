import { useState, useCallback, useRef, useEffect } from 'react'

export type CharacterPhase =
  | 'hidden'
  | 'entering'
  | 'idle'
  | 'walkingToLight'
  | 'reachingCord'
  | 'pullingCord'
  | 'approaching'
  | 'grabbing'
  | 'pulling'
  | 'returning'
  | 'celebrating'
  | 'facingPublic'
  | 'presenting'
  | 'heroReveal'
  | 'heroAdvance'

export type TransitionType = 'page-turn' | 'continuity' | 'rupture' | 'impact' | 'unveil' | 'breath' | 'fade'

// Map: slide index → transition type to use when LEAVING that slide
// (i.e. TRANSITION_MAP[3] = transition used going from slide 3 → slide 4)
export const TRANSITION_MAP: TransitionType[] = [
  'page-turn',   // 0  Cover → Sommaire
  'continuity',  // 1  Sommaire → StatementA        (same opening flow)
  'impact',      // 2  StatementA → Problématique    (statement → content)
  'unveil',      // 3  Problématique → Contexte      (new chapter)
  'rupture',     // 4  Contexte → État de l'art      (section change)
  'rupture',     // 5  État de l'art → Méthodologie  (section change)
  'rupture',     // 6  Méthodologie → Architecture   (section change)
  'continuity',  // 7  Architecture → Conception     (same section)
  'continuity',  // 8  Conception → Sécurité         (same section)
  'impact',      // 9  Sécurité → StatementB         (into statement)
  'unveil',      // 10 StatementB → Réalisation      (HERO #1 will override)
  'continuity',  // 11 Réalisation → Salle MIKA      (same section)
  'continuity',  // 12 Salle MIKA → Assistant        (same section)
  'continuity',  // 13 Assistant → Workflow DMA      (same section)
  'rupture',     // 14 Workflow → Validation          (section change)
  'breath',      // 15 Validation → Limites           (soft transition)
  'breath',      // 16 Limites → StatementC           (HERO #2 will override)
  'unveil',      // 17 StatementC → Conclusion        (reveal)
  'breath',      // 18 Conclusion → Perspectives      (soft)
  'fade',        // 19 Perspectives → Merci            (final)
]

export const PHASE_DURATIONS = {
  entering: 6500,
  walkingToLight: 1800,
  reachingCord: 800,
  pullingCord: 600,
  approaching: 450,
  grabbing: 550,
  pulling: 1000,
  returning: 400,
} as const

const TOTAL_SLIDES = 21

function wait(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

function getRestoredSlide(): number {
  try {
    const v = sessionStorage.getItem('mika-slide')
    if (v !== null) {
      const n = parseInt(v, 10)
      if (n > 0 && n < TOTAL_SLIDES) return n
    }
  } catch { /* sessionStorage unavailable */ }
  return 0
}

export function usePresentationEngine(startSignal = true) {
  const restored = useRef(getRestoredSlide())
  const skipIntro = restored.current > 0

  const [currentSlide, setCurrentSlide] = useState(restored.current)
  const [nextSlide, setNextSlide] = useState<number | null>(null)
  const [characterPhase, setCharacterPhase] = useState<CharacterPhase>(skipIntro ? 'idle' : 'hidden')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFinalTransition, setIsFinalTransition] = useState(false)
  const [transitionType, setTransitionType] = useState<TransitionType>('page-turn')
  const [introComplete, setIntroComplete] = useState(skipIntro)
  const [showCelebration, setShowCelebration] = useState(skipIntro && restored.current === TOTAL_SLIDES - 1)
  const [lightsOn, setLightsOn] = useState(skipIntro ? restored.current === 0 : false)
  const [emberPulse, setEmberPulse] = useState(false)
  const [heroFlash, setHeroFlash] = useState(false)

  const transitionLock = useRef(false)
  const cooldownLock = useRef(false)
  const lastNavTime = useRef(0)
  const currentSlideRef = useRef(restored.current)

  // Persist current slide
  useEffect(() => {
    currentSlideRef.current = currentSlide
    try { sessionStorage.setItem('mika-slide', String(currentSlide)) } catch { /* noop */ }
  }, [currentSlide])

  // --- Intro: enter in the dark, then turn on the light ---
  // Skipped when restoring from sessionStorage (skipIntro = true)
  // Waits for startSignal before launching
  useEffect(() => {
    if (skipIntro || !startSignal) return
    let cancelled = false
    ;(async () => {
      await wait(400)
      if (cancelled) return

      // Walk in (in the dark)
      setCharacterPhase('entering')
      await wait(PHASE_DURATIONS.entering)
      if (cancelled) return

      // Reach for the cord
      setCharacterPhase('reachingCord')
      await wait(PHASE_DURATIONS.reachingCord)
      if (cancelled) return

      // Pull the cord — turn ON the light mid-pull
      setCharacterPhase('pullingCord')
      await wait(300)
      if (cancelled) return
      setLightsOn(true)
      await wait(300)
      if (cancelled) return

      // Settle into idle
      setCharacterPhase('idle')
      await wait(800)
      if (cancelled) return
      setIntroComplete(true)
    })()
    return () => { cancelled = true }
  }, [startSignal])

  // Release lock with a cooldown buffer so the new slide is visible
  const releaseLock = useCallback(() => {
    setIsTransitioning(false)
    transitionLock.current = false
    cooldownLock.current = true
    setTimeout(() => { cooldownLock.current = false }, 400)
  }, [])

  // --- Transition ---
  const performTransition = useCallback(async (targetIndex: number) => {
    if (transitionLock.current) return
    transitionLock.current = true
    setIsTransitioning(true)
    setNextSlide(targetIndex)
    setShowCelebration(false)

    // ── Special light-switch sequence for slide 0 → turn OFF before page-turn ──
    if (currentSlideRef.current === 0) {
      // Reach up for the cord
      setCharacterPhase('reachingCord')
      await wait(PHASE_DURATIONS.reachingCord)

      // Pull the cord — turn OFF the light mid-pull
      setCharacterPhase('pullingCord')
      await wait(300)
      setLightsOn(false)
      await wait(300)

      // Wait for darkness to settle
      setCharacterPhase('idle')
      await wait(1400)
    }

    // Determine transition type from the map
    const tType = TRANSITION_MAP[currentSlideRef.current] ?? 'page-turn'
    setTransitionType(tType)

    // ── FADE — final slide ──
    if (tType === 'fade' || targetIndex === TOTAL_SLIDES - 1) {
      setTransitionType('fade')
      setIsFinalTransition(true)
      setCharacterPhase('celebrating')
      await wait(1200)
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      setShowCelebration(true)
      await wait(300)
      setIsFinalTransition(false)
      releaseLock()
      return
    }

    // ── CONTINUITY — character stays idle, quick slide ──
    if (tType === 'continuity') {
      await wait(100)
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      if (targetIndex === 0) setLightsOn(true)
      await wait(700)
      setCharacterPhase('idle')
      releaseLock()
      return
    }

    // ── HERO MOMENT #1 — flash light reveal (slide 10 → 11) ──
    if (currentSlideRef.current === 10) {
      // Character raises arm in presenting gesture
      setCharacterPhase('heroReveal')
      await wait(500)
      // Blackout — ember off
      setHeroFlash(true)
      await wait(400)
      // Swap slide during darkness — App.tsx shows the flash overlay
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      await wait(100)
      // Flash fades, new slide visible
      await wait(1500)
      setHeroFlash(false)
      // Character lowers arm
      setCharacterPhase('idle')
      await wait(300)
      releaseLock()
      return
    }

    // ── HERO MOMENT #2 — character advances for citation (slide 16 → 17) ──
    if (currentSlideRef.current === 16) {
      // Breath fade out current slide
      setTransitionType('breath')
      await wait(600)
      // Character advances toward center
      setCharacterPhase('heroAdvance')
      await wait(800)
      // Silence — 1s of stillness
      await wait(1000)
      // Swap to citation slide
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      // Let citation animate in
      await wait(1500)
      // Character retreats to normal position
      setCharacterPhase('idle')
      await wait(600)
      releaseLock()
      return
    }

    // ── RUPTURE — ember pulse, brief darken, then reveal ──
    if (tType === 'rupture') {
      // Character stays idle — immobile
      // Pulse the ember light
      setEmberPulse(true)
      await wait(400)
      setEmberPulse(false)
      // Brief darken (App.tsx reads isTransitioning + rupture to show overlay)
      await wait(300)
      // Swap slide during the dark moment
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      if (targetIndex === 0) setLightsOn(true)
      // Let the new slide be revealed
      await wait(1000)
      setCharacterPhase('idle')
      releaseLock()
      return
    }

    // ── UNVEIL — character presents, page rises/drops vertically ──
    if (tType === 'unveil') {
      // Character raises arm in a presenting gesture
      setCharacterPhase('presenting')
      await wait(400)
      // App.tsx animates current slide up, next slide down from top
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      if (targetIndex === 0) setLightsOn(true)
      await wait(1000)
      // Lower arm, return to idle
      setCharacterPhase('idle')
      releaseLock()
      return
    }

    // ── IMPACT — character turns toward public, scale transition ──
    if (tType === 'impact') {
      // Character turns to face the audience (anticipation)
      setCharacterPhase('facingPublic')
      await wait(300)
      // App.tsx scales the current slide down while next scales up
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      if (targetIndex === 0) setLightsOn(true)
      await wait(1000)
      // Character stays facing public briefly, then returns to idle
      setCharacterPhase('idle')
      releaseLock()
      return
    }

    // ── BREATH — slow crossfade, total stillness ──
    if (tType === 'breath') {
      // Character stays perfectly still — idle breathing only
      // App.tsx will handle the crossfade via opacity
      await wait(100)
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      if (targetIndex === 0) setLightsOn(true)
      await wait(1200)
      setCharacterPhase('idle')
      releaseLock()
      return
    }

    // ── PAGE-TURN — classic grab & pull ──
    // (also used as fallback for types not yet implemented)

    // Walk to slide edge
    setCharacterPhase('approaching')
    await wait(PHASE_DURATIONS.approaching)

    // Reach and grab
    setCharacterPhase('grabbing')
    await wait(PHASE_DURATIONS.grabbing)

    // Pull / page turn
    setCharacterPhase('pulling')
    await wait(PHASE_DURATIONS.pulling)

    // Swap
    setCurrentSlide(targetIndex)
    setNextSlide(null)

    // Arriving on slide 0 — turn lights back on
    if (targetIndex === 0) {
      setLightsOn(true)
    }

    setCharacterPhase('returning')
    await wait(PHASE_DURATIONS.returning)
    setCharacterPhase('idle')

    releaseLock()
  }, [lightsOn, releaseLock])

  const goToSlide = useCallback(
    (targetIndex: number) => {
      const now = Date.now()
      if (now - lastNavTime.current < 800) return
      if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES) return
      if (targetIndex === currentSlideRef.current) return
      if (transitionLock.current || cooldownLock.current) return
      if (!introComplete) return
      lastNavTime.current = now
      performTransition(targetIndex)
    },
    [introComplete, performTransition],
  )

  // Direct jump — no character animation, instant swap
  const jumpToSlide = useCallback(
    (targetIndex: number) => {
      const now = Date.now()
      if (now - lastNavTime.current < 800) return
      if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES) return
      if (targetIndex === currentSlideRef.current) return
      if (transitionLock.current || cooldownLock.current) return
      lastNavTime.current = now
      setShowCelebration(false)
      setCurrentSlide(targetIndex)
      setNextSlide(null)
      // Restore lights if jumping back to slide 0
      if (targetIndex === 0) {
        setLightsOn(true)
      }
      if (targetIndex === TOTAL_SLIDES - 1) {
        setCharacterPhase('celebrating')
        setShowCelebration(true)
      } else {
        setCharacterPhase('idle')
      }
    },
    [],
  )

  const next = useCallback(() => goToSlide(currentSlideRef.current + 1), [goToSlide])
  const prev = useCallback(() => goToSlide(currentSlideRef.current - 1), [goToSlide])

  // --- Keyboard ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return
      switch (e.key) {
        case 'ArrowDown': case 'ArrowRight': case ' ': case 'PageDown':
          e.preventDefault(); next(); break
        case 'ArrowUp': case 'ArrowLeft': case 'PageUp':
          e.preventDefault(); prev(); break
        case 'Home': e.preventDefault(); goToSlide(0); break
        case 'End': e.preventDefault(); goToSlide(TOTAL_SLIDES - 1); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, goToSlide])

  // --- Wheel ---
  const wheelThrottle = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextRef = useRef(next)
  const prevRef = useRef(prev)
  nextRef.current = next
  prevRef.current = prev
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      if (wheelThrottle.current) return
      wheelThrottle.current = setTimeout(() => { wheelThrottle.current = null }, 900)
      if (e.deltaY > 0) nextRef.current(); else prevRef.current()
    }
    window.addEventListener('wheel', handler, { passive: false })
    return () => window.removeEventListener('wheel', handler)
  }, [])

  // --- Touch ---
  useEffect(() => {
    let startY = 0
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev() }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [next, prev])

  return {
    currentSlide, nextSlide, characterPhase, transitionType,
    isTransitioning, isFinalTransition, introComplete, showCelebration,
    lightsOn, emberPulse, heroFlash,
    goToSlide, jumpToSlide, next, prev,
    totalSlides: TOTAL_SLIDES,
  }
}
