import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { type CharacterPhase, PHASE_DURATIONS } from '../engine/usePresentationEngine'

// ── Scene ──────────────────────────────────────────────────
const SW = 16, SH = 9, SCALE = 1.05
function toX(f: number) { return -SW / 2 + f * SW }

const POS: Record<CharacterPhase, number> = {
  hidden:        toX(-0.06),
  entering:      toX(0.83),
  idle:          toX(0.83),
  walkingToLight: toX(0.83),
  reachingCord:  toX(0.83),
  pullingCord:   toX(0.83),
  approaching:   toX(0.95),
  grabbing:      toX(0.95),
  pulling:       toX(0.74),
  returning:     toX(0.83),
  celebrating:   toX(0.45),
  facingPublic:  toX(0.83),
  presenting:    toX(0.83),
  heroReveal:    toX(0.83),
  heroAdvance:   toX(0.65),
}

// Body facing (rotation.y)
const FACE_RIGHT = 0
const FACE_SLIDES = Math.PI * 0.82   // idle: face slides
const FACE_GRAB = -0.32              // grab/pull: rotate PAST right to show right arm to camera
const FACE_CORD_WALK = Math.PI * 0.75 // slight turn toward cord
const FACE_CORD_PULL = Math.PI * 0.70 // subtle turn toward camera — left arm visible

// Shoulder offset from spine centre (Z axis)
const SHOULDER_Z = 0.17

// ── Pose ───────────────────────────────────────────────────
interface Pose {
  hipY: number; hipZ: number
  spnY: number; spnZ: number
  hdX: number; hdY: number
  lHip: number; rHip: number
  lKne: number; rKne: number
  lAnk: number; rAnk: number
  lSho: number; rSho: number
  lElb: number; rElb: number
}

const REST: Pose = {
  hipY:0, hipZ:0, spnY:0, spnZ:0, hdX:0, hdY:0,
  lHip:0, rHip:0, lKne:-0.03, rKne:-0.03, lAnk:0, rAnk:0,
  lSho:0.08, rSho:-0.08, lElb:-0.22, rElb:-0.22,
}

// ── Walk ───────────────────────────────────────────────────
function walkPose(t: number): Pose {
  const a = t * Math.PI * 2
  const lKs = Math.max(0, Math.sin(a - 0.35))
  const rKs = Math.max(0, Math.sin(a + Math.PI - 0.35))
  return {
    hipY: Math.abs(Math.sin(a)) * 0.022 - 0.011,
    hipZ: Math.sin(a) * 0.028,
    spnY: Math.sin(a) * 0.05,
    spnZ: Math.sin(a) * -0.016,
    hdX: Math.sin(a * 2) * -0.014,
    hdY: Math.sin(a) * -0.03,
    lHip: Math.sin(a) * 0.52,
    rHip: Math.sin(a + Math.PI) * 0.52,
    lKne: -(lKs * 0.95 + 0.04),
    rKne: -(rKs * 0.95 + 0.04),
    lAnk: Math.sin(a + 0.4) * 0.16,
    rAnk: Math.sin(a + Math.PI + 0.4) * 0.16,
    lSho: Math.sin(a + Math.PI) * 0.22 + 0.10,
    rSho: Math.sin(a) * 0.22 + 0.10,
    lElb: 0.30 + Math.max(0, Math.sin(a + Math.PI)) * 0.15,
    rElb: 0.30 + Math.max(0, Math.sin(a)) * 0.15,
  }
}

// ── Pull (right arm tracks page arc) ───────────────────────
function pullPose(t: number, progress: number): Pose {
  const a = t * Math.PI * 2
  const arm = 1.55 - progress * 1.0
  const elb = -0.04 - progress * 0.25
  return {
    hipY: Math.abs(Math.sin(a)) * 0.012 - 0.006,
    hipZ: Math.sin(a) * 0.010,
    spnY: -0.10 + progress * 0.06,
    spnZ: -0.04 + progress * 0.03,
    hdX: 0.02,
    hdY: -0.14 + progress * 0.12,
    lHip: Math.sin(a) * -0.20,
    rHip: Math.sin(a + Math.PI) * -0.20,
    lKne: -(Math.max(0, Math.sin(a - 0.3)) * 0.30 + 0.04),
    rKne: -(Math.max(0, Math.sin(a + Math.PI - 0.3)) * 0.30 + 0.04),
    lAnk: Math.sin(a + 0.3) * -0.04,
    rAnk: Math.sin(a + Math.PI + 0.3) * -0.04,
    lSho: 0.08 + Math.sin(a + Math.PI) * 0.10,
    rSho: arm,
    lElb: -(Math.abs(Math.sin(a + Math.PI)) * 0.12 + 0.16),
    rElb: elb,
  }
}

// ── Standing idle (spectator) ──────────────────────────────
function standIdle(t: number): Pose {
  const ws = Math.sin(t * 0.4)
  const br = Math.sin(t * 0.55)
  return {
    hipY: br * 0.005,
    hipZ: ws * 0.008,
    spnY: 0.04 + Math.sin(t * 0.10) * 0.03,
    spnZ: ws * -0.005,
    hdX: Math.sin(t * 0.18) * 0.035 - 0.02,
    hdY: 0.06 + Math.sin(t * 0.12) * 0.05,
    lHip: ws > 0 ? 0 : ws * 0.025,
    rHip: ws > 0 ? ws * 0.025 : 0,
    lKne: -0.04 + (ws > 0 ? -0.025 : 0),
    rKne: -0.04 + (ws < 0 ? -0.025 : 0),
    lAnk: 0, rAnk: 0,
    lSho: 0.10 + Math.sin(t * 0.22) * 0.015,
    rSho: -0.08 + Math.sin(t * 0.26) * 0.015,
    lElb: -0.25 + Math.sin(t * 0.19) * 0.02,
    rElb: -0.23 + Math.sin(t * 0.21) * 0.02,
  }
}

// ── Grab — progressive reach ───────────────────────────────
function grabPose(gp: number): Pose {
  const reach = gp < 0.6
    ? (gp / 0.6) * 0.75
    : 0.75 + ((gp - 0.6) / 0.4) * 0.25
  const contactBend = gp > 0.7 ? (gp - 0.7) / 0.3 * 0.08 : 0
  return {
    hipY: 0,
    hipZ: 0,
    spnY: -0.16 * reach,
    spnZ: -0.05 * reach,
    hdX: 0.05 * reach,
    hdY: -0.22 * reach,
    lHip: 0, rHip: 0,
    lKne: -0.04, rKne: -0.04,
    lAnk: 0, rAnk: 0,
    lSho: 0.14 * reach,
    rSho: REST.rSho + (1.58 - REST.rSho) * reach,
    lElb: -0.22 - 0.06 * reach,
    rElb: REST.rElb + (-0.02 - REST.rElb) * reach - contactBend,
  }
}

// ── Reach up for cord — LEFT arm extends upward ─────────────
function reachCordPose(gp: number): Pose {
  const reach = gp < 0.5
    ? (gp / 0.5) * 0.6
    : 0.6 + ((gp - 0.5) / 0.5) * 0.4

  return {
    hipY: 0,
    hipZ: 0,
    spnY: 0.08 * reach,         // torso turns slightly toward cord
    spnZ: 0.04 * reach,         // lean slightly
    hdX: -0.10 * reach,         // head tilts up — looking at the cord
    hdY: 0.12 * reach,          // head turns toward cord
    lHip: 0, rHip: 0,
    lKne: -0.04, rKne: -0.04,
    lAnk: 0, rAnk: 0,
    lSho: REST.lSho + (2.30 - REST.lSho) * reach,  // LEFT arm reaches UP
    rSho: -0.08,                // right arm relaxed
    lElb: REST.lElb + (-0.06 - REST.lElb) * reach,  // elbow mostly straight
    rElb: -0.22,
  }
}

// ── Pull cord — LEFT arm pulls down ──────────────────────────
function pullCordPose(gp: number): Pose {
  const armDown = 2.30 - 1.40 * gp   // arm goes from 2.30 to 0.90
  const elbBend = -0.06 - 0.50 * gp  // elbow bends more
  return {
    hipY: -0.015 * gp,          // slight crouch
    hipZ: 0,
    spnY: 0.08 - 0.04 * gp,    // torso eases back
    spnZ: 0.04 - 0.02 * gp,
    hdX: -0.10 + 0.08 * gp,    // head comes back level
    hdY: 0.12 - 0.06 * gp,
    lHip: 0, rHip: 0,
    lKne: -0.04 - 0.02 * gp, rKne: -0.04,
    lAnk: 0, rAnk: 0,
    lSho: armDown,              // arm pulls down
    rSho: -0.08,
    lElb: elbBend,
    rElb: -0.22,
  }
}

// ── Presenting — right arm extended toward screen ────────
const PRESENTING: Pose = {
  hipY: 0, hipZ: 0,
  spnY: 0.12,        // torso turns slightly toward screen
  spnZ: 0,
  hdX: 0.03,         // head tilts slightly up
  hdY: 0.15,         // head looks toward screen
  lHip: 0, rHip: 0,
  lKne: -0.04, rKne: -0.04,
  lAnk: 0, rAnk: 0,
  lSho: 0.10,        // left arm relaxed
  rSho: 1.10,        // right arm raised outward (presenting gesture)
  lElb: -0.25,
  rElb: -0.18,       // elbow slightly bent, open palm
}

const CELEB: Pose = {
  hipY: 0.03, hipZ: 0, spnY: 0, spnZ: 0,
  hdX: -0.12, hdY: 0,
  lHip: 0, rHip: 0, lKne: -0.03, rKne: -0.03, lAnk: 0, rAnk: 0,
  lSho: 2.50, rSho: 2.50, lElb: -0.12, rElb: -0.12,
}

// ── Lerp ───────────────────────────────────────────────────
function lp(a: Pose, b: Pose, t: number): Pose {
  const r = {} as Pose
  for (const k of Object.keys(a) as (keyof Pose)[])
    r[k] = a[k] + (b[k] - a[k]) * t
  return r
}

// ── Camera ─────────────────────────────────────────────────
function Cam() {
  const { camera, size } = useThree()
  useEffect(() => {
    const c = camera as THREE.OrthographicCamera
    const hh = SH / 2, hw = hh * (size.width / size.height)
    c.left = -hw; c.right = hw; c.top = hh; c.bottom = -hh
    c.updateProjectionMatrix()
  }, [camera, size])
  return null
}

// ── Character ──────────────────────────────────────────────
export default function Character3D({ phase, mouseX }: { phase: CharacterPhase; mouseX?: React.RefObject<number> }) {
  const root = useRef<THREE.Group>(null!)
  const hipsR = useRef<THREE.Group>(null!)
  const spineR = useRef<THREE.Group>(null!)
  const headR = useRef<THREE.Group>(null!)
  const lShoR = useRef<THREE.Group>(null!)
  const lElbR = useRef<THREE.Group>(null!)
  const rShoR = useRef<THREE.Group>(null!)
  const rElbR = useRef<THREE.Group>(null!)
  const lHipR = useRef<THREE.Group>(null!)
  const lKneR = useRef<THREE.Group>(null!)
  const lAnkR = useRef<THREE.Group>(null!)
  const rHipR = useRef<THREE.Group>(null!)
  const rKneR = useRef<THREE.Group>(null!)
  const rAnkR = useRef<THREE.Group>(null!)
  const lEyeR = useRef<THREE.Mesh>(null!)
  const rEyeR = useRef<THREE.Mesh>(null!)

  const cur = useRef<Pose>({ ...REST })
  const wt = useRef(0)
  const pRef = useRef(phase)
  const prevP = useRef<CharacterPhase>('hidden')
  const grabStart = useRef(0)
  const pullStart = useRef(0)
  const cordReachStart = useRef(0)
  const cordPullStart = useRef(0)
  pRef.current = phase

  const mat = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({ color: '#D4A574', roughness: 0.72 }),
    gown: new THREE.MeshStandardMaterial({ color: '#5c5c5c', roughness: 0.65, metalness: 0.08 }),
    cap:  new THREE.MeshStandardMaterial({ color: '#383838', roughness: 0.45, metalness: 0.10 }),
    shoe: new THREE.MeshStandardMaterial({ color: '#6a5a4a', roughness: 0.55, metalness: 0.08 }),
    red:  new THREE.MeshStandardMaterial({ color: '#c8102e', roughness: 0.55, metalness: 0.1 }),
    eye:  new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.3 }),
    hair: new THREE.MeshStandardMaterial({ color: '#2a1810', roughness: 0.8 }),
    gold: new THREE.MeshStandardMaterial({ color: '#FFD700', roughness: 0.3, metalness: 0.5 }),
    wht:  new THREE.MeshBasicMaterial({ color: 'white' }),
    shd:  new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.08 }),
  }), [])

  const { invalidate } = useThree()

  // ── Demand-driven rendering ──
  // Active phases → 60 FPS (useFrame kicks next frame)
  // Idle → ~20 FPS (setInterval drives rendering)
  // Hidden → 0 FPS (no invalidation)
  const isActivePhase = useCallback((p: CharacterPhase) =>
    p !== 'idle' && p !== 'hidden', [])

  useEffect(() => {
    if (phase === 'hidden') return
    if (isActivePhase(phase)) {
      // Kick-start the render loop — useFrame will sustain it
      invalidate()
      return
    }
    // Idle: interval-driven at ~20 FPS for subtle breathing
    invalidate()
    const id = setInterval(() => invalidate(), 50)
    return () => clearInterval(id)
  }, [phase, invalidate, isActivePhase])

  const WALK_FREQ = 1.4
  const GRAB_DUR = PHASE_DURATIONS.grabbing / 1000
  const PULL_DUR = PHASE_DURATIONS.pulling / 1000
  const CORD_REACH_DUR = PHASE_DURATIONS.reachingCord / 1000
  const CORD_PULL_DUR = PHASE_DURATIONS.pullingCord / 1000

  useFrame((st, dt) => {
    if (!hipsR.current || !root.current) return
    const p = pRef.current
    const t = st.clock.elapsedTime
    const isWalk = p === 'entering' || p === 'approaching' || p === 'returning' || p === 'walkingToLight'
    const isPull = p === 'pulling'
    const isGrab = p === 'grabbing'
    const isCordReach = p === 'reachingCord'
    const isCordPull = p === 'pullingCord'

    // Phase-change detection
    if (p === 'grabbing' && prevP.current !== 'grabbing') grabStart.current = t
    if (p === 'pulling' && prevP.current !== 'pulling') pullStart.current = t
    if (p === 'reachingCord' && prevP.current !== 'reachingCord') cordReachStart.current = t
    if (p === 'pullingCord' && prevP.current !== 'pullingCord') cordPullStart.current = t
    prevP.current = p

    // ── Target pose ──
    let tgt: Pose
    if (isWalk) {
      wt.current += dt * WALK_FREQ
      tgt = walkPose(wt.current)
    } else if (isPull) {
      wt.current += dt * 0.9
      const pp = Math.min(1, (t - pullStart.current) / PULL_DUR)
      tgt = pullPose(wt.current, pp)
    } else if (isGrab) {
      const gp = Math.min(1, (t - grabStart.current) / GRAB_DUR)
      tgt = grabPose(gp)
    } else if (isCordReach) {
      const rp = Math.min(1, (t - cordReachStart.current) / CORD_REACH_DUR)
      tgt = reachCordPose(rp)
    } else if (isCordPull) {
      const pp = Math.min(1, (t - cordPullStart.current) / CORD_PULL_DUR)
      tgt = pullCordPose(pp)
    } else if (p === 'idle' || p === 'facingPublic') {
      tgt = standIdle(t)
    } else if (p === 'presenting' || p === 'heroReveal') {
      tgt = PRESENTING
    } else if (p === 'heroAdvance') {
      tgt = standIdle(t)
    } else if (p === 'celebrating') {
      tgt = { ...CELEB, hipY: 0.03 + Math.sin(t * 3) * 0.012 }
    } else {
      tgt = { ...REST }
    }

    // ── Lerp ──
    const spd = (isWalk || isPull) ? 12 : (isGrab || isCordReach || isCordPull) ? 8 : p === 'celebrating' ? 3.5 : 5
    cur.current = lp(cur.current, tgt, 1 - Math.exp(-spd * dt))
    const c = cur.current

    // ── Apply joints ──
    hipsR.current.position.y = 0.60 + c.hipY
    hipsR.current.rotation.z = c.hipZ
    spineR.current.rotation.y = c.spnY
    spineR.current.rotation.z = c.spnZ
    headR.current.rotation.x = c.hdX
    headR.current.rotation.y = c.hdY
    lHipR.current.rotation.z = c.lHip
    rHipR.current.rotation.z = c.rHip
    lKneR.current.rotation.z = c.lKne
    rKneR.current.rotation.z = c.rKne
    lAnkR.current.rotation.z = c.lAnk
    rAnkR.current.rotation.z = c.rAnk
    lShoR.current.rotation.z = c.lSho
    rShoR.current.rotation.z = c.rSho
    lElbR.current.rotation.z = c.lElb
    rElbR.current.rotation.z = c.rElb

    // ── Facing direction ──
    let tf: number
    if (p === 'idle') tf = FACE_SLIDES
    else if (p === 'facingPublic') tf = Math.PI * 0.5
    else if (p === 'presenting' || p === 'heroReveal') tf = FACE_SLIDES
    else if (p === 'heroAdvance') tf = FACE_SLIDES
    else if (p === 'walkingToLight') tf = FACE_CORD_WALK
    else if (isCordReach || isCordPull) tf = FACE_CORD_PULL
    else if (isGrab || isPull) tf = FACE_GRAB
    else if (p === 'approaching') tf = -0.10
    else if (p === 'celebrating') tf = Math.PI * 0.5
    else tf = FACE_RIGHT
    const fs = p === 'idle' ? 2.0 : (isGrab || isCordReach || isCordPull) ? 3 : 4
    root.current.rotation.y += (tf - root.current.rotation.y) * (1 - Math.exp(-fs * dt))

    // ── Position ──
    const tx = POS[p] ?? toX(0.83)
    if (p === 'entering') {
      const dx = tx - root.current.position.x
      const dist = Math.abs(dx)
      if (dist > 0.02) {
        const dir = Math.sign(dx)
        const factor = dist > 1.8 ? 1 : Math.max(0.08, dist / 1.8)
        root.current.position.x += dir * 2.2 * factor * dt
      }
    } else if (isPull) {
      root.current.position.x += (tx - root.current.position.x) * (1 - Math.exp(-3.5 * dt))
    } else if (p === 'walkingToLight') {
      // Smooth walk to cord — moderate speed
      root.current.position.x += (tx - root.current.position.x) * (1 - Math.exp(-3.5 * dt))
    } else {
      const ms = p === 'approaching' ? 7 : p === 'returning' ? 7 : p === 'celebrating' ? 3 : 5
      root.current.position.x += (tx - root.current.position.x) * (1 - Math.exp(-ms * dt))
    }

    root.current.visible = p !== 'hidden'

    // ── Parallax — head follows cursor in idle ──
    if (p === 'idle' && mouseX?.current !== undefined) {
      const mx = (mouseX.current - 0.5) * 2 // -1 to 1
      const targetHeadY = c.hdY + mx * 0.05  // ±3° max
      headR.current.rotation.y += (targetHeadY - headR.current.rotation.y) * (1 - Math.exp(-2 * dt))
    }

    // ── Eye blink ──
    if (lEyeR.current && rEyeR.current) {
      const bt = p === 'idle' && (t % 4.2 > 2.0 && t % 4.2 < 2.14) ? 0.06 : 1
      const bs = bt < 1 ? 0.4 : 0.25
      lEyeR.current.scale.y += (bt - lEyeR.current.scale.y) * bs
      rEyeR.current.scale.y += (bt - rEyeR.current.scale.y) * bs
    }

    // ── Sustain render loop for active phases (idle is driven by setInterval) ──
    if (isActivePhase(p)) invalidate()
  })

  const gy = -SH / 2 + 0.15

  return (
    <>
      <Cam />
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 10, 7]} intensity={0.55} />
      <hemisphereLight args={['#ddeeff', '#a08060', 0.18]} />
      {/* Rim light — back/side to separate from dark backgrounds */}
      <directionalLight position={[-4, 6, -8]} intensity={1.2} color="#9abbdd" />
      <directionalLight position={[3, 3, -6]} intensity={0.6} color="#ccbbaa" />
      {/* Low fill — illuminates legs and shoes from below-front */}
      <directionalLight position={[2, -1, 5]} intensity={0.7} color="#ddc8a8" />

      <group ref={root} position={[toX(-0.06), gy, 0]} scale={SCALE}>
        <group ref={hipsR} position={[0, 0.60, 0]}>

          {/* LEFT LEG */}
          <group ref={lHipR} position={[0, 0, 0.08]}>
            <mesh position={[0, -0.14, 0]} material={mat.shoe}>
              <capsuleGeometry args={[0.050, 0.20, 4, 12]} />
            </mesh>
            <group ref={lKneR} position={[0, -0.28, 0]}>
              <mesh position={[0, -0.12, 0]} material={mat.shoe}>
                <capsuleGeometry args={[0.040, 0.16, 4, 12]} />
              </mesh>
              <group ref={lAnkR} position={[0, -0.24, 0]}>
                <mesh position={[0.025, -0.005, 0]} material={mat.shoe}>
                  <boxGeometry args={[0.10, 0.035, 0.065]} />
                </mesh>
              </group>
            </group>
          </group>

          {/* RIGHT LEG */}
          <group ref={rHipR} position={[0, 0, -0.08]}>
            <mesh position={[0, -0.14, 0]} material={mat.shoe}>
              <capsuleGeometry args={[0.050, 0.20, 4, 12]} />
            </mesh>
            <group ref={rKneR} position={[0, -0.28, 0]}>
              <mesh position={[0, -0.12, 0]} material={mat.shoe}>
                <capsuleGeometry args={[0.040, 0.16, 4, 12]} />
              </mesh>
              <group ref={rAnkR} position={[0, -0.24, 0]}>
                <mesh position={[0.025, -0.005, 0]} material={mat.shoe}>
                  <boxGeometry args={[0.10, 0.035, 0.065]} />
                </mesh>
              </group>
            </group>
          </group>

          {/* SPINE / TORSO */}
          <group ref={spineR}>
            <mesh position={[0, 0.08, 0]} material={mat.gown}>
              <cylinderGeometry args={[0.14, 0.22, 0.58, 16]} />
            </mesh>
            <mesh position={[0, 0.40, 0]} material={mat.gown}>
              <capsuleGeometry args={[0.11, 0.06, 4, 12]} />
            </mesh>
            <mesh position={[0, 0.49, 0]} material={mat.skin}>
              <capsuleGeometry args={[0.032, 0.04, 4, 8]} />
            </mesh>

            {/* HEAD */}
            <group ref={headR} position={[0, 0.60, 0]}>
              <mesh material={mat.skin}><sphereGeometry args={[0.11, 20, 16]} /></mesh>
              <mesh position={[-0.015, 0.025, 0]} rotation={[0.15, 0, 0]} material={mat.hair}>
                <sphereGeometry args={[0.113, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
              </mesh>
              <mesh ref={lEyeR} position={[0.075, 0.02, 0.042]} material={mat.eye}>
                <sphereGeometry args={[0.019, 8, 8]} />
              </mesh>
              <mesh ref={rEyeR} position={[0.075, 0.02, -0.042]} material={mat.eye}>
                <sphereGeometry args={[0.019, 8, 8]} />
              </mesh>
              <mesh position={[0.088, 0.026, 0.046]} material={mat.wht}>
                <sphereGeometry args={[0.006, 6, 6]} />
              </mesh>
              <mesh position={[0.088, 0.026, -0.038]} material={mat.wht}>
                <sphereGeometry args={[0.006, 6, 6]} />
              </mesh>
              <mesh position={[0.10, -0.005, 0]} material={mat.skin}>
                <sphereGeometry args={[0.018, 8, 6]} />
              </mesh>
              <mesh position={[0, 0.115, 0]} material={mat.cap}>
                <boxGeometry args={[0.28, 0.018, 0.28]} />
              </mesh>
              <mesh position={[0, 0.095, 0]} material={mat.cap}>
                <cylinderGeometry args={[0.06, 0.08, 0.04, 12]} />
              </mesh>
              <mesh position={[0, 0.13, 0]} material={mat.red}>
                <sphereGeometry args={[0.016, 8, 8]} />
              </mesh>
              <mesh position={[0.08, 0.07, -0.10]} rotation={[0, 0, 0.3]} material={mat.red}>
                <capsuleGeometry args={[0.007, 0.06, 3, 6]} />
              </mesh>
              <mesh position={[0.09, 0.03, -0.10]} material={mat.red}>
                <sphereGeometry args={[0.014, 6, 6]} />
              </mesh>
            </group>

            {/* LEFT ARM — wider shoulder offset for visibility */}
            <group ref={lShoR} position={[0, 0.40, SHOULDER_Z]}>
              <mesh position={[0, -0.10, 0]} material={mat.gown}>
                <capsuleGeometry args={[0.044, 0.14, 4, 10]} />
              </mesh>
              <group ref={lElbR} position={[0, -0.22, 0]}>
                <mesh position={[0, -0.09, 0]} material={mat.gown}>
                  <capsuleGeometry args={[0.036, 0.12, 4, 10]} />
                </mesh>
                <mesh position={[0, -0.18, 0]} material={mat.skin}>
                  <sphereGeometry args={[0.036, 10, 10]} />
                </mesh>
                {phase === 'celebrating' && (
                  <group position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={mat.red}>
                      <cylinderGeometry args={[0.025, 0.025, 0.16, 10]} />
                    </mesh>
                    <mesh position={[0, 0.06, 0]} material={mat.gold}>
                      <torusGeometry args={[0.027, 0.005, 6, 16]} />
                    </mesh>
                    <mesh position={[0, -0.06, 0]} material={mat.gold}>
                      <torusGeometry args={[0.027, 0.005, 6, 16]} />
                    </mesh>
                  </group>
                )}
              </group>
            </group>

            {/* RIGHT ARM — grabbing arm, wider offset */}
            <group ref={rShoR} position={[0, 0.40, -SHOULDER_Z]}>
              <mesh position={[0, -0.10, 0]} material={mat.gown}>
                <capsuleGeometry args={[0.044, 0.14, 4, 10]} />
              </mesh>
              <group ref={rElbR} position={[0, -0.22, 0]}>
                <mesh position={[0, -0.09, 0]} material={mat.gown}>
                  <capsuleGeometry args={[0.036, 0.12, 4, 10]} />
                </mesh>
                <mesh position={[0, -0.18, 0]} material={mat.skin}>
                  <sphereGeometry args={[0.036, 10, 10]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* Shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <circleGeometry args={[0.22, 20]} />
          <primitive object={mat.shd} attach="material" />
        </mesh>
      </group>
    </>
  )
}
