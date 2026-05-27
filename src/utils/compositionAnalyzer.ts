import type { Agent } from '../types';
import { getAgentProfile, getControllerSubrole, type TacticalSubrole } from './agentProfiles';

export interface RoleCounts {
  Duelista: number;
  Controlador: number;
  Iniciador: number;
  Centinela: number;
}

export interface SubroleCounts {
  'smoke-block': number;
  'area-denial-smoke': number;
  'wall-place': number;
  'sustained-control': number;
  'flash-initiator': number;
  'recon-initiator': number;
  'damage-initiator': number;
  'anchor-sentinel': number;
  'trap-sentinel': number;
  'support-sentinel': number;
  'entry-duelist': number;
  'mobility-duelist': number;
  'lurk-duelist': number;
  postplant: number;
  healing: number;
  retake: number;
  'area-denial': number;
  'crowd-control': number;
}

export interface TacticalNeeds {
  hasSmokeBlock: boolean;
  hasWallPlace: boolean;
  hasEntry: boolean;
  hasInitiatorUtility: boolean;
  hasSentinelAnchor: boolean;
  hasMapControl: boolean;
  hasPostplant: boolean;
  hasHealing: boolean;
  hasRecon: boolean;
  hasFlash: boolean;
  hasLurker: boolean;
  roleCounts: RoleCounts;
  subroleCounts: SubroleCounts;
  missingRoles: (keyof RoleCounts)[];
  duplicatedRoles: (keyof RoleCounts)[];
  missingTacticalFunctions: TacticalSubrole[];
  duplicatedSubroles: TacticalSubrole[];
  controllerSubroleTypes: ('smokeBlock' | 'wallPlace')[];
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
  'smoke-block': 0,
  'area-denial-smoke': 0,
  'wall-place': 0,
  'sustained-control': 0,
  'flash-initiator': 0,
  'recon-initiator': 0,
  'damage-initiator': 0,
  'anchor-sentinel': 0,
  'trap-sentinel': 0,
  'support-sentinel': 0,
  'entry-duelist': 0,
  'mobility-duelist': 0,
  'lurk-duelist': 0,
  postplant: 0,
  healing: 0,
  retake: 0,
  'area-denial': 0,
  'crowd-control': 0,
});

export const analyzeComposition = (
  selectedAgents: Agent[],
  _mapId?: string
): CompositionAnalysis => {
  const roleCounts = createEmptyRoleCounts();
  const subroleCounts = createEmptySubroleCounts();
  const redundantPairs: string[] = [];
  const missingPairs: string[] = [];
  const controllerSubroleTypes: ('smokeBlock' | 'wallPlace')[] = [];

  selectedAgents.forEach(agent => {
    const profile = getAgentProfile(agent.title);
    if (profile) {
      roleCounts[profile.role]++;
      profile.subroles.forEach(subrole => {
        if (subrole in subroleCounts) {
          subroleCounts[subrole as keyof SubroleCounts]++;
        }
      });

      if (profile.role === 'Controlador') {
        const subrole = getControllerSubrole(agent.title);
        if (subrole && !controllerSubroleTypes.includes(subrole)) {
          controllerSubroleTypes.push(subrole);
        }
      }
    }
  });

  const needs: TacticalNeeds = {
    hasSmokeBlock: subroleCounts['smoke-block'] > 0,
    hasWallPlace: subroleCounts['wall-place'] > 0,
    hasEntry: subroleCounts['entry-duelist'] > 0,
    hasInitiatorUtility: subroleCounts['recon-initiator'] > 0 || subroleCounts['flash-initiator'] > 0,
    hasSentinelAnchor: subroleCounts['anchor-sentinel'] > 0 || subroleCounts['trap-sentinel'] > 0,
    hasMapControl: subroleCounts['wall-place'] > 0 || subroleCounts['sustained-control'] > 0,
    hasPostplant: subroleCounts.postplant > 0,
    hasHealing: subroleCounts.healing > 0,
    hasRecon: subroleCounts['recon-initiator'] > 0,
    hasFlash: subroleCounts['flash-initiator'] > 0,
    hasLurker: subroleCounts['lurk-duelist'] > 0,
    roleCounts,
    subroleCounts,
    missingRoles: [],
    duplicatedRoles: [],
    missingTacticalFunctions: [],
    duplicatedSubroles: [],
    controllerSubroleTypes,
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
  if (!needs.hasSmokeBlock && !needs.hasEntry) missingFunctions.push('smoke-block');
  if (!needs.hasWallPlace && roleCounts.Controlador >= 2) missingFunctions.push('wall-place');
  if (!needs.hasEntry) missingFunctions.push('entry-duelist');
  if (!needs.hasInitiatorUtility) {
    missingFunctions.push('recon-initiator');
    missingFunctions.push('flash-initiator');
  }
  if (!needs.hasFlash) missingFunctions.push('flash-initiator');
  if (!needs.hasSentinelAnchor) missingFunctions.push('anchor-sentinel');
  if (!needs.hasPostplant) missingFunctions.push('postplant');
  if (!needs.hasLurker && roleCounts.Controlador >= 1) missingFunctions.push('lurk-duelist');

  needs.missingTacticalFunctions = [...new Set(missingFunctions)];

  const duplicatedSubs: TacticalSubrole[] = [];
  Object.entries(subroleCounts).forEach(([subrole, count]) => {
    if (count > 1 && subrole !== 'lurk-duelist' && subrole !== 'mobility-duelist' && subrole !== 'crowd-control') {
      duplicatedSubs.push(subrole as TacticalSubrole);
    }
  });
  needs.duplicatedSubroles = [...new Set(duplicatedSubs)];

  if (controllerSubroleTypes.length >= 2) {
    const hasSmokeBlock = controllerSubroleTypes.includes('smokeBlock');
    const hasWallPlace = controllerSubroleTypes.includes('wallPlace');

    if (hasSmokeBlock && !hasWallPlace) {
      redundantPairs.push('Dos controladores de humo - falta wall-control');
    }
  }

  const controllerAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Controlador'
  );
  if (controllerAgents.length >= 2) {
    const controllerSubroles = controllerAgents
      .map(a => getControllerSubrole(a.title))
      .filter(Boolean) as ('smokeBlock' | 'wallPlace')[];

    const smokeBlockCount = controllerSubroles.filter(s => s === 'smokeBlock').length;
    const wallPlaceCount = controllerSubroles.filter(s => s === 'wallPlace').length;

    if (smokeBlockCount >= 2) {
      redundantPairs.push('Dos controladores de humo (smoke-block) - deberían互补arse con wall-place');
    }
    if (wallPlaceCount >= 2) {
      redundantPairs.push('Dos controladores de pared (wall-place) - deberían complementarse con smoke-block');
    }
  }

  const initiatorAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Iniciador'
  );
  if (initiatorAgents.length >= 2) {
    redundantPairs.push(`Ya hay ${initiatorAgents.length} iniciadores en el equipo`);
  }

  const duelistAgents = selectedAgents.filter(
    a => getAgentProfile(a.title)?.role === 'Duelista'
  );
  if (duelistAgents.length >= 2) {
    redundantPairs.push(`Ya hay ${duelistAgents.length} duelistas en el equipo`);
  }

  if (!needs.hasSmokeBlock && !needs.hasEntry) {
    missingPairs.push('smoke-block o entry');
  }
  if (!needs.hasWallPlace && controllerSubroleTypes.length >= 1 && controllerSubroleTypes.every(s => s === 'smokeBlock')) {
    missingPairs.push('wall-place (complemento para smokes)');
  }
  if (!needs.hasSentinelAnchor && selectedAgents.length >= 3) {
    missingPairs.push('anchor o trap sentinel');
  }
  if (!needs.hasInitiatorUtility && selectedAgents.length >= 2) {
    missingPairs.push('utilidad de iniciador (flash o recon)');
  }

  const teamStrengths: string[] = [];
  if (needs.hasSmokeBlock) teamStrengths.push('Smoke-block para bloquear lineas');
  if (needs.hasWallPlace) teamStrengths.push('Wall-place para control persistente');
  if (needs.hasEntry) teamStrengths.push('Entry fragger');
  if (needs.hasInitiatorUtility) teamStrengths.push('Utilidad de iniciador');
  if (needs.hasSentinelAnchor) teamStrengths.push('Sentinel anchor');
  if (needs.hasMapControl) teamStrengths.push('Control de mapa');
  if (needs.hasPostplant) teamStrengths.push('Post-plant capability');
  if (needs.hasHealing) teamStrengths.push('Healing');
  if (roleCounts.Duelista >= 2) teamStrengths.push('Multi-entry potential');
  if (controllerSubroleTypes.includes('smokeBlock') && controllerSubroleTypes.includes('wallPlace')) {
    teamStrengths.push('Composicion de controladores balanceada');
  }

  const teamWeaknesses: string[] = [];
  if (needs.missingRoles.length > 0) {
    needs.missingRoles.forEach(role => {
      teamWeaknesses.push(`Falta ${role}`);
    });
  }
  if (needs.duplicatedRoles.length > 0) {
    needs.duplicatedRoles.forEach(role => {
      teamWeaknesses.push(`Demasiados ${role}s`);
    });
  }
  if (redundantPairs.length > 0) {
    redundantPairs.forEach(pair => {
      teamWeaknesses.push(`Redundancia: ${pair}`);
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
    suggestions.push(`Llena el rol de ${profile.role} que falta`);
  }

  if (profile.role === 'Controlador') {
    const candidateSubrole = getControllerSubrole(candidateAgent.title);

    if (candidateSubrole === 'wallPlace' && needs.hasSmokeBlock && !needs.hasWallPlace) {
      suggestions.push('Añade wall-control para complementar los smokes existentes');
    }

    if (candidateSubrole === 'smokeBlock' && needs.hasWallPlace && !needs.hasSmokeBlock) {
      suggestions.push('Añade smoke-block para complementar el wall-control existente');
    }

    if (candidateSubrole === 'smokeBlock' && needs.hasSmokeBlock && !needs.hasWallPlace) {
      suggestions.push('REDSMOKE: Ya tienes smoke-block, necesitas wall-place, no otro smoke-block');
    }

    if (candidateSubrole === 'wallPlace' && needs.hasWallPlace && !needs.hasSmokeBlock) {
      suggestions.push('REDSMOKE: Ya tienes wall-place, necesitas smoke-block, no otro wall-place');
    }
  }

  const fillsMissingSubrole = profile.subroles.some(
    sub => needs.missingTacticalFunctions.includes(sub)
  );
  if (fillsMissingSubrole) {
    const filledFunctions = profile.subroles.filter(
      sub => needs.missingTacticalFunctions.includes(sub)
    );
    suggestions.push(`Añade: ${filledFunctions.join(', ')}`);
  }

  if (needs.duplicatedRoles.includes(profile.role)) {
    suggestions.push(`WARNING: Duplica el rol de ${profile.role}`);
  }

  return suggestions.join('. ');
};