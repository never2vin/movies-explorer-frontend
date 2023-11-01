import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="page-not-found__container">
        <div className="page-not-found__content">
          <h1 className="page-not-found__title">404</h1>
          <p className="page-not-found__desc">Страница не найдена</p>
        </div>
        <Link to="/" className="page__link page-not-found__link">
          Назад
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
