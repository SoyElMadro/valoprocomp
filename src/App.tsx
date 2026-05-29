import { useState, useMemo, lazy, Suspense } from 'react';
import type { Agent } from './types';
import { Header } from './components/Header';
import { NavigationTabs, type TabId } from './components/NavigationTabs';
import { MapSelector } from './components/MapSelector';
import { AgentSelector } from './components/AgentSelector';
import { CompositionPreview } from './components/CompositionPreview';
import { AgentRecommendationDashboard } from './components/AgentRecommendationDashboard';
import { ProCompositions } from './components/ProCompositions';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { AgentsBrowser } from './components/AgentsBrowser';
import { TacticsOverview } from './components/TacticsOverview';
import { useCompositions } from './hooks/useCompositions';
import { scoreCompositions, getTopCompositions, getSynergyRecommendations } from './utils/recommendationEngine';
import { RecommendationExplanation } from './components/RecommendationExplanation';
import { getMapName } from './data/maps';
import './App.css';

const TacticalGuide = lazy(() => import('./components/TacticalGuide').then(m => ({ default: m.TacticalGuide })));

function App() {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('composiciones');

  const { compositions, loading, error, refetch } = useCompositions(
    activeTab === 'composiciones' ? selectedMap : null
  );

  const scoredCompositions = useMemo(() => {
    return scoreCompositions(compositions, selectedAgents);
  }, [compositions, selectedAgents]);

  const topCompositions = useMemo(() => {
    return getTopCompositions(scoredCompositions, 10);
  }, [scoredCompositions]);

  const synergyRecommendations = useMemo(() => {
    if (selectedAgents.length === 0 || selectedAgents.length >= 5) return [];
    return getSynergyRecommendations(compositions, selectedAgents, 5, selectedMap ? getMapName(selectedMap) : undefined);
  }, [compositions, selectedAgents, selectedMap]);

  const handleSelectMap = (mapId: number) => {
    setSelectedMap(mapId);
    setSelectedAgents([]);
  };

  const handleSelectAgent = (agent: Agent) => {
    if (selectedAgents.length < 5 && !selectedAgents.some(
      a => a.title.toLowerCase() === agent.title.toLowerCase()
    )) {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const handleRemoveAgent = (agent: Agent) => {
    setSelectedAgents(selectedAgents.filter(
      a => a.title.toLowerCase() !== agent.title.toLowerCase()
    ));
  };

  const handleClearAll = () => {
    setSelectedAgents([]);
  };

  return (
    <div className="app">
      <div className="app-bg">
        <div className="bg-gradient" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
      </div>

      <Header />

      <main className="main-content">
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'composiciones' && (
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
              <MapSelector
                selectedMap={selectedMap}
                onSelectMap={handleSelectMap}
              />

              {selectedMap && (
                <>
                  <CompositionPreview
                    selectedAgents={selectedAgents}
                    onRemoveAgent={handleRemoveAgent}
                    onClearAll={handleClearAll}
                  />

                  <AgentSelector
                    selectedAgents={selectedAgents}
                    onSelectAgent={handleSelectAgent}
                    onRemoveAgent={handleRemoveAgent}
                  />
                </>
              )}
            </aside>

            <section className="dashboard-main">
              {loading && <LoadingState />}

              {error && <ErrorState message={error} onRetry={refetch} />}

              {!loading && !error && selectedMap && (
                <>
                  <AgentRecommendationDashboard
                    recommendations={synergyRecommendations}
                    selectedAgents={selectedAgents}
                    mapName={getMapName(selectedMap)}
                    compositionsFound={compositions.length}
                  />

                  {selectedAgents.length > 0 && synergyRecommendations.length > 0 && (
                    <RecommendationExplanation recommendations={synergyRecommendations} />
                  )}

                  <ProCompositions
                    compositions={topCompositions}
                    selectedAgents={selectedAgents}
                    mapName={getMapName(selectedMap)}
                  />

                  {selectedAgents.length > 0 && (
                    <Suspense fallback={<LoadingState message="Cargando guía táctica..." />}>
                      <TacticalGuide
                        selectedMap={selectedMap}
                        selectedAgents={selectedAgents}
                      />
                    </Suspense>
                  )}
                </>
              )}

              {!selectedMap && (
                <div className="welcome-message">
                  <div className="welcome-icon">&#9883;</div>
                  <h2>Seleccioná un Mapa</h2>
                  <p>Elegí el mapa y los agentes de tu equipo para encontrar los mejores picks basados en datos reales del competitivo profesional.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'agentes' && (
          <section className="section-panel">
            <AgentsBrowser />
          </section>
        )}

        {activeTab === 'tacticas' && (
          <section className="section-panel">
            <TacticsOverview />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
