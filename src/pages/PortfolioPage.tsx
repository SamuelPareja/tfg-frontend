import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { portfolioQuinielas } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const riskProfiles = ['conservador', 'equilibrado', 'agresivo'] as const;

export default function PortfolioPage() {
  const [profile, setProfile] = useState<typeof riskProfiles[number]>('equilibrado');

  const globalCoverage = 82;
  const globalDiversification = 74;
  const globalRisk = profile === 'conservador' ? 'Bajo' : profile === 'agresivo' ? 'Alto' : 'Medio';

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Cartera IA</h1>
          <p className="text-sm text-muted-foreground">10 quinielas optimizadas · Jornada 30</p>
        </div>

        {/* Risk profile selector */}
        <NeuCard className="p-4">
          <div className="text-xs text-muted-foreground mb-3 font-display uppercase tracking-wider">Perfil de riesgo</div>
          <div className="flex gap-2">
            {riskProfiles.map((rp) => (
              <button
                key={rp}
                onClick={() => setProfile(rp)}
                className={cn(
                  'flex-1 py-2.5 rounded-lg text-sm font-display font-semibold capitalize transition-all',
                  profile === rp ? 'neu-tab-active' : 'neu-tab-inactive'
                )}
              >
                {rp}
              </button>
            ))}
          </div>
        </NeuCard>

        {/* Global summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Cobertura global", value: `${globalCoverage}%`, variant: 'info' as const },
            { label: "Diversificación", value: `${globalDiversification}%`, variant: 'success' as const },
            { label: "Riesgo agregado", value: globalRisk, variant: profile === 'conservador' ? 'success' as const : profile === 'agresivo' ? 'danger' as const : 'warning' as const },
            { label: "Exposición media", value: "1-X-2: 38/32/30", variant: 'default' as const },
          ].map((m) => (
            <NeuCard key={m.label} className="p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
              <div className="font-display font-bold text-foreground">{m.value}</div>
            </NeuCard>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {portfolioQuinielas.map((q, i) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <NeuCard className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-display font-semibold">{q.name}</span>
                  <NeuBadge variant={q.risk === 'low' ? 'success' : q.risk === 'high' ? 'danger' : 'warning'} className="text-[9px]">
                    {q.risk === 'low' ? 'Bajo' : q.risk === 'high' ? 'Alto' : 'Medio'}
                  </NeuBadge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Aciertos est.</span>
                    <span className="font-semibold">{q.expectedHits}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Cobertura</span>
                    <span className="font-semibold">{q.coverage}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Diversificación</span>
                    <span className="font-semibold">{q.diversification}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Consenso</span>
                    <NeuBadge variant={q.consensus === 'high' ? 'success' : q.consensus === 'low' ? 'warning' : 'info'} className="text-[8px]">
                      {q.consensus === 'high' ? 'Alto' : q.consensus === 'low' ? 'Bajo' : 'Medio'}
                    </NeuBadge>
                  </div>
                </div>
                <div className="flex gap-1 justify-center pt-1">
                  {q.picks.map((p, j) => (
                    <span key={j} className="neu-inset w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center">
                      {p.pick}
                    </span>
                  ))}
                </div>
              </NeuCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
