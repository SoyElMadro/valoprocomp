export type AgentRole = 'Duelista' | 'Controlador' | 'Iniciador' | 'Centinela';

export type TacticalSubrole =
  | 'smoke-block'
  | 'area-denial-smoke'
  | 'wall-place'
  | 'sustained-control'
  | 'flash-initiator'
  | 'recon-initiator'
  | 'damage-initiator'
  | 'anchor-sentinel'
  | 'trap-sentinel'
  | 'support-sentinel'
  | 'entry-duelist'
  | 'mobility-duelist'
  | 'lurk-duelist'
  | 'postplant'
  | 'healing'
  | 'retake'
  | 'area-denial'
  | 'crowd-control';

export interface MapStrength {
  mapId: string;
  strength: number;
}

export interface TacticalProfile {
  agentName: string;
  role: AgentRole;
  subroles: TacticalSubrole[];
  mapStrengths?: MapStrength[];
  synergiesWith: string[];
  redundantWith: string[];
  uniqueStrengths: string[];
  weaknesses: string[];
  description: string;
}

export const CONTROLLER_COMPLEMENT_MAP: Record<string, string[]> = {
  smokeBlock: ['Viper', 'Harbor'],
  wallPlace: ['Miks', 'Brimstone', 'Astra', 'Clove'],
};

export const isComplementaryControllerPair = (agent1: string, agent2: string): boolean => {
  const profile1 = getAgentProfile(agent1);
  const profile2 = getAgentProfile(agent2);

  if (!profile1 || !profile2 || profile1.role !== 'Controlador' || profile2.role !== 'Controlador') {
    return false;
  }

  const subrole1 = profile1.subroles.includes('wall-place') ? 'wallPlace' : 'smokeBlock';
  const subrole2 = profile2.subroles.includes('wall-place') ? 'wallPlace' : 'smokeBlock';

  return subrole1 !== subrole2;
};

export const isRedundantControllerPair = (agent1: string, agent2: string): boolean => {
  const profile1 = getAgentProfile(agent1);
  const profile2 = getAgentProfile(agent2);

  if (!profile1 || !profile2 || profile1.role !== 'Controlador' || profile2.role !== 'Controlador') {
    return false;
  }

  const hasSmokeBlock1 = profile1.subroles.includes('smoke-block');
  const hasSmokeBlock2 = profile2.subroles.includes('smoke-block');
  const hasWallPlace1 = profile1.subroles.includes('wall-place');
  const hasWallPlace2 = profile2.subroles.includes('wall-place');

  if (hasSmokeBlock1 && hasSmokeBlock2 && !hasWallPlace1 && !hasWallPlace2) {
    return true;
  }

  if (hasWallPlace1 && hasWallPlace2) {
    return true;
  }

  return false;
};

export const getComplementaryController = (agentName: string): string | null => {
  const profile = getAgentProfile(agentName);
  if (!profile || profile.role !== 'Controlador') return null;

  if (profile.subroles.includes('smoke-block')) {
    return 'Viper';
  }
  if (profile.subroles.includes('wall-place')) {
    const smokeControllers = ['Miks', 'Brimstone', 'Astra', 'Clove'];
    return smokeControllers[Math.floor(Math.random() * smokeControllers.length)];
  }

  return null;
};

export const getControllerSubrole = (agentName: string): 'smokeBlock' | 'wallPlace' | null => {
  const profile = getAgentProfile(agentName);
  if (!profile || profile.role !== 'Controlador') return null;

  if (profile.subroles.includes('wall-place')) return 'wallPlace';
  if (profile.subroles.includes('smoke-block')) return 'smokeBlock';
  return null;
};

export const AGENT_PROFILES: Record<string, TacticalProfile> = {
  Miks: {
    agentName: 'Miks',
    role: 'Controlador',
    subroles: ['smoke-block', 'healing', 'crowd-control', 'retake'],
    synergiesWith: ['Neon', 'Raze', 'Jett', 'Waylay', 'Tejo', 'Breach', 'KAY/O', 'Gekko'],
    redundantWith: ['Omen', 'Brimstone', 'Astra', 'Clove'],
    uniqueStrengths: [
      'Smokes de controlador para bloquear líneas de visión',
      'Utilidad de apoyo basada en sonido para coordinar pushes',
      'Capacidad de curar aliados desde el rol de controlador',
      'Herramientas de crowd-control para interrumpir posiciones enemigas',
      'Buen valor en executes rápidos y retakes coordinados',
    ],
    weaknesses: [
      'No aporta wall-control persistente como Viper o Harbor',
      'Necesita coordinación para aprovechar bien su utilidad de soporte',
    ],
    description: 'Controlador de soporte basado en sonido. Aporta smokes, curación y crowd-control.',
  },
  Omen: {
    agentName: 'Omen',
    role: 'Controlador',
    subroles: ['smoke-block', 'crowd-control', 'lurk-duelist'],
    synergiesWith: ['Viper', 'Harbor', 'Sova', 'Fade', 'Tejo', 'Skye', 'Gekko'],
    redundantWith: ['Brimstone', 'Astra', 'Clove', 'Miks'],
    uniqueStrengths: [
      'Humos recargables con tiempo de reutilización',
      'Paranoia para habilitar entradas y gather info',
      'Flexibilidad en rondas largas',
      'Capacidad de lurk y flank',
    ],
    weaknesses: [
      'No aporta wall-control persistente como Viper',
      'Menos efectivo en executes rápidos comparado con Brimstone',
    ],
    description: 'Controlador flexible con capacidad de lurk. Aporta humos principales y presión de mapa.',
  },
  Brimstone: {
    agentName: 'Brimstone',
    role: 'Controlador',
    subroles: ['smoke-block', 'area-denial-smoke', 'postplant'],
    synergiesWith: ['Viper', 'Raze', 'Gekko', 'Tejo', 'Jett', 'Neon'],
    redundantWith: ['Omen', 'Astra', 'Clove', 'Miks'],
    uniqueStrengths: [
      'Smokes instantáneos desde cualquier parte del mapa',
      'Molly para post-plant y denying',
      'Stim Beacon para velocidad del equipo',
      'Orbital Strike para negar zonas',
      'Excelente para executes rápidos',
    ],
    weaknesses: [
      'Menos flexible en rondas defensivas',
      'No aporta wall-control como Viper',
    ],
    description: 'Controlador especializado en executes y post-plant.',
  },
  Viper: {
    agentName: 'Viper',
    role: 'Controlador',
    subroles: ['wall-place', 'sustained-control', 'anchor-sentinel', 'postplant'],
    synergiesWith: ['Omen', 'Brimstone', 'Astra', 'Miks', 'Killjoy', 'Cypher', 'Chamber', 'Sage'],
    redundantWith: ['Harbor'],
    uniqueStrengths: [
      'Toxic Screen para control persistente de zonas',
      'Snake Bite para post-plant y denial',
      'Orb de recuperación para anchor',
      'Excelente control de mapa a largo plazo',
    ],
    weaknesses: [
      'Requiere planificación previa para máximo rendimiento',
      'No es un primary-smokes tradicional',
    ],
    description: 'Controladora de pared y mapa. Aporta control persistente, anchor y post-plant.',
  },
  Astra: {
    agentName: 'Astra',
    role: 'Controlador',
    subroles: ['smoke-block', 'crowd-control', 'recon-initiator'],
    synergiesWith: ['Jett', 'Raze', 'KAY/O', 'Sova', 'Viper'],
    redundantWith: ['Omen', 'Brimstone', 'Clove', 'Miks'],
    uniqueStrengths: [
      'Forma Astral para utilidad global desde cualquier lado',
      'Pulsar para executes y separar defenderes',
      'Gravity Well para crowd control',
      'Nebula para smokes a distancia',
    ],
    weaknesses: [
      'Curva de aprendizaje alta',
      'Menos efectiva sin buena coordinación',
    ],
    description: 'Controladora utility-heavy con presencia global.',
  },
  Clove: {
    agentName: 'Clove',
    role: 'Controlador',
    subroles: ['smoke-block', 'postplant', 'healing', 'retake'],
    synergiesWith: ['Jett', 'Neon', 'Raze', 'Phoenix', 'Yoru'],
    redundantWith: ['Omen', 'Brimstone', 'Astra', 'Miks'],
    uniqueStrengths: [
      'Utilidad Post-Muerte',
      'Self-revive capability',
      'Capacidad de heal',
    ],
    weaknesses: [
      'Menos útil en defensa prolongada',
    ],
    description: 'Controladora agresiva con utilidad post-muerte y healing.',
  },
  Harbor: {
    agentName: 'Harbor',
    role: 'Controlador',
    subroles: ['wall-place', 'area-denial', 'retake'],
    synergiesWith: ['Omen', 'Viper', 'Miks', 'Jett', 'Raze', 'Neon'],
    redundantWith: ['Viper'],
    uniqueStrengths: [
      'Coil para control de geometría',
      'High Tide para rushes y entries rápidas',
      'Aporte único de wall-control con paredes destructibles',
    ],
    weaknesses: [
      'Menos efectivo en post-plant que otros controladores',
      'Utility requiere más coordinación',
    ],
    description: 'Controladora de paredes y executes. Aporta control de geometría único.',
  },
  Jett: {
    agentName: 'Jett',
    role: 'Duelista',
    subroles: ['entry-duelist', 'lurk-duelist', 'mobility-duelist'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Skye'],
    redundantWith: ['Neon', 'Raze', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Tailwind para entries instantáneas',
      'Cloudburst para peeks seguros',
      'Drift para plays de lurk',
    ],
    weaknesses: ['Dependiente de habilidad mecánica'],
    description: 'Duelista de entry y mobility.',
  },
  Raze: {
    agentName: 'Raze',
    role: 'Duelista',
    subroles: ['entry-duelist', 'area-denial'],
    synergiesWith: ['Brimstone', 'Sova', 'KAY/O', 'Skye', 'Gekko'],
    redundantWith: ['Jett', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Blast Pack para plays verticales',
      'Paint Shells para area denial',
      'Showstopper para double kills',
    ],
    weaknesses: ['Menos útil en defend sides'],
    description: 'Duelista explosiva. Excelente para crear espacio y presión.',
  },
  Phoenix: {
    agentName: 'Phoenix',
    role: 'Duelista',
    subroles: ['entry-duelist', 'healing'],
    synergiesWith: ['Brimstone', 'Sova', 'KAY/O', 'Gekko'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Curveball para entry seguro',
      'Hot Hands para self-heal',
      'Run it Back para clutch potencial',
    ],
    weaknesses: ['Dependiente de su ultimate para clutch'],
    description: 'Duelista autocontenido para entries agresivas.',
  },
  Reyna: {
    agentName: 'Reyna',
    role: 'Duelista',
    subroles: ['entry-duelist'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Dismiss para picks seguros',
      'Devour para heal post-kill',
      'Leer para información y presión',
    ],
    weaknesses: ['Dependiente de kills para ser efectiva'],
    description: 'Carry duelist para snowball.',
  },
  Yoru: {
    agentName: 'Yoru',
    role: 'Duelista',
    subroles: ['entry-duelist', 'lurk-duelist', 'mobility-duelist'],
    synergiesWith: ['Omen', 'Sova', 'KAY/O', 'Fade'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay'],
    uniqueStrengths: [
      'Fakeout para desinformación',
      'Gatecrash para flanks',
      'Dimensional Drift para lurk',
    ],
    weaknesses: ['Curva de aprendizaje alta'],
    description: 'Flanker y trickster para ataques sorpresa.',
  },
  Iso: {
    agentName: 'Iso',
    role: 'Duelista',
    subroles: ['entry-duelist'],
    synergiesWith: ['Omen', 'Brimstone', 'Viper', 'Sova', 'Tejo'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Contingency para shields',
      'Double Tap para spray control',
    ],
    weaknesses: ['Menos mobility que otros duelistas'],
    description: 'Duelista adaptativo con protección.',
  },
  Neon: {
    agentName: 'Neon',
    role: 'Duelista',
    subroles: ['entry-duelist', 'mobility-duelist'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Miks'],
    redundantWith: ['Jett', 'Raze', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Fast Slide para peeking agresivo',
      'Relay Bolt para información',
      'Overdrive para site takes rápidos',
    ],
    weaknesses: ['Dependiente de mecánica'],
    description: 'Duelista rápido para site hits agresivos.',
  },
  Waylay: {
    agentName: 'Waylay',
    role: 'Duelista',
    subroles: ['entry-duelist', 'crowd-control'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Miks'],
    redundantWith: ['Neon', 'Jett', 'Raze'],
    uniqueStrengths: [
      'Arc Star para daño en burst',
      'Explosive Tag para area denial',
      'Tag Team para soporte al equipo',
    ],
    weaknesses: ['Menos movilidad que otros duelistas'],
    description: 'Duelista agresivo con utilidad de equipo.',
  },
  Sova: {
    agentName: 'Sova',
    role: 'Iniciador',
    subroles: ['recon-initiator', 'damage-initiator'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['Fade', 'Tejo'],
    uniqueStrengths: [
      'Recon Bolt para información de largo alcance',
      'Shock Dart para daño y utilidad',
      'Drone para soporte de execute',
    ],
    weaknesses: ['Menos útil sin coordinación de equipo'],
    description: 'Iniciador recon clásico.',
  },
  Skye: {
    agentName: 'Skye',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'healing'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Breach', 'Tejo', 'Gekko'],
    uniqueStrengths: [
      'Guiding Light para flashes',
      'Healing para soporte de equipo',
      'Tiger para limpieza de zonas',
    ],
    weaknesses: ['No aporta control persistente como Viper'],
    description: 'Iniciador flash y healer.',
  },
  Fade: {
    agentName: 'Fade',
    role: 'Iniciador',
    subroles: ['recon-initiator', 'crowd-control'],
    synergiesWith: ['Jett', 'Raze', 'Omen', 'Brimstone', 'Neon'],
    redundantWith: ['Sova', 'Tejo'],
    uniqueStrengths: [
      'Haunt para control de mapa',
      'Prowler para información y presión',
      'Nightfall para reveal de posiciones',
    ],
    weaknesses: ['Menos útil que Sova para largo alcance'],
    description: 'Iniciador recon y crowd control.',
  },
  Gekko: {
    agentName: 'Gekko',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'area-denial'],
    synergiesWith: ['Jett', 'Raze', 'Neon', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Breach', 'Skye', 'Tejo'],
    uniqueStrengths: [
      'Wingman para multi-tarea',
      'Dizzy para flashes',
      'Thrash para soporte de execute',
    ],
    weaknesses: ['Menos efectivo en retake que otros'],
    description: 'Iniciador multi-utility flexible con site execution.',
  },
  KAY_O: {
    agentName: 'KAY/O',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'damage-initiator', 'crowd-control'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['Skye', 'Breach', 'Gekko', 'Tejo'],
    uniqueStrengths: [
      'Flashpoint para flashes de equipo',
      'Zero/point para información',
      'FRAG/ment para daño',
      'Reset para clutch potencial',
    ],
    weaknesses: ['Dependiente de su utilidad de combate'],
    description: 'Iniciador agresivo con utilidad de combate.',
  },
  Tejo: {
    agentName: 'Tejo',
    role: 'Iniciador',
    subroles: ['damage-initiator', 'crowd-control', 'area-denial'],
    synergiesWith: ['Omen', 'Brimstone', 'Viper', 'Jett', 'Neon', 'Miks'],
    redundantWith: ['Skye', 'Breach', 'KAY/O', 'Gekko'],
    uniqueStrengths: [
      'Volatile Charge para execute',
      'Concussion para setup',
      'Spotter para información',
    ],
    weaknesses: ['Puede necesitar coordinación de equipo'],
    description: 'Iniciador focused en execute con area control.',
  },
  Breach: {
    agentName: 'Breach',
    role: 'Iniciador',
    subroles: ['damage-initiator', 'crowd-control'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Skye', 'Tejo', 'Gekko'],
    uniqueStrengths: [
      'Aftershock para limpieza de áreas',
      'Fault Line para crowd control',
      'Rolling Thunder para team fight',
    ],
    weaknesses: ['Menos útil para información que recons'],
    description: 'Iniciador de damage y crowd control.',
  },
  Cypher: {
    agentName: 'Cypher',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'anchor-sentinel'],
    synergiesWith: ['Omen', 'Viper', 'Brimstone', 'Sova', 'Killjoy'],
    redundantWith: ['Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Trapwire para rotations',
      'Cyber Cage para información',
      'Spy Camera para control de mapa',
    ],
    weaknesses: ['Menos útil en lado attack'],
    description: 'Centinela clásico con información y denial.',
  },
  Killjoy: {
    agentName: 'Killjoy',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'anchor-sentinel', 'postplant'],
    synergiesWith: ['Omen', 'Viper', 'Brimstone', 'Sova', 'Cypher'],
    redundantWith: ['Cypher', 'Chamber', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Turret para información y daño',
      'Alarmbot para detección',
      'Nanoswarm para post-plant',
      'Lockdown para retake',
    ],
    weaknesses: ['Dependiente de setup'],
    description: 'Centinela defensivo con post-plant fuerte.',
  },
  Chamber: {
    agentName: 'Chamber',
    role: 'Centinela',
    subroles: ['lurk-duelist', 'postplant'],
    synergiesWith: ['Omen', 'Viper', 'Sova', 'Fade'],
    redundantWith: ['Cypher', 'Killjoy', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Headhunter para plays con OP',
      'Trademark para teleport trap',
      'Rendezvous para rotations',
    ],
    weaknesses: ['Menos utility de stall que otros'],
    description: 'Centinela híbrido con firepower de duelist.',
  },
  Sage: {
    agentName: 'Sage',
    role: 'Centinela',
    subroles: ['healing', 'retake'],
    synergiesWith: ['All'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Healing para sostenimiento de equipo',
      'Slow Orb para defensa',
      'Barrier Orb para setup de site',
      'Resurrection para clutch potencial',
    ],
    weaknesses: ['Menos utility de información que Cypher/Killjoy'],
    description: 'Centinela support con healing y utility.',
  },
  Deadlock: {
    agentName: 'Deadlock',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'area-denial'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'GravNet para pulling enemies',
      'Sensor Neuron para información',
      'Barrier Mesh para rotations',
    ],
    weaknesses: ['Menos información que Cypher'],
    description: 'Centinela de denial de área.',
  },
  Veto: {
    agentName: 'Veto',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'recon-initiator', 'postplant'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Vyse'],
    uniqueStrengths: [
      'Outpost para multi-información',
      'Abyss para picks tardíos',
    ],
    weaknesses: ['Menos utility de denial que otros'],
    description: 'Centinela informativo con impacto tardío.',
  },
  Vyse: {
    agentName: 'Vyse',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'crowd-control'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Veto'],
    uniqueStrengths: [
      'Arc Rose para stall de área',
      'Shear para seguridad',
      'Ambush para kills sorpresa',
    ],
    weaknesses: ['Menos información que Cypher'],
    description: 'Centinela de control de área con stall fuerte.',
  },
};

export const getAgentProfile = (agentName: string): TacticalProfile | undefined => {
  return AGENT_PROFILES[agentName];
};

export const getSubroleWeight = (subrole: TacticalSubrole): number => {
  const weights: Record<TacticalSubrole, number> = {
    'smoke-block': 10,
    'area-denial-smoke': 7,
    'wall-place': 8,
    'sustained-control': 6,
    'flash-initiator': 4,
    'recon-initiator': 4,
    'damage-initiator': 4,
    'anchor-sentinel': 6,
    'trap-sentinel': 3,
    'support-sentinel': 3,
    'entry-duelist': 6,
    'mobility-duelist': 4,
    'lurk-duelist': 4,
    'postplant': 3,
    'healing': 2,
    'retake': 3,
    'area-denial': 3,
    'crowd-control': 2,
  };
  return weights[subrole] || 1;
};