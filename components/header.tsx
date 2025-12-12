import { Activity, Radio, Terminal, Cpu } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white leading-none">AI ARCHITECT</h1>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Autonomous Fund OS</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="font-mono text-xs text-green-500">SYSTEM ONLINE</span>
                    </div>

                    <div className="h-4 w-[1px] bg-white/10" />

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Terminal className="h-4 w-4" />
                        <span className="font-mono text-xs">v0.9.1-beta</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
