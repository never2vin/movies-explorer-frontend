import { useContext, useState, useEffect } from 'react';
import './Form.css';

import { useLocation } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import Tooltip from 'components/Tooltip/Tooltip';
import useForm from 'hooks/useForm';

import Field from './Field/Field';

function Form({ formType, formValues, onSubmit }) {
  const { pathname } = useLocation();
  const { isLoading, state, setState } = useContext(AppContext);
  const { form, errors, isDirty, isValid, handleChange, reset } =
    useForm(formValues);

  const [isEdit, setEdit] = useState(pathname !== '/profile');

  function handleSubmit(e) {
    e.preventDefault();

    if (pathname !== '/profile') return onSubmit(form);

    if (!isEdit) {
      setState('idle');
      return setEdit(true);
    }

    setEdit(false);
    onSubmit(form);
  }

  function handleCancel() {
    setEdit(false);
  }

  useEffect(() => {
    if (pathname === '/profile') reset(formValues);
    // eslint-disable-next-line
  }, [formValues, isEdit]);

  const submitText = {
    '/signup': isLoading ? 'Регистрация' : 'Зарегистрироваться',
    '/signin': isLoading ? 'Вход' : 'Войти',
    '/profile': getSubmitText(),
  };

  function getSubmitText() {
    if ((isDirty && isEdit) || isEdit) return 'Сохранить';
    if (isLoading) return 'Сохранение';
    return 'Редактировать';
  }

  const fields = [
    {
      id: 'name',
      label: 'Имя',
      type: 'text',
      minLength: 2,
      maxLength: 30,
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
      maxLength: 24,
    },
  ];

  const field = (item) => (
    <Field
      key={item.id}
      formType={formType}
      value={form[item.id] || ''}
      error={errors[item.id] || ''}
      readOnly={!isEdit}
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
      <Tooltip />
      <div className="form__bottom">
        <button
          type="submit"
          className={`page__button form__submit form__${formType}-submit ${
            isLoading ? 'form__submit_is-loading' : ''
          }`}
          disabled={!isValid || (!isDirty && isEdit)}
          aria-describedby="description"
        >
          {submitText[pathname]}
        </button>
        {pathname === '/profile' && isEdit && (
          <button
            className={`page__button form__${formType}-cancel`}
            onClick={handleCancel}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
