import { useContext } from 'react';

import './Profile.css';

import Form from 'components/Form/Form';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="page__link profile__logout-link">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Profile;
