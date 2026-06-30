import type { ReactNode } from 'react'

interface SlideLayoutProps {
  children: ReactNode
  currentSlide: number
  totalSlides: number
  onNavigate: (index: number) => void
}

export default function SlideLayout({ children }: SlideLayoutProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {children}
    </div>
  )
}
