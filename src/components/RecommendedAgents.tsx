import type { Agent } from '../types';
import type { RecommendedAgent as RecommendedAgentType } from '../types';
import './RecommendedAgents.css';

interface RecommendedAgentsProps {
  recommendations: RecommendedAgentType[];
  selectedAgents: Agent[];
}

export const RecommendedAgents = ({ recommendations, selectedAgents }: RecommendedAgentsProps) => {
  if (selectedAgents.length === 0) {
    return null;
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommended-agents">
        <h2 className="section-title">
          <span className="title-icon">◆</span>
          Recommended Agents
        </h2>
        <div className="no-results">
          <p>No matching compositions found for your selection.</p>
          <p className="hint">Try selecting different agents or changing the map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommended-agents">
      <h2 className="section-title">
        <span className="title-icon">◆</span>
        Recommended Agents
        <span className="badge">{recommendations.length}</span>
      </h2>
      <div className="recommendations-list">
        {recommendations.map((rec: RecommendedAgentType, index: number) => (
          <div key={`${rec.agent.title}-${index}`} className="recommendation-card">
            <div className="rec-rank">#{index + 1}</div>
            <div className="rec-agent">
              <img
                src={rec.agent.thumbnailUrl}
                alt={rec.agent.title}
                className="rec-agent-image"
              />
              <div className="rec-agent-info">
                <h3 className="rec-agent-name">{rec.agent.title}</h3>
                <div className="match-indicator">
                  <span className="match-percentage">{rec.matchPercentage.toFixed(0)}%</span>
                  <span className="match-label">match</span>
                </div>
              </div>
            </div>
            <div className="rec-stats">
              <div className="stat">
                <span className="stat-value">{rec.composition.winRate}%</span>
                <span className="stat-label">Win Rate</span>
              </div>
              <div className="stat">
                <span className="stat-value">{rec.composition.pickRate}%</span>
                <span className="stat-label">Pick Rate</span>
              </div>
              <div className="stat">
                <span className="stat-value">{rec.composition.timesPlayed}</span>
                <span className="stat-label">Played</span>
              </div>
            </div>
            <div className="rec-composition">
              <h4 className="comp-title">Full Composition</h4>
              <div className="comp-agents">
                {rec.composition.agents.map((agent: Agent, i: number) => (
                  <div
                    key={i}
                    className={`comp-agent ${
                      selectedAgents.some(
                        s => s.title.toLowerCase() === agent.title.toLowerCase()
                      )
                        ? 'included'
                        : ''
                    }`}
                  >
                    <img src={agent.thumbnailUrl} alt={agent.title} />
                    <span>{agent.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};