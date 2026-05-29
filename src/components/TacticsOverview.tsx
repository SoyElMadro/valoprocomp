import { useState } from 'react';
import {
  generalTacticCounters,
  attackStrats,
  defenseStrats,
  mapSpecificTactics,
  classCounters,
  compositionTips
} from '../data/tacticsGuide';
import './TacticsOverview.css';

type TacticsTab = 'generales' | 'ataque' | 'defensa' | 'mapas' | 'counters' | 'compos';

const tabs: { id: TacticsTab; label: string; icon: string }[] = [
  { id: 'generales', label: 'Tácticas Generales', icon: '◈' },
  { id: 'ataque', label: 'Estrategias de Ataque', icon: '▲' },
  { id: 'defensa', label: 'Estrategias de Defensa', icon: '▼' },
  { id: 'mapas', label: 'Por Mapa y Sitio', icon: '◆' },
  { id: 'counters', label: 'Counters por Clase', icon: '◇' },
  { id: 'compos', label: 'Composiciones', icon: '⬡' }
];

export const TacticsOverview = () => {
  const [tab, setTab] = useState<TacticsTab>('generales');
  const [expandedTactic, setExpandedTactic] = useState<string | null>(null);

  return (
    <div className="tactics-overview">
      <h2 className="section-title">
        <span className="title-icon">◈</span>
        Guía de Tácticas y Estrategias
      </h2>

      <div className="tactics-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tactics-tab ${tab === t.id ? 'tactics-tab--active' : ''}`}
            onClick={() => { setTab(t.id); setExpandedTactic(null); }}
          >
            <span className="tactics-tab-icon">{t.icon}</span>
            <span className="tactics-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="tactics-content">
        {/* Tácticas Generales y Counters */}
        {tab === 'generales' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              Cada táctica tiene su counter. Acá tenés las estrategias más comunes en VALORANT, cómo ejecutarlas y cómo contrarrestarlas. Conocer los counters es tan importante como saber ejecutar la táctica.
            </p>
            <div className="tactics-cards">
              {generalTacticCounters.map((gt) => (
                <div
                  key={gt.tactica}
                  className={`tactic-card ${expandedTactic === gt.tactica ? 'tactic-card--expanded' : ''}`}
                >
                  <button
                    className="tactic-card-header"
                    onClick={() => setExpandedTactic(expandedTactic === gt.tactica ? null : gt.tactica)}
                  >
                    <h3 className="tactic-name">{gt.tactica}</h3>
                    <span className="tactic-expand">{expandedTactic === gt.tactica ? '▲' : '▼'}</span>
                  </button>
                  <p className="tactic-desc">{gt.descripcion}</p>

                  {expandedTactic === gt.tactica && (
                    <div className="tactic-counters">
                      <h4 className="tactic-counters-title">Cómo contrarrestarlo</h4>
                      {gt.counters.map((c, i) => (
                        <div key={i} className="counter-item">
                          <div className="counter-header">
                            <span className="counter-variant">{c.tactica}</span>
                          </div>
                          <p className="counter-response">{c.counter}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estrategias de Ataque */}
        {tab === 'ataque' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              Las estrategias de ataque definen cómo tu equipo va a tomar el sitio. Elegí la correcta según tu composición, el mapa y el estilo del enemigo.
            </p>
            <div className="strats-grid">
              {attackStrats.map((strat) => (
                <div key={strat.id} className="strat-card">
                  <div className="strat-card-header">
                    <h3 className="strat-name">{strat.nombre}</h3>
                    <span className={`strat-diff strat-diff--${strat.dificultad.toLowerCase()}`}>
                      {strat.dificultad}
                    </span>
                  </div>
                  <p className="strat-desc">{strat.descripcion}</p>

                  <div className="strat-details">
                    <div className="strat-block">
                      <h4>Cómo ejecutarla</h4>
                      <ol className="strat-steps">
                        {strat.comoEjecutarla.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="strat-block">
                      <h4>Cuándo usarla</h4>
                      <ul className="strat-when">
                        {strat.cuandoUsarla.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="strat-block">
                      <h4>Counters enemigos</h4>
                      <ul className="strat-counters">
                        {strat.counters.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="strat-block">
                      <h4>Agentes recomendados</h4>
                      <div className="strat-agents">
                        {strat.agentesRecomendados.map((a) => (
                          <span key={a} className="strat-agent-badge">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estrategias de Defensa */}
        {tab === 'defensa' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              La defensa no es solo esperar. Elegí entre jugar agresivo, hacer stack, o preparar un retake según la situación y tu composición.
            </p>
            <div className="strats-grid">
              {defenseStrats.map((strat) => (
                <div key={strat.id} className="strat-card">
                  <div className="strat-card-header">
                    <h3 className="strat-name">{strat.nombre}</h3>
                    <span className={`strat-diff strat-diff--${strat.dificultad.toLowerCase()}`}>
                      {strat.dificultad}
                    </span>
                  </div>
                  <p className="strat-desc">{strat.descripcion}</p>

                  <div className="strat-details">
                    <div className="strat-block">
                      <h4>Cómo ejecutarla</h4>
                      <ol className="strat-steps">
                        {strat.comoEjecutarla.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="strat-block">
                      <h4>Cuándo usarla</h4>
                      <ul className="strat-when">
                        {strat.cuandoUsarla.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="strat-block">
                      <h4>Counters enemigos</h4>
                      <ul className="strat-counters">
                        {strat.counters.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="strat-block">
                      <h4>Agentes recomendados</h4>
                      <div className="strat-agents">
                        {strat.agentesRecomendados.map((a) => (
                          <span key={a} className="strat-agent-badge">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tácticas por Mapa */}
        {tab === 'mapas' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              Cada mapa tiene puntos clave y estrategias específicas. Estas son tácticas probadas para los mapas del pool competitivo, con sus respectivos counters.
            </p>
            <div className="map-tactics-grid">
              {mapSpecificTactics.map((mt, i) => (
                <div key={i} className="map-tactic-card">
                  <div className="map-tactic-header">
                    <span className="map-tactic-map">{mt.mapa}</span>
                    <span className={`map-tactic-side map-tactic-side--${mt.lado.toLowerCase()}`}>
                      {mt.lado}
                    </span>
                    <span className="map-tactic-site">Sitio {mt.sitio}</span>
                  </div>
                  <h3 className="map-tactic-name">{mt.tactica}</h3>
                  <p className="map-tactic-desc">{mt.descripcion}</p>

                  <div className="map-tactic-steps">
                    <h4>Ejecución paso a paso</h4>
                    <ol>
                      {mt.pasos.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="map-tactic-counters">
                    <h4>Counters</h4>
                    <ul>
                      {mt.counters.map((c, j) => (
                        <li key={j}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Counters por Clase */}
        {tab === 'counters' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              Cada clase de agente tiene fortalezas y debilidades naturales. Saber esto te permite elegir mejor tus duelos y adaptar tu composición al equipo enemigo.
            </p>
            <div className="class-counters-grid">
              {classCounters.map((cc) => (
                <div key={cc.clase} className="class-counter-card">
                  <h3 className="class-counter-name">{cc.clase}</h3>
                  <div className="class-counter-rows">
                    <div className="class-counter-row">
                      <span className="cc-label cc-label--strength">Fuerte contra</span>
                      <span className="cc-value">{cc.fortalezaContra}</span>
                    </div>
                    <div className="class-counter-row">
                      <span className="cc-label cc-label--weak">Débil contra</span>
                      <span className="cc-value">{cc.debilidadContra}</span>
                    </div>
                    <div className="class-counter-row">
                      <span className="cc-label cc-label--how">Cómo contrarrestar</span>
                      <span className="cc-value">{cc.comoContrarrestar}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Composiciones */}
        {tab === 'compos' && (
          <div className="tactics-section">
            <p className="tactics-intro">
              La composición de tu equipo define cómo podés jugar. Cada combinación de roles tiene un estilo distinto. Elegí según tu mapa y el estilo de tu equipo.
            </p>
            <div className="comp-tips-grid">
              {compositionTips.map((ct, i) => (
                <div key={i} className="comp-tip-card">
                  <h3 className="comp-tip-name">{ct.composicion}</h3>
                  <p className="comp-tip-desc">{ct.descripcion}</p>
                  <div className="comp-tip-pros-cons">
                    <div className="comp-tip-pro">
                      <span className="comp-tip-label comp-tip-label--pro">Fortaleza</span>
                      <p>{ct.fortaleza}</p>
                    </div>
                    <div className="comp-tip-con">
                      <span className="comp-tip-label comp-tip-label--con">Debilidad</span>
                      <p>{ct.debilidad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
