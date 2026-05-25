import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { NeuInput } from "@/components/ui/NeuInput";
import { ValueSignal } from "@/components/ui/ValueSignal";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { FormResult } from "@/components/ui/FormResult";
import { matches, Match } from "@/data/mockData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

function MatchDetail({ match }: { match: Match }) {
  const s = match.stats!;
  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
      <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Forma {match.homeTeam.shortName}</div>
            <FormResult results={s.homeForm} />
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Forma {match.awayTeam.shortName}</div>
            <div className="flex justify-end"><FormResult results={s.awayForm} /></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="neu-inset p-3 rounded-lg">
            <div className="text-lg font-display font-bold">{s.homeGoalsFor}</div>
            <div className="text-[9px] text-muted-foreground">GF Local</div>
          </div>
          <div className="neu-inset p-3 rounded-lg">
            <div className="text-lg font-display font-bold text-primary">{s.homePossession}%-{s.awayPossession}%</div>
            <div className="text-[9px] text-muted-foreground">Posesión</div>
          </div>
          <div className="neu-inset p-3 rounded-lg">
            <div className="text-lg font-display font-bold">{s.awayGoalsFor}</div>
            <div className="text-[9px] text-muted-foreground">GF Visitante</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="neu-inset p-3 rounded-lg">
            <div className="font-display font-bold text-foreground">{s.h2h.home}</div>
            <div className="text-[9px] text-muted-foreground">Victorias local</div>
          </div>
          <div className="neu-inset p-3 rounded-lg">
            <div className="font-display font-bold text-foreground">{s.h2h.draw}</div>
            <div className="text-[9px] text-muted-foreground">Empates</div>
          </div>
          <div className="neu-inset p-3 rounded-lg">
            <div className="font-display font-bold text-foreground">{s.h2h.away}</div>
            <div className="text-[9px] text-muted-foreground">Victorias visitante</div>
          </div>
        </div>
        <NeuCard variant="small" className="p-3 bg-primary/5 border-primary/10">
          <div className="text-xs font-display font-semibold text-primary mb-1">Análisis del modelo</div>
          <p className="text-xs text-muted-foreground">El modelo identifica ventaja para {match.prediction.home > match.prediction.away ? 'el equipo local' : 'el equipo visitante'} basándose en forma reciente, historial directo y métricas de rendimiento. Confianza: {match.confidence}%.</p>
        </NeuCard>
      </div>
    </motion.div>
  );
}

export default function MatchesPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = matches.filter(m =>
    m.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
    m.awayTeam.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Partidos</h1>
          <p className="text-sm text-muted-foreground">Predicciones y análisis · LaLiga · Jornada 30</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="w-64">
            <NeuInput placeholder="Buscar equipo..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {['LaLiga', 'J30', 'Todos'].map((f) => (
              <button key={f} className={f === 'LaLiga' ? 'neu-tab-active px-3 py-2 rounded-lg text-xs font-display font-semibold' : 'neu-tab-inactive px-3 py-2 rounded-lg text-xs font-display font-semibold'}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Match list */}
        <div className="space-y-3">
          {filtered.map((match) => (
            <motion.div key={match.id} layout>
              <NeuCard className="p-4 cursor-pointer" onClick={() => setExpanded(expanded === match.id ? null : match.id)}>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-xl">{match.homeTeam.logo}</div>
                      <div className="text-[10px] font-semibold mt-0.5">{match.homeTeam.shortName}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-display">vs</div>
                    <div className="text-center">
                      <div className="text-xl">{match.awayTeam.logo}</div>
                      <div className="text-[10px] font-semibold mt-0.5">{match.awayTeam.shortName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="text-xs text-muted-foreground text-right">
                      <div>{match.date}</div>
                      <div>{match.time}</div>
                    </div>
                    <div className="flex gap-1.5">
                      {[
                        { label: '1', val: match.prediction.home },
                        { label: 'X', val: match.prediction.draw },
                        { label: '2', val: match.prediction.away },
                      ].map((p) => (
                        <div key={p.label} className="neu-inset px-3 py-1.5 rounded-lg text-center min-w-[48px]">
                          <div className="text-[9px] text-muted-foreground">{p.label}</div>
                          <div className="text-sm font-display font-bold">{p.val}%</div>
                        </div>
                      ))}
                    </div>
                    <ValueSignal level={match.valueSignal} />
                    <div className="w-28">
                      <ConfidenceMeter value={match.confidence} size="sm" />
                    </div>
                    {expanded === match.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === match.id && match.stats && <MatchDetail match={match} />}
                </AnimatePresence>
              </NeuCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
