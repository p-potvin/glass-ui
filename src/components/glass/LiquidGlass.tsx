/// <reference types="@react-three/fiber" />
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, RoundedBox, Float } from '@react-three/drei'
import * as THREE from 'three'

function LiquidShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float floatIntensity={2} speed={2}>
      <RoundedBox ref={meshRef} args={[2.5, 2.5, 0.4]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          background={new THREE.Color('#fdf6e3')}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.05}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </RoundedBox>
    </Float>
  )
}

function FloatingOrbs() {
  return (
    <>
      <mesh position={[-2, -1, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#cb4b16" roughness={0.2} />
      </mesh>
      <mesh position={[2, 1, -3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#268bd2" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#859900" roughness={0.2} />
      </mesh>
    </>
  )
}

function RefractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float floatIntensity={3} speed={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial
          background={new THREE.Color('#268bd2')}
          thickness={1.5}
          roughness={0}
          transmission={1}
          ior={1.8}
          chromaticAberration={0.15}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
        />
      </mesh>
    </Float>
  )
}

function TexturedGlassKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
      meshRef.current.rotation.y += 0.015
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <Float floatIntensity={1} speed={3}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.4, 128, 32]} />
        <MeshTransmissionMaterial
          background={new THREE.Color('#d33682')}
          thickness={0.8}
          roughness={0.15}
          transmission={0.9}
          ior={1.2}
          chromaticAberration={0.08}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export const LiquidGlassEffect = () => {
  return (
    <div
      className="w-full h-96 relative overflow-hidden rounded-2xl bg-surface-alt border border-vault-muted/20 shadow-inner"
      role="img"
      aria-label="Interactive 3D rendering of a refractive liquid shape"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <h2 className="text-6xl font-bold text-vault-muted opacity-20 select-none">iOS 26 Liquid</h2>
      </div>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <FloatingOrbs />
          <LiquidShape />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  )
}

export const RefractiveSphereEffect = () => {
  return (
    <div
      className="w-full h-96 relative overflow-hidden rounded-2xl bg-vault-base border border-vault-muted/20 shadow-inner"
      role="img"
      aria-label="Interactive 3D rendering of a refractive bubble over colored orbs"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <h2 className="text-6xl font-bold text-vault-muted opacity-20 select-none">Refractive Bubble</h2>
      </div>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <FloatingOrbs />
          <RefractiveSphere />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  )
}

export const TexturedGlassCubeEffect = () => {
  return (
    <div
      className="w-full h-96 relative overflow-hidden rounded-2xl bg-vault-paper border border-vault-muted/20 shadow-inner"
      role="img"
      aria-label="Interactive 3D rendering of a frosted glass knot over colored orbs"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <h2 className="text-6xl font-bold text-vault-muted opacity-20 select-none">Frosted Knot</h2>
      </div>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <FloatingOrbs />
          <TexturedGlassKnot />
          <Environment preset="apartment" />
        </Canvas>
      </div>
    </div>
  )
}
