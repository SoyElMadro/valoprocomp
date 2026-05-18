export type AgentRole = 'Duelista' | 'Controlador' | 'Iniciador' | 'Centinela';

export type TacticalSubrole =
  | 'primary-smokes'
  | 'execute-smokes'
  | 'secondary-controller'
  | 'flex-controller'
  | 'wall-controller'
  | 'anchor'
  | 'site-anchor'
  | 'lurker'
  | 'entry'
  | 'space-creator'
  | 'mobility-duelist'
  | 'fast-execute'
  | 'clear-space'
  | 'recon'
  | 'flash-initiator'
  | 'blind-support'
  | 'damage-utility'
  | 'trap-sentinel'
  | 'flank-watch'
  | 'postplant'
  | 'map-control'
  | 'execute-support'
  | 'healing'
  | 'support'
  | 'retake-support'
  | 'stall'
  | 'crowd-control'
  | 'area-denial'
  | 'anti-push';

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

export const COMPLEMENTARY_CONTROLLER_PAIRS = [
  ['Omen', 'Viper'],
  ['Brimstone', 'Viper'],
  ['Astra', 'Viper'],
  ['Omen', 'Harbor'],
  ['Clove', 'Viper'],
  ['Brimstone', 'Harbor'],
  ['Miks', 'Viper'],
  ['Miks', 'Harbor'],
];

export const REDUNDANT_CONTROLLER_PAIRS = [
  ['Omen', 'Brimstone'],
  ['Omen', 'Astra'],
  ['Omen', 'Clove'],
  ['Brimstone', 'Astra'],
  ['Brimstone', 'Clove'],
  ['Astra', 'Clove'],
  ['Harbor', 'Viper'],
  ['Miks', 'Omen'],
  ['Miks', 'Brimstone'],
  ['Miks', 'Astra'],
  ['Miks', 'Clove'],
];

export const isComplementaryControllerPair = (agent1: string, agent2: string): boolean => {
  return COMPLEMENTARY_CONTROLLER_PAIRS.some(
    pair => (pair[0] === agent1 && pair[1] === agent2) ||
      (pair[0] === agent2 && pair[1] === agent1)
  );
};

export const isRedundantControllerPair = (agent1: string, agent2: string): boolean => {
  return REDUNDANT_CONTROLLER_PAIRS.some(
    pair => (pair[0] === agent1 && pair[1] === agent2) ||
      (pair[0] === agent2 && pair[1] === agent1)
  );
};

export const AGENT_PROFILES: Record<string, TacticalProfile> = {
  Miks: {
    agentName: 'Miks',
    role: 'Controlador',
    subroles: [
      'primary-smokes',
      'flex-controller',
      'execute-support',
      'support',
      'healing',
      'crowd-control',
      'retake-support',
      'fast-execute',
    ],
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
      'Puede ser redundante si el equipo ya tiene un controlador de humos principales',
      'No aporta wall-control persistente como Viper o Harbor',
      'Necesita coordinación para aprovechar bien su utilidad de soporte',
      'Puede pisarse con iniciadores de crowd-control si la composición ya tiene demasiado setup',
    ],
    description:
      'Controlador de soporte basado en sonido. Aporta smokes, curación, apoyo al equipo y crowd-control para executes y retakes coordinados.',
  },
  Omen: {
    agentName: 'Omen',
    role: 'Controlador',
    subroles: ['primary-smokes', 'flex-controller', 'lurker', 'blind-support', 'map-control'],
    synergiesWith: ['Viper', 'Harbor', 'Sova', 'Fade', 'Tejo', 'Skye', 'Gekko'],
    redundantWith: ['Brimstone', 'Astra', 'Clove'],
    uniqueStrengths: [
      'Humos recargables con tiempo de reutilización',
      'Paranoia para habilitar entradas y gather info',
      'Flexibilidad en rondas largas',
      'Capacidad de lurk y flank',
      'Presión de mapa con cobertura global',
    ],
    weaknesses: [
      'No aporta wall-control persistente como Viper',
      'Puede solaparse con otros controladores de humos principales',
      'Menos efectivo en executes rápidos comparado con Brimstone',
    ],
    description: 'Controlador flexible con capacidad de lurk. Aporta humos principales y presión de mapa.',
  },
  Brimstone: {
    agentName: 'Brimstone',
    role: 'Controlador',
    subroles: ['primary-smokes', 'execute-smokes', 'postplant', 'damage-utility', 'fast-execute'],
    synergiesWith: ['Viper', 'Raze', 'Gekko', 'Tejo', 'Jett', 'Neon'],
    redundantWith: ['Omen', 'Astra', 'Clove'],
    uniqueStrengths: [
      'Smokes instantáneos desde cualquier parte del mapa',
      'Molly para post-plant y denying',
      'Stim Beacon para velocidad del equipo',
      'Orbital Strike para negar zonas',
      'Excelente para executes rápidos',
    ],
    weaknesses: [
      'Puede ser redundante si ya hay otro controlador de humos principales',
      'Menos flexible en rondas defensivas',
      'No aporta wall-control como Viper',
    ],
    description: 'Controlador especializado en executes y post-plant. Excelente para ataques estructurados.',
  },
  Viper: {
    agentName: 'Viper',
    role: 'Controlador',
    subroles: ['secondary-controller', 'wall-controller', 'map-control', 'anchor', 'site-anchor', 'stall', 'postplant'],
    synergiesWith: ['Omen', 'Brimstone', 'Astra', 'Miks', 'Killjoy', 'Cypher', 'Chamber', 'Sage'],
    redundantWith: ['Harbor'],
    uniqueStrengths: [
      'Toxic Screen para control persistente de zonas',
      'Snake Bite para post-plant y denial',
      'Orb de recuperación para anchor',
      'Excelente control de mapa a largo plazo',
      'Capacidad de stall y denying',
    ],
    weaknesses: [
      'Requiere planificación previa para máximo rendimiento',
      'Como único controlador puede ser menos flexible en algunos mapas',
      'No es un primary-smokes tradicional',
    ],
    description: 'Controladora de pared y mapa. Aporta control persistente, anchor y post-plant.',
  },
  Astra: {
    agentName: 'Astra',
    role: 'Controlador',
    subroles: ['primary-smokes', 'map-control', 'execute-support', 'damage-utility', 'crowd-control'],
    synergiesWith: ['Jett', 'Raze', 'KAY/O', 'Sova', 'Viper'],
    redundantWith: ['Omen', 'Brimstone', 'Clove'],
    uniqueStrengths: [
      'Forma Astral para utilidad global desde cualquier lado',
      'Pulsar para executes y separar defenderes',
      'Gravity Well para crowd control',
      'Nebula para smokes a distancia',
    ],
    weaknesses: [
      'Curva de aprendizaje alta',
      'Puede ser redundante con otros controladores',
      'Menos efectiva sin buena coordinación',
    ],
    description: 'Controladora utility-heavy con presencia global. Mejor para equipos coordinados.',
  },
  Clove: {
    agentName: 'Clove',
    role: 'Controlador',
    subroles: ['primary-smokes', 'postplant', 'healing', 'damage-utility', 'support'],
    synergiesWith: ['Jett', 'Neon', 'Raze', 'Phoenix', 'Yoru'],
    redundantWith: ['Omen', 'Brimstone', 'Astra'],
    uniqueStrengths: [
      'Utilidad Post-Muerte',
      'Mediocre para plays agresivos',
      'Self-revive capability',
      'Capacidad de heal',
    ],
    weaknesses: [
      'Puede ser redundante con otros controladores de humos',
      'Menos útil en defensa prolongada',
    ],
    description: 'Controladora agresiva con utiliad post-muerte y healing.',
  },
  Harbor: {
    agentName: 'Harbor',
    role: 'Controlador',
    subroles: ['secondary-controller', 'wall-controller', 'execute-support', 'map-control', 'area-denial'],
    synergiesWith: ['Omen', 'Viper', 'Miks', 'Jett', 'Raze', 'Neon'],
    redundantWith: ['Viper'],
    uniqueStrengths: [
      'Coil para control de geometría',
      'High Tide para rushes y entries rápidas',
      'Aporte único de wall-control con paredes destructibles',
    ],
    weaknesses: [
      'Puede solaparse con Viper como wall-controller',
      'Menos efectivo en post-plant que otros controladores',
      'Utility require más coordinación',
    ],
    description: 'Controladora de paredes y executes. Aporta control de geometría único.',
  },
  Jett: {
    agentName: 'Jett',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'lurker', 'mobility-duelist'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Skye'],
    redundantWith: ['Neon', 'Raze', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Tailwind para entries instantáneas',
      'Cloudburst para peeks seguros',
      'Drift para plays de lurk',
      'Blade Storm para clutch potencial',
    ],
    weaknesses: [
      'Dependiente de habilidad mecánica',
      'Puede ser redundante con otros duelistas de entrada',
    ],
    description: 'Duelista de entry y mobility. Mejor con jugadores con buena mecánica.',
  },
  Raze: {
    agentName: 'Raze',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'damage-utility', 'area-denial'],
    synergiesWith: ['Brimstone', 'Sova', 'KAY/O', 'Skye', 'Gekko'],
    redundantWith: ['Jett', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Blast Pack para plays verticales',
      'Paint Shells para area denial',
      'Showstopper para double kills',
      'Excelente para crear espacio caótico',
    ],
    weaknesses: [
      'Puede ser redundante con otros duelistas de entrada',
      'Menos útil en defend sides',
    ],
    description: 'Duelista explosiva. Excelente para crear espacio y presión.',
  },
  Phoenix: {
    agentName: 'Phoenix',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'healing', 'flash-initiator'],
    synergiesWith: ['Brimstone', 'Sova', 'KAY/O', 'Gekko'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Curveball para entry seguro',
      'Hot Hands para self-heal',
      'Run it Back para clutch potencial',
    ],
    weaknesses: [
      'Puede ser redundante con otros duelistas',
      'Dependiente de su ultimate para clutch',
    ],
    description: 'Duelista autocontenido. Good para entries agresivas y plays individuales.',
  },
  Reyna: {
    agentName: 'Reyna',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'flash-initiator'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Dismiss para picks seguros',
      'Devour para heal post-kill',
      'Leer para información y presión',
    ],
    weaknesses: [
      'Dependiente de kills para ser efectiva',
      'Puede ser redundante con otros duelistas',
    ],
    description: 'Carry duelist. Mejor cuando puede-get early kills y snowball.',
  },
  Yoru: {
    agentName: 'Yoru',
    role: 'Duelista',
    subroles: ['entry', 'lurker', 'space-creator', 'flash-initiator', 'mobility-duelist'],
    synergiesWith: ['Omen', 'Sova', 'KAY/O', 'Fade'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay'],
    uniqueStrengths: [
      'Fakeout para desinformación',
      'Gatecrash para flanks',
      'Dimensional Drift para lurk',
    ],
    weaknesses: [
      'Curva de aprendizaje alta',
      'Puede ser redundante con otros duelistas de entrada',
    ],
    description: 'Flanker y trickster. Mejor para ataques sorpresa y plays divide.',
  },
  Iso: {
    agentName: 'Iso',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'damage-utility'],
    synergiesWith: ['Omen', 'Brimstone', 'Viper', 'Sova', 'Tejo'],
    redundantWith: ['Jett', 'Raze', 'Neon', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Contingency para shields',
      'Double Tap para spray control',
      'Kill Contract para reward competitivo',
    ],
    weaknesses: [
      'Puede ser redundante con otros duelistas',
      'Less mobility que otros duelistas',
    ],
    description: 'Duelista adaptativo con protección. Good para entries meditadas.',
  },
  Neon: {
    agentName: 'Neon',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'mobility-duelist', 'fast-execute'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Miks'],
    redundantWith: ['Jett', 'Raze', 'Waylay', 'Yoru'],
    uniqueStrengths: [
      'Fast Slide para peeking agresivo',
      'Relay Bolt para información',
      'Overdrive para site takes rápidos',
    ],
    weaknesses: [
      'Puede ser redundante con otros duelistas de entrada',
      'Dependiente de mecánica',
    ],
    description: 'Duelista rápido. Mejor para site hits agresivos y jugadores mecánicos.',
  },
  Waylay: {
    agentName: 'Waylay',
    role: 'Duelista',
    subroles: ['entry', 'space-creator', 'mobility-duelist', 'damage-utility', 'clear-space'],
    synergiesWith: ['Omen', 'Brimstone', 'Sova', 'KAY/O', 'Fade', 'Miks'],
    redundantWith: ['Neon', 'Jett', 'Raze'],
    uniqueStrengths: [
      'Arc Star para daño en burst',
      'Explosive Tag para area denial',
      'Tag Team para soporte al equipo',
    ],
    weaknesses: [
      'Puede ser redundante con otros duelistas de entrada',
      'Menos movilidad que otros duelistas',
    ],
    description: 'Duelista agresivo con utilidad de equipo. Crea espacio mientras apoya.',
  },
  Sova: {
    agentName: 'Sova',
    role: 'Iniciador',
    subroles: ['recon', 'damage-utility', 'execute-support', 'clear-space'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['Fade', 'Tejo'],
    uniqueStrengths: [
      'Recon Bolt para información de largo alcance',
      'Shock Dart para daño y utilidad',
      'Drone para soporte de execute',
      'Capacidad de mantener контрол zona',
    ],
    weaknesses: [
      ' Puede ser redundante con otros recons o damage-utility iniciadores',
      'Menos útil sin coordinación de equipo',
    ],
    description: 'Iniciador recon clásico. Mejor para executes y gather information de largo.',
  },
  Skye: {
    agentName: 'Skye',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'healing', 'support', 'retake-support', 'clear-space'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Breach', 'Tejo', 'Gekko'],
    uniqueStrengths: [
      'Guiding Light para flashes',
      'Healing para soporte de equipo',
      'Tiger para limpieza de zonas',
    ],
    weaknesses: [
      'Puede ser redundante si ya hay iniciador y la compo necesita otra cosa',
      'No aporta control persistente de mapa como Viper o un centinela',
    ],
    description: 'Iniciador flash y healer. Mejor para soportar entries agresivas.',
  },
  Fade: {
    agentName: 'Fade',
    role: 'Iniciador',
    subroles: ['recon', 'damage-utility', 'crowd-control', 'clear-space'],
    synergiesWith: ['Jett', 'Raze', 'Omen', 'Brimstone', 'Neon'],
    redundantWith: ['Sova', 'Tejo'],
    uniqueStrengths: [
      'Haunt para control de mapa',
      'Prowler para información y presión',
      'Nightfall para reveal de posiciones',
    ],
    weaknesses: [
      'Puede ser redundante con otros iniciadores de recon',
      'Menos útil que Sova para largo alcance',
    ],
    description: 'Iniciador recon y crowd control. Mejor para gather info y punish positions.',
  },
  Gekko: {
    agentName: 'Gekko',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'recon', 'execute-support', 'area-denial'],
    synergiesWith: ['Jett', 'Raze', 'Neon', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Breach', 'Skye', 'Tejo'],
    uniqueStrengths: [
      'Wingman para multi-tarea',
      'Dizzy para flashes',
      'Thrash para soporte de execute',
    ],
    weaknesses: [
      'Puede ser redundante con otros iniciadores de flash',
      'Menos efectivo en retake que otros',
    ],
    description: 'Iniciador multi-utility. Flexible con site execution y retake.',
  },
  KAY_O: {
    agentName: 'KAY/O',
    role: 'Iniciador',
    subroles: ['flash-initiator', 'damage-utility', 'execute-support', 'crowd-control'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['Skye', 'Breach', 'Gekko', 'Tejo'],
    uniqueStrengths: [
      'Flashpoint para flashes de equipo',
      'Zero/point para información',
      'FRAG/ment para daño',
      'Reset para clutch potencial',
    ],
    weaknesses: [
      'Puede ser redundante con otros iniciadores',
      'Dependiente de su utilidad de combate',
    ],
    description: 'Iniciador agresivo con utilidad de combate. Mejor para fights de mid-round.',
  },
  Tejo: {
    agentName: 'Tejo',
    role: 'Iniciador',
    subroles: ['damage-utility', 'clear-space', 'execute-support', 'anti-push', 'area-denial'],
    synergiesWith: ['Omen', 'Brimstone', 'Viper', 'Jett', 'Neon', 'Miks'],
    redundantWith: ['Skye', 'Breach', 'KAY/O', 'Gekko'],
    uniqueStrengths: [
      'Volatile Charge para execute',
      'Concussion para setup',
      'Spotter para información',
    ],
    weaknesses: [
      'No reemplaza completamente a un recon puro',
      'Puede necesitar coordinación de equipo',
    ],
    description: 'Iniciador focused en execute con area control. Mejor para ataques estructurados.',
  },
  Breach: {
    agentName: 'Breach',
    role: 'Iniciador',
    subroles: ['damage-utility', 'crowd-control', 'execute-support', 'flash-initiator', 'clear-space'],
    synergiesWith: ['Jett', 'Raze', 'Phoenix', 'Omen', 'Brimstone'],
    redundantWith: ['KAY/O', 'Skye', 'Tejo', 'Gekko'],
    uniqueStrengths: [
      'Aftershock para limpieza de áreas',
      'Fault Line para crowd control',
      'Rolling Thunder para team fight',
    ],
    weaknesses: [
      'Puede ser redundante con otros iniciadores de daño',
      'Menos útil para información que recons',
    ],
    description: 'Iniciador de damage y crowd control. Mejor para forzar posiciones.',
  },
  Cypher: {
    agentName: 'Cypher',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'flank-watch', 'anchor', 'site-anchor', 'map-control'],
    synergiesWith: ['Omen', 'Viper', 'Brimstone', 'Sova', 'Killjoy'],
    redundantWith: ['Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Trapwire para rotations',
      'Cyber Cage para información',
      'Spy Camera para control de mapa',
    ],
    weaknesses: [
      'Puede ser redundante con otros centinelas',
      'Menos útil en lado attack',
    ],
    description: 'Centinela clásico con información y denial. Mejor para setups defensivos.',
  },
  Killjoy: {
    agentName: 'Killjoy',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'flank-watch', 'anchor', 'site-anchor', 'postplant', 'stall', 'area-denial'],
    synergiesWith: ['Omen', 'Viper', 'Brimstone', 'Sova', 'Cypher'],
    redundantWith: ['Cypher', 'Chamber', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Turret para información y daño',
      'Alarmbot para detección',
      'Nanoswarm para post-plant',
      'Lockdown para retake',
    ],
    weaknesses: [
      'Puede ser redundante con otros centinelas',
      'Dependiente de/setup',
    ],
    description: 'Centinela defensivo con post-plant fuerte. Mejor para anchoring sites.',
  },
  Chamber: {
    agentName: 'Chamber',
    role: 'Centinela',
    subroles: ['flank-watch', 'anchor', 'site-anchor', 'lurker'],
    synergiesWith: ['Omen', 'Viper', 'Sova', 'Fade'],
    redundantWith: ['Cypher', 'Killjoy', 'Sage', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Headhunter para plays con OP',
      'Trademark para teleport trap',
      'Rendezvous para rotations',
    ],
    weaknesses: [
      'Puede ser redundante con centinelas tradicionales',
      'Less utility de stall que otros',
    ],
    description: 'Centinela híbrido. Mejor para jugadores que quieren sentinel utility con firepower de duelist.',
  },
  Sage: {
    agentName: 'Sage',
    role: 'Centinela',
    subroles: ['healing', 'stall', 'site-anchor', 'support', 'retake-support'],
    synergiesWith: ['All'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Deadlock', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'Healing para sostenimiento de equipo',
      'Slow Orb para defensa',
      'Barrier Orb para setup de site',
      'Resurrection para clutch potencial',
    ],
    weaknesses: [
      'Puede ser redundante con otros centinelas',
      'Less utility de información que Cypher/Killjoy',
    ],
    description: 'Centinela support con healing y utility. Mejor para plays defensivos.',
  },
  Deadlock: {
    agentName: 'Deadlock',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'stall', 'site-anchor', 'crowd-control', 'area-denial'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Veto', 'Vyse'],
    uniqueStrengths: [
      'GravNet para pulling enemies',
      'Sensor Neuron para información',
      'Barrier Mesh para rotations',
      'Sonar Sensor para denial',
    ],
    weaknesses: [
      ' Puede ser redundante con otros centinelas',
      'Menos información que Cypher',
    ],
    description: 'Centinela de denial de área. Mejor para lock down de espacios.',
  },
  Veto: {
    agentName: 'Veto',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'recon', 'postplant', 'stall'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Vyse'],
    uniqueStrengths: [
      'Outpost para multi-información',
      'Abyss para picks tardíos',
      'Contingency para post-plant',
    ],
    weaknesses: [
      ' Puede ser redundante con otros centinelas',
      'Menos utility de denial que otros',
    ],
    description: 'Centinela informativo con impacto tardío. Mejor para patient play.',
  },
  Vyse: {
    agentName: 'Vyse',
    role: 'Centinela',
    subroles: ['trap-sentinel', 'stall', 'site-anchor', 'flash-initiator', 'area-denial'],
    synergiesWith: ['Omen', 'Viper', 'Cypher', 'Killjoy'],
    redundantWith: ['Cypher', 'Killjoy', 'Chamber', 'Sage', 'Deadlock', 'Veto'],
    uniqueStrengths: [
      'Arc Rose para stall de área',
      'Shear para seguridad',
      'Ambush para kills sorpresa',
    ],
    weaknesses: [
      ' Puede ser redundante con otros centinelas',
      'Less información que Cypher',
    ],
    description: 'Centinela de control de área con stall fuerte. Mejor para setups defensivos.',
  },
};

export const getAgentProfile = (agentName: string): TacticalProfile | undefined => {
  return AGENT_PROFILES[agentName];
};

export const getSubroleWeight = (subrole: TacticalSubrole): number => {
  const weights: Record<TacticalSubrole, number> = {
    'primary-smokes': 10,
    'execute-smokes': 7,
    'secondary-controller': 6,
    'flex-controller': 5,
    'wall-controller': 8,
    'anchor': 7,
    'site-anchor': 6,
    'lurker': 5,
    'entry': 6,
    'space-creator': 5,
    'mobility-duelist': 5,
    'fast-execute': 4,
    'clear-space': 4,
    'recon': 4,
    'flash-initiator': 4,
    'blind-support': 3,
    'damage-utility': 4,
    'trap-sentinel': 3,
    'flank-watch': 4,
    'postplant': 3,
    'map-control': 3,
    'execute-support': 3,
    'healing': 2,
    'support': 2,
    'retake-support': 3,
    'stall': 3,
    'crowd-control': 2,
    'area-denial': 3,
    'anti-push': 3,
  };
  return weights[subrole] || 1;
};

export { isCompatibleControllerPair, COMPATIBLE_CONTROLLER_PAIRS } from './agentProfilesOld';