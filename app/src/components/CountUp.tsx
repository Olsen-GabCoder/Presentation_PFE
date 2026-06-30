import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, motion, animate } from 'framer-motion'

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  delay?: number
  duration?: number
  decimals?: number
  style?: React.CSSProperties
  className?: string
}

function formatNumber(n: number, decimals: number): string {
  const fixed = n.toFixed(decimals)
  const [int, dec] = fixed.split('.')
  // French thousands separator (space)
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F')
  return dec !== undefined && decimals > 0 ? `${formatted},${dec}` : formatted
}

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  delay = 0,
  duration = 1.4,
  decimals = 0,
  style,
  className,
}: CountUpProps) {
  const mv = useMotionValue(0)
  const display = useTransform(mv, (v) => `${prefix}${formatNumber(v, decimals)}${suffix}`)
  const ref = useRef<HTMLSpanElement>(null!)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(mv, value, {
        duration,
        ease: [0.22, 0.9, 0.36, 1],
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [mv, value, duration, delay])

  // Sync displayed text into DOM via subscription
  useEffect(() => {
    const unsub = display.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsub
  }, [display])

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {`${prefix}0${suffix}`}
    </motion.span>
  )
}
