const MOVIES_API_URL = 'https://api.nomoreparties.co';

const MAIN_API_URL =
  process.env.REACT_APP_MAIN_API_URL ||
  'https://api.diploma.nomoredomainsicu.ru';

const MESSAGES = {
  '/signin': {
    401: 'Вы ввели неправильный логин или пароль.',
    500: 'При авторизации произошла ошибка.',
  },
  '/signup': {
    409: 'Пользователь с таким email уже существует.',
    500: 'При регистрации пользователя произошла ошибка.',
  },
  '/profile': {
    ok: 'Обновление профиля прошло успешно!',
    409: 'Пользователь с таким email уже существует.',
    500: 'При обновлении профиля произошла ошибка.',
  },
};

const SHORT_DURATION = 40;

export { MOVIES_API_URL, MAIN_API_URL, MESSAGES, SHORT_DURATION };
