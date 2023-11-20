import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import logo from 'images/header_logo.svg';
import Form from 'components/Form/Form';

import './Login.css';

function Login({ onSubmit }) {
  const { email } = useContext(CurrentUserContext);

  return (
    <main className="login">
      <div className="login__container">
        <Link to={'/'} className="login__link">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <Form
          formType="auth"
          formValues={{ email, password: '' }}
          onSubmit={onSubmit}
        />
        <div className="login__signup">
          <p className="login__signup-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="page__link login__signup-link">
            Регистрация
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
