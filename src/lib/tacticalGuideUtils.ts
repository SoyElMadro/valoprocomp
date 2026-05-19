import type { Agent } from '../types';
import {
  type ActiveMapName,
  type AgentName,
  type TacticStatus,
  type ValorantRole,
  type AgentMapGuide,
  type RoleGuide,
  type SiteTactic,
  type CompositionGuide,
  activeMapNames,
  agentNames,
  agentRoles,
  tacticalDatasetMeta,
  tacticalSources,
  getRoleGuidesForMap,
  getAgentMapGuide,
  getCompositionGuide,
  getMapTactics,
} from '../data/tactical-guides';

const appMapIdToTacticalName: Record<number, ActiveMapName> = {
  1: 'Split',
  2: 'Bind',
  3: 'Haven',
  4: 'Ascent',
  5: 'Icebox',
  6: 'Breeze',
  7: 'Fracture',
  8: 'Pearl',
  9: 'Lotus',
  10: 'Sunset',
  11: 'Abyss',
  12: 'Corrode',
};

const statusPriority: Record<TacticStatus, number> = {
  documented: 4,
  partial: 3,
  'needs-review': 2,
  'no-source': 1,
};

export type TacticalGuidePayload = {
  map: ActiveMapName;
  mapTactics: SiteTactic[];
  attackTactics: SiteTactic[];
  defenseTactics: SiteTactic[];
  compositionGuide: CompositionGuide | null;
  agentGuides: AgentMapGuide[];
  roleGuides: RoleGuide[];
  selectedAgentNames: AgentName[];
  selectedRoles: ValorantRole[];
  roleCounts: Record<ValorantRole, number>;
  sourceRefs: string[];
  hasFullComposition: boolean;
  hasSpecificComposition: boolean;
  hasAnySpecificAgent: boolean;
  hasMapTactics: boolean;
  hasFallbackAdvice: boolean;
  status: TacticStatus;
  patchBaseline: string;
  lastVerifiedAt: string;
  warning: string;
};

export function getAppMapIdToTacticalName(mapId: number): ActiveMapName | null {
  return appMapIdToTacticalName[mapId] ?? null;
}

export function isValidTacticalMap(name: string): name is ActiveMapName {
  return (activeMapNames as readonly string[]).includes(name);
}

export function isValidTacticalAgent(name: string): name is AgentName {
  return (agentNames as readonly string[]).includes(name);
}

export function agentToTacticalName(agent: Agent): AgentName | null {
  const name = agent.title as AgentName;
  return isValidTacticalAgent(name) ? name : null;
}

export function getAgentRole(agent: Agent): ValorantRole | null {
  const tacticalName = agentToTacticalName(agent);
  if (!tacticalName) return null;
  return agentRoles[tacticalName] ?? null;
}

export function isFullComposition(selectedAgents: Agent[]): boolean {
  return selectedAgents.length === 5;
}

export function formatStatusLabel(status: TacticStatus): string {
  const labels: Record<TacticStatus, string> = {
    documented: 'Documented',
    partial: 'Partial',
    'needs-review': 'Needs review',
    'no-source': 'No source',
  };

  return labels[status] ?? status;
}

export function formatConfidenceLabel(confidence?: string): string {
  const labels: Record<string, string> = {
    high: 'High confidence',
    medium: 'Medium confidence',
    low: 'Low confidence',
  };

  return confidence ? labels[confidence] ?? confidence : 'Unknown confidence';
}

export function getStatusBadgeVariant(status: TacticStatus): string {
  const variants: Record<TacticStatus, string> = {
    documented: 'tactical-badge--documented',
    partial: 'tactical-badge--partial',
    'needs-review': 'tactical-badge--needs-review',
    'no-source': 'tactical-badge--no-source',
  };

  return variants[status] ?? '';
}

export function getRoleBadgeClass(role: ValorantRole): string {
  const classes: Record<ValorantRole, string> = {
    Duelist: 'tactical-badge--duelist',
    Initiator: 'tactical-badge--initiator',
    Controller: 'tactical-badge--controller',
    Sentinel: 'tactical-badge--sentinel',
  };

  return classes[role] ?? '';
}

export function getPatchBaseline(): string {
  return tacticalDatasetMeta.patchBaseline;
}

export function getLastVerified(): string {
  return tacticalDatasetMeta.lastVerifiedAt;
}

export function getDatasetWarning(): string {
  return tacticalDatasetMeta.warning;
}

export function getTacticalSourceById(sourceRef: string) {
  return tacticalSources.find((source) => source.id === sourceRef) ?? null;
}

export function resolveTacticalSources(sourceRefs: string[]) {
  const uniqueRefs = Array.from(new Set(sourceRefs));
  return uniqueRefs
    .map((ref) => getTacticalSourceById(ref))
    .filter((source): source is NonNullable<typeof source> => source !== null);
}

export function groupTacticsBySide(tactics: SiteTactic[]) {
  return {
    attack: tactics.filter((tactic) => tactic.side === 'attack'),
    defense: tactics.filter((tactic) => tactic.side === 'defense'),
  };
}

export function groupTacticsBySite(tactics: SiteTactic[]): Record<string, SiteTactic[]> {
  return tactics.reduce<Record<string, SiteTactic[]>>((acc, tactic) => {
    if (!acc[tactic.site]) acc[tactic.site] = [];
    acc[tactic.site].push(tactic);
    return acc;
  }, {});
}

export function getRoleCounts(agentList: AgentName[]): Record<ValorantRole, number> {
  return agentList.reduce<Record<ValorantRole, number>>(
    (acc, agentName) => {
      const role = agentRoles[agentName];
      acc[role] += 1;
      return acc;
    },
    {
      Duelist: 0,
      Initiator: 0,
      Controller: 0,
      Sentinel: 0,
    },
  );
}

export function getSelectedRoles(agentList: AgentName[]): ValorantRole[] {
  return Array.from(new Set(agentList.map((agentName) => agentRoles[agentName])));
}

export function getHighestStatus(statuses: TacticStatus[]): TacticStatus {
  if (statuses.length === 0) return 'no-source';

  return statuses.reduce<TacticStatus>((best, current) => {
    return statusPriority[current] > statusPriority[best] ? current : best;
  }, 'no-source');
}

export function collectSourceRefs(payloadParts: {
  mapTactics?: SiteTactic[];
  compositionGuide?: CompositionGuide | null;
  agentGuides?: AgentMapGuide[];
  roleGuides?: RoleGuide[];
}): string[] {
  const refs = new Set<string>();

  payloadParts.mapTactics?.forEach((tactic) => {
    tactic.defaultPlan.sourceRefs?.forEach((ref) => refs.add(ref));
    tactic.patchEffects?.forEach((effect) => effect.sourceRefs?.forEach((ref) => refs.add(ref)));
  });

  payloadParts.compositionGuide?.sourceRefs?.forEach((ref) => refs.add(ref));

  payloadParts.agentGuides?.forEach((guide) => {
    guide.sourceRefs?.forEach((ref) => refs.add(ref));
    guide.sites?.forEach((site) => site.sourceRefs?.forEach((ref) => refs.add(ref)));
  });

  payloadParts.roleGuides?.forEach((guide) => {
    guide.sourceRefs?.forEach((ref) => refs.add(ref));
  });

  return Array.from(refs);
}

export function buildCompositionSummary(roleCounts: Record<ValorantRole, number>): string {
  const parts = Object.entries(roleCounts)
    .filter(([, count]) => count > 0)
    .map(([role, count]) => `${count} ${role}${count > 1 ? 's' : ''}`);

  return parts.length > 0 ? parts.join(' / ') : 'No agents selected';
}

export function buildFallbackCompositionAdvice(roleCounts: Record<ValorantRole, number>): string[] {
  const advice: string[] = [];

  if (roleCounts.Controller === 0) {
    advice.push('La composición no tiene Controller: los executes y retakes van a depender mucho más de picks rápidos y utilidad de iniciador.');
  }

  if (roleCounts.Initiator === 0) {
    advice.push('La composición no tiene Initiator: evitá entrar a ciegas y jugá más lento para forzar información.');
  }

  if (roleCounts.Sentinel === 0) {
    advice.push('La composición no tiene Sentinel: alguien debe asumir flank watch y control pasivo de mapa.');
  }

  if (roleCounts.Duelist === 0) {
    advice.push('La composición no tiene Duelist: el entry debe ser coordinado con utilidad, trades y timings más lentos.');
  }

  if (roleCounts.Controller >= 2) {
    advice.push('Doble Controller permite jugar defaults lentas, negar visión en capas y guardar utilidad para anti-retake.');
  }

  if (roleCounts.Duelist >= 2) {
    advice.push('Doble Duelist exige timings de trade claros: no sirve si cada duelista pelea aislado.');
  }

  return advice;
}

export function buildTacticalGuidePayload(mapId: number | null, selectedAgents: Agent[]): TacticalGuidePayload | null {
  if (!mapId) return null;

  const tacticalMap = getAppMapIdToTacticalName(mapId);
  if (!tacticalMap) return null;

  const selectedAgentNames = selectedAgents
    .map(agentToTacticalName)
    .filter((name): name is AgentName => name !== null);

  const mapTactics = getMapTactics(tacticalMap);
  const { attack: attackTactics, defense: defenseTactics } = groupTacticsBySide(mapTactics);

  const compositionGuide = selectedAgentNames.length === 5
    ? getCompositionGuide(tacticalMap, selectedAgentNames)
    : null;

  const agentGuides = selectedAgentNames.map((name) => getAgentMapGuide(name, tacticalMap));
  const roleGuides = getRoleGuidesForMap(tacticalMap);
  const roleCounts = getRoleCounts(selectedAgentNames);
  const selectedRoles = getSelectedRoles(selectedAgentNames);

  const hasSpecificComposition = compositionGuide !== undefined && compositionGuide !== null;
  const hasAnySpecificAgent = agentGuides.some((guide) => guide.status !== 'no-source');
  const hasMapTactics = mapTactics.length > 0;
  const hasFallbackAdvice = agentGuides.some((guide) => guide.status === 'no-source') || !hasSpecificComposition;

  const statuses: TacticStatus[] = [
    ...mapTactics.map((tactic) => tactic.defaultPlan.status),
    ...agentGuides.map((guide) => guide.status),
    ...roleGuides.map((guide) => guide.status),
  ];

  if (compositionGuide?.status) statuses.push(compositionGuide.status);

  const status = hasSpecificComposition
    ? compositionGuide.status
    : selectedAgentNames.length === 5
      ? getHighestStatus(statuses)
      : 'partial';

  const sourceRefs = collectSourceRefs({
    mapTactics,
    compositionGuide,
    agentGuides,
    roleGuides,
  });

  return {
    map: tacticalMap,
    mapTactics,
    attackTactics,
    defenseTactics,
    compositionGuide: compositionGuide ?? null,
    agentGuides,
    roleGuides,
    selectedAgentNames,
    selectedRoles,
    roleCounts,
    sourceRefs,
    hasFullComposition: selectedAgents.length === 5,
    hasSpecificComposition,
    hasAnySpecificAgent,
    hasMapTactics,
    hasFallbackAdvice,
    status,
    patchBaseline: getPatchBaseline(),
    lastVerifiedAt: getLastVerified(),
    warning: getDatasetWarning(),
  };
}
