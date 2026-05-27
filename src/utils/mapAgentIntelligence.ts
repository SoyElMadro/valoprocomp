import type { Agent } from '../types';
import {
  getFullAgentProfile,
  getMapRatings,
  getBestMaps,
  getWeakMaps,
  type ActiveMapName,
} from './fullAgentData';
import { getAgentProfile } from './agentProfiles';

export {
  type ActiveMapName,
  type FullAgentProfile,
  getFullAgentProfile,
  getMapRatings,
  getMultiMapScore,
  getBestMaps,
  getWeakMaps,
  isDirectReplacement,
} from './fullAgentData';

export interface MapRequirements {
  needs: {
    entry: boolean;
    wallControl: boolean;
    smokeBlock: boolean;
    flash: boolean;
    recon: boolean;
    anchor: boolean;
    postplant: boolean;
    mapControl: boolean;
    verticalControl: boolean;
  };
  description: string;
  optimalComposition: {
    controllers: string[];
    initiators: string[];
    duelists: string[];
    sentinels: string[];
  };
  metaArchetype: string;
}

export const MAP_REQUIREMENTS: Record<ActiveMapName, MapRequirements> = {
  Ascent: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Mid control es crucial. Priorizar info y smokes para splits antes de commits obvios.',
    optimalComposition: {
      controllers: ['Omen', 'Astra', 'Viper'],
      initiators: ['Sova', 'KAY/O', 'Breach', 'Skye'],
      duelists: ['Jett', 'Neon', 'Raze', 'Yoru'],
      sentinels: ['Killjoy', 'Cypher', 'Chamber'],
    },
    metaArchetype: 'Double initiator + Sova + Jett + Omen + Killjoy',
  },
  Bind: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: false,
      anchor: false,
      postplant: true,
      mapControl: false,
      verticalControl: false,
    },
    description: 'Sin mid tradicional. Teleporters para rotaciones rápidas y executes por dos frentes.',
    optimalComposition: {
      controllers: ['Brimstone', 'Clove', 'Astra', 'Miks'],
      initiators: ['Fade', 'Breach', 'Gekko', 'Skye'],
      duelists: ['Jett', 'Neon', 'Reyna', 'Raze'],
      sentinels: ['Chamber', 'Killjoy', 'Cypher'],
    },
    metaArchetype: 'Double controller + Raze/Breach + sentinel',
  },
  Breeze: {
    needs: {
      entry: true,
      wallControl: true,
      smokeBlock: false,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Líneas largas abiertas. Wall control y cuts de visión son esenciales. Viper indispensable.',
    optimalComposition: {
      controllers: ['Viper', 'Harbor', 'Astra'],
      initiators: ['Sova', 'Fade', 'KAY/O', 'Skye'],
      duelists: ['Jett', 'Neon', 'Raze'],
      sentinels: ['Cypher', 'Killjoy', 'Chamber'],
    },
    metaArchetype: 'Double wall (Viper + Harbor) + Sova + Jett + Killjoy',
  },
  Fracture: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: false,
      verticalControl: false,
    },
    description: 'Pincers coordinados desde dos frentes. Breach + Raze es core. Coverage de flancos crítico.',
    optimalComposition: {
      controllers: ['Brimstone', 'Omen', 'Clove', 'Miks'],
      initiators: ['Breach', 'Fade', 'Gekko'],
      duelists: ['Raze', 'Neon', 'Jett'],
      sentinels: ['Killjoy', 'Cypher', 'Deadlock'],
    },
    metaArchetype: 'Double initiator (Breach/Gekko) + Brimstone + Raze + Killjoy',
  },
  Haven: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: '3 sites: info temprana y fakes castigan rotaciones largas. Cypher es muy fuerte aquí.',
    optimalComposition: {
      controllers: ['Omen', 'Astra', 'Clove', 'Viper'],
      initiators: ['Sova', 'Fade', 'KAY/O', 'Breach', 'Skye'],
      duelists: ['Jett', 'Yoru', 'Neon', 'Iso'],
      sentinels: ['Cypher', 'Killjoy', 'Chamber'],
    },
    metaArchetype: '1 controller + 2 initiator + Jett/Yoru + Cypher',
  },
  Icebox: {
    needs: {
      entry: true,
      wallControl: true,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: true,
    },
    description: 'Verticalidad clave. Viper wall es casi obligatoria. Mid/tube control define rondas.',
    optimalComposition: {
      controllers: ['Viper', 'Omen', 'Astra'],
      initiators: ['Sova', 'Gekko', 'Skye'],
      duelists: ['Jett', 'Neon', 'Raze'],
      sentinels: ['Killjoy', 'Chamber', 'Sage'],
    },
    metaArchetype: 'Viper + Omen double controller + Sova + Jett + Killjoy',
  },
  Lotus: {
    needs: {
      entry: true,
      wallControl: true,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Control central y puertas. A requiere validación post-12.05. Fade muy fuerte aquí.',
    optimalComposition: {
      controllers: ['Omen', 'Viper', 'Clove', 'Harbor'],
      initiators: ['Fade', 'Breach', 'Gekko', 'Sova'],
      duelists: ['Raze', 'Jett', 'Neon'],
      sentinels: ['Killjoy', 'Cypher', 'Vyse'],
    },
    metaArchetype: 'Viper + Omen/Clove double controller + Fade + Raze + sentinel',
  },
  Pearl: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Mid control para reducir rotaciones largas. Astra tiene presencia global valiosa.',
    optimalComposition: {
      controllers: ['Astra', 'Omen', 'Clove', 'Viper'],
      initiators: ['Sova', 'KAY/O', 'Fade', 'Skye'],
      duelists: ['Jett', 'Neon', 'Raze'],
      sentinels: ['Cypher', 'Killjoy', 'Chamber'],
    },
    metaArchetype: 'Astra/Omen + Sova + Jett + Killjoy + initiator',
  },
  Split: {
    needs: {
      entry: true,
      wallControl: true,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: true,
    },
    description: 'Mid/alturas definen el valor de cualquier agente. Viper wall + Raze satchel son core.',
    optimalComposition: {
      controllers: ['Viper', 'Omen', 'Brimstone', 'Miks'],
      initiators: ['Breach', 'Gekko', 'Sova', 'Skye'],
      duelists: ['Raze', 'Jett', 'Neon'],
      sentinels: ['Killjoy', 'Cypher', 'Sage'],
    },
    metaArchetype: 'Viper + Omen double controller + Breach + Raze + Cypher',
  },
  Sunset: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Mid control crucial. Mapa compacto, gunfights directos. Neon y Clove destacan aquí.',
    optimalComposition: {
      controllers: ['Omen', 'Clove', 'Astra', 'Brimstone'],
      initiators: ['Fade', 'Gekko', 'Breach', 'Skye'],
      duelists: ['Neon', 'Jett', 'Raze'],
      sentinels: ['Cypher', 'Killjoy', 'Chamber'],
    },
    metaArchetype: 'Clove/Omen + Gekko/Skye + Neon + Cypher + initiator',
  },
  Abyss: {
    needs: {
      entry: true,
      wallControl: false,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Sin bordes. Knockback al vacío es letal. Operator en mid es clave. Chamber + Jett fuertes.',
    optimalComposition: {
      controllers: ['Astra', 'Omen', 'Clove', 'Miks'],
      initiators: ['Tejo', 'Sova', 'Fade', 'Skye'],
      duelists: ['Jett', 'Neon', 'Reyna'],
      sentinels: ['Chamber', 'Killjoy', 'Cypher'],
    },
    metaArchetype: 'Tejo + Clove + Jett + Chamber + initiator',
  },
  Corrode: {
    needs: {
      entry: true,
      wallControl: true,
      smokeBlock: true,
      flash: true,
      recon: true,
      anchor: true,
      postplant: true,
      mapControl: true,
      verticalControl: false,
    },
    description: 'Defender-sided: B es fortaleza, mid conecta todo. Paredes penetrables (Odin spam).',
    optimalComposition: {
      controllers: ['Viper', 'Omen', 'Harbor', 'Astra'],
      initiators: ['Breach', 'Fade', 'Sova', 'KAY/O'],
      duelists: ['Neon', 'Raze', 'Jett'],
      sentinels: ['Killjoy', 'Chamber', 'Cypher'],
    },
    metaArchetype: 'Double wall (Viper/Harbor) + Breach + Neon + Killjoy',
  },
};

export const getMapRequirements = (map: ActiveMapName): MapRequirements => MAP_REQUIREMENTS[map];

export const calculateMapFitScore = (
  agent: Agent,
  map: ActiveMapName,
  selectedAgents: Agent[]
): { score: number; reasons: string[]; boost: number } => {
  const fullProfile = getFullAgentProfile(agent.title);
  const profile = getAgentProfile(agent.title);
  const requirements = MAP_REQUIREMENTS[map];

  if (!requirements) {
    return { score: 50, reasons: ['Mapa no encontrado en datos tácticos'], boost: 0 };
  }

  if (!profile || !fullProfile) {
    return { score: 50, reasons: ['No hay datos del agente'], boost: 0 };
  }

  let baseScore = 50;
  const reasons: string[] = [];
  let boost = 0;

  const mapRating = getMapRatings(agent.title, map);
  const normalizedRating = mapRating * 10;
  baseScore += (normalizedRating - 50) * 0.3;
  if (mapRating >= 8) {
    reasons.push(`Puntuación en ${map}: ${mapRating}/10 - excelente elección`);
    boost += 15;
  } else if (mapRating >= 6) {
    reasons.push(`Puntuación en ${map}: ${mapRating}/10 - elección sólida`);
    boost += 5;
  } else if (mapRating <= 4) {
    reasons.push(`Puntuación en ${map}: ${mapRating}/10 - no es ideal para este mapa`);
    boost -= 10;
  }

  const isInOptimal = Object.values(requirements.optimalComposition).some(list =>
    list.some(name => name.toLowerCase() === agent.title.toLowerCase())
  );
  if (isInOptimal) {
    baseScore += 15;
    reasons.push(`${agent.title} es óptimo para ${map} según datos pro`);
    boost += 15;
  }

  if (fullProfile.bestWith.length > 0) {
    const selectedNames = selectedAgents.map(a => a.title);
    const synergies = fullProfile.bestWith.filter(name =>
      selectedNames.some(s => s.toLowerCase() === name.toLowerCase())
    );
    if (synergies.length > 0) {
      baseScore += synergies.length * 5;
      reasons.push(`Sinergiza con: ${synergies.join(', ')} (recomendación pro)`);
      boost += synergies.length * 5;
    }
  }

  if (requirements.needs.wallControl && fullProfile.utility.includes('wall-place')) {
    baseScore += 15;
    reasons.push('Añade wall-control esencial para este mapa');
    boost += 15;
  }

  if (requirements.needs.verticalControl && fullProfile.utility.includes('mobility')) {
    baseScore += 10;
    reasons.push('Aporta control vertical para este mapa');
    boost += 10;
  }

  if (requirements.needs.recon && fullProfile.utility.includes('recon')) {
    baseScore += 10;
    reasons.push('Aporta recon esencial para este mapa');
    boost += 10;
  }

  if (requirements.needs.flash && fullProfile.utility.includes('flash')) {
    baseScore += 10;
    reasons.push('Aporta flash esencial para este mapa');
    boost += 10;
  }

  if (requirements.needs.anchor && fullProfile.utility.includes('anchor')) {
    baseScore += 10;
    reasons.push('Aporta anchor esencial para este mapa');
    boost += 10;
  }

  if (fullProfile.proPickRate > 10) {
    baseScore += 5;
    reasons.push(`Pick rate pro alto: ${fullProfile.proPickRate}%`);
    boost += 5;
  }

  if (fullProfile.proWinRate > 51) {
    baseScore += 5;
    reasons.push(`Win rate pro positivo: ${fullProfile.proWinRate}%`);
    boost += 5;
  }

  return {
    score: Math.max(0, Math.min(100, baseScore)),
    reasons,
    boost,
  };
};

export const getCompositionContextScore = (
  agent: Agent,
  _selectedAgents: Agent[],
  map: ActiveMapName | undefined
): { score: number; context: string } => {
  if (!map) {
    return { score: 50, context: 'Sin mapa específico' };
  }

  const fullProfile = getFullAgentProfile(agent.title);
  if (!fullProfile) return { score: 50, context: 'Sin datos del agente' };

  const mapRating = getMapRatings(agent.title, map);
  const mapScore = mapRating * 10;

  let archetypeBonus = 0;
  const requirements = MAP_REQUIREMENTS[map];
  if (!requirements) {
    return { score: 50, context: `${map} no tiene datos de composición` };
  }
  const isInOptimal = Object.values(requirements.optimalComposition).some(list =>
    list.some(name => name.toLowerCase() === agent.title.toLowerCase())
  );
  if (isInOptimal) {
    archetypeBonus = 20;
  }

  return {
    score: Math.min(100, mapScore * 0.6 + archetypeBonus * 0.4),
    context: isInOptimal
      ? `${agent.title} es pick óptimo para la composición típica de ${map}`
      : `${agent.title} tiene rating ${mapRating}/10 en ${map}`,
  };
};

export const getMissingFunctionsForMap = (
  selectedAgents: Agent[],
  map: ActiveMapName
): string[] => {
  const requirements = MAP_REQUIREMENTS[map];
  if (!requirements) return [];

  const selected = selectedAgents.map(a => getFullAgentProfile(a.title)).filter(Boolean);

  const missing: string[] = [];
  const allUtility = new Set<string>();
  selected.forEach(p => p?.utility.forEach(u => allUtility.add(u)));

  const hasEntry = allUtility.has('entry');
  const hasFlash = allUtility.has('flash');
  const hasRecon = allUtility.has('recon');
  const hasAnchor = allUtility.has('anchor');
  const hasWallControl = allUtility.has('wall-place');
  const hasSmokeBlock = allUtility.has('smoke-block');
  const hasPostplant = allUtility.has('postplant');

  if (requirements.needs.entry && !hasEntry) missing.push('Entry fragger');
  if (requirements.needs.flash && !hasFlash) missing.push('Flash initiator');
  if (requirements.needs.recon && !hasRecon) missing.push('Recon initiator');
  if (requirements.needs.anchor && !hasAnchor) missing.push('Anchor sentinel');
  if (requirements.needs.wallControl && !hasWallControl) missing.push('Wall controller (Viper/Harbor)');
  if (requirements.needs.smokeBlock && !hasSmokeBlock) missing.push('Smoke controller');
  if (requirements.needs.postplant && !hasPostplant) missing.push('Post-plant utility');

  return missing;
};

export const getAgentMapSynergy = (
  candidate: Agent,
  selectedAgents: Agent[],
  map: ActiveMapName | undefined
): {
  score: number;
  roleScore: number;
  mapScore: number;
  compositionScore: number;
  finalScore: number;
} => {
  const fullProfile = getFullAgentProfile(candidate.title);

  let roleScore = 50;
  if (fullProfile) {
    if (fullProfile.role === 'Duelista') roleScore = 60;
    else if (fullProfile.role === 'Controlador') roleScore = 60;
    else if (fullProfile.role === 'Iniciador') roleScore = 55;
    else if (fullProfile.role === 'Centinela') roleScore = 55;
  }

  const mapData = map ? calculateMapFitScore(candidate, map, selectedAgents) : { score: 50, reasons: [], boost: 0 };
  const mapScore = mapData.score;

  const compData = getCompositionContextScore(candidate, selectedAgents, map);
  const compositionScore = compData.score;

  const finalScore = (roleScore * 0.15) + (mapScore * 0.50) + (compositionScore * 0.35);

  return {
    score: Math.max(0, Math.min(100, finalScore)),
    roleScore,
    mapScore,
    compositionScore,
    finalScore,
  };
};

export const getMapDescription = (map: ActiveMapName): string => {
  return MAP_REQUIREMENTS[map]?.description || '';
};

export const getBestMapsForAgent = (agentName: string): string[] => {
  return getBestMaps(agentName).map(m => m.map);
};

export const getWeakMapsForAgent = (agentName: string): string[] => {
  return getWeakMaps(agentName).map(m => m.map);
};