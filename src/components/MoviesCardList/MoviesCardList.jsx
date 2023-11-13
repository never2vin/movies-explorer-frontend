import { useContext } from 'react';

import { AppContext } from 'contexts/AppContext';
import MoviesCard from 'components/MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ movies, savedMovies, errorMessage }) {
  const { isFirstSearch } = useContext(AppContext);

  return isFirstSearch && movies.length === 0 ? (
    <div className="movies__search-error">
      <p>{errorMessage ? errorMessage : '«Ничего не найдено.»'}</p>
    </div>
  ) : (
    <section className="movies-card">
      <ul className="movies-card__list page__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
