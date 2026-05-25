// Mock data for QuinIA

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  league: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  league: string;
  matchday: number;
  status: 'upcoming' | 'live' | 'finished';
  score?: { home: number; away: number };
  prediction: { home: number; draw: number; away: number };
  confidence: number;
  valueSignal: 'high' | 'medium' | 'low' | 'none';
  stats?: MatchStats;
}

export interface MatchStats {
  homeForm: string[];
  awayForm: string[];
  h2h: { home: number; draw: number; away: number };
  homeGoalsFor: number;
  homeGoalsAgainst: number;
  awayGoalsFor: number;
  awayGoalsAgainst: number;
  homePossession: number;
  awayPossession: number;
}

export interface Pool {
  id: string;
  name: string;
  matchday: number;
  league: string;
  picks: { matchId: string; pick: '1' | 'X' | '2' }[];
  expectedHits: number;
  risk: 'low' | 'medium' | 'high';
  estimatedReturn: number;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
}

export interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  hits: number;
  pools: number;
  streak: number;
  badge?: string;
}

export interface LeagueStanding {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: string[];
}

// Teams
export const teams: Team[] = [
  { id: '1', name: 'Real Madrid', shortName: 'RMA', logo: '⚪', league: 'LaLiga' },
  { id: '2', name: 'FC Barcelona', shortName: 'FCB', logo: '🔵🔴', league: 'LaLiga' },
  { id: '3', name: 'Atlético de Madrid', shortName: 'ATM', logo: '🔴⚪', league: 'LaLiga' },
  { id: '4', name: 'Real Sociedad', shortName: 'RSO', logo: '🔵⚪', league: 'LaLiga' },
  { id: '5', name: 'Athletic Club', shortName: 'ATH', logo: '🔴⚪', league: 'LaLiga' },
  { id: '6', name: 'Real Betis', shortName: 'BET', logo: '💚', league: 'LaLiga' },
  { id: '7', name: 'Villarreal', shortName: 'VIL', logo: '💛', league: 'LaLiga' },
  { id: '8', name: 'Sevilla FC', shortName: 'SEV', logo: '⚪🔴', league: 'LaLiga' },
  { id: '9', name: 'Valencia CF', shortName: 'VAL', logo: '🦇', league: 'LaLiga' },
  { id: '10', name: 'Girona FC', shortName: 'GIR', logo: '🔴⚪', league: 'LaLiga' },
  { id: '11', name: 'Celta de Vigo', shortName: 'CEL', logo: '🔵', league: 'LaLiga' },
  { id: '12', name: 'Getafe CF', shortName: 'GET', logo: '🔵', league: 'LaLiga' },
  { id: '13', name: 'Osasuna', shortName: 'OSA', logo: '🔴', league: 'LaLiga' },
  { id: '14', name: 'Mallorca', shortName: 'MLL', logo: '🔴', league: 'LaLiga' },
  { id: '15', name: 'Las Palmas', shortName: 'LPA', logo: '💛', league: 'LaLiga' },
];

// Matches
export const matches: Match[] = [
  {
    id: 'm1', homeTeam: teams[0], awayTeam: teams[1], date: '2026-03-28', time: '21:00',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 42, draw: 28, away: 30 }, confidence: 72, valueSignal: 'high',
    stats: { homeForm: ['W','W','D','W','L'], awayForm: ['W','W','W','D','W'], h2h: { home: 5, draw: 3, away: 4 }, homeGoalsFor: 58, homeGoalsAgainst: 22, awayGoalsFor: 62, awayGoalsAgainst: 25, homePossession: 54, awayPossession: 58 }
  },
  {
    id: 'm2', homeTeam: teams[2], awayTeam: teams[3], date: '2026-03-28', time: '18:30',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 45, draw: 30, away: 25 }, confidence: 65, valueSignal: 'medium',
    stats: { homeForm: ['W','D','W','W','D'], awayForm: ['W','L','W','D','W'], h2h: { home: 6, draw: 2, away: 3 }, homeGoalsFor: 45, homeGoalsAgainst: 20, awayGoalsFor: 40, awayGoalsAgainst: 28, homePossession: 52, awayPossession: 50 }
  },
  {
    id: 'm3', homeTeam: teams[4], awayTeam: teams[5], date: '2026-03-28', time: '16:15',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 50, draw: 25, away: 25 }, confidence: 68, valueSignal: 'medium',
    stats: { homeForm: ['W','W','W','D','W'], awayForm: ['D','L','W','W','D'], h2h: { home: 4, draw: 4, away: 3 }, homeGoalsFor: 42, homeGoalsAgainst: 18, awayGoalsFor: 38, awayGoalsAgainst: 30, homePossession: 48, awayPossession: 55 }
  },
  {
    id: 'm4', homeTeam: teams[6], awayTeam: teams[7], date: '2026-03-29', time: '21:00',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 38, draw: 32, away: 30 }, confidence: 55, valueSignal: 'low',
    stats: { homeForm: ['D','W','L','W','D'], awayForm: ['L','D','W','L','W'], h2h: { home: 3, draw: 5, away: 4 }, homeGoalsFor: 35, homeGoalsAgainst: 25, awayGoalsFor: 30, awayGoalsAgainst: 32, homePossession: 52, awayPossession: 47 }
  },
  {
    id: 'm5', homeTeam: teams[8], awayTeam: teams[9], date: '2026-03-29', time: '18:30',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 35, draw: 30, away: 35 }, confidence: 48, valueSignal: 'high',
    stats: { homeForm: ['L','D','L','W','D'], awayForm: ['W','W','W','W','D'], h2h: { home: 4, draw: 3, away: 2 }, homeGoalsFor: 28, homeGoalsAgainst: 35, awayGoalsFor: 50, awayGoalsAgainst: 22, homePossession: 45, awayPossession: 56 }
  },
  {
    id: 'm6', homeTeam: teams[10], awayTeam: teams[11], date: '2026-03-29', time: '16:15',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 40, draw: 35, away: 25 }, confidence: 52, valueSignal: 'none',
    stats: { homeForm: ['D','L','W','D','L'], awayForm: ['L','D','D','W','L'], h2h: { home: 3, draw: 4, away: 3 }, homeGoalsFor: 30, homeGoalsAgainst: 32, awayGoalsFor: 22, awayGoalsAgainst: 38, homePossession: 50, awayPossession: 42 }
  },
  {
    id: 'm7', homeTeam: teams[12], awayTeam: teams[13], date: '2026-03-30', time: '21:00',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 42, draw: 33, away: 25 }, confidence: 58, valueSignal: 'medium',
    stats: { homeForm: ['W','D','W','L','W'], awayForm: ['D','L','D','W','L'], h2h: { home: 5, draw: 3, away: 2 }, homeGoalsFor: 32, homeGoalsAgainst: 25, awayGoalsFor: 25, awayGoalsAgainst: 30, homePossession: 46, awayPossession: 44 }
  },
  {
    id: 'm8', homeTeam: teams[14], awayTeam: teams[0], date: '2026-03-30', time: '18:30',
    league: 'LaLiga', matchday: 30, status: 'upcoming',
    prediction: { home: 18, draw: 22, away: 60 }, confidence: 82, valueSignal: 'low',
    stats: { homeForm: ['L','L','D','L','D'], awayForm: ['W','W','D','W','L'], h2h: { home: 1, draw: 2, away: 8 }, homeGoalsFor: 20, homeGoalsAgainst: 42, awayGoalsFor: 58, awayGoalsAgainst: 22, homePossession: 40, awayPossession: 60 }
  },
];

// Pools
export const pools: Pool[] = [
  {
    id: 'p1', name: 'Quiniela Segura J30', matchday: 30, league: 'LaLiga',
    picks: matches.slice(0, 8).map((m, i) => ({ matchId: m.id, pick: i % 3 === 0 ? '1' : i % 3 === 1 ? 'X' : '2' })),
    expectedHits: 11, risk: 'low', estimatedReturn: 1.8, status: 'active', createdAt: '2026-03-25'
  },
  {
    id: 'p2', name: 'Quiniela Valor J30', matchday: 30, league: 'LaLiga',
    picks: matches.slice(0, 8).map((m, i) => ({ matchId: m.id, pick: i % 2 === 0 ? '2' : '1' })),
    expectedHits: 9, risk: 'high', estimatedReturn: 8.5, status: 'active', createdAt: '2026-03-25'
  },
  {
    id: 'p3', name: 'Quiniela Equilibrada J29', matchday: 29, league: 'LaLiga',
    picks: matches.slice(0, 8).map((m) => ({ matchId: m.id, pick: 'X' })),
    expectedHits: 10, risk: 'medium', estimatedReturn: 3.2, status: 'completed', createdAt: '2026-03-18'
  },
];

// Rankings
export const rankings: RankingUser[] = [
  { id: 'u1', name: 'Carlos Martínez', avatar: '👨‍💻', score: 2450, hits: 142, pools: 38, streak: 7, badge: '🏆' },
  { id: 'u2', name: 'Ana García', avatar: '👩‍🔬', score: 2380, hits: 138, pools: 35, streak: 5, badge: '🥈' },
  { id: 'u3', name: 'Miguel López', avatar: '🧑‍💼', score: 2290, hits: 130, pools: 40, streak: 3, badge: '🥉' },
  { id: 'u4', name: 'Laura Sánchez', avatar: '👩‍🎓', score: 2180, hits: 125, pools: 32, streak: 4 },
  { id: 'u5', name: 'David Ruiz', avatar: '👨‍🏫', score: 2050, hits: 118, pools: 30, streak: 2 },
  { id: 'u6', name: 'Elena Torres', avatar: '👩‍💻', score: 1980, hits: 112, pools: 28, streak: 6 },
  { id: 'u7', name: 'Pablo Moreno', avatar: '🧑‍🔧', score: 1920, hits: 108, pools: 25, streak: 1 },
  { id: 'u8', name: 'Tú', avatar: '⭐', score: 1850, hits: 102, pools: 22, streak: 3 },
  { id: 'u9', name: 'Marta Díaz', avatar: '👩‍🎨', score: 1780, hits: 98, pools: 20, streak: 2 },
  { id: 'u10', name: 'Javier Hernández', avatar: '👨‍🔬', score: 1720, hits: 95, pools: 18, streak: 1 },
];

// League Standings
export const standings: LeagueStanding[] = teams.slice(0, 15).map((team, i) => ({
  position: i + 1,
  team,
  played: 29,
  won: 20 - i,
  drawn: 5 + (i % 3),
  lost: 4 + i,
  goalsFor: 60 - i * 3,
  goalsAgainst: 20 + i * 2,
  points: (20 - i) * 3 + 5 + (i % 3),
  form: ['W', 'D', 'W', 'L', 'W'].slice(0, 5).map((_, j) => ['W', 'D', 'L'][(i + j) % 3]),
}));

// Dashboard metrics
export const dashboardMetrics = {
  matchesAnalyzed: 1247,
  valuePicks: 34,
  poolsGenerated: 156,
  estimatedAccuracy: 73.4,
  activeOpportunities: 12,
};

// Portfolio quinielas
export const portfolioQuinielas = Array.from({ length: 10 }, (_, i) => ({
  id: `pf${i + 1}`,
  name: `Quiniela ${i + 1}`,
  picks: matches.slice(0, 8).map((m, j) => ({ matchId: m.id, pick: (['1', 'X', '2'] as const)[(i + j) % 3] })),
  expectedHits: 8 + (i % 4),
  risk: (['low', 'medium', 'high'] as const)[i % 3],
  coverage: 60 + i * 3,
  diversification: 40 + i * 5,
  consensus: i < 3 ? 'high' : i < 7 ? 'medium' : 'low',
}));
