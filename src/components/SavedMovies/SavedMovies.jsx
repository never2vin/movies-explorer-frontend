import { useContext, useEffect } from 'react';

import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import { AppContext } from 'contexts/AppContext';
import { filter } from 'utils/filter';

import './SavedMovies.css';

function SavedMovies() {
  const { savedMovies, savedState, setSavedState } = useContext(AppContext);
  const {
    searchValue,
    isShortChecked,
    isShortDisabled,
    isSubmitDisabled,
    errorMessage,
  } = savedState;

  useEffect(() => {
    if (savedMovies.length === 0)
      return setSavedState({
        ...savedState,
        isShortDisabled: true,
        isSubmitDisabled: true,
        errorMessage: '«Нет сохраненных фильмов.»',
      });

    return setSavedState({
      ...savedState,
      isShortDisabled: false,
      isSubmitDisabled: false,
      errorMessage: '',
    });

    // eslint-disable-next-line
  }, []);

  function toggleShortCheck(isShortChecked) {
    setSavedState({ ...savedState, isShortChecked });
  }

  function onSearchSubmit(value) {
    setSavedState({ ...savedState, searchValue: value });
  }

  const filteredItems = filter(
    savedMovies,
    ['nameRU', 'nameEN'],
    searchValue,
    isShortChecked
  );

  return (
    <main className="movies">
      <SearchForm
        isChecked={isShortChecked}
        isCheckDisabled={isShortDisabled}
        onCheck={toggleShortCheck}
        isSubmitDisabled={isSubmitDisabled}
        onSubmit={onSearchSubmit}
      />
      <MoviesCardList movies={filteredItems} errorMessage={errorMessage} />
    </main>
  );
}

export default SavedMovies;
