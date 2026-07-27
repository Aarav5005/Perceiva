"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function EyeScene() {
  const irisGroupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector2(0, 0));
  const hasMouseMoved = useRef(false);

  // Outer Eye Arcs
  const topCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.75, 0, 0),
    new THREE.Vector3(0, 1.12, 0),
    new THREE.Vector3(2.75, 0, 0),
  ]), []);

  const bottomCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.75, 0, 0),
    new THREE.Vector3(0, -1.12, 0),
    new THREE.Vector3(2.75, 0, 0),
  ]), []);

  // Event Listeners for Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      hasMouseMoved.current = true;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      // Scale to ±0.8 X, ±0.4 Y
      targetPos.current.set(nx * 0.8, ny * 0.4);
    };

    const handleMouseLeave = () => {
      hasMouseMoved.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!hasMouseMoved.current) {
      targetPos.current.x = Math.sin(time) * 0.4;
      targetPos.current.y = Math.sin(time * 2) * 0.2;
    }

    if (irisGroupRef.current) {
      // Lerp Position
      irisGroupRef.current.position.x += (targetPos.current.x - irisGroupRef.current.position.x) * 0.06;
      irisGroupRef.current.position.y += (targetPos.current.y - irisGroupRef.current.position.y) * 0.06;

      // Pulse Z
      irisGroupRef.current.position.z = Math.sin(time * 0.8) * 0.15;

      // Rotate Iris
      // Using modulo to prevent large number buildup, rotating 0.3 rad/sec
      irisGroupRef.current.rotation.z -= 0.3 * state.clock.getDelta();
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[1, 1, 2]} color="#4A9BAB" intensity={1.5} />

      {/* Top Arc */}
      <mesh>
        <tubeGeometry args={[topCurve, 32, 0.02, 8, false]} />
        <meshBasicMaterial color="#AFB3B7" />
      </mesh>

      {/* Bottom Arc */}
      <mesh>
        <tubeGeometry args={[bottomCurve, 32, 0.04, 8, false]} />
        <meshBasicMaterial color="#2D4A53" />
      </mesh>

      {/* Iris Group */}
      <group ref={irisGroupRef}>
        <pointLight position={[0, 0, 1.5]} color="#4A9BAB" intensity={2.0} />
        {/* Ring */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.75, 1.1, 48]} />
          <meshStandardMaterial color="#4A9BAB" emissive="#4A9BAB" emissiveIntensity={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* Void */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial color="#050A0E" side={THREE.DoubleSide} />
        </mesh>
        {/* Center Dot */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#4A9BAB" side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Particles />
    </group>
  );
}

function Particles() {
  const numParticles = 12;
  const particleRefs = useRef<THREE.Mesh[]>([]);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = (Math.PI * 2) / 8; // 1 revolution per 8 seconds

    const positions: number[] = [];

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2 + (time * speed);
      const x = Math.cos(angle) * 1.9;
      const y = Math.sin(angle) * 0.7;

      const mesh = particleRefs.current[i];
      if (mesh) {
        mesh.position.set(x, y, 0);

        // Opacity mapping for particles
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (x < 0) {
          material.opacity = 0.3 + (Math.abs(x) / 1.9) * 0.7; // fade in on left
          material.transparent = true;
        } else {
          material.opacity = 1.0;
          material.transparent = false;
        }
      }

      // Calculate next particle to draw line segments
      const nextAngle = (((i + 1) % numParticles) / numParticles) * Math.PI * 2 + (time * speed);
      const nextX = Math.cos(nextAngle) * 1.9;
      const nextY = Math.sin(nextAngle) * 0.7;

      // Only connect if BOTH particles are on the left side (x < 0)
      if (x < 0 && nextX < 0) {
        positions.push(x, y, 0);
        positions.push(nextX, nextY, 0);
      }
    }

    // Update line geometry
    if (lineGeoRef.current) {
      if (positions.length > 0) {
        lineGeoRef.current.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );
        lineGeoRef.current.setDrawRange(0, positions.length / 3);
      } else {
        lineGeoRef.current.setDrawRange(0, 0);
      }
    }
  });

  return (
    <group>
      {Array.from({ length: numParticles }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) particleRefs.current[i] = el; }}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#4A9BAB" emissive="#4A9BAB" emissiveIntensity={0.8} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef} />
        <lineBasicMaterial color="#4A9BAB" opacity={0.3} transparent={true} />
      </lineSegments>
    </group>
  );
}

export default function CursorEye() {
  return (
    <div className="w-[320px] h-[180px] md:w-[580px] md:h-[360px] mx-auto md:mx-0 mt-12 md:mt-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <EyeScene />
      </Canvas>
    </div>
  );
}
