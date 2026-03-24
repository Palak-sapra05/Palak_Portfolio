import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralNetworkBackground - Highly optimized 3D Neural Pulse background.
 * - Nodes: Moving points in 3D space.
 * - Synapses: Dynamic connections with distance-based opacity.
 * - Neural Pulses: Glowing signals traveling between nodes.
 * - interaction: Mouse stimulus and parallax.
 */
const NeuralNetworkBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // --- Core Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    el.appendChild(renderer.domElement);

    // --- Configuration ---
    const NODE_COUNT = 120;
    const MAX_DIST = 45;
    const PULSE_SPEED = 0.02;
    const MAX_PULSES = 15;
    const palette = [0xFDBA74, 0xFCA5A5, 0xFEF3C7]; // Orange, Coral, Yellow dots

    const nodes = [];
    const pulses = [];

    // --- Node Logic ---
    class Node {
      constructor(id) {
        this.id = id;
        this.pos = new THREE.Vector3(
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 100
        );
        this.vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.02
        );
        this.radius = Math.random() * 0.8 + 0.4;
        this.connections = [];
      }

      update(mouse, time) {
        this.pos.add(this.vel);

        // Slow organic drift
        this.pos.x += Math.sin(time * 0.5 + this.id) * 0.01;
        this.pos.y += Math.cos(time * 0.5 + this.id) * 0.01;

        // Mouse interaction (Repulsion)
        const distToMouse = this.pos.distanceTo(mouse);
        if (distToMouse < 60) {
          const dir = this.pos.clone().sub(mouse).normalize();
          const force = (1 - distToMouse / 60) * 0.15;
          this.pos.add(dir.multiplyScalar(force));
        }

        // Boundary wrap
        if (Math.abs(this.pos.x) > 120) this.pos.x = -this.pos.x;
        if (Math.abs(this.pos.y) > 120) this.pos.y = -this.pos.y;
        if (Math.abs(this.pos.z) > 100) this.pos.z = -this.pos.z;
      }
    }

    // --- Pulse Logic ---
    class Pulse {
      constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.alive = true;
      }

      update() {
        this.progress += PULSE_SPEED;
        if (this.progress >= 1) {
          this.alive = false;
        }
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(new Node(i));
    }

    // --- Rendering Elements ---
    // 1. Points (Nodes)
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(NODE_COUNT * 3);
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x6366F1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // 2. Lines (Synapses)
    const maxLineSegments = NODE_COUNT * 6; // Limit connections for performance
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(maxLineSegments * 2 * 3);
    const lineOpacity = new Float32Array(maxLineSegments * 2); // Vertex opacity
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x6366F1,
        transparent: true,
        opacity: 0.2, // Base line opacity
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    scene.add(lineMat);

    // 3. Pulse Meshes (Glowing Spheres)
    const pulseSpheres = [];
    const pulseGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < MAX_PULSES; i++) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      mesh.visible = false;
      scene.add(mesh);
      pulseSpheres.push(mesh);
    }

    // --- Global State ---
    const mouse = new THREE.Vector3(0, 0, 0);
    const targetCam = new THREE.Vector3(0, 0, 100);

    const handleMouseMove = (e) => {
      // Map screen to 3D space approximately
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 200;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 200;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const animate = () => {
      const time = Date.now() * 0.001;

      // Update Camera (Subtle parallax)
      camera.position.x += (mouse.x * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Update Nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes[i].update(mouse, time);
        ptPos[i * 3] = nodes[i].pos.x;
        ptPos[i * 3 + 1] = nodes[i].pos.y;
        ptPos[i * 3 + 2] = nodes[i].pos.z;
        nodes[i].connections = []; // Reset per frame
      }
      ptGeo.attributes.position.needsUpdate = true;

      // Update Connections (Synapses)
      let lineIdx = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (lineIdx >= maxLineSegments) break;

          const dist = nodes[i].pos.distanceTo(nodes[j].pos);
          if (dist < MAX_DIST) {
            // Add connection
            linePos[lineIdx * 6] = nodes[i].pos.x;
            linePos[lineIdx * 6 + 1] = nodes[i].pos.y;
            linePos[lineIdx * 6 + 2] = nodes[i].pos.z;

            linePos[lineIdx * 6 + 3] = nodes[j].pos.x;
            linePos[lineIdx * 6 + 4] = nodes[j].pos.y;
            linePos[lineIdx * 6 + 5] = nodes[j].pos.z;

            nodes[i].connections.push(nodes[j]);
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;

      // Pulse Triggering & Logic
      if (Math.random() < 0.1 && pulses.length < MAX_PULSES) {
        // Trigger a random pulse from a node with connections
        const activeNodes = nodes.filter(n => n.connections.length > 0);
        if (activeNodes.length > 0) {
          const start = activeNodes[Math.floor(Math.random() * activeNodes.length)];
          const end = start.connections[Math.floor(Math.random() * start.connections.length)];
          pulses.push(new Pulse(start, end));
        }
      }

      // Update Pulse Meshes
      for (let i = 0; i < MAX_PULSES; i++) {
        const p = pulses[i];
        const mesh = pulseSpheres[i];
        if (p && p.alive) {
          p.update();
          const pos = p.start.pos.clone().lerp(p.end.pos, p.progress);
          mesh.position.set(pos.x, pos.y, pos.z);
          mesh.visible = true;
          mesh.scale.setScalar(1 + Math.sin(p.progress * Math.PI) * 1.5); // Pulse effect
        } else {
          mesh.visible = false;
          if (p) pulses.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
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
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
};

export default NeuralNetworkBackground;
