"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, ChevronRight, Activity, ArrowRight } from "lucide-react";
import { useUISounds } from "@/hooks/use-sounds";
import { useAppStore } from "@/lib/store";

export function LoginTerminal() {
    const { setFlowState } = useAppStore();
    const { playClick, playSuccess, playHover } = useUISounds();
    const [key, setKey] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = () => {
        if (!key) return;
        playClick();
        setIsAuthenticating(true);
        setTimeout(() => {
            playSuccess();
            setFlowState('BOOT');
        }, 1500); // Simulate auth delay
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050505] p-4 selection:bg-white selection:text-black font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative flex flex-col items-center"
            >
                {/* Logo Section */}
                <div className="mb-8 flex flex-col items-center gap-6">
                    <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)]">
                        <Activity className="h-8 w-8 text-black animate-pulse" />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold tracking-tighter text-white">AlphaArchitect</h1>
                        <div className="flex items-center justify-center gap-2">
                            <span className="bg-[#1A1A1A] border border-white/10 px-3 py-1 rounded text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                                System Offline
                            </span>
                            <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase animate-pulse">
                                • Awaiting Auth
                            </span>
                        </div>
                    </div>
                </div>

                {/* Input Section */}
                <div className="w-full space-y-4">
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                        </div>
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="ACCESS KEY"
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-12 pr-6 py-4 text-sm font-mono text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/30 transition-all tracking-widest text-center"
                            autoFocus
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        onMouseEnter={() => playHover()}
                        disabled={isAuthenticating || !key}
                        className={`w-full group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl py-4 text-sm font-bold text-black transition-all ${isAuthenticating ? 'bg-white cursor-wait' : 'bg-white hover:bg-[#F2F2F2] hover:scale-[1.02] active:scale-[0.98]'}`}
                    >
                        {isAuthenticating ? (
                            <span className="animate-pulse">INITIALIZING...</span>
                        ) : (
                            <>
                                <span>Initialize Terminal</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Footer */}
                    <div className="mt-12 flex justify-between w-full px-4 border-t border-white/5 pt-6">
                        <span className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase flex items-center gap-2">
                            <Lock className="h-3 w-3" /> Encrypted v2.4.0
                        </span>
                        <span className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase">
                            LONDON • NY • TOKYO
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
