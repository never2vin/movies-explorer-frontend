import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(true);
  const onToggle = () => setIsChecked(!isChecked);

  return (
    <label className="checkbox" htmlFor="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={onToggle}
      />
      <span className="checkbox__slider" />
    </label>
  );
}

export default FilterCheckbox;
