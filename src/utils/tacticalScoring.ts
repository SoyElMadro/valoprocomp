import type { Agent, Composition } from '../types';
import { getAgentProfile, isCompatibleControllerPair } from './agentProfiles';
import { analyzeComposition, type CompositionAnalysis } from './compositionAnalyzer';
import { type RolePatternAnalysis, getRoleBoost, getRolePenalty, getRoleFromAgent } from './rolePatternAnalyzer';

export interface ScoredComposition {
  composition: Composition;
  matchPercentage: number;
  matchingAgents: Agent[];
  missingAgents: Agent[];
  exactMatch: boolean;
  score: number;
  proDataScore: number;
  compositionFitScore: number;
  roleNeedScore: number;
  mapIdentityScore: number;
  redundancyPenalty: number;
}

export interface CandidateScore {
  agent: Agent;
  proDataScore: number;
  compositionFitScore: number;
  roleNeedScore: number;
  mapIdentityScore: number;
  redundancyPenalty: number;
  finalScore: number;
  reasons: string[];
  pros: string[];
  cons: string[];
  rejectedAlternatives: RejectedAlternative[];
  confidence: 'high' | 'medium' | 'low';
  matchType: 'exact' | 'partial';
}

export interface RejectedAlternative {
  agentName: string;
  reason: string;
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

  const normalizedWinrate = Math.min(adjustedWinRate / 100, 1) * 50;
  const normalizedPickRate = Math.min(avgPickRate / 10, 1) * 30;
  const confidenceScore = confidence * 20;

  return normalizedWinrate + normalizedPickRate + confidenceScore;
};

export const calculateCompositionFitScore = (
  candidate: Agent,
  selectedAgents: Agent[],
  _matchingComps?: Composition[]
): number => {
  const candidateProfile = getAgentProfile(candidate.title);
  if (!candidateProfile) return 0;

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

    const subroleOverlap = candidateProfile.subroles.filter(
      sub => profile.subroles.includes(sub)
    ).length;
    if (subroleOverlap > 0 && subroleOverlap < 3) {
      synergyPoints += 2;
    }

    if (candidateProfile.role === 'Controlador' && profile.role === 'Controlador') {
      if (isCompatibleControllerPair(candidate.title, profile.agentName)) {
        synergyPoints += 5;
      } else {
        synergyPoints -= 5;
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
    score += 25;
  }

  const duplicatedRole = needs.duplicatedRoles.includes(profile.role);
  if (duplicatedRole) {
    score -= 15;
  }

  const fillsMissingSubrole = profile.subroles.some(
    sub => needs.missingTacticalFunctions.includes(sub)
  );
  if (fillsMissingSubrole) {
    score += 20;

    const filledFunctions = profile.subroles.filter(
      sub => needs.missingTacticalFunctions.includes(sub)
    );
    if (filledFunctions.includes('anchor') || filledFunctions.includes('wall-controller')) {
      score += 15;
    }
  }

  const duplicatedSubrole = profile.subroles.some(
    sub => needs.duplicatedSubroles.includes(sub)
  );
  if (duplicatedSubrole && !profile.subroles.includes('wall-controller')) {
    score -= 10;
  }

  if (profile.subroles.includes('wall-controller') && needs.hasPrimarySmokes) {
    score += 15;
  }

  if (profile.subroles.includes('anchor') && !needs.hasSentinelAnchor) {
    score += 15;
  }

  if (profile.subroles.includes('postplant') && !needs.hasPostplant) {
    score += 10;
  }

  if (profile.subroles.includes('map-control') && !needs.hasMapControl) {
    score += 10;
  }

  if (profile.subroles.includes('flash-initiator') && !needs.hasFlash) {
    score += 15;
  }

  return Math.max(0, Math.min(100, score));
};

export const calculateMapIdentityScore = (
  candidate: Agent,
  mapId?: string,
  matchingComps?: Composition[]
): number => {
  if (!mapId || !matchingComps || matchingComps.length === 0) {
    return 50;
  }

  const profile = getAgentProfile(candidate.title);
  if (!profile?.mapStrengths) return 50;

  const mapStrength = profile.mapStrengths.find(m => m.mapId === mapId);
  if (mapStrength) {
    return 50 + mapStrength.strength * 0.5;
  }

  return 50;
};

export const calculateRedundancyPenalty = (
  candidate: Agent,
  selectedAgents: Agent[],
  analysis: CompositionAnalysis
): number => {
  const profile = getAgentProfile(candidate.title);
  if (!profile) return 0;

  let penalty = 0;

  const { needs } = analysis;

  if (profile.role === 'Iniciador' && (needs.roleCounts.Iniciador >= 1 || needs.subroleCounts.recon >= 1 || needs.subroleCounts['flash-initiator'] >= 1)) {
    penalty += 25;
  }

  if (profile.role === 'Duelista' && needs.roleCounts.Duelista >= 2) {
    penalty += 20;
  }

  if (profile.role === 'Controlador') {
    if (needs.subroleCounts['primary-smokes'] >= 1 && !profile.subroles.includes('wall-controller')) {
      penalty += 20;
    }

    if (profile.subroles.includes('wall-controller') && needs.hasPrimarySmokes) {
      penalty -= 10;
    }
  }

  if (needs.duplicatedRoles.includes(profile.role)) {
    if (profile.role === 'Iniciador' && needs.subroleCounts['flash-initiator'] >= 1 && needs.subroleCounts.recon >= 1) {
      penalty += 20;
    }

    if (profile.role === 'Controlador') {
      if (needs.subroleCounts['primary-smokes'] >= 1 && !profile.subroles.includes('wall-controller')) {
        penalty += 15;
      }

      if (profile.subroles.includes('wall-controller') && needs.hasPrimarySmokes) {
        penalty -= 10;
      }
    }

    if (profile.subroles.includes('flash-initiator') && needs.subroleCounts['flash-initiator'] >= 1) {
      penalty += 15;
    }
  }

  const selectedNames = selectedAgents.map(a => a.title);
  const selectedProfiles = selectedNames
    .map(name => getAgentProfile(name))
    .filter(Boolean);

  selectedProfiles.forEach(selectedProfile => {
    if (!selectedProfile) return;

    const overlappingSubroles = profile.subroles.filter(
      sub => selectedProfile.subroles.includes(sub) &&
             sub !== 'space-creator' &&
             sub !== 'damage-utility'
    );

    if (overlappingSubroles.length >= 2) {
      penalty += overlappingSubroles.length * 5;
    }
  });

  return penalty;
};

export const calculateCandidateScore = (
  candidate: Agent,
  selectedAgents: Agent[],
  matchingComps: Composition[],
  mapId?: string,
  analysis?: CompositionAnalysis,
  isPartialMatch: boolean = false,
  patternAnalysis?: RolePatternAnalysis
): CandidateScore => {
  const compositionAnalysis = analysis || analyzeComposition(selectedAgents, mapId);

  const proDataScore = calculateProDataScore(candidate, matchingComps);
  const compositionFitScore = calculateCompositionFitScore(
    candidate,
    selectedAgents,
    matchingComps
  );
  const roleNeedScore = calculateRoleNeedScore(candidate, compositionAnalysis);
  const mapIdentityScore = calculateMapIdentityScore(candidate, mapId, matchingComps);
  const redundancyPenalty = calculateRedundancyPenalty(
    candidate,
    selectedAgents,
    compositionAnalysis
  );

  let rolePatternBoost = 0;
  let rolePatternPenalty = 0;
  if (patternAnalysis) {
    const candidateRole = getRoleFromAgent(candidate);
    rolePatternBoost = getRoleBoost(candidateRole, patternAnalysis);
    rolePatternPenalty = getRolePenalty(candidateRole, patternAnalysis);
  }

  let finalScore =
    proDataScore * 0.45 +
    compositionFitScore * 0.30 +
    roleNeedScore * 0.15 +
    mapIdentityScore * 0.10 -
    redundancyPenalty +
    rolePatternBoost -
    rolePatternPenalty;
    redundancyPenalty;

  if (isPartialMatch) {
    const totalUses = matchingComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
    if (totalUses < 30) {
      finalScore = finalScore * 0.6 + roleNeedScore * 0.4;
    } else if (totalUses < 60) {
      finalScore = finalScore * 0.75 + roleNeedScore * 0.25;
    }
  }

  const reasons: string[] = [];
  const pros: string[] = [];
  const cons: string[] = [];

  const profile = getAgentProfile(candidate.title);
  if (profile) {
    if (compositionAnalysis.needs.missingRoles.includes(profile.role)) {
      reasons.push(`Fills missing ${profile.role} role`);
      pros.push(`Adds needed ${profile.role} to team`);
    }

    const fillsSubroles = profile.subroles.filter(
      sub => compositionAnalysis.needs.missingTacticalFunctions.includes(sub)
    );
    if (fillsSubroles.length > 0) {
      reasons.push(`Provides: ${fillsSubroles.join(', ')}`);
      fillsSubroles.forEach(sub => pros.push(`Good ${sub.replace('-', ' ')} capability`));
    }

    if (profile.subroles.includes('wall-controller') && compositionAnalysis.needs.hasPrimarySmokes) {
      reasons.push('Adds wall control without duplicating primary smokes');
      pros.push('Complements existing controller well');
    }

    if (compositionAnalysis.needs.duplicatedRoles.includes(profile.role)) {
      reasons.push(`WARNING: ${profile.role} already in team`);
      cons.push(`Duplicates ${profile.role} role`);
    }

    if (profile.role === 'Iniciador' && compositionAnalysis.needs.subroleCounts['flash-initiator'] >= 1) {
      reasons.push('Second initiator - need strong justification');
      cons.push('May overlap with existing initiator utility');
    }

    if (profile.role === 'Controlador' &&
        compositionAnalysis.needs.subroleCounts['primary-smokes'] >= 1 &&
        !profile.subroles.includes('wall-controller')) {
      reasons.push('Redundant primary smoke controller');
      cons.push('Too similar to existing controller');
    }
  }

  const totalUses = matchingComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (matchingComps.length >= 5 && totalUses >= 50) {
    confidence = 'high';
  } else if (matchingComps.length >= 2 && totalUses >= 20) {
    confidence = 'medium';
  }

  const matchType = matchingComps.length > 0 && matchingComps.every(comp =>
    selectedAgents.every(sel =>
      comp.agents.some(a => a.title.toLowerCase() === sel.title.toLowerCase())
    )
  ) ? 'exact' : 'partial';

  const rejectedAlternatives: RejectedAlternative[] = [];

  return {
    agent: candidate,
    proDataScore,
    compositionFitScore,
    roleNeedScore,
    mapIdentityScore,
    redundancyPenalty,
    finalScore,
    reasons,
    pros,
    cons,
    rejectedAlternatives,
    confidence,
    matchType,
  };
};

export const getScoreBreakdown = (
  candidate: CandidateScore
): string => {
  return `
    Pro Data: ${candidate.proDataScore.toFixed(1)} × 0.45 = ${(candidate.proDataScore * 0.45).toFixed(1)}
    Composition Fit: ${candidate.compositionFitScore.toFixed(1)} × 0.30 = ${(candidate.compositionFitScore * 0.30).toFixed(1)}
    Role Need: ${candidate.roleNeedScore.toFixed(1)} × 0.15 = ${(candidate.roleNeedScore * 0.15).toFixed(1)}
    Map Identity: ${candidate.mapIdentityScore.toFixed(1)} × 0.10 = ${(candidate.mapIdentityScore * 0.10).toFixed(1)}
    Redundancy Penalty: -${candidate.redundancyPenalty.toFixed(1)}
    ─────────────────────────
    Final Score: ${candidate.finalScore.toFixed(1)}
  `;
};