"use client";

import { Scene } from "@/components/canvas/Scene";
import { TradingDeck } from "@/components/canvas/TradingDeck";
import { useAppStore } from "@/lib/store";
import { LoadingScreen } from "@/components/loading-screen";
import { LoginTerminal } from "@/components/flow/login-terminal";
import { RegionSelector } from "@/components/flow/region-selector";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/shell/sidebar";
import { DashboardView, StrategyBuilderView, BacktestView, PortfolioView, ComplianceView } from "@/components/modules/views";
import { AgentsView } from "@/components/modules/agents-view";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { flowState, setFlowState, activeView } = useAppStore();

  // 1. Login Terminal
  if (flowState === 'LOGIN') {
    return <LoginTerminal />;
  }

  // 2. Boot Sequence
  if (flowState === 'BOOT') {
    return <LoadingScreen onComplete={() => setFlowState('REGION')} />;
  }

  // 3. Region Selection
  if (flowState === 'REGION') {
    return <RegionSelector />;
  }

  // 4. Main Dashboard (Full Width - 3D ENABLED)
  return (
    <div className="h-screen w-full flex bg-background overflow-hidden text-foreground font-sans selection:bg-primary selection:text-black relative">

      {/* BACKGROUND: 3D Scene (Disabled for Stability) */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
        {/* <Scene>
          <TradingDeck />
        </Scene> */}
        {/* CSS Holographic Grid Fallback */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* FOREGROUND: Live Application */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 backdrop-blur-sm bg-black/60">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative scrollbar-hide">
            {/* Ambient Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeView === 'OVERVIEW' && <DashboardView key="overview" />}
              {activeView === 'AGENTS' && <AgentsView key="agents" />}
              {activeView === 'STRATEGY' && <StrategyBuilderView key="strategy" />}
              {activeView === 'BACKTEST' && <BacktestView key="backtest" />}
              {activeView === 'PORTFOLIO' && <PortfolioView key="portfolio" />}
              {(activeView === 'COMPLIANCE' || activeView === 'EXECUTION') && <ComplianceView key="compliance" />}
            </AnimatePresence>
          </main>
        </div>
      </div>

    </div>
  );
}
