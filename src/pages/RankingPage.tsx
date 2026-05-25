import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { rankings } from "@/data/mockData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RankingPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Ranking</h1>
          <p className="text-sm text-muted-foreground">Clasificación global de usuarios</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['Global', 'Jornada 30', 'Temporada'].map((f, i) => (
            <button key={f} className={i === 0 ? 'neu-tab-active px-4 py-2 rounded-lg text-xs font-display font-semibold' : 'neu-tab-inactive px-4 py-2 rounded-lg text-xs font-display font-semibold'}>
              {f}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4">
          {rankings.slice(0, 3).map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <NeuCard glow={i === 0 ? 'primary' : 'none'} className={cn("p-5 text-center", i === 0 && "ring-1 ring-primary/20")}>
                <div className="text-3xl mb-2">{user.badge || user.avatar}</div>
                <div className="text-2xl mb-1">{user.avatar}</div>
                <div className="font-display font-semibold text-foreground">{user.name}</div>
                <div className="text-2xl font-display font-bold text-gradient-primary mt-2">{user.score.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">puntos</div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="neu-inset p-1.5 rounded text-center">
                    <div className="text-xs font-bold">{user.hits}</div>
                    <div className="text-[8px] text-muted-foreground">Aciertos</div>
                  </div>
                  <div className="neu-inset p-1.5 rounded text-center">
                    <div className="text-xs font-bold">{user.pools}</div>
                    <div className="text-[8px] text-muted-foreground">Quinielas</div>
                  </div>
                  <div className="neu-inset p-1.5 rounded text-center">
                    <div className="text-xs font-bold">{user.streak}🔥</div>
                    <div className="text-[8px] text-muted-foreground">Racha</div>
                  </div>
                </div>
              </NeuCard>
            </motion.div>
          ))}
        </div>

        {/* Rest of ranking */}
        <div className="space-y-2">
          {rankings.slice(3).map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }}>
              <NeuCard className={cn("p-4 flex items-center justify-between", user.name === 'Tú' && 'ring-1 ring-primary/30 glow-primary')}>
                <div className="flex items-center gap-4">
                  <span className="font-display font-bold text-muted-foreground w-6 text-center">{i + 4}</span>
                  <span className="text-xl">{user.avatar}</span>
                  <div>
                    <div className="font-semibold text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.hits} aciertos · {user.pools} quinielas</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.streak > 3 && <NeuBadge variant="warning">{user.streak}🔥</NeuBadge>}
                  <span className="font-display font-bold text-foreground">{user.score.toLocaleString()}</span>
                </div>
              </NeuCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
