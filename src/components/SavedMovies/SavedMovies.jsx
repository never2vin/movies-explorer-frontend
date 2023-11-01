import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/constants';

import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList id={'movieId'} movies={savedMovies} />
    </main>
  );
}

export default SavedMovies;
