import type { Composition, Agent } from '../types';

export interface RolePattern {
  pattern: string;
  controller: number;
  initiator: number;
  duelist: number;
  sentinel: number;
  frequency: number;
  totalTimesPlayed: number;
  avgWinRate: number;
  avgPickRate: number;
  score: number;
}

export interface RolePatternAnalysis {
  patterns: RolePattern[];
  mostCommonPattern: RolePattern | null;
  topPatterns: RolePattern[];
  userPattern: {
    controller: number;
    initiator: number;
    duelist: number;
    sentinel: number;
  };
  userHasFlash: boolean;
  compositionsWithFlashPercent: number;
  missingRoles: string[];
  patternExplanation: string;
}

export const getRoleFromAgent = (agent: Agent): 'controller' | 'initiator' | 'duelist' | 'sentinel' => {
  const roleMap: Record<string, 'controller' | 'initiator' | 'duelist' | 'sentinel'> = {
    Astra: 'controller',
    Brimstone: 'controller',
    Viper: 'controller',
    Omen: 'controller',
    Clove: 'controller',
    Harbor: 'controller',
    Breach: 'initiator',
    Fade: 'initiator',
    Gekko: 'initiator',
    KAY_O: 'initiator',
    Skye: 'initiator',
    Sova: 'initiator',
    Tejo: 'initiator',
    Jett: 'duelist',
    Raze: 'duelist',
    Phoenix: 'duelist',
    Reyna: 'duelist',
    Yoru: 'duelist',
    Iso: 'duelist',
    Neon: 'duelist',
    Waylay: 'duelist',
    Cypher: 'sentinel',
    Killjoy: 'sentinel',
    Chamber: 'sentinel',
    Sage: 'sentinel',
    Deadlock: 'sentinel',
    Veto: 'sentinel',
    Vyse: 'sentinel',
  };

  return roleMap[agent.title] || 'controller';
};

const FLASH_AGENTS = ['Phoenix', 'Reyna', 'Yoru', 'Breach', 'Skye', 'KAY/O', 'Gekko', 'Omen', 'Vyse'];

export const hasFlashAbility = (agent: Agent): boolean => {
  return FLASH_AGENTS.includes(agent.title);
};

export const getRolePatternKey = (composition: Composition): string => {
  const counts = {
    controller: 0,
    initiator: 0,
    duelist: 0,
    sentinel: 0,
  };

  composition.agents.forEach(agent => {
    const role = getRoleFromAgent(agent);
    counts[role]++;
  });

  return `${counts.controller}C-${counts.initiator}I-${counts.duelist}D-${counts.sentinel}S`;
};

export const analyzeRolePatterns = (
  compositions: Composition[],
  selectedAgents: Agent[]
): RolePatternAnalysis => {
  if (compositions.length === 0) {
    return {
      patterns: [],
      mostCommonPattern: null,
      topPatterns: [],
      userPattern: { controller: 0, initiator: 0, duelist: 0, sentinel: 0 },
      userHasFlash: false,
      compositionsWithFlashPercent: 0,
      missingRoles: [],
      patternExplanation: '',
    };
  }

  const patternMap = new Map<string, {
    count: number;
    totalTimesPlayed: number;
    totalWinRate: number;
    totalPickRate: number;
    controller: number;
    initiator: number;
    duelist: number;
    sentinel: number;
    totalWithFlash: number;
  }>();

  compositions.forEach(comp => {
    const key = getRolePatternKey(comp);
    const timesPlayed = comp.timesPlayed;
    const winRate = parseFloat(comp.winRate);
    const pickRate = parseFloat(comp.pickRate);

    const counts = {
      controller: 0,
      initiator: 0,
      duelist: 0,
      sentinel: 0,
    };
    comp.agents.forEach(agent => {
      const role = getRoleFromAgent(agent);
      counts[role]++;
    });

    const hasFlash = comp.agents.some(agent => hasFlashAbility(agent));

    const existing = patternMap.get(key) || {
      count: 0,
      totalTimesPlayed: 0,
      totalWinRate: 0,
      totalPickRate: 0,
      controller: counts.controller,
      initiator: counts.initiator,
      duelist: counts.duelist,
      sentinel: counts.sentinel,
      totalWithFlash: 0,
    };

    patternMap.set(key, {
      count: existing.count + 1,
      totalTimesPlayed: existing.totalTimesPlayed + timesPlayed,
      totalWinRate: existing.totalWinRate + winRate * timesPlayed,
      totalPickRate: existing.totalPickRate + pickRate * timesPlayed,
      controller: counts.controller,
      initiator: counts.initiator,
      duelist: counts.duelist,
      sentinel: counts.sentinel,
      totalWithFlash: existing.totalWithFlash + (hasFlash ? timesPlayed : 0),
    });
  });

  const patterns: RolePattern[] = Array.from(patternMap.entries()).map(([pattern, data]) => {
    const avgWinRate = data.totalTimesPlayed > 0 ? data.totalWinRate / data.totalTimesPlayed : 0;
    const avgPickRate = data.totalTimesPlayed > 0 ? data.totalPickRate / data.totalTimesPlayed : 0;

    const frequencyScore = (data.count / compositions.length) * 30;
    const winRateScore = Math.min(avgWinRate / 100, 1) * 30;
    const pickRateScore = Math.min(avgPickRate / 10, 1) * 20;
    const sampleScore = Math.min(data.totalTimesPlayed / 200, 1) * 20;

    const score = frequencyScore + winRateScore + pickRateScore + sampleScore;

    return {
      pattern,
      controller: data.controller,
      initiator: data.initiator,
      duelist: data.duelist,
      sentinel: data.sentinel,
      frequency: data.count,
      totalTimesPlayed: data.totalTimesPlayed,
      avgWinRate,
      avgPickRate,
      score,
    };
  });

  patterns.sort((a, b) => b.score - a.score);

  const userCounts = {
    controller: 0,
    initiator: 0,
    duelist: 0,
    sentinel: 0,
  };

  selectedAgents.forEach(agent => {
    const role = getRoleFromAgent(agent);
    userCounts[role]++;
  });

  const userHasFlash = selectedAgents.some(agent => hasFlashAbility(agent));

  const missingRoles: string[] = [];
  if (patterns.length > 0) {
    const topPattern = patterns[0];

    if (topPattern.controller > userCounts.controller) {
      missingRoles.push('Controlador');
    }
    if (topPattern.initiator > userCounts.initiator) {
      missingRoles.push('Iniciador');
    }
    if (topPattern.duelist > userCounts.duelist) {
      missingRoles.push('Duelista');
    }
    if (topPattern.sentinel > userCounts.sentinel) {
      missingRoles.push('Centinela');
    }
  }

  let patternExplanation = '';
  if (patterns.length > 0 && selectedAgents.length > 0) {
    const top = patterns[0];
    patternExplanation = `En este mapa, el patrón más común entre las mejores composiciones es ${top.controller} Controlador${top.controller !== 1 ? 'es' : ''}, ${top.initiator} Iniciador${top.initiator !== 1 ? 'es' : ''}, ${top.duelist} Duelista${top.duelist !== 1 ? 's' : ''} y ${top.sentinel} Centinela${top.sentinel !== 1 ? 's' : ''}. `;

    if (missingRoles.length > 0) {
      patternExplanation += `Tu equipo tiene ${userCounts.controller} Controlador${userCounts.controller !== 1 ? 'es' : ''}, ${userCounts.initiator} Iniciador${userCounts.initiator !== 1 ? 'es' : ''}, ${userCounts.duelist} Duelista${userCounts.duelist !== 1 ? 's' : ''} y ${userCounts.sentinel} Centinela${userCounts.sentinel !== 1 ? 's' : ''}. `;
      patternExplanation += `Por eso se prioriza un ${missingRoles.join(' o ')}.`;
    } else {
      patternExplanation += 'Tu composición ya coincide con el patrón más común.';
    }
  }

  const totalTimesPlayed = patterns.reduce((sum, p) => sum + p.totalTimesPlayed, 0);
  const compositionsWithFlashPercent = totalTimesPlayed > 0
    ? (patterns.reduce((sum, p) => {
        const patternData = Array.from(patternMap.values()).find(d =>
          d.controller === p.controller &&
          d.initiator === p.initiator &&
          d.duelist === p.duelist &&
          d.sentinel === p.sentinel
        );
        return sum + (patternData?.totalWithFlash || 0);
      }, 0) / totalTimesPlayed) * 100
    : 0;

  return {
    patterns,
    mostCommonPattern: patterns[0] || null,
    topPatterns: patterns.slice(0, 3),
    userPattern: userCounts,
    userHasFlash,
    compositionsWithFlashPercent,
    missingRoles,
    patternExplanation,
  };
};

export const getRoleBoost = (
  candidateRole: 'controller' | 'initiator' | 'duelist' | 'sentinel',
  patternAnalysis: RolePatternAnalysis
): number => {
  if (!patternAnalysis.mostCommonPattern || patternAnalysis.missingRoles.length === 0) {
    return 0;
  }

  const roleNames: Record<string, string> = {
    controller: 'Controlador',
    initiator: 'Iniciador',
    duelist: 'Duelista',
    sentinel: 'Centinela',
  };

  const roleName = roleNames[candidateRole];
  const isMissing = patternAnalysis.missingRoles.includes(roleName);

  if (isMissing) {
    const topPattern = patternAnalysis.mostCommonPattern;
    const importance = topPattern.score / 100;
    return 20 * importance;
  }

  return 0;
};

export const getRolePenalty = (
  candidateRole: 'controller' | 'initiator' | 'duelist' | 'sentinel',
  patternAnalysis: RolePatternAnalysis
): number => {
  if (!patternAnalysis.mostCommonPattern) {
    return 0;
  }

  const userCounts = patternAnalysis.userPattern;
  const topPattern = patternAnalysis.mostCommonPattern;

  const roleKey = candidateRole === 'controller' ? 'controller' :
                  candidateRole === 'initiator' ? 'initiator' :
                  candidateRole === 'duelist' ? 'duelist' : 'sentinel';

  const userCount = userCounts[roleKey];
  const patternCount = topPattern[roleKey];

  if (userCount > patternCount && patternCount > 0) {
    return (userCount - patternCount) * 10;
  }

  return 0;
};