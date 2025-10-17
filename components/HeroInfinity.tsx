"use client"

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Image from "next/image";

/**
 * A UNIQUE, BRANDED HERO BACKGROUND (not logo-based)
 * "Aurora Flow" — a premium, abstract WebGL backdrop using your green palette.
 * – GPU shader creates soft, flowing bands (aurora/silk effect)
 * – Subtle camera parallax + floating dust particles
 * – Bloom for a premium sheen
 * – Prefers-reduced-motion aware
 *
 * Install deps: npm i three @react-three/fiber @react-three/postprocessing postprocessing
 */

const BRAND = {
  white: "#ffffff",      // white background
  light: "#b3ceb0",      // your light green for shapes
  mid: "#c9ddc6",        // mid green
  deep: "#98b894",       // deeper green
};

// -------- Aurora Shader (fragment + vertex) --------
const AuroraMaterial = () => {
  const matRef = useRef();

  // Convert hex to linear RGB vec3
  const toRGB = (hex: string) => {
    const c = new THREE.Color(hex);
    return new THREE.Vector3(c.r, c.g, c.b);
  };

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_white: { value: toRGB(BRAND.white) },
      u_light: { value: toRGB(BRAND.light) },
      u_mid: { value: toRGB(BRAND.mid) },
      u_deep: { value: toRGB(BRAND.deep) },
    }),
    []
  );

  // language=GLSL
  const vertex = /* glsl */ `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;

  // language=GLSL
  const fragment = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time; 
    uniform vec2 u_res; 
    uniform vec2 u_mouse; 
    uniform vec3 u_white; uniform vec3 u_light; uniform vec3 u_mid; uniform vec3 u_deep;

    // 2D Simplex Noise (iq)
    vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
    vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
    vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);} 
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                         -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;  
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x * x0.x + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main(){
      vec2 uv = vUv;
      // Center & aspect fit
      uv -= 0.5;
      uv.x *= u_res.x / u_res.y;

      // Time & parallax influence
      float t = u_time * 0.12;
      vec2 m = (u_mouse - 0.5) * 0.8;

      // Layered bands (fbm‑ish)
      float n1 = snoise(uv * 1.2 + vec2(t, -t));
      float n2 = snoise(uv * 2.2 + vec2(-t*0.8, t*0.6));
      float n3 = snoise(uv * 4.0 + m + vec2(t*0.4));
      float band = smoothstep(-0.3, 0.6, n1*0.6 + n2*0.35) + n3*0.08;

      // Start with WHITE background, blend in GREEN shapes
      vec3 col = u_white;
      col = mix(col, u_mid, smoothstep(0.3, 0.5, band) * 0.6);
      col = mix(col, u_light, smoothstep(0.5, 0.7, band) * 0.7);
      col = mix(col, u_deep, smoothstep(0.7, 0.9, band) * 0.5);

      // Gentle vignette (keep white at edges)
      float r = length(uv*0.95);
      col = mix(col, u_white, smoothstep(0.8, 1.25, r) * 0.3);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = prefersReduced ? 0.2 : 1.0; // affects shader time progression
    uniforms.u_time.value = t * speed;
    const { size, pointer } = state;
    uniforms.u_res.value.set(size.width, size.height);
    uniforms.u_mouse.value.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
  });

  return (
    <shaderMaterial ref={matRef} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} transparent={false} />
  );
};

function AuroraPlane(){
  const mat = <AuroraMaterial />;
  return (
    <mesh position={[0,0,0]}>
      <planeGeometry args={[12, 7, 1, 1]} />
      {mat}
    </mesh>
  );
}

function Dust(){
  const ref = useRef<THREE.Points>(null!);
  const { positions } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    for(let i=0;i<count;i++){
      const x = (Math.random()-0.5) * 10;
      const y = (Math.random()-0.5) * 6;
      const z = -0.5 - Math.random()*2.5; // behind plane
      positions.set([x,y,z], i*3);
    }
    return { positions };
  }, []);

  useFrame((state)=>{
    if(!ref.current) return;
    const t = state.clock.getElapsedTime()*0.02;
    ref.current.rotation.z = t;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length/3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} opacity={0.25} transparent depthWrite={false} color={BRAND.light} />
    </points>
  );
}

function Scene(){
  const cam = useRef();
  useFrame((state)=>{
    // small parallax
    const p = state.pointer;
    const target = new THREE.Vector3(p.x*0.15, p.y*0.08, 6);
    state.camera.position.lerp(target, 0.05);
    state.camera.lookAt(0,0,0);
  });
  return (
    <>
      <ambientLight intensity={0.7} />
      <AuroraPlane />
      <Dust />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.6} luminanceSmoothing={0.3} radius={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroAurora(){
  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-white">
      <Canvas dpr={[1,2]} camera={{ position:[0,0,6], fov: 42 }}>
        <Scene />
      </Canvas>

      {/* Content slot (headline/CTA) */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center px-4 md:px-6 flex flex-col items-center">
          <div className="pointer-events-auto mb-4 md:mb-6 lg:mb-8">
            <Image 
              src="/logoblack.svg" 
              alt="no limit" 
              width={500} 
              height={500}
              className="object-contain w-[200px] sm:w-[280px] md:w-[400px] lg:w-[500px]"
              priority
            />
          </div>
          <p className="pointer-events-auto text-lg sm:text-xl md:text-3xl lg:text-4xl max-w-4xl mx-auto text-black leading-relaxed">Redefining what AI can and should be</p>
        </div>
      </div>
    </div>
  );
}

