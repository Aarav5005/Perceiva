"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FaceMesh() {
  const ref = useRef<THREE.Points>(null);
  
  const sphere = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 800; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;
      const x = 1.0 * Math.sin(v) * Math.cos(u);
      const y = 1.4 * Math.sin(v) * Math.sin(u);
      const z = 1.1 * Math.cos(v);
      
      // Keep points mostly on the front half
      if (z > -0.2) {
        temp.push(x, y, z);
      }
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} rotation={[0, 0, 0]}>
      <PointMaterial
        transparent
        color="#4A9BAB"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function Panel1Sees() {
  return (
    <div className="w-full bg-surface px-6 md:px-12 py-32 md:py-40 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
      <div className="flex-1 max-w-xl">
        <span className="font-mono text-accent text-lg md:text-xl block mb-4">01 / IT SEES</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-pureWhite mb-6 leading-tight">
          Every face, every frame.
        </h2>
        <p className="font-body text-lg md:text-xl text-textPrimary/80 leading-relaxed">
          A classroom camera reads attention patterns across all students simultaneously — without recording or storing any video.
        </p>
      </div>
      <div className="flex-1 w-full flex justify-center h-full min-h-[300px]">
        <div className="w-full max-w-lg lg:max-w-xl aspect-square rounded-2xl border border-accent/30 bg-accent/5 flex items-center justify-center relative overflow-hidden">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <FaceMesh />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent pointer-events-none opacity-50" />
        </div>
      </div>
    </div>
  );
}
