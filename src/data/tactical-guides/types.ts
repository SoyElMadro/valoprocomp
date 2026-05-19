export type ValorantRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel';
export type TacticalRole = 'entry' | 'space-maker' | 'flash-initiator' | 'recon-initiator' | 'primary-controller' | 'secondary-controller' | 'anchor-sentinel' | 'info-sentinel' | 'flex';
export type Side = 'attack' | 'defense';
export type Phase = 'default' | 'execute' | 'postPlant' | 'retake' | 'antiRush' | 'midRound';
export type Confidence = 'high' | 'medium' | 'low';
export type TacticStatus = 'documented' | 'partial' | 'needs-review' | 'no-source';
export type SourceKind = 'official-patch' | 'official-map' | 'official-agent' | 'editorial-guide' | 'video-snippet' | 'video-transcript' | 'pro-example' | 'stats-secondary';

export interface SourceRef {
  id: string;
  title: string;
  kind: SourceKind;
  publisher: string;
  language: 'en' | 'es';
  url?: string;
  publishedAt?: string;
  accessedAt: string;
  timestamp?: string | null;
  note?: string;
}

export interface PatchEffect {
  patch: string;
  scope: 'map' | 'agent' | 'weapon' | 'system';
  summary: string;
  tacticalImpact: string;
  sourceRefs: string[];
}

export interface UtilityStep {
  by: TacticalRole | ValorantRole | string;
  action: string;
  targetZone: string;
  timing: string;
  purpose: string;
  sourceRefs?: string[];
}

export interface PhasePlan {
  title: string;
  summary: string;
  steps: UtilityStep[];
  keyPositions: string[];
  winConditions: string[];
  failConditions: string[];
  counters: string[];
  status: TacticStatus;
  confidence: Confidence;
  sourceRefs: string[];
}

export interface SiteTactic {
  map: ActiveMapName;
  site: string;
  side: Side;
  defaultPlan: PhasePlan;
  altPlans?: PhasePlan[];
  patchEffects?: PatchEffect[];
}

export interface RoleGuide {
  role: ValorantRole;
  tacticalRole: TacticalRole;
  map: ActiveMapName;
  attackDefaults: string[];
  defenseDefaults: string[];
  retakeRules: string[];
  postPlantRules: string[];
  commonMistakes: string[];
  sourceRefs: string[];
  status: TacticStatus;
  confidence: Confidence;
}

export interface AgentSiteGuide {
  site: string;
  roleInComp: string;
  attackPlan: string[];
  defensePlan: string[];
  combos: string[];
  postPlantPriorities: string[];
  retakePriorities: string[];
  counters: string[];
  status: TacticStatus;
  confidence: Confidence;
  sourceRefs: string[];
}

export interface AgentMapGuide {
  agent: AgentName;
  role: ValorantRole;
  map: ActiveMapName;
  overview: string;
  bestWith: AgentName[];
  avoidWhen?: string[];
  sites: AgentSiteGuide[];
  fallbackRoleGuideKey: string;
  status: TacticStatus;
  confidence: Confidence;
  sourceRefs: string[];
}

export interface CompositionGuide {
  id: string;
  map: ActiveMapName;
  agents: AgentName[];
  title: string;
  style: string;
  attackIdentity: string[];
  defenseIdentity: string[];
  agentJobs: Record<string, string[]>;
  strongSites: string[];
  weakPoints: string[];
  whenToPick: string[];
  status: TacticStatus;
  confidence: Confidence;
  sourceRefs: string[];
}

export const activeMapNames = ['Ascent', 'Breeze', 'Fracture', 'Haven', 'Lotus', 'Pearl', 'Split', 'Bind', 'Icebox', 'Sunset', 'Abyss', 'Corrode'] as const;
export type ActiveMapName = typeof activeMapNames[number];

export const agentNames = [
  'Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 'KAY/O', 'Killjoy', 'Miks', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Tejo', 'Veto', 'Viper', 'Vyse', 'Waylay', 'Yoru',
] as const;
export type AgentName = typeof agentNames[number];

export interface TacticalDatasetMeta {
  patchBaseline: string;
  lastVerifiedAt: string;
  activeMapPool: ActiveMapName[];
  warning: string;
}
