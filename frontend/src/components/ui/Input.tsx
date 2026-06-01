import type { ChangeEventHandler } from "react";
import "./Input.css";

type InputProps = {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: string;
};

function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  multiline = false,
  rows = 3,
  error,
}: InputProps) {
  return (
    <div className="ui-input">
      <label htmlFor={id} className="ui-input__label">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          className="ui-input__control ui-input__control--textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
        />
      ) : (
        <input
          id={id}
          className="ui-input__control"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}

      {error ? <p className="ui-input__error">{error}</p> : null}
    </div>
  );
}

export default Input;