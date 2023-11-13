import './FilterCheckbox.css';

function FilterCheckbox({ isDisabled, isChecked, onChange }) {
  return (
    <label className="checkbox" htmlFor="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        id="checkbox"
        disabled={isDisabled}
        checked={isChecked || ''}
        onChange={onChange}
      />
      <span className="checkbox__slider" />
    </label>
  );
}

export default FilterCheckbox;
