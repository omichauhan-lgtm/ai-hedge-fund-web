"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BrainCircuit, LineChart, PieChart, Zap, ShieldCheck, Activity } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useUISounds } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { id: "OVERVIEW", label: "Command Center", icon: LayoutDashboard },
    { id: "STRATEGY", label: "Strategy Lab", icon: BrainCircuit },
    { id: "BACKTEST", label: "Backtest Studio", icon: LineChart },
    { id: "PORTFOLIO", label: "Portfolio Architect", icon: PieChart },
    { id: "EXECUTION", label: "Execution Queue", icon: Zap },
    { id: "COMPLIANCE", label: "Compliance Gate", icon: ShieldCheck },
] as const;

export function Sidebar() {
    const { activeView, setActiveView } = useAppStore();
    const { playClick, playHover } = useUISounds();

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-[#1E1E1E] bg-[#0B0B0B] flex flex-col py-6"
        >
            {/* Logo */}
            <div className="px-6 mb-8 flex items-center gap-3">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">AlphaArc</span>
            </div>

            <div className="flex-1 px-4 space-y-8">
                {/* Platform Section */}
                <div>
                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">Platform</h3>
                    <div className="space-y-1">
                        {[
                            { id: "OVERVIEW", label: "Dashboard", icon: LayoutDashboard },
                            { id: "STRATEGY", label: "Strategy Builder", icon: BrainCircuit },
                            { id: "BACKTEST", label: "Backtest Lab", icon: LineChart },
                        ].map((item) => (
                            <NavButton
                                key={item.id}
                                item={item}
                                isActive={activeView === item.id}
                                onClick={() => setActiveView(item.id as any)}
                            />
                        ))}
                    </div>
                </div>

                {/* Execution Section */}
                <div>
                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">Execution</h3>
                    <div className="space-y-1">
                        {[
                            { id: "PORTFOLIO", label: "Portfolio", icon: PieChart },
                            { id: "EXECUTION", label: "Execution", icon: Zap },
                            { id: "COMPLIANCE", label: "Compliance", icon: ShieldCheck },
                        ].map((item) => (
                            <NavButton
                                key={item.id}
                                item={item}
                                isActive={activeView === item.id}
                                onClick={() => setActiveView(item.id as any)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="px-4 mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#1E1E1E]">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                        DA
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">Demo Account</div>
                        <div className="text-[10px] text-muted-foreground truncate">Read-Only Access</div>
                    </div>
                    <div className="text-muted-foreground">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" /></svg>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}

function NavButton({ item, isActive, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                    ? "bg-white text-black font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <item.icon className={cn("h-4 w-4", isActive ? "text-black" : "text-gray-500")} />
            <span>{item.label}</span>
        </button>
    );
}
