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

function EyeScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const irisGroupRef = useRef<THREE.Group>(null);
  const eyeGroupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector2(0, 0));
  const hasMouseMoved = useRef(false);

  // Blink state
  const nextBlinkAt = useRef(3000 + Math.random() * 3000);
  const blinkElapsed = useRef(0);
  const blinkState = useRef<"open" | "closing" | "opening">("open");
  const blinkProgress = useRef(1); // 1 = fully open, 0.05 = closed

  // Eye shape geometry (memoized)
  const eyeShape = useMemo(() => makeEyeShape(), []);
  const eyeShapeGeo = useMemo(() => new THREE.ShapeGeometry(eyeShape, 48), [eyeShape]);
  const eyeEdgesGeo = useMemo(() => new THREE.EdgesGeometry(eyeShapeGeo, 1), [eyeShapeGeo]);

  // Stencil materials (memoized)
  const stencilMaskMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: false,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.AlwaysStencilFunc,
        stencilZPass: THREE.ReplaceStencilOp,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        side: THREE.DoubleSide,
      }),
    []
  );

  const makeStenciledMat = (
    props: THREE.MeshStandardMaterialParameters
  ): THREE.MeshStandardMaterialParameters => ({
    ...props,
    stencilWrite: false,
    stencilRef: 1,
    stencilFunc: THREE.EqualStencilFunc,
  });

  const makeStenciledBasicMat = (
    props: THREE.MeshBasicMaterialParameters
  ): THREE.MeshBasicMaterialParameters => ({
    ...props,
    stencilWrite: false,
    stencilRef: 1,
    stencilFunc: THREE.EqualStencilFunc,
  });

  // Event listeners for cursor
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
    const deltaMs = delta * 1000;

    // Idle animation when no mouse
    if (!hasMouseMoved.current) {
      targetPos.current.x = Math.sin(time) * 0.4;
      targetPos.current.y = Math.sin(time * 2) * 0.2;
    }

    // --- Iris tracking ---
    if (irisGroupRef.current) {
      irisGroupRef.current.position.x +=
        (targetPos.current.x - irisGroupRef.current.position.x) * 0.06;
      irisGroupRef.current.position.y +=
        (targetPos.current.y - irisGroupRef.current.position.y) * 0.06;
      irisGroupRef.current.position.z = Math.sin(time * 0.8) * 0.15;
      irisGroupRef.current.rotation.z -= 0.3 * delta;
    }

    // --- 3D rotation of the whole eye ---
    if (sceneGroupRef.current) {
      const targetRotY = targetPos.current.x * 0.15;
      const targetRotX = -targetPos.current.y * 0.08;
      sceneGroupRef.current.rotation.y +=
        (targetRotY - sceneGroupRef.current.rotation.y) * 0.06;
      sceneGroupRef.current.rotation.x +=
        (targetRotX - sceneGroupRef.current.rotation.x) * 0.06;
    }

    // --- Blinking ---
    blinkElapsed.current += deltaMs;

    if (blinkState.current === "open") {
      if (blinkElapsed.current >= nextBlinkAt.current) {
        blinkState.current = "closing";
        blinkElapsed.current = 0;
      }
    } else if (blinkState.current === "closing") {
      blinkProgress.current = Math.max(0.05, blinkProgress.current - deltaMs / 80);
      if (blinkProgress.current <= 0.05) {
        blinkState.current = "opening";
        blinkElapsed.current = 0;
      }
    } else if (blinkState.current === "opening") {
      blinkProgress.current = Math.min(1, blinkProgress.current + deltaMs / 120);
      if (blinkProgress.current >= 1) {
        blinkState.current = "open";
        blinkElapsed.current = 0;
        nextBlinkAt.current = 3000 + Math.random() * 3000;
      }
    }

    if (eyeGroupRef.current) {
      eyeGroupRef.current.scale.y = blinkProgress.current;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[1, 1, 2]} color="#4A9BAB" intensity={3.0} />
      <pointLight position={[-1, -0.5, 1]} color="#132E35" intensity={1.0} />

      {/* Everything that should blink together */}
      <group ref={eyeGroupRef}>

        {/* ---- STENCIL MASK: invisible fill of the eye shape ---- */}
        <mesh renderOrder={0} geometry={eyeShapeGeo} material={stencilMaskMat} />

        {/* ---- EYE OUTLINE: visible strokes ---- */}
        <lineSegments renderOrder={2} geometry={eyeEdgesGeo}>
          <lineBasicMaterial color="#AFB3B7" linewidth={1.5} />
        </lineSegments>

        {/* ---- IRIS GROUP: clipped by the stencil ---- */}
        <group ref={irisGroupRef}>
          <pointLight position={[0, 0, 1.5]} color="#4A9BAB" intensity={2.0} />

          {/* Ring */}
          <mesh position={[0, 0, 0]} renderOrder={1}>
            <ringGeometry args={[0.75, 1.1, 48]} />
            <meshStandardMaterial
              {...makeStenciledMat({
                color: "#4A9BAB",
                emissive: "#4A9BAB",
                emissiveIntensity: 0.8,
                side: THREE.DoubleSide,
              })}
            />
          </mesh>

          {/* Void */}
          <mesh position={[0, 0, -0.01]} renderOrder={1}>
            <circleGeometry args={[0.75, 32]} />
            <meshBasicMaterial
              {...makeStenciledBasicMat({
                color: "#050A0E",
                side: THREE.DoubleSide,
              })}
            />
          </mesh>

          {/* Center Dot */}
          <mesh position={[0, 0, 0.01]} renderOrder={1}>
            <circleGeometry args={[0.25, 24]} />
            <meshBasicMaterial
              {...makeStenciledBasicMat({
                color: "#4A9BAB",
                side: THREE.DoubleSide,
              })}
            />
          </mesh>
        </group>
      </group>

      {/* Particles orbit outside the eye — NOT clipped */}
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
    <div className="w-[320px] h-[180px] md:w-[580px] md:h-[360px] mx-auto md:mx-0 mt-12 md:mt-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ stencil: true }}
      >
        <EyeScene />
      </Canvas>
    </div>
  );
}
