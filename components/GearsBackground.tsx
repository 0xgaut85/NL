'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const COLORS = {
  bg: 0xffffff,
  light: 0xb3ceb0, // primary glow
  mid: 0xc9ddc6,
  deep: 0x98b894,
};

type GearsBackgroundProps = {
  children?: React.ReactNode;
};

export default function GearsBackground({ children }: GearsBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Renderer / Scene / Camera
    const container = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(COLORS.bg, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    // Pull the camera slightly above and to the side for better parallax
    camera.position.set(2.2, 2.6, 8.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 13;

    // Lighting (a bit stronger to show depth)
    const hemi = new THREE.HemisphereLight(COLORS.mid, 0xffffff, 0.6);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.55);
    dir.position.set(3.2, 6, 4.5);
    scene.add(dir);

    // Postprocessing (Bloom)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.95, // strength
      0.95, // radius
      0.18  // threshold
    );
    composer.addPass(bloom);

    // Aura sprite (soft radial glow)
    function makeAuraSprite(colorHex: number, size = 3.0, opacity = 0.8) {
      const s = 256;
      const c = document.createElement('canvas');
      c.width = c.height = s;
      const g = c.getContext('2d')!;
      const col = `#${colorHex.toString(16).padStart(6, '0')}`;
      const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grad.addColorStop(0.0, col + 'ff');
      grad.addColorStop(0.35, col + 'aa');
      grad.addColorStop(0.7, col + '33');
      grad.addColorStop(1.0, col + '00');
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(size, size, 1);
      return sprite;
    }

    // Gear generator (thicker to read as 3D)
    function createGear({
      radius = 1,
      teeth = 12,
      toothDepth = 0.25,
      holeRadius = 0.45,
      thickness = 0.5, // ↑ thicker than before
    }: {
      radius?: number;
      teeth?: number;
      toothDepth?: number;
      holeRadius?: number;
      thickness?: number;
    }) {
      const rBase = radius - toothDepth;
      const rTip = radius + toothDepth * 0.2;

      const shape = new THREE.Shape();
      const steps = teeth * 4; // root/side/tip/side
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const phase = i % 4;
        let r: number;
        if (phase === 0) r = rBase;
        else if (phase === 1) r = rBase + toothDepth * 0.6;
        else if (phase === 2) r = rTip;
        else r = rBase + toothDepth * 0.6;
        const x = Math.cos(t) * r;
        const y = Math.sin(t) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }

      // center hole
      const hole = new THREE.Path();
      hole.absellipse(0, 0, holeRadius, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      const geo = new THREE.ExtrudeGeometry(shape, {
        steps: 2,
        depth: thickness,
        bevelEnabled: false,
      });
      geo.center();

      const edges = new THREE.EdgesGeometry(geo, 25);
      return { meshGeo: geo, edgeGeo: edges };
    }

    // Materials
    const neonMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.0,
      roughness: 0.22,
      transparent: true,
      opacity: 0.18,
      emissive: new THREE.Color(COLORS.light),
      emissiveIntensity: 1.45,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: COLORS.deep,
      transparent: true,
      opacity: 0.95,
    });

    function buildGear(
      radius: number,
      teeth: number,
      auraScale: number,
      tiltX: number,
      tiltY: number
    ) {
      const { meshGeo, edgeGeo } = createGear({
        radius,
        teeth,
        toothDepth: radius * 0.22,
        holeRadius: radius * 0.42,
        thickness: radius * 0.4, // ↑ scale thickness with radius
      });

      const group = new THREE.Group();

      const mesh = new THREE.Mesh(meshGeo, neonMaterial.clone());
      const edges = new THREE.LineSegments(edgeGeo, edgeMaterial.clone());
      edges.position.z = 0.001;

      const aura = makeAuraSprite(COLORS.mid, auraScale, 0.82);
      aura.position.set(0, 0, 0.25);

      // Give the gear an initial 3D tilt so it doesn't look flat
      group.rotation.x = tiltX;
      group.rotation.y = tiltY;

      group.add(mesh, edges, aura);
      scene.add(group);

      (group as any).__dispose = () => {
        meshGeo.dispose();
        edgeGeo.dispose();
        (mesh.material as THREE.Material).dispose();
        (edges.material as THREE.Material).dispose();
        (aura.material as THREE.Material).dispose();
        (aura.material as THREE.SpriteMaterial).map?.dispose?.();
      };

      return group as THREE.Group & { __dispose?: () => void };
    }

    // Radii
    const R_BIG = 1.6;
    const R_MED = 1.1;
    const R_S1 = 0.7;
    const R_S2 = 0.55;

    // Build (tilted) gears
    const bigGear = buildGear(R_BIG, 18, 4.2, 0.55, -0.2);
    const medGear = buildGear(R_MED, 14, 3.4, -0.35, 0.35);
    const s1Gear  = buildGear(R_S1, 11, 2.5, 0.25, 0.55);
    const s2Gear  = buildGear(R_S2, 9,  2.2, -0.5, -0.35);

    // Space them so they never touch (distance > sum of radii + margin)
    // Chosen positions (XZ/YZ parallax) ensure clear separation:
    bigGear.position.set(-2.2,  0.6,  0.4);
    medGear.position.set( 2.0, -0.3, -0.2);
    s1Gear.position.set( 0.3,  1.7, -0.8);
    s2Gear.position.set(-1.8, -1.7,  0.9);

    // Animation
    const clock = new THREE.Clock();
    let raf = 0;

    function animate() {
      const t = clock.getElapsedTime();

      // Floating along Z and a tiny XY bob for more 3D feel
      const float = (
        g: THREE.Group,
        phase: number,
        ampZ = 0.14,
        ampXY = 0.06,
        speed = 0.7
      ) => {
        g.position.z += Math.sin(t * speed + phase) * 0.0005; // micro drift
        const baseZ = Math.sin(t * speed + phase) * ampZ;
        g.position.z = (g.position.z * 0.98) + baseZ * 0.02;
        g.position.x += Math.cos(t * (speed * 0.7) + phase) * ampXY * 0.002;
        g.position.y += Math.sin(t * (speed * 0.65) + phase) * ampXY * 0.002;

        // subtle 3D wobble
        g.rotation.x += Math.sin(t * (speed * 0.6) + phase) * 0.0008;
        g.rotation.y += Math.cos(t * (speed * 0.55) + phase) * 0.0007;
      };

      float(bigGear, 0.0, 0.16);
      float(medGear, 1.3, 0.13);
      float(s1Gear,  2.1, 0.11);
      float(s2Gear,  2.9, 0.10);

      // Spins (opposing for visual rhythm)
      bigGear.rotation.z -= 0.0034;
      medGear.rotation.z += 0.0042;
      s1Gear.rotation.z  -= 0.0062;
      s2Gear.rotation.z  += 0.0070;

      controls.update();
      composer.render();
      raf = requestAnimationFrame(animate);
    }
    animate();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      scene.traverse((obj) => {
        const g = obj as any;
        if (g.__dispose) g.__dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] bg-white">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ minHeight: '600px' }} />

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full min-h-[600px] md:min-h-[700px]">
        {children}
      </div>
    </div>
  );
}

