import { useContext } from 'react';

import Logo from 'components/Logo/Logo';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

import './Register.css';

import Form from '../Form/Form';

function Register({ onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="register">
      <div className="register__container">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form formType="auth" formValues={currentUser} onSubmit={onSubmit} />
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="page__link register__signin-link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
