import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function formatDuration(duration) {
  let min = duration,
    hour = 0;

  if (min >= 60) {
    min = duration % 60;
    hour = min === 0 ? duration / 60 : (duration - min) / 60;
  }

  return hour === 0 ? `${min}м` : `${hour}ч ${min}м`;
}

function MoviesCard({ movie, savedMovies }) {
  const { pathname } = useLocation();

  function getIsSaved() {
    return savedMovies.some((item) => item.movieId === movie.id);
  }

  const button =
    pathname === '/movies' ? (
      <button
        type="button"
        className={`page__button movie__button ${
          getIsSaved() ? 'movie__unlike-button' : 'movie__like-button'
        }`}
        onClick={handleSaveClick}
        aria-label="Удалить"
      >
        {getIsSaved() ? '' : 'Сохранить'}
      </button>
    ) : (
      <button
        type="button"
        className={'page__button movie__button movie__remove-button'}
        onClick={handleRemoveClick}
        aria-label="Удалить"
      ></button>
    );

  function handleRemoveClick() {
    console.log('remove button click!');
  }

  function handleSaveClick() {
    getIsSaved()
      ? console.log('saved button click!')
      : console.log('save button click!');
  }

  return (
    <li className="movie">
      <a
        href={movie.trailerLink}
        className="movie__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={pathname === '/movies' ? movie.image.url : movie.image}
          alt={movie.nameRU}
          className="movie__image"
        />
      </a>
      {button}
      <div className="movie__desc">
        <h2 className="movie__name page__title">{movie.nameRU}</h2>
        <p className="movie__duration">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
