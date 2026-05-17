import { useState } from 'react';
import type { SynergyRecommendation as SynergyRec, Agent } from '../types';
import './AgentRecommendationDashboard.css';

interface Props {
  recommendations: SynergyRec[];
  selectedAgents: Agent[];
  mapName: string;
  compositionsFound: number;
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
    default: return 'tag-default';
  }
};

export const AgentRecommendationDashboard = ({
  recommendations,
  selectedAgents,
  mapName,
  compositionsFound,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const mainRec = recommendations[0];
  const alternatives = recommendations.slice(1);
  const hasPartialMatch = recommendations.some(r => r.isPartialMatch);

  if (selectedAgents.length === 0) {
    return (
      <div className="dashboard-empty">
        <div className="empty-icon">🎯</div>
        <h3>Seleccioná un mapa y al menos 1 agente aliado para recibir recomendaciones.</h3>
        <p>Elegí el mapa y los agentes que ya tiene tu equipo para encontrar los mejores picks.</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="dashboard-empty">
        <div className="empty-icon">📊</div>
        <h3>No hay suficientes datos exactos para esta composición.</h3>
        <p>Mostrando recomendaciones basadas en coincidencias parciales.</p>
      </div>
    );
  }

  return (
    <div className="agent-dashboard">
      <div className="dashboard-summary">
        <div className="summary-item">
          <span className="summary-label">Mapa</span>
          <span className="summary-value">{mapName}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Tu equipo</span>
          <span className="summary-value">{selectedAgents.map(a => a.title).join(', ')}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Composiciones</span>
          <span className="summary-value">{compositionsFound}</span>
        </div>
      </div>

      {hasPartialMatch && (
        <div className="partial-warning">
          ⚠️ No hay composiciones exactas con todos los agentes seleccionados. 
          Mostrando recomendaciones basadas en coincidencias parciales.
        </div>
      )}

      {mainRec && (
        <div className="main-recommendation">
          <div className="main-badge">Best Pick</div>
          <div className="main-content">
            <div className="main-agent">
              <img src={mainRec.agent.thumbnailUrl} alt={mainRec.agent.title} />
            </div>
            <div className="main-info">
              <h2 className="main-name">{mainRec.agent.title}</h2>
              <span className={`main-role ${mainRec.agent.role}`}>{mainRec.agent.role}</span>
              <div className={`main-tag ${getTagClass(mainRec.tag)}`}>{mainRec.tag}</div>
              <div className="main-score">
                <span className="score-num">{mainRec.synergyScore.toFixed(1)}</span>
                <span className="score-label">Score</span>
              </div>
            </div>
          </div>
          <p className="main-explanation">{mainRec.explanation}</p>
        </div>
      )}

      {alternatives.length > 0 && (
        <div className="alternatives-section">
          <h3 className="alternatives-title">Otros picks</h3>
          <div className="alternatives-list">
            {alternatives.map((rec, index) => (
              <div key={rec.agent.title} className={`alt-card ${getTagClass(rec.tag)}`}>
                <div className="alt-rank">#{index + 2}</div>
                <img className="alt-agent-img" src={rec.agent.thumbnailUrl} alt={rec.agent.title} />
                <div className="alt-info">
                  <span className="alt-name">{rec.agent.title}</span>
                  <span className={`alt-role ${rec.agent.role}`}>{rec.agent.role}</span>
                </div>
                <div className="alt-stats">
                  <span className="alt-score">{rec.synergyScore.toFixed(1)}</span>
                  <span className="alt-wr">{rec.adjustedWinRate.toFixed(1)}% WR</span>
                  <span className="alt-times">{rec.timesTogether}x</span>
                </div>
                <div className={`alt-tag ${getTagClass(rec.tag)}`}>{rec.tag}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        className="details-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? '▲ Ocultar detalles' : '▼ Ver detalles'}
      </button>

      {showDetails && (
        <div className="details-section">
          <h3>Detalles estadísticos</h3>
          <div className="details-grid">
            {recommendations.slice(0, 5).map(rec => (
              <div key={rec.agent.title} className="detail-card">
                <div className="detail-header">
                  <img src={rec.agent.thumbnailUrl} alt={rec.agent.title} />
                  <span>{rec.agent.title}</span>
                  <span className={`detail-tag ${getTagClass(rec.tag)}`}>{rec.tag}</span>
                </div>
                <div className="detail-stats">
                  <div className="detail-stat">
                    <span className="label">Score</span>
                    <span className="value">{rec.synergyScore.toFixed(1)}</span>
                  </div>
                  <div className="detail-stat">
                    <span className="label">WR Ajustado</span>
                    <span className="value">{rec.adjustedWinRate.toFixed(1)}%</span>
                  </div>
                  <div className="detail-stat">
                    <span className="label">Veces junto</span>
                    <span className="value">{rec.timesTogether}</span>
                  </div>
                  <div className="detail-stat">
                    <span className="label">Aparición</span>
                    <span className="value">{rec.appearanceRate.toFixed(0)}%</span>
                  </div>
                  <div className="detail-stat">
                    <span className="label">Confianza</span>
                    <span className="value">{rec.sampleScore.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};