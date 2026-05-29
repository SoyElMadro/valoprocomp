import './NavigationTabs.css';

export type TabId = 'composiciones' | 'agentes' | 'tacticas';

interface NavigationTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: string; description: string }[] = [
  {
    id: 'composiciones',
    label: 'Composiciones',
    icon: '◇',
    description: 'Recomendador de agentes por mapa y sinergia'
  },
  {
    id: 'agentes',
    label: 'Agentes',
    icon: '◆',
    description: 'Habilidades, roles y consejos de cada agente'
  },
  {
    id: 'tacticas',
    label: 'Tácticas',
    icon: '◈',
    description: 'Estrategias, counters y guías por mapa'
  }
];

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <nav className="nav-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'nav-tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-tab-icon">{tab.icon}</span>
          <div className="nav-tab-content">
            <span className="nav-tab-label">{tab.label}</span>
            <span className="nav-tab-desc">{tab.description}</span>
          </div>
        </button>
      ))}
    </nav>
  );
};
