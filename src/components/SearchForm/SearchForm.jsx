import { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const input = e.target;

    setSearchValue(input.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue === '') return;

    console.log(searchValue);
  };

  return (
    <section className="search" aria-label="Поиск фильмов">
      <form onSubmit={handleSubmit} className="search__form" noValidate>
        <div className="search__row">
          <label className="search__label">
            <input
              className="page__input search__input"
              type="search"
              id="search"
              name="search"
              value={searchValue || ''}
              onChange={handleChange}
              placeholder="Фильм"
              required
              autoFocus
              aria-describedby="search-error"
              aria-invalid="true"
            />
            <span id="search-error" className="search__error">
              Нужно ввести ключевое слово
            </span>
          </label>
          <button type="submit" className="page__button search__button" />
        </div>
        <div className="search__filter">
          <FilterCheckbox />
          <p className="search__filter-text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
