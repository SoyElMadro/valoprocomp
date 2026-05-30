export type AbilityType = 'Pasiva' | 'Básica' | 'Firma' | 'Definitiva';
export type AgentClassName = 'Duelista' | 'Controlador' | 'Iniciador' | 'Centinela';
export type Difficulty = 'Fácil' | 'Media' | 'Difícil';

export interface AgentAbility {
  name: string;
  type: AbilityType;
  key: string;
  description: string;
  cost?: number;
  charges?: number;
}

export interface AgentProfile {
  id: string;
  name: string;
  role: AgentClassName;
  difficulty: Difficulty;
  description: string;
  playstyleTips: string[];
  abilities: AgentAbility[];
  bestMaps: string[];
  weakMaps: string[];
  trait: string;
}

const agentAbilities: AgentProfile[] = [
  {
    id: 'jett',
    name: 'Jett',
    role: 'Duelista',
    difficulty: 'Media',
    description: 'Jett es la agente más ágil de VALORANT. Su kit está diseñado para jugadores que aman tomar duelos y moverse a velocidades imposibles. Especialista en entradas rápidas y reposicionamiento.',
    playstyleTips: [
      'Usá Drift para evitar daño por caída y ganar ángulos sorpresa desde el aire',
      'Combiná Updraft + Tailwind para entradas impredecibles al sitio',
      'Guardá al menos un Tailwind para escapar tras una entrada agresiva',
      'Con Blade Storm, priorizá disparos a la cabeza para reposición instantánea de cuchillos',
      'Cloudburst es excelente para fintas: movelo antes de soltarlo para confundir enemigos'
    ],
    trait: 'Agilidad suprema — entrada rápida y evasión',
    bestMaps: ['Ascent', 'Haven', 'Breeze'],
    weakMaps: ['Fracture', 'Split'],
    abilities: [
      {
        name: 'Drift (Planear)',
        type: 'Pasiva',
        key: 'Saltar (mantener)',
        description: 'Jett flota en el aire mientras mantiene presionado el botón de salto. Al planear desde cualquier altura, Jett no recibe daño por caída. También puede deslizarse de un lugar a otro, lo que le da una ventaja de movilidad que puede tomar desprevenido a cualquier agente.'
      },
      {
        name: 'Updraft (Impulso)',
        type: 'Básica',
        key: 'Q',
        cost: 150,
        charges: 2,
        description: 'Jett vuela instantáneamente hacia arriba, permitiéndole obtener una perspectiva aérea más amplia. Puede disparar en el aire pero con menor precisión. Desde un Updraft estándar no recibe daño; si la altura está en rango de daño por caída, puede usar Drift para evitarlo.'
      },
      {
        name: 'Cloudburst (Nube)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Lanza una humo instantánea hacia el lugar deseado. La humo bloquea la visión de cualquiera dentro o fuera de ella. Podés mover la Nube antes de soltarla en un lugar sosteniendo el botón de habilidad mientras apuntás.'
      },
      {
        name: 'Tailwind (Impulso de Viento)',
        type: 'Firma',
        key: 'E',
        description: 'Jett activa su Firma por una duración determinada. Dentro de esta duración, puede presionar el botón nuevamente para hacer un dash. Si usa Tailwind sin presionar ninguna tecla de movimiento, la llevará hacia la dirección que está mirando. De lo contrario, puede presionar la dirección deseada. Jett también recupera Tailwind si consigue dos asesinatos después de usarla.'
      },
      {
        name: 'Blade Storm (Tormenta de Cuchillas)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Jett equipa instantáneamente cinco cuchillos. Obtiene mejor velocidad de movimiento y mayor tasa de recuperación mientras está activa. Los cuchillos son precisos y matan de un disparo a la cabeza. Son precisos incluso cuando Jett está Planeando, usando Updraft o está en las cuerdas. Matar al enemigo repone los cuchillos. Si presiona el botón de disparo alternativo, todas las cuchillas se disparan instantáneamente y no son recuperables.'
      }
    ]
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    role: 'Duelista',
    difficulty: 'Fácil',
    description: 'Phoenix es un duelista con gran potencial de creación de jugadas. Sus habilidades permiten jugar agresivamente, curarse con su propio fuego y tomar el control del campo de batalla. Ideal para jugadores que recién empiezan.',
    playstyleTips: [
      'Curate en tus propias llamas con Calentamiento — hasta 50 HP por ronda',
      'Usá Bola Curva desde detrás de cobertura; la trayectoria izquierda/derecha es impredecible',
      'La Muralla Cortafuegos es excelente para dividir sitios y aislar duelos',
      'Con Corre Que Arde, jugá agresivo con el doble; si morís, volvés al punto seguro',
      'Combiná Manos Calientes con tu entrada para curarte mientras asegurás el espacio'
    ],
    trait: 'Autosuficiencia con fuego — curación y control de espacio',
    bestMaps: ['Haven', 'Ascent', 'Split'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Calentamiento (Heating Up)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Phoenix se beneficia de sus habilidades que producen fuego que dañan a otros. Se cura hasta 50 HP cada vez que se para en su propio fuego. Esta pasiva ayuda a Phoenix a permanecer más tiempo en peleas, a diferencia de cualquier otro personaje de VALORANT.'
      },
      {
        name: 'Manos Calientes (Hot Hands)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Phoenix crea una bola de fuego y la lanza en la dirección que elijas. Después de una corta distancia, la bola de fuego aterriza y crea un charco de fuego, dañando a cualquier agente parado en él, incluidos los compañeros de equipo. Solo Phoenix se cura debido a su pasiva.'
      },
      {
        name: 'Muralla Cortafuegos (Blaze)',
        type: 'Básica',
        key: 'C',
        cost: 150,
        description: 'Phoenix dibuja una muralla de fuego a lo largo del suelo, bloqueando la visión de todos y dañando a cualquiera que toque las llamas. Doblá la muralla mientras la lanzás moviendo la mira.'
      },
      {
        name: 'Bola Curva (Curveball)',
        type: 'Firma',
        key: 'E',
        description: 'Phoenix equipa el orbe de fuego en sus dedos y lo chasquea hacia la izquierda o derecha según la dirección que quiera. El orbe detona después de un breve segundo y ciega a cualquiera que mire en esa dirección. El cegado afecta también a los compañeros.'
      },
      {
        name: 'Corre Que Arde (Run It Back)',
        type: 'Definitiva',
        key: 'X',
        cost: 6,
        description: 'Phoenix crea instantáneamente un marcador donde está parado y se convierte en un doble. Por un breve período, el doble puede caminar, disparar, usar habilidades y morir si los enemigos lo matan o el tiempo se acaba. Después de la duración o de ser eliminado, Phoenix reaparece en el marcador con la vida y armadura que tenía antes.'
      }
    ]
  },
  {
    id: 'raze',
    name: 'Raze',
    role: 'Duelista',
    difficulty: 'Fácil',
    description: 'Raze es pura explosión. Su kit de demolición le permite limpiar esquinas, destruir utilidades enemigas y entrar al sitio con un caos controlado. Ideal para mapas cerrados donde sus explosivos brillan.',
    playstyleTips: [
      'Usá Paquete Explosivo para hacer "satchel jumps" y ganar ángulos elevados rápidamente',
      'Boom Bot es excelente para limpiar esquinas; lanzalo antes de entrar a cualquier espacio cerrado',
      'Granada de Pintura se puede rebotar en paredes para alcanzar enemigos en posiciones difíciles',
      'Lanzamisiles mata instantáneamente en impacto directo; en área, hace 50-150 de daño',
      'Combiná Paquete Explosivo + definitiva para una entrada aérea devastadora'
    ],
    trait: 'Demolición total — explosivos que limpian espacios',
    bestMaps: ['Split', 'Bind', 'Fracture'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Paquete Explosivo (Blast Pack)',
        type: 'Básica',
        key: 'Q',
        cost: 150,
        charges: 2,
        description: 'Raze lanza instantáneamente un paquete de explosivos. Se adhiere a cualquier superficie u objeto y después de un breve tiempo detona. Al detonar, empuja lo que esté en contacto y causa una pequeña cantidad de daño. También se puede detonar antes usando el botón de habilidad nuevamente.'
      },
      {
        name: 'Boom Bot (Bot Explosivo)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        description: 'Prepará el Boom Bot y lanzalo en la dirección deseada. El bot avanza y escanea enemigos en su radio de cono frontal. Al encontrar un enemigo, lo persigue con mayor velocidad y causa daño al hacer contacto cercano. El fuego enemigo puede destruir el Boom Bot.'
      },
      {
        name: 'Granada de Pintura (Paint Shells)',
        type: 'Firma',
        key: 'E',
        description: 'Raze equipa una granada que al lanzarse detona. Al detonar, se convierte en granadas más pequeñas que causan más daño a cualquiera en el área. Después de usar Paint Shells, Raze gana otra granada con cada dos asesinatos.'
      },
      {
        name: 'Lanzamisiles (Showstopper)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Sacá el lanzacohetes y dispará un cohete devastador hacia la ubicación apuntada. El cohete puede matar a todos en el área de efecto. Causa menos daño en el borde exterior del área. También daña a los compañeros de equipo.'
      }
    ]
  },
  {
    id: 'reyna',
    name: 'Reyna',
    role: 'Duelista',
    difficulty: 'Media',
    description: 'Reyna es la duelista más egoísta de VALORANT. Todo su kit depende de conseguir eliminaciones. Si tenés buena puntería, Reyna te permite encadenar kills con curación e invulnerabilidad. Ideal para jugadores con mecánicas superiores.',
    playstyleTips: [
      'Priorizá recoger orbes de alma después de cada kill; son tu recurso principal',
      'Devorar te cura hasta 100 HP; si ya estás full, genera sobrecuración como armadura temporal',
      'Descartar (Dismiss) te hace invulnerable e invisible (en Emperatriz) — ideal para reposicionarte',
      'Leer se puede lanzar a través de paredes; usalo para flashear sin exponerte',
      'Con Emperatriz activa, jugá agresivo: cada kill refresca el timer y las habilidades son más poderosas'
    ],
    trait: 'Reina del 1v1 — se alimenta de eliminaciones para dominar',
    bestMaps: ['Haven', 'Ascent', 'Icebox'],
    weakMaps: ['Fracture', 'Abyss'],
    abilities: [
      {
        name: 'Cosecha de Almas (Soul Harvest)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Reyna convierte a sus víctimas en orbes de alma después de eliminarlas u obtener una asistencia. Los orbes permanecen 3 segundos antes de desaparecer. Reyna puede utilizar sus habilidades de firma mientras estos orbes están disponibles.'
      },
      {
        name: 'Devorar (Devour)',
        type: 'Firma',
        key: 'Q',
        cost: 200,
        description: 'Después de cosechar un alma, Reyna puede usar esta habilidad para curarse con el tiempo (máximo 100 por alma). Si Reyna ya tiene 100 HP y sin armadura, el resto de la curación se convierte en sobrecuración. La sobrecuración desaparece después de un breve período.'
      },
      {
        name: 'Leer (Leer)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        charges: 2,
        description: 'Sacá un ojo púrpura y lanzalo en una dirección, cegando a cualquiera que mire hacia la dirección del ojo. Podés lanzar el ojo desde detrás de una pared, estructura u obstáculo, y es destruible. El ojo no ciega a compañeros y los enemigos muy cercanos al ojo pueden tener visión.'
      },
      {
        name: 'Descartar (Dismiss)',
        type: 'Firma',
        key: 'E',
        cost: 100,
        description: 'Reyna activa un alma cosechada y se vuelve no-apuntable y más rápida mientras guarda su arma. Reyna también evade cualquier efecto de daño de área. En Emperatriz, Descartar la vuelve invisible.'
      },
      {
        name: 'Emperatriz (Empress)',
        type: 'Definitiva',
        key: 'X',
        cost: 6,
        description: 'Activá el modo Emperatriz. Reyna gana velocidad de movimiento adicional, cadencia de fuego, velocidad de recarga y velocidad de recuperación. El temporizador de Emperatriz se refresca con cada asesinato. Emperatriz también mejora sus habilidades de firma: Descartar la vuelve invisible y Devorar cura al máximo instantáneamente. Reyna también gana mejora de visión, resaltando enemigos en púrpura.'
      }
    ]
  },
  {
    id: 'yoru',
    name: 'Yoru',
    role: 'Duelista',
    difficulty: 'Difícil',
    description: 'Yoru es el duelista más táctico. Su kit gira alrededor de engañar al enemigo con señuelos, flashes y teletransportación. Requiere creatividad y conocimiento del mapa para maximizar su potencial. No es para principiantes.',
    playstyleTips: [
      'Paso Falso (Fakeout) simula pasos de Yoru; usalo para hacer creer al enemigo que estás en un lugar distinto',
      'Portón (Gatecrash) es tu herramienta de escape principal; dejala activa en un lugar seguro antes de entrar',
      'Podés hacer falso teletransporte para provocar el sonido sin moverte — excelente para confundir',
      'Destello Cegador (Blindside) rebota una vez en superficies; practicá ángulos para flashear detrás de coberturas',
      'Deriva Dimensional (Dimensional Drift) te permite explorar todo el mapa y dar información a tu equipo'
    ],
    trait: 'Maestro del engaño — teletransportación y señuelos',
    bestMaps: ['Bind', 'Split', 'Breeze'],
    weakMaps: ['Fracture'],
    abilities: [
      {
        name: 'Destello Cegador (Blindside)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        charges: 2,
        description: 'Yoru crea un orbe dimensional que puede lanzar a cualquier lugar del mapa. Tras un retraso, el orbe se rompe y ciega a cualquiera que esté mirándolo. Podés hacer rebotar el orbe en una superficie una vez antes de su detonación.'
      },
      {
        name: 'Paso Falso (Fakeout)',
        type: 'Básica',
        key: 'C',
        cost: 100,
        charges: 2,
        description: 'Creá una ilusión de Yoru y enviala hacia adelante. La ilusión solo camina pero se ve exactamente como Yoru. Es destruible y ciega a cualquiera que la rompa. Si no se destruye, desaparece tras una duración.'
      },
      {
        name: 'Portón (Gatecrash)',
        type: 'Firma',
        key: 'E',
        description: 'Colocá una marca de anclaje en un lugar o movela hacia adelante. Yoru puede teletransportarse al lugar de la marca en cualquier momento (hace un sonido fuerte). La marca permanece por un tiempo y luego desaparece. También podés hacer el sonido de teletransporte sin ir allí usando la habilidad de falso TP.'
      },
      {
        name: 'Deriva Dimensional (Dimensional Drift)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Yoru se pone la máscara y viaja a su dimensión. Estando en su dimensión, Yoru es invisible y no-apuntable para enemigos o utilidades de escaneo. Hace un leve sonido al moverse y los enemigos pueden detectarlo si está muy cerca. Puede usar cualquier habilidad mientras está en esta dimensión alternativa.'
      }
    ]
  },
  {
    id: 'neon',
    name: 'Neon',
    role: 'Duelista',
    difficulty: 'Media',
    description: 'Neon es la agente más rápida de VALORANT. Su velocidad eléctrica le permite deslizarse, correr y electrocutar enemigos. Perfecta para jugadores con reflejos rápidos que quieren un estilo de juego frenético.',
    playstyleTips: [
      'Deslizate (slide) en esquinas para tomar duelos con ventaja de peeker',
      'Usá Carril Rápido para dividir el sitio en secciones y aislar enfrentamientos',
      'La Recarga de Energía no se obtiene por kills, se regenera pasivamente — administrala bien',
      'Con Sobrecarga activa, movete constantemente para ser difícil de acertar',
      'Perno de Retransmisión rebota dos veces; usalo para stunear enemigos tras cobertura'
    ],
    trait: 'Velocidad eléctrica — la entrada más rápida del juego',
    bestMaps: ['Fracture', 'Haven', 'Lotus'],
    weakMaps: ['Breeze', 'Abyss'],
    abilities: [
      {
        name: 'Energía (Energy)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Neon comienza la ronda con una barra de energía de 100 puntos que se agota al usar su firma y definitiva. Neon es una de las pocas agentes en VALORANT con habilidades de alta movilidad.'
      },
      {
        name: 'Perno de Retransmisión (Relay Bolt)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Lanza instantáneamente un perno de choque en la dirección apuntada. Los pernos golpean una superficie y rebotan. Después del primer rebote, crean un círculo de conmoción que afecta a cualquier agente dentro, incluidos compañeros.'
      },
      {
        name: 'Carril Rápido (Fast Lane)',
        type: 'Básica',
        key: 'C',
        cost: 300,
        description: 'Neon dispara dos muros eléctricos instantáneamente. Bloquea la visión de cualquiera fuera o dentro del muro. Los muros se detienen a cierta distancia si un obstáculo o superficie bloquea uno de ellos.'
      },
      {
        name: 'Velocidad Máxima (High Gear)',
        type: 'Firma',
        key: 'E',
        description: 'Neon guarda su arma y entra en modo Velocidad Máxima. La hace rápida y equipa su habilidad de deslizamiento. Mientras corre, puede deslizarse en la dirección que se mueve. Tras deslizarse, Neon recupera la deslizada si consigue dos asesinatos. No gana energía por kills, se repone con el tiempo.'
      },
      {
        name: 'Sobrecarga (Overdrive)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Neon activa Sobrecarga instantáneamente, entrando en Velocidad Máxima y cargando sus dedos para disparar un rayo eléctrico. Sobrecarga permanece activa hasta que la barra de Energía llega a 0. Conseguir asesinatos durante Sobrecarga llena completamente la barra de energía de Neon.'
      }
    ]
  },
  {
    id: 'iso',
    name: 'Iso',
    role: 'Duelista',
    difficulty: 'Difícil',
    description: 'Iso es un duelista único que manipula energía prismática. Puede volverse tanque con escudos, crear paredes impenetrables y forzar duelos 1v1 dimensionales. Requiere excelente puntería para maximizar su kit.',
    playstyleTips: [
      'Contingencia (pared) bloquea balas pero no habilidades; combinala con humos para cortar líneas de visión completamente',
      'Undercut atraviesa paredes y aplica fragilidad; usalo para debilitar enemigos antes de entrar',
      'Doble Toque te da escudo tras matar un orbe; idealmente activalo antes de cada pelea',
      'El escudo de Doble Toque absorbe UN golpe de cualquier daño, incluso definitivas como Showstopper',
      'Contrato Letal fuerza duelos 1v1; usalo para eliminar al jugador más peligroso del equipo enemigo'
    ],
    trait: 'Duelista dimensional — escudos y duelos forzados',
    bestMaps: ['Ascent', 'Haven', 'Bind'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Contingencia (Contingency)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        description: 'Equipá energía prismática y presioná disparo para enviar hacia adelante una pared de energía indestructible. Esta pared bloquea balas y se destruye al llegar a su punto final. Las habilidades aún pueden atravesarla.'
      },
      {
        name: 'Undercut (Corte Molecular)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'ISO equipa un perno molecular que lanza en línea recta. Aplica un breve efecto de fragilidad a todos los enemigos que toca (similar al Alarmbot de Killjoy). Podés lanzarlo a través de cualquier objeto, incluyendo paredes y estructuras.'
      },
      {
        name: 'Doble Toque (Double Tap)',
        type: 'Firma',
        key: 'E',
        description: 'Iniciá un temporizador de concentración. Durante este tiempo, entrás en un estado de flujo donde, si matás a un enemigo, generan un orbe similar al de Reyna. Si disparás al orbe, te otorga un escudo púrpura que absorbe una instancia de daño, incluyendo el Showstopper de Raze o Hunter\'s Fury de Sova.'
      },
      {
        name: 'Contrato Letal (Kill Contract)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'ISO crea una arena interdimensional. La habilidad te empuja a vos y al primer enemigo que golpea hacia una arena. Allí, vos y tu enemigo permanecen hasta que uno gane el duelo por combate. Ningún otro jugador puede interferir. Si nadie gana, ambos mueren en la arena dimensional.'
      }
    ]
  },
  {
    id: 'waylay',
    name: 'Waylay',
    role: 'Duelista',
    difficulty: 'Media',
    description: 'Waylay es una duelista versátil que manipula cristales de energía para crear zonas de control y ganar ventaja táctica. Su kit le permite tanto entrar agresivamente como retener posiciones con daño de área.',
    playstyleTips: [
      'Usá Refract para desorientar enemigos antes de hacer peek; la distorsión visual es muy efectiva',
      'Colocá Fragmento de Cristal en choke points para retrasar pushes enemigos',
      'Luz Cegadora se puede lanzar sobre muros; coordiná con tu iniciador para combos de flash',
      'Con Convergencia Cristalina, creá una zona de muerte donde los enemigos no pueden permanecer',
      'Waylay brilla en mapas con espacios cerrados donde sus cristales pueden cubrir áreas clave'
    ],
    trait: 'Manipuladora de cristales — control de zona y entrada táctica',
    bestMaps: ['Split', 'Haven', 'Bind'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Refract (Refractar)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        charges: 2,
        description: 'Waylay lanza un cristal que al impactar una superficie refracta luz en un cono, distorsionando la visión de los enemigos que miren hacia él. La distorsión dura 2 segundos y afecta tanto visión como audio espacial. Ideal para iniciar peleas con ventaja.'
      },
      {
        name: 'Fragmento de Cristal (Crystal Shard)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Coloca un fragmento de cristal en el suelo que se activa cuando un enemigo pasa cerca. Al activarse, explota en un radio pequeño causando daño moderado y aplicando un breve ralentizamiento. Puede destruirse con disparos enemigos.'
      },
      {
        name: 'Luz Cegadora (Blinding Light)',
        type: 'Firma',
        key: 'E',
        description: 'Waylay canaliza energía lumínica y lanza un destello que atraviesa superficies delgadas. El destello ciega a los enemigos que miren hacia él por 1.75 segundos. Se puede cargar para aumentar su alcance. Recarga con el tiempo (2 cargas máximas).'
      },
      {
        name: 'Convergencia Cristalina (Crystal Convergence)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Waylay despliega un campo de cristales en un área grande. Los cristales pulsan tres veces, cada pulso causa daño creciente a los enemigos dentro del área. Los enemigos que permanecen en el centro reciben daño máximo. Waylay obtiene velocidad de movimiento aumentada dentro del campo.'
      }
    ]
  },
  {
    id: 'brimstone',
    name: 'Brimstone',
    role: 'Controlador',
    difficulty: 'Fácil',
    description: 'Brimstone es el controlador clásico de VALORANT. Sus humos de larga duración, su incendiaria para limpiar espacios y su ataque orbital lo convierten en el comandante perfecto para ejecuciones rápidas y control de sitio.',
    playstyleTips: [
      'Humo Celestial tiene el humo de mayor duración del juego (19s); usalos para ejecuciones prolongadas',
      'La Incendiaria es excelente para negar el desactivado; guardala para el post-plant',
      'Baliza Estimulante acelera a todo tu equipo; combinalo con una entrada coordinada para abrumar defensores',
      'Ataque Orbital puede limpiar un sitio completo o negar una zona por 4 segundos',
      'Abrí el mapa táctico solo lo necesario; Brimstone es vulnerable durante la colocación de habilidades'
    ],
    trait: 'Comandante táctico — humos pesados y daño de área orbital',
    bestMaps: ['Bind', 'Fracture', 'Haven'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Incendiaria (Incendiary)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        description: 'Brimstone saca el lanzador incendiario y lanza una granada que detona tras un breve retraso en un charco de fuego. Conocida como la "molly", quema a cualquiera que esté parado en ella y causa daño pesado con el tiempo.'
      },
      {
        name: 'Baliza Estimulante (Stim Beacon)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Lanza instantáneamente una baliza de combate. Al activarse inmediatamente, afecta a cualquier compañero en su área de efecto: se vuelven más rápidos, con aumento de velocidad de recarga y cadencia de disparo.'
      },
      {
        name: 'Humo Celestial (Sky Smoke)',
        type: 'Firma',
        key: 'E',
        description: 'Abrí el mapa táctico y marcá áreas. Después de marcar, Brimstone lanza bombas de humo que cubren un área enorme durante mucho tiempo (19 segundos). El humo bloquea la visión dentro y fuera. Se recarga 1 cada 30 segundos, máximo 3, comenzás con 1.'
      },
      {
        name: 'Ataque Orbital (Orbital Strike)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Abrí el mapa táctico y marcá una ubicación. Brimstone lanza un ataque orbital en esa ubicación. Inflige daño a cualquiera en el área y destruye cualquier utilidad u objeto. El ataque en curso también bloquea la visión. Afecta a cualquier agente, incluidos enemigos y compañeros.'
      }
    ]
  },
  {
    id: 'omen',
    name: 'Omen',
    role: 'Controlador',
    difficulty: 'Media',
    description: 'Omen es el controlador más flexible. Maestro de las sombras, puede fumar a distancia, cegar a través de paredes, teletransportarse y hasta reaparecer en cualquier lugar del mapa. Perfecto para jugadores creativos que quieren ser impredecibles.',
    playstyleTips: [
      'Velo Tenebroso (humos) se colocan en vista 3D; te da precisión milimétrica sin abrir mapa completo',
      'Paranoia atraviesa paredes y ciega + ensordece; lanzalo antes de que tu equipo entre al sitio',
      'Pasos Sombríos para reposicionarte en altura o cruzar líneas de visión peligrosas',
      'Desde las Sombras (definitiva) puede cancelarse si ves peligro; también sirve para recolectar información',
      'Omen puede interactuar con la spike y puertas durante su fase de sombras en la definitiva'
    ],
    trait: 'Maestro de las sombras — humos precisos y teletransporte',
    bestMaps: ['Ascent', 'Haven', 'Lotus'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Paranoia (Paranoia)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        description: 'Omen forma un orbe de sombra en sus manos. Al lanzarlo en una dirección, crece y se desvanece tras viajar cierta distancia. Cualquiera en su trayectoria es afectado por ceguera durante un tiempo y su audio es ensordecido.'
      },
      {
        name: 'Pasos Sombríos (Shrouded Step)',
        type: 'Básica',
        key: 'C',
        cost: 100,
        charges: 2,
        description: 'Guarda el arma y muestra un marcador. Al activarlo, Omen salta a la ubicación marcada después de un breve retraso. Esta habilidad de teletransporte es una de las más rápidas entre los agentes de VALORANT.'
      },
      {
        name: 'Velo Tenebroso (Dark Cover)',
        type: 'Firma',
        key: 'E',
        description: 'Abre una vista 3D del mapa, mostrando un marcador verde. Al activarlo, Omen lanza una cobertura de humo en el marcador verde, bloqueando la visión de cualquiera dentro o fuera. Se recarga con el tiempo, máximo 2 cargas.'
      },
      {
        name: 'Desde las Sombras (From the Shadows)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Abrí el mapa táctico y marcá una ubicación deseada. Omen se transforma en una entidad de sombra y puede ver alrededor de la ubicación marcada. Después de un tiempo, se teletransporta allí. Si la entidad es destruida o se presiona el botón de habilidad, se cancela. También vuelve borroso el minimapa enemigo. Omen puede interactuar con la spike y puertas durante la fase de sombra.'
      }
    ]
  },
  {
    id: 'viper',
    name: 'Viper',
    role: 'Controlador',
    difficulty: 'Difícil',
    description: 'Viper es la controladora más técnica. Su muro y orbe de veneno usan combustible que debe administrarse. Brilla como lurker en ataque y como ancla defensiva. Su Fosa de Viper (definitiva) puede ganar rondas por sí sola.',
    playstyleTips: [
      'La Pantalla Tóxica (muro) atraviesa paredes y cubre distancias enormes; aprendé lineups para cada mapa',
      'Administrá el combustible: apagá el muro/orbe cuando no sean necesarios para recargar',
      'Nube Venenosa se puede recoger y volver a lanzar; ideal para setups móviles en ataque',
      'Mordedura de Serpiente hace daño + vulnerable; combinala con tu definitiva',
      'Con Fosa de Viper activa, juga dentro y fuera del borde para ser impredecible; no salgas por más de 8 segundos'
    ],
    trait: 'Química letal — muros de toxina y control de área',
    bestMaps: ['Icebox', 'Breeze', 'Pearl'],
    weakMaps: ['Haven'],
    abilities: [
      {
        name: 'Toxina (Toxin)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Toxina hace que todas las habilidades de Viper apliquen deterioro (decay) a los enemigos, volviéndolos vulnerables y disminuyendo su HP con el tiempo.'
      },
      {
        name: 'Combustible (Fuel)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Viper aparece con 100 puntos de Combustible Tóxico. Le permite controlar sus habilidades Nube Venenosa y Pantalla Tóxica. El combustible se recarga cuando ambas están inactivas.'
      },
      {
        name: 'Nube Venenosa (Poison Cloud)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        description: 'Viper lanza un orbe que, al activarse, emite una nube de veneno que bloquea la visión. Todos los enemigos que la tocan son afectados por toxina, bajando su HP con el tiempo. Se puede recoger y reutilizar.'
      },
      {
        name: 'Mordedura de Serpiente (Snakebite)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Viper lanza un vial de veneno al suelo que se rompe en un charco venenoso al contacto. Cualquiera dentro del área recibe daño con el tiempo y es afectado por toxina. Daña a cualquier agente, incluyendo compañeros.'
      },
      {
        name: 'Pantalla Tóxica (Toxic Screen)',
        type: 'Firma',
        key: 'E',
        description: 'Lanza una línea de puntos que atraviesan paredes hacia una dirección. Viper puede usar Combustible para crear una pared de veneno a lo largo de la línea de puntos. Bloquea la línea de visión a ambos lados de la pared. Cualquier enemigo que toque la pared es afectado por Toxina.'
      },
      {
        name: 'Fosa de Viper (Viper\'s Pit)',
        type: 'Definitiva',
        key: 'X',
        cost: 9,
        description: 'Muestra un marcador en el suelo. Al activarse, Viper comienza a emitir niebla venenosa alrededor del marcador que se convierte en una fosa de veneno. Cualquiera dentro de esta fosa ve su rango de visión reducido. Los enemigos son instantáneamente afectados por Toxina. La duración de la fosa es ilimitada a menos que Viper muera o salga de la fosa por más de 8 segundos.'
      }
    ]
  },
  {
    id: 'astra',
    name: 'Astra',
    role: 'Controlador',
    difficulty: 'Difícil',
    description: 'Astra es la controladora más poderosa y compleja. Controla el mapa entero desde su forma astral, colocando estrellas que pueden convertirse en humo, stun o succión. Requiere excelente comunicación y visión de juego.',
    playstyleTips: [
      'Colocá tus estrellas durante la fase de compra cuando sea posible',
      'Pulso Nova es perfecto para combinaciones de habilidades en área (combo con Raze, Brimstone)',
      'Pozo Gravitatorio atrae enemigos; excelente para desalojarlos de posiciones fuertes',
      'Disipar (falso humo) te permite rotar estrellas sin quedarte sin cargas',
      'Divide Cósmico bloquea balas Y sonido; es la cortina de humo más poderosa del juego para ejecuciones'
    ],
    trait: 'Controladora cósmica — poder global desde la forma astral',
    bestMaps: ['Haven', 'Lotus', 'Pearl'],
    weakMaps: ['Icebox', 'Fracture'],
    abilities: [
      {
        name: 'Forma Astral (Astral Form)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Va instantáneamente a la Forma Astral. Astra puede ver el mapa completo desde esta vista, usar Divide Cósmico y colocar estrellas. Su cuerpo original se vuelve inactivo durante las actividades en Forma Astral.'
      },
      {
        name: 'Pulso Nova (Nova Pulse)',
        type: 'Básica',
        key: 'Q',
        cost: 150,
        description: 'Detona una estrella para crear una explosión. Cualquiera dentro del área de la explosión queda aturdido por un breve tiempo. Recarga 1 carga cada 45 segundos.'
      },
      {
        name: 'Pozo Gravitatorio (Gravity Well)',
        type: 'Básica',
        key: 'C',
        cost: 150,
        description: 'Astra atrae a cualquiera cerca de una estrella hacia su centro. Todos son afectados por la vulnerabilidad del pozo gravitatorio, incluso tus compañeros. Recarga 1 carga cada 45 segundos.'
      },
      {
        name: 'Nebulosa / Disipar (Nebula / Dissipate)',
        type: 'Básica',
        key: 'E',
        cost: 150,
        description: 'Convierte una estrella en un pequeño domo de humo. Cualquiera dentro o fuera tendrá su visión bloqueada. Astra también puede usar Disipar, que consume la estrella creando una Nebulosa de menor duración pero repone una estrella. Recarga 1 cada 45 segundos.'
      },
      {
        name: 'Estrellas (Stars)',
        type: 'Firma',
        key: ' (Forma Astral)',
        description: 'Colocá estrellas en cualquier lugar del mapa desde la Forma Astral, que tardan un tiempo en activarse. Una vez activadas, estas estrellas pueden usarse como Pulso Nova, Pozo Gravitatorio y Nebulosa/Disipar. Máximo 5 estrellas.'
      },
      {
        name: 'Divide Cósmico (Cosmic Divide)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Astra entra en Forma Astral y marca un lugar. Después de marcar y ajustar, Astra puede crear una pared cósmica. Esta pared se activa instantáneamente al iniciarse y puede bloquear balas, sonido y visión. La pared se desvanece después de cierta duración.'
      }
    ]
  },
  {
    id: 'harbor',
    name: 'Harbor',
    role: 'Controlador',
    difficulty: 'Difícil',
    description: 'Harbor es el controlador más subestimado de VALORANT. Sus muros de agua ofrecen cobertura móvil y ralentizan enemigos. Su definitiva fuerza a los enemigos a moverse o ser aturdidos. Excelente en mapas grandes donde dividir el mapa es crucial.',
    playstyleTips: [
      'Marea Alta crea un muro que podés doblar; trazá rutas seguras hacia el sitio para tu equipo',
      'Ensenada (Cove) es un escudo con HP que bloquea balas por unos segundos — perfecto para plantar con cobertura',
      'Cascada avanza y ralentiza; usala para limpiar espacios estrechos como un iniciador',
      'Ajuste de Cuentas (definitiva) cubre área enorme; coordiná con duelistas que empujan mientras los enemigos se reposicionan',
      'Harbor brilla en mapas donde podés cortar líneas de visión largas con Marea Alta'
    ],
    trait: 'Guardián del agua — muros móviles y cobertura dinámica',
    bestMaps: ['Pearl', 'Breeze', 'Haven'],
    weakMaps: ['Split'],
    abilities: [
      {
        name: 'Ensenada (Cove)',
        type: 'Básica',
        key: 'Q',
        cost: 350,
        description: 'Harbor lanza una bola de agua que cae al suelo y crea un domo. El domo está cubierto instantáneamente por una armadura fuerte que bloquea la visión dentro y fuera. Los enemigos pueden destruir la armadura con disparos.'
      },
      {
        name: 'Cascada (Cascade)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Creá una pared de agua y enviala hacia adelante. La pared bloquea la visión y ralentiza a cualquiera que la toque en un 30%. La pared de Harbor puede detenerse antes de que recorra la distancia completa.'
      },
      {
        name: 'Marea Alta (High Tide)',
        type: 'Firma',
        key: 'E',
        description: 'Harbor lanza una pared de agua más grande que atraviesa cualquier obstáculo. La pared bloquea la visión y ralentiza a cualquiera que la toque. Doblá la pared mientras la lanzas apuntando hacia la ubicación deseada. Recarga con el tiempo, máximo 2 cargas.'
      },
      {
        name: 'Ajuste de Cuentas (Reckoning)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Harbor activa un charco de agua frente a él. El charco comienza a moverse lentamente hacia adelante iniciando tres golpes de conmoción consecutivos en cualquier enemigo dentro del charco. Los golpes se detienen si el enemigo sale del charco, o puede esquivarlos moviéndose después de que aparezca un indicador.'
      }
    ]
  },
  {
    id: 'clove',
    name: 'Clove',
    role: 'Controlador',
    difficulty: 'Media',
    description: 'Clove es el controlador más agresivo del juego. Puede fumar incluso después de muerta, curarse con cada kill/assist, y tiene la habilidad única de autorevivirse. Ideal para jugadores de controlador que no quieren quedarse atrás esperando.',
    playstyleTips: [
      'Tus humos (Ardid) se recargan cada 30s y podés usarlos incluso después de morir',
      'Agárrate (Pick-Me-Up) funciona con kills Y asistencias — siempre buscá tradeos para activarlo',
      'Entrometida (Meddle) hace 90 de decay; combinala con habilidades de daño para kills fáciles',
      'Aún No He Muerto (definitiva) te revive pero necesitás kill/assist en 6s o morís permanentemente',
      'Jugá más agresivo que otros controladores; tu kit premia tomar duelos y conseguir eliminaciones'
    ],
    trait: 'Controladora inmortal — humos post-mortem y autorevivida',
    bestMaps: ['Ascent', 'Haven', 'Bind'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Agárrate (Pick-Me-Up)',
        type: 'Básica',
        key: 'C',
        cost: 100,
        description: 'Mariposas flotan sobre los cadáveres cuando Clove consigue un asesinato o asistencia. Inicia un temporizador para usar la habilidad. Usar Agárrate permite a Clove consumir estas mariposas para ganar sobrecuración temporal y velocidad de movimiento. Se puede usar incluso si el cuerpo no está en línea de visión.'
      },
      {
        name: 'Entrometida (Meddle)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        description: 'Clove lanza un fragmento de esencia de inmortalidad en una dirección deseada. Después de la explosión, disminuye el HP enemigo significativamente (90 puntos de decay). También afecta a compañeros y a Clove misma. Ideal para combinar con Paint Shell o Shock Dart.'
      },
      {
        name: 'Ardid (Ruse)',
        type: 'Firma',
        key: 'E',
        description: 'Clove abre un mapa táctico, similar a Brimstone. Puede usar dos fumas después. Las fumas se reponen cada 30 segundos. Clove puede usar Ardid incluso después de muerta, aunque el radio del mapa táctico se reduce tras morir.'
      },
      {
        name: 'Aún No He Muerto (Not Dead Yet)',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'La definitiva de Clove te da otra oportunidad de pelear. Clove abraza su inmortalidad y se autorevive. Tras morir, tenés un temporizador para elegir si revivir. Luego, tenés 6 segundos para matar o asistir. Si lográs un kill o asistencia, ganás inmortalidad permanente. Si fallás, morís definitivamente.'
      }
    ]
  },
  {
    id: 'miks',
    name: 'Miks',
    role: 'Controlador',
    difficulty: 'Fácil',
    description: 'Miks es el controlador más reciente de VALORANT, especializado en manipulación de hongos y esporas para negar visión y causar daño de área. Su kit es simple pero efectivo, perfecto para jugadores nuevos en el rol de controlador.',
    playstyleTips: [
      'Nube de Esporas es tu principal herramienta de humo; colocalas rápido como Brimstone',
      'Ráfaga Fúngica es excelente para negar espacios estrechos; combinala con otros daños de área',
      'Colonización te permite cubrir zonas amplias con esporas ralentizadoras lentamente',
      'Tu definitiva Miocardio crea una nube tóxica masiva que obliga al enemigo a moverse o morir',
      'Miks funciona mejor en composiciones agresivas donde la negación rápida de visión es más valiosa que humos duraderos'
    ],
    trait: 'Maestro de hongos — control de visión y daño biológico',
    bestMaps: ['Fracture', 'Lotus', 'Split'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Ráfaga Fúngica (Fungal Burst)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Miks lanza una espora que al impactar crea una nube de hongos. Los enemigos en la nube reciben daño por segundo y son ralentizados brevemente. La nube persiste 4 segundos. Efectivo para negar choke points y forzar reposicionamiento.'
      },
      {
        name: 'Nube de Esporas (Spore Cloud)',
        type: 'Firma',
        key: 'E',
        description: 'Similar a Brimstone, Miks abre el mapa táctico y coloca hasta 2 nubes de esporas. Las nubes bloquean visión y dañan levemente a enemigos que las atraviesan. Se recargan cada 35 segundos, máximo 2 cargas.'
      },
      {
        name: 'Colonización (Colonization)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        description: 'Miks despliega un micelio en el suelo que se expande lentamente en un área. Los enemigos que pisan el micelio son ralentizados y dejan un rastro visible de esporas por 3 segundos. El micelio persiste 8 segundos y cubre un radio considerable.'
      },
      {
        name: 'Miocardio (Myocardium)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Miks libera una nube masiva de esporas tóxicas en un área grande. Los enemigos dentro reciben daño creciente cada segundo que permanecen en la nube. Al alcanzar el daño máximo, quedan vulnerables (reciben doble daño) hasta que salen. La nube persiste 8 segundos. Ideal para ejecuciones de sitio y retakes.'
      }
    ]
  },
  {
    id: 'sova',
    name: 'Sova',
    role: 'Iniciador',
    difficulty: 'Difícil',
    description: 'Sova es el iniciador de reconocimiento clásico. Su dron y flechas de detección brindan información vital del campo de batalla. Su definitiva atraviesa paredes y puede conseguir kills imposibles. Requiere aprender lineups para maximizar su potencial.',
    playstyleTips: [
      'Aprendé lineups de Flecha Rastreadora para los mapas que jugás frecuentemente',
      'Flecha de Choque puede hacer daño doble si impacta directamente; tiene potencial de kill desde cualquier ángulo',
      'Dron Búho es excelente para limpiar esquinas profundas antes de que tu equipo entre',
      'Furia del Cazador (definitiva) atraviesa paredes — marcá enemigos revelados y dispará con precisión quirúrgica',
      'Coordiná tu Flecha Rastreadora con duelistas para darles información antes de que peekeen'
    ],
    trait: 'Cazador experto — reconocimiento y daño a distancia',
    bestMaps: ['Ascent', 'Haven', 'Breeze'],
    weakMaps: ['Fracture', 'Split'],
    abilities: [
      {
        name: 'Flecha de Choque (Shock Bolt)',
        type: 'Básica',
        key: 'Q',
        cost: 150,
        charges: 2,
        description: 'Sacá una flecha cargada con electricidad. Disparala en una dirección hasta que toque una superficie, objeto o enemigo. Al contacto, la electricidad crea una explosión de onda de choque que daña a cualquier unidad cercana.'
      },
      {
        name: 'Dron Búho (Owl Drone)',
        type: 'Básica',
        key: 'C',
        cost: 400,
        description: 'Sova lanza su dron y lo envía hacia adelante. El dron puede moverse y ver todo frente a él. Mientras escanea, puede disparar dardos al enemigo para revelar su ubicación en vivo por un breve tiempo. El dron puede ser destruido por fuego enemigo.'
      },
      {
        name: 'Flecha Rastreadora (Recon Bolt)',
        type: 'Firma',
        key: 'E',
        description: 'Sova equipa su flecha de reconocimiento. Después de lanzarla en una dirección, se adhiere a cualquier objeto, superficie o enemigo, dando actualizaciones de ubicación en vivo alrededor. El fuego enemigo destruye la flecha de reconocimiento. Recarga con el tiempo (máximo 2).'
      },
      {
        name: 'Furia del Cazador (Hunter\'s Fury)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Sova desata su cazador interior y carga su arco al máximo potencial. Al activarse, Sova puede lanzar grandes rayos eléctricos en una dirección, causando daño pesado y revelando la ubicación en vivo del enemigo golpeado. Los rayos atraviesan paredes y objetos. Hasta un máximo de 3 disparos.'
      }
    ]
  },
  {
    id: 'breach',
    name: 'Breach',
    role: 'Iniciador',
    difficulty: 'Difícil',
    description: 'Breach es el iniciador más agresivo. Todas sus habilidades atraviesan paredes, permitiéndole stunear, flashear y derribar enemigos sin exponerse. Perfecto para mapas con muchas paredes y espacios cerrados.',
    playstyleTips: [
      'Todas tus habilidades atraviesan paredes; posicionate detrás de cobertura segura siempre',
      'Falla Sísmica (firma) se puede cargar más tiempo para mayor alcance y duración de stun',
      'Luz Cegadora se activa al contacto con la pared del otro lado; el timing es clave',
      'Réplica causa 3 pulsos de daño; combinala con tu stun para asegurar kills',
      'Trueno Rodante (definitiva) es una de las mejores para iniciar ejecuciones — aturde y desplaza a todos'
    ],
    trait: 'Demoledor sísmico — todas sus habilidades atraviesan paredes',
    bestMaps: ['Split', 'Fracture', 'Haven'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Luz Cegadora (Flashpoint)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        charges: 2,
        description: 'Breach lanza una bengala cegadora a través de cualquier pared o estructura. La bengala detona al otro lado y ciega a cualquiera que mire en esa dirección.'
      },
      {
        name: 'Réplica (Aftershock)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        description: 'Breach lanza una baliza en cualquier pared o estructura. La baliza lanza un choque dañino en el lado opuesto 3 veces. Réplica daña a cualquier agente cerca del área afectada.'
      },
      {
        name: 'Falla Sísmica (Fault Line)',
        type: 'Firma',
        key: 'E',
        description: 'Carga un pulso sísmico. Al lanzarlo en una dirección, Breach aturde a cualquiera en su zona por un breve período. Afecta tanto a compañeros como enemigos. Cuanto más se carga, más alcance y duración tiene.'
      },
      {
        name: 'Trueno Rodante (Rolling Thunder)',
        type: 'Definitiva',
        key: 'X',
        cost: 9,
        description: 'Breach saca la carga sísmica más grande marcando una gran ubicación. Al lanzarse, el área es afectada por un gran terremoto que derriba y aturde brevemente a cualquiera en el área en forma de cono. También afecta a compañeros.'
      }
    ]
  },
  {
    id: 'skye',
    name: 'Skye',
    role: 'Iniciador',
    difficulty: 'Media',
    description: 'Skye es la iniciadora más versátil. Puede flashear, stunear, curar en área y rastrear enemigos con su definitiva. Su flash es controlable y te da confirmación de cegado. Ideal para equipos que necesitan soporte completo.',
    playstyleTips: [
      'Luz Guía (pájaro flash) es controlable: dirigilo hacia donde querés que explote',
      'Cuando cegás con Luz Guía, Skye recibe confirmación de cuántos enemigos fueron afectados — información vital',
      'Tigre de Tasmania es lento pero puede saltar; usalo para stunear enemigos en espacios reducidos',
      'Crecimiento (curación) es AoE pero usa una barra de recurso; curá a varios aliados juntos para eficiencia',
      'Buscadores (definitiva) persiguen a los 3 enemigos más cercanos; lanzalos antes de una ejecución para ubicarlos'
    ],
    trait: 'Guardián de la naturaleza — flash controlable, stun y curación AoE',
    bestMaps: ['Bind', 'Ascent', 'Haven'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Tigre de Tasmania (Trailblazer)',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        description: 'Skye invoca un tigre de Tasmania de su amuleto. El tigre puede moverse y dar visión a Skye a través de sus ojos. También puede causar una pequeña cantidad de daño y aturdir enemigos por un breve tiempo al impactar. El fuego enemigo puede destruir el Tigre.'
      },
      {
        name: 'Crecimiento (Regrowth)',
        type: 'Básica',
        key: 'C',
        cost: 150,
        description: 'Skye usa su barra de curación y sana a los compañeros cerca de ella. Los compañeros ganan hasta 100 HP con el tiempo. Si todos los compañeros están completamente curados, la barra deja de bajar.'
      },
      {
        name: 'Luz Guía (Guiding Light)',
        type: 'Firma',
        key: 'E',
        description: 'Skye equipa un amuleto de pájaro y lo lanza en una dirección. Mientras está en su trayectoria, el pájaro puede detonarse. Después de la detonación, ciega a cualquiera que mire en dirección al pájaro. Skye obtiene información de si alguien fue afectado por el cegado. Máximo 2 cargas, se recargan con el tiempo.'
      },
      {
        name: 'Buscadores (Seekers)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Skye invoca tres amuletos más grandes y los envía hacia adelante. Los amuletos persiguen a los 3 enemigos más cercanos por un corto tiempo. Al contactar al enemigo, explotan en su cara dejándolos ciegos y sordos brevemente. El fuego enemigo destruye los amuletos.'
      }
    ]
  },
  {
    id: 'kayo',
    name: 'KAY/O',
    role: 'Iniciador',
    difficulty: 'Media',
    description: 'KAY/O es el iniciador supresor. Su cuchillo y definitiva silencian habilidades enemigas, siendo el counter perfecto contra agentes que dependen de sus skills. También tiene flash y molly, dándole un kit completo y agresivo.',
    playstyleTips: [
      'FLASH/DRIVE tiene dos modos: click derecho (pop rápido, menor duración) y click izquierdo (lob, mayor duración)',
      'FRAG/MENT hace daño en área y es excelente para negar el desactivado',
      'ZERO/POINT (cuchillo supresor) revela Y suprime a quien golpea; lanzalo al inicio de la ronda para información',
      'NULL/CMD (definitiva) te da buffs de combate y suprime en área; si morís, tus aliados pueden revivirte',
      'KAY/O es counter directo de agentes como Jett, Reyna, Raze, Chamber, y cualquier agente con habilidades de escape'
    ],
    trait: 'Supresor robótico — silencia habilidades enemigas',
    bestMaps: ['Ascent', 'Bind', 'Haven'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'FLASH/DRIVE',
        type: 'Básica',
        key: 'Q',
        cost: 250,
        charges: 2,
        description: 'KAY/O lanza una granada flash que explota después de un breve tiempo y ciega a cualquiera que la mire. La granada flash también puede rebotar en una pared o ser lanzada en una dirección determinada para un estallido más rápido y menor duración de cegado.'
      },
      {
        name: 'FRAG/MENT',
        type: 'Básica',
        key: 'C',
        cost: 200,
        description: 'KAY/O crea una bola de fragmento de energía. Después de lanzarla, detona al contacto con la superficie. Crea un charco de energía que daña a cualquier agente dentro del charco, incluidos compañeros.'
      },
      {
        name: 'ZERO/POINT',
        type: 'Firma',
        key: 'E',
        description: 'Lanza un cuchillo no dañino. Se adhiere a cualquier superficie, objeto o enemigo y detona. Después de la detonación, silencia las habilidades de los enemigos afectados y los revela. El fuego enemigo puede destruir el cuchillo antes de la detonación.'
      },
      {
        name: 'NULL/CMD',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'KAY/O inicia una ola de energía que pulsa en la dirección que está mirando. Su alcance aumenta con el tiempo. Si la ola toca enemigos, sus habilidades se bloquean y las utilidades existentes se pausan. KAY/O gana velocidad de movimiento, cadencia de fuego, velocidad de recarga y velocidad de recuperación. Si muere durante su definitiva, no es eliminado instantáneamente sino que queda inmovilizado con mucha vida adicional. Los compañeros pueden revivirlo dentro de un breve período y ganará HP completo.'
      }
    ]
  },
  {
    id: 'fade',
    name: 'Fade',
    role: 'Iniciador',
    difficulty: 'Difícil',
    description: 'Fade es la iniciadora del miedo. Sus habilidades revelan, atrapan y ensordecen enemigos. Su Acechador persigue automáticamente a enemigos marcados. Ideal para equipos que juegan agresivo y quieren información constante de posiciones.',
    playstyleTips: [
      'Acechador persigue automáticamente a enemigos con Rastro de Terror; usalo después de Haunt o Anochecer',
      'Haunt (ojo) escanea en área grande; lanzalo alto para cubrir más espacio de detección',
      'Atar crea un charco circular que atrapa enemigos; combinalo con granadas o definitivas de daño',
      'Anochecer (definitiva) cubre una línea larga y marca a todos los que toca; es excelente para retakes',
      'Usá el Rastro de Terror pasivo para trackear enemigos que escapan después de ser detectados'
    ],
    trait: 'Cazadora de pesadillas — revelación y persecución automática',
    bestMaps: ['Pearl', 'Lotus', 'Fracture'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Rastro de Terror (Terror Trail)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Fade marca a los enemigos con una niebla oscura por un breve tiempo cada vez que Haunt o Anochecer golpea a sus enemigos. El Acechador persigue a enemigos marcados sin control de Fade.'
      },
      {
        name: 'Atar (Seize)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Fade anuda una bola de miedo. Lanzala para crear un círculo oscuro que atrapa a los enemigos en el lugar, sin dejarlos moverse. También crea deterioro y un efecto ensordecedor en los enemigos afectados.'
      },
      {
        name: 'Acechador (Prowler)',
        type: 'Básica',
        key: 'C',
        cost: 300,
        charges: 2,
        description: 'Fade invoca un Acechador del mundo del miedo. Fade puede controlarlo y moverlo. El Acechador escanea enemigos enfrente y los ciega al contacto. Persigue automáticamente a enemigos con el Rastro de Terror.'
      },
      {
        name: 'Haunt',
        type: 'Firma',
        key: 'E',
        description: 'Fade lanza un vigilante. Después de una corta distancia de viaje, cae al suelo y escanea enemigos. Si el vigilante detecta un enemigo, da su ubicación en vivo y marca al enemigo con un Rastro de Terror. Se recarga con el tiempo.'
      },
      {
        name: 'Anochecer (Nightfall)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Inicia una ola de pesadilla y envíala hacia adelante. Después de atrapar a cualquier enemigo en la ola, los marcará con el Rastro de Terror y creará un efecto ensordecedor.'
      }
    ]
  },
  {
    id: 'gekko',
    name: 'Gekko',
    role: 'Iniciador',
    difficulty: 'Media',
    description: 'Gekko es el iniciador con mascotas. Sus amigos Wingman, Dizzy, Mosh y Thrash realizan todas las funciones: flashear, stunear, dañar y hasta plantar la spike. Sus mascotas se pueden recoger y reutilizar.',
    playstyleTips: [
      'Recogé los glóbulos que dejan tus mascotas para reutilizarlas (10s de cooldown tras recoger)',
      'Wingman puede plantar o desactivar la spike; mandate con él para plays inesperadas',
      'Dizzy es un flash aéreo que ciega a enemigos que mira hacia abajo; lanzalo alto',
      'Moshpit hace daño masivo en el centro — mata con armadura completa; combinalo con stuns aliados',
      'Thrash (definitiva) es una bomba de desarme en área; coordiná con tu equipo para limpiar el sitio completo'
    ],
    trait: 'Domador de criaturas — mascotas recolectables que hacen de todo',
    bestMaps: ['Haven', 'Lotus', 'Ascent'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Glóbulos (Globules)',
        type: 'Pasiva',
        key: 'Pasiva',
        description: 'Las mascotas de Gekko se convierten en bolas después de usarse o que expire su duración. Gekko puede reclamar las bolas y revivir a sus mascotas para usarlas de nuevo. Esto hace de Gekko uno de los personajes de utilidad más únicos de VALORANT. Cooldown de 10s tras recoger.'
      },
      {
        name: 'Wingman',
        type: 'Básica',
        key: 'Q',
        cost: 300,
        description: 'Agarrá a Wingman y lanzalo en una dirección. Wingman corre hacia la dirección y rebota en paredes o estructuras. Si encuentra un enemigo, corre más rápido y aturde al enemigo cercano si está muy próximo. Si tenés la spike, podés enviar a Wingman a plantarla. También puede desactivar la spike.'
      },
      {
        name: 'Moshpit (Mosh)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        description: 'Lanza a Mosh hacia el suelo. Al golpear el suelo, Mosh explota y crea un charco venenoso: cualquiera que se pare en él recibe daño pesado. Los enemigos con HP completo morirán si se paran en el medio del charco.'
      },
      {
        name: 'Dizzy',
        type: 'Firma',
        key: 'E',
        description: 'Gekko lanza a Dizzy al aire. Mientras está en el aire, Dizzy escupe baba azul a los ojos de los enemigos que escanea y los ciega. La ceguera no afecta la visión lateral de los enemigos. Recarga con el tiempo, máximo 2 cargas.'
      },
      {
        name: 'Thrash',
        type: 'Definitiva',
        key: 'X',
        cost: 7,
        description: 'Activá a Thrash y lanzalo hacia adelante. Thrash se mueve con movimiento rápido y da información crucial a Gekko. Durante su uso, Thrash puede saltar sobre un área y explotar. Al explotar, Thrash desarma a los enemigos en esa área y ralentiza su movimiento.'
      }
    ]
  },
  {
    id: 'tejo',
    name: 'Tejo',
    role: 'Iniciador',
    difficulty: 'Fácil',
    description: 'Tejo es uno de los mejores agentes de daño de VALORANT. Su kit es pura demolición: misiles teledirigidos, granadas de conmoción y un dron furtivo de supresión. Perfecto para jugadores que quieren ser agresivos como iniciadores.',
    playstyleTips: [
      'Salva Guiada (misiles) es su habilidad más poderosa; marcá 2 ubicaciones para daño masivo',
      'El Dron Furtivo es indetectable hasta que detona; ideal para flanquear sin ser visto',
      'Envío Especial (granada de conmoción) puede rebotar en paredes; usalo para desalojar posiciones defensivas',
      'Armagedón (definitiva) es un ataque aéreo direccional que mata con armadura ligera; bloquea áreas completas',
      'Combiná tus misiles con información de Sova o Fade para disparar con precisión a enemigos revelados'
    ],
    trait: 'Bombardero táctico — drones y misiles de demolición',
    bestMaps: ['Lotus', 'Fracture', 'Haven'],
    weakMaps: ['Breeze', 'Icebox'],
    abilities: [
      {
        name: 'Dron Furtivo (Stealth Drone)',
        type: 'Básica',
        key: 'C',
        cost: 300,
        description: 'Desplegá un dron que hace menos sonido y es indetectable hasta detonar. Usa fuego nuevamente para hacer explotar el dron y detectar enemigos en el área. También suprimirá a cualquiera afectado por él.'
      },
      {
        name: 'Envío Especial (Special Delivery)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Lanza una granada pegajosa a una superficie. Se adherirá al lugar y detonará después de un retraso. Una vez que explota, cualquiera en el área afectada recibirá conmoción. Podés hacer rebotar la granada una vez con fuego alternativo.'
      },
      {
        name: 'Salva Guiada (Guided Salvo)',
        type: 'Firma',
        key: 'E',
        description: 'Marcá una o dos áreas abriendo un mapa táctico. Usa fuego alternativo para lanzar misiles a las ubicaciones marcadas. Después de un retraso, los misiles se lanzarán al lugar deseado y derribarán al enemigo con tres instancias de daño de pulso.'
      },
      {
        name: 'Armagedón (Armageddon)',
        type: 'Definitiva',
        key: 'X',
        cost: 9,
        description: 'Abrí el mapa táctico y elegí un área de inicio. Hacé clic en el botón de disparo y rotá el cursor para seleccionar una dirección. Después, presioná el botón de disparo nuevamente para confirmar un ataque aéreo masivo. Matará a un enemigo sin armadura, con media armadura o con escudo de regeneración.'
      }
    ]
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Centinela',
    difficulty: 'Fácil',
    description: 'Sage es la sanadora de VALORANT. Su muro, orbes de ralentización y curación la convierten en el pilar defensivo de cualquier composición. Su definitiva de resurrección puede cambiar el resultado de una ronda.',
    playstyleTips: [
      'Orbe de Barrera (muro) se puede rotar antes de colocar; crea ángulos inesperados y boosts',
      'Orbe de Ralentización rebota y cubre área; lanzalo al inicio de la ronda para frenar pushes',
      'Curación sana más a aliados que a vos misma; priorizá curar a duelistas después de sus entradas',
      'Resurrección tiene animación larga; asegurate de tener cobertura antes de usarla',
      'Sage es mejor como soporte defensivo; no busques duelos en primera línea, mantenete viva para curar y revivir'
    ],
    trait: 'Sanadora definitiva — muro, curación y resurrección',
    bestMaps: ['Split', 'Icebox', 'Bind'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Orbe de Ralentización (Slow Orb)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Sage crea un orbe de cristal que, al lanzarse, explota y crea un charco. El charco ralentiza a cualquiera o cualquier cosa que camine sobre él y crea un sonido cristalizante.'
      },
      {
        name: 'Orbe de Barrera (Barrier Orb)',
        type: 'Básica',
        key: 'C',
        cost: 400,
        description: 'Sage usa ambas manos para crear una barrera de cristal que tarda un tiempo en formarse. Una barrera completamente formada requiere una cantidad significativa de balas, cuchilladas o habilidades destructoras de barreras para derribarla. Bloquea la visión mientras está activa.'
      },
      {
        name: 'Orbe de Curación (Healing Orb)',
        type: 'Firma',
        key: 'E',
        description: 'Genera un orbe de curación y úsalo en un compañero o en vos misma para recuperar salud. Curarse a uno mismo causa significativamente menos curación que curar a los compañeros. Recarga con el tiempo (45s).'
      },
      {
        name: 'Resurrección (Resurrection)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Iniciá el efecto de resurrección lanzándolo sobre un compañero muerto. Después de que termine la duración del efecto, tu compañero revive con HP completo.'
      }
    ]
  },
  {
    id: 'cypher',
    name: 'Cypher',
    role: 'Centinela',
    difficulty: 'Media',
    description: 'Cypher es el centinela de información supremo. Sus cables trampa, cámara espía y jaulas le permiten controlar flancos y sitios completos sin estar presente. Su definitiva revela la ubicación de todos los enemigos.',
    playstyleTips: [
      'Colocá Cables Trampa en alturas inesperadas; la mayoría de jugadores mira al nivel del suelo',
      'Cámara Espía se puede recuperar y reutilizar si no la destruyen; reposicioná frecuentemente',
      'Jaula Cibernética tiene audio único que puede enmascarar tus pasos para rotaciones silenciosas',
      'Hurto Neural (definitiva) se activa sobre cadáveres enemigos; usalo apenas conseguís una kill',
      'En ataque, usá tus setups para cubrir el flanco de tu equipo, no te quedés atrás solo'
    ],
    trait: 'Vigilante invisible — trampas, cámara y detección global',
    bestMaps: ['Haven', 'Split', 'Bind'],
    weakMaps: ['Fracture'],
    abilities: [
      {
        name: 'Jaula Cibernética (Cyber Cage)',
        type: 'Básica',
        key: 'Q',
        cost: 100,
        charges: 2,
        description: 'Lanza un botón futurista al suelo. Activalo para crear una jaula cinética cibernética que bloquea la visión dentro o fuera del área enjaulada. Además produce un sonido que enmascara el audio.'
      },
      {
        name: 'Cable Trampa (Trapwire)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Equipa una pequeña trampa cibernética. Al colocarla en un lugar, crea un cable invisible. Si un enemigo toca el cable, lo atrae brevemente antes de aturdirlo. Durante esto, la trampa revela la ubicación del objetivo capturado. Se rearma tras un breve período y solo puede ser destruida por balas o habilidades.'
      },
      {
        name: 'Cámara Espía (Spycam)',
        type: 'Firma',
        key: 'E',
        description: 'Coloca la cámara en cualquier lugar. Cypher puede espiar la ubicación remotamente. También puede lanzar un dardo marcador desde la cámara a un enemigo. El dardo envía información de ubicación del enemigo hasta que lo remuevan. Si la cámara no es destruida, se puede recuperar.'
      },
      {
        name: 'Hurto Neural (Neural Theft)',
        type: 'Definitiva',
        key: 'X',
        cost: 6,
        description: 'Cypher lanza su sombrero hacia un enemigo muerto. El sombrero toma un breve tiempo de iniciación antes de cargar la ubicación del resto de los enemigos. La ubicación se revela dos veces con un retraso de 2 segundos.'
      }
    ]
  },
  {
    id: 'killjoy',
    name: 'Killjoy',
    role: 'Centinela',
    difficulty: 'Fácil',
    description: 'Killjoy es la centinela tecnológica. Su torreta, alarmbot y nanoswarms le permiten asegurar un sitio por completo. Su definitiva Cierre de Seguridad desarma a todos los enemigos en un área masiva. La elección perfecta para jugadores metódicos.',
    playstyleTips: [
      'Torreta cubre 180 grados; colocala en ángulos que obliguen al enemigo a exponerse para destruirla',
      'Alarmbot + Nanoswarm es un combo letal; cuando el bot detecta, activá el swarm para la kill',
      'Nanoswarm se puede colocar y activar remotamente; escondelos en lugares difíciles de ver',
      'Cierre de Seguridad se puede colocar detrás de cobertura y cubre un radio enorme; forzá al enemigo a elegir: retirarse o destruirlo',
      'Recall de Torreta y Alarmbot tienen alcance limitado; no te alejes demasiado de tu sitio'
    ],
    trait: 'Ingeniera defensiva — torreta, trampas y desarme en área',
    bestMaps: ['Ascent', 'Haven', 'Lotus'],
    weakMaps: ['Fracture', 'Breeze'],
    abilities: [
      {
        name: 'Alarmbot',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        description: 'Colocá un bot escáner en un lugar. El bot permanece oculto hasta que escanea a un enemigo. Persigue al enemigo después de encontrarlo y explota al contacto. Después de la explosión, el bot vuelve vulnerable al enemigo afectado por un breve período.'
      },
      {
        name: 'Nanoswarm (Nanoenjambre)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Killjoy puede colocar granadas de nanoenjambre en cualquier lugar del mapa. Una vez que activás la granada, crea un campo de energía y causa daño a cualquiera dentro del campo. Las granadas son invisibles hasta que se activan.'
      },
      {
        name: 'Torreta (Turret)',
        type: 'Firma',
        key: 'E',
        description: 'Colocá una torreta en un lugar. La torreta escanea a cualquiera en un radio de 180 grados hacia adelante e inflige daño. La torreta causa daño en ráfagas si el enemigo está más cerca. Se recupera después de un cooldown al recogerla.'
      },
      {
        name: 'Lockdown (Cierre de Seguridad)',
        type: 'Definitiva',
        key: 'X',
        cost: 9,
        description: 'Iniciá el cierre de seguridad colocando el dispositivo. Crea un domo de energía masivo alrededor de su alcance y tarda un tiempo en bloquear todo dentro del área (13s). Una vez que el cierre está completo, todos los enemigos son desarmados y ralentizados por 8 segundos. El dispositivo puede ser destruido.'
      }
    ]
  },
  {
    id: 'chamber',
    name: 'Chamber',
    role: 'Centinela',
    difficulty: 'Difícil',
    description: 'Chamber es el centinela francotirador. Su kit incluye una pistola pesada, teletransporte instantáneo y un operador de definitiva. Diseñado para jugadores con excelente puntería que quieren un centinela agresivo.',
    playstyleTips: [
      'Headhunter es una sheriff con ADS; excelente para rondas económicas y ahorro',
      'Rendezvous (teleport) tiene alcance limitado pero es instantáneo; colocalo en un lugar seguro',
      'Trademark ralentiza y da alerta de sonido; usalo para cubrir flancos',
      'Tour de Force (definitiva) es un operador mejorado que mata de un tiro en cualquier parte del cuerpo',
      'Tour de Force deja un campo de ralentización por cada kill; encadená kills para cubrir el sitio'
    ],
    trait: 'Francotirador elegante — armas personalizadas y teletransporte',
    bestMaps: ['Breeze', 'Icebox', 'Ascent'],
    weakMaps: ['Fracture'],
    abilities: [
      {
        name: 'Headhunter (Cazatalentos)',
        type: 'Básica',
        key: 'Q',
        cost: 100,
        description: 'Chamber equipa una pistola pesada de su arsenal. Esta arma tiene menos balas (8) y tiene una mira personalizada. La pistola mata instantáneamente si la bala conecta con la cabeza y causa menos daño en otras partes del cuerpo.'
      },
      {
        name: 'Trademark (Marca Registrada)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        charges: 2,
        description: 'Colocá una pequeña trampa. Si un enemigo se acerca a la trampa, detecta su presencia y crea un campo de ralentización. Chamber también recibe una alerta de sonido después de la activación.'
      },
      {
        name: 'Rendezvous (Encuentro)',
        type: 'Firma',
        key: 'E',
        description: 'Chamber usa su tarjeta de firma para colocar un marcador. Chamber puede teletransportarse instantáneamente al marcador en cualquier momento, pero necesita permanecer dentro del alcance del marcador. Tras la teleportación, tarda un tiempo en sacar su arma.'
      },
      {
        name: 'Tour de Force (Gira Triunfal)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Equipa un rifle de francotirador personalizado con 5 balas. El rifle inflige daño pesado al impactar y mata al enemigo incluso si la bala golpea la pierna. Este francotirador viene con mejor velocidad de giro, alcance rápido y mejor precisión. Además, cada kill crea un campo de ralentización persistente.'
      }
    ]
  },
  {
    id: 'deadlock',
    name: 'Deadlock',
    role: 'Centinela',
    difficulty: 'Difícil',
    description: 'Deadlock es una centinela noruega con control de área letal. Su malla de barrera bloquea pasajes, sus sensores de sonido aturden, y su definitiva arrastra y elimina enemigos. Ideal para jugadores que priorizan el control físico del espacio.',
    playstyleTips: [
      'Malla de Barrera bloquea el movimiento enemigo pero no las balas; usala en choke points estrechos',
      'Sensor Sónico se activa con cualquier sonido (pasos corriendo, disparos, recargas); colocá varios en un sitio',
      'Red Gravitatoria fuerza crouch y ralentiza; lanzala en zonas donde sabés que el enemigo va a pasar',
      'Aniquilación atrapa un enemigo en un capullo; si llega al punto de origen, muere instantáneamente',
      'Coordiná Aniquilación con aliados para cubrir el capullo o forzar al enemigo a elegir entre salvar al compañero o pelear'
    ],
    trait: 'Cazadora noruega — barreras físicas y trampas de sonido',
    bestMaps: ['Bind', 'Split', 'Ascent'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Red Gravitatoria (GravNet)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        description: 'Deadlock lanza una granada que detona y se convierte en una trampa de red circular. Cualquier enemigo atrapado entra en modo agachado y su velocidad de movimiento se reduce. Habilidades de movimiento como Dash, Teletransporte o Gatecrash anularán la ralentización y el efecto de agachado.'
      },
      {
        name: 'Sensor Sónico (Sonic Sensor)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Lanza un sensor en una estructura o superficie, y se adhiere al mismo. El sensor detecta pasos corriendo, disparos, recargas o cualquier ruido y aplica un efecto de conmoción en un área cercana. El sensor no se activa si el enemigo camina usando shift (sigilo).'
      },
      {
        name: 'Malla de Barrera (Barrier Mesh)',
        type: 'Firma',
        key: 'E',
        description: 'La habilidad de firma de Deadlock. Lanza un disco en cualquier ubicación donde crea un núcleo. Alrededor se crea una barrera en forma de X que bloquea a los enemigos de atravesarla. La barrera no puede bloquear fuego entrante, solo enemigos. Se crea con bolas de nanocable destructibles.'
      },
      {
        name: 'Aniquilación (Annihilation)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Deadlock teje un hilo de nanocables en una estructura o pared. Los cables encierran a un enemigo en un capullo una vez que entra en contacto. El enemigo encapsulado está desarmado, no puede moverse y es arrastrado hacia el punto de inicio de los cables. Una vez que llega al punto de inicio, el enemigo muere. Para liberar al compañero, se debe disparar al capullo.'
      }
    ]
  },
  {
    id: 'vyse',
    name: 'Vyse',
    role: 'Centinela',
    difficulty: 'Media',
    description: 'Vyse es la centinela más agresiva. Su kit incluye un flash (único entre centinelas), trampas que crean muros indestructibles temporales, y una definitiva que desarma armas primarias enemigas en un área masiva.',
    playstyleTips: [
      'ArcRose es el único flash de centinela en el juego; usalo para ganar duelos inesperados',
      'Cizalla crea un muro indestructible temporal cuando se activa; usala en choke points para detener pushes',
      'Zarza de Navajas es excelente para combinarlo con Cizalla; los enemigos no pueden escapar del daño',
      'Jardín de Acero (definitiva) desarma armas primarias; lanzala al iniciar una ejecución o retake',
      'Jugá a Vyse como un híbrido centinela-iniciador; tu kit recompensa el juego agresivo más que pasivo'
    ],
    trait: 'Centinela agresiva — flash único y desarme de armas primarias',
    bestMaps: ['Bind', 'Haven', 'Ascent'],
    weakMaps: ['Icebox', 'Breeze'],
    abilities: [
      {
        name: 'Zarza de Navajas (Razorvine)',
        type: 'Básica',
        key: 'C',
        cost: 200,
        description: 'Lanza una zarza al suelo. Después de que se fija al suelo, puedes activarla para dañar a los enemigos en el laberinto de zarzas. También ralentizará a los enemigos mientras permanezcan dentro.'
      },
      {
        name: 'Cizalla (Shear)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Vyse crea una trampa que se activa cuando alguien pasa cerca. Después de la activación, aparece un muro indestructible por una breve duración que bloquea el paso. Excelente para dividir equipos enemigos.'
      },
      {
        name: 'ArcRose (Rosa Arco)',
        type: 'Firma',
        key: 'E',
        description: 'Vyse es la primera centinela con flash. Su firma te permite equipar una rosa que puedes plantar en la pared o a través de una pared hacia el otro lado. Después de adherirse a la pared, úsala nuevamente para flashear a los enemigos que miren hacia ella. La rosa es invisible hasta que la activas.'
      },
      {
        name: 'Jardín de Acero (Steel Garden)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'La habilidad definitiva más fuerte de Vyse. Lanza zarzas de acero en un área enorme. Una vez que las zarzas están activas después de un breve período, cualquier enemigo en el radio ya no podrá usar su arma primaria por 8 segundos. Solo podrán usar armas secundarias y habilidades.'
      }
    ]
  },
  {
    id: 'veto',
    name: 'Veto',
    role: 'Centinela',
    difficulty: 'Difícil',
    description: 'Veto es un centinela especializado en negación de área con tecnología de pulsos electromagnéticos. Su kit ralentiza, desorienta y bloquea habilidades enemigas en zonas específicas. Ideal para jugadores tácticos que quieren dominar el campo de batalla con control científico.',
    playstyleTips: [
      'Jaula de Faraday bloquea habilidades enemigas dentro de su área; colocala en entradas de sitio',
      'Pulso Inhibidor es excelente para retrasar pushes; el ralentizamiento apilable castiga a enemigos que insisten',
      'Mina de Proximidad revela ubicación además de hacer daño; información + control en una habilidad',
      'Tormenta EM (definitiva) limpia un área de todas las utilidades enemigas; timing es clave para retakes',
      'Veto funciona mejor en mapas con choke points definidos donde puede establecer zonas de control'
    ],
    trait: 'Ingeniero electromagnético — pulsos que desactivan habilidades enemigas',
    bestMaps: ['Split', 'Haven', 'Lotus'],
    weakMaps: ['Breeze'],
    abilities: [
      {
        name: 'Pulso Inhibidor (Inhibitor Pulse)',
        type: 'Básica',
        key: 'Q',
        cost: 200,
        charges: 2,
        description: 'Veto despliega un dispositivo que emite pulsos electromagnéticos en un cono frontal. Los enemigos alcanzados son ralentizados un 30% por pulso. El efecto se acumula: cada pulso adicional aumenta la ralentización. El dispositivo puede ser destruido por disparos enemigos.'
      },
      {
        name: 'Jaula de Faraday (Faraday Cage)',
        type: 'Básica',
        key: 'C',
        cost: 250,
        description: 'Veto coloca un campo electromagnético en una ubicación. Los enemigos dentro de la jaula no pueden usar habilidades. Las balas y habilidades pueden atravesar la jaula normalmente. La jaula persiste 6 segundos y parpadea antes de desactivarse, dando aviso a ambos equipos.'
      },
      {
        name: 'Mina de Proximidad EM (EM Proximity Mine)',
        type: 'Firma',
        key: 'E',
        description: 'Veto coloca una mina de proximidad que se activa con el movimiento enemigo. Al detonar, causa daño moderado, revela la ubicación del enemigo por 3 segundos y desactiva temporalmente su minimapa. Se recarga con el tiempo, máximo 2 cargas.'
      },
      {
        name: 'Tormenta EM (EM Storm)',
        type: 'Definitiva',
        key: 'X',
        cost: 8,
        description: 'Veto desata una tormenta electromagnética en un área grande. Durante 6 segundos, todas las utilidades enemigas dentro del área son destruidas, y los enemigos no pueden usar habilidades. Además, su visión es distorsionada con interferencia estática. Veto y sus aliados pueden ver siluetas de enemigos dentro de la tormenta.'
      }
    ]
  },
];

export default agentAbilities;

export const getAgentProfile = (name: string): AgentProfile | undefined => {
  return agentAbilities.find(
    a => a.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAgentsByRole = (role: AgentClassName): AgentProfile[] => {
  return agentAbilities.filter(a => a.role === role);
};

export const getAgentsByDifficulty = (difficulty: Difficulty): AgentProfile[] => {
  return agentAbilities.filter(a => a.difficulty === difficulty);
};
