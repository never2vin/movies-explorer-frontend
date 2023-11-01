import { Link } from 'react-router-dom';

import './Logo.css';

import logo from '../../images/header_logo.svg';

function Logo() {
  return (
    <Link to={'/'} className="logo__link">
      <img width={38} height={38} src={logo} alt="Логотип" />
    </Link>
  );
}

export default Logo;
