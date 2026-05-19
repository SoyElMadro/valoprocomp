import type { SiteTactic } from './types';

export const mapTactics: SiteTactic[] = [
  {
    "map": "Ascent",
    "site": "A",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.08",
        "scope": "map",
        "summary": "Ascent está dentro del pool competitivo actual.",
        "tacticalImpact": "Priorizar guía actualizada para ranked/competitive y no asumir Bind como mapa activo.",
        "sourceRefs": [
          "riot-patch-12-08"
        ]
      },
      {
        "patch": "10.04",
        "scope": "map",
        "summary": "B Main tiene cambios de penetración de pared.",
        "tacticalImpact": "No basar el hold de B únicamente en spam temprano; usar info, delay y retake.",
        "sourceRefs": [
          "riot-patch-10-04-ascent"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Ascent A: default con presión secundaria antes del commit",
      "summary": "Ascent A se juega alrededor de mapa de mid control: catwalk, market y tree deciden si el hit es limpio o predecible. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Tree",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Heaven / Generator",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Generator",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Catwalk",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Tree",
        "Heaven",
        "Generator",
        "Dice",
        "Catwalk"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-ascent-guide",
        "yt-ascent-mid-control",
        "riot-patch-12-08"
      ]
    }
  },
  {
    "map": "Ascent",
    "site": "A",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.08",
        "scope": "map",
        "summary": "Ascent está dentro del pool competitivo actual.",
        "tacticalImpact": "Priorizar guía actualizada para ranked/competitive y no asumir Bind como mapa activo.",
        "sourceRefs": [
          "riot-patch-12-08"
        ]
      },
      {
        "patch": "10.04",
        "scope": "map",
        "summary": "B Main tiene cambios de penetración de pared.",
        "tacticalImpact": "No basar el hold de B únicamente en spam temprano; usar info, delay y retake.",
        "sourceRefs": [
          "riot-patch-10-04-ascent"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Ascent A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Ascent A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Tree / Heaven",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Heaven",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Dice",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Tree",
        "Heaven",
        "Generator",
        "Dice",
        "Catwalk"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-ascent-guide",
        "yt-ascent-mid-control",
        "riot-patch-12-08"
      ]
    }
  },
  {
    "map": "Ascent",
    "site": "B",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.08",
        "scope": "map",
        "summary": "Ascent está dentro del pool competitivo actual.",
        "tacticalImpact": "Priorizar guía actualizada para ranked/competitive y no asumir Bind como mapa activo.",
        "sourceRefs": [
          "riot-patch-12-08"
        ]
      },
      {
        "patch": "10.04",
        "scope": "map",
        "summary": "B Main tiene cambios de penetración de pared.",
        "tacticalImpact": "No basar el hold de B únicamente en spam temprano; usar info, delay y retake.",
        "sourceRefs": [
          "riot-patch-10-04-ascent"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Ascent B: default con presión secundaria antes del commit",
      "summary": "Ascent B se juega alrededor de mapa de mid control: catwalk, market y tree deciden si el hit es limpio o predecible. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Main / Market",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Lane / Boat House",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Boat House",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Mid Bottom",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Main",
        "Market",
        "Lane",
        "Boat House",
        "CT",
        "Mid Bottom"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-ascent-guide",
        "yt-ascent-mid-control",
        "riot-patch-12-08"
      ]
    }
  },
  {
    "map": "Ascent",
    "site": "B",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.08",
        "scope": "map",
        "summary": "Ascent está dentro del pool competitivo actual.",
        "tacticalImpact": "Priorizar guía actualizada para ranked/competitive y no asumir Bind como mapa activo.",
        "sourceRefs": [
          "riot-patch-12-08"
        ]
      },
      {
        "patch": "10.04",
        "scope": "map",
        "summary": "B Main tiene cambios de penetración de pared.",
        "tacticalImpact": "No basar el hold de B únicamente en spam temprano; usar info, delay y retake.",
        "sourceRefs": [
          "riot-patch-10-04-ascent"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Ascent B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Ascent B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Market / Lane",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Lane",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "CT",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Main",
        "Market",
        "Lane",
        "Boat House",
        "CT",
        "Mid Bottom"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-ascent-guide",
        "yt-ascent-mid-control",
        "riot-patch-12-08"
      ]
    }
  },
  {
    "map": "Breeze",
    "site": "A",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.00",
        "scope": "map",
        "summary": "Breeze volvió/reworkeado en Season 2026.",
        "tacticalImpact": "Paredes y lineups anteriores a 12.00 deben marcarse como needs-review.",
        "sourceRefs": [
          "riot-patch-12-00"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Breeze A: default con presión secundaria antes del commit",
      "summary": "Breeze A se juega alrededor de mapa abierto de líneas largas: necesitás cortes de visión, info y flank control antes del plant. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Pyramids",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Cave / Bridge",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Bridge",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Halls",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Pyramids",
        "Cave",
        "Bridge",
        "Mid Doors",
        "Halls"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-breeze-guide",
        "riot-patch-12-00"
      ]
    }
  },
  {
    "map": "Breeze",
    "site": "A",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.00",
        "scope": "map",
        "summary": "Breeze volvió/reworkeado en Season 2026.",
        "tacticalImpact": "Paredes y lineups anteriores a 12.00 deben marcarse como needs-review.",
        "sourceRefs": [
          "riot-patch-12-00"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Breeze A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Breeze A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Pyramids / Cave",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Cave",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Mid Doors",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Pyramids",
        "Cave",
        "Bridge",
        "Mid Doors",
        "Halls"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-breeze-guide",
        "riot-patch-12-00"
      ]
    }
  },
  {
    "map": "Breeze",
    "site": "B",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.00",
        "scope": "map",
        "summary": "Breeze volvió/reworkeado en Season 2026.",
        "tacticalImpact": "Paredes y lineups anteriores a 12.00 deben marcarse como needs-review.",
        "sourceRefs": [
          "riot-patch-12-00"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Breeze B: default con presión secundaria antes del commit",
      "summary": "Breeze B se juega alrededor de mapa abierto de líneas largas: necesitás cortes de visión, info y flank control antes del plant. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Main / Back Site",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Tunnel / Arches",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Arches",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Elbow",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Main",
        "Back Site",
        "Tunnel",
        "Arches",
        "Mid Nest",
        "Elbow"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-breeze-guide",
        "riot-patch-12-00"
      ]
    }
  },
  {
    "map": "Breeze",
    "site": "B",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.00",
        "scope": "map",
        "summary": "Breeze volvió/reworkeado en Season 2026.",
        "tacticalImpact": "Paredes y lineups anteriores a 12.00 deben marcarse como needs-review.",
        "sourceRefs": [
          "riot-patch-12-00"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Breeze B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Breeze B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Back Site / Tunnel",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Tunnel",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Mid Nest",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Main",
        "Back Site",
        "Tunnel",
        "Arches",
        "Mid Nest",
        "Elbow"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-breeze-guide",
        "riot-patch-12-00"
      ]
    }
  },
  {
    "map": "Fracture",
    "site": "A",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Fracture está dentro del pool competitivo desde 12.05.",
        "tacticalImpact": "Vale la pena priorizar cobertura táctica completa para el pool actual.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Fracture A: default con presión secundaria antes del commit",
      "summary": "Fracture A se juega alrededor de mapa de doble spawn atacante: los pincers coordinados valen más que entrar por un solo choke. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Drop",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Rope / Dish",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Dish",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Defender Spawn",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Drop",
        "Rope",
        "Dish",
        "Defender Spawn"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-fracture-guide",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Fracture",
    "site": "A",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Fracture está dentro del pool competitivo desde 12.05.",
        "tacticalImpact": "Vale la pena priorizar cobertura táctica completa para el pool actual.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Fracture A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Fracture A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Drop / Rope",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Rope",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Dish",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Drop",
        "Rope",
        "Dish",
        "Defender Spawn"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-fracture-guide",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Fracture",
    "site": "B",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Fracture está dentro del pool competitivo desde 12.05.",
        "tacticalImpact": "Vale la pena priorizar cobertura táctica completa para el pool actual.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Fracture B: default con presión secundaria antes del commit",
      "summary": "Fracture B se juega alrededor de mapa de doble spawn atacante: los pincers coordinados valen más que entrar por un solo choke. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Main / Arcade",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Tower / Canteen",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Canteen",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Generator",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Main",
        "Arcade",
        "Tower",
        "Canteen",
        "Generator"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-fracture-guide",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Fracture",
    "site": "B",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Fracture está dentro del pool competitivo desde 12.05.",
        "tacticalImpact": "Vale la pena priorizar cobertura táctica completa para el pool actual.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Fracture B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Fracture B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Arcade / Tower",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Tower",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Canteen",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Main",
        "Arcade",
        "Tower",
        "Canteen",
        "Generator"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-fracture-guide",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Haven A: default con presión secundaria antes del commit",
      "summary": "Haven A se juega alrededor de mapa de tres sites: info temprana, fakes y re-hits castigan rotaciones largas. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Long / A Short",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Sewer / Heaven",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Heaven",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "CT",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Long",
        "A Short",
        "Sewer",
        "Heaven",
        "Default",
        "CT"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Haven A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Haven A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Long",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "A Short / Sewer",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Sewer",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Default",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Long",
        "A Short",
        "Sewer",
        "Heaven",
        "Default",
        "CT"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Haven B: default con presión secundaria antes del commit",
      "summary": "Haven B se juega alrededor de mapa de tres sites: info temprana, fakes y re-hits castigan rotaciones largas. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "Mid Window / Garage",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "B Site / A Link",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "A Link",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "C Link",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "Mid Window",
        "Garage",
        "B Site",
        "A Link",
        "C Link"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Haven B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Haven B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "Mid Window",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Garage / B Site",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "B Site",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "A Link",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "Mid Window",
        "Garage",
        "B Site",
        "A Link",
        "C Link"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "C",
    "side": "attack",
    "defaultPlan": {
      "title": "Haven C: default con presión secundaria antes del commit",
      "summary": "Haven C se juega alrededor de mapa de tres sites: info temprana, fakes y re-hits castigan rotaciones largas. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "C Long / Garage",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Platform / CT",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "CT",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Back Site",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "C Long",
        "Garage",
        "Platform",
        "CT",
        "Back Site"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Haven",
    "site": "C",
    "side": "defense",
    "defaultPlan": {
      "title": "Haven C: defensa con info, delay y retake preparado",
      "summary": "En defensa de Haven C, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "C Long",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Garage / Platform",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Platform",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "CT",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "C Long",
        "Garage",
        "Platform",
        "CT",
        "Back Site"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "documented",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-haven-guide"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "A",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus A: default con presión secundaria antes del commit",
      "summary": "Lotus A se juega alrededor de mapa de tres sites y puertas: controlar zonas centrales habilita pivots y retakes. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Rubble",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Vines / Stairs",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Stairs",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Tree",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Rubble",
        "Vines",
        "Stairs",
        "Door",
        "Tree"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "A",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Lotus A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Rubble / Vines",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Vines",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Door",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Rubble",
        "Vines",
        "Stairs",
        "Door",
        "Tree"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "B",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus B: default con presión secundaria antes del commit",
      "summary": "Lotus B se juega alrededor de mapa de tres sites y puertas: controlar zonas centrales habilita pivots y retakes. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Main / A Link",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "C Link / Upper",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Upper",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Pillar",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Main",
        "A Link",
        "C Link",
        "Upper",
        "Pillar"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "B",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Lotus B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "A Link / C Link",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "C Link",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Upper",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Main",
        "A Link",
        "C Link",
        "Upper",
        "Pillar"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "C",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus C: default con presión secundaria antes del commit",
      "summary": "Lotus C se juega alrededor de mapa de tres sites y puertas: controlar zonas centrales habilita pivots y retakes. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "C Main / Mound",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Waterfall / Hall",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Hall",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "CT",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "C Main",
        "Mound",
        "Waterfall",
        "Hall",
        "Bend",
        "CT"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Lotus",
    "site": "C",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "12.05",
        "scope": "map",
        "summary": "Lotus A cambió: lobby, vines, paredes, escalera/room y plant zone.",
        "tacticalImpact": "No reutilizar plantas/lineups viejas para A link/breakable sin validación.",
        "sourceRefs": [
          "riot-patch-12-05"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Lotus C: defensa con info, delay y retake preparado",
      "summary": "En defensa de Lotus C, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "C Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Mound / Waterfall",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Waterfall",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Bend",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "C Main",
        "Mound",
        "Waterfall",
        "Hall",
        "Bend",
        "CT"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "low",
      "sourceRefs": [
        "riot-maps",
        "rb-lotus-guide",
        "yt-lotus-premier-strip",
        "riot-patch-12-05"
      ]
    }
  },
  {
    "map": "Pearl",
    "site": "A",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "11.08",
        "scope": "map",
        "summary": "Pearl B recibió cambios recientes respecto a guías antiguas.",
        "tacticalImpact": "Revisar ángulos de B Long/Hall antes de publicar lineups exactas.",
        "sourceRefs": [
          "riot-patch-11-08-pearl"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Pearl A: default con presión secundaria antes del commit",
      "summary": "Pearl A se juega alrededor de mapa compacto en mid y largo en alas: mid control reduce retakes preparados. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Art",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Dugout / Flowers",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Flowers",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Secret",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Art",
        "Dugout",
        "Flowers",
        "Link",
        "Secret"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-pearl-guide",
        "riot-patch-11-08-pearl"
      ]
    }
  },
  {
    "map": "Pearl",
    "site": "A",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "11.08",
        "scope": "map",
        "summary": "Pearl B recibió cambios recientes respecto a guías antiguas.",
        "tacticalImpact": "Revisar ángulos de B Long/Hall antes de publicar lineups exactas.",
        "sourceRefs": [
          "riot-patch-11-08-pearl"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Pearl A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Pearl A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Art / Dugout",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Dugout",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Link",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Art",
        "Dugout",
        "Flowers",
        "Link",
        "Secret"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-pearl-guide",
        "riot-patch-11-08-pearl"
      ]
    }
  },
  {
    "map": "Pearl",
    "site": "B",
    "side": "attack",
    "patchEffects": [
      {
        "patch": "11.08",
        "scope": "map",
        "summary": "Pearl B recibió cambios recientes respecto a guías antiguas.",
        "tacticalImpact": "Revisar ángulos de B Long/Hall antes de publicar lineups exactas.",
        "sourceRefs": [
          "riot-patch-11-08-pearl"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Pearl B: default con presión secundaria antes del commit",
      "summary": "Pearl B se juega alrededor de mapa compacto en mid y largo en alas: mid control reduce retakes preparados. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Long / B Hall",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Link / Mid",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Mid",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Tower",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Long",
        "B Hall",
        "Link",
        "Mid",
        "Art",
        "Tower"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-pearl-guide",
        "riot-patch-11-08-pearl"
      ]
    }
  },
  {
    "map": "Pearl",
    "site": "B",
    "side": "defense",
    "patchEffects": [
      {
        "patch": "11.08",
        "scope": "map",
        "summary": "Pearl B recibió cambios recientes respecto a guías antiguas.",
        "tacticalImpact": "Revisar ángulos de B Long/Hall antes de publicar lineups exactas.",
        "sourceRefs": [
          "riot-patch-11-08-pearl"
        ]
      }
    ],
    "defaultPlan": {
      "title": "Pearl B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Pearl B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Long",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "B Hall / Link",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Link",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Art",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Long",
        "B Hall",
        "Link",
        "Mid",
        "Art",
        "Tower"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "needs-review",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-pearl-guide",
        "riot-patch-11-08-pearl"
      ]
    }
  },
  {
    "map": "Split",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Split A: default con presión secundaria antes del commit",
      "summary": "Split A se juega alrededor de mapa lento y vertical: mid, heaven/vents y rampas definen la ronda. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "A Main / Ramps",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Heaven / Screens",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Screens",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Vents",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "A Main",
        "Ramps",
        "Heaven",
        "Screens",
        "Vents"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-split-guide",
        "yt-split-deep-dive"
      ]
    }
  },
  {
    "map": "Split",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Split A: defensa con info, delay y retake preparado",
      "summary": "En defensa de Split A, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "A Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Ramps / Heaven",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Heaven",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Screens",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "A Main",
        "Ramps",
        "Heaven",
        "Screens",
        "Vents"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-split-guide",
        "yt-split-deep-dive"
      ]
    }
  },
  {
    "map": "Split",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Split B: default con presión secundaria antes del commit",
      "summary": "Split B se juega alrededor de mapa lento y vertical: mid, heaven/vents y rampas definen la ronda. La idea es tomar info, cortar las líneas clave y recién después confirmar si se ejecuta, se fakea o se pivotea.",
      "steps": [
        {
          "by": "recon-initiator",
          "action": "confirmar espacio",
          "targetZone": "B Main / Garage",
          "timing": "0:00-0:18",
          "purpose": "saber si hay stack, push o ancla aislada"
        },
        {
          "by": "primary-controller",
          "action": "cortar visión",
          "targetZone": "Heaven / Back Site",
          "timing": "al commit o fake",
          "purpose": "aislar site y negar rotaciones/retake temprano"
        },
        {
          "by": "entry",
          "action": "tomar primer espacio tradeable",
          "targetZone": "Back Site",
          "timing": "después de info + humos/flash",
          "purpose": "crear espacio real para plant sin morir aislado"
        },
        {
          "by": "anchor-sentinel",
          "action": "flank watch / lurk control",
          "targetZone": "Mail",
          "timing": "durante plant y post-plant",
          "purpose": "evitar backstab y mantener condición de victoria"
        }
      ],
      "keyPositions": [
        "B Main",
        "Garage",
        "Heaven",
        "Back Site",
        "Vents",
        "Mail"
      ],
      "winConditions": [
        "Entrar cuando info y smokes estén sincronizadas.",
        "Plant con línea principal de retake cortada.",
        "Mantener flank/control de mid para no quedar encerrados."
      ],
      "failConditions": [
        "Rush por un solo choke sin presión secundaria.",
        "Gastar toda la utilidad antes de confirmar site.",
        "Plantar sin plan de post-plant o anti-retake."
      ],
      "counters": [
        "Stack defensivo leído por falta de fake.",
        "Push temprano sobre extremidad opuesta.",
        "Retake agrupado cuando no queda utilidad."
      ],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-split-guide",
        "yt-split-deep-dive"
      ]
    }
  },
  {
    "map": "Split",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Split B: defensa con info, delay y retake preparado",
      "summary": "En defensa de Split B, el objetivo es confirmar si el hit es real antes de sobrerrotar. Se gana tiempo, se evita morir solo y se guarda utilidad para retake si el site cae.",
      "steps": [
        {
          "by": "info-sentinel",
          "action": "detectar presión",
          "targetZone": "B Main",
          "timing": "0:00-0:15",
          "purpose": "distinguir default, fake o rush"
        },
        {
          "by": "primary-controller",
          "action": "smoke/deny defensivo",
          "targetZone": "Garage / Heaven",
          "timing": "al primer contacto real",
          "purpose": "frenar entry y permitir rotaciones"
        },
        {
          "by": "recon-initiator",
          "action": "reclear coordinado",
          "targetZone": "Heaven",
          "timing": "mid-round o retake",
          "purpose": "recuperar zona perdida con trade"
        },
        {
          "by": "anchor-sentinel",
          "action": "anclar o ceder con info",
          "targetZone": "Vents",
          "timing": "según presión",
          "purpose": "no regalar una muerte aislada y mantener utilidad viva"
        }
      ],
      "keyPositions": [
        "B Main",
        "Garage",
        "Heaven",
        "Back Site",
        "Vents",
        "Mail"
      ],
      "winConditions": [
        "Confirmar hit real antes de rotar.",
        "Sobrevivir con utilidad para retake.",
        "Jugar crossfires y no duelos aislados."
      ],
      "failConditions": [
        "Pelear solo el choke principal.",
        "Rotar por sonido sin info.",
        "Gastar toda la utilidad antes del execute real."
      ],
      "counters": [
        "Fake + re-hit al site opuesto.",
        "Lurk sobre mid/link.",
        "Exec con doble capa de utilidad."
      ],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": [
        "riot-maps",
        "rb-split-guide",
        "yt-split-deep-dive"
      ]
    }
  },
  {
    "map": "Bind",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Bind A: execute simultáneo por Short y Showers",
      "summary": "Bind A requiere presión desde A Short y A Showers simultáneamente. Sin mid tradicional, no hay fake natural: el execute debe ser coordinado por dos frentes. Controlar Lamps es clave para conectar front y back site.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "A Short / Lamps", "timing": "0:00-0:15", "purpose": "saber si hay stack o ancla aislada" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "Heaven / Tower", "timing": "al commit", "purpose": "aislar site y negar retake temprano" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "Lamps / Truck", "timing": "después de smokes/flashes", "purpose": "crear espacio para plant en Default o Tetris" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Portal / Showers", "timing": "durante plant", "purpose": "evitar rotación por teleporter" }
      ],
      "keyPositions": ["A Short", "A Showers", "Lamps", "Heaven", "Truck", "Tetris", "Portal"],
      "winConditions": ["Presión simultánea Short + Showers.", "Controlar Lamps para conectar front/back.", "Plant con Heaven cortado."],
      "failConditions": ["Entrar solo por Short sin Showers.", "No limpiar Lamps antes del plant.", "Gastar utilidad sin confirmar site."],
      "counters": ["Stack A con 3 jugadores.", "Push agresivo por Portal.", "Retake rápido desde teleporter."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-bind-guide"]
    }
  },
  {
    "map": "Bind",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Bind A: defensa con control de Portal y Lamps",
      "summary": "En defensa de Bind A, el objetivo es controlar Portal y Lamps para negar rotaciones y conectar front/back site. A Short es difícil de defender solo: necesita soporte desde back site.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "A Short", "timing": "0:00-0:12", "purpose": "distinguir rush de default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "Heaven / Tower", "timing": "al contacto", "purpose": "frenar entry y permitir rotación" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "Lamps / Tetris", "timing": "mid-round", "purpose": "recuperar zona antes del plant" }
      ],
      "keyPositions": ["A Short", "Lamps", "Heaven", "Tetris", "Portal", "Truck"],
      "winConditions": ["Controlar Portal para rotar.", "Defender Lamps como punto central.", "No morir aislado en Short."],
      "failConditions": ["Pelear Short solo sin back site.", "Perder Lamps sin trade.", "No usar teleporter para rotar."],
      "counters": ["Split Short + Showers coordinado.", "Fake A → teleporter → B.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-bind-guide"]
    }
  },
  {
    "map": "Bind",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Bind B: split push por Garden y Hookah",
      "summary": "Bind B requiere push simultáneo por B Garden y B Hookah. Hookah es el punto más disputado: controlarlo permite entrar al site con ventaja. Sin mid, el execute debe ser directo y coordinado.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "B Long / Hookah", "timing": "0:00-0:15", "purpose": "saber si hay stack o hold pasivo" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "Elbow / B Hall", "timing": "al commit", "purpose": "aislar site y negar retake" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "Hookah / Garden", "timing": "después de smokes/flashes", "purpose": "crear espacio para plant en default o behind container" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Elbow / B Hall", "timing": "durante plant", "purpose": "evitar retake temprano" }
      ],
      "keyPositions": ["B Long", "B Garden", "Hookah", "Elbow", "Container", "B Hall"],
      "winConditions": ["Push simultáneo Garden + Hookah.", "Controlar Hookah antes del site.", "Plant con Elbow cortado."],
      "failConditions": ["Entrar solo por Long sin Hookah.", "No limpiar Container antes del plant.", "Quedar sin utilidad anti-retake."],
      "counters": ["Stack B con 3 jugadores.", "Push agresivo por Hookah.", "Retake rápido desde teleporter."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-bind-guide"]
    }
  },
  {
    "map": "Bind",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Bind B: defensa con ancla en Hookah y Garden",
      "summary": "En defensa de Bind B, el objetivo es controlar Hookah y Garden para frenar el split push. Un sentinel ancla el site mientras el segundo jugador presiona B Long.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "B Long", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "Garden / Hookah", "timing": "al contacto", "purpose": "frenar entry y ganar tiempo" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "Hookah / Container", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["B Long", "Garden", "Hookah", "Elbow", "Container", "B Hall"],
      "winConditions": ["Controlar Hookah como punto central.", "Sentinel ancla el site.", "Usar teleporter para rotar si A es atacado."],
      "failConditions": ["Perder Hookah sin trade.", "No comunicar rotación por teleporter.", "Gastar toda la utilidad antes del commit."],
      "counters": ["Split Garden + Hookah coordinado.", "Fake B → teleporter → A.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-bind-guide"]
    }
  },
  {
    "map": "Icebox",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Icebox A: rush coordinado con utilidad de clearing",
      "summary": "Icebox A es un laberinto de cajas y niveles. El rush coordinado con Sova drone o Raze car funciona mejor que defaults lentas. Plantear en ground-level cerca de la estructura principal permite post-plant desde Belt.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "A Main / A Rafters", "timing": "0:00-0:15", "purpose": "evitar traps y confirmar ángulos altos" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "A Belt / A Pipes", "timing": "al commit", "purpose": "aislar site y negar rotación por mid" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "A Main / A Nest", "timing": "después de info", "purpose": "crear espacio para plant en ground-level" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "A Belt / Mid", "timing": "durante plant", "purpose": "evitar flank por mid" }
      ],
      "keyPositions": ["A Main", "A Nest", "A Belt", "A Pipes", "A Rafters", "A Cubby"],
      "winConditions": ["Rush coordinado con clearing utility.", "Plant en ground-level con visión desde Belt.", "Controlar mid para evitar flank."],
      "failConditions": ["Dry peek sin drone/flash.", "No limpiar Rafters antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde A Rafters.", "Flank rápido por mid.", "Retake con Sage wall."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-icebox-guide"]
    }
  },
  {
    "map": "Icebox",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Icebox A: defensa con ángulos elevados y Sage wall",
      "summary": "En defensa de Icebox A, aprovechar los múltiples niveles para holds elevados. Sage wall en backsite funnel retakes. Si el site cae, retakear con utilidad coordinada.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "A Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "A Belt / A Pipes", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "A Rafters / A Nest", "timing": "mid-round", "purpose": "recuperar zona perdida con trade" }
      ],
      "keyPositions": ["A Main", "A Nest", "A Belt", "A Pipes", "A Rafters", "A Cubby"],
      "winConditions": ["Hold desde ángulos elevados.", "Sage wall para funnel retake.", "No morir aislado en site."],
      "failConditions": ["Pelear en ground-level sin ventaja.", "No comunicar rush enemigo.", "Gastar toda la utilidad antes del plant."],
      "counters": ["Rush coordinado con clearing.", "Split por Belt + Main.", "Plant en top site para sonido de defuse."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-icebox-guide"]
    }
  },
  {
    "map": "Icebox",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Icebox B: control de Yellow y Tube con Viper wall",
      "summary": "Icebox B es abierto con líneas largas. Viper wall es esencial para cortar ángulos. Controlar B Yellow y Tube antes del execute. Plantear seguro con Sage wall si es necesario.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "B Yellow / B Snowman", "timing": "0:00-0:15", "purpose": "evitar Operator y confirmar holds" },
        { "by": "primary-controller", "action": "pared o humo largo", "targetZone": "B Site / B Snowman", "timing": "al commit", "purpose": "cortar líneas largas para entry seguro" },
        { "by": "entry", "action": "tomar espacio", "targetZone": "B Yellow / B Site", "timing": "sobre la smoke", "purpose": "crear espacio para plant seguro" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Tube / Mid", "timing": "durante plant", "purpose": "evitar flank por mid" }
      ],
      "keyPositions": ["B Main", "B Yellow", "B Snowman", "Tube", "B Nest", "B Cubby"],
      "winConditions": ["Viper wall para cortar ángulos largos.", "Controlar Yellow antes del site.", "Plant seguro con Sage wall si es necesario."],
      "failConditions": ["Cruzar sin wall/smoke.", "No limpiar Snowman antes del plant.", "Perder Tube sin flank watch."],
      "counters": ["Operator en B Long.", "Hold desde Snowman.", "Retake con utilidad desde mid."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-icebox-guide"]
    }
  },
  {
    "map": "Icebox",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Icebox B: defensa con Operator y control de Yellow",
      "summary": "En defensa de Icebox B, usar Operator para holds largos. Controlar B Yellow como punto de info. Si el site cae, retakear desde posiciones elevadas.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "B Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "B Yellow / B Snowman", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "B Site / B Nest", "timing": "mid-round", "purpose": "recuperar zona perdida con trade" }
      ],
      "keyPositions": ["B Main", "B Yellow", "B Snowman", "Tube", "B Nest", "B Cubby"],
      "winConditions": ["Operator en ángulos largos.", "Controlar Yellow como punto de info.", "Retakear desde posiciones elevadas."],
      "failConditions": ["Perder Yellow sin trade.", "No comunicar push enemigo.", "Gastar toda la utilidad antes del plant."],
      "counters": ["Push coordinado con wall.", "Split por Yellow + Tube.", "Plant seguro con Sage wall."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-icebox-guide"]
    }
  },
  {
    "map": "Sunset",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Sunset A: control de Elbow y execute coordinado",
      "summary": "Sunset A es compacto con entradas estrechas. Controlar A Elbow es crucial para asegurar el plant. Usar utilidad para limpiar cubbies y ángulos de 90 grados antes del entry.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "A Main / A Elbow", "timing": "0:00-0:15", "purpose": "evitar ambush en cubbies" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "A Link / A Alley", "timing": "al commit", "purpose": "negar rotación defensiva" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "A Elbow / A Site", "timing": "después de flashes", "purpose": "crear espacio para plant" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "A Alley / Mid", "timing": "durante plant", "purpose": "evitar flank rápido" }
      ],
      "keyPositions": ["A Main", "A Lobby", "A Elbow", "A Link", "A Alley", "Mid Tiles"],
      "winConditions": ["Controlar Elbow antes del site.", "Limpiar cubbies con utilidad.", "Plant con Link cortado."],
      "failConditions": ["Dry peek sin utilidad.", "No limpiar Elbow antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde Elbow.", "Flank rápido por Alley.", "Retake con utilidad desde mid."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-sunset-guide"]
    }
  },
  {
    "map": "Sunset",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Sunset A: defensa agresiva en Main y Elbow",
      "summary": "En defensa de Sunset A, presionar A Main temprano para ganar info. Elbow es el punto clave: controlarlo permite crossfires y negar el plant fácil.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "A Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "A Elbow / A Link", "timing": "al contacto", "purpose": "frenar entry y permitir rotación" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "A Site / A Alley", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["A Main", "A Lobby", "A Elbow", "A Link", "A Alley", "Mid Tiles"],
      "winConditions": ["Presionar Main temprano.", "Controlar Elbow para crossfires.", "Rotar rápido por mid si B es atacado."],
      "failConditions": ["Sentarse en site sin presión.", "Perder Elbow sin trade.", "No comunicar rush enemigo."],
      "counters": ["Split Main + Elbow coordinado.", "Fake A → mid → B.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-sunset-guide"]
    }
  },
  {
    "map": "Sunset",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Sunset B: control de Main y Market para execute",
      "summary": "Sunset B es más amplio con esquina cerrada. Controlar B Main y B Market antes del execute. Usar utilidad para limpiar pillar y ángulos cerrados. Boba conecta con mid para flank.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "B Main / B Market", "timing": "0:00-0:15", "purpose": "evitar ambush en corners" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "B Market / B Boba", "timing": "al commit", "purpose": "negar rotación defensiva" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "B Main / B Site", "timing": "después de flashes", "purpose": "crear espacio para plant detrás de pillar" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "B Boba / Mid", "timing": "durante plant", "purpose": "evitar flank por Boba" }
      ],
      "keyPositions": ["B Main", "B Lobby", "B Market", "B Boba", "Mid Courtyard", "Mid Tiles"],
      "winConditions": ["Controlar Main y Market.", "Limpiar pillar con utilidad.", "Plant seguro con Boba vigilado."],
      "failConditions": ["Dry peek sin utilidad.", "No limpiar Market antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde Market.", "Flank rápido por Boba.", "Retake con utilidad desde mid."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-sunset-guide"]
    }
  },
  {
    "map": "Sunset",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Sunset B: defensa con Market y pillar control",
      "summary": "En defensa de Sunset B, controlar Market como punto de info. Pillar ofrece ángulos para post-plant. Si el site cae, retakear desde Main con utilidad coordinada.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "B Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "B Market / B Boba", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "B Site / B Market", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["B Main", "B Lobby", "B Market", "B Boba", "Mid Courtyard", "Mid Tiles"],
      "winConditions": ["Controlar Market como punto de info.", "Pillar para ángulos post-plant.", "Rotar rápido por mid si A es atacado."],
      "failConditions": ["Sentarse en site sin presión.", "Perder Market sin trade.", "No comunicar rush enemigo."],
      "counters": ["Split Main + Market coordinado.", "Fake B → mid → A.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-sunset-guide"]
    }
  },
  {
    "map": "Abyss",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Abyss A: control de Heaven y execute por Main",
      "summary": "Abyss A tiene una sola entrada principal pero con acceso por Vent desde mid. Controlar A Tower/Heaven es crucial. El site es estrecho con múltiples niveles. Sin bordes: usar knockback para empujar rivales al vacío.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "A Main / A Tower", "timing": "0:00-0:15", "purpose": "evitar Operator y confirmar holds" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "A Tower / A Back Site", "timing": "al commit", "purpose": "aislar site y negar retake" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "A Main / A Tower", "timing": "después de smokes/flashes", "purpose": "crear espacio para plant" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Vent / Mid", "timing": "durante plant", "purpose": "evitar flank por vent" }
      ],
      "keyPositions": ["A Main", "A Lobby", "A Tower", "A Bridge", "A Back Site", "Vent", "Mid Catwalk"],
      "winConditions": ["Controlar Tower/Heaven.", "Plant con back site vigilado.", "Usar knockback para empujar al vacío."],
      "failConditions": ["Dry peek sin smokes.", "No limpiar Tower antes del plant.", "Perder vent sin flank watch."],
      "counters": ["Hold agresivo desde Tower.", "Push por Vent para flank.", "Retake con utilidad desde mid."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-abyss-guide", "riot-patch-8-11-abyss"]
    }
  },
  {
    "map": "Abyss",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Abyss A: defensa con Tower y back site control",
      "summary": "En defensa de Abyss A, controlar A Tower como vantage point. Back site ofrece ruta de escape. Usar Cypher trips/Vyse orbs para controlar sin push al site.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "A Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "A Tower / A Back Site", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "A Site / A Tower", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["A Main", "A Lobby", "A Tower", "A Bridge", "A Back Site", "Vent", "Mid Catwalk"],
      "winConditions": ["Tower como vantage point.", "Back site para escape.", "Usar knockback para empujar al vacío."],
      "failConditions": ["Perder Tower sin trade.", "No comunicar rush enemigo.", "Quedarse en site sin ruta de escape."],
      "counters": ["Split Main + Vent coordinado.", "Fake A → mid → B.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-abyss-guide", "riot-patch-8-11-abyss"]
    }
  },
  {
    "map": "Abyss",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Abyss B: split por Main y Danger con post-plant spam",
      "summary": "Abyss B es más abierto con múltiples entradas: B Main, B Danger y Mid Link. Plantear en cliff edge para máxima visibilidad del defuse. Post-plant spam es fuerte por paredes penetrables.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "B Main / B Tower", "timing": "0:00-0:15", "purpose": "evitar Operator y confirmar holds" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "B Tower / B Link", "timing": "al commit", "purpose": "aislar site y negar retake" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "B Main / B Danger", "timing": "después de smokes/flashes", "purpose": "crear espacio para plant en cliff edge" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "B Link / Mid", "timing": "durante plant", "purpose": "evitar flank por mid" }
      ],
      "keyPositions": ["B Main", "B Tower", "B Link", "B Danger", "B Under", "Mid Library"],
      "winConditions": ["Plant en cliff edge para visibilidad.", "Post-plant spam por paredes penetrables.", "Controlar Danger para flank."],
      "failConditions": ["Dry peek sin smokes.", "No limpiar Tower antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde Tower.", "Push por Danger para flank.", "Retake con utilidad desde mid."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-abyss-guide", "riot-patch-8-11-abyss"]
    }
  },
  {
    "map": "Abyss",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Abyss B: defensa con Tower y retake-oriented play",
      "summary": "En defensa de Abyss B, controlar B Tower como vantage point. El site es difícil de defender solo: jugar retake-oriented con info de largo alcance. Heaven y Aqua son críticos para retake.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "B Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "B Tower / B Link", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "B Site / B Tower", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["B Main", "B Tower", "B Link", "B Danger", "B Under", "Mid Library"],
      "winConditions": ["Tower como vantage point.", "Retake-oriented con info de largo alcance.", "Controlar Heaven y Aqua para retake."],
      "failConditions": ["Perder Tower sin trade.", "No comunicar rush enemigo.", "Quedarse en site sin ruta de escape."],
      "counters": ["Split Main + Danger coordinado.", "Fake B → mid → A.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-abyss-guide", "riot-patch-8-11-abyss"]
    }
  },
  {
    "map": "Corrode",
    "site": "A",
    "side": "attack",
    "defaultPlan": {
      "title": "Corrode A: split por Main, Link y Crane con mid control",
      "summary": "Corrode A tiene tres entradas: A Main, A Link y A Crane. A Link es la power position: quien la controla decide el round. Usar mid control para split y smokes para cubrir connector vision.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "A Main / A Link", "timing": "0:00-0:15", "purpose": "evitar ambush en elbow" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "A Link / A Crane", "timing": "al commit", "purpose": "negar rotación defensiva" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "A Yard / A Pocket", "timing": "después de flashes", "purpose": "crear espacio para plant" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Mid Stairs", "timing": "durante plant", "purpose": "evitar flank por mid" }
      ],
      "keyPositions": ["A Main", "A Link", "A Crane", "A Yard", "A Pocket", "A Elbow", "Mid Stairs"],
      "winConditions": ["Controlar A Link como power position.", "Split por Main + Link + Crane.", "Mid control para evitar flank."],
      "failConditions": ["Rush solo por Main sin Link.", "No limpiar Elbow antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde Link.", "Flank rápido por mid stairs.", "Retake con utilidad desde crane."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-corrode-guide", "riot-patch-11-08"]
    }
  },
  {
    "map": "Corrode",
    "site": "A",
    "side": "defense",
    "defaultPlan": {
      "title": "Corrode A: defensa con Link y elbow crossfires",
      "summary": "En defensa de Corrode A, controlar A Link como punto central. Elbow ofrece crossfires. El site es retake-friendly pero tricky: no regalar Link sin pelea.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "A Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "A Link / A Crane", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "A Yard / A Pocket", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["A Main", "A Link", "A Crane", "A Yard", "A Pocket", "A Elbow", "Mid Stairs"],
      "winConditions": ["Controlar Link como punto central.", "Elbow para crossfires.", "Rotar rápido por mid si B es atacado."],
      "failConditions": ["Perder Link sin trade.", "No comunicar rush enemigo.", "Sentarse en site sin presión."],
      "counters": ["Split Main + Link coordinado.", "Fake A → mid → B.", "Exec con doble smoke."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-corrode-guide", "riot-patch-11-08"]
    }
  },
  {
    "map": "Corrode",
    "site": "B",
    "side": "attack",
    "defaultPlan": {
      "title": "Corrode B: execute agresivo por Main y Mid con utilidad coordinada",
      "summary": "Corrode B es fortaleza defensiva con chokes estrechos y ángulos elevados. No hacer rush directo: usar split por Main + Mid con smokes, flashes y mollies coordinados. B Elbow es crucial para post-plant.",
      "steps": [
        { "by": "recon-initiator", "action": "confirmar espacio", "targetZone": "B Main / B Elbow", "timing": "0:00-0:15", "purpose": "evitar crossfires y confirmar holds" },
        { "by": "primary-controller", "action": "cortar visión", "targetZone": "B Elbow / Mid Top", "timing": "al commit", "purpose": "negar rotación defensiva" },
        { "by": "entry", "action": "tomar primer espacio", "targetZone": "B Main / B Site", "timing": "después de utilidad coordinada", "purpose": "crear espacio para plant" },
        { "by": "anchor-sentinel", "action": "flank watch", "targetZone": "Mid Top", "timing": "durante plant", "purpose": "evitar flank por mid" }
      ],
      "keyPositions": ["B Main", "B Elbow", "Mid Top", "B Hut", "B Heaven", "Mid Stairs"],
      "winConditions": ["Split Main + Mid coordinado.", "Utilidad coordinada: smokes + flashes + mollies.", "Controlar Elbow para post-plant."],
      "failConditions": ["Rush directo por Main sin utilidad.", "No limpiar Elbow antes del plant.", "Perder mid sin flank watch."],
      "counters": ["Hold agresivo desde Elbow.", "Flank rápido por mid top.", "Retake con utilidad desde heaven."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-corrode-guide", "riot-patch-11-08"]
    }
  },
  {
    "map": "Corrode",
    "site": "B",
    "side": "defense",
    "defaultPlan": {
      "title": "Corrode B: fortaleza defensiva con Elbow y heaven holds",
      "summary": "En defensa de Corrode B, el site es una fortaleza: chokes estrechos, ángulos elevados, post-plant fuerte. Priorizar B control: sentinel + initiator + controller para slow down, info y lockdown.",
      "steps": [
        { "by": "info-sentinel", "action": "detectar presión", "targetZone": "B Main", "timing": "0:00-0:12", "purpose": "saber si es rush o default" },
        { "by": "primary-controller", "action": "smoke defensiva", "targetZone": "B Elbow / Mid Top", "timing": "al contacto", "purpose": "frenar entry y permitir retake" },
        { "by": "recon-initiator", "action": "reclear", "targetZone": "B Site / B Elbow", "timing": "mid-round", "purpose": "recuperar zona perdida" }
      ],
      "keyPositions": ["B Main", "B Elbow", "Mid Top", "B Hut", "B Heaven", "Mid Stairs"],
      "winConditions": ["Elbow y heaven para holds.", "Sentinel + initiator + controller para lockdown.", "Rotar rápido por mid si A es atacado."],
      "failConditions": ["Perder Elbow sin trade.", "No comunicar rush enemigo.", "Sentarse en site sin presión."],
      "counters": ["Split Main + Mid coordinado.", "Fake B → mid → A.", "Exec con doble smoke y utilidad."],
      "status": "partial",
      "confidence": "medium",
      "sourceRefs": ["riot-maps", "rb-corrode-guide", "riot-patch-11-08"]
    }
  }
];
