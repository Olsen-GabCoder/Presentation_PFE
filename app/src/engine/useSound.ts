import { useRef, useCallback, useState, useEffect } from 'react'

const VOLUME = 0.15

function createAudio(src: string, volume = VOLUME): HTMLAudioElement {
  const a = new Audio(src)
  a.volume = volume
  a.preload = 'auto'
  return a
}

export function useSound() {
  const [muted, setMuted] = useState(() => {
    try { return sessionStorage.getItem('mika-muted') === '1' } catch { return false }
  })

  const switchClick = useRef<HTMLAudioElement | null>(null)
  const pageTurn = useRef<HTMLAudioElement | null>(null)
  const celebrate = useRef<HTMLAudioElement | null>(null)

  // Lazy init on first user interaction (autoplay policy)
  const initialized = useRef(false)
  const init = useCallback(() => {
    if (initialized.current) return
    initialized.current = true
    switchClick.current = createAudio('/sounds/switch-click.mp3', VOLUME)
    pageTurn.current = createAudio('/sounds/page-turn.mp3', VOLUME)
    celebrate.current = createAudio('/sounds/celebrate.mp3', VOLUME * 0.8)
  }, [])

  useEffect(() => {
    const handler = () => init()
    window.addEventListener('click', handler, { once: true })
    window.addEventListener('keydown', handler, { once: true })
    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [init])

  const play = useCallback((audio: HTMLAudioElement | null) => {
    if (!audio || muted) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [muted])

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev
      try { sessionStorage.setItem('mika-muted', next ? '1' : '0') } catch {}
      return next
    })
  }, [])

  return {
    muted,
    toggleMute,
    playSwitch: useCallback(() => play(switchClick.current), [play]),
    playPageTurn: useCallback(() => play(pageTurn.current), [play]),
    playCelebrate: useCallback(() => play(celebrate.current), [play]),
  }
}
