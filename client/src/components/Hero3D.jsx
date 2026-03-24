import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    Float, 
    MeshDistortMaterial, 
    MeshWobbleMaterial, 
    PerspectiveCamera,
    OrbitControls,
    Stars
} from '@react-three/drei';
import * as THREE from 'three';

const CyberKnot = () => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Gentle base rotation
            meshRef.current.rotation.x = Math.cos(t / 4) / 4;
            meshRef.current.rotation.y = Math.sin(t / 4) / 4;
            meshRef.current.rotation.z = Math.sin(t / 4) / 4;
            
            // Mouse parallax influence
            const mouseX = state.mouse.x * 0.5;
            const mouseY = state.mouse.y * 0.5;
            meshRef.current.rotation.x += mouseY * 0.2;
            meshRef.current.rotation.y += mouseX * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh 
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.1 : 1}
            >
                <torusKnotGeometry args={[1, 0.3, 200, 32]} />
                <MeshDistortMaterial
                    color={hovered ? "#ff003c" : "#8b5cf6"}
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </mesh>
        </Float>
    );
};

const FloatingSpheres = () => {
    const group = useRef();
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = t * 0.1;
    });

    return (
        <group ref={group}>
            {[...Array(15)].map((_, i) => (
                <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 5
                    ]}>
                        <sphereGeometry args={[0.05 + Math.random() * 0.1, 16, 16]} />
                        <meshStandardMaterial 
                            color={i % 2 === 0 ? "#00f0ff" : "#ff003c"} 
                            emissive={i % 2 === 0 ? "#00f0ff" : "#ff003c"}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const Hero3D = () => {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
                <spotLight position={[0, 5, 0]} angle={0.15} penumbra={1} intensity={2} color="#ff003c" />
                
                <CyberKnot />
                <FloatingSpheres />

                {/* Subtle star particles */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                
                {/* User can rotate but it snaps back eventually via useFrame rotation logic */}
                <OrbitControls enableZoom={false} enablePan={false} makeDefault />
            </Canvas>
        </div>
    );
};

export default Hero3D;
