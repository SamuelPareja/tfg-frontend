import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { pools, matches } from "@/data/mockData";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Copy, Trash2, Eye, Edit2 } from "lucide-react";
import { ValueSignal } from "@/components/ui/ValueSignal";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";

function PoolBuilder({ onClose }: { onClose: () => void }) {
  const [picks, setPicks] = useState<Record<string, '1' | 'X' | '2'>>({});
  const aiRecommendations: Record<string, '1' | 'X' | '2'> = {};
  matches.forEach(m => {
    aiRecommendations[m.id] = m.prediction.home >= m.prediction.draw && m.prediction.home >= m.prediction.away ? '1' : m.prediction.draw >= m.prediction.away ? 'X' : '2';
  });

  const totalPicks = Object.keys(picks).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg">Constructor de quiniela</h2>
        <NeuButton variant="ghost" size="sm" onClick={onClose}>Cerrar</NeuButton>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {matches.map((match) => (
            <NeuCard key={match.id} className="p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{match.homeTeam.logo}</span>
                  <span className="text-sm font-semibold">{match.homeTeam.shortName}</span>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <span className="text-sm font-semibold">{match.awayTeam.shortName}</span>
                  <span className="text-lg">{match.awayTeam.logo}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {(['1', 'X', '2'] as const).map((pick) => (
                      <button
                        key={pick}
                        onClick={() => setPicks(p => ({ ...p, [match.id]: pick }))}
                        className={picks[match.id] === pick
                          ? 'neu-tab-active px-4 py-2 rounded-lg text-sm font-display font-bold min-w-[40px]'
                          : 'neu-tab-inactive px-4 py-2 rounded-lg text-sm font-display font-bold min-w-[40px] hover:text-foreground transition-colors'
                        }
                      >
                        {pick}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 border-l border-border/50 pl-3">
                    <div className="text-[10px] text-muted-foreground">
                      IA: <span className="text-primary font-bold">{aiRecommendations[match.id]}</span>
                    </div>
                    <ValueSignal level={match.valueSignal} showLabel={false} />
                  </div>
                </div>
              </div>
              <div className="mt-2"><ConfidenceMeter value={match.confidence} size="sm" /></div>
            </NeuCard>
          ))}
        </div>

        {/* Summary panel */}
        <div className="lg:sticky lg:top-24 self-start">
          <NeuCard glow="primary" className="p-5 space-y-4">
            <h3 className="font-display font-bold text-foreground">Resumen de quiniela</h3>
            <div className="space-y-3">
              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Partidos marcados</span>
                <span className="font-display font-bold">{totalPicks}/{matches.length}</span>
              </div>
              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Aciertos esperados</span>
                <span className="font-display font-bold text-success">9-11</span>
              </div>
              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Diferencia vs consenso</span>
                <span className="font-display font-bold text-accent">+3</span>
              </div>
              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Nivel de riesgo</span>
                <NeuBadge variant="warning">Medio</NeuBadge>
              </div>
            </div>
            <NeuButton variant="primary" size="lg" className="w-full" disabled={totalPicks < matches.length}>
              Guardar quiniela
            </NeuButton>
          </NeuCard>
        </div>
      </div>
    </div>
  );
}

export default function PoolsPage() {
  const [building, setBuilding] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Quinielas</h1>
            <p className="text-sm text-muted-foreground">Gestión y construcción inteligente</p>
          </div>
          {!building && (
            <NeuButton variant="primary" onClick={() => setBuilding(true)}>
              <Plus className="w-4 h-4 mr-2 inline" /> Nueva quiniela
            </NeuButton>
          )}
        </div>

        {building ? (
          <PoolBuilder onClose={() => setBuilding(false)} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pools.map((pool, i) => (
              <motion.div key={pool.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <NeuCard className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold">{pool.name}</span>
                    <NeuBadge variant={pool.status === 'active' ? 'info' : pool.status === 'completed' ? 'success' : 'default'}>
                      {pool.status === 'active' ? 'Activa' : pool.status === 'completed' ? 'Completada' : 'Borrador'}
                    </NeuBadge>
                  </div>
                  <div className="text-xs text-muted-foreground">Jornada {pool.matchday} · {pool.league}</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="neu-inset p-2 rounded-lg">
                      <div className="font-display font-bold text-foreground">{pool.expectedHits}</div>
                      <div className="text-[8px] text-muted-foreground">Aciertos esp.</div>
                    </div>
                    <div className="neu-inset p-2 rounded-lg">
                      <div className="font-display font-bold text-accent">{pool.estimatedReturn}x</div>
                      <div className="text-[8px] text-muted-foreground">Rentabilidad</div>
                    </div>
                    <div className="neu-inset p-2 rounded-lg">
                      <NeuBadge variant={pool.risk === 'low' ? 'success' : pool.risk === 'high' ? 'danger' : 'warning'} className="text-[8px]">
                        {pool.risk === 'low' ? 'Bajo' : pool.risk === 'high' ? 'Alto' : 'Medio'}
                      </NeuBadge>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="neu-button p-2 rounded-lg text-muted-foreground hover:text-foreground"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="neu-button p-2 rounded-lg text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="neu-button p-2 rounded-lg text-muted-foreground hover:text-foreground"><Copy className="w-3.5 h-3.5" /></button>
                    <button className="neu-button p-2 rounded-lg text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </NeuCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
