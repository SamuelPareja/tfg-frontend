import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { teams, matches, rankings } from "@/data/mockData";
import { motion } from "framer-motion";
import { Users, Trophy, Shield as ShieldIcon, Calendar, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ['Usuarios', 'Ligas', 'Equipos', 'Partidos'] as const;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Usuarios');

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Administración</h1>
          <p className="text-sm text-muted-foreground">Panel de gestión de la plataforma</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                activeTab === tab ? 'neu-tab-active' : 'neu-tab-inactive'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'Usuarios' && (
          <NeuCard className="p-5 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Usuarios registrados</h3>
              <NeuButton size="sm"><Plus className="w-3 h-3 mr-1 inline" /> Añadir</NeuButton>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border/50">
                  <th className="text-left pb-3">Usuario</th>
                  <th className="text-center pb-3">Puntos</th>
                  <th className="text-center pb-3">Quinielas</th>
                  <th className="text-center pb-3">Estado</th>
                  <th className="text-right pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((user) => (
                  <tr key={user.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 flex items-center gap-2">
                      <span className="text-lg">{user.avatar}</span>
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="text-center py-3">{user.score}</td>
                    <td className="text-center py-3">{user.pools}</td>
                    <td className="text-center py-3"><NeuBadge variant="success">Activo</NeuBadge></td>
                    <td className="text-right py-3">
                      <div className="flex gap-1 justify-end">
                        <button className="p-1.5 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </NeuCard>
        )}

        {activeTab === 'Equipos' && (
          <NeuCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Equipos registrados</h3>
              <NeuButton size="sm"><Plus className="w-3 h-3 mr-1 inline" /> Añadir</NeuButton>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
              {teams.map((team) => (
                <div key={team.id} className="neu-inset p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{team.logo}</span>
                    <span className="text-xs font-medium">{team.shortName}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-muted-foreground hover:text-foreground"><Edit2 className="w-3 h-3" /></button>
                    <button className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </NeuCard>
        )}

        {activeTab === 'Ligas' && (
          <NeuCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Ligas configuradas</h3>
              <NeuButton size="sm"><Plus className="w-3 h-3 mr-1 inline" /> Añadir</NeuButton>
            </div>
            <div className="space-y-2">
              {['LaLiga', 'Premier League', 'Serie A', 'Bundesliga', 'Ligue 1'].map((league) => (
                <div key={league} className="neu-inset p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{league}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <NeuBadge variant={league === 'LaLiga' ? 'success' : 'default'}>{league === 'LaLiga' ? 'Activa' : 'Inactiva'}</NeuBadge>
                    <div className="flex gap-1">
                      <button className="text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </NeuCard>
        )}

        {activeTab === 'Partidos' && (
          <NeuCard className="p-5 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Partidos registrados</h3>
              <NeuButton size="sm"><Plus className="w-3 h-3 mr-1 inline" /> Añadir</NeuButton>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border/50">
                  <th className="text-left pb-3">Partido</th>
                  <th className="text-center pb-3">Fecha</th>
                  <th className="text-center pb-3">Jornada</th>
                  <th className="text-center pb-3">Estado</th>
                  <th className="text-right pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="py-3">
                      <span className="font-medium">{match.homeTeam.shortName} vs {match.awayTeam.shortName}</span>
                    </td>
                    <td className="text-center py-3 text-muted-foreground">{match.date}</td>
                    <td className="text-center py-3">J{match.matchday}</td>
                    <td className="text-center py-3"><NeuBadge variant="info">Próximo</NeuBadge></td>
                    <td className="text-right py-3">
                      <div className="flex gap-1 justify-end">
                        <button className="p-1.5 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </NeuCard>
        )}
      </div>
    </AppLayout>
  );
}
