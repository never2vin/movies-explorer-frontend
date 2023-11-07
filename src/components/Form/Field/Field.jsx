import './Field.css';

function Field({ formType, id, label, error, ...props }) {
  return (
    <div className={`field field-${formType}`}>
      <label className={`field-${formType}__label`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`page__input field__input field-${formType}__input`}
        id={id}
        name={id}
        placeholder={label}
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
