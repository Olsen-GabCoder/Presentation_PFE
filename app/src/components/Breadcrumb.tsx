import { motion } from 'framer-motion'

const SECTIONS = [
  'Problématique', 'Contexte', 'État de l\'art',
  'Méthodologie', 'Architecture', 'Réalisation', 'Bilan'
]

interface BreadcrumbProps {
  activeIndex: number
}

export default function Breadcrumb({ activeIndex }: BreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex items-center gap-2 text-xs font-medium mb-8 flex-wrap"
    >
      {SECTIONS.map((section, i) => (
        <span key={section} className="flex items-center gap-2">
          <span className={i === activeIndex ? 'text-mika-blue font-bold' : 'text-text-muted'}>
            {section}
          </span>
          {i < SECTIONS.length - 1 && (
            <span className="text-text-muted/40">·</span>
          )}
        </span>
      ))}
    </motion.div>
  )
}
