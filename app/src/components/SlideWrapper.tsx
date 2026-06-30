import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface SlideWrapperProps {
  children: ReactNode
  isActive: boolean
  direction: number
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function SlideWrapper({ children, isActive, direction }: SlideWrapperProps) {
  if (!isActive) return null

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
