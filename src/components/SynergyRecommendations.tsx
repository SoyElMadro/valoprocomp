import type { SynergyRecommendation as SynergyRec } from '../types';
import './SynergyRecommendations.css';

interface SynergyRecommendationsProps {
  recommendations: SynergyRec[];
  selectedCount: number;
}

const getTagClass = (tag: string): string => {
  switch (tag) {
    case 'Mejor sinergia': return 'tag-mejor';
    case 'Pick meta': return 'tag-meta';
    case 'Pick fuerte': return 'tag-fuerte';
    case 'Pick situacional': return 'tag-situacional';
    case 'Pick recomendable': return 'tag-recomendable';
    case 'Winrate inflado por poca muestra': return 'tag-inflado';
    case 'Dato limitado': return 'tag-limitado';
    case 'Prometedor, poca muestra': return 'tag-prometedor';
    default: return '';
  }
};

export const SynergyRecommendations = ({ recommendations, selectedCount }: SynergyRecommendationsProps) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="synergy-recommendations">
      <h2 className="section-title">
        <span className="title-icon">⚡</span>
        Mejores Picks para tu Equipo
        <span className="synergy-hint">Basado en {selectedCount} agente{selectedCount > 1 ? 's' : ''} seleccionado{selectedCount > 1 ? 's' : ''}</span>
      </h2>

      <div className="synergy-grid">
        {recommendations.map((rec, index) => (
          <div key={rec.agent.title} className={`synergy-card ${getTagClass(rec.tag)}`}>
            <div className="synergy-rank">{index + 1}</div>
            <div className="synergy-agent">
              <img src={rec.agent.thumbnailUrl} alt={rec.agent.title} />
            </div>
            <div className="synergy-info">
              <h3 className="synergy-name">{rec.agent.title}</h3>
              <span className={`synergy-role ${rec.agent.role}`}>{rec.agent.role}</span>
            </div>
            <div className="synergy-stats">
              <div className="synergy-score">
                <span className="score-value">{rec.synergyScore.toFixed(1)}</span>
                <span className="score-label">Score</span>
              </div>
              <div className="synergy-stat">
                <span className="stat-value">{rec.adjustedWinRate.toFixed(1)}%</span>
                <span className="stat-label">WR Ajust</span>
              </div>
              <div className="synergy-stat">
                <span className="stat-value">{rec.timesTogether}</span>
                <span className="stat-label">Veces</span>
              </div>
              <div className="synergy-stat">
                <span className="stat-value">{rec.appearanceRate.toFixed(0)}%</span>
                <span className="stat-label">Aparición</span>
              </div>
              <div className="synergy-stat">
                <span className="stat-value">{rec.sampleScore.toFixed(0)}%</span>
                <span className="stat-label">Confianza</span>
              </div>
            </div>
            <div className={`synergy-tag ${getTagClass(rec.tag)}`}>{rec.tag}</div>
            <p className="synergy-explanation">{rec.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};