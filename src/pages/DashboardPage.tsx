import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { ValueSignal } from "@/components/ui/ValueSignal";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { dashboardMetrics, matches, pools } from "@/data/mockData";
import { motion } from "framer-motion";
import { BarChart3, Target, Zap, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { icon: BarChart3, label: "Partidos analizados", value: dashboardMetrics.matchesAnalyzed.toLocaleString(), color: "text-primary" },
  { icon: Zap, label: "Picks de valor", value: dashboardMetrics.valuePicks, color: "text-success" },
  { icon: Target, label: "Quinielas generadas", value: dashboardMetrics.poolsGenerated, color: "text-accent" },
  { icon: TrendingUp, label: "Precisión estimada", value: `${dashboardMetrics.estimatedAccuracy}%`, color: "text-primary" },
  { icon: Activity, label: "Oportunidades activas", value: dashboardMetrics.activeOpportunities, color: "text-success" },
];

const fadeIn = (i: number) => ({ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05 } });

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Resumen de análisis · Jornada 30</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} {...fadeIn(i)}>
              <NeuCard className="p-4">
                <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
                <div className="text-xl font-display font-bold text-foreground">{m.value}</div>
                <div className="text-[11px] text-muted-foreground">{m.label}</div>
              </NeuCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming matches */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground">Próximos partidos</h2>
              <Link to="/matches" className="text-xs text-primary flex items-center gap-1 hover:underline">Ver todos <ArrowRight className="w-3 h-3" /></Link>
            </div>
            {matches.slice(0, 4).map((match, i) => (
              <motion.div key={match.id} {...fadeIn(i + 5)}>
                <NeuCard className="p-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg">{match.homeTeam.logo}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{match.homeTeam.shortName} vs {match.awayTeam.shortName}</div>
                        <div className="text-[10px] text-muted-foreground">{match.date} · {match.time}</div>
                      </div>
                      <span className="text-lg">{match.awayTeam.logo}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2 text-xs font-display font-semibold">
                        <span className="neu-inset px-2 py-1 rounded">{match.prediction.home}%</span>
                        <span className="neu-inset px-2 py-1 rounded">{match.prediction.draw}%</span>
                        <span className="neu-inset px-2 py-1 rounded">{match.prediction.away}%</span>
                      </div>
                      <ValueSignal level={match.valueSignal} showLabel={false} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <ConfidenceMeter value={match.confidence} size="sm" />
                  </div>
                </NeuCard>
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Active pools */}
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground">Quinielas activas</h2>
              <Link to="/pools" className="text-xs text-primary flex items-center gap-1 hover:underline">Ver todas <ArrowRight className="w-3 h-3" /></Link>
            </div>
            {pools.filter(p => p.status === 'active').map((pool, i) => (
              <motion.div key={pool.id} {...fadeIn(i + 9)}>
                <NeuCard className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{pool.name}</span>
                    <NeuBadge variant={pool.risk === 'low' ? 'success' : pool.risk === 'high' ? 'danger' : 'warning'}>
                      {pool.risk === 'low' ? 'Bajo riesgo' : pool.risk === 'high' ? 'Alto riesgo' : 'Medio'}
                    </NeuBadge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="neu-inset p-2 rounded-lg">
                      <div className="text-lg font-display font-bold text-foreground">{pool.expectedHits}</div>
                      <div className="text-[9px] text-muted-foreground">Aciertos esperados</div>
                    </div>
                    <div className="neu-inset p-2 rounded-lg">
                      <div className="text-lg font-display font-bold text-accent">{pool.estimatedReturn}x</div>
                      <div className="text-[9px] text-muted-foreground">Rentabilidad est.</div>
                    </div>
                  </div>
                </NeuCard>
              </motion.div>
            ))}

            {/* Quick access */}
            <NeuCard className="p-4">
              <h3 className="font-display font-semibold text-sm mb-3">Accesos rápidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Cartera IA", to: "/portfolio" },
                  { label: "Estadísticas", to: "/stats" },
                  { label: "Ranking", to: "/ranking" },
                  { label: "Favoritos", to: "/favorites" },
                ].map((q) => (
                  <Link key={q.to} to={q.to} className="neu-inset p-3 rounded-lg text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                    {q.label}
                  </Link>
                ))}
              </div>
            </NeuCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
