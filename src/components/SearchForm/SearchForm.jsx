import { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchValue(value);
    setIsInputValid(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue === '') return setIsInputValid(false);

    console.log(searchValue);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search__form" noValidate>
        <div className="search__field">
          <input
            className="page__input search__input"
            type="search"
            id="search"
            name="search"
            value={searchValue || ''}
            onChange={handleChange}
            placeholder="Фильм"
            autoFocus
            aria-describedby="search-error"
            aria-invalid="true"
          />
          <span
            id="search-error"
            className={`search__error ${
              !isInputValid ? 'search__error_visible' : ''
            }`}
          >
            Введите ключевое слово
          </span>
        </div>
        <button
          type="submit"
          className="page__button search__button"
          aria-describedby="description"
        />
      </form>
      <div className="search__filter">
        <FilterCheckbox />
        <p className="search__filter-text">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
