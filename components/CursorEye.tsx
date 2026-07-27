"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Build the almond/lens eye shape as a THREE.Shape
function makeEyeShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(-2.7, 0);
  shape.bezierCurveTo(-2.7, 0, -0.8, 1.1, 0, 1.1);
  shape.bezierCurveTo(0.8, 1.1, 2.7, 0, 2.7, 0);
  shape.bezierCurveTo(2.7, 0, 0.8, -1.1, 0, -1.1);
  shape.bezierCurveTo(-0.8, -1.1, -2.7, 0, -2.7, 0);
  return shape;
}

// Top eyelid shape (local origin at y = 1.1)
function makeTopLidShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(-2.7, 0);
  shape.bezierCurveTo(-2.7, 0, -0.8, 0, 0, 0);
  shape.bezierCurveTo(0.8, 0, 2.7, 0, 2.7, 0);
  shape.bezierCurveTo(2.7, 0, 0.8, -1.1, 0, -1.1);
  shape.bezierCurveTo(-0.8, -1.1, -2.7, 0, -2.7, 0);
  return shape;
}

// Bottom eyelid shape (local origin at y = -1.1)
function makeBottomLidShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(-2.7, 0);
  shape.bezierCurveTo(-2.7, 0, -0.8, 0, 0, 0);
  shape.bezierCurveTo(0.8, 0, 2.7, 0, 2.7, 0);
  shape.bezierCurveTo(2.7, 0, 0.8, 1.1, 0, 1.1);
  shape.bezierCurveTo(-0.8, 1.1, -2.7, 0, -2.7, 0);
  return shape;
}

function EyeScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const irisGroupRef = useRef<THREE.Group>(null);
  const topLidRef = useRef<THREE.Mesh>(null);
  const bottomLidRef = useRef<THREE.Mesh>(null);

  const targetPos = useRef(new THREE.Vector2(0, 0));
  const hasMouseMoved = useRef(false);

  // Blink state refs
  const blinkTimer = useRef(2000 + Math.random() * 4000);
  const isBlinking = useRef(false);
  const blinkPhase = useRef(0);

  // Curves for bold 3D outline
  const topCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.7, 0, 0),
        new THREE.Vector3(-1.8, 0.72, 0),
        new THREE.Vector3(0, 1.1, 0),
        new THREE.Vector3(1.8, 0.72, 0),
        new THREE.Vector3(2.7, 0, 0),
      ]),
    []
  );

  const bottomCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.7, 0, 0),
        new THREE.Vector3(-1.8, -0.72, 0),
        new THREE.Vector3(0, -1.1, 0),
        new THREE.Vector3(1.8, -0.72, 0),
        new THREE.Vector3(2.7, 0, 0),
      ]),
    []
  );

  // Generate stylized 3D eyelashes along the top curve
  const eyelashes = useMemo(() => {
    const lashes: { curve: THREE.CatmullRomCurve3 }[] = [];
    const tValues = [0.16, 0.29, 0.42, 0.58, 0.71, 0.84];

    tValues.forEach((t) => {
      const point = topCurve.getPoint(t);
      const tangent = topCurve.getTangent(t);
      // Normal vector pointing outward and slightly forward
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0.25).normalize();

      const lashLength = 0.38 + Math.sin(t * Math.PI) * 0.14;
      const tip = point.clone().add(normal.multiplyScalar(lashLength));
      const mid = point.clone().add(normal.clone().multiplyScalar(lashLength * 0.55));
      mid.z += 0.08;

      const lashCurve = new THREE.CatmullRomCurve3([point, mid, tip]);
      lashes.push({ curve: lashCurve });
    });

    return lashes;
  }, [topCurve]);

  // Geometries for eyelid overlays
  const topLidShape = useMemo(() => makeTopLidShape(), []);
  const topLidGeo = useMemo(() => new THREE.ShapeGeometry(topLidShape, 32), [topLidShape]);

  const bottomLidShape = useMemo(() => makeBottomLidShape(), []);
  const bottomLidGeo = useMemo(() => new THREE.ShapeGeometry(bottomLidShape, 32), [bottomLidShape]);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      hasMouseMoved.current = true;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
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
    const delta = state.clock.getDelta();

    // Idle animation
    if (!hasMouseMoved.current) {
      targetPos.current.x = Math.sin(time) * 0.4;
      targetPos.current.y = Math.sin(time * 2) * 0.2;
    }

    // Iris lerp & pulse
    if (irisGroupRef.current) {
      irisGroupRef.current.position.x +=
        (targetPos.current.x - irisGroupRef.current.position.x) * 0.06;
      irisGroupRef.current.position.y +=
        (targetPos.current.y - irisGroupRef.current.position.y) * 0.06;
      irisGroupRef.current.position.z = Math.sin(time * 0.8) * 0.15;
      irisGroupRef.current.rotation.z -= 0.3 * delta;
    }

    // 3D rotation of whole eye
    if (sceneGroupRef.current) {
      const targetRotY = targetPos.current.x * 0.15;
      const targetRotX = -targetPos.current.y * 0.08;
      sceneGroupRef.current.rotation.y +=
        (targetRotY - sceneGroupRef.current.rotation.y) * 0.06;
      sceneGroupRef.current.rotation.x +=
        (targetRotX - sceneGroupRef.current.rotation.x) * 0.06;
    }

    // Blinking logic
    blinkTimer.current -= delta * 1000;

    if (blinkTimer.current <= 0 && !isBlinking.current) {
      isBlinking.current = true;
      blinkPhase.current = 0;
      blinkTimer.current = 2000 + Math.random() * 4000;
    }

    if (isBlinking.current) {
      blinkPhase.current += delta * 8; // speed of blink

      if (blinkPhase.current < 1) {
        // closing
        const t = blinkPhase.current;
        if (topLidRef.current) topLidRef.current.scale.y = t * 0.95 + 0.05;
        if (bottomLidRef.current) bottomLidRef.current.scale.y = t * 0.95 + 0.05;
      } else if (blinkPhase.current < 2) {
        // opening
        const t = blinkPhase.current - 1;
        if (topLidRef.current) topLidRef.current.scale.y = 1 - t * 0.95;
        if (bottomLidRef.current) bottomLidRef.current.scale.y = 1 - t * 0.95;
      } else {
        // done
        isBlinking.current = false;
        if (topLidRef.current) topLidRef.current.scale.y = 0.05;
        if (bottomLidRef.current) bottomLidRef.current.scale.y = 0.05;
      }
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[1, 1, 2]} color="#4A9BAB" intensity={3.0} />
      <pointLight position={[-1, -0.5, 1]} color="#132E35" intensity={1.0} />

      {/* Bold 3D Top Eyelid Rim */}
      <mesh>
        <tubeGeometry args={[topCurve, 48, 0.045, 8, false]} />
        <meshStandardMaterial
          color="#AFB3B7"
          emissive="#AFB3B7"
          emissiveIntensity={0.25}
          roughness={0.3}
        />
      </mesh>

      {/* Bold 3D Bottom Eyelid Rim */}
      <mesh>
        <tubeGeometry args={[bottomCurve, 48, 0.038, 8, false]} />
        <meshStandardMaterial
          color="#2D4A53"
          emissive="#2D4A53"
          emissiveIntensity={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* Stylized 3D Eyelashes along the top eyelid */}
      <group>
        {eyelashes.map((lash, idx) => (
          <mesh key={idx}>
            <tubeGeometry args={[lash.curve, 12, 0.022, 6, false]} />
            <meshStandardMaterial
              color="#AFB3B7"
              emissive="#4A9BAB"
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Iris Group */}
      <group ref={irisGroupRef}>
        <pointLight position={[0, 0, 1.5]} color="#4A9BAB" intensity={2.0} />

        {/* Ring */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.75, 1.1, 48]} />
          <meshStandardMaterial
            color="#4A9BAB"
            emissive="#4A9BAB"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
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

      {/* Top Eyelid Overlay (sits in FRONT of iris at z=0.5) */}
      <mesh
        ref={topLidRef}
        position={[0, 1.1, 0.5]}
        scale={[1, 0.05, 1]}
        geometry={topLidGeo}
      >
        <meshBasicMaterial color="#050A0E" side={THREE.DoubleSide} />
      </mesh>

      {/* Bottom Eyelid Overlay (sits in FRONT of iris at z=0.5) */}
      <mesh
        ref={bottomLidRef}
        position={[0, -1.1, 0.5]}
        scale={[1, 0.05, 1]}
        geometry={bottomLidGeo}
      >
        <meshBasicMaterial color="#050A0E" side={THREE.DoubleSide} />
      </mesh>

      {/* Particles orbit outside */}
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
    const speed = (Math.PI * 2) / 8;

    const positions: number[] = [];

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2 + time * speed;
      const x = Math.cos(angle) * 1.9;
      const y = Math.sin(angle) * 0.7;

      const mesh = particleRefs.current[i];
      if (mesh) {
        mesh.position.set(x, y, 0);

        const material = mesh.material as THREE.MeshStandardMaterial;
        if (x < 0) {
          material.opacity = 0.3 + (Math.abs(x) / 1.9) * 0.7;
          material.transparent = true;
        } else {
          material.opacity = 1.0;
          material.transparent = false;
        }
      }

      const nextAngle =
        (((i + 1) % numParticles) / numParticles) * Math.PI * 2 + time * speed;
      const nextX = Math.cos(nextAngle) * 1.9;
      const nextY = Math.sin(nextAngle) * 0.7;

      if (x < 0 && nextX < 0) {
        positions.push(x, y, 0);
        positions.push(nextX, nextY, 0);
      }
    }

    if (lineGeoRef.current) {
      if (positions.length > 0) {
        lineGeoRef.current.setAttribute(
          "position",
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
        <mesh
          key={i}
          ref={(el) => {
            if (el) particleRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color="#4A9BAB"
            emissive="#4A9BAB"
            emissiveIntensity={0.8}
          />
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
    <div
      className="w-[320px] h-[180px] md:w-[580px] md:h-[360px] mx-auto md:mx-0 mt-12 md:mt-0 pointer-events-none"
      style={{
        clipPath: 'path("M 70,180 C 70,180 228,45 290,45 C 352,45 510,180 510,180 C 510,180 352,315 290,315 C 228,315 70,180 70,180 Z")',
        overflow: 'hidden'
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <EyeScene />
      </Canvas>
    </div>
  );
}
