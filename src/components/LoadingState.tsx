import './LoadingState.css';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Loading compositions...' }: LoadingStateProps) => {
  return (
    <div className="loading-state">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};