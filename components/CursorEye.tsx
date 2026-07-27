"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────
const EYE_W   = 2.75;   // half-width of the eye shape
const EYE_H   = 1.12;   // peak height of the arcs
// Maximum iris travel so it never goes outside the eyelid boundary
const MAX_X   = 1.0;    // ±units in X
const MAX_Y   = 0.38;   // ±units in Y

// ─── Build a filled eye-shaped polygon (lens shape) for the stencil ──────────
function buildEyeShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const segments = 64;
  // Top arc: left → right via top peak
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(-EYE_W, EYE_W, t);
    // Quadratic bezier: P0=(-EYE_W,0), P1=(0,EYE_H), P2=(EYE_W,0)
    const mt = 1 - t;
    const y = mt * mt * 0 + 2 * mt * t * EYE_H + t * t * 0;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  // Bottom arc: right → left via bottom peak
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(EYE_W, -EYE_W, t);
    const mt = 1 - t;
    const y = mt * mt * 0 + 2 * mt * t * (-EYE_H) + t * t * 0;
    shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

// ─── EyeScene ─────────────────────────────────────────────────────────────────
function EyeScene({ isHovered }: { isHovered: React.MutableRefObject<boolean> }) {
  const irisGroupRef  = useRef<THREE.Group>(null);
  const topLidRef     = useRef<THREE.Mesh>(null);
  const bottomLidRef  = useRef<THREE.Mesh>(null);
  const targetPos     = useRef(new THREE.Vector2(0, 0));
  const hasMouseMoved = useRef(false);

  // Blink state
  const blinkPhase    = useRef<"idle"|"closing"|"opening">("idle");
  const blinkProgress = useRef(0); // 0=open, 1=fully closed
  const nextBlink     = useRef(3 + Math.random() * 4); // seconds until next auto-blink

  // Eye shape (for stencil mask + visible arcs)
  const eyeShape = useMemo(() => buildEyeShape(), []);

  // Stencil geometry (filled lens shape written to stencil buffer)
  const stencilGeo = useMemo(() => new THREE.ShapeGeometry(eyeShape, 64), [eyeShape]);

  // Top arc tube
  const topCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-EYE_W, 0, 0),
    new THREE.Vector3(0, EYE_H, 0),
    new THREE.Vector3(EYE_W, 0, 0),
  ]), []);

  // Bottom arc tube
  const bottomCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-EYE_W, 0, 0),
    new THREE.Vector3(0, -EYE_H, 0),
    new THREE.Vector3(EYE_W, 0, 0),
  ]), []);

  // Lid geometry: a flat rectangle that slides down/up over the eye
  const lidGeo = useMemo(() => new THREE.PlaneGeometry(EYE_W * 2 + 0.5, EYE_H + 0.3), []);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      hasMouseMoved.current = true;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPos.current.set(
        Math.max(-MAX_X, Math.min(MAX_X, nx * MAX_X)),
        Math.max(-MAX_Y, Math.min(MAX_Y, ny * MAX_Y))
      );
    };
    const onLeave = () => { hasMouseMoved.current = false; };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const triggerBlink = useCallback(() => {
    if (blinkPhase.current === "idle") {
      blinkPhase.current = "closing";
      blinkProgress.current = 0;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // ── Idle drift ──
    if (!hasMouseMoved.current) {
      targetPos.current.x = Math.sin(time * 0.7) * MAX_X * 0.5;
      targetPos.current.y = Math.sin(time * 1.3) * MAX_Y * 0.5;
    }

    // ── Iris lerp ──
    if (irisGroupRef.current) {
      irisGroupRef.current.position.x +=
        (targetPos.current.x - irisGroupRef.current.position.x) * 0.06;
      irisGroupRef.current.position.y +=
        (targetPos.current.y - irisGroupRef.current.position.y) * 0.06;
      irisGroupRef.current.position.z = Math.sin(time * 0.8) * 0.12;
      irisGroupRef.current.rotation.z -= 0.3 * delta;
    }

    // ── Auto-blink timer ──
    nextBlink.current -= delta;
    if (nextBlink.current <= 0) {
      triggerBlink();
      nextBlink.current = 3 + Math.random() * 5;
    }

    // ── Hover blink ──
    if (isHovered.current && blinkPhase.current === "idle") {
      triggerBlink();
    }

    // ── Animate blink lids ──
    const BLINK_SPEED = 8; // units per second
    if (blinkPhase.current === "closing") {
      blinkProgress.current = Math.min(1, blinkProgress.current + delta * BLINK_SPEED);
      if (blinkProgress.current >= 1) blinkPhase.current = "opening";
    } else if (blinkPhase.current === "opening") {
      blinkProgress.current = Math.max(0, blinkProgress.current - delta * (BLINK_SPEED * 0.6));
      if (blinkProgress.current <= 0) blinkPhase.current = "idle";
    }

    // Map blinkProgress → lid Y position
    // Top lid slides DOWN (from above eye to center)
    // Bottom lid slides UP (from below eye to center)
    const bp = blinkProgress.current;
    const topY    = EYE_H * 0.5 + 0.15 - bp * (EYE_H * 0.5 + 0.15);
    const bottomY = -(EYE_H * 0.5 + 0.15) + bp * (EYE_H * 0.5 + 0.15);

    if (topLidRef.current)    topLidRef.current.position.y    = topY;
    if (bottomLidRef.current) bottomLidRef.current.position.y = bottomY;
  });

  // ── Stencil materials ──
  const stencilWriteMat = useMemo(() => new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: false,
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilZPass: THREE.ReplaceStencilOp,
    stencilRef: 1,
  }), []);

  const irisMaskMat = useMemo(() => ({
    stencilWrite: false,
    stencilFunc: THREE.EqualStencilFunc,
    stencilRef: 1,
  }), []);

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[1, 1, 2]} color="#4A9BAB" intensity={1.5} />

      {/* ── Step 1: Write eye shape into stencil buffer ── */}
      <mesh geometry={stencilGeo} renderOrder={0}>
        <primitive object={stencilWriteMat} />
      </mesh>

      {/* ── Step 2: Iris group — only renders where stencil === 1 ── */}
      <group ref={irisGroupRef} renderOrder={1}>
        <pointLight position={[0, 0, 1.5]} color="#4A9BAB" intensity={2.0} />

        {/* Ring */}
        <mesh renderOrder={1}>
          <ringGeometry args={[0.75, 1.1, 48]} />
          <meshStandardMaterial
            color="#4A9BAB" emissive="#4A9BAB" emissiveIntensity={0.8}
            side={THREE.DoubleSide}
            stencilWrite={irisMaskMat.stencilWrite}
            stencilFunc={irisMaskMat.stencilFunc as THREE.StencilFunc}
            stencilRef={irisMaskMat.stencilRef}
          />
        </mesh>

        {/* Void */}
        <mesh position={[0, 0, -0.01]} renderOrder={1}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial
            color="#050A0E" side={THREE.DoubleSide}
            stencilWrite={irisMaskMat.stencilWrite}
            stencilFunc={irisMaskMat.stencilFunc as THREE.StencilFunc}
            stencilRef={irisMaskMat.stencilRef}
          />
        </mesh>

        {/* Center dot */}
        <mesh position={[0, 0, 0.01]} renderOrder={1}>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial
            color="#4A9BAB" side={THREE.DoubleSide}
            stencilWrite={irisMaskMat.stencilWrite}
            stencilFunc={irisMaskMat.stencilFunc as THREE.StencilFunc}
            stencilRef={irisMaskMat.stencilRef}
          />
        </mesh>
      </group>

      {/* ── Step 3: Eye outline arcs (drawn on top of iris) ── */}
      <mesh renderOrder={2}>
        <tubeGeometry args={[topCurve, 64, 0.025, 8, false]} />
        <meshBasicMaterial color="#AFB3B7" />
      </mesh>
      <mesh renderOrder={2}>
        <tubeGeometry args={[bottomCurve, 64, 0.04, 8, false]} />
        <meshBasicMaterial color="#2D4A53" />
      </mesh>

      {/* ── Step 4: Eyelids (same background color, slide shut) ── */}
      {/* Top lid */}
      <mesh ref={topLidRef} position={[0, EYE_H * 0.5 + 0.15, 0.05]} renderOrder={3}>
        <primitive object={lidGeo} />
        <meshBasicMaterial color="#050A0E" />
      </mesh>
      {/* Bottom lid */}
      <mesh ref={bottomLidRef} position={[0, -(EYE_H * 0.5 + 0.15), 0.05]} renderOrder={3}>
        <primitive object={lidGeo} />
        <meshBasicMaterial color="#050A0E" />
      </mesh>

      <Particles />
    </group>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const numParticles = 12;
  const particleRefs = useRef<THREE.Mesh[]>([]);
  const lineGeoRef   = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    const time  = state.clock.getElapsedTime();
    const speed = (Math.PI * 2) / 8;
    const positions: number[] = [];

    for (let i = 0; i < numParticles; i++) {
      const angle  = (i / numParticles) * Math.PI * 2 + time * speed;
      const x      = Math.cos(angle) * 1.9;
      const y      = Math.sin(angle) * 0.7;
      const mesh   = particleRefs.current[i];

      if (mesh) {
        mesh.position.set(x, y, 0);
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.transparent = true;
        mat.opacity = x < 0
          ? 0.3 + (Math.abs(x) / 1.9) * 0.7
          : 1.0;
      }

      const na  = (((i + 1) % numParticles) / numParticles) * Math.PI * 2 + time * speed;
      const nx  = Math.cos(na) * 1.9;
      const ny  = Math.sin(na) * 0.7;
      if (x < 0 && nx < 0) {
        positions.push(x, y, 0, nx, ny, 0);
      }
    }

    if (lineGeoRef.current) {
      if (positions.length > 0) {
        lineGeoRef.current.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
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
          <meshStandardMaterial color="#4A9BAB" emissive="#4A9BAB" emissiveIntensity={0.8} transparent />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef} />
        <lineBasicMaterial color="#4A9BAB" opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
}

// ─── GL setup: ensure stencil buffer is enabled ───────────────────────────────
function GLSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.autoClear = false;
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function CursorEye() {
  const isHovered = useRef(false);

  return (
    <div
      className="w-[320px] h-[180px] md:w-[580px] md:h-[360px] mx-auto md:mx-0 mt-12 md:mt-0 pointer-events-auto"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, stencil: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <GLSetup />
        <EyeScene isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
