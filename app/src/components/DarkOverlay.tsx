import { motion } from 'framer-motion'

interface DarkOverlayProps {
  active: boolean
  startDark?: boolean
  color?: string
  maxOpacity?: number
  duration?: number
  zIndex?: number
}

export default function DarkOverlay({
  active,
  startDark = false,
  color = '#141416',
  maxOpacity = 0.93,
  duration = 1.3,
  zIndex = 5,
}: DarkOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: color, zIndex }}
      initial={{ opacity: startDark ? maxOpacity : 0 }}
      animate={{ opacity: active ? maxOpacity : 0 }}
      transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
    />
  )
}
