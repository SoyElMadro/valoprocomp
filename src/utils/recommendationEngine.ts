import type { Agent, Composition, ScoredComposition, RecommendedAgent, CompositionTag, SynergyRecommendation, SynergyTag } from '../types';
import { getAgentProfile, getControllerSubrole } from './agentProfiles';
import { analyzeComposition, type CompositionAnalysis } from './compositionAnalyzer';
import { calculateCandidateScore } from './tacticalScoring';
import type { CandidateScore } from './tacticalScoring';
import { analyzeRolePatterns, type RolePatternAnalysis } from './rolePatternAnalyzer';
import {
  getMissingFunctionsForMap,
  getMapDescription,
  getFullAgentProfile,
  getBestMaps,
  getWeakMaps,
  getMapRequirements,
  type ActiveMapName,
} from './mapAgentIntelligence';
import { getAgentMapGuide } from '../data/tactical-guides/agentMapGuides';

const ROLES: Record<string, string> = {
  Miks: 'Controlador',
  Astra: 'Controlador',
  Breach: 'Iniciador',
  Brimstone: 'Controlador',
  Chamber: 'Centinela',
  Clove: 'Controlador',
  Cypher: 'Centinela',
  Deadlock: 'Centinela',
  Fade: 'Iniciador',
  Gekko: 'Iniciador',
  Harbor: 'Controlador',
  Iso: 'Duelista',
  Jett: 'Duelista',
  'KAY/O': 'Iniciador',
  Killjoy: 'Centinela',
  Neon: 'Duelista',
  Omen: 'Controlador',
  Phoenix: 'Duelista',
  Raze: 'Duelista',
  Reyna: 'Duelista',
  Sage: 'Centinela',
  Skye: 'Iniciador',
  Sova: 'Iniciador',
  Tejo: 'Iniciador',
  Veto: 'Centinela',
  Viper: 'Controlador',
  Vyse: 'Centinela',
  Waylay: 'Duelista',
  Yoru: 'Duelista',
};

const calculateCompositionScore = (comp: Composition) => {
  const winRate = parseFloat(comp.winRate);
  const pickRate = parseFloat(comp.pickRate);
  const timesUsed = comp.timesPlayed;

  const sampleScore = Math.min(timesUsed / 100, 1) * 100;
  const adjustedWinRate = 50 + (winRate - 50) * Math.min(timesUsed / 100, 1);
  const score = adjustedWinRate * 0.5 + pickRate * 0.3 + sampleScore * 0.2;

  return { score, adjustedWinRate, sampleScore };
};

const getCompositionTag = (comp: Composition, score: number): CompositionTag => {
  const winRate = parseFloat(comp.winRate);
  const pickRate = parseFloat(comp.pickRate);
  const timesUsed = comp.timesPlayed;
  const sampleScore = Math.min(timesUsed / 100, 1);

  if (pickRate >= 5 && sampleScore >= 0.5 && winRate >= 48) {
    return score >= 65 ? 'Meta' : 'Confiable';
  }

  if (pickRate >= 2 && pickRate < 5 && winRate >= 52 && sampleScore >= 0.3) {
    return 'Fuerte pero situacional';
  }

  if (winRate >= 55 && sampleScore < 0.3) {
    return 'Riesgosa por poca muestra';
  }

  if (pickRate >= 5 && winRate < 46) {
    return 'Popular pero débil';
  }

  if (pickRate < 3 && winRate < 45) {
    return 'Débil';
  }

  if (pickRate >= 2 && winRate >= 48) {
    return 'Confiable';
  }

  return 'Débil';
};

export const calculateMatchPercentage = (
  userAgents: Agent[],
  composition: Composition
): number => {
  if (userAgents.length === 0) return 0;

  const userAgentNames = userAgents.map(a => a.title.toLowerCase());
  const compositionAgentNames = composition.agents.map(a => a.title.toLowerCase());

  const matches = userAgentNames.filter(name => compositionAgentNames.includes(name));
  return (matches.length / userAgents.length) * 100;
};

export const scoreCompositions = (
  compositions: Composition[],
  selectedAgents: Agent[]
): ScoredComposition[] => {
  return compositions
    .map(comp => {
      const { score, adjustedWinRate, sampleScore } = calculateCompositionScore(comp);
      const tag = getCompositionTag(comp, score);

      const compositionAgentNames = comp.agents.map(a => a.title.toLowerCase());
      const matchingAgents = selectedAgents.filter(agent =>
        compositionAgentNames.includes(agent.title.toLowerCase())
      );
      const missingAgents = comp.agents.filter(
        agent => !selectedAgents.some(
          selected => selected.title.toLowerCase() === agent.title.toLowerCase()
        )
      );
      const matchPercentage = selectedAgents.length > 0
        ? (matchingAgents.length / selectedAgents.length) * 100
        : 0;

      return {
        composition: comp,
        matchPercentage,
        matchingAgents,
        missingAgents,
        score,
        adjustedWinRate,
        sampleScore,
        tag,
      };
    })
    .sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return b.score - a.score;
    });
};

export const getRecommendedAgents = (
  scoredCompositions: ScoredComposition[]
): RecommendedAgent[] => {
  const recommended: Map<string, RecommendedAgent> = new Map();

  scoredCompositions.forEach(scored => {
    scored.missingAgents.forEach(missingAgent => {
      const key = missingAgent.title.toLowerCase();
      const existing = recommended.get(key);

      if (!existing || scored.matchPercentage > existing.matchPercentage) {
        recommended.set(key, {
          agent: missingAgent,
          composition: scored.composition,
          matchPercentage: scored.matchPercentage,
          missingAgents: scored.missingAgents,
        });
      }
    });
  });

  return Array.from(recommended.values()).sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (b.composition.timesPlayed !== a.composition.timesPlayed) {
      return b.composition.timesPlayed - a.composition.timesPlayed;
    }
    return parseFloat(b.composition.winRate) - parseFloat(a.composition.winRate);
  });
};

export const getTopCompositions = (
  scoredCompositions: ScoredComposition[],
  limit: number = 10
): ScoredComposition[] => {
  return [...scoredCompositions]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

const calculateWeightedWinrate = (comps: Composition[]): number => {
  if (comps.length === 0) return 50;

  const totalUses = comps.reduce((sum, comp) => sum + comp.timesPlayed, 0);
  if (totalUses === 0) return 50;

  const weightedSum = comps.reduce((sum, comp) => {
    return sum + parseFloat(comp.winRate) * comp.timesPlayed;
  }, 0);

  return weightedSum / totalUses;
};

const getExactMatches = (
  compositions: Composition[],
  selectedAgents: Agent[]
): Composition[] => {
  const selectedNames = selectedAgents.map(a => a.title.toLowerCase());
  return compositions.filter(comp => {
    const compNames = comp.agents.map(a => a.title.toLowerCase());
    return selectedNames.every(name => compNames.includes(name));
  });
};

const getPartialMatches = (
  compositions: Composition[],
  selectedAgents: Agent[]
): Composition[] => {
  const selectedNames = selectedAgents.map(a => a.title.toLowerCase());
  const minMatches = Math.max(selectedAgents.length - 1, 1);

  return compositions.filter(comp => {
    const compNames = comp.agents.map(a => a.title.toLowerCase());
    const matches = selectedNames.filter(name => compNames.includes(name)).length;
    return matches >= minMatches;
  });
};

export interface TacticalRecommendation extends SynergyRecommendation {
  candidateScore: CandidateScore;
  analysis: CompositionAnalysis;
  patternAnalysis: RolePatternAnalysis;
  whyThisPick: string;
  pros: string[];
  cons: string[];
  rejectedAlternatives: { agentName: string; reason: string }[];
  confidence: 'high' | 'medium' | 'low';
  matchType: 'exact' | 'partial';
  mapFitBoost: number;
  guideNotes: string[];
  recommendationStrength: 'must-pick' | 'highly-recommended' | 'recommended' | 'situational' | 'risky';
  bestMaps: string[];
  directReplacements: string[];
  utilityDescription: string;
  proMetaInfo: string;
}

const getRecommendationLabel = (params: {
  synergyScore: number;
  adjustedWinrate: number;
  weightedWinrate: number;
  appearanceRate: number;
  timesTogether: number;
}): { tag: SynergyTag; explanation: string } => {
  const { synergyScore, adjustedWinrate, weightedWinrate, appearanceRate, timesTogether } = params;

  if (timesTogether <= 2 && weightedWinrate >= 70) {
    return {
      tag: 'Winrate inflado por poca muestra',
      explanation: `Con solo ${timesTogether} partidas no hay suficiente data. El winrate alto puede ser casualidad.`,
    };
  }

  if (timesTogether < 3) {
    return {
      tag: 'Dato limitado',
      explanation: `Muy pocas composiciones con este agente junto a los tuyos. Consideralo solo como opción adicional.`,
    };
  }

  if (synergyScore >= 75 && timesTogether >= 15) {
    return {
      tag: 'Mejor sinergia',
      explanation: `Excelente combinación: aparece frecuentemente con tus agentes y tiene buen winrate.`,
    };
  }

  if (appearanceRate >= 40 && timesTogether >= 10) {
    return {
      tag: 'Pick meta',
      explanation: `Un pick muy popular que funciona bien con tu equipo. Alta frecuencia de aparición en el meta.`,
    };
  }

  if (adjustedWinrate >= 54 && timesTogether >= 8) {
    return {
      tag: 'Pick fuerte',
      explanation: `Buen winrate ajustado con cantidad de partidas decente. Recomendable para composiciones sólidas.`,
    };
  }

  if (synergyScore >= 60) {
    return {
      tag: 'Pick recomendable',
      explanation: `Buena opción para completar tu equipo con stats aceptables.`,
    };
  }

  if (timesTogether < 8 && adjustedWinrate >= 55) {
    return {
      tag: 'Prometedor, poca muestra',
      explanation: `El winrate es bueno pero la muestra es limitada. Podría ser una opción interesante.`,
    };
  }

  return {
    tag: 'Pick situacional',
    explanation: `Funciona en algunos contextos específicos. Evalúa según tu estilo de juego.`,
  };
};

const generateWhyThisPick = (
  candidate: Agent,
  selectedAgents: Agent[],
  analysis: CompositionAnalysis,
  mapId?: string
): string => {
  const profile = getAgentProfile(candidate.title);
  const fullProfile = getFullAgentProfile(candidate.title);
  if (!profile) return '';

  const parts: string[] = [];

  if (mapId) {
    const mapDescription = getMapDescription(mapId as ActiveMapName);
    parts.push(`Mapa: ${mapDescription}`);

    const missingFunctions = getMissingFunctionsForMap(selectedAgents, mapId as ActiveMapName);
    if (missingFunctions.length > 0) {
      parts.push(`Tu equipo necesita: ${missingFunctions.join(', ')}.`);
    }
  }

  if (analysis.needs.missingRoles.includes(profile.role)) {
    parts.push(`Tu equipo necesita un ${profile.role} y ${candidate.title} lo provee.`);
  }

  if (fullProfile) {
    const selectedNames = selectedAgents.map(a => a.title);
    const synergies = fullProfile.bestWith.filter(name =>
      selectedNames.some(s => s.toLowerCase() === name.toLowerCase())
    );
    if (synergies.length > 0) {
      parts.push(`Según datos pro, sinergiza especialmente con: ${synergies.join(', ')}.`);
    }

    const directReplacement = fullProfile.directReplacements;
    const anyReplacementUsed = selectedNames.some(name =>
      directReplacement.some(r => r.toLowerCase() === name.toLowerCase())
    );
    if (anyReplacementUsed) {
      parts.push(`NOTA: ${candidate.title} es reemplazo directo de un agente ya seleccionado.`);
    }
  }

  if (profile.role === 'Controlador') {
    const candidateSubrole = getControllerSubrole(candidate.title);

    if (candidateSubrole === 'wallPlace' && analysis.needs.hasSmokeBlock && !analysis.needs.hasWallPlace) {
      parts.push(`${candidate.title} (wall-place) complementa perfectamente a tu controlador de smokes.`);
    }

    if (candidateSubrole === 'smokeBlock' && analysis.needs.hasWallPlace && !analysis.needs.hasSmokeBlock) {
      parts.push(`${candidate.title} (smoke-block) complementa tu controlador de pared.`);
    }

    if ((candidateSubrole === 'smokeBlock' && analysis.needs.hasSmokeBlock && !analysis.needs.hasWallPlace) ||
        (candidateSubrole === 'wallPlace' && analysis.needs.hasWallPlace && !analysis.needs.hasSmokeBlock)) {
      parts.push(`ATENCION: ${candidate.title} no complementa - necesitas un controlador del tipo opuesto.`);
    }
  }

  const filledFunctions = profile.subroles.filter(
    sub => analysis.needs.missingTacticalFunctions.includes(sub)
  );
  if (filledFunctions.length > 0) {
    parts.push(`Añade funciones al equipo: ${filledFunctions.join(', ')}.`);
  }

  if (analysis.needs.duplicatedRoles.includes(profile.role)) {
    const existing = selectedAgents.filter(a => getAgentProfile(a.title)?.role === profile.role);
    parts.push(`NOTA: Ya tienes ${existing.map(a => a.title).join(', ')} roles duplicados.`);
  }

  if (fullProfile && mapId) {
    const mapRating = getBestMaps(candidate.title).find(m => m.map === mapId);
    if (mapRating) {
      parts.push(`Rating en este mapa: ${mapRating.score}/10 - excelente elección.`);
    } else {
      const weakMap = getWeakMaps(candidate.title).find(m => m.map === mapId);
      if (weakMap) {
        parts.push(`Rating en este mapa: ${weakMap.score}/10 - no es ideal.`);
      }
    }
  }

  if (fullProfile) {
    parts.push(`Estilo: ${fullProfile.playstyle}`);
  }

  return parts.join(' ');
};

const getControllerRecommendationBoost = (
  candidate: Agent,
  _selectedAgents: Agent[],
  analysis: CompositionAnalysis
): number => {
  const profile = getAgentProfile(candidate.title);
  if (!profile || profile.role !== 'Controlador') return 0;

  const candidateSubrole = getControllerSubrole(candidate.title);
  const { controllerSubroleTypes } = analysis.needs;

  let boost = 0;

  if (candidateSubrole === 'wallPlace' && controllerSubroleTypes.includes('smokeBlock') && !controllerSubroleTypes.includes('wallPlace')) {
    boost += 40;
  }

  if (candidateSubrole === 'smokeBlock' && controllerSubroleTypes.includes('wallPlace') && !controllerSubroleTypes.includes('smokeBlock')) {
    boost += 40;
  }

  if (candidateSubrole === 'smokeBlock' && controllerSubroleTypes.includes('smokeBlock') && !controllerSubroleTypes.includes('wallPlace')) {
    boost -= 50;
  }

  if (candidateSubrole === 'wallPlace' && controllerSubroleTypes.includes('wallPlace') && !controllerSubroleTypes.includes('smokeBlock')) {
    boost -= 50;
  }

  return boost;
};

interface LastPickDecision {
  isLastPick: boolean;
  missingRole: string | null;
  shouldUseSentinel: boolean;
  sentinelUsagePercent: number;
  topSentinelAgent: string | null;
  recommendedRole: string;
  reason: string;
}

const analyzeSentinelUsageInComps = (compositions: Composition[]): {
  percentage: number;
  topSentinel: string | null;
} => {
  if (compositions.length === 0) {
    return { percentage: 100, topSentinel: null };
  }

  let totalWeight = 0;
  let sentinelWeight = 0;
  const sentinelScores: Record<string, number> = {};

  compositions.forEach(comp => {
    const weight = comp.timesPlayed;
    totalWeight += weight;

    let hasSentinel = false;
    comp.agents.forEach(agent => {
      const role = ROLES[agent.title];
      if (role === 'Centinela') {
        hasSentinel = true;
        sentinelScores[agent.title] = (sentinelScores[agent.title] || 0) + weight * parseFloat(comp.winRate);
      }
    });

    if (hasSentinel) sentinelWeight += weight;
  });

  const percentage = totalWeight > 0 ? (sentinelWeight / totalWeight) * 100 : 100;

  let topSentinel: string | null = null;
  let maxScore = 0;
  Object.entries(sentinelScores).forEach(([name, score]) => {
    if (score > maxScore) {
      maxScore = score;
      topSentinel = name;
    }
  });

  return { percentage, topSentinel };
};

const determineBestAlternative = (
  compositions: Composition[],
  currentRoleCounts: Record<string, number>,
  mapId?: string
): { role: string; reason: string } => {
  const availableAltRoles = ['Duelista', 'Controlador', 'Iniciador'].filter(
    role => (currentRoleCounts[role] || 0) < 2
  );

  if (mapId) {
    const mapReqs = getMapRequirements(mapId as ActiveMapName);
    if (mapReqs) {
      const archetype = mapReqs.metaArchetype.toLowerCase();

      if ((archetype.includes('double initiator') || archetype.includes('2 initiator') || archetype.includes('2i')) && currentRoleCounts['Iniciador'] < 2 && availableAltRoles.includes('Iniciador')) {
        return { role: 'Iniciador', reason: 'El meta de este mapa favorece doble iniciador.' };
      }
      if ((archetype.includes('double controller') || archetype.includes('2 controller') || archetype.includes('2c') || archetype.includes('double wall')) && currentRoleCounts['Controlador'] < 2 && availableAltRoles.includes('Controlador')) {
        return { role: 'Controlador', reason: 'El meta de este mapa favorece doble controlador.' };
      }
      if ((archetype.includes('double duelist') || archetype.includes('2 duelist') || archetype.includes('2d')) && currentRoleCounts['Duelista'] < 2 && availableAltRoles.includes('Duelista')) {
        return { role: 'Duelista', reason: 'El meta de este mapa favorece doble duelista.' };
      }
    }
  }

  const nonSentinelComps = compositions.filter(comp =>
    !comp.agents.some(agent => ROLES[agent.title] === 'Centinela')
  );

  if (nonSentinelComps.length > 0) {
    const altRoleWeights: Record<string, number> = { Duelista: 0, Controlador: 0, Iniciador: 0 };
    nonSentinelComps.forEach(comp => {
      comp.agents.forEach(agent => {
        const role = ROLES[agent.title];
        if (role && role in altRoleWeights) {
          altRoleWeights[role] += comp.timesPlayed * parseFloat(comp.winRate);
        }
      });
    });

    const altGaps: Record<string, number> = {};
    Object.entries(altRoleWeights).forEach(([role, weight]) => {
      if (availableAltRoles.includes(role)) {
        altGaps[role] = weight - (currentRoleCounts[role] || 0) * 1000;
      }
    });

    const bestAlt = Object.entries(altGaps)
      .filter(([, gap]) => gap > 0)
      .sort((a, b) => b[1] - a[1])[0];

    if (bestAlt) {
      return { role: bestAlt[0], reason: `Las composiciones pro sin centinela en este mapa usan ${bestAlt[0]} adicional.` };
    }
  }

  const roleWeights: Record<string, number> = { Duelista: 0, Controlador: 0, Iniciador: 0, Centinela: 0 };
  let totalWeight = 0;

  compositions.forEach(comp => {
    const weight = comp.timesPlayed;
    totalWeight += weight;
    comp.agents.forEach(agent => {
      const role = ROLES[agent.title];
      if (role && role in roleWeights) {
        roleWeights[role] += weight;
      }
    });
  });

  const avgPerRole: Record<string, number> = {};
  Object.keys(roleWeights).forEach(role => {
    avgPerRole[role] = totalWeight > 0 ? roleWeights[role] / totalWeight : 0;
  });

  const roleGaps: Record<string, number> = {};
  availableAltRoles.forEach(role => {
    roleGaps[role] = avgPerRole[role] * 5 - (currentRoleCounts[role] || 0) * 5;
  });

  const sortedGaps = Object.entries(roleGaps).sort((a, b) => b[1] - a[1]);
  if (sortedGaps.length > 0 && sortedGaps[0][1] > 0) {
    return { role: sortedGaps[0][0], reason: 'Según los datos pro, este rol completaría mejor la composición.' };
  }

  const fallback = availableAltRoles.length > 0 ? availableAltRoles[0] : 'Iniciador';
  return { role: fallback, reason: 'Se recomienda este rol para maximizar la utilidad del equipo.' };
};

const analyzeLastPickDecision = (
  selectedAgents: Agent[],
  compositions: Composition[],
  mapId?: string
): LastPickDecision => {
  const notApplicable: LastPickDecision = {
    isLastPick: false,
    missingRole: null,
    shouldUseSentinel: false,
    sentinelUsagePercent: 0,
    topSentinelAgent: null,
    recommendedRole: '',
    reason: '',
  };

  if (selectedAgents.length !== 4) return notApplicable;

  const roleCounts: Record<string, number> = {
    Duelista: 0,
    Controlador: 0,
    Iniciador: 0,
    Centinela: 0,
  };

  selectedAgents.forEach(agent => {
    const role = ROLES[agent.title];
    if (role && role in roleCounts) {
      roleCounts[role]++;
    }
  });

  const missingRoles = Object.entries(roleCounts)
    .filter(([, count]) => count === 0)
    .map(([role]) => role);

  if (missingRoles.length !== 1) return notApplicable;

  const missingRole = missingRoles[0];

  if (missingRole !== 'Centinela') {
    return {
      isLastPick: true,
      missingRole,
      shouldUseSentinel: false,
      sentinelUsagePercent: 0,
      topSentinelAgent: null,
      recommendedRole: missingRole,
      reason: `Falta un ${missingRole}. Prácticamente todas las composiciones profesionales necesitan al menos un ${missingRole}.`,
    };
  }

  const sentinelUsage = analyzeSentinelUsageInComps(compositions);

  let mapNeedsAnchor = true;
  if (mapId) {
    const mapReqs = getMapRequirements(mapId as ActiveMapName);
    if (mapReqs) {
      mapNeedsAnchor = mapReqs.needs.anchor;
    }
  }

  const shouldUseSentinel = sentinelUsage.percentage >= 50 || (mapNeedsAnchor && sentinelUsage.percentage >= 30);

  if (shouldUseSentinel) {
    let topSentinel = sentinelUsage.topSentinel;

    if (!topSentinel && mapId) {
      const mapReqs = getMapRequirements(mapId as ActiveMapName);
      if (mapReqs && mapReqs.optimalComposition.sentinels.length > 0) {
        topSentinel = mapReqs.optimalComposition.sentinels[0];
      }
    }

    return {
      isLastPick: true,
      missingRole: 'Centinela',
      shouldUseSentinel: true,
      sentinelUsagePercent: sentinelUsage.percentage,
      topSentinelAgent: topSentinel,
      recommendedRole: 'Centinela',
      reason: `Falta Centinela. ${sentinelUsage.percentage.toFixed(0)}% de las composiciones pro usan centinela en este mapa.${
        topSentinel ? ` ${topSentinel} es el más efectivo.` : ''
      }`,
    };
  }

  const altRole = determineBestAlternative(compositions, roleCounts, mapId);

  return {
    isLastPick: true,
    missingRole: 'Centinela',
    shouldUseSentinel: false,
    sentinelUsagePercent: sentinelUsage.percentage,
    topSentinelAgent: null,
    recommendedRole: altRole.role,
    reason: `Solo ${sentinelUsage.percentage.toFixed(0)}% de las composiciones pro usan centinela en este mapa. Se recomienda un ${altRole.role} en su lugar. ${altRole.reason}`,
  };
};

export const getSynergyRecommendations = (
  compositions: Composition[],
  selectedAgents: Agent[],
  limit: number = 5,
  mapId?: string
): TacticalRecommendation[] => {
  if (selectedAgents.length === 0) return [];

  const lastPickDecision = analyzeLastPickDecision(selectedAgents, compositions, mapId);

  const selectedNames = selectedAgents.map(a => a.title.toLowerCase());
  const analysis = analyzeComposition(selectedAgents, mapId);
  const patternAnalysis = analyzeRolePatterns(compositions, selectedAgents);

  let baseComps = getExactMatches(compositions, selectedAgents);
  const isPartialMatch = baseComps.length < 3;

  if (isPartialMatch && selectedAgents.length > 1) {
    baseComps = getPartialMatches(compositions, selectedAgents);
  }

  if (baseComps.length === 0) return [];

  const totalBaseUses = baseComps.reduce((sum, comp) => sum + comp.timesPlayed, 0);

  const selectedRoles = selectedAgents.map(a => ROLES[a.title] || 'Unknown');
  const roleCount: Record<string, number> = {};
  selectedRoles.forEach(role => {
    roleCount[role] = (roleCount[role] || 0) + 1;
  });

  const candidateNames = new Set<string>();
  baseComps.forEach(comp => {
    comp.agents.forEach(agent => {
      const agentName = agent.title.toLowerCase();
      if (!selectedNames.includes(agentName)) {
        candidateNames.add(agentName);
      }
    });
  });

  const candidateScores: Map<string, CandidateScore> = new Map();

  candidateNames.forEach(agentName => {
    const candidateMatchingComps = baseComps.filter(comp =>
      comp.agents.some(a => a.title.toLowerCase() === agentName)
    );

    if (candidateMatchingComps.length === 0) return;

    const timesTogether = candidateMatchingComps.reduce(
      (sum, comp) => sum + comp.timesPlayed,
      0
    );

    if (timesTogether <= 0) return;

    const agent = compositions[0].agents.find(a => a.title.toLowerCase() === agentName);
    if (!agent) return;

    const candidateProfile = getAgentProfile(agent.title);
    const candidateRole = candidateProfile?.role ? ROLES[agent.title] : undefined;

    if (candidateRole === 'Controlador') {
      const candidateSubrole = getControllerSubrole(agent.title);
      const { controllerSubroleTypes } = analysis.needs;

      if (candidateSubrole === 'smokeBlock' && controllerSubroleTypes.includes('smokeBlock') && !controllerSubroleTypes.includes('wallPlace')) {
        return;
      }

      if (candidateSubrole === 'wallPlace' && controllerSubroleTypes.includes('wallPlace') && !controllerSubroleTypes.includes('smokeBlock')) {
        return;
      }
    }

    if (candidateRole === 'Iniciador' && roleCount['Iniciador'] >= 2) {
      const hasFlash = candidateProfile?.subroles.includes('flash-initiator');
      const hasRecon = candidateProfile?.subroles.includes('recon-initiator');
      if (!hasFlash && !hasRecon) {
        return;
      }
    }

    if (candidateRole === 'Duelista' && roleCount['Duelista'] >= 2) {
      if (candidateProfile) {
        const hasUnique = candidateProfile.redundantWith.every(
          r => !selectedAgents.some(s => s.title === r)
        );
        if (!hasUnique) {
          return;
        }
      }
    }

    const candidateScore = calculateCandidateScore(
      agent,
      selectedAgents,
      candidateMatchingComps,
      mapId,
      analysis,
      isPartialMatch,
      patternAnalysis
    );

    if (candidateRole === 'Controlador') {
      const controllerBoost = getControllerRecommendationBoost(agent, selectedAgents, analysis);
      candidateScore.finalScore += controllerBoost;
      candidateScore.mapBoost += controllerBoost;
    }

    if (lastPickDecision.isLastPick && lastPickDecision.missingRole) {
      if (lastPickDecision.missingRole !== 'Centinela') {
        if (candidateRole === lastPickDecision.recommendedRole) {
          candidateScore.finalScore += 60;
          if (candidateScore.recommendationStrength === 'situational') candidateScore.recommendationStrength = 'highly-recommended';
          else if (candidateScore.recommendationStrength === 'recommended') candidateScore.recommendationStrength = 'must-pick';
          else if (candidateScore.recommendationStrength === 'risky') candidateScore.recommendationStrength = 'recommended';
        } else {
          candidateScore.finalScore -= 30;
        }
      } else if (lastPickDecision.shouldUseSentinel) {
        if (candidateRole === 'Centinela') {
          candidateScore.finalScore += 50;
          if (lastPickDecision.topSentinelAgent && agent.title === lastPickDecision.topSentinelAgent) {
            candidateScore.finalScore += 25;
          }
          if (candidateScore.recommendationStrength === 'situational') candidateScore.recommendationStrength = 'highly-recommended';
          else if (candidateScore.recommendationStrength === 'recommended') candidateScore.recommendationStrength = 'must-pick';
          else if (candidateScore.recommendationStrength === 'risky') candidateScore.recommendationStrength = 'recommended';
        } else {
          candidateScore.finalScore -= 15;
        }
      } else {
        if (candidateRole === 'Centinela') {
          candidateScore.finalScore -= 50;
          if (candidateScore.recommendationStrength === 'must-pick') candidateScore.recommendationStrength = 'situational';
          else if (candidateScore.recommendationStrength === 'highly-recommended') candidateScore.recommendationStrength = 'situational';
          else if (candidateScore.recommendationStrength === 'recommended') candidateScore.recommendationStrength = 'risky';
        } else if (candidateRole === lastPickDecision.recommendedRole) {
          candidateScore.finalScore += 45;
          if (candidateScore.recommendationStrength === 'situational') candidateScore.recommendationStrength = 'recommended';
          else if (candidateScore.recommendationStrength === 'recommended') candidateScore.recommendationStrength = 'highly-recommended';
        }
      }
    }

    candidateScores.set(agentName, candidateScore);
  });

  const sortedCandidates = Array.from(candidateScores.entries())
    .sort((a, b) => b[1].finalScore - a[1].finalScore);

  const topCandidates = sortedCandidates.slice(0, limit * 2);

  const recommendations: TacticalRecommendation[] = [];

  topCandidates.forEach(([agentName, candidateScore]) => {
    const agent = compositions[0].agents.find(a => a.title.toLowerCase() === agentName);
    if (!agent) return;

    const candidateMatchingComps = baseComps.filter(comp =>
      comp.agents.some(a => a.title.toLowerCase() === agentName)
    );

    const timesTogether = candidateMatchingComps.reduce(
      (sum, comp) => sum + comp.timesPlayed,
      0
    );

    const appearanceRate = totalBaseUses > 0 ? (timesTogether / totalBaseUses) * 100 : 0;
    const weightedWinrate = calculateWeightedWinrate(candidateMatchingComps);
    const confidence = Math.min(Math.log10(timesTogether + 1) / Math.log10(101), 1);
    const adjustedWinRate = 50 + (weightedWinrate - 50) * confidence;
    const synergyScore = adjustedWinRate * 0.45 + appearanceRate * 0.40 + confidence * 100 * 0.15;

    let tag: SynergyTag;
    let explanation: string;

    if (isPartialMatch) {
      tag = 'Pick situacional';
      explanation = `Coincidencia parcial: este agente aparece en composiciones con algunos de tus agentes seleccionados.`;
    } else {
      const labelResult = getRecommendationLabel({
        synergyScore,
        adjustedWinrate: adjustedWinRate,
        weightedWinrate,
        appearanceRate,
        timesTogether,
      });
      tag = labelResult.tag;
      explanation = labelResult.explanation;
    }

    const role = ROLES[agent.title] || 'Unknown';

    let whyThisPick = generateWhyThisPick(agent, selectedAgents, analysis, mapId);

    if (lastPickDecision.isLastPick && lastPickDecision.missingRole) {
      const candidateRoleName = ROLES[agent.title];
      if (lastPickDecision.missingRole !== 'Centinela') {
        if (candidateRoleName === lastPickDecision.recommendedRole) {
          whyThisPick = `[PICK FINAL] ${lastPickDecision.reason} ${whyThisPick}`;
        }
      } else if (lastPickDecision.shouldUseSentinel) {
        if (candidateRoleName === 'Centinela') {
          if (lastPickDecision.topSentinelAgent && agent.title === lastPickDecision.topSentinelAgent) {
            whyThisPick = `[MEJOR CENTINELA] ${lastPickDecision.reason} ${whyThisPick}`;
          } else {
            whyThisPick = `[PICK FINAL] ${lastPickDecision.reason} ${whyThisPick}`;
          }
        }
      } else {
        if (candidateRoleName !== 'Centinela' && candidateRoleName === lastPickDecision.recommendedRole) {
          whyThisPick = `[PICK FINAL] ${lastPickDecision.reason} ${whyThisPick}`;
        }
      }
    }

    const rejectedAlternatives: { agentName: string; reason: string }[] = [];
    sortedCandidates.slice(limit * 2).forEach(([altName, altScore]) => {
      let reason = '';

      if (altScore.redundancyPenalty > candidateScore.redundancyPenalty + 10) {
        reason = 'Mayor penalización por redundancia';
      } else if (altScore.compositionFitScore < candidateScore.compositionFitScore - 15) {
        reason = 'Menor sinergia con tu equipo';
      } else if (altScore.proDataScore < candidateScore.proDataScore - 20) {
        reason = 'Datos pro menos favorables';
      } else if (altScore.mapFitScore < candidateScore.mapFitScore - 15) {
        reason = 'Peor adaptación al mapa';
      } else {
        reason = 'Menor puntuación total';
      }

      rejectedAlternatives.push({ agentName: altName, reason });
    });

    const guideNotes: string[] = [];
    if (mapId) {
      const guide = getAgentMapGuide(agent.title as any, mapId as any);
      if (guide.overview) {
        guideNotes.push(guide.overview);
      }
      if (guide.bestWith.length > 0) {
        guideNotes.push(`Mejores aliados según guías: ${guide.bestWith.join(', ')}`);
      }
    }

    const fullProfile = getFullAgentProfile(agent.title);
    const bestMaps = fullProfile
      ? getBestMaps(agent.title).slice(0, 3).map(m => `${m.map} (${m.score}/10)`)
      : [];
    const directReplacements = fullProfile?.directReplacements || [];

    let proMetaInfo = '';
    if (fullProfile) {
      proMetaInfo = `Pro: ${fullProfile.proPickRate}% pick, ${fullProfile.proWinRate}% win`;
    }

    const utilityDescription = fullProfile
      ? fullProfile.utility.join(', ')
      : '';

    recommendations.push({
      agent: { ...agent, role: role as any },
      synergyScore,
      adjustedWinRate,
      timesTogether,
      appearanceRate,
      sampleScore: confidence * 100,
      tag,
      explanation,
      isPartialMatch,
      candidateScore,
      analysis,
      patternAnalysis,
      whyThisPick: patternAnalysis.patternExplanation
        ? `${patternAnalysis.patternExplanation} ${whyThisPick}`
        : whyThisPick,
      pros: candidateScore.pros,
      cons: candidateScore.cons,
      rejectedAlternatives: rejectedAlternatives.slice(0, 3),
      confidence: candidateScore.confidence,
      matchType: candidateScore.matchType,
      mapFitBoost: candidateScore.mapBoost,
      guideNotes,
      recommendationStrength: candidateScore.recommendationStrength,
      bestMaps,
      directReplacements,
      utilityDescription,
      proMetaInfo,
    });
  });

  return recommendations
    .sort((a, b) => {
      const strengthOrder = { 'must-pick': 0, 'highly-recommended': 1, recommended: 2, situational: 3, risky: 4 };
      const diff = (strengthOrder[a.recommendationStrength] || 0) - (strengthOrder[b.recommendationStrength] || 0);
      if (diff !== 0) return diff;
      return b.candidateScore.finalScore - a.candidateScore.finalScore;
    })
    .slice(0, limit);
};

export { analyzeComposition, getAgentProfile, calculateCandidateScore };
export type { CandidateScore } from './tacticalScoring';
export type { CompositionAnalysis } from './compositionAnalyzer';