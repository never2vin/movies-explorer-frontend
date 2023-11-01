import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ id, movies, savedMovies }) {
  return (
    <section className="movies-card">
      <ul className="movies-card__list page__list">
        {movies.map((movie) => (
          <MoviesCard key={movie[id]} movie={movie} savedMovies={savedMovies} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
