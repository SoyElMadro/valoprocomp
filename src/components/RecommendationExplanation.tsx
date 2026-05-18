import { useState } from 'react';
import type { SynergyRecommendation } from '../types';
import './RecommendationExplanation.css';

interface RecommendationExplanationProps {
  recommendations: SynergyRecommendation[];
}

interface TacticalRec extends SynergyRecommendation {
  candidateScore?: {
    pros: string[];
    cons: string[];
    finalScore: number;
    proDataScore: number;
    compositionFitScore: number;
    roleNeedScore: number;
    mapIdentityScore: number;
    redundancyPenalty: number;
  };
  whyThisPick?: string;
  rejectedAlternatives?: { agentName: string; reason: string }[];
  confidence?: 'high' | 'medium' | 'low';
  matchType?: 'exact' | 'partial';
}

export const RecommendationExplanation = ({ recommendations }: RecommendationExplanationProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (recommendations.length === 0) return null;

  const tacticalRecs = recommendations as TacticalRec[];

  return (
    <div className="recommendation-explanation">
      <h2 className="section-title">
        <span className="title-icon">💡</span>
        ¿Por qué este pick?
      </h2>
      <p className="section-subtitle">
        Análisis táctico de las recomendaciones basadas en la estructura de tu equipo
      </p>

      <div className="explanation-cards">
        {tacticalRecs.map((rec, index) => {
          const isExpanded = expandedCard === rec.agent.title;

          return (
            <div key={rec.agent.title} className="explanation-card">
              <div
                className="card-header"
                onClick={() => setExpandedCard(isExpanded ? null : rec.agent.title)}
              >
                <div className="header-main">
                  <span className="card-rank">#{index + 1}</span>
                  <img src={rec.agent.thumbnailUrl} alt={rec.agent.title} className="card-agent-img" />
                  <div className="card-agent-info">
                    <h3>{rec.agent.title}</h3>
                    <span className={`card-role ${rec.agent.role}`}>{rec.agent.role}</span>
                  </div>
                </div>
                <div className="header-score">
                  {rec.candidateScore && (
                    <span className="final-score">{rec.candidateScore.finalScore.toFixed(1)}</span>
                  )}
                  <span className={`confidence-badge ${rec.confidence || 'medium'}`}>
                    {rec.confidence === 'high' ? 'Alta confianza' :
                     rec.confidence === 'medium' ? 'Confianza media' : 'Baja confianza'}
                  </span>
                  {rec.matchType && (
                    <span className={`match-type ${rec.matchType}`}>
                      {rec.matchType === 'exact' ? 'Coincidencia exacta' : 'Coincidencia parcial'}
                    </span>
                  )}
                </div>
              </div>

              {isExpanded && rec.whyThisPick && (
                <div className="why-this-pick">
                  <h4>Recomendación</h4>
                  <p>{rec.whyThisPick}</p>
                </div>
              )}

              {isExpanded && rec.candidateScore && (
                <div className="score-breakdown">
                  <h4>Desglose de Puntuación</h4>
                  <div className="breakdown-bars">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Datos Pro (45%)</span>
                      <div className="breakdown-bar">
                        <div
                          className="bar-fill pro-data"
                          style={{ width: `${rec.candidateScore.proDataScore}%` }}
                        />
                      </div>
                      <span className="breakdown-value">{rec.candidateScore.proDataScore.toFixed(1)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Fit Compositivo (30%)</span>
                      <div className="breakdown-bar">
                        <div
                          className="bar-fill composition-fit"
                          style={{ width: `${rec.candidateScore.compositionFitScore}%` }}
                        />
                      </div>
                      <span className="breakdown-value">{rec.candidateScore.compositionFitScore.toFixed(1)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Necesidad de Rol (15%)</span>
                      <div className="breakdown-bar">
                        <div
                          className="bar-fill role-need"
                          style={{ width: `${rec.candidateScore.roleNeedScore}%` }}
                        />
                      </div>
                      <span className="breakdown-value">{rec.candidateScore.roleNeedScore.toFixed(1)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Identidad de Mapa (10%)</span>
                      <div className="breakdown-bar">
                        <div
                          className="bar-fill map-identity"
                          style={{ width: `${rec.candidateScore.mapIdentityScore}%` }}
                        />
                      </div>
                      <span className="breakdown-value">{rec.candidateScore.mapIdentityScore.toFixed(1)}</span>
                    </div>
                    {rec.candidateScore.redundancyPenalty > 0 && (
                      <div className="breakdown-item penalty">
                        <span className="breakdown-label">Penalización por redundancia</span>
                        <div className="breakdown-bar">
                          <div
                            className="bar-fill penalty-bar"
                            style={{ width: `${Math.min(rec.candidateScore.redundancyPenalty, 30)}%` }}
                          />
                        </div>
                        <span className="breakdown-value">-{rec.candidateScore.redundancyPenalty.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isExpanded && (
                <div className="pros-cons">
                  {rec.candidateScore?.pros && rec.candidateScore.pros.length > 0 && (
                    <div className="pros">
                      <h4>✓ Pros</h4>
                      <ul>
                        {rec.candidateScore.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {rec.candidateScore?.cons && rec.candidateScore.cons.length > 0 && (
                    <div className="cons">
                      <h4>✗ Contras</h4>
                      <ul>
                        {rec.candidateScore.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {isExpanded && rec.rejectedAlternatives && rec.rejectedAlternatives.length > 0 && (
                <div className="rejected-alternatives">
                  <h4>Alternativas rechazadas</h4>
                  <ul>
                    {rec.rejectedAlternatives.map((alt, i) => (
                      <li key={i}>
                        <span className="alt-name">{alt.agentName}</span>
                        <span className="alt-reason">- {alt.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card-footer">
                <button
                  className="expand-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(isExpanded ? null : rec.agent.title);
                  }}
                >
                  {isExpanded ? '▲ Menos detalles' : '▼ Más detalles'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};