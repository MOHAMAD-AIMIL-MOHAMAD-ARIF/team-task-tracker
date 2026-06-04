import "./LoadingState.css";

type LoadingStateProps = {
  message?: string;
};

function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="ui-loading-state" role="status" aria-live="polite">
      <span className="ui-loading-state__spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export default LoadingState;