'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EyeScene() {
  const irisRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const blinkRef = useRef<THREE.Group>(null);
  const blinkTimer = useRef(3 + Math.random() * 3);
  const blinkState = useRef(0); // 0 = open, going to 1 = closed, back to 0

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    // Smooth iris tracking
    current.current.x += (mouse.current.x * 0.6 - current.current.x) * 0.06;
    current.current.y += (mouse.current.y * 0.3 - current.current.y) * 0.06;

    if (irisRef.current) {
      irisRef.current.position.x = current.current.x;
      irisRef.current.position.y = current.current.y;
    }

    // Slow outer ring rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }

    // Blinking
    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0) {
      blinkTimer.current = 3 + Math.random() * 4;
      blinkState.current = 0.001;
    }

    if (blinkState.current > 0 && blinkRef.current) {
      blinkState.current += delta * 6;
      const progress = blinkState.current;
      let scaleY: number;
      if (progress < 1) scaleY = progress;
      else if (progress < 2) scaleY = 2 - progress;
      else {
        scaleY = 0;
        blinkState.current = 0;
      }
      blinkRef.current.scale.y = Math.max(0.01, scaleY);
    }
  });

  // Top Eyelid shape (upper half of eye, strictly bounded by eye curve)
  const lidShape = new THREE.Shape();
  lidShape.moveTo(-2.5, 0);
  lidShape.bezierCurveTo(-2.5, 0, -0.8, 0.9, 0, 0.9);
  lidShape.bezierCurveTo(0.8, 0.9, 2.5, 0, 2.5, 0);
  lidShape.bezierCurveTo(0.8, 0, 0, 0, -2.5, 0);

  // Bottom Eyelid shape (lower half of eye, strictly bounded by eye curve)
  const bottomLidShape = new THREE.Shape();
  bottomLidShape.moveTo(-2.5, 0);
  bottomLidShape.bezierCurveTo(-2.5, 0, -0.8, -0.9, 0, -0.9);
  bottomLidShape.bezierCurveTo(0.8, -0.9, 2.5, 0, 2.5, 0);
  bottomLidShape.bezierCurveTo(0.8, 0, 0, 0, -2.5, 0);

  return (
    <group>
      {/* Eye outline — top arc */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-2.5, 0, 0),
              new THREE.Vector3(-1.2, 0.75, 0),
              new THREE.Vector3(0, 0.9, 0),
              new THREE.Vector3(1.2, 0.75, 0),
              new THREE.Vector3(2.5, 0, 0),
            ]),
            64,
            0.018,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#8A9BA8" />
      </mesh>

      {/* Eye outline — bottom arc (darker, thicker) */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-2.5, 0, 0),
              new THREE.Vector3(-1.2, -0.75, 0),
              new THREE.Vector3(0, -0.9, 0),
              new THREE.Vector3(1.2, -0.75, 0),
              new THREE.Vector3(2.5, 0, 0),
            ]),
            64,
            0.028,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#1C3A42" />
      </mesh>

      {/* Corner dots */}
      {[
        [-2.5, 0],
        [2.5, 0],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#4A9BAB" />
        </mesh>
      ))}

      {/* Landmark dots — left side only */}
      {[
        [-1.8, 0.55],
        [-1.2, 0.78],
        [-0.5, 0.87],
        [-1.8, -0.55],
        [-1.2, -0.72],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#4A9BAB"
            emissive="#4A9BAB"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Iris group — this moves with cursor */}
      <group ref={irisRef}>
        {/* Outer rotating ring */}
        <mesh ref={outerRingRef} position={[0, 0, 0.1]}>
          <ringGeometry args={[0.55, 0.65, 64]} />
          <meshStandardMaterial
            color="#4A9BAB"
            emissive="#4A9BAB"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Main iris */}
        <mesh position={[0, 0, 0.15]}>
          <circleGeometry args={[0.5, 64]} />
          <meshStandardMaterial
            color="#4A9BAB"
            emissive="#4A9BAB"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Pupil */}
        <mesh position={[0, 0, 0.2]}>
          <circleGeometry args={[0.22, 64]} />
          <meshBasicMaterial color="#030810" />
        </mesh>

        {/* Pupil highlight */}
        <mesh position={[0.08, 0.08, 0.25]}>
          <circleGeometry args={[0.06, 32]} />
          <meshBasicMaterial color="#7ECFDB" />
        </mesh>
      </group>

      {/* BLINK OVERLAY — covers iris during blink, stays strictly inside eye boundary */}
      <group ref={blinkRef} position={[0, 0, 0.3]} scale={[1, 0.01, 1]}>
        {/* Top lid */}
        <mesh position={[0, 0, 0]}>
          <shapeGeometry args={[lidShape]} />
          <meshBasicMaterial color="#050A0E" />
        </mesh>
        {/* Bottom lid */}
        <mesh position={[0, 0, 0]}>
          <shapeGeometry args={[bottomLidShape]} />
          <meshBasicMaterial color="#050A0E" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0.5, 0.5, 2]} color="#4A9BAB" intensity={2} />
      <pointLight position={[-1, -0.5, 1]} color="#132E35" intensity={0.8} />
    </group>
  );
}

export default function CursorEye() {
  return (
    <div
      className="w-[320px] h-[160px] md:w-[520px] md:h-[260px] mx-auto md:mx-0 mt-12 md:mt-0 pointer-events-none"
      style={{
        filter: 'drop-shadow(0 0 25px rgba(74,155,171,0.2))',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <EyeScene />
      </Canvas>
    </div>
  );
}
