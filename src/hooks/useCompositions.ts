import { useState, useEffect, useCallback } from 'react';
import type { Composition, Agent, AgentRole } from '../types';

const API_BASE_URL = 'https://api.thespike.gg/stats/compositions';

const AGENT_ROLES: Record<string, AgentRole> = {
  Astra: 'Controlador',
  Breach: 'Iniciador',
  Brimstone: 'Controlador',
  Chamber: 'Centinela',
  Clove: 'Controlador',
  Cypher: 'Centinela',
  Deadlock: 'Centinela',
  Fade: 'Iniciador',
  Gekko: 'Iniciador',
  Harbor: 'Controlador',
  Iso: 'Duelista',
  Jett: 'Duelista',
  'KAY/O': 'Iniciador',
  Killjoy: 'Centinela',
  Neon: 'Duelista',
  Omen: 'Controlador',
  Phoenix: 'Duelista',
  Raze: 'Duelista',
  Reyna: 'Duelista',
  Sage: 'Centinela',
  Skye: 'Iniciador',
  Sova: 'Iniciador',
  Tejo: 'Iniciador',
  Veto: 'Centinela',
  Viper: 'Controlador',
  Vyse: 'Centinela',
  Waylay: 'Duelista',
  Yoru: 'Duelista',
};

const enrichAgent = (agent: Agent): Agent => ({
  ...agent,
  role: AGENT_ROLES[agent.title] || 'Duelista',
});

const enrichComposition = (comp: Composition): Composition => ({
  ...comp,
  agents: comp.agents.map(enrichAgent),
});

interface UseCompositionsReturn {
  compositions: Composition[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCompositions = (mapId: number | null): UseCompositionsReturn => {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompositions = useCallback(async () => {
    if (mapId === null) {
      setCompositions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = mapId ? `${API_BASE_URL}?map=${mapId}` : API_BASE_URL;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      const enrichedCompositions = data.map(enrichComposition);
      setCompositions(enrichedCompositions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch compositions');
      setCompositions([]);
    } finally {
      setLoading(false);
    }
  }, [mapId]);

  useEffect(() => {
    fetchCompositions();
  }, [fetchCompositions]);

  return { compositions, loading, error, refetch: fetchCompositions };
};