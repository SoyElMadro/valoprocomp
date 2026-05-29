export type TacticSide = 'Ataque' | 'Defensa';
export type TacticDifficulty = 'Básica' | 'Intermedia' | 'Avanzada';
export type MapSize = 'Pequeño' | 'Mediano' | 'Grande';

export interface TacticCounter {
  tactica: string;
  counter: string;
}

export interface StratTactic {
  id: string;
  nombre: string;
  lado: TacticSide;
  dificultad: TacticDifficulty;
  descripcion: string;
  comoEjecutarla: string[];
  cuandoUsarla: string[];
  counters: string[];
  agentesRecomendados: string[];
}

export interface MapSpecificTactic {
  mapa: string;
  lado: TacticSide;
  sitio: string;
  tactica: string;
  descripcion: string;
  pasos: string[];
  counters: string[];
}

export interface GeneralTacticCounter {
  tactica: string;
  descripcion: string;
  counters: TacticCounter[];
}

export interface ClassCounter {
  clase: string;
  fortalezaContra: string;
  debilidadContra: string;
  comoContrarrestar: string;
}

// =============================================================================
// Tácticas generales y sus counters
// =============================================================================
export const generalTacticCounters: GeneralTacticCounter[] = [
  {
    tactica: 'Rush (Entrada rápida)',
    descripcion: 'Los 5 jugadores entran al sitio simultáneamente usando todas sus utilidades de una vez. Busca abrumar a los defensores antes de que puedan rotar.',
    counters: [
      {
        tactica: 'Rush (5-man push)',
        counter: 'Utilidades de ralentización (Sage, Deadlock, Vyse) en las entradas. Si frenás a los primeros 2, el rush pierde momentum. Info temprana con Sova o Cypher para anticipar la dirección del rush y rotar defensores antes de que lleguen.'
      },
      {
        tactica: 'Rush con humos pesados',
        counter: 'Spam a través de humos con Odin/Ares. Agentes como Sova (Flecha Rastreadora) o Gekko (Dizzy) para revelar dentro del humo. KAY/O (Cuchillo supresor) para silenciar las habilidades de entrada.'
      },
      {
        tactica: 'Rush con doble duelista',
        counter: 'Breach (Falla Sísmica + Trueno Rodante) para stunear a los duelistas apenas entran. Vyse (Cizalla) para dividir al equipo atacante. Killjoy (Nanoswarm + Alarmbot) para castigar la aglomeración.'
      }
    ]
  },
  {
    tactica: 'Default / Juego lento',
    descripcion: 'El equipo se separa para tomar control del mapa sin comprometerse. Se busca picks (bajas tempranas) y desgastar las utilidades defensivas antes de ejecutar.',
    counters: [
      {
        tactica: 'Default con lurker',
        counter: 'Cypher (Cables Trampa + Cámara) para detectar al lurker. Chamber (Trademark) para cubrir flancos. Deadlock (Sensores Sónicos) en rutas de flanqueo. Si el lurker es detectado, colapsar rápido 2v1.'
      },
      {
        tactica: 'Default con presión de mapa',
        counter: 'No regalar picks: jugar pasivo y en sitio, forzarlos a ejecutar. KAY/O (Cuchillo) para info temprana de dónde están agrupados. Mantener humos disponibles, no gastarlos en default.'
      },
      {
        tactica: 'Default buscando rotación',
        counter: 'Cypher en mapa para info global. Dejar un centinela anclado en cada sitio. Si detectás rotación, comunicar rápido para que el equipo colapse al sitio correcto.'
      }
    ]
  },
  {
    tactica: 'Split Push (Ataque dividido)',
    descripcion: 'El equipo se divide: 3 jugadores presionan un sitio mientras 2 atacan otro o flanquean. Busca confundir a los defensores y forzar rotaciones desventajosas.',
    counters: [
      {
        tactica: 'Split 3-2 a sitios opuestos',
        counter: 'Centinelas (Killjoy, Cypher) pueden aguantar solos con sus setups. Cámaras de Cypher o Torreta de Killjoy cubren un sitio mientras el resto del equipo refuerza el otro. Sage (Muro + Ralentización) para frenar el grupo pequeño.'
      },
      {
        tactica: 'Split con flanqueo',
        counter: 'Chamber (Trademark + Rendezvous) en el flanco: si se activa, teleport y pedí ayuda. Cypher (Cable Trampa) que no se pueda evitar sin hacer ruido. KAY/O (Cuchillo) para verificar si realmente están spliteando o es falso.'
      }
    ]
  },
  {
    tactica: 'Fake (Finta)',
    descripcion: 'El equipo hace ruido, lanza utilidades y finge atacar un sitio para rotar rápido al otro. Cuando los defensores rotan, el sitio queda libre.',
    counters: [
      {
        tactica: 'Fake con utilidades sonoras',
        counter: 'Cypher (Cámara) para ver el sitio contrario sin rotar físicamente. Dejá un centinela anclado siempre. No rotar hasta confirmar spike o ver a los 5 enemigos. Sage (Muro) en entrada alternativa si rotás.'
      },
      {
        tactica: 'Fake con un jugador haciendo ruido y 4 rotando',
        counter: 'Killjoy (Torreta) puede cubrir un sitio sola mientras espiás con Cámara de Cypher. Si solo ves 1-2 enemigos, no rotar. Mandar un duelista a verificar la otra entrada solamente.'
      },
      {
        tactica: 'Fake repetido (doble fake)',
        counter: 'Mantener la disciplina: cada jugador mantiene su posición hasta confirmación visual de ejecución. Comunicación constante del equipo. Sage y Deadlock excelentes para aguantar posiciones con muros.'
      }
    ]
  },
  {
    tactica: 'Contact Play (Juego de contacto)',
    descripcion: 'El equipo avanza lentamente, ganando territorio metro a metro con utilidades. No se ejecuta hasta tener ventaja numérica o de posición.',
    counters: [
      {
        tactica: 'Contact play lento',
        counter: 'Breach (Réplica + Falla Sísmica) para castigar el agrupamiento. Viper (Pantalla Tóxica + Nube) para dividir su avance. Raze (Granada + Boom Bot) para forzarlos a retroceder o tomar daño.'
      },
      {
        tactica: 'Contact play con mucha info',
        counter: 'KAY/O (Cuchillo supresor) para silenciar iniciadores enemigos que buscan info. Jugar en ángulos inesperados (off-angles). Chamber con operador para castigar el avance lento. Fade (Acechador) para flashear su empuje.'
      }
    ]
  },
  {
    tactica: 'Retake (Reconquista de sitio)',
    descripcion: 'Los defensores ceden el sitio inicialmente y reagrupan para reingresar con todas las utilidades. Se usa cuando el site está muy presionado o hay mucha desventaja.',
    counters: [
      {
        tactica: 'Defensores retakeando un sitio',
        counter: 'Post-plant agresivo: Viper (Mordedura + Nube) y Brimstone (Incendiaria) para negar el desactivado. Killjoy (Nanoswarms) ocultos en la spike. Sage (Ralentización). Cypher (Cables) en entradas. KAY/O (Cuchillo) para suprimir duelistas que entran.'
      },
      {
        tactica: 'Retake con definitivas (Lockdown, Rolling Thunder)',
        counter: 'Posicionarse fuera del rango de las definitivas apenas plantás. KAY/O (Cuchillo/NULL) para cancelarlas. Mantener al menos 1 jugador en off-angle para sorprender el retake.'
      }
    ]
  },
  {
    tactica: 'Eco Round / Media compra',
    descripcion: 'Rondas con economía baja donde se busca jugar en grupo, conseguir una kill y robar un arma, o stackear un sitio.',
    counters: [
      {
        tactica: 'Eco rush a un sitio',
        counter: 'Mantener distancia y usar armas de largo alcance (Vandal, Operator). No pelear en espacios cerrados donde escopetas y pistolas son más fuertes. Usar utilidades de ralentización. Chamber (Headhunter) excelente en ecos enemigos.'
      },
      {
        tactica: 'Eco con stack en sitio',
        counter: 'Si sospechás stack, jugá default y tomá el sitio vacío. Drones de Sova o Gekko para verificar si el sitio está libre antes de entrar. No regalar armas peleando innecesariamente.'
      }
    ]
  },
  {
    tactica: 'Save (Ahorro)',
    descripcion: 'Un jugador o equipo decide no pelear y guardar armas/armadura para la siguiente ronda.',
    counters: [
      {
        tactica: 'Enemigos haciendo save',
        counter: 'Cazar con duelistas móviles (Jett, Raze, Neon) para romper su economía. Sova (Dron + Flecha Rastreadora) para encontrar a los que se esconden. No perseguir solo; ir en dupla para evitar regalar un arma.'
      }
    ]
  }
];

// =============================================================================
// Estrategias por mapa y sitio
// =============================================================================
export const mapSpecificTactics: MapSpecificTactic[] = [
  // --- ASCENT ---
  {
    mapa: 'Ascent', lado: 'Ataque', sitio: 'A',
    tactica: 'Control de mid + ejecución A',
    descripcion: 'Tomá control de mid con humos en catwalk y market. Desde mid, dividí al equipo: 3 entran por A main, 2 por tree/A short.',
    pasos: [
      'Humo en CT y Heaven (Omen/Brimstone)',
      'Flecha rastreadora o dron en A main para limpiar site',
      'Duelista (Jett/Raze) entra primero por A main con flash del iniciador',
      'Jugador en Tree corta la rotación desde mid',
      'Post-plant: control de Tree y CT con humos de resmoke'
    ],
    counters: [
      'Killjoy en A: Torreta en site + Alarmbot en entrada A main',
      'Operador en Heaven contrarresta la entrada principal',
      'Breach desde CT puede stunear toda la entrada A con Falla Sísmica',
      'Retake con definitivas desde mid/tree'
    ]
  },
  {
    mapa: 'Ascent', lado: 'Defensa', sitio: 'A',
    tactica: 'Setup defensivo A con control de mid',
    descripcion: '2 jugadores en A (centinela + flex), 1 en mid (controlador), 2 en B con posibilidad de rotar rápido.',
    pasos: [
      'Killjoy: Torreta en site A mirando main, Alarmbot en entrada A main',
      'Controlador mantiene humo en mid catwalk',
      'Sova: Flecha rastreadora a B main al inicio',
      'Si hay presión en A, el jugador de mid cierra puerta y rota por CT',
      'Retake: usar definitivas desde CT spawn si se pierde el sitio'
    ],
    counters: [
      'Ataque dividido A/B: 3 hacen ruido en A, 2 rotan B rápido',
      'Fake en A para rotar defensores y ejecutar B',
      'KAY/O suprime a Killjoy para desactivar su setup defensivo'
    ]
  },
  // --- BIND ---
  {
    mapa: 'Bind', lado: 'Ataque', sitio: 'A',
    tactica: 'Ejecución A con control de showers',
    descripcion: 'Tomá showers temprano y controlá CT con humos. Ejecutá desde A short (showers) y A long simultáneamente usando los teleportadores.',
    pasos: [
      'Humo en CT y U-Hall (Omen/Brimstone/Astra)',
      'Iniciador limpia A short con flash/stun (Breach/Skye)',
      'Duelista (Raze) entra por A short con Boom Bot y Paint Shells',
      'Segundo duelista presiona por A long para distraer',
      'Control de teleportador de A para rotaciones rápidas'
    ],
    counters: [
      'Sage: Muro en A short para frenar la entrada principal',
      'Cypher: Cables en showers y A long, Cámara en site',
      'Viper: Pantalla Tóxica a través de A short/long',
      'Retake desde CT con flashes de Skye/Breach'
    ]
  },
  // --- HAVEN ---
  {
    mapa: 'Haven', lado: 'Ataque', sitio: 'C',
    tactica: 'Ejecución rápida a C',
    descripcion: 'Haven tiene 3 sitios, lo que hace que C sea el más vulnerable. Ejecución rápida con 5 jugadores a C para abrumar al defensor solitario.',
    pasos: [
      'Humo en CT y Garage (Omen)',
      'Flashes de Breach/Skye a través de la entrada de C',
      'Duelista (Jett/Phoenix) entra primero por C long',
      'Jugador de Garage controla la rotación desde B',
      'Post-plant: jugar desde C site y Garage, no sobreexponerse'
    ],
    counters: [
      'Killjoy/Cypher en C pueden ganar tiempo con setups',
      'Rotación rápida desde B por garage (abrir puerta)',
      'Breach desde CT puede stunear toda la entrada C',
      'Jett con operador en C long frena el rush inicial'
    ]
  },
  // --- SPLIT ---
  {
    mapa: 'Split', lado: 'Ataque', sitio: 'A',
    tactica: 'Control de mid + split A',
    descripcion: 'Dominá mid con humos en vents y mail. Dividí al equipo: 3 entran desde A main, 2 desde sewer/mid a A site.',
    pasos: [
      'Humo en CT y Heaven (Omen)',
      'Breach: Falla Sísmica + Trueno Rodante desde A main',
      'Raze: entrada con Boom Bot y Paint Shells',
      '2 jugadores por mid/sewer para cortar rotaciones',
      'Post-plant: control de screens y CT'
    ],
    counters: [
      'Cypher: Cables en A main y sewer, Cámara en site',
      'Sage: Muro en A main, Ralentización en sewer',
      'Raze: Granada en A main para castigar el agrupamiento',
      'Retake desde CT con definitivas de área'
    ]
  },
  // --- BREEZE ---
  {
    mapa: 'Breeze', lado: 'Ataque', sitio: 'A',
    tactica: 'Ejecución A con control de mid',
    descripcion: 'Breeze es un mapa grande donde Viper brilla. Usá su Pantalla Tóxica para cortar el sitio y ejecutar por A hall y mid doors.',
    pasos: [
      'Viper: Pantalla Tóxica de A hall a CT, bloqueando visión de site a CT',
      'Humo en CT y Heaven con Omen',
      'Sova: Flecha rastreadora a A site para ubicar defensores',
      'Jett/Chamber con operador para picks desde mid',
      'Entrada coordinada por A hall con flash de Skye'
    ],
    counters: [
      'Viper defensiva: Pantalla Tóxica en A hall niega la entrada',
      'Cypher: Cables en A hall y mid doors',
      'Chamber: Teleport + Operator para picks en A hall',
      'KAY/O: Cuchillo para suprimir a Viper y desactivar su muro'
    ]
  },
  // --- LOTUS ---
  {
    mapa: 'Lotus', lado: 'Ataque', sitio: 'B',
    tactica: 'Ejecución B con rotación rápida desde A',
    descripcion: 'Lotus tiene puertas giratorias. Finge A, rompé la puerta, rotá rápido a B por el conector.',
    pasos: [
      'Humo en CT B y Upper B (Omen/Astra)',
      'Iniciador (Fade/Tejo) limpia Upper B',
      'Duelista (Neon/Raze) entra por B main con velocidad',
      'Controlador mantiene la puerta giratoria cerrada para evitar rotaciones',
      'Post-plant: control de Upper B y B site'
    ],
    counters: [
      'Killjoy: Setup completo en B (Torreta + Alarmbot + Nanoswarms)',
      'Deadlock: Muro en B main bloquea la entrada',
      'Vyse: Cizalla en B main + ArcRose flash',
      'Fade: Haunt en B main para detectar la ejecución temprano'
    ]
  },
  // --- PEARL ---
  {
    mapa: 'Pearl', lado: 'Ataque', sitio: 'B',
    tactica: 'Ejecución B con control de mid',
    descripcion: 'Pearl tiene pasillos largos. Usá controladores para cortar visión y ejecutá rápido por B long y B link.',
    pasos: [
      'Harbor/Viper: Muro para dividir B site y bloquear visión de CT y Heaven',
      'Fade: Haunt para revelar defensores en B',
      'Duelista (Jett) dash hacia site por B long',
      'Iniciador (KAY/O) cuchillo para suprimir al centinela',
      'Post-plant: jugar desde B site con humos de resmoke'
    ],
    counters: [
      'Killjoy: Setup en B (Torreta en site, Alarmbot en long)',
      'Chamber: Operator desde B Heaven, Teleport para escapar',
      'Breach: Falla Sísmica para stunear B long entero',
      'Astra: Pozo Gravitatorio + Pulso Nova en entrada B'
    ]
  }
];

// =============================================================================
// Estrategias de ataque
// =============================================================================
export const attackStrats: StratTactic[] = [
  {
    id: 'rush',
    nombre: 'Rush (5-man)',
    lado: 'Ataque',
    dificultad: 'Básica',
    descripcion: 'Los 5 atacantes entran al mismo tiempo por una sola entrada usando todas las utilidades a la vez. Es la estrategia más simple pero efectiva, especialmente contra equipos desorganizados o en rondas eco.',
    comoEjecutarla: [
      'Definir un sitio antes de que empiece la ronda',
      'El controlador fuma las posiciones defensivas clave (CT, Heaven)',
      'El iniciador lanza flash/stun/recon apenas se abren las puertas',
      'Los duelistas entran primero con dash/speed, buscando kills rápidas',
      'Los demás siguen inmediatamente, cubriendo ángulos que los duelistas no revisan',
      'Plantar rápido y posicionarse para post-plant'
    ],
    cuandoUsarla: [
      'Rondas eco o media compra (armas vs utilidades)',
      'Cuando el equipo enemigo tiene economía baja y menos utilidades',
      'Contra equipos que juegan muy separados',
      'Si necesitás ganar momentum después de varias rondas perdidas'
    ],
    counters: [
      'Utilidades de ralentización en la entrada (Sage Orbe, Deadlock Red, Vyse Zarza)',
      'Granadas y mollies en la entrada (Raze, Brimstone, Viper)',
      'Operadores o armas de alto daño mirando la entrada fija',
      'Breach: Falla Sísmica + Réplica para stunear/dañar a todo el grupo',
      'Cypher/Killjoy setups que activen múltiples trampas simultáneas'
    ],
    agentesRecomendados: ['Raze', 'Jett', 'Neon', 'Breach', 'Brimstone']
  },
  {
    id: 'default',
    nombre: 'Default',
    lado: 'Ataque',
    dificultad: 'Intermedia',
    descripcion: 'El equipo se separa al inicio para tomar control del mapa, buscar picks y desgastar utilidades defensivas. No se compromete a ejecutar hasta tener ventaja.',
    comoEjecutarla: [
      '1 jugador por cada entrada principal de sitio',
      '2 jugadores pelean por control de mid',
      'Nadie se sobreexpone; el objetivo es información y picks, no ejecutar',
      'Cuando cae una kill o se gasta una definitiva defensiva clave, rotar y ejecutar',
      'El lurker (generalmente controlador o centinela) avisa si el sitio está débil'
    ],
    cuandoUsarla: [
      'Rondas de compra completa',
      'Cuando tenés ventaja económica y podés tomarte tiempo',
      'Contra equipos agresivos que regalan picks',
      'Mapas grandes donde la información es clave (Breeze, Haven)'
    ],
    counters: [
      'No pelear en el default: mantenerse en sitio y forzarlos a ejecutar',
      'Cypher: Cámara y Cables para detectar al lurker sin exponerse',
      'Usar el operador para castigar errores de posicionamiento enemigos',
      'Breach/KAY/O: usar info para stunear/cegar agresivamente'
    ],
    agentesRecomendados: ['Sova', 'Cypher', 'Omen', 'Viper', 'KAY/O']
  },
  {
    id: 'split',
    nombre: 'Split Push',
    lado: 'Ataque',
    dificultad: 'Avanzada',
    descripcion: 'El equipo se divide en dos grupos para atacar desde múltiples direcciones simultáneamente, confundiendo a los defensores y forzando duelos en desventaja.',
    comoEjecutarla: [
      'Grupo 1 (3 jugadores) presiona la entrada principal con ruido y utilidades',
      'Grupo 2 (2 jugadores) flanquea o toma otra entrada al mismo sitio',
      'Sincronizar el timing: ambos grupos deben impactar al mismo tiempo',
      'El grupo principal usa humos y flashes para distraer',
      'El grupo de flanco espera a que los defensores estén mirando al grupo principal'
    ],
    cuandoUsarla: [
      'Cuando tenés control del mapa',
      'Con composiciones que tienen mucho ruido y CC',
      'Mapas con múltiples entradas al mismo sitio (Ascent A, Split B)',
      'Contra equipos que hacen stacking en sitio'
    ],
    counters: [
      'Centinelas con setups en ambas entradas (Cypher, Killjoy)',
      'Info temprana para anticipar el split (Sova Flecha, Fade Haunt)',
      'Retener humos y definitivas para cuando confirmes el split',
      'Vyse (Cizalla) para dividir a los atacantes entre sí'
    ],
    agentesRecomendados: ['Yoru', 'Omen', 'Astra', 'Viper', 'Breach']
  },
  {
    id: 'fake',
    nombre: 'Fake (Finta)',
    lado: 'Ataque',
    dificultad: 'Intermedia',
    descripcion: 'El equipo hace creer que va a ejecutar un sitio para forzar la rotación defensiva, y luego ataca el sitio debilitado.',
    comoEjecutarla: [
      'Todo el equipo se agrupa cerca del sitio que van a fingir',
      'Usar utilidades ruidosas (humos, flashes, disparos) para llamar la atención',
      'El iniciador tira info solo en ese sitio',
      'Esperar 5-10 segundos a que los defensores del otro sitio empiecen a rotar',
      'Correr todos juntos al sitio real y ejecutar antes de que vuelvan'
    ],
    cuandoUsarla: [
      'Contra equipos que rotan rápido',
      'Cuando el equipo enemigo juega muy reactivo',
      'Mapas donde la rotación es lenta (Breeze, Icebox)',
      'En situaciones de 4v5 o 3v5 donde necesitás una ventaja'
    ],
    counters: [
      'No rotar hasta ver la spike o confirmación visual de ejecución',
      'Cypher: Cámara en el otro sitio para verificar si realmente están allí',
      'Dejar siempre un centinela anclado en cada sitio',
      'Usar info global (Sova Dron, Skye Buscadores) para trackear al equipo atacante'
    ],
    agentesRecomendados: ['Yoru', 'Omen', 'Astra', 'Jett', 'Sova']
  },
  {
    id: 'contact',
    nombre: 'Juego de Contacto',
    lado: 'Ataque',
    dificultad: 'Avanzada',
    descripcion: 'Avanzar progresivamente ganando territorio con utilidades, sin comprometerse a una ejecución total. Se busca ventaja numérica o posicional antes de plantar.',
    comoEjecutarla: [
      'Avanzar en grupo compacto, limpiando cada esquina',
      'Usar drones y habilidades de info para despejar espacios',
      'El duelista juega ligeramente adelantado pero sin sobreexponerse',
      'Si se consigue una kill, expandir rápidamente al sitio',
      'Si no hay ventaja, rotar al otro sitio manteniendo el control ganado'
    ],
    cuandoUsarla: [
      'Contra defensas muy pasivas o con operador',
      'Cuando tenés mucha info (Sova, Fade, Gekko)',
      'Mapas con pasillos largos (Pearl, Breeze)',
      'Rondas importantes donde no querés arriesgar una ejecución completa'
    ],
    counters: [
      'Jugar en ángulos inesperados para forzar errores',
      'Breach: stunear su avance para frenar el momentum',
      'Chamber: Operator + Teleport para castigar el avance lento',
      'Fade: Acechador para flashear y romper su formación'
    ],
    agentesRecomendados: ['Sova', 'Fade', 'Gekko', 'KAY/O', 'Viper']
  }
];

// =============================================================================
// Estrategias de defensa
// =============================================================================
export const defenseStrats: StratTactic[] = [
  {
    id: 'def-stack',
    nombre: 'Stack (Apilamiento)',
    lado: 'Defensa',
    dificultad: 'Básica',
    descripcion: '3 o 4 defensores se posicionan en el mismo sitio anticipando una ejecución enemiga. El resto cubre el otro sitio con setups de centinela.',
    comoEjecutarla: [
      'Basado en patrones del enemigo, anticipar qué sitio van a atacar',
      '3-4 jugadores en el sitio anticipado, en posiciones difíciles de limpiar',
      '1 centinela (Killjoy/Cypher) cubre el otro sitio con sus setups',
      'Cuando el enemigo ejecuta, usar todas las utilidades defensivas juntas',
      'Si el enemigo va al otro sitio, el centinela gana tiempo mientras el equipo rota'
    ],
    cuandoUsarla: [
      'Rondas eco del enemigo (suelen rushear en grupo)',
      'Cuando identificás un patrón en el equipo atacante',
      'Última ronda de la mitad si el enemigo necesita ganar',
      'Cuando tenés mucha información del lado atacante'
    ],
    counters: [
      'Default para detectar el stack sin comprometerse',
      'Sova (Dron) o Gekko (Wingman) para verificar si hay mucha gente',
      'Rotar rápido al sitio vacío apenas se confirma el stack',
      'Usar información de Cypher/Killjoy en el sitio débil para saber que está libre'
    ],
    agentesRecomendados: ['Killjoy', 'Cypher', 'Sage', 'Breach', 'Brimstone']
  },
  {
    id: 'def-aggressive',
    nombre: 'Defensa Agresiva / Push',
    lado: 'Defensa',
    dificultad: 'Intermedia',
    descripcion: 'En lugar de esperar pasivamente, los defensores toman territorio al inicio de la ronda para negar espacio a los atacantes y conseguir información.',
    comoEjecutarla: [
      'Duelista o iniciador con movilidad avanza a una posición de riesgo controlado',
      'Buscar un pick temprano con operador o rifle',
      'Si se consigue la kill, retroceder inmediatamente al sitio',
      'Si falla, usar habilidad de escape (Dash, Teleport, Dismiss)',
      'El resto del equipo ajusta basado en la información recolectada'
    ],
    cuandoUsarla: [
      'Con agentes que tienen escape (Jett, Chamber, Reyna)',
      'Para romper el ritmo del atacante en defaults',
      'Con operador en mapas de líneas largas (Breeze, Icebox)',
      'Cuando tenés ventaja económica y podés arriesgar'
    ],
    counters: [
      'No pelear el ángulo del defensor agresivo; forzarlo a retroceder sin kill',
      'Usar flashes o stuns en las posiciones comunes de push defensivo',
      'KAY/O (Cuchillo) para suprimir habilidades de escape y castigar el push',
      'Avanzar en grupo al sitio que el defensor agresivo dejó debilitado'
    ],
    agentesRecomendados: ['Jett', 'Chamber', 'Reyna', 'Yoru', 'Sova']
  },
  {
    id: 'def-retake',
    nombre: 'Retake (Reconquista)',
    lado: 'Defensa',
    dificultad: 'Intermedia',
    descripcion: 'Los defensores ceden el sitio al ver una ejecución fuerte, se reagrupan y reingresan con todas las utilidades juntas para recuperar el control.',
    comoEjecutarla: [
      'Al ver ejecución con muchas utilidades, retirarse del sitio sin morir',
      'Reagruparse en CT spawn o una entrada segura',
      'Usar definitivas de área (Lockdown, Rolling Thunder, Orbital Strike)',
      'Entrar todos juntos con flashes y humos propios',
      'Priorizar la kill sobre el desactivado; asegurar el sitio primero'
    ],
    cuandoUsarla: [
      'Contra ejecuciones muy fuertes con múltiples definitivas enemigas',
      'Cuando estás en desventaja numérica en el sitio',
      'Si tu centinela murió y no hay setups defensivos',
      'Cuando el enemigo usó todas sus utilidades en la entrada'
    ],
    counters: [
      'Post-plant agresivo: posicionarse para el retake, no en el sitio',
      'Viper (Mordedura + Nube) y Brimstone (Incendiaria) para negar el desactivado',
      'Killjoy: Nanoswarms ocultos en la spike',
      'KAY/O: Cuchillo o NULL para cancelar definitivas de retake',
      'Cypher: Cables en entradas de retake para frenar el reingreso'
    ],
    agentesRecomendados: ['Breach', 'Killjoy', 'Sova', 'Brimstone', 'Viper']
  }
];

// =============================================================================
// Counters de clases de agentes
// =============================================================================
export const classCounters: ClassCounter[] = [
  {
    clase: 'Duelista',
    fortalezaContra: 'Centinelas pasivos, Controladores en espacios abiertos',
    debilidadContra: 'Centinelas con trampas, Iniciadores con stun/flash',
    comoContrarrestar: 'KAY/O (supresión), Breach (stun a través de paredes), Deadlock (Red + Sensores), Vyse (Cizalla). Los duelistas dependen de movilidad: negales el espacio con CC.'
  },
  {
    clase: 'Controlador',
    fortalezaContra: 'Defensores en sitio (bloquea su visión), Duelistas sin info',
    debilidadContra: 'Iniciadores con info (Sova, Fade), Flanqueadores',
    comoContrarrestar: 'Sova (Dron + Flecha para ver detrás de humos), KAY/O (suprimir para desactivar humos), Fade (Haunt + Acechador). Flanquear al controlador mientras está mirando su mapa para fumar.'
  },
  {
    clase: 'Iniciador',
    fortalezaContra: 'Centinelas (rompe setups), Defensores pasivos',
    debilidadContra: 'Duelistas agresivos, KAY/O (supresión)',
    comoContrarrestar: 'KAY/O (suprimir al iniciador antes de que use sus habilidades), Jett/Raze (matar al iniciador antes de que tire info), Cypher (esconder setups donde el iniciador no busque).'
  },
  {
    clase: 'Centinela',
    fortalezaContra: 'Duelistas (trampas + ralentización), Flancos',
    debilidadContra: 'Iniciadores (rompen setups con info), KAY/O (supresión)',
    comoContrarrestar: 'Sova (Dron + Flecha para encontrar trampas), KAY/O (Cuchillo + NULL para suprimir al centinela), Raze (Boom Bot + Granada para destruir setups), Tejo (misiles para limpiar posiciones de centinela).'
  }
];

// =============================================================================
// Consejos por tipo de composición
// =============================================================================
export const compositionTips = [
  {
    composicion: '1 Duelista · 1 Controlador · 1 Iniciador · 1 Centinela · 1 Flex',
    descripcion: 'Composición balanceada estándar. La más común en ranked y juego profesional. El flex suele ser un segundo iniciador o controlador según el mapa.',
    fortaleza: 'Versatilidad total. Podés adaptarte a cualquier estilo de juego enemigo.',
    debilidad: 'Si el duelista muere temprano, perdés potencial de entrada. Requiere que el flex sea un jugador versátil.'
  },
  {
    composicion: '2 Duelistas · 1 Controlador · 1 Iniciador · 1 Centinela',
    descripcion: 'Composición agresiva con mucho potencial de entrada y frags. Ideal para equipos con buenos mecánicas individuales.',
    fortaleza: 'Mucho poder de entrada y capacidad de tradeo. Difícil de defender en sitios con múltiples entradas.',
    debilidad: 'Falta de info o control de mapa si los duelistas mueren. Generalmente débil en defensa sin segundo centinela/iniciador.'
  },
  {
    composicion: '1 Duelista · 2 Controladores · 1 Iniciador · 1 Centinela',
    descripcion: 'Composición de control. Domina el mapa con humos y cortes de visión. Excelente en mapas grandes.',
    fortaleza: 'Control total de visión. Ejecuciones muy seguras. Viper + Omen/Brimstone es letal en Breeze/Icebox.',
    debilidad: 'Puede faltar poder de entrada si el duelista no es efectivo. Lenta para retakes agresivos.'
  },
  {
    composicion: '1 Duelista · 1 Controlador · 2 Iniciadores · 1 Centinela',
    descripcion: 'Composición de información. Siempre sabés dónde está el enemigo. Ideal para juego metódico y defaults.',
    fortaleza: 'Información constante. Difícil que el enemigo flanquee o haga plays sorpresa. Ejecuciones quirúrgicas.',
    debilidad: 'Puede faltar poder de fuego si el iniciador no es agresivo (ej. Tejo). Los iniciadores deben ser buenos fraggers.'
  }
];
