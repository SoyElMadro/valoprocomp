import type { Agent } from '../types';
import type { ScoredComposition } from '../types';
import './ProCompositions.css';

interface ProCompositionsProps {
  compositions: ScoredComposition[];
  selectedAgents: Agent[];
  mapName: string;
}

const getTagClass = (tag: string): string => {
  switch (tag) {
    case 'Meta': return 'tag-meta';
    case 'Confiable': return 'tag-confiable';
    case 'Fuerte pero situacional': return 'tag-fuerte';
    case 'Riesgosa por poca muestra': return 'tag-risk';
    case 'Popular pero débil': return 'tag-popular-debil';
    case 'Débil': return 'tag-debil';
    default: return '';
  }
};

const PodiumCard = ({ scored, selectedAgents }: { scored: ScoredComposition; selectedAgents: Agent[] }) => (
  <div className={`podium-card ${getTagClass(scored.tag)}`}>
    <div className="podium-agents">
      {scored.composition.agents.map((agent: Agent, i: number) => {
        const isMatched = selectedAgents.some(s => s.title.toLowerCase() === agent.title.toLowerCase());
        return (
          <div key={i} className={`podium-agent ${isMatched ? 'matched' : ''}`}>
            <img src={agent.thumbnailUrl} alt={agent.title} />
          </div>
        );
      })}
    </div>
    <div className="podium-info">
      <div className="podium-score">{scored.score.toFixed(1)}</div>
      <div className="podium-stats">
        <span className="podium-win">{scored.adjustedWinRate.toFixed(1)}% WR</span>
        <span className="podium-pick">{scored.composition.pickRate}% PR</span>
        <span className="podium-games">{scored.composition.timesPlayed} games</span>
      </div>
      <div className={`podium-tag ${getTagClass(scored.tag)}`}>{scored.tag}</div>
    </div>
  </div>
);

export const ProCompositions = ({ compositions, selectedAgents, mapName }: ProCompositionsProps) => {
  if (compositions.length === 0) {
    return null;
  }

  const top3 = compositions.slice(0, 3);
  const rest = compositions.slice(3);

  return (
    <div className="pro-compositions">
      <h2 className="section-title">
        <span className="title-icon">★</span>
        Top Pro Compositions
        <span className="map-badge">{mapName}</span>
      </h2>

      <div className="podium">
        {top3[1] && (
          <div className="podium-place second">
            <PodiumCard scored={top3[1]} selectedAgents={selectedAgents} />
            <div className="podium-bar">2</div>
          </div>
        )}
        {top3[0] && (
          <div className="podium-place first">
            <PodiumCard scored={top3[0]} selectedAgents={selectedAgents} />
            <div className="podium-bar">1</div>
          </div>
        )}
        {top3[2] && (
          <div className="podium-place third">
            <PodiumCard scored={top3[2]} selectedAgents={selectedAgents} />
            <div className="podium-bar">3</div>
          </div>
        )}
      </div>

      <div className="compositions-list">
        {rest.map((scored: ScoredComposition, index: number) => (
          <div key={index + 3} className="composition-item">
            <div className="comp-rank">
              <span className="rank-number">{index + 4}</span>
            </div>
            <div className="comp-agents-display">
              {scored.composition.agents.map((agent: Agent, i: number) => {
                const isMatched = selectedAgents.some(
                  s => s.title.toLowerCase() === agent.title.toLowerCase()
                );
                return (
                  <div key={i} className={`comp-agent-display ${isMatched ? 'matched' : ''}`}>
                    <img src={agent.thumbnailUrl} alt={agent.title} />
                  </div>
                );
              })}
            </div>
            <div className="comp-info">
              <div className="comp-score">
                <span className="score-value">{scored.score.toFixed(1)}</span>
                <span className="score-label">Score</span>
              </div>
              <div className="comp-stats">
                <div className="comp-stat win-rate">
                  <span className="stat-value">{scored.adjustedWinRate.toFixed(1)}%</span>
                  <span className="stat-label">Adj WR</span>
                </div>
                <div className="comp-stat pick-rate">
                  <span className="stat-value">{scored.composition.pickRate}%</span>
                  <span className="stat-label">PR</span>
                </div>
                <div className="comp-stat times-played">
                  <span className="stat-value">{scored.composition.timesPlayed}</span>
                  <span className="stat-label">Games</span>
                </div>
              </div>
              <div className={`comp-tag ${getTagClass(scored.tag)}`}>{scored.tag}</div>
            </div>
            {scored.matchPercentage > 0 && (
              <div className="match-badge">
                {scored.matchPercentage === 100 ? '✓ Perfect' : `${scored.matchPercentage.toFixed(0)}% Match`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};