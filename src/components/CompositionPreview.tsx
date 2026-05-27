import type { Agent } from '../types';
import './CompositionPreview.css';

interface CompositionPreviewProps {
  selectedAgents: Agent[];
  onRemoveAgent: (agent: Agent) => void;
  onClearAll: () => void;
}

export const CompositionPreview = ({
  selectedAgents,
  onRemoveAgent,
  onClearAll,
}: CompositionPreviewProps) => {
  const emptySlots = 5 - selectedAgents.length;

  return (
    <div className="composition-preview notched">
      <div className="preview-header">
        <h2 className="section-title">
          <span className="title-icon">&#9733;</span>
          Your Composition
        </h2>
        {selectedAgents.length > 0 && (
          <button className="clear-btn" onClick={onClearAll}>
            CLEAR ALL
          </button>
        )}
      </div>
      <div className="composition-slots">
        {selectedAgents.map((agent, index) => (
          <div key={index} className="slot filled">
            <button
              className="remove-agent-btn"
              onClick={() => onRemoveAgent(agent)}
              aria-label={`Remove ${agent.title}`}
            >
              &times;
            </button>
            <img src={agent.thumbnailUrl} alt={agent.title} className="slot-agent-image" />
            <span className="slot-agent-name">{agent.title}</span>
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div key={`empty-${index}`} className="slot empty">
            <div className="empty-placeholder">
              <span className="plus-icon">+</span>
            </div>
            <span className="slot-label">EMPTY</span>
          </div>
        ))}
      </div>
    </div>
  );
};
