"use client";
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Activity, Zap, Shield, FileText, BarChart3, Wallet, ShieldCheck, Terminal, Lock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { StrategyCard } from "@/components/strategy-card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

// --- Types ---
interface NavData {
    date: string;
    nav: number;
    benchmark: number;
}

interface Execution {
    symbol: string;
    side: string;
    amt: string;
    time: string;
    status: 'PENDING' | 'FILLED';
}

// --- Mock Data ---
const STRATEGIES = [
    { id: "1", name: "Alpha One Momentum", type: "MOMENTUM", sharpe: 2.45, return: 32.4, drawdown: 5.2, status: "ACTIVE" },
    { id: "2", name: "Mean Rev Eura", type: "MEAN_REVERSION", sharpe: 1.89, return: 18.2, drawdown: 12.1, status: "ACTIVE" },
    { id: "3", name: "Crypto Arb HighFreq", type: "ARBITRAGE", sharpe: 3.10, return: 145.2, drawdown: 22.4, status: "PAUSED" },
    { id: "4", name: "Volatility Harvest", type: "ML_PREDICTIVE", sharpe: 1.2, return: 8.5, drawdown: 3.4, status: "ACTIVE" },
] as const;

// Mock Data Generator
const generateData = (): NavData[] => Array.from({ length: 40 }, (_, i) => {
    const base = 100000 + (i * 1500);
    const noise = Math.random() * 5000 - 2500;
    return {
        date: `Oct ${i + 1}`,
        nav: base + noise,
        benchmark: base * 0.85 + (noise * 0.5)
    };
});

export const DashboardView = () => {
    const [data, setData] = useState<NavData[]>(generateData());
    const [executions, setExecutions] = useState<Execution[]>([
        { symbol: "AAPL", side: "BUY", amt: "$15,400", time: "2m ago", status: "PENDING" },
        { symbol: "BTC-USD", side: "SELL", amt: "$42,100", time: "5m ago", status: "PENDING" },
        { symbol: "TSLA", side: "BUY", amt: "$8,200", time: "12m ago", status: "FILLED" },
    ]);

    // Simulate Live Data Feed
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newData = [...prev.slice(1)];
                const last = prev[prev.length - 1];
                const noise = Math.random() * 2000 - 1000;
                newData.push({
                    date: 'Live',
                    nav: last.nav + noise + 500,
                    benchmark: last.benchmark + noise * 0.5
                });
                return newData;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleApprove = (index: number) => {
        setExecutions(prev => prev.map((ex, i) => i === index ? { ...ex, status: 'FILLED' } : ex));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 animate-in fade-in duration-500">
            {/* --- Top Row: Stats Cards --- */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#111] border-white/5 p-5 relative overflow-hidden group">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Est. Annual Return</div>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-emerald-400">+{((data[data.length - 1].nav - 100000) / 1000).toFixed(1)}%</h2>
                        <span className="text-xs text-emerald-600 font-mono animate-pulse">+1.2% today</span>
                    </div>
                </Card>

                <Card className="bg-[#111] border-white/5 p-5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Risk (VaR 95%)</div>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-white">$1,850</h2>
                        <span className="text-xs text-muted-foreground font-mono">(1.85%)</span>
                    </div>
                </Card>

                <Card className="bg-[#111] border-white/5 p-5 relative overflow-hidden group">
                    <div className="flex items-start justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Active Allocations</div>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">2 / 2</h2>
                </Card>
            </div>

            {/* --- Main Chart (Left 8 Cols) --- */}
            <Card className="lg:col-span-8 bg-[#0D0D0D] border-white/5 p-6 h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-gray-400">Portfolio NAV vs Benchmark</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-[10px] text-blue-500"><div className="w-2 h-2 bg-blue-500 rounded-full" /> NAV</div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500"><div className="w-2 h-2 bg-gray-500 rounded-full" /> Benchmark</div>
                    </div>
                </div>
                <div className="flex-1 w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#444', fontSize: 10 }}
                                minTickGap={30}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={['auto', 'auto']}
                                tick={{ fill: '#444', fontSize: 10 }}
                                tickFormatter={(val) => `$${val / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="nav"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                isAnimationActive={false}
                                fillOpacity={1}
                                fill="url(#colorNav)"
                            />
                            <Area
                                type="monotone"
                                dataKey="benchmark"
                                stroke="#555"
                                strokeDasharray="4 4"
                                isAnimationActive={false}
                                fill="transparent"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* --- Execution Review (Replacing Regime for Interactivity demo) --- */}
            <div className="lg:col-span-4 space-y-6">
                {/* Reusing Regime Card code but wrapped in div for structure */}
                <Card className="bg-[#081218] border border-blue-900/20 p-6 h-[400px] relative overflow-hidden flex flex-col">
                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Pending Approvals</h3>
                    <div className="space-y-3 flex-1 overflow-auto pr-2 custom-scrollbar">
                        {executions.map((ex, i) => (
                            <div key={i} className="p-3 rounded border border-white/5 bg-white/5 flex flex-col gap-2 group hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-sm font-bold text-white">{ex.symbol}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ex.side === 'BUY' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {ex.side}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end border-t border-white/5 pt-2">
                                    <div className="text-[10px] text-muted-foreground">
                                        <span className="text-white font-mono">{ex.amt}</span> • {ex.time}
                                    </div>
                                    {ex.status === 'PENDING' ? (
                                        <Button
                                            onClick={() => handleApprove(i)}
                                            className="h-6 text-[10px] bg-blue-600 hover:bg-blue-500 text-white border-0"
                                        >
                                            APPROVE
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                                            <ShieldCheck className="w-3 h-3" /> EXECUTED
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {executions.every(e => e.status === 'FILLED') && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                                <ShieldCheck className="w-8 h-8 mb-2" />
                                <span className="text-xs">All Orders Clear</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* --- Bottom Table (Strategy Allocations) --- */}
            <div className="lg:col-span-12">
                <Card className="bg-[#0D0D0D] border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111]">
                        <h3 className="text-sm font-bold text-white">Strategy Allocation Matrix</h3>
                        <span className="text-xs text-muted-foreground">Total Allocated: 70%</span>
                    </div>
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0A0A0A] text-gray-500 uppercase tracking-wider font-mono">
                            <tr>
                                <th className="px-6 py-3">Strategy Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Sharpe</th>
                                <th className="px-6 py-3 text-right">Max DD</th>
                                <th className="px-6 py-3 text-right">Allocation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">L/S Equity Momentum</td>
                                <td className="px-6 py-4"><span className="bg-[#1A1A1A] border border-white/10 px-2 py-0.5 rounded text-[10px]">Momentum</span></td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> <span className="text-gray-300">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-emerald-400">1.45</td>
                                <td className="px-6 py-4 text-right font-mono text-red-400">-12.5%</td>
                                <td className="px-6 py-4 text-right font-bold text-white">40%</td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">Crypto Vol Harvest</td>
                                <td className="px-6 py-4"><span className="bg-[#1A1A1A] border border-white/10 px-2 py-0.5 rounded text-[10px]">Volatility Harvesting</span></td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> <span className="text-gray-300">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-emerald-400">2.1</td>
                                <td className="px-6 py-4 text-right font-mono text-red-400">-18%</td>
                                <td className="px-6 py-4 text-right font-bold text-white">30%</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

// ... keep helpers like StatCard if needed or remove them. I replaced them inline for specific layout.

function StatCard({ icon, label, value, sub, trend }: any) {
    return null; // Deprecated
}

export const StrategyBuilderView = () => {
    const [prompt, setPrompt] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [jsonOutput, setJsonOutput] = React.useState<string | null>(null);

    const handleGenerate = () => {
        if (!prompt) {
            setPrompt("Create a mean reversion strategy for Nifty 50 during high volatility.");
        }
        setIsGenerating(true);
        setTimeout(() => {
            setJsonOutput(JSON.stringify({
                strategy: "MEAN_REVERSION_VOL_ADJUSTED",
                asset_universe: ["NIFTY50"],
                parameters: {
                    lookback_period: 20,
                    z_score_threshold: 2.5,
                    stop_loss_atr: 1.5
                },
                risk_limits: {
                    max_drawdown: 0.15,
                    position_sizing: "VOLATILITY_WEIGHTED"
                }
            }, null, 2));
            setIsGenerating(false);
        }, 1200); // 1.2s delay for effect
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Strategy Architect</h2>
                <Button variant="primary" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? <Activity className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isGenerating ? "Architecting..." : "Generate Template"}
                </Button>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-8 p-6 space-y-4 min-h-[400px]">
                    <h3 className="text-sm font-mono text-muted-foreground uppercase">Natural Language Input</h3>
                    <textarea
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-lg p-4 text-white font-mono focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="Describe your strategy logic... (e.g., 'Execute Mean Reversion on NASDAQ top 50 symbols when RSI < 30 and VIX < 20. Exit when price crosses SMA 50.')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex gap-2">
                        {["Mean Reversion", "Momentum Breakout", "Statistical Arbitrage"].map(tag => (
                            <button key={tag} onClick={() => setPrompt(`Create a ${tag} strategy for...`)} className="px-3 py-1 bg-white/5 rounded-full text-xs hover:bg-white/10 transition-colors">{tag}</button>
                        ))}
                    </div>
                </Card>
                <Card className="col-span-4 p-6 bg-white/5 border-dashed relative overflow-hidden">
                    {jsonOutput ? (
                        <pre className="text-xs text-green-400 font-mono overflow-auto h-full animate-in fade-in zoom-in-95 duration-300">
                            {jsonOutput}
                        </pre>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                            <FileText className="h-12 w-12" />
                            <p className="text-sm">JSON Logic will appear here</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export const BacktestView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Backtest Lab</h2>
            <div className="flex gap-2">
                <Button variant="ghost">Export Report</Button>
                <Button variant="primary">Run Full Simulation</Button>
            </div>
        </div>
        <Card className="p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-4">Performance Heatmap (Year-over-Year)</h3>
            <div className="grid grid-cols-12 gap-1 h-64">
                {Array.from({ length: 48 }).map((_, i) => {
                    const intensity = Math.random();
                    // Green if > 0.4, Red if < 0.4.
                    const isGreen = intensity > 0.3;
                    const opacity = 0.2 + (intensity * 0.8);
                    return (
                        <div
                            key={i}
                            className={`rounded-sm ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ opacity }}
                        />
                    )
                })}
            </div>
            <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Total Return</div>
                    <div className="text-2xl font-bold text-green-400">+124.5%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                    <div className="text-2xl font-bold text-white">2.85</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Max Drawdown</div>
                    <div className="text-2xl font-bold text-red-400">-12.1%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold text-blue-400">68%</div>
                </div>
            </div>
        </Card>
    </div>
);

export const PortfolioView = () => {
    const [regime, setRegime] = React.useState<"NEUTRAL" | "BULL_TREND" | "LIQUIDITY_CRISIS">("NEUTRAL");
    const [loading, setLoading] = React.useState(false);

    const handleAdapt = () => {
        setLoading(true);
        setTimeout(() => {
            setRegime("BULL_TREND");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Portfolio Architect</h2>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${regime === 'BULL_TREND' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wider">{regime.replace('_', ' ')}</span>
                    </div>
                    <Button variant="primary" onClick={handleAdapt} disabled={loading || regime === 'BULL_TREND'}>
                        {loading ? <Zap className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                        {loading ? "Rebalancing..." : "Run Regime Adaptation"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="mb-4 text-sm text-muted-foreground">Asset Allocation</h3>
                    <div className="space-y-4">
                        {/* Mock Bars */}
                        {[
                            { label: "Equities (Growth)", val: regime === 'BULL_TREND' ? 65 : 40, color: "bg-blue-500" },
                            { label: "Bonds (Govt)", val: regime === 'BULL_TREND' ? 10 : 30, color: "bg-yellow-500" },
                            { label: "Commodities", val: regime === 'BULL_TREND' ? 15 : 10, color: "bg-orange-500" },
                            { label: "Cash / Hedges", val: regime === 'BULL_TREND' ? 10 : 20, color: "bg-gray-500" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} transition-all duration-1000 ease-in-out`}
                                        style={{ width: `${item.val}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                    <Shield className={`w-16 h-16 ${regime === 'BULL_TREND' ? 'text-green-500' : 'text-gray-600'} transition-colors duration-500`} />
                    <div>
                        <h4 className="font-bold text-lg">Dynamic Risk Controls</h4>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                            {regime === 'BULL_TREND'
                                ? "Aggressive posture enabled. Volatility targeting increased to 18%. Leverage cap raised to 2.5x."
                                : "Standard risk parameters active. Monitoring market microstructure for liquidity gaps."}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export const ComplianceView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
        <h2 className="text-2xl font-bold text-white">Compliance Gate</h2>
        <Card className="p-0 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5 text-xs uppercase text-muted-foreground font-mono">
                    <tr>
                        <th className="px-6 py-4 text-left">Ticket ID for Strategy</th>
                        <th className="px-6 py-4 text-left">Risk Score</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {[1, 2, 3].map((_, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <span className="font-bold text-white">ALPHA-V4-{i}92</span>
                                <div className="text-xs text-muted-foreground">Leverage limit increase request</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-yellow-500 font-mono">MED (4.5)</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">PENDING REVIEW</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost">Approve</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </div>
);
