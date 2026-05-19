import type { CompositionGuide } from './types';

export const compositionGuides: CompositionGuide[] = [
  {
    "id": "ascent-jett-sova-kayo-omen-killjoy",
    "map": "Ascent",
    "agents": [
      "Jett",
      "Sova",
      "KAY/O",
      "Omen",
      "Killjoy"
    ],
    "title": "Ascent classic mid-control",
    "style": "Composición estándar de info + flash + smoke + sentinel para dominar mid y convertir splits A/B.",
    "attackIdentity": [
      "Tomar mid temprano con Sova/KAY/O antes de commit.",
      "Jett entra cuando Omen corta Heaven/Market y KAY/O rompe posiciones.",
      "Killjoy mantiene flank y habilita defaults lentas."
    ],
    "defenseIdentity": [
      "Killjoy ancla un site y Sova/KAY/O confirman presión.",
      "Omen guarda humo para cortar exec o retake.",
      "Jett puede tomar primer contacto con escape/trade."
    ],
    "agentJobs": {
      "Jett": [
        "Entry/Operator",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "KAY/O": [
        "Suppression/flash",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "documented",
    "confidence": "medium",
    "sourceRefs": [
      "riot-maps",
      "rb-ascent-guide",
      "yt-ascent-mid-control"
    ]
  },
  {
    "id": "ascent-yoru-sova-kayo-omen-killjoy",
    "map": "Ascent",
    "agents": [
      "Yoru",
      "Sova",
      "KAY/O",
      "Omen",
      "Killjoy"
    ],
    "title": "Ascent Yoru pressure variation",
    "style": "Variante de presión y fakes: Yoru agrega dudas de rotación sobre una base clásica de Ascent.",
    "attackIdentity": [
      "Vender presión A/B y castigar rotaciones por mid.",
      "Usar info de Sova/KAY/O para que Yoru no fakee a ciegas.",
      "Mantener flank con Killjoy para re-hit seguro."
    ],
    "defenseIdentity": [
      "Jugar con info pasiva y reclears coordinados.",
      "Yoru puede romper timing en retake o rotación.",
      "No perder Omen temprano."
    ],
    "agentJobs": {
      "Yoru": [
        "Fake/pressure",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "KAY/O": [
        "Suppression/flash",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": [
      "riot-maps",
      "rb-ascent-guide",
      "yt-ascent-mid-control",
      "riot-patch-12-05"
    ]
  },
  {
    "id": "haven-yoru-iso-omen-sova-cypher",
    "map": "Haven",
    "agents": [
      "Yoru",
      "Iso",
      "Omen",
      "Sova",
      "Cypher"
    ],
    "title": "Haven double duelist pressure: Yoru + Iso",
    "style": "Composición de presión, fake/re-hit y castigo de rotaciones en mapa de tres sites.",
    "attackIdentity": [
      "Mostrar presión temprana sin revelar commit real.",
      "Usar Sova/Omen para confirmar y cortar líneas antes de Yoru/Iso.",
      "Castigar sobre-rotaciones con re-hit."
    ],
    "defenseIdentity": [
      "Cypher da info pasiva para rotaciones seguras.",
      "Sova confirma si la presión rival es real.",
      "Yoru/Iso guardan utilidad para retake o duelos tradeables."
    ],
    "agentJobs": {
      "Yoru": [
        "Fake/pressure",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Iso": [
        "Segundo contacto",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "documented",
    "confidence": "medium",
    "sourceRefs": [
      "yt-haven-fnc-t1-yoru-iso",
      "hotspawn-haven-comp",
      "rb-haven-guide",
      "riot-maps"
    ]
  },
  {
    "id": "haven-yoru-neon-omen-sova-cypher",
    "map": "Haven",
    "agents": [
      "Yoru",
      "Neon",
      "Omen",
      "Sova",
      "Cypher"
    ],
    "title": "Haven fast rotation pressure",
    "style": "Composición de tempo alto; marcada partial por nerfs a Neon 12.09.",
    "attackIdentity": [
      "Usar Yoru/Neon para romper timings sin comprometer todo.",
      "Sova confirma site y Omen corta Garage/CT/Heaven.",
      "Re-hit rápido cuando Cypher detecta rotación."
    ],
    "defenseIdentity": [
      "Cypher sostiene extremidad y permite stacks móviles.",
      "Neon/Yoru retakean con utilidad, no con dry peeks.",
      "Respetar que Neon post-12.09 requiere decisiones más intencionales."
    ],
    "agentJobs": {
      "Yoru": [
        "Fake/pressure",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Neon": [
        "Entry de tempo",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": [
      "riot-patch-12-09",
      "rb-haven-guide"
    ]
  },
  {
    "id": "split-viper-raze-omen-breach-cypher",
    "map": "Split",
    "agents": [
      "Viper",
      "Raze",
      "Omen",
      "Breach",
      "Cypher"
    ],
    "title": "Split double controller + Raze/Breach",
    "style": "Composición lenta orientada a control de mid, cortes verticales y entrada explosiva.",
    "attackIdentity": [
      "No depender de A/B Main solamente.",
      "Tomar mid o ramps para romper mapa.",
      "Ejecutar cuando Heaven/Screens/Vents estén cortados."
    ],
    "defenseIdentity": [
      "Doble controller niega chokes y retakes.",
      "Cypher sostiene flank/info.",
      "Breach/Raze frenan rushes y reclears."
    ],
    "agentJobs": {
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Breach": [
        "Flash/stun execute",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": [
      "rb-split-guide",
      "yt-split-deep-dive"
    ]
  },
  {
    "id": "split-raze-breach-omen-viper-killjoy",
    "map": "Split",
    "agents": [
      "Raze",
      "Breach",
      "Omen",
      "Viper",
      "Killjoy"
    ],
    "title": "Split layered execute/retake",
    "style": "Variante con Killjoy para setups de ancla y lockdown en retakes/post-plant.",
    "attackIdentity": [
      "Raze/Breach rompen chokes cerrados.",
      "Omen/Viper separan Heaven/Screens/Back.",
      "Killjoy cubre flank y habilita post-plant."
    ],
    "defenseIdentity": [
      "Killjoy ancla, Viper/Omen ralentizan y Breach/Raze reclearean.",
      "Jugar por retakes si el site cae con utilidad viva."
    ],
    "agentJobs": {
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Breach": [
        "Flash/stun execute",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": [
      "rb-split-guide",
      "yt-split-deep-dive"
    ]
  },
  {
    "id": "lotus-omen-viper-raze-fade-killjoy",
    "map": "Lotus",
    "agents": [
      "Omen",
      "Viper",
      "Raze",
      "Fade",
      "Killjoy"
    ],
    "title": "Lotus pivot-heavy double controller",
    "style": "Composición de control y pivots entre tres sites. Needs-review por Lotus A 12.05.",
    "attackIdentity": [
      "Tomar control central.",
      "Amenazar A/C y pivotear según reacción.",
      "Usar Raze/Fade para limpiar zonas cerradas."
    ],
    "defenseIdentity": [
      "Killjoy sostiene info/flank.",
      "Doble controller retrasa y facilita retakes.",
      "Fade confirma hit real."
    ],
    "agentJobs": {
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Fade": [
        "Info cercana",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "low",
    "sourceRefs": [
      "riot-patch-12-05",
      "rb-lotus-guide",
      "yt-lotus-premier-strip"
    ]
  },
  {
    "id": "lotus-omen-raze-fade-viper-cypher",
    "map": "Lotus",
    "agents": [
      "Omen",
      "Raze",
      "Fade",
      "Viper",
      "Cypher"
    ],
    "title": "Lotus info + pivot control",
    "style": "Similar a doble controller, con Cypher para más lectura pasiva de flancos y puertas.",
    "attackIdentity": [
      "Fade/Raze limpian zonas cerradas.",
      "Omen/Viper venden presión y sostienen pivots.",
      "Cypher evita backstab cuando se cambia de site."
    ],
    "defenseIdentity": [
      "Cypher ancla extremo, Viper/Omen juegan delay y Fade/Raze retakean."
    ],
    "agentJobs": {
      "Omen": [
        "Smokes flexibles",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Fade": [
        "Info cercana",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "low",
    "sourceRefs": [
      "riot-patch-12-05",
      "rb-lotus-guide"
    ]
  },
  {
    "id": "breeze-viper-jett-sova-cypher-harbor",
    "map": "Breeze",
    "agents": [
      "Viper",
      "Jett",
      "Sova",
      "Cypher",
      "Harbor"
    ],
    "title": "Breeze double wall control",
    "style": "Core de Breeze con Viper + Harbor para cortar líneas largas y jugar por info.",
    "attackIdentity": [
      "Viper/Harbor convierten líneas abiertas en cruces jugables.",
      "Jett toma espacio con info de Sova.",
      "Cypher cubre flancos largos."
    ],
    "defenseIdentity": [
      "Viper/Cypher sostienen zonas grandes.",
      "Sova confirma hits.",
      "Harbor/Viper facilitan retakes por capas."
    ],
    "agentJobs": {
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Jett": [
        "Entry/Operator",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Harbor": [
        "Cortes de avance",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "medium",
    "sourceRefs": [
      "rb-breeze-guide",
      "riot-patch-12-00"
    ]
  },
  {
    "id": "breeze-viper-jett-sova-cypher-kayo",
    "map": "Breeze",
    "agents": [
      "Viper",
      "Jett",
      "Sova",
      "Cypher",
      "KAY/O"
    ],
    "title": "Breeze Viper + anti-utility core",
    "style": "Variante con KAY/O para suprimir anchors y facilitar entrada sobre líneas largas.",
    "attackIdentity": [
      "Sova identifica, KAY/O niega utilidad y Jett entra.",
      "Viper corta visión larga.",
      "Cypher cuida flanco."
    ],
    "defenseIdentity": [
      "Jugar con info cruzada Sova/Cypher.",
      "KAY/O apoya retakes y evita execs gratis."
    ],
    "agentJobs": {
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Jett": [
        "Entry/Operator",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "KAY/O": [
        "Suppression/flash",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "medium",
    "sourceRefs": [
      "rb-breeze-guide",
      "riot-patch-12-00"
    ]
  },
  {
    "id": "fracture-raze-breach-brimstone-killjoy-cypher",
    "map": "Fracture",
    "agents": [
      "Raze",
      "Breach",
      "Brimstone",
      "Killjoy",
      "Cypher"
    ],
    "title": "Fracture double sentinel pincer",
    "style": "Composición de control extremo para pincer y flank denial.",
    "attackIdentity": [
      "Dividir presión por Arcade/Dish o Main/Drop.",
      "Breach/Raze abren contacto.",
      "Brimstone bloquea spawn/canteen rápido."
    ],
    "defenseIdentity": [
      "Doble sentinel reduce flancos y permite stack/retake.",
      "Breach/Raze reclearean zonas tomadas."
    ],
    "agentJobs": {
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Breach": [
        "Flash/stun execute",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Brimstone": [
        "Smokes rápidas",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "documented",
    "confidence": "medium",
    "sourceRefs": [
      "riot-maps",
      "rb-fracture-guide",
      "riot-patch-12-05"
    ]
  },
  {
    "id": "fracture-neon-breach-brimstone-killjoy-fade",
    "map": "Fracture",
    "agents": [
      "Neon",
      "Breach",
      "Brimstone",
      "Killjoy",
      "Fade"
    ],
    "title": "Fracture tempo pincer",
    "style": "Composición rápida para doble presión; partial por nerfs Neon 12.09.",
    "attackIdentity": [
      "Fade/Breach preparan contactos dobles.",
      "Neon rompe timing pero no debe entrar sin soporte.",
      "Brimstone da smokes rápidas para commit."
    ],
    "defenseIdentity": [
      "Killjoy/Fade confirman y Breach/Neon retakean.",
      "Evitar overpeek con Neon tras 12.09."
    ],
    "agentJobs": {
      "Neon": [
        "Entry de tempo",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Breach": [
        "Flash/stun execute",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Brimstone": [
        "Smokes rápidas",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Killjoy": [
        "Ancla/post-plant",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Fade": [
        "Info cercana",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": [
      "riot-patch-12-09",
      "rb-fracture-guide"
    ]
  },
  {
    "id": "pearl-jett-sova-astra-cypher-kayo",
    "map": "Pearl",
    "agents": [
      "Jett",
      "Sova",
      "Astra",
      "Cypher",
      "KAY/O"
    ],
    "title": "Pearl mid control default",
    "style": "Composición de mid control, duelos largos y retakes por utilidad.",
    "attackIdentity": [
      "Tomar mid/Art antes de B Long o A hit.",
      "Astra aísla rutas, Sova/KAY/O confirman.",
      "Jett toma espacio largo con trade."
    ],
    "defenseIdentity": [
      "Cypher da info pasiva, Astra retrasa y Sova/KAY/O reclearean."
    ],
    "agentJobs": {
      "Jett": [
        "Entry/Operator",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Sova": [
        "Info/recon",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Astra": [
        "Control global",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "KAY/O": [
        "Suppression/flash",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "medium",
    "sourceRefs": [
      "rb-pearl-guide",
      "riot-patch-11-08-pearl"
    ]
  },
  {
    "id": "pearl-raze-fade-astra-cypher-viper",
    "map": "Pearl",
    "agents": [
      "Raze",
      "Fade",
      "Astra",
      "Cypher",
      "Viper"
    ],
    "title": "Pearl layered control",
    "style": "Control por capas para mid y sites con Raze/Fade limpiando zonas compactas.",
    "attackIdentity": [
      "Fade/Raze limpian Dugout/Art o close B.",
      "Astra/Viper cortan retakes.",
      "Cypher cubre flank."
    ],
    "defenseIdentity": [
      "Doble controller/sentinel juega delay y retake con utilidad."
    ],
    "agentJobs": {
      "Raze": [
        "Entry explosiva",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Fade": [
        "Info cercana",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Astra": [
        "Control global",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Cypher": [
        "Flank/info",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ],
      "Viper": [
        "Cortes largos/anti-retake",
        "Coordinar utilidad con el timing del plan.",
        "No gastar recursos clave antes de confirmar el commit."
      ]
    },
    "strongSites": [
      "Depende del mapa y del control inicial: revisar mapTactics para site específico."
    ],
    "weakPoints": [
      "Pierde valor si se ejecuta sin coordinación.",
      "Si el controlador muere temprano, el retake/post-plant cae mucho.",
      "Lineups exactas no incluidas: validar en custom antes de publicar."
    ],
    "whenToPick": [
      "Cuando el equipo puede comunicar timings.",
      "Cuando el mapa coincide con la guía.",
      "Cuando querés una identidad táctica clara y no picks sueltos."
    ],
    "status": "needs-review",
    "confidence": "medium",
    "sourceRefs": [
      "rb-pearl-guide",
      "riot-patch-11-08-pearl"
    ]
  },
  {
    "id": "bind-chamber-clove-fade-jett-reyna",
    "map": "Bind",
    "agents": ["Chamber", "Clove", "Fade", "Jett", "Reyna"],
    "title": "Bind double duelist pressure: Jett + Reyna",
    "style": "Composición de presión y executes rápidos en mapa sin mid tradicional. Teleporters permiten rotaciones rápidas y fakes.",
    "attackIdentity": [
      "Executes simultáneos por dos frentes: Short + Showers en A, Garden + Hookah en B.",
      "Fade revela ángulos cerrados antes del entry de Jett/Reyna.",
      "Usar teleporter para fake y re-hit al site opuesto."
    ],
    "defenseIdentity": [
      "Chamber ancla un site con Rendezvous para rotar rápido.",
      "Fade confirma presión real antes de rotar.",
      "Jett/Reyna pueden tomar primer contacto con escape."
    ],
    "agentJobs": {
      "Jett": ["Entry/Operator en sitios abiertos.", "Coordinar dash con flashes de Fade.", "No gastar recursos antes de confirmar commit."],
      "Reyna": ["Segundo contacto para convertir presión en kills.", "Usar dismiss para escapar tras entry.", "No entrar sola sin soporte."],
      "Clove": ["Smokes para aislar sites y negar retakes.", "Guardar utilidad para post-plant.", "Coordinar smokes con timing del entry."],
      "Fade": ["Info para limpiar Lamps/Hookah antes del push.", "Seize para romper crossfires defensivos.", "Nightfall para retakes o executes rápidos."],
      "Chamber": ["Ancla un site con Trademark y Rendezvous.", "Rotar rápido por teleporter si el otro site es atacado.", "Operator en ángulos largos."]
    },
    "strongSites": ["A con split Short + Showers", "B con control de Hookah"],
    "weakPoints": ["Sin mid tradicional, los fakes son menos creíbles.", "Depende de executes coordinados por dos frentes.", "Si Fade no revela, el entry es a ciegas."],
    "whenToPick": ["Equipo que puede coordinar executes simultáneos.", "Bind activo en el pool.", "Querés presión agresiva sin defaults lentas."],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": ["riot-maps", "rb-bind-guide", "valohub-meta-comps"]
  },
  {
    "id": "icebox-chamber-clove-jett-reyna-sova",
    "map": "Icebox",
    "agents": ["Chamber", "Clove", "Jett", "Reyna", "Sova"],
    "title": "Icebox verticality control: Jett + Sova",
    "style": "Composición para dominar verticalidad y ángulos elevados. Sova info + Jett entry + Chamber ancla.",
    "attackIdentity": [
      "Sova drone para limpiar Rafters/Pipes antes del entry.",
      "Jett toma espacio con Updraft en ángulos altos.",
      "Chamber cubre flank y post-plant con Lockdown."
    ],
    "defenseIdentity": [
      "Chamber ancla B site con Turret y Rendezvous.",
      "Sova confirma si el hit es real antes de rotar.",
      "Jett puede tomar primer contacto con escape."
    ],
    "agentJobs": {
      "Jett": ["Entry/Operator en líneas largas de B.", "Updraft para ángulos elevados en A.", "Coordinar dash con info de Sova."],
      "Reyna": ["Segundo contacto para convertir presión.", "Usar dismiss para escapar tras entry.", "No entrar sola sin soporte."],
      "Clove": ["Smokes para cortar Belt/Pipes en A.", "Guardar utilidad para anti-retake.", "Coordinar smokes con timing del entry."],
      "Sova": ["Drone para limpiar Rafters/Pipes antes del push.", "Shock darts para post-plant deny.", "Recon para confirmar site antes del commit."],
      "Chamber": ["Ancla B site con Turret en container.", "Rotar rápido por mid si A es atacado.", "Operator en ángulos largos de B."]
    },
    "strongSites": ["A con rush coordinado y drone", "B con Operator y Viper wall"],
    "weakPoints": ["A es difícil de retakear si pierden el plant.", "B requiere Viper wall para cortar ángulos largos.", "Si Sova no confirma, el entry es a ciegas."],
    "whenToPick": ["Equipo que puede coordinar rushes con info.", "Icebox activo en el pool.", "Querés dominar verticalidad y ángulos altos."],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": ["riot-maps", "rb-icebox-guide", "valohub-meta-comps"]
  },
  {
    "id": "sunset-clove-cypher-gecko-neon-reyna",
    "map": "Sunset",
    "agents": ["Clove", "Cypher", "Gekko", "Neon", "Reyna"],
    "title": "Sunset mid control: Neon + Gekko tempo",
    "style": "Composición de tempo alto para dominar mid y ejecutar rápido. Neon crea espacio, Gekko planta/defusa, Cypher flankea.",
    "attackIdentity": [
      "Controlar mid temprano con Gekko/Neon antes de commit.",
      "Neon entra cuando Clove corta Elbow/Market.",
      "Cypher mantiene flank watch y info pasiva."
    ],
    "defenseIdentity": [
      "Cypher ancla B site con traps y camera.",
      "Gekko confirma presión con Wingman.",
      "Neon puede retakear rápido con movilidad."
    ],
    "agentJobs": {
      "Neon": ["Entry de tempo alto por Main o Elbow.", "Lane carves paths para el equipo.", "No entrar sin smokes de Clove."],
      "Reyna": ["Segundo contacto para convertir presión.", "Usar dismiss para escapar tras entry.", "No entrar sola sin soporte."],
      "Clove": ["Smokes para cortar Elbow/Market.", "Guardar utilidad para anti-retake.", "Coordinar smokes con timing del entry."],
      "Gekko": ["Wingman para plant/defuse seguro.", "Dizzy para limpiar corners en B.", "Mosh para post-plant deny."],
      "Cypher": ["Ancla B site con traps y camera.", "Flank watch para evitar lurks.", "Neural Theft para info de retake."]
    },
    "strongSites": ["A con control de Elbow", "B con Cypher traps y Gekko utility"],
    "weakPoints": ["Mid es difícil de controlar sin smokes globales.", "Si Neon entra sin soporte, muere sin trade.", "B requiere Cypher setups bien colocados."],
    "whenToPick": ["Equipo que puede comunicar timings.", "Sunset activo en el pool.", "Querés tempo alto y mid control."],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": ["riot-maps", "rb-sunset-guide", "valohub-meta-comps"]
  },
  {
    "id": "abyss-chamber-clove-fade-jett-reyna",
    "map": "Abyss",
    "agents": ["Chamber", "Clove", "Fade", "Jett", "Reyna"],
    "title": "Abyss no-boundary pressure: Jett + Fade",
    "style": "Composición para explotar sin bordes: knockback al vacío, Operator en mid, y info de Fade para executes.",
    "attackIdentity": [
      "Jett con Operator en mid para control temprano.",
      "Fade revela ángulos en Tower/Heaven antes del entry.",
      "Usar knockback (Breach/Astra/Cypher trips) para empujar al vacío."
    ],
    "defenseIdentity": [
      "Chamber ancla con Rendezvous para rotar entre sites.",
      "Fade confirma si el hit es real antes de rotar.",
      "Jett puede retakear con movilidad y Operator."
    ],
    "agentJobs": {
      "Jett": ["Operator en mid catwalk para control.", "Updraft para Tower/Heaven en A.", "Dash para escapar de situaciones peligrosas."],
      "Reyna": ["Segundo contacto para convertir presión.", "Usar dismiss para escapar tras entry.", "No entrar sola sin soporte."],
      "Clove": ["Smokes para cortar Tower/Back Site en A.", "Guardar utilidad para anti-retake.", "Coordinar smokes con timing del entry."],
      "Fade": ["Haunt para revelar Tower/Heaven antes del push.", "Seize para romper crossfires defensivos.", "Nightfall para retakes o executes rápidos."],
      "Chamber": ["Ancla A site con Trademark y Rendezvous.", "Rotar rápido por mid si B es atacado.", "Operator en ángulos largos de mid."]
    },
    "strongSites": ["A con control de Tower", "B con post-plant spam por paredes penetrables"],
    "weakPoints": ["Mid es sniper fest: perderlo es perder el round.", "Sin bordes, los errores de posicionamiento son fatales.", "Si Fade no revela, el entry es a ciegas."],
    "whenToPick": ["Equipo que puede comunicar timings.", "Abyss activo en el pool.", "Querés explotar knockback al vacío."],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": ["riot-maps", "rb-abyss-guide", "valohub-meta-comps"]
  },
  {
    "id": "corrode-omen-viper-sova-neon-chamber",
    "map": "Corrode",
    "agents": ["Omen", "Viper", "Sova", "Neon", "Chamber"],
    "title": "Corrode double controller: Viper + Omen",
    "style": "Composición de control por capas con doble controller. Viper corta ángulos, Omen teleports para flanks, Neon entry rápido.",
    "attackIdentity": [
      "Viper wall para cortar Link/Crane en A o Elbow en B.",
      "Omen teleports para flanks sorpresa y one-ways.",
      "Neon entra por chokes estrechos con Lane."
    ],
    "defenseIdentity": [
      "Chamber ancla B site con Rendezvous y traps.",
      "Sova confirma presión real antes de rotar.",
      "Viper/Omen ralentizan executes con walls/smokes."
    ],
    "agentJobs": {
      "Neon": ["Entry de tempo alto por Main o Link.", "Lane carves paths para el equipo.", "No entrar sin smokes de Viper/Omen."],
      "Sova": ["Drone para limpiar Elbow/Yard antes del push.", "Shock darts para post-plant deny.", "Recon para confirmar site antes del commit."],
      "Omen": ["Teleports para flanks sorpresa.", "Smokes para cortar Link/Crane en A.", "Paranoia para romper crossfires."],
      "Viper": ["Wall para cortar ángulos en A o B.", "Toxic Screen para mid control.", "Pit para post-plant en sites."],
      "Chamber": ["Ancla B site con Trademark y Rendezvous.", "Rotar rápido por mid si A es atacado.", "Operator en ángulos largos de mid."]
    },
    "strongSites": ["A con split Main + Link + Crane", "B con execute coordinado por Main + Mid"],
    "weakPoints": ["B es fortaleza defensiva: difícil de tomar sin utilidad coordinada.", "Doble controller requiere buena gestión de smokes.", "Si Neon entra sin soporte, muere sin trade."],
    "whenToPick": ["Equipo que puede comunicar timings.", "Corrode activo en el pool.", "Querés control por capas con doble controller."],
    "status": "partial",
    "confidence": "medium",
    "sourceRefs": ["riot-maps", "rb-corrode-guide", "valohub-meta-comps"]
  }
];
