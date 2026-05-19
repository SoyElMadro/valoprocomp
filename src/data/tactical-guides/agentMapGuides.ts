import type { AgentMapGuide, AgentName, ActiveMapName, AgentSiteGuide, ValorantRole, TacticStatus, Confidence } from './types';
import { activeMapNames, agentNames } from './types';
import { agentRoles } from './agentRoles';

const roleText: Record<ValorantRole, string> = {
  Duelist: 'crear espacio, buscar primer contacto tradeable y convertir presión en entrada real',
  Initiator: 'dar información, limpiar ángulos peligrosos y habilitar el timing del entry',
  Controller: 'cortar líneas clave, sostener utilidad para mid-round y mantener valor vivo en post-plant/retake',
  Sentinel: 'controlar flank, anclar zonas, retrasar pushes y aportar información pasiva',
};

const mapSites: Record<ActiveMapName, string[]> = {
  Ascent: ['A', 'B'],
  Bind: ['A', 'B'],
  Breeze: ['A', 'B'],
  Fracture: ['A', 'B'],
  Haven: ['A', 'B', 'C'],
  Icebox: ['A', 'B'],
  Lotus: ['A', 'B', 'C'],
  Pearl: ['A', 'B'],
  Split: ['A', 'B'],
  Sunset: ['A', 'B'],
  Abyss: ['A', 'B'],
  Corrode: ['A', 'B'],
};

const mapMacro: Record<ActiveMapName, { status: TacticStatus; confidence: Confidence; sourceRefs: string[]; note: string }> = {
  Ascent: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-ascent-guide', 'yt-ascent-mid-control', 'riot-patch-12-08'], note: 'priorizar mid control y splits antes de commits obvios' },
  Bind: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-bind-guide'], note: 'sin mid tradicional: usar teleporters para rotaciones rápidas y executes simultáneos por dos frentes' },
  Breeze: { status: 'needs-review', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-breeze-guide', 'riot-patch-12-00'], note: 'cortar líneas largas y validar lineups post-12.00' },
  Fracture: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-fracture-guide', 'riot-patch-12-05'], note: 'coordinar pincers desde dos frentes y cubrir flancos' },
  Haven: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-haven-guide'], note: 'usar info/fakes para castigar rotaciones entre tres sites' },
  Icebox: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-icebox-guide'], note: 'verticalidad clave: controlar mid/tube y usar Sage walls para bloquear retakes' },
  Lotus: { status: 'needs-review', confidence: 'low', sourceRefs: ['riot-maps', 'rb-lotus-guide', 'riot-patch-12-05', 'yt-lotus-premier-strip'], note: 'control central y puertas; A requiere validación post-12.05' },
  Pearl: { status: 'needs-review', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-pearl-guide', 'riot-patch-11-08-pearl'], note: 'usar mid control para reducir rotaciones largas y revisar B actualizado' },
  Split: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-split-guide', 'yt-split-deep-dive'], note: 'mid/alturas definen el valor de cualquier agente' },
  Sunset: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-sunset-guide'], note: 'mid control es crucial: mapa compacto sin gimmicks, gunfights directos' },
  Abyss: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-abyss-guide', 'riot-patch-12-05'], note: 'sin bordes: usar knockback para empujar rivales al vacío; mid con Operator es clave' },
  Corrode: { status: 'partial', confidence: 'medium', sourceRefs: ['riot-maps', 'rb-corrode-guide', 'riot-patch-11-08'], note: 'defender-sided: B es fortaleza, mid conecta todo, paredes penetrables Odin spam' },
};

const agentSpecificNotes: Partial<Record<AgentName, { bestWith: AgentName[]; avoidWhen: string[]; sourceRefs?: string[]; note: string }>> = {
  Yoru: { bestWith: ['Omen', 'Sova', 'Iso', 'Cypher'], avoidWhen: ['El equipo no coordina fakes/re-hits.', 'No hay info para vender presión.'], sourceRefs: ['yt-haven-fnc-t1-yoru-iso', 'riot-patch-12-05'], note: 'post-12.05 tiene menos margen por Gatecrash/Blindside; usarlo con timing y no como entry aislado' },
  Iso: { bestWith: ['Yoru', 'Sova', 'Omen'], avoidWhen: ['No hay soporte para aislar duelos.', 'El equipo necesita hard entry principal.'], sourceRefs: ['yt-haven-fnc-t1-yoru-iso'], note: 'funciona como segundo contacto para convertir presión en kill/trade' },
  Neon: { bestWith: ['Breach', 'Fade', 'Omen'], avoidWhen: ['El plan depende de abuso de movilidad aérea o shotgun rush.', 'No hay utilidad que habilite el entry.'], sourceRefs: ['riot-patch-12-09'], note: 'tras 12.09 debe ser más intencional: menos valor en movilidad aérea y shotgun aggression' },
  Raze: { bestWith: ['Breach', 'Fade', 'Omen'], avoidWhen: ['No hay utilidad para romper crossfires.', 'El mapa exige duelos largos sin cierre de distancia.'], note: 'gran valor en zonas cerradas, chokes y verticalidad' },
  Jett: { bestWith: ['Sova', 'KAY/O', 'Omen'], avoidWhen: ['No hay info antes del dash.', 'El equipo no puede tradear espacio tomado.'], note: 'valor por duelos largos, Operator y entrada con escape' },
  Omen: { bestWith: ['Raze', 'Yoru', 'Sova'], avoidWhen: ['El equipo necesita pared larga persistente como única condición.', 'Morís primero de forma repetida.'], note: 'controlador flexible para smokes reactivas, paranoia y pivots' },
  Viper: { bestWith: ['Sova', 'Jett', 'Cypher', 'Harbor'], avoidWhen: ['No conocés cortes actuales del mapa.', 'El equipo gasta toda la utilidad al entry.'], sourceRefs: ['riot-patch-12-00'], note: 'valor alto en mapas abiertos y como anti-retake; validar lineups recientes' },
  Harbor: { bestWith: ['Viper', 'Jett', 'Sova'], avoidWhen: ['El equipo necesita smokes instantáneas globales.', 'No hay comunicación para avanzar detrás de pared.'], note: 'cortes móviles para tomar espacio y aislar líneas largas' },
  Astra: { bestWith: ['Sova', 'Jett', 'Cypher'], avoidWhen: ['El equipo juega demasiado rápido para esperar estrellas.', 'Te castigan entrando a forma astral.'], note: 'control flexible de mid-round, pulls/stuns y división de site' },
  Brimstone: { bestWith: ['Breach', 'Raze', 'Killjoy'], avoidWhen: ['El mapa exige smokes globales largas todo el round.', 'No hay timing claro de exec.'], note: 'excelente para execs rápidos y post-plant con utilidad de daño' },
  Clove: { bestWith: ['Raze', 'Breach', 'Cypher'], avoidWhen: ['Se depende demasiado de smokes post-muerte.', 'Se juega sin disciplina de trade.'], sourceRefs: ['riot-patch-12-05'], note: 'post-12.05 el valor de Ruse muerto bajó; jugar más vivo y coordinado' },
  Cypher: { bestWith: ['Omen', 'Sova', 'Viper'], avoidWhen: ['El rival destruye siempre el mismo setup y no lo cambiás.'], note: 'flank/info y ancla pasiva; cambiar setups constantemente' },
  Killjoy: { bestWith: ['Omen', 'Sova', 'Raze'], avoidWhen: ['El plan exige rotar lejos de la utilidad constantemente.'], note: 'ancla fuerte y post-plant/retake con Lockdown; cuidar rango de utilidad' },
  Chamber: { bestWith: ['Sova', 'Omen', 'Cypher'], avoidWhen: ['El equipo necesita sentinel de delay fuerte.', 'No hay duelos largos favorables.'], note: 'sentinel de contacto/Operator, menos delay que Cypher/KJ' },
  Deadlock: { bestWith: ['Raze', 'Breach', 'Omen'], avoidWhen: ['El rival juega defaults lentas y no chokes claros.'], note: 'mejor como deny de exec/retake por zonas cerradas que como flank sentinel puro' },
  Sage: { bestWith: ['Raze', 'Omen', 'Sova'], avoidWhen: ['El mapa necesita información pasiva de flancos.'], sourceRefs: ['riot-patch-12-05'], note: 'barrier/slow para cortar ritmo; no reemplaza sentinel de info' },
  Vyse: { bestWith: ['Breach', 'Raze', 'Omen'], avoidWhen: ['No hay plan para capitalizar traps.', 'El rival juega muy lento y rompe setup.'], note: 'deny de choke y punish a entradas agrupadas' },
  Veto: { bestWith: ['Omen', 'Breach', 'Raze'], avoidWhen: ['No hay comprensión clara de su zona fuerte.', 'Se usa como sentinel pasivo sin plan.'], sourceRefs: ['riot-patch-12-08'], note: 'sentinel nuevo/reciente: marcar como partial hasta tener más evidencia pro estable' },
  Sova: { bestWith: ['Jett', 'Omen', 'Viper'], avoidWhen: ['El mapa castiga demasiado los reveals lineales sin follow-up.'], note: 'recon estable para info, anti-stack, post-plant y retake' },
  Fade: { bestWith: ['Raze', 'Omen', 'Viper'], avoidWhen: ['El equipo no capitaliza seize/prowlers.'], note: 'info cercana para limpiar zonas cerradas y retakes' },
  Breach: { bestWith: ['Raze', 'Neon', 'Brimstone'], avoidWhen: ['No hay duelista listo para entrar sobre stun/flash.'], sourceRefs: ['riot-patch-12-05'], note: 'habilitador de entry/retake, especialmente en mapas con chokes cerrados' },
  'KAY/O': { bestWith: ['Jett', 'Omen', 'Sova'], avoidWhen: ['No se comunica cuándo la supresión abre entrada.'], note: 'suppression y flashes para romper setups defensivos' },
  Skye: { bestWith: ['Raze', 'Viper', 'Omen'], avoidWhen: ['Se tira flash solo para info sin plan de follow-up.'], sourceRefs: ['riot-patch-12-05'], note: 'post-12.05 Guiding Light con cooldown exige uso más deliberado' },
  Gekko: { bestWith: ['Omen', 'Raze', 'Viper'], avoidWhen: ['No se recuperan globules ni se juega por plant/defuse con Wingman.'], note: 'gran valor en plant/defuse y reclears repetibles si el equipo recupera utilidad' },
  Miks: { bestWith: ['Raze', 'Neon', 'Omen'], avoidWhen: ['El equipo no juega junto o no capitaliza buffs/heals.'], sourceRefs: ['riot-patch-12-05'], note: 'controller/support nuevo: usar como wingman de tempo y marcar como partial hasta mayor muestra pro' },
  Tejo: { bestWith: ['Jett', 'Raze', 'Omen'], avoidWhen: ['No hay plan para convertir su presión en espacio.'], sourceRefs: ['riot-patch-12-09'], note: 'iniciador de presión/zonas; validar setups concretos por mapa' },
  Phoenix: { bestWith: ['Omen', 'Breach', 'Cypher'], avoidWhen: ['El equipo necesita entry de movilidad o info fuerte.'], sourceRefs: ['riot-patch-12-09'], note: 'self-sufficient duelist; mejor con flashes coordinadas y control de close angles' },
  Reyna: { bestWith: ['Omen', 'Sova', 'KAY/O'], avoidWhen: ['Necesitás utilidad de equipo para ejecutar.', 'No hay confianza en duelos.'], note: 'aporta poco macro; solo recomendable si el jugador gana duelos y el resto cubre utilidad' },
  Waylay: { bestWith: ['Breach', 'Omen', 'Fade'], avoidWhen: ['No hay soporte para convertir entrada en trade.'], sourceRefs: ['riot-patch-12-08'], note: 'duelist de espacio/reposition; mantener partial por muestra competitiva limitada' },
};

function makeSiteGuide(agent: AgentName, map: ActiveMapName, site: string): AgentSiteGuide {
  const role = agentRoles[agent];
  const macro = mapMacro[map];
  const note = agentSpecificNotes[agent];
  const refs = Array.from(new Set([...(macro.sourceRefs), 'riot-agents', ...(note?.sourceRefs ?? [])]));

  return {
    site,
    roleInComp: `${role}: ${roleText[role]}`,
    attackPlan: [
      `${agent}: ${note?.note ?? roleText[role]}.`,
      `Aplicar macro de ${map}: ${macro.note}.`,
      'Coordinar utilidad con controlador/iniciador antes de tomar primer contacto.',
    ],
    defensePlan: [
      'Priorizar información, delay y supervivencia antes que duelos aislados.',
      role === 'Sentinel' ? 'Cambiar setup si el rival ya lo leyó y comunicar cuándo tu utilidad detecta o niega espacio.' : 'Guardar al menos una herramienta útil para retake o reclear.',
      `Adaptar la posición al site ${site} y al plan de retake del equipo.`,
    ],
    combos: note?.bestWith.length ? note.bestWith.map((ally) => `${agent} + ${ally}: coordinar utilidad para timing de entrada, reclear o post-plant.`) : ['Combinar con el rol complementario principal de la comp.'],
    postPlantPriorities: ['Jugar por spike y crossfire.', 'No regalar el primer duelo.', 'Conservar utilidad de tiempo si existe.'],
    retakePriorities: ['Entrar con utilidad coordinada.', 'Limpiar zonas por capas.', 'No tomar duelos sin trade.'],
    counters: note?.avoidWhen ?? ['Info temprana rival.', 'Utility denial.', 'Pushes coordinados sobre tu zona débil.'],
    status: note?.sourceRefs ? macro.status : 'partial',
    confidence: note?.sourceRefs ? macro.confidence : 'low',
    sourceRefs: refs,
  };
}

function makeGuide(agent: AgentName, map: ActiveMapName): AgentMapGuide {
  const role = agentRoles[agent];
  const macro = mapMacro[map];
  const note = agentSpecificNotes[agent];
  const refs = Array.from(new Set([...(macro.sourceRefs), 'riot-agents', ...(note?.sourceRefs ?? [])]));

  return {
    agent,
    role,
    map,
    overview: `${agent} en ${map}: jugar como ${role}. ${note?.note ?? roleText[role]}. Macro del mapa: ${macro.note}.`,
    bestWith: note?.bestWith ?? [],
    avoidWhen: note?.avoidWhen ?? ['No hay guía pro específica validada para este agente/mapa.', 'La composición requiere lineups avanzadas no documentadas.'],
    fallbackRoleGuideKey: `${map}:${role}:${role === 'Duelist' ? 'entry' : role === 'Initiator' ? 'recon-initiator' : role === 'Controller' ? 'primary-controller' : 'anchor-sentinel'}`,
    status: note?.sourceRefs ? macro.status : 'partial',
    confidence: note?.sourceRefs ? macro.confidence : 'low',
    sourceRefs: refs,
    sites: mapSites[map].map((site) => makeSiteGuide(agent, map, site)),
  };
}

export const specificAgentMapGuides: AgentMapGuide[] = activeMapNames.flatMap((map) =>
  agentNames.map((agent) => makeGuide(agent, map)),
);

export function getAgentMapGuide(agent: AgentName, map: ActiveMapName): AgentMapGuide {
  const specific = specificAgentMapGuides.find((guide) => guide.agent === agent && guide.map === map);
  if (specific) return specific;

  const role = agentRoles[agent];
  return {
    agent,
    role,
    map,
    overview: `${agent} no tiene todavía una guía específica validada para ${map}. Usar fallback por rol (${role}) y mostrar estado partial/no-source en la UI.`,
    bestWith: [],
    avoidWhen: ['No hay fuente específica actual para este agente en este mapa.', 'La composición requiere lineups o setups avanzados no documentados.'],
    sites: [makeSiteGuide(agent, map, 'A/B/C')],
    fallbackRoleGuideKey: `${map}:${role}:fallback`,
    status: 'no-source',
    confidence: 'low',
    sourceRefs: ['riot-agents'],
  };
}
