import { Bot, Brain, Terminal, Activity, ShieldAlert, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AgentsView = () => {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Bot className="h-6 w-6 text-indigo-400" />
                        Autonomous Agent Workforce
                    </h2>
                    <p className="text-sm text-muted-foreground">Real-time internal monologue of active neural workers.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10">
                        <Terminal className="mr-2 h-4 w-4" />
                        View Logs
                    </Button>
                    <Button variant="primary">Deploy New Agent</Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Agent 1: Market Analyst */}
                <AgentCard
                    name="Alpha-Sentinel"
                    role="Market Analyst (L4)"
                    status="ACTIVE"
                    icon={Brain}
                    color="text-emerald-400"
                    logs={[
                        "Scanning 50,000 news sources...",
                        "Detected bullish sentiment in Semi-Conductors due to TSMC report.",
                        "Recommending +2.5% allocation to NVDA/AMD.",
                        "Confidence Score: 0.94"
                    ]}
                />

                {/* Agent 2: Risk Guardian */}
                <AgentCard
                    name="Risk-Guardian"
                    role="Volatility Manager"
                    status="ACTIVE"
                    icon={ShieldAlert}
                    color="text-red-400"
                    logs={[
                        "Monitoring VIX index (14.2).",
                        "Portfolio Beta: 1.12 (Within limits).",
                        "Simulating 'Flash Crash' scenario...",
                        "Scenario Survival Rate: 99.8%. No hedging required."
                    ]}
                />

                {/* Agent 3: Compliance Auditor */}
                <AgentCard
                    name="Law-Net"
                    role="Compliance Auditor"
                    status="IDLE"
                    icon={BadgeCheck}
                    color="text-blue-400"
                    logs={[
                        "Audit cycle complete.",
                        "Checking wash-sale rules on recent TSLA trades...",
                        "All trades compliant with SEC Rule 204.",
                        "Waiting for next execution block."
                    ]}
                />
            </div>

            {/* Terminal Output */}
            <Card className="p-6 bg-black border border-white/10 font-mono text-xs h-64 overflow-y-auto">
                <div className="text-muted-foreground mb-2">root@alpha-arc:~/agents/logs# tail -f activity.log</div>
                <div className="space-y-1">
                    <div className="text-green-500/80">[10:42:01] Alpha-Sentinel connected to Bloomberg API.</div>
                    <div className="text-green-500/80">[10:42:05] Parsing 142 sec filings...</div>
                    <div className="text-blue-500/80">[10:42:12] Law-Net flagged potential conflict in trade #9921 (Resolved).</div>
                    <div className="text-red-500/80">[10:42:45] Risk-Guardian rejected leverage increase request. Reason: "Weekend Exposure".</div>
                    <div className="text-white animate-pulse">_</div>
                </div>
            </Card>
        </div>
    );
};

function AgentCard({ name, role, status, icon: Icon, color, logs }: any) {
    return (
        <Card className="p-6 border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="font-bold text-white">{name}</div>
                        <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                </div>
                <div className="text-[10px] font-bold px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/20">
                    {status}
                </div>
            </div>

            <div className="space-y-2 mt-4 bg-black/40 p-3 rounded-lg border border-white/5 min-h-[100px]">
                {logs.map((log: string, i: number) => (
                    <div key={i} className="text-[10px] text-gray-400 font-mono border-l-2 border-white/10 pl-2">
                        {log}
                    </div>
                ))}
            </div>
        </Card>
    );
}
