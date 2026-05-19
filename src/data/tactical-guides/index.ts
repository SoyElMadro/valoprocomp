export * from './types';
export * from './meta';
export * from './sources';
export * from './agentRoles';
export * from './mapTactics';
export * from './roleGuides';
export * from './agentMapGuides';
export * from './compositionGuides';

import type { AgentName, ActiveMapName, ValorantRole } from './types';
import { mapTactics } from './mapTactics';
import { roleGuides } from './roleGuides';
import { compositionGuides } from './compositionGuides';
import { getAgentMapGuide } from './agentMapGuides';

export function getMapTactics(map: ActiveMapName) {
  return mapTactics.filter((tactic) => tactic.map === map);
}

export function getRoleGuidesForMap(map: ActiveMapName, role?: ValorantRole) {
  return roleGuides.filter((guide) => guide.map === map && (!role || guide.role === role));
}

export function getCompositionGuide(map: ActiveMapName, selectedAgents: AgentName[]) {
  const selected = [...selectedAgents].sort().join('|');
  return compositionGuides.find((guide) => guide.map === map && [...guide.agents].sort().join('|') === selected);
}

export function getTacticalGuidePayload(map: ActiveMapName, selectedAgents: AgentName[]) {
  const agents = selectedAgents.map((agent) => getAgentMapGuide(agent, map));
  const comp = getCompositionGuide(map, selectedAgents);

  return {
    map,
    mapTactics: getMapTactics(map),
    compositionGuide: comp ?? null,
    agentGuides: agents,
    hasFullComposition: selectedAgents.length === 5,
    status: comp?.status ?? (selectedAgents.length === 5 ? 'no-source' : 'partial'),
  };
}
