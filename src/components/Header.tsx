import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-mark">
            <span className="logo-v">V</span>
            <div className="logo-crosshair" />
          </div>
          <div className="logo-text">
            <h1>ValoProComp</h1>
            <p>Composition Builder & Agent Recommender</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="header-badge">
            <span className="badge-dot" />
            <span className="badge-text">Powered by THE SPIKE</span>
          </div>
        </div>
      </div>
      <div className="header-border" />
    </header>
  );
};
