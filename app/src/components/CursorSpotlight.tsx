import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const root = document.getElementById('root')
      if (!root) return
      const rect = root.getBoundingClientRect()
      target.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      visible.current = true
      if (hideTimer.current) clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => { visible.current = false }, 2500)
    }

    let raf: number
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08
      pos.current.y += (target.current.y - pos.current.y) * 0.08
      if (ref.current) {
        ref.current.style.left = `${pos.current.x}px`
        ref.current.style.top = `${pos.current.y}px`
        ref.current.style.opacity = visible.current ? '1' : '0'
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,16,46,0.045) 0%, rgba(200,16,46,0.015) 35%, transparent 65%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 46,
        transition: 'opacity 0.6s ease',
        willChange: 'left, top',
      }}
      initial={{ opacity: 0 }}
    />
  )
}
