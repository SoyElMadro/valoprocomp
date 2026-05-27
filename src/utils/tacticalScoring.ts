import type { Agent, Composition } from '../types';
import { getAgentProfile, isComplementaryControllerPair, isRedundantControllerPair, getControllerSubrole } from './agentProfiles';
import { analyzeComposition, type CompositionAnalysis } from './compositionAnalyzer';
import type { RolePatternAnalysis } from './rolePatternAnalyzer';
import {
  calculateMapFitScore,
  getCompositionContextScore,
  getFullAgentProfile,
  isDirectReplacement,
  type ActiveMapName,
} from './mapAgentIntelligence';

export interface CandidateScore {
  agent: Agent;
  proDataScore: number;
  compositionFitScore: number;
  roleNeedScore: number;
  redundancyPenalty: number;
  finalScore: number;
  reasons: string[];
  pros: string[];
  cons: string[];
  confidence: 'high' | 'medium' | 'low';
  matchType: 'exact' | 'partial';
  functionalDiversity: number;
  mapFitScore: number;
  compositionContextScore: number;
  mapBoost: number;
  proMetaScore: number;
  recommendationStrength: 'must-pick' | 'highly-recommended' | 'recommended' | 'situational' | 'risky';
}

export const calculateProDataScore = (
  _agent: Agent,
  matchingComps: Composition[]
): number => {
  if (matchingComps.length === 0) return 0;

  const totalUses = matchingComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
  if (totalUses === 0) return 0;

  const weightedWinrate = matchingComps.reduce((sum, comp) => {
    return sum + parseFloat(comp.winRate) * comp.timesPlayed;
  }, 0) / totalUses;

  const avgPickRate = matchingComps.reduce((sum, comp) => {
    return sum + parseFloat(comp.pickRate);
  }, 0) / matchingComps.length;

  const confidence = Math.min(Math.log10(totalUses + 1) / Math.log10(101), 1);
  const adjustedWinRate = 50 + (weightedWinrate - 50) * confidence;

  const normalizedWinrate = Math.min(adjustedWinRate / 100, 1) * 40;
  const normalizedPickRate = Math.min(avgPickRate / 10, 1) * 30;
  const confidenceScore = confidence * 30;

  return normalizedWinrate + normalizedPickRate + confidenceScore;
};

export const calculateCompositionFitScore = (
  candidate: Agent,
  selectedAgents: Agent[],
  _matchingComps?: Composition[]
): number => {
  const candidateProfile = getAgentProfile(candidate.title);
  const candidateFullProfile = getFullAgentProfile(candidate.title);
  if (!candidateProfile || !candidateFullProfile) return 0;

  const selectedProfiles = selectedAgents
    .map(a => getAgentProfile(a.title))
    .filter(Boolean);

  if (selectedProfiles.length === 0) return 50;

  let synergyPoints = 0;
  let maxPossiblePoints = 0;

  selectedProfiles.forEach(profile => {
    if (!profile) return;
    maxPossiblePoints += 10;

    if (candidateProfile.synergiesWith.includes(profile.agentName)) {
      synergyPoints += 8;
    }

    const selectedNameLower = profile.agentName.toLowerCase();
    const isSynergistByFullData = candidateFullProfile.bestWith.some(
      n => n.toLowerCase() === selectedNameLower
    );
    if (isSynergistByFullData) {
      synergyPoints += 8;
    }

    const subroleOverlap = candidateProfile.subroles.filter(
      sub => profile.subroles.includes(sub)
    ).length;
    if (subroleOverlap > 0 && subroleOverlap < 3) {
      synergyPoints += 2;
    }

    const isReplacement = isDirectReplacement(profile.agentName, candidate.title);
    if (isReplacement) {
      synergyPoints -= 10;
    }

    if (candidateProfile.role === 'Controlador' && profile.role === 'Controlador') {
      if (isComplementaryControllerPair(candidate.title, profile.agentName)) {
        synergyPoints += 10;
      } else if (isRedundantControllerPair(candidate.title, profile.agentName)) {
        synergyPoints -= 20;
      }
    }
  });

  const synergyScore = (synergyPoints / maxPossiblePoints) * 100;
  return Math.max(0, Math.min(100, 50 + synergyScore * 0.5));
};

export const calculateRoleNeedScore = (
  candidate: Agent,
  analysis: CompositionAnalysis
): number => {
  const profile = getAgentProfile(candidate.title);
  if (!profile) return 50;

  const { needs } = analysis;
  let score = 50;

  if (needs.missingRoles.includes(profile.role)) {
    score += 30;
  }

  if (profile.role === 'Controlador') {
    const candidateSubrole = getControllerSubrole(candidate.title);

    if (candidateSubrole === 'wallPlace' && needs.hasSmokeBlock && !needs.hasWallPlace) {
      score += 40;
    }

    if (candidateSubrole === 'smokeBlock' && needs.hasWallPlace && !needs.hasSmokeBlock) {
      score += 40;
    }

    if (candidateSubrole === 'smokeBlock' && needs.hasSmokeBlock && !needs.hasWallPlace) {
      score -= 35;
    }

    if (candidateSubrole === 'wallPlace' && needs.hasWallPlace && !needs.hasSmokeBlock) {
      score -= 35;
    }
  }

  const duplicatedRole = needs.duplicatedRoles.includes(profile.role);
  if (duplicatedRole) {
    score -= 20;
  }

  const fillsMissingSubrole = profile.subroles.some(
    sub => needs.missingTacticalFunctions.includes(sub)
  );
  if (fillsMissingSubrole) {
    score += 15;
    if (profile.subroles.includes('anchor-sentinel')) {
      score += 10;
    }
  }

  if (profile.subroles.includes('flash-initiator') && !needs.hasFlash) {
    score += 15;
  }

  if (profile.subroles.includes('entry-duelist') && !needs.hasEntry) {
    score += 15;
  }

  return Math.max(0, Math.min(100, score));
};

export const calculateRedundancyPenalty = (
  candidate: Agent,
  selectedAgents: Agent[],
  analysis: CompositionAnalysis
): number => {
  const profile = getAgentProfile(candidate.title);
  const fullProfile = getFullAgentProfile(candidate.title);
  if (!profile) return 0;

  let penalty = 0;
  const { needs } = analysis;

  if (profile.role === 'Controlador') {
    const candidateSubrole = getControllerSubrole(candidate.title);
    const { controllerSubroleTypes } = needs;

    if (candidateSubrole === 'smokeBlock' && controllerSubroleTypes.includes('smokeBlock')) {
      if (!controllerSubroleTypes.includes('wallPlace')) {
        penalty += 45;
      }
    }

    if (candidateSubrole === 'wallPlace' && controllerSubroleTypes.includes('wallPlace')) {
      if (!controllerSubroleTypes.includes('smokeBlock')) {
        penalty += 45;
      }
    }

    if (candidateSubrole === 'smokeBlock' && controllerSubroleTypes.includes('wallPlace')) {
      penalty -= 20;
    }

    if (candidateSubrole === 'wallPlace' && controllerSubroleTypes.includes('smokeBlock')) {
      penalty -= 20;
    }
  }

  if (fullProfile) {
    const selectedNames = selectedAgents.map(a => a.title);
    const directReplacementUsed = selectedNames.some(name =>
      isDirectReplacement(candidate.title, name)
    );
    if (directReplacementUsed) {
      penalty += 35;
    }
  }

  if (profile.role === 'Iniciador' && needs.subroleCounts['recon-initiator'] >= 1 && needs.subroleCounts['flash-initiator'] >= 1) {
    penalty += 30;
  }

  if (profile.role === 'Duelista' && needs.roleCounts.Duelista >= 2) {
    penalty += 25;
  }

  const selectedProfiles = selectedAgents
    .map(a => getAgentProfile(a.title))
    .filter(Boolean);

  selectedProfiles.forEach(selectedProfile => {
    if (!selectedProfile) return;

    if (profile.role === 'Controlador' && selectedProfile.role === 'Controlador') {
      if (isRedundantControllerPair(candidate.title, selectedProfile.agentName)) {
        penalty += 35;
      }
    }

    const overlappingSubroles = profile.subroles.filter(
      sub => selectedProfile.subroles.includes(sub) &&
             sub !== 'lurk-duelist' &&
             sub !== 'mobility-duelist' &&
             sub !== 'crowd-control'
    );

    if (overlappingSubroles.length >= 2) {
      penalty += overlappingSubroles.length * 10;
    }
  });

  return penalty;
};

export const calculateFunctionalDiversity = (
  candidate: Agent,
  selectedAgents: Agent[]
): number => {
  const profile = getAgentProfile(candidate.title);
  const fullProfile = getFullAgentProfile(candidate.title);
  if (!profile || !fullProfile) return 0;

  const selectedFullProfiles = selectedAgents
    .map(a => getFullAgentProfile(a.title))
    .filter(Boolean);

  const selectedProfiles = selectedAgents
    .map(a => getAgentProfile(a.title))
    .filter(Boolean);

  const uniqueSubroles = profile.subroles.filter(
    sub => !selectedProfiles.some(p => p?.subroles.includes(sub))
  );

  const uniqueUtility = fullProfile.utility.filter(
    u => !selectedFullProfiles.some(p => p?.utility.includes(u))
  );

  const subroleScore = profile.subroles.length > 0
    ? (uniqueSubroles.length / profile.subroles.length) * 100
    : 50;

  const utilityScore = fullProfile.utility.length > 0
    ? (uniqueUtility.length / fullProfile.utility.length) * 100
    : 50;

  return subroleScore * 0.4 + utilityScore * 0.6;
};

export const calculateProMetaScore = (candidate: Agent): number => {
  const fullProfile = getFullAgentProfile(candidate.title);
  if (!fullProfile) return 50;

  const pickRateScore = Math.min(fullProfile.proPickRate / 20, 1) * 50;
  const winRateScore = Math.min(Math.max(fullProfile.proWinRate - 45, 0) / 10, 1) * 50;

  return pickRateScore + winRateScore;
};

export const calculateCandidateScore = (
  candidate: Agent,
  selectedAgents: Agent[],
  matchingComps: Composition[],
  mapId?: string,
  analysis?: CompositionAnalysis,
  isPartialMatch: boolean = false,
  _patternAnalysis?: RolePatternAnalysis
): CandidateScore => {
  const compositionAnalysis = analysis || analyzeComposition(selectedAgents);
  const fullProfile = getFullAgentProfile(candidate.title);

  const proDataScore = calculateProDataScore(candidate, matchingComps);
  const compositionFitScore = calculateCompositionFitScore(candidate, selectedAgents, matchingComps);
  const roleNeedScore = calculateRoleNeedScore(candidate, compositionAnalysis);
  const redundancyPenalty = calculateRedundancyPenalty(candidate, selectedAgents, compositionAnalysis);
  const functionalDiversity = calculateFunctionalDiversity(candidate, selectedAgents);
  const proMetaScore = calculateProMetaScore(candidate);

  const mapData = mapId ? calculateMapFitScore(candidate, mapId as ActiveMapName, selectedAgents) : { score: 50, reasons: [], boost: 0 };
  const compContext = mapId ? getCompositionContextScore(candidate, selectedAgents, mapId as ActiveMapName) : { score: 50, context: '' };
  const mapBoost = mapData.boost;

  const WEIGHTS = {
    proData: 0.25,
    compositionFit: 0.15,
    roleNeed: 0.20,
    mapFit: 0.20,
    diversity: 0.10,
    proMeta: 0.10,
  };

  let finalScore =
    proDataScore * WEIGHTS.proData +
    compositionFitScore * WEIGHTS.compositionFit +
    roleNeedScore * WEIGHTS.roleNeed +
    mapData.score * WEIGHTS.mapFit +
    functionalDiversity * WEIGHTS.diversity +
    proMetaScore * WEIGHTS.proMeta -
    redundancyPenalty;

  if (mapBoost > 0) {
    finalScore += mapBoost * 0.15;
  }

  if (mapBoost < 0) {
    finalScore += mapBoost * 0.20;
  }

  if (isPartialMatch) {
    const totalUses = matchingComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
    if (totalUses < 30) {
      finalScore = finalScore * 0.5 + roleNeedScore * 0.5;
    } else if (totalUses < 60) {
      finalScore = finalScore * 0.65 + roleNeedScore * 0.35;
    }
  }

  const profile = getAgentProfile(candidate.title);
  const reasons: string[] = [];
  const pros: string[] = [];
  const cons: string[] = [];

  if (profile) {
    if (compositionAnalysis.needs.missingRoles.includes(profile.role)) {
      reasons.push(`Llena el rol de ${profile.role} que falta`);
      pros.push(`Añade el ${profile.role} necesario`);
    }

    if (profile.role === 'Controlador') {
      const candidateSubrole = getControllerSubrole(candidate.title);

      if (candidateSubrole === 'wallPlace' && compositionAnalysis.needs.hasSmokeBlock && !compositionAnalysis.needs.hasWallPlace) {
        reasons.push('Añade wall-control para complementar smokes existentes');
        pros.push('Perfecto complemento para tu controlador de smokes');
      }

      if (candidateSubrole === 'smokeBlock' && compositionAnalysis.needs.hasWallPlace && !compositionAnalysis.needs.hasSmokeBlock) {
        reasons.push('Añade smoke-block para complementar wall-control existente');
        pros.push('Perfecto complemento para tu controlador de pared');
      }

      if ((candidateSubrole === 'smokeBlock' && compositionAnalysis.needs.hasSmokeBlock && !compositionAnalysis.needs.hasWallPlace) ||
          (candidateSubrole === 'wallPlace' && compositionAnalysis.needs.hasWallPlace && !compositionAnalysis.needs.hasSmokeBlock)) {
        reasons.push('REDUNDANTE: No completa lo que falta');
        cons.push('Este controlador es redundante - necesitas el tipo opuesto');
      }
    }

    const fillsSubroles = profile.subroles.filter(
      sub => compositionAnalysis.needs.missingTacticalFunctions.includes(sub)
    );
    if (fillsSubroles.length > 0) {
      reasons.push(`Añade funciones: ${fillsSubroles.join(', ')}`);
      fillsSubroles.forEach(sub => pros.push(`Añade ${sub.replace('-', ' ')}`));
    }

    if (compositionAnalysis.needs.duplicatedRoles.includes(profile.role)) {
      reasons.push(`Duplica el rol de ${profile.role}`);
      cons.push(`Demasiados ${profile.role}s en el equipo`);
    }
  }

  if (mapData.reasons.length > 0) {
    reasons.push(...mapData.reasons.slice(0, 3));
  }

  if (fullProfile) {
    const rankInfo: string[] = [];
    if (fullProfile.proPickRate > 10) rankInfo.push(`Pick rate pro: ${fullProfile.proPickRate}%`);
    if (fullProfile.proWinRate > 50) rankInfo.push(`Win rate pro: ${fullProfile.proWinRate}%`);
    if (rankInfo.length > 0) {
      reasons.push(rankInfo.join(', '));
    }
  }

  const totalUses = matchingComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (matchingComps.length >= 5 && totalUses >= 50) {
    confidence = 'high';
  } else if (matchingComps.length >= 2 && totalUses >= 20) {
    confidence = 'medium';
  }

  if (!matchingComps.length && mapData.score > 75) {
    confidence = 'medium';
  }

  const matchType = matchingComps.length > 0 && matchingComps.every(comp =>
    selectedAgents.every(sel =>
      comp.agents.some(a => a.title.toLowerCase() === sel.title.toLowerCase())
    )
  ) ? 'exact' : 'partial';

  let recommendationStrength: 'must-pick' | 'highly-recommended' | 'recommended' | 'situational' | 'risky' = 'situational';
  if (finalScore >= 80 && confidence !== 'low') {
    recommendationStrength = 'must-pick';
  } else if (finalScore >= 65) {
    recommendationStrength = 'highly-recommended';
  } else if (finalScore >= 50) {
    recommendationStrength = 'recommended';
  } else if (finalScore >= 35) {
    recommendationStrength = 'situational';
  } else {
    recommendationStrength = 'risky';
  }

  return {
    agent: candidate,
    proDataScore,
    compositionFitScore,
    roleNeedScore,
    redundancyPenalty,
    finalScore,
    reasons,
    pros,
    cons,
    confidence,
    matchType,
    functionalDiversity,
    mapFitScore: mapData.score,
    compositionContextScore: compContext.score,
    mapBoost,
    proMetaScore,
    recommendationStrength,
  };
};

export const getScoreBreakdown = (candidate: CandidateScore): string => {
  return `
    Pro Data (×0.25): ${candidate.proDataScore.toFixed(1)} → ${(candidate.proDataScore * 0.25).toFixed(1)}
    Composition Fit (×0.15): ${candidate.compositionFitScore.toFixed(1)} → ${(candidate.compositionFitScore * 0.15).toFixed(1)}
    Role Need (×0.20): ${candidate.roleNeedScore.toFixed(1)} → ${(candidate.roleNeedScore * 0.20).toFixed(1)}
    Map Fit (×0.20): ${candidate.mapFitScore.toFixed(1)} → ${(candidate.mapFitScore * 0.20).toFixed(1)}
    Diversity (×0.10): ${candidate.functionalDiversity.toFixed(1)} → ${(candidate.functionalDiversity * 0.10).toFixed(1)}
    Pro Meta (×0.10): ${candidate.proMetaScore.toFixed(1)} → ${(candidate.proMetaScore * 0.10).toFixed(1)}
    Map Boost: +${candidate.mapBoost.toFixed(1)}
    Redundancy Penalty: -${candidate.redundancyPenalty.toFixed(1)}
    Recommendation: ${candidate.recommendationStrength}
    Final Score: ${candidate.finalScore.toFixed(1)}
  `;
};