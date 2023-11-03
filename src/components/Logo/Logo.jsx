import { Link } from 'react-router-dom';
import logo from 'images/header_logo.svg';

import './Logo.css';

function Logo() {
  return (
    <Link to={'/'} className="page__link logo">
      <img width={38} height={38} src={logo} alt="Логотип" />
    </Link>
  );
}

export default Logo;
