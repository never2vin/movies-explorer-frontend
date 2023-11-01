import './Field.css';

function Field({ formType, id, label, error, ...props }) {
  return (
    <div className={`field__${formType}`}>
      <label className={`field__${formType}-label`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`page__input field__input field__${formType}-input`}
        id={id}
        name={id}
        {...props}
        required
        aria-describedby={`${id}-error`}
        aria-invalid="true"
      />
      <span id={`${id}-error`} className="field__error">
        {error}
      </span>
    </div>
  );
}

export default Field;
