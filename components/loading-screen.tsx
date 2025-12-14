"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUISounds } from "@/hooks/use-sounds";
import { Cpu } from "lucide-react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const { playBoot } = useUISounds();

    useEffect(() => {
        playBoot();

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 0);
                    return 100;
                }
                return Math.min(prev + Math.random() * 8, 100);
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete, playBoot]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 relative"
            >
                {/* Logo Pulse - Luxury Gold Glow */}
                <motion.div
                    animate={{ boxShadow: ["0 0 0px #D4AF37", "0 0 50px rgba(212, 175, 55, 0.5)", "0 0 0px #D4AF37"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-24 w-24 rounded-2xl bg-black border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]"
                >
                    <Cpu className="h-10 w-10" />
                </motion.div>
            </motion.div>

            <div className="w-64 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-[#666] uppercase tracking-widest">
                    <span>System Boot</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-0.5 w-full bg-[#333] overflow-hidden">
                    <motion.div
                        className="h-full bg-[#D4AF37]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-[10px] text-center text-[#D4AF37] font-mono pt-4 animate-pulse tracking-[0.2em]">
                    INITIALIZING ALPHAVANTAGE ENGINE...
                </p>
            </div>
        </div>
    );
}
