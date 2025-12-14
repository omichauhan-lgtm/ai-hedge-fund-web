"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

// ... (imports remain)

function HolographicGlobe() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group position={[0, 0.5, -2]}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="#1a1a1a" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh>
                <sphereGeometry args={[1.45, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
            </mesh>
            <mesh rotation={[-Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.8, 0.01, 16, 100]} />
                <meshStandardMaterial color="#4A90E2" emissive="#4A90E2" emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

export const Scene = ({ children }: { children: React.ReactNode }) => {
    return (
        <Canvas shadows dpr={[1, 2]} className="absolute inset-0 z-0">
            <color attach="background" args={['#020202']} />
            <Rig />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#D4AF37" />
            <pointLight position={[-10, 0, -5]} intensity={1} color="#4A90E2" />

            <HolographicGlobe />

            <group position={[0, -1, 1]}>
                {children}
                <gridHelper args={[40, 40, '#333', '#111']} position={[0, -0.01, 0]} />
            </group>

            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={4} color="#000000" />
            <Environment preset="city" />
        </Canvas>
    );
};

function Rig() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame((state) => {
        if (!cameraRef.current) return;

        // Parallax effect following mouse position
        const x = state.mouse.x * 0.5;
        const y = state.mouse.y * 0.5;

        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, x, 0.05);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, y + 1.5, 0.05); // Offset y slightly
        cameraRef.current.lookAt(0, 0, 0);
    });

    return <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 2, 6]} fov={45} />;
}
