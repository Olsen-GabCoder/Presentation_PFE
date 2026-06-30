import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export default function A({ children, delay = 0, className = '', direction = 'up' }: AnimatedElementProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 20 : 0,
    x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
  }

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
