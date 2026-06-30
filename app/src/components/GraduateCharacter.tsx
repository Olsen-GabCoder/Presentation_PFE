import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { type CharacterPhase } from '../engine/usePresentationEngine'
import Character3D from './Character3D'

interface Props {
  phase: CharacterPhase
  mouseX?: React.RefObject<number>
}

export default function GraduateCharacter({ phase, mouseX }: Props) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], near: 0.1, far: 100, zoom: 1 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <Character3D phase={phase} mouseX={mouseX} />
        </Suspense>
      </Canvas>
    </div>
  )
}
