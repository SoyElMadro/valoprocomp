export type AgentRole = 'Duelista' | 'Controlador' | 'Iniciador' | 'Centinela';

export interface Agent {
  thumbnailUrl: string;
  title: string;
  role: AgentRole;
}

export interface Composition {
  agents: Agent[];
  pickRate: string;
  totalSidesPlayed: number;
  winRate: string;
  wins: string;
  timesPlayed: number;
}

export interface MapData {
  id: number;
  name: string;
  image?: string;
}

export interface RecommendedAgent {
  agent: Agent;
  composition: Composition;
  matchPercentage: number;
  missingAgents: Agent[];
}

export type CompositionTag = 'Meta' | 'Confiable' | 'Fuerte pero situacional' | 'Riesgosa por poca muestra' | 'Popular pero débil' | 'Débil';

export type SynergyTag = 'Mejor sinergia' | 'Pick meta' | 'Pick fuerte' | 'Pick situacional' | 'Pick recomendable' | 'Winrate inflado por poca muestra' | 'Dato limitado' | 'Prometedor, poca muestra';

export interface SynergyRecommendation {
  agent: Agent;
  synergyScore: number;
  adjustedWinRate: number;
  timesTogether: number;
  appearanceRate: number;
  sampleScore: number;
  tag: SynergyTag;
  explanation: string;
  isPartialMatch?: boolean;
}

export interface ScoredComposition {
  composition: Composition;
  matchPercentage: number;
  matchingAgents: Agent[];
  missingAgents: Agent[];
  score: number;
  adjustedWinRate: number;
  sampleScore: number;
  tag: CompositionTag;
}