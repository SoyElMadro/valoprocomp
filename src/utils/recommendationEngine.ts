import type { Composition, Agent, ScoredComposition, RecommendedAgent, CompositionTag, SynergyRecommendation, SynergyTag } from '../types';

const ROLES: Record<string, string> = {
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
      explanation: `Con solo ${timesTogether} partidas no hay suficiente data. El winrate alto puede ser casualidad.`
    };
  }

  if (timesTogether < 3) {
    return {
      tag: 'Dato limitado',
      explanation: `Muy pocas composiciones con este agente junto a los tuyos. Consideralo solo como opción adicional.`
    };
  }

  if (synergyScore >= 75 && timesTogether >= 15) {
    return {
      tag: 'Mejor sinergia',
      explanation: `Excelente combinación: aparece frecuentemente con tus agentes y tiene buen winrate.`
    };
  }

  if (appearanceRate >= 40 && timesTogether >= 10) {
    return {
      tag: 'Pick meta',
      explanation: `Un pick muy popular que funciona bien con tu equipo. Alta frecuencia de aparición en el meta.`
    };
  }

  if (adjustedWinrate >= 54 && timesTogether >= 8) {
    return {
      tag: 'Pick fuerte',
      explanation: `Buen winrate ajustado con cantidad de partidas decente. Recomendable para composiciones sólidas.`
    };
  }

  if (synergyScore >= 60) {
    return {
      tag: 'Pick recomendable',
      explanation: `Buena opción para completar tu equipo con stats aceptables.`
    };
  }

  if (timesTogether < 8 && adjustedWinrate >= 55) {
    return {
      tag: 'Prometedor, poca muestra',
      explanation: `El winrate es bueno pero la muestra es limitada. Podría ser una opción interesante.`
    };
  }

  return {
    tag: 'Pick situacional',
    explanation: `Funciona en algunos contextos específicos. Evalúa según tu estilo de juego.`
  };
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

export const getSynergyRecommendations = (
  compositions: Composition[],
  selectedAgents: Agent[],
  limit: number = 5
): SynergyRecommendation[] => {
  if (selectedAgents.length === 0) return [];

  const selectedNames = selectedAgents.map(a => a.title.toLowerCase());

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

  const recommendations: SynergyRecommendation[] = [];

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

    const appearanceRate = (timesTogether / totalBaseUses) * 100;
    const weightedWinrate = calculateWeightedWinrate(candidateMatchingComps);
    const confidence = Math.min(Math.log10(timesTogether + 1) / Math.log10(101), 1);
    const adjustedWinRate = 50 + (weightedWinrate - 50) * confidence;
    const synergyScore = adjustedWinRate * 0.45 + appearanceRate * 0.40 + confidence * 100 * 0.15;

    const agent = compositions[0].agents.find(a => a.title.toLowerCase() === agentName);
    if (!agent) return;

    const candidateRole = ROLES[agent.title];
    if (isPartialMatch && candidateRole && roleCount[candidateRole] >= 2) {
      return;
    }

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
    });
  });

  return recommendations
    .sort((a, b) => b.synergyScore - a.synergyScore)
    .slice(0, limit);
};