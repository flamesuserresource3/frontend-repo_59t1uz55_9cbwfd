import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0A0E');

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 6, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(renderer.domElement);

    // Lights (warm dusk tone + subtle fill)
    const dirLight = new THREE.DirectionalLight('#ffcf88', 1.0);
    dirLight.position.set(10, 15, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);

    const fillLight = new THREE.HemisphereLight('#ffd9a6', '#0A0A0E', 0.6);
    scene.add(fillLight);

    // Stylized sun disc (for vibe)
    const sunGeo = new THREE.CircleGeometry(3.2, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: '#ffb347' });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.set(-12, 8, -20);
    scene.add(sun);

    // Ground - low-poly dunes look
    const groundGeo = new THREE.PlaneGeometry(200, 200, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    const verts = groundGeo.attributes.position;
    for (let i = 0; i < verts.count; i++) {
      const x = verts.getX(i);
      const z = verts.getZ(i);
      // Wavy dunes
      const y = Math.sin(x * 0.08) * 0.2 + Math.cos(z * 0.08) * 0.2 + (Math.random() - 0.5) * 0.05;
      verts.setY(i, y);
    }
    verts.needsUpdate = true;
    groundGeo.computeVertexNormals();
    const groundMat = new THREE.MeshStandardMaterial({ color: '#3b3b44', roughness: 1, metalness: 0 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    scene.add(ground);

    // Simple acacia-like trees (caricature)
    const trees = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: '#8b5a2b' });
    const canopyMat = new THREE.MeshStandardMaterial({ color: '#10B981' });
    for (let i = 0; i < 40; i++) {
      const trunkGeo = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 6);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.castShadow = true;
      trunk.receiveShadow = true;

      const canopyGeo = new THREE.BoxGeometry(1.8 + Math.random() * 0.8, 0.3 + Math.random() * 0.2, 1.2 + Math.random() * 0.5);
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = 1.0;
      canopy.castShadow = true;

      const tree = new THREE.Group();
      tree.add(trunk);
      tree.add(canopy);

      const radius = 20 + Math.random() * 70;
      const angle = Math.random() * Math.PI * 2;
      tree.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      trees.add(tree);
    }
    scene.add(trees);

    // Caricature bus (boxy, friendly proportions)
    const bus = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#10B981', roughness: 0.6 });
    const accentMat = new THREE.MeshStandardMaterial({ color: '#0b3b2f' });

    const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.6, 1.6), bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;

    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.4, 1.6), accentMat);
    roof.position.y = 2.1;
    roof.castShadow = true;

    // Windows (simple emissive rectangles)
    const windowMat = new THREE.MeshStandardMaterial({ color: '#b2f5ea', emissive: '#66fff2', emissiveIntensity: 0.2 });
    const windowGeo = new THREE.BoxGeometry(0.6, 0.4, 0.05);
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const w = new THREE.Mesh(windowGeo, windowMat);
      w.position.set(i * 0.6, 1.6, 0.84);
      const w2 = w.clone();
      w2.position.z = -0.84;
      bus.add(w, w2);
    }

    // Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.8 });
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.4, 16);
    const wheelPositions = [
      [-1.4, 0.45, 0.8],
      [1.4, 0.45, 0.8],
      [-1.4, 0.45, -0.8],
      [1.4, 0.45, -0.8],
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      wheel.castShadow = true;
      bus.add(wheel);
    });

    bus.add(body, roof);
    scene.add(bus);

    // Ambient dust/fog
    scene.fog = new THREE.FogExp2('#0A0A0E', 0.02);

    // Responsive sizing
    const setSize = () => {
      const width = mount.clientWidth;
      const height = Math.max(400, Math.min(window.innerHeight * 0.8, 800));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    setSize();

    // Animation path (gentle winding road)
    let t = 0;
    const roadCurve = (u) => {
      const x = u * 40 - 20;
      const z = Math.sin(u * Math.PI * 2) * 6;
      return new THREE.Vector3(x, 0, z);
    };

    // Road mesh for context
    const roadShape = new THREE.Shape();
    roadShape.moveTo(-100, -2);
    roadShape.lineTo(-100, 2);
    roadShape.lineTo(100, 2);
    roadShape.lineTo(100, -2);
    const roadGeo = new THREE.ShapeGeometry(roadShape);
    roadGeo.rotateX(-Math.PI / 2);
    const roadMat = new THREE.MeshStandardMaterial({ color: '#2f2f36', roughness: 1 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.scale.set(1, 1, 1);
    road.position.y = 0.001;
    scene.add(road);

    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.033);
      t = (t + dt * 0.06) % 1; // speed factor

      const p = roadCurve(t);
      const pNext = roadCurve((t + 0.01) % 1);
      bus.position.set(p.x, 0, p.z);

      const dir = new THREE.Vector3().subVectors(pNext, p).normalize();
      const angle = Math.atan2(dir.x, dir.z);
      bus.rotation.y = angle;

      // Subtle wheel rotation by distance
      bus.children.forEach((child) => {
        if (child.geometry && child.geometry.type === 'CylinderGeometry') {
          child.rotation.x -= dt * 4;
        }
      });

      // Camera follow with gentle lag
      const camTarget = new THREE.Vector3(p.x - dir.x * 6, 3.5, p.z - dir.z * 8);
      camera.position.lerp(camTarget, 0.1);
      camera.lookAt(bus.position.x, 1.2, bus.position.z);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    let raf = requestAnimationFrame(animate);

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      groundGeo.dispose();
      roadGeo.dispose();
    };
  }, []);

  return (
    <section id="top" className="relative w-full bg-[#0A0A0E]">
      <div ref={mountRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-24 sm:top-28 z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            EXPLORE. COMPETE. DRIVE THE ADVENTURE.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl">
            Join the ultimate community of road travelers and compete for the Grand Prize on the continent's most epic routes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              id="launch"
              href="#register"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-gray-900 font-semibold shadow-[0_0_28px_rgba(16,185,129,0.55)] hover:bg-emerald-400 transition-colors"
            >
              Launch App & Register
            </a>
            <a
              href="#community"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 px-6 py-3 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 transition-colors"
            >
              View Community Leaderboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
