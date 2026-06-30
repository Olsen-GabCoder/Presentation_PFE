import { useEffect, useRef } from 'react'

/**
 * Prevents screen dimming/sleep during the presentation.
 * Uses the Wake Lock API (Chrome, Edge, modern browsers).
 * Re-acquires the lock when the tab regains visibility (e.g. after Alt+Tab).
 */
export function useWakeLock() {
  const lock = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    async function acquire() {
      try {
        if ('wakeLock' in navigator) {
          lock.current = await navigator.wakeLock.request('screen')
        }
      } catch { /* user denied or API unavailable */ }
    }

    acquire()

    // Re-acquire after tab becomes visible again (lock is released on visibility change)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') acquire()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      lock.current?.release().catch(() => {})
    }
  }, [])
}
