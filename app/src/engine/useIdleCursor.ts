import { useEffect, useRef } from 'react'

export function useIdleCursor(timeout = 2500) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const show = () => {
      document.body.style.cursor = ''
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        document.body.style.cursor = 'none'
      }, timeout)
    }

    show()
    window.addEventListener('mousemove', show)
    window.addEventListener('mousedown', show)

    return () => {
      window.removeEventListener('mousemove', show)
      window.removeEventListener('mousedown', show)
      if (timer.current) clearTimeout(timer.current)
      document.body.style.cursor = ''
    }
  }, [timeout])
}
