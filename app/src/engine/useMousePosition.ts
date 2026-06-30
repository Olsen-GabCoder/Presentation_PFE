import { useEffect, useRef } from 'react'

/**
 * Tracks the normalized mouse X position (0 = left, 1 = right).
 * Returns a ref so Three.js can read it every frame without re-renders.
 */
export function useMousePosition() {
  const mouseX = useRef(0.5)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return mouseX
}
