import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { FormResult } from "@/components/ui/FormResult";
import { teams, matches } from "@/data/mockData";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(teams.slice(0, 4).map(t => t.id));

  const favTeams = teams.filter(t => favorites.includes(t.id));

  const removeFav = (id: string) => setFavorites(f => f.filter(x => x !== id));

  if (favTeams.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl">Sin favoritos</h2>
          <p className="text-sm text-muted-foreground max-w-xs">Añade equipos a favoritos para seguir su rendimiento y recibir señales personalizadas.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Favoritos</h1>
          <p className="text-sm text-muted-foreground">Tus equipos seguidos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favTeams.map((team, i) => {
            const teamMatches = matches.filter(m => m.homeTeam.id === team.id || m.awayTeam.id === team.id);
            return (
              <motion.div key={team.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <NeuCard className="p-5 space-y-3 relative">
                  <button onClick={() => removeFav(team.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <div className="text-3xl mb-1">{team.logo}</div>
                    <div className="font-display font-bold">{team.name}</div>
                    <div className="text-xs text-muted-foreground">{team.league}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Forma reciente</div>
                    <FormResult results={['W', 'D', 'W', 'L', 'W']} />
                  </div>
                  {teamMatches.length > 0 && (
                    <div className="neu-inset p-3 rounded-lg">
                      <div className="text-[10px] text-muted-foreground mb-1">Próximo partido</div>
                      <div className="text-xs font-semibold">
                        {teamMatches[0].homeTeam.shortName} vs {teamMatches[0].awayTeam.shortName}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{teamMatches[0].date} · {teamMatches[0].time}</div>
                    </div>
                  )}
                </NeuCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
