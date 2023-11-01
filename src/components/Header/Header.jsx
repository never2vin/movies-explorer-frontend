import { useContext } from 'react';

import Logo from 'components/Logo/Logo';
import { AppContext } from 'contexts/AppContext';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';

const setActive = ({ isActive }) =>
  isActive
    ? 'page__link header__menu-link header__menu-link_active'
    : 'page__link header__menu-link';

function Header() {
  const { isLoggedIn, isLargeDevice, onClickMenu } = useContext(AppContext);

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {isLoggedIn ? (
          isLargeDevice ? (
            <>
              <nav className="header__menu">
                <ul className="header__menu-links page__list">
                  <li>
                    <NavLink to={'/movies'} className={setActive}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/saved-movies'} className={setActive}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <Link to="/profile" className="page__link header__profile-link">
                Аккаунт
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="page__button header__menu-button "
              onClick={onClickMenu}
              aria-label="Открыть меню"
            >
              <span />
              <span />
              <span />
            </button>
          )
        ) : (
          <nav className="header__auth">
            <ul className="header__auth-links page__list">
              <li>
                <Link to="/signup" className="page__link header__auth-link">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="page__link header__auth-link header__auth-link_type_signin"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
