import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { FormResult } from "@/components/ui/FormResult";
import { standings, teams } from "@/data/mockData";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const goalsData = standings.slice(0, 10).map(s => ({
  name: s.team.shortName,
  gf: s.goalsFor,
  ga: s.goalsAgainst,
}));

export default function StatsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Estadísticas</h1>
          <p className="text-sm text-muted-foreground">LaLiga · Temporada 2025/26</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['LaLiga', 'Premier League', 'Serie A'].map((l, i) => (
            <button key={l} className={i === 0 ? 'neu-tab-active px-4 py-2 rounded-lg text-xs font-display font-semibold' : 'neu-tab-inactive px-4 py-2 rounded-lg text-xs font-display font-semibold'}>
              {l}
            </button>
          ))}
        </div>

        {/* Goals chart */}
        <NeuCard className="p-5">
          <h3 className="font-display font-semibold mb-4">Goles a favor / en contra</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsData} barGap={2}>
                <XAxis dataKey="name" tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(215 22% 14%)', border: '1px solid hsl(215 18% 20%)', borderRadius: '8px', fontSize: 12 }}
                  labelStyle={{ color: 'hsl(210 20% 90%)' }}
                />
                <Bar dataKey="gf" fill="hsl(150 60% 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ga" fill="hsl(5 65% 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>

        {/* Standings table */}
        <NeuCard className="p-5 overflow-x-auto">
          <h3 className="font-display font-semibold mb-4">Clasificación</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left pb-3 pl-2">#</th>
                <th className="text-left pb-3">Equipo</th>
                <th className="text-center pb-3">PJ</th>
                <th className="text-center pb-3">G</th>
                <th className="text-center pb-3">E</th>
                <th className="text-center pb-3">P</th>
                <th className="text-center pb-3">GF</th>
                <th className="text-center pb-3">GC</th>
                <th className="text-center pb-3">Pts</th>
                <th className="text-center pb-3">Forma</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => (
                <motion.tr key={s.team.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-border/30 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 pl-2 font-display font-bold text-muted-foreground">{s.position}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span>{s.team.logo}</span>
                      <span className="font-medium">{s.team.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3">{s.played}</td>
                  <td className="text-center py-3 text-success">{s.won}</td>
                  <td className="text-center py-3">{s.drawn}</td>
                  <td className="text-center py-3 text-destructive">{s.lost}</td>
                  <td className="text-center py-3">{s.goalsFor}</td>
                  <td className="text-center py-3">{s.goalsAgainst}</td>
                  <td className="text-center py-3 font-display font-bold text-foreground">{s.points}</td>
                  <td className="py-3"><FormResult results={s.form} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </NeuCard>
      </div>
    </AppLayout>
  );
}
