import "./ErrorMessage.css";

type ErrorMessageVariant = "block" | "inline";

type ErrorMessageProps = {
  message: string;
  variant?: ErrorMessageVariant;
};

function ErrorMessage({ message, variant = "block" }: ErrorMessageProps) {
  return (
    <div
      className={`ui-error-message ui-error-message--${variant}`}
      role="alert"
    >
      {message}
    </div>
  );
}

export default ErrorMessage;