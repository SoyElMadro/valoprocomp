import { useState } from 'react';
import type { Agent, AgentRole } from '../types';
import { agents } from '../data/agents';
import './AgentSelector.css';

interface AgentSelectorProps {
  selectedAgents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onRemoveAgent: (agent: Agent) => void;
}

const ROLES: AgentRole[] = ['Duelista', 'Controlador', 'Iniciador', 'Centinela'];

const ROLE_COLORS: Record<AgentRole, string> = {
  'Duelista': 'role-duelist',
  'Controlador': 'role-controller',
  'Iniciador': 'role-initiator',
  'Centinela': 'role-sentinel',
};

export const AgentSelector = ({
  selectedAgents,
  onSelectAgent,
  onRemoveAgent,
}: AgentSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<AgentRole | null>(null);

  const selectedNames = selectedAgents.map(a => a.title.toLowerCase());

  const filteredAgents = selectedRole
    ? agents.filter(a => a.role === selectedRole)
    : agents;

  return (
    <div className="agent-selector notched">
      <h2 className="section-title">
        <span className="title-icon">&#9670;</span>
        Teammate Agents
        <span className="agent-count">{selectedAgents.length}/5</span>
      </h2>
      <div className="role-filters">
        <button
          className={`role-filter-btn ${selectedRole === null ? 'active' : ''}`}
          onClick={() => setSelectedRole(null)}
        >
          TODOS
        </button>
        {ROLES.map(role => (
          <button
            key={role}
            className={`role-filter-btn ${selectedRole === role ? 'active' : ''} ${ROLE_COLORS[role]}`}
            onClick={() => setSelectedRole(role)}
          >
            {role.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="agents-grid">
        {filteredAgents.map((agent: Agent) => {
          const isSelected = selectedNames.includes(agent.title.toLowerCase());
          return (
            <button
              key={agent.title}
              className={`agent-card ${isSelected ? 'selected' : ''}`}
              onClick={() => isSelected ? onRemoveAgent(agent) : onSelectAgent(agent)}
            >
              <img
                src={agent.thumbnailUrl}
                alt={agent.title}
                className="agent-image"
                loading="lazy"
              />
              <span className="agent-name">{agent.title}</span>
              {isSelected && (
                <div className="selected-overlay">
                  <span className="check-icon">&#10003;</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
