import { useContext, useEffect } from 'react';
import './Form.css';

import { useLocation } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import Tooltip from 'components/Tooltip/Tooltip';
import useForm from 'hooks/useForm';

import Field from './Field/Field';

function Form({ formType, formValues, onSubmit }) {
  const { pathname } = useLocation();
  const { isLoading } = useContext(AppContext);

  const { form, errors, isValid, handleChange, handleSubmit, setInitialState } =
    useForm(onSubmit);

  useEffect(() => {
    setInitialState(formValues);
    // eslint-disable-next-line
  }, []);

  const submitText = {
    '/signup': isLoading ? 'Регистрация' : 'Зарегистрироваться',
    '/signin': isLoading ? 'Вход' : 'Войти',
    '/profile': isLoading ? 'Сохранение' : 'Редактировать',
  };

  const fields = [
    {
      id: 'name',
      label: 'Имя',
      type: 'text',
    },
    {
      label: 'E-mail',
      id: 'email',
      type: 'email',
      pattern: '^\\S+@\\S+\\.\\S+$',
    },
    {
      label: 'Пароль',
      id: 'password',
      type: 'password',
      minLength: 3,
    },
  ];

  const field = (item) => (
    <Field
      key={item.id}
      formType={formType}
      value={form[item.id] || ''}
      error={errors[item.id] || ''}
      onChange={handleChange}
      {...item}
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`form form_type_${formType}`}
      noValidate
    >
      <div className="form__fields">
        {pathname === '/signup' && fields.map(field)}
        {pathname === '/signin' && fields.slice(1, 3).map(field)}
        {pathname === '/profile' && fields.slice(0, 2).map(field)}
      </div>
      <Tooltip>
        <p className="tooltip__error-text" id="description">
          При регистрации пользователя произошла ошибка.
        </p>
      </Tooltip>
      <button
        type="submit"
        className={`page__button form__submit form__${formType}-submit ${
          isLoading ? 'form__submit_is-loading' : ''
        }`}
        disabled={!isValid}
        aria-describedby="description"
      >
        {submitText[pathname]}
      </button>
    </form>
  );
}

export default Form;
