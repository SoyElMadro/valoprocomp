import './Header.css';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export const Header = ({ theme, onThemeToggle }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">V</span>
          <div className="logo-text">
            <h1>ValoProComp</h1>
            <p>Composition Builder & Agent Recommender</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <div className="header-badge">
            <span className="badge-text">Powered by THE SPIKE</span>
          </div>
        </div>
      </div>
    </header>
  );
};