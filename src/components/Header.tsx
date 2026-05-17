import './Header.css';

export const Header = () => {
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
        <div className="header-badge">
          <span className="badge-text">Powered by THE SPIKE</span>
        </div>
      </div>
    </header>
  );
};