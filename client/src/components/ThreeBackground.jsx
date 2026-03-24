import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground – premium 3D neural-network particle field.
 * - Fixed behind all content (z-index: -100)
 * - Mouse parallax on desktop
 * - Reduced particle count on mobile for 60fps
 * - Full cleanup on unmount (renderer dispose, canvas removal)
 */
const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const el = mountRef.current;
        if (!el) return;

        // ── Mobile detection ──────────────────────────────────────────────
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        const PARTICLE_COUNT = isMobile ? 400 : 1200;
        const LINE_COUNT = isMobile ? 0 : 800;   // skip lines on mobile

        // ── Renderer ──────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);      // fully transparent
        el.appendChild(renderer.domElement);

        // ── Scene / Camera ────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 80);

        // ── Particle colours ──────────────────────────────────────────────
        const palette = [
            new THREE.Color('#8b5cf6'), // violet
            new THREE.Color('#3b82f6'), // blue
            new THREE.Color('#ec4899'), // pink
            new THREE.Color('#14b8a6'), // teal
            new THREE.Color('#6366f1'), // indigo
        ];

        // ── Clock for consistency ─────────────────────────────────────────
        const clock = new THREE.Clock();

        // ── Particles ─────────────────────────────────────────────────────
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors    = new Float32Array(PARTICLE_COUNT * 3);
        const sizes     = new Float32Array(PARTICLE_COUNT);
        const particleData = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 100;
            positions[i * 3]     = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3]     = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;

            sizes[i] = Math.random() * (isMobile ? 1.5 : 2.5);

            particleData.push({
                ox: x, oy: y, oz: z,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                vz: (Math.random() - 0.5) * 0.05,
                phase: Math.random() * Math.PI * 2,
                speedMultiplier: 0.5 + Math.random()
            });
        }

        const ptGeo = new THREE.BufferGeometry();
        ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        ptGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
        ptGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

        const ptMat = new THREE.PointsMaterial({
            size: 1.0,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(ptGeo, ptMat);
        scene.add(points);

        // ── Connection lines ──────────────────────────────────────────────
        let lines = null;
        if (!isMobile) {
            const linePositions = new Float32Array(LINE_COUNT * 6);
            const lineColors    = new Float32Array(LINE_COUNT * 6);
            const lineGeo = new THREE.BufferGeometry();
            lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3));

            const lineMat = new THREE.LineSegments(
                lineGeo,
                new THREE.LineBasicMaterial({
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.4,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    linewidth: 1,
                })
            );
            scene.add(lineMat);
            lines = { segments: lineMat, geo: lineGeo, posArr: linePositions, colArr: lineColors };
        }

        // ── Mouse & Interaction ────────────────────────────────────────────
        const mouse = new THREE.Vector2(0, 0);
        const target = new THREE.Vector2(0, 0);
        const mouseWorld = new THREE.Vector3(0, 0, 0);

        const onMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
            
            // Map mouse to 3D space for attraction
            mouseWorld.set(mouse.x * 100, mouse.y * 100, 0);
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // ── Resize ────────────────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // ── Animation loop ────────────────────────────────────────────────
        let rafId;
        const LINK_DIST = isMobile ? 20 : 35;
        const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // Smooth camera parallax with easing
            target.x += (mouse.x * 12 - target.x) * 0.05;
            target.y += (mouse.y * 8 - target.y) * 0.05;
            camera.position.x = target.x;
            camera.position.y = target.y;
            camera.lookAt(0, 0, 0);

            // Update individual particles
            const pos = ptGeo.attributes.position.array;
            const szAttr = ptGeo.attributes.size.array;
            
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const d = particleData[i];
                
                // Base movement
                d.ox += d.vx * d.speedMultiplier;
                d.oy += d.vy * d.speedMultiplier;
                d.oz += d.vz * d.speedMultiplier;

                // Mouse Attraction (Dynamic Density)
                const dx = mouseWorld.x - d.ox;
                const dy = mouseWorld.y - d.oy;
                const distMouse = Math.sqrt(dx*dx + dy*dy);
                if (distMouse < 60) {
                    const force = (1 - distMouse / 60) * 0.5;
                    d.ox += dx * force * 0.1;
                    d.oy += dy * force * 0.1;
                }

                // Apply Sine transitions for smooth easing
                pos[i * 3]     = d.ox + Math.sin(time + d.phase) * 2;
                pos[i * 3 + 1] = d.oy + Math.cos(time + d.phase) * 2;
                pos[i * 3 + 2] = d.oz;

                // Depth Illusion: Size based on proximity to camera
                // Particles further away look smaller
                const distToCam = Math.sqrt(pos[i*3]**2 + pos[i*3+1]**2 + (camera.position.z - pos[i*3+2])**2);
                szAttr[i] = Math.max(0.2, (150 / distToCam) * (isMobile ? 0.8 : 1.2));

                // Bounds wrap
                if (d.ox > 120) d.ox = -120;
                if (d.ox < -120) d.ox = 120;
                if (d.oy > 120) d.oy = -120;
                if (d.oy < -120) d.oy = 120;
                if (d.oz > 80) d.oz = -80;
                if (d.oz < -80) d.oz = 80;
            }
            ptGeo.attributes.position.needsUpdate = true;
            ptGeo.attributes.size.needsUpdate     = true;

            // Connection Lines with Glow (Higher intensities for closer segments)
            if (lines) {
                let lIdx = 0;
                const lp = lines.posArr;
                const lc = lines.colArr;
                for (let i = 0; i < PARTICLE_COUNT && lIdx < LINE_COUNT; i++) {
                    for (let j = i + 1; j < PARTICLE_COUNT && lIdx < LINE_COUNT; j++) {
                        const dx = pos[i*3]   - pos[j*3];
                        const dy = pos[i*3+1] - pos[j*3+1];
                        const dz = pos[i*3+2] - pos[j*3+2];
                        const distSq = dx*dx + dy*dy + dz*dz;
                        
                        if (distSq < LINK_DIST_SQ) {
                            const actualDist = Math.sqrt(distSq);
                            const alpha = 1 - actualDist / LINK_DIST;
                            
                            // Glowing Effect: intensify colors for very close connections
                            const intensity = alpha * (actualDist < LINK_DIST * 0.3 ? 1.5 : 1.0);
                            
                            lp[lIdx*6]   = pos[i*3];
                            lp[lIdx*6+1] = pos[i*3+1];
                            lp[lIdx*6+2] = pos[i*3+2];
                            lp[lIdx*6+3] = pos[j*3];
                            lp[lIdx*6+4] = pos[j*3+1];
                            lp[lIdx*6+5] = pos[j*3+2];

                            const ci = colors;
                            lc[lIdx*6]   = ci[i*3]   * intensity;
                            lc[lIdx*6+1] = ci[i*3+1] * intensity;
                            lc[lIdx*6+2] = ci[i*3+2] * intensity;
                            lc[lIdx*6+3] = ci[j*3]   * intensity;
                            lc[lIdx*6+4] = ci[j*3+1] * intensity;
                            lc[lIdx*6+5] = ci[j*3+2] * intensity;
                            lIdx++;
                        }
                    }
                }
                lines.geo.setDrawRange(0, lIdx * 2);
                lines.geo.attributes.position.needsUpdate = true;
                lines.geo.attributes.color.needsUpdate    = true;
            }

            renderer.render(scene, camera);
        };
        animate();

        // ── Cleanup ───────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            ptGeo.dispose();
            ptMat.dispose();
            if (lines) {
                lines.geo.dispose();
                lines.segments.material.dispose();
            }
            if (el.contains(renderer.domElement)) {
                el.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -100,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ThreeBackground;
