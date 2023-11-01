import { useContext } from 'react';

import './Profile.css';

import Form from '../Form/Form';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSubmit, onLogout }) {
  const { name, email } = useContext(CurrentUserContext);

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
        <Form
          formType="profile"
          formValues={{ name, email }}
          onSubmit={onSubmit}
        />
        <div className="profile__logout">
          <button
            type="button"
            className="page__button profile__logout-button"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
