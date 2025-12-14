"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Building2, TrendingUp } from "lucide-react";
import { useUISounds } from "@/hooks/use-sounds";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const REGIONS = [
    {
        id: "USA",
        name: "United States",
        code: "US-NYC",
        market: "NYSE / NASDAQ",
        stats: { aum: "$71.2T", funds: "7,000+" },
        desc: "Global epicenter. 70.2% market share. Sophisticated strategies.",
        color: "from-blue-500/10 to-indigo-500/10",
        border: "group-hover:border-blue-500/50"
    },
    {
        id: "UK",
        name: "United Kingdom",
        code: "UK-LON",
        market: "LSE",
        stats: { aum: "£500B", funds: "1,000+" },
        desc: "Europe's financial hub. Resilient post-Brexit deep expertise.",
        color: "from-red-500/10 to-orange-500/10",
        border: "group-hover:border-red-500/50"
    },
    {
        id: "APAC",
        name: "Asia Pacific",
        code: "HK-SG",
        market: "HKEX / SGX",
        stats: { aum: "$340B", growth: "13.2%" },
        desc: "Fastest growing. HK & Singapore lead. 40% Long/Short Equity.",
        color: "from-emerald-500/10 to-cyan-500/10",
        border: "group-hover:border-emerald-500/50"
    },
    {
        id: "LUX",
        name: "Luxembourg",
        code: "LU-LUX",
        market: "LUXSE",
        stats: { aum: "€4.5T", type: "UCITS" },
        desc: "Top European domicile. Favorable regulatory environment.",
        color: "from-sky-500/10 to-blue-500/10",
        border: "group-hover:border-sky-500/50"
    },
    {
        id: "IRL",
        name: "Ireland",
        code: "IE-DUB",
        market: "ISE",
        stats: { aum: "€2.8T", funds: "900+" },
        desc: "Major hedge fund center. Preferred international domicile.",
        color: "from-green-500/10 to-emerald-500/10",
        border: "group-hover:border-green-500/50"
    },
    {
        id: "CHE",
        name: "Switzerland",
        code: "CH-ZRH",
        market: "SIX",
        stats: { aum: "CHF300B", funds: "500+" },
        desc: "Stability & sophistication. High net-worth private banking hub.",
        color: "from-red-500/10 to-white/10",
        border: "group-hover:border-red-500/50"
    },
    {
        id: "JPN_AUS",
        name: "Japan & Aus",
        code: "JP-AU",
        market: "TSE / ASX",
        stats: { type: "Macro", alloc: "Pension" },
        desc: "Currency volatility plays & Superannuation fund exposure.",
        color: "from-pink-500/10 to-rose-500/10",
        border: "group-hover:border-pink-500/50"
    },
    {
        id: "CYM",
        name: "Cayman Islands",
        code: "KY-GCM",
        market: "OFFSHORE",
        stats: { type: "Tax-Exempt", status: "Leader" },
        desc: "Leading offshore jurisdiction. Optimized for U.S. tax-exempts.",
        color: "from-yellow-500/10 to-amber-500/10",
        border: "group-hover:border-yellow-500/50"
    }
] as const;

export function RegionSelector() {
    const { setRegion, setFlowState } = useAppStore();
    const { playClick, playHover } = useUISounds();

    const handleSelect = (regionId: any) => {
        playClick();
        setRegion(regionId);
        setTimeout(() => setFlowState('DASHBOARD'), 500);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-12"
            >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Select Primary Market</h1>
                <p className="text-muted-foreground font-mono max-w-md mx-auto">
                    DEFINE DOMESTIC LIQUIDITY SOURCE FOR ALGO EXECUTION
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[90rem]">
                {REGIONS.map((region, idx) => (
                    <motion.button
                        key={region.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onMouseEnter={() => playHover()}
                        onClick={() => handleSelect(region.id)}
                        className="group relative h-72 overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] text-left transition-all hover:scale-[1.02] hover:border-[#D4AF37]/50"
                    >
                        {/* Background Gradient */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", region.color)} />

                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-white/40 tracking-widest">{region.code}</span>
                                    <MapPin className="h-3 w-3 text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                                    {region.name}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-3">
                                    {region.desc}
                                </p>

                                {/* Dynamic Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 py-2 border-y border-white/5">
                                    {Object.entries(region.stats).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="text-[9px] text-muted-foreground uppercase opacity-70 mb-0.5">{key}</div>
                                            <div className="text-xs font-bold text-white">{value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/80 transition-colors">
                                    <Building2 className="h-3 w-3" />
                                    <span className="truncate">{region.market}</span>
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
