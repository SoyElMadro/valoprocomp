import type { Agent } from '../types';
import { getAgentProfile, isCompatibleControllerPair, type TacticalSubrole } from './agentProfiles';

export interface RoleCounts {
  Duelista: number;
  Controlador: number;
  Iniciador: number;
  Centinela: number;
}

export interface SubroleCounts {
  'primary-smokes': number;
  'execute-smokes': number;
  'secondary-controller': number;
  'flex-controller': number;
  'wall-controller': number;
  anchor: number;
  'site-anchor': number;
  lurker: number;
  entry: number;
  'space-creator': number;
  'mobility-duelist': number;
  'fast-execute': number;
  'clear-space': number;
  recon: number;
  'flash-initiator': number;
  'blind-support': number;
  'damage-utility': number;
  'trap-sentinel': number;
  'flank-watch': number;
  postplant: number;
  'map-control': number;
  'execute-support': number;
  healing: number;
  support: number;
  'retake-support': number;
  stall: number;
  'crowd-control': number;
  'area-denial': number;
  'anti-push': number;
}

export interface TacticalNeeds {
  hasPrimarySmokes: boolean;
  hasEntry: boolean;
  hasInitiatorUtility: boolean;
  hasSentinelAnchor: boolean;
  hasMapControl: boolean;
  hasPostplant: boolean;
  hasHealing: boolean;
  hasRecon: boolean;
  hasFlash: boolean;
  hasLurker: boolean;
  hasWallController: boolean;
  roleCounts: RoleCounts;
  subroleCounts: SubroleCounts;
  missingRoles: (keyof RoleCounts)[];
  duplicatedRoles: (keyof RoleCounts)[];
  missingTacticalFunctions: TacticalSubrole[];
  duplicatedSubroles: TacticalSubrole[];
}

export interface CompositionAnalysis {
  needs: TacticalNeeds;
  redundantPairs: string[];
  missingPairs: string[];
  teamStrengths: string[];
  teamWeaknesses: string[];
}

const createEmptyRoleCounts = (): RoleCounts => ({
  Duelista: 0,
  Controlador: 0,
  Iniciador: 0,
  Centinela: 0,
});

const createEmptySubroleCounts = (): SubroleCounts => ({
  'primary-smokes': 0,
  'execute-smokes': 0,
  'secondary-controller': 0,
  'flex-controller': 0,
  'wall-controller': 0,
  anchor: 0,
  'site-anchor': 0,
  lurker: 0,
  entry: 0,
  'space-creator': 0,
  'mobility-duelist': 0,
  'fast-execute': 0,
  'clear-space': 0,
  recon: 0,
  'flash-initiator': 0,
  'blind-support': 0,
  'damage-utility': 0,
  'trap-sentinel': 0,
  'flank-watch': 0,
  postplant: 0,
  'map-control': 0,
  'execute-support': 0,
  healing: 0,
  support: 0,
  'retake-support': 0,
  stall: 0,
  'crowd-control': 0,
  'area-denial': 0,
  'anti-push': 0,
});

export const analyzeComposition = (
  selectedAgents: Agent[],
  _mapId?: string
): CompositionAnalysis => {
  const roleCounts = createEmptyRoleCounts();
  const subroleCounts = createEmptySubroleCounts();
  const redundantPairs: string[] = [];
  const missingPairs: string[] = [];

  selectedAgents.forEach(agent => {
    const profile = getAgentProfile(agent.title);
    if (profile) {
      roleCounts[profile.role]++;
      profile.subroles.forEach(subrole => {
        subroleCounts[subrole]++;
      });
    }
  });

  const needs: TacticalNeeds = {
    hasPrimarySmokes: subroleCounts['primary-smokes'] > 0,
    hasEntry: subroleCounts.entry > 0,
    hasInitiatorUtility: subroleCounts.recon > 0 || subroleCounts['flash-initiator'] > 0,
    hasSentinelAnchor: subroleCounts.anchor > 0 || subroleCounts['trap-sentinel'] > 0,
    hasMapControl: subroleCounts['map-control'] > 0 || subroleCounts['wall-controller'] > 0,
    hasPostplant: subroleCounts.postplant > 0,
    hasHealing: subroleCounts.healing > 0,
    hasRecon: subroleCounts.recon > 0,
    hasFlash: subroleCounts['flash-initiator'] > 0,
    hasLurker: subroleCounts.lurker > 0,
    hasWallController: subroleCounts['wall-controller'] > 0,
    roleCounts,
    subroleCounts,
    missingRoles: [],
    duplicatedRoles: [],
    missingTacticalFunctions: [],
    duplicatedSubroles: [],
  };

  if (roleCounts.Duelista === 0) needs.missingRoles.push('Duelista');
  if (roleCounts.Controlador === 0) needs.missingRoles.push('Controlador');
  if (roleCounts.Iniciador === 0) needs.missingRoles.push('Iniciador');
  if (roleCounts.Centinela === 0) needs.missingRoles.push('Centinela');

  if (roleCounts.Duelista > 1) needs.duplicatedRoles.push('Duelista');
  if (roleCounts.Controlador > 1) needs.duplicatedRoles.push('Controlador');
  if (roleCounts.Iniciador > 1) needs.duplicatedRoles.push('Iniciador');
  if (roleCounts.Centinela > 1) needs.duplicatedRoles.push('Centinela');

  const missingFunctions: TacticalSubrole[] = [];
  if (!needs.hasPrimarySmokes) missingFunctions.push('primary-smokes');
  if (!needs.hasEntry) missingFunctions.push('entry');
  if (!needs.hasInitiatorUtility) {
    missingFunctions.push('recon');
    missingFunctions.push('flash-initiator');
  }
  if (!needs.hasFlash) missingFunctions.push('flash-initiator');
  if (!needs.hasSentinelAnchor) missingFunctions.push('anchor');
  if (!needs.hasPostplant) missingFunctions.push('postplant');
  if (!needs.hasMapControl) {
    missingFunctions.push('map-control');
    if (!needs.hasWallController) {
      missingFunctions.push('wall-controller');
    }
  }
  if (!needs.hasLurker) missingFunctions.push('lurker');

  needs.missingTacticalFunctions = [...new Set(missingFunctions)];

  const duplicatedSubs: TacticalSubrole[] = [];
  Object.entries(subroleCounts).forEach(([subrole, count]) => {
    if (count > 1 && subrole !== 'space-creator' && subrole !== 'damage-utility') {
      duplicatedSubs.push(subrole as TacticalSubrole);
    }
  });
  needs.duplicatedSubroles = [...new Set(duplicatedSubs)];

  const controllerAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Controlador'
  );
  if (controllerAgents.length >= 2) {
    const controllerNames = controllerAgents.map(a => a.title);
    for (let i = 0; i < controllerNames.length; i++) {
      for (let j = i + 1; j < controllerNames.length; j++) {
        if (!isCompatibleControllerPair(controllerNames[i], controllerNames[j])) {
          redundantPairs.push(`${controllerNames[i]} + ${controllerNames[j]}`);
        }
      }
    }
  }

  const initiatorAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Iniciador'
  );
  if (initiatorAgents.length >= 1) {
    redundantPairs.push(`Ya hay ${initiatorAgents.length} iniciador(es) en el equipo`);
  }

  const duelistAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Duelista'
  );
  if (duelistAgents.length >= 2) {
    redundantPairs.push(`Ya hay ${duelistAgents.length} duelistas en el equipo`);
  }

  if (!needs.hasPrimarySmokes && !needs.hasEntry) {
    missingPairs.push('primary-smokes OR entry');
  }
  if (!needs.hasSentinelAnchor && selectedAgents.length >= 3) {
    missingPairs.push('sentinel anchor');
  }
  if (!needs.hasInitiatorUtility && selectedAgents.length >= 2) {
    missingPairs.push('initiator utility');
  }

  const teamStrengths: string[] = [];
  if (needs.hasPrimarySmokes) teamStrengths.push('Primary smokes');
  if (needs.hasEntry) teamStrengths.push('Entry fragger');
  if (needs.hasInitiatorUtility) teamStrengths.push('Initiator utility');
  if (needs.hasSentinelAnchor) teamStrengths.push('Sentinel anchor');
  if (needs.hasMapControl) teamStrengths.push('Map control');
  if (needs.hasPostplant) teamStrengths.push('Post-plant capability');
  if (needs.hasHealing) teamStrengths.push('Healing');
  if (roleCounts.Duelista >= 2) teamStrengths.push('Multi-entry potential');
  if (roleCounts.Iniciador >= 1 && roleCounts.Controlador >= 1) {
    teamStrengths.push('Controller + Initiator combo');
  }

  const teamWeaknesses: string[] = [];
  if (needs.missingRoles.length > 0) {
    needs.missingRoles.forEach(role => {
      teamWeaknesses.push(`Missing ${role}`);
    });
  }
  if (needs.duplicatedRoles.length > 0) {
    needs.duplicatedRoles.forEach(role => {
      teamWeaknesses.push(`Multiple ${role}s may cause redundancy`);
    });
  }
  if (needs.missingTacticalFunctions.length > 0) {
    teamWeaknesses.push('Missing tactical functions');
  }
  if (redundantPairs.length > 0) {
    redundantPairs.forEach(pair => {
      teamWeaknesses.push(`Potential redundancy: ${pair}`);
    });
  }

  return {
    needs,
    redundantPairs,
    missingPairs,
    teamStrengths,
    teamWeaknesses,
  };
};

export const getTacticalSuggestion = (
  candidateAgent: Agent,
  analysis: CompositionAnalysis
): string => {
  const profile = getAgentProfile(candidateAgent.title);
  if (!profile) return '';

  const suggestions: string[] = [];
  const { needs } = analysis;

  const fillsMissingRole = needs.missingRoles.includes(profile.role);
  if (fillsMissingRole) {
    suggestions.push(`Fills missing ${profile.role} role`);
  }

  const fillsMissingSubrole = profile.subroles.some(
    sub => needs.missingTacticalFunctions.includes(sub)
  );
  if (fillsMissingSubrole) {
    const filledFunctions = profile.subroles.filter(
      sub => needs.missingTacticalFunctions.includes(sub)
    );
    suggestions.push(`Adds: ${filledFunctions.join(', ')}`);
  }

  if (needs.duplicatedRoles.includes(profile.role)) {
    suggestions.push(`WARNING: Duplicates ${profile.role} role`);
  }

  if (profile.subroles.includes('wall-controller') && needs.hasPrimarySmokes) {
    suggestions.push('Wall controller adds map control without duplicating primary smokes');
  }

  return suggestions.join('. ');
};