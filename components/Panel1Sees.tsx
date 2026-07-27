"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";

function LandmarkMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate an oval facial landmark mesh
  const { positions, linePositions } = useMemo(() => {
    const pos: number[] = [];
    const rawNodes: THREE.Vector3[] = [];

    // Create 90 landmark nodes on an oval face surface
    for (let i = 0; i < 90; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;
      const x = 1.1 * Math.sin(v) * Math.cos(u);
      const y = 1.6 * Math.sin(v) * Math.sin(u);
      const z = 1.0 * Math.cos(v);

      if (z > -0.2) {
        pos.push(x, y, z);
        rawNodes.push(new THREE.Vector3(x, y, z));
      }
    }

    // Connect nearby nodes with triangulation lines
    const lineCoords: number[] = [];
    for (let i = 0; i < rawNodes.length; i++) {
      for (let j = i + 1; j < rawNodes.length; j++) {
        const dist = rawNodes[i].distanceTo(rawNodes[j]);
        if (dist < 0.52) {
          lineCoords.push(
            rawNodes[i].x, rawNodes[i].y, rawNodes[i].z,
            rawNodes[j].x, rawNodes[j].y, rawNodes[j].z
          );
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      linePositions: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
      pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
      linesRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4A9BAB"
          size={0.07}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.95}
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4A9BAB" opacity={0.35} transparent={true} />
      </lineSegments>
    </group>
  );
}

export default function Panel1Sees() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
      
      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-accent/25 block -mb-4 tracking-tighter">
          01
        </span>
        <span className="font-mono text-accent text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT SEES
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          Every face, every frame.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          A classroom camera reads attention patterns across all students simultaneously — without recording or storing any video.
        </p>
      </div>

      {/* Right Visual — 3D Face Landmark HUD */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
        <div className="relative w-full aspect-[4/3] rounded-3xl border border-accent/25 bg-surface/20 backdrop-blur-xl p-4 shadow-[0_0_50px_rgba(74,155,171,0.15)] overflow-hidden flex items-center justify-center">
          
          {/* HUD Corner Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent/60" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent/60" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent/60" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent/60" />

          {/* HUD Top Tag */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 border border-accent/30 text-[10px] font-mono text-accent tracking-widest uppercase">
            ● VISION ENGINE STREAM · 60 FPS
          </div>

          {/* 3D Canvas */}
          <div ref={containerRef} className="w-full h-full">
            {isInView && (
              <Canvas camera={{ position: [0, 0, 3.8] }}>
                <LandmarkMesh />
              </Canvas>
            )}
          </div>

          {/* HUD Bottom Status */}
          <div className="absolute bottom-4 inset-x-6 flex justify-between items-center text-[10px] font-mono text-utility">
            <span>LANDMARKS: 90 NODES</span>
            <span className="text-accent/80">NO VIDEO STORED</span>
          </div>

        </div>
      </div>

    </div>
  );
}
