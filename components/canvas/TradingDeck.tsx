"use client";

import { useRef, useState } from "react";
import { useTactileSound } from "@/lib/audio";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useAppStore } from "@/lib/store";

function PhysicalKey({ position, label, onClick }: { position: [number, number, number], label: string, onClick?: () => void }) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const { playClickDown, playClickUp, playHover } = useTactileSound();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Tilt towards cursor on hover
        const targetRotX = hovered ? (state.mouse.y * 0.1) : 0;
        const targetRotZ = hovered ? (-state.mouse.x * 0.1) : 0;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.2);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.2);

        // Depress on click
        const targetY = pressed ? position[1] - 0.15 : position[1];
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.4);
    });

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerOver={() => { setHovered(true); playHover(); }}
            onPointerOut={() => setHovered(false)}
            onPointerDown={() => { setPressed(true); playClickDown(); }}
            onPointerUp={() => { setPressed(false); playClickUp(); onClick?.(); }}
        >
            {/* Keycap Base */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.4, 0.8]} />
                <meshStandardMaterial
                    color={hovered ? "#2A2A2A" : "#1A1A1A"}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 0.21, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.2}
                color={pressed ? "#1DB954" : "#FFFFFF"}
                font="https://fonts.gstatic.com/s/sora/v11/xMQbuFFYT2MyVw4A.woff" // Using a nice geometric font
            >
                {label}
            </Text>
        </group>
    );
}

export const TradingDeck = () => {
    const { activeView } = useAppStore();
    const { camera } = useThree();

    // Camera Target State
    useFrame((state) => {
        let targetPos = new THREE.Vector3(0, 5, 5); // Default Overview
        let targetRot = new THREE.Vector3(-Math.PI / 4, 0, 0);

        if (activeView === 'STRATEGY') {
            targetPos.set(0, 3, 2); // Zoom in "War Room"
            targetRot.set(-Math.PI / 6, 0, 0);
        } else if (activeView === 'BACKTEST') {
            targetPos.set(-2, 4, 4); // Side Angle "Data Wall"
            targetRot.set(-Math.PI / 4, -Math.PI / 6, 0);
        } else if (activeView === 'EXECUTION' || activeView === 'COMPLIANCE') {
            targetPos.set(0, 2, 6); // Low "Operator" View
            targetRot.set(-0.2, 0, 0);
        }

        // Smooth Lerp
        camera.position.lerp(targetPos, 0.05);

        // Quaternion lerp for rotation would be better but Euler lerp is enough for simple tilts 
        // We'll manually lerp rotation.x/y/z for simplicity in this constrained env
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRot.x, 0.05);
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRot.y, 0.05);
        camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRot.z, 0.05);
    });

    const getHoloText = () => {
        switch (activeView) {
            case 'STRATEGY': return { top: "STRATEGY LAB", mid: "ARCHITECTING...", bot: "AI MODEL: ACTIVE" };
            case 'BACKTEST': return { top: "SIMULATION", mid: "CALCULATING...", bot: "CONFIDENCE: 98%" };
            case 'EXECUTION': return { top: "ORDER BOOK", mid: "EXECUTING...", bot: "LATENCY: 12ms" };
            default: return { top: "LIVE: S&P500 +1.2%", mid: "SYSTEM OPTIMAL", bot: "VIX: 14.2 (-2%)" };
        }
    }
    const txt = getHoloText();

    return (
        <group>
            {/* Base Plate */}
            <mesh position={[0, -0.5, 0]} receiveShadow>
                <boxGeometry args={[6, 0.2, 4]} />
                <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.5} />
            </mesh>

            {/* Key Matrix */}
            <group position={[-1.5, 0, 0.5]}>
                <PhysicalKey position={[0, 0, 0]} label="BUY" />
                <PhysicalKey position={[1, 0, 0]} label="SELL" />
                <PhysicalKey position={[2, 0, 0]} label="HEDGE" />

                <PhysicalKey position={[0, 0, 1]} label="10%" />
                <PhysicalKey position={[1, 0, 1]} label="25%" />
                <PhysicalKey position={[2, 0, 1]} label="50%" />

                <PhysicalKey position={[3.5, 0, 0.5]} label="EXECUTE" onClick={() => console.log('Execute')} />
            </group>

            {/* Screen on Device */}
            <mesh position={[0, 0.1, -1]} rotation={[-Math.PI / 6, 0, 0]}>
                <boxGeometry args={[4, 0.1, 1.5]} />
                <meshStandardMaterial color="#000" emissive="#1DB954" emissiveIntensity={0.1} roughness={0.2} />
            </mesh>

            {/* Floating Holographic Stats */}
            <group position={[0, 2, -1]}>
                <Text
                    position={[-1.5, 0, 0]}
                    fontSize={0.15}
                    color="#1DB954"
                    font="https://fonts.gstatic.com/s/sora/v11/xMQbuFFYT2MyVw4A.woff"
                >
                    {txt.top}
                </Text>
                <Text
                    position={[0, 0.3, 0]}
                    fontSize={0.1}
                    color="white"
                    font="https://fonts.gstatic.com/s/sora/v11/xMQbuFFYT2MyVw4A.woff"
                >
                    {txt.mid}
                </Text>
                <Text
                    position={[1.5, 0, 0]}
                    fontSize={0.15}
                    color="#1DB954"
                    font="https://fonts.gstatic.com/s/sora/v11/xMQbuFFYT2MyVw4A.woff"
                >
                    {txt.bot}
                </Text>
            </group>
        </group>
    );
};
