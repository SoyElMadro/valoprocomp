import { useState, useMemo } from 'react';
import type { AgentClassName, AgentProfile, Difficulty } from '../data/agentAbilities';
import agentAbilities from '../data/agentAbilities';
import './AgentsBrowser.css';

const roleLabels: Record<AgentClassName, string> = {
  'Duelista': 'Duelistas',
  'Controlador': 'Controladores',
  'Iniciador': 'Iniciadores',
  'Centinela': 'Centinelas'
};

const difficultyLabels: Record<Difficulty, string> = {
  'Fácil': 'Fácil',
  'Media': 'Media',
  'Difícil': 'Difícil'
};

const roleColors: Record<AgentClassName, string> = {
  'Duelista': 'var(--role-duelist)',
  'Iniciador': 'var(--role-initiator)',
  'Controlador': 'var(--role-controller)',
  'Centinela': 'var(--role-sentinel)'
};

export const AgentsBrowser = () => {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<AgentClassName | 'Todos'>('Todos');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'Todas'>('Todas');
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);

  const filteredAgents = useMemo(() => {
    return agentAbilities.filter((agent) => {
      const matchesSearch = search.length === 0 ||
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.role.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase());
      const matchesRole = filterRole === 'Todos' || agent.role === filterRole;
      const matchesDifficulty = filterDifficulty === 'Todas' || agent.difficulty === filterDifficulty;
      return matchesSearch && matchesRole && matchesDifficulty;
    });
  }, [search, filterRole, filterDifficulty]);

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: agentAbilities.length };
    agentAbilities.forEach((a) => {
      counts[a.role] = (counts[a.role] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="agents-browser">
      <div className="agents-browser-header">
        <h2 className="section-title">
          <span className="title-icon">◆</span>
          Agentes y Habilidades
        </h2>
        <div className="ab-filters">
          <div className="ab-search">
            <span className="ab-search-icon">&#128269;</span>
            <input
              type="text"
              placeholder="Buscar agente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ab-search-input"
            />
          </div>

          <div className="ab-filter-group">
            <div className="ab-filter-chips">
              {(['Todos', 'Duelista', 'Iniciador', 'Controlador', 'Centinela'] as const).map((role) => (
                <button
                  key={role}
                  className={`ab-filter-chip ${filterRole === role ? 'ab-filter-chip--active' : ''}`}
                  data-role={role !== 'Todos' ? role.toLowerCase() : undefined}
                  onClick={() => {
                    setFilterRole(role);
                    setSelectedAgent(null);
                  }}
                >
                  {role === 'Todos' ? 'Todos' : roleLabels[role as AgentClassName]}
                  <span className="ab-chip-count">{roleCounts[role] || 0}</span>
                </button>
              ))}
            </div>

            <div className="ab-filter-chips ab-diff-chips">
              {(['Todas', 'Fácil', 'Media', 'Difícil'] as const).map((diff) => (
                <button
                  key={diff}
                  className={`ab-filter-chip ab-filter-chip--diff ${filterDifficulty === diff ? 'ab-filter-chip--active' : ''}`}
                  onClick={() => setFilterDifficulty(diff)}
                >
                  {diff === 'Todas' ? 'Todas las dificultades' : difficultyLabels[diff]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ab-layout">
        <div className="ab-grid">
          {filteredAgents.length === 0 && (
            <div className="ab-empty">
              <span className="ab-empty-icon">&#9883;</span>
              <p>No se encontraron agentes con esos filtros.</p>
            </div>
          )}

          {filteredAgents.map((agent) => (
            <button
              key={agent.id}
              className={`ab-card ${selectedAgent?.id === agent.id ? 'ab-card--selected' : ''}`}
              onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
            >
              <div className="ab-card-bg" />
              <div className="ab-card-header">
                <span
                  className="ab-card-role"
                  style={{ color: roleColors[agent.role] }}
                >
                  {agent.role}
                </span>
                <span className={`ab-card-diff ab-card-diff--${agent.difficulty.toLowerCase()}`}>
                  {agent.difficulty}
                </span>
              </div>
              <div className="ab-card-name">{agent.name}</div>
              <p className="ab-card-desc">{agent.trait}</p>
              <div className="ab-card-footer">
                <span className="ab-card-abilities-count">
                  {agent.abilities.length} habilidades
                </span>
                <span className="ab-card-expand">
                  {selectedAgent?.id === agent.id ? '▲' : '▼'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {selectedAgent && (
          <div className="ab-detail">
            <div className="ab-detail-header">
              <button
                className="ab-detail-close"
                onClick={() => setSelectedAgent(null)}
              >
                ✕
              </button>
              <div className="ab-detail-title-row">
                <h2 className="ab-detail-name">{selectedAgent.name}</h2>
                <span
                  className="ab-detail-role-badge"
                  style={{
                    background: roleColors[selectedAgent.role],
                    color: '#0F1923'
                  }}
                >
                  {selectedAgent.role}
                </span>
                <span className={`ab-detail-diff-badge ab-detail-diff-badge--${selectedAgent.difficulty.toLowerCase()}`}>
                  {selectedAgent.difficulty}
                </span>
              </div>
              <p className="ab-detail-description">{selectedAgent.description}</p>
            </div>

            <div className="ab-detail-section">
              <h3 className="ab-detail-section-title">Consejos de Juego</h3>
              <ul className="ab-detail-tips">
                {selectedAgent.playstyleTips.map((tip, i) => (
                  <li key={i} className="ab-detail-tip">{tip}</li>
                ))}
              </ul>
            </div>

            <div className="ab-detail-section">
              <h3 className="ab-detail-section-title">
                Habilidades ({selectedAgent.abilities.length})
              </h3>
              <div className="ab-abilities-list">
                {selectedAgent.abilities.map((ability, i) => (
                  <div
                    key={i}
                    className={`ab-ability ab-ability--${ability.type.toLowerCase()}`}
                  >
                    <div className="ab-ability-header">
                      <div className="ab-ability-info">
                        <span className="ab-ability-name">{ability.name}</span>
                        <span className="ab-ability-key">{ability.key}</span>
                      </div>
                      <span className={`ab-ability-type ab-ability-type--${ability.type.toLowerCase()}`}>
                        {ability.type}
                      </span>
                    </div>
                    <p className="ab-ability-desc">{ability.description}</p>
                    <div className="ab-ability-meta">
                      {ability.cost !== undefined && (
                        <span className="ab-ability-cost">{ability.cost} créditos</span>
                      )}
                      {ability.charges !== undefined && (
                        <span className="ab-ability-charges">{ability.charges} carga{ability.charges > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-detail-section">
              <h3 className="ab-detail-section-title">Mejores Mapas</h3>
              <div className="ab-detail-maps">
                {selectedAgent.bestMaps.map((map) => (
                  <span key={map} className="ab-map-badge ab-map-badge--best">{map}</span>
                ))}
                <span className="ab-map-separator">|</span>
                <span className="ab-map-label">Evitar: </span>
                {selectedAgent.weakMaps.map((map) => (
                  <span key={map} className="ab-map-badge ab-map-badge--weak">{map}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
