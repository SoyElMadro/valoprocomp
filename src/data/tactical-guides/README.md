# ValoProComp Tactical Guides Data

Ubicación recomendada en tu proyecto:

```txt
src/data/tactical-guides/
```

Archivos incluidos:

- `types.ts`: interfaces y tipos base.
- `meta.ts`: metadata de versión/parche.
- `sources.ts`: catálogo de fuentes.
- `agentRoles.ts`: roles de agentes.
- `mapTactics.ts`: tácticas por mapa/site/lado.
- `roleGuides.ts`: fallbacks por rol y mapa.
- `agentMapGuides.ts`: guías específicas de agentes + fallback automático.
- `compositionGuides.ts`: guías de composiciones completas.
- `index.ts`: exports y helpers para consumir la data desde componentes.

Notas importantes:

1. El baseline usado es VALORANT 12.09, verificado el 2026-05-19.
2. Las entradas con `needs-review`, `partial` o `no-source` deben mostrarse en la UI con una advertencia visual.
3. No se debe presentar un fallback como guía específica. Si `status === 'no-source'`, mostrar algo como: "No hay guía específica validada; usando recomendaciones por rol".
4. Lotus A, Breeze y Pearl B requieren especial cuidado por cambios recientes de mapa.
5. Para el siguiente paso, el agente de programación debería crear un componente `TacticalGuide` que use `getTacticalGuidePayload(map, selectedAgents)`.
