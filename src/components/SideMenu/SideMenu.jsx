import { useContext, useEffect } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import usePopupClose from 'hooks/useMenuClose';

import './SideMenu.css';

const setActive = ({ isActive }) =>
  isActive
    ? 'page__link side-menu__link side-menu__link_active'
    : 'page__link side-menu__link';

const menuItems = [
  { children: 'Главная', to: '/' },
  { children: 'Фильмы', to: '/movies' },
  { children: 'Сохранённые фильмы', to: '/saved-movies' },
];

function SideMenu() {
  const { isLargeDevice, isMenuOpen, onClickMenu } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMenuOpen) onClickMenu();

    // eslint-disable-next-line
  }, [pathname, isLargeDevice]);

  usePopupClose(isMenuOpen, onClickMenu);

  return (
    <>
      <nav
        className={isMenuOpen ? 'side-menu side-menu__is-opened' : 'side-menu'}
      >
        <div className="side-menu__content">
          <button
            type="button"
            className="page__button side-menu__close-button"
            onClick={onClickMenu}
            aria-label="Закрыть"
          ></button>
          <ul className="page__list side-menu__list">
            {menuItems.map(({ to, children }) => (
              <li key={to}>
                <NavLink to={to} className={setActive}>
                  {children}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/profile" className="page__link side-menu__profile-link">
            Аккаунт
          </Link>
        </div>
      </nav>
    </>
  );
}

export default SideMenu;
