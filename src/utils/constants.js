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
const MIDDLE = 1279;
const SMALL = 767;

const LARGE_PARAMS = { number: 12, limit: 3 };
const MIDDLE_PARAMS = { number: 8, limit: 2 };
const SMALL_PARAMS = { number: 5, limit: 2 };

export {
  MOVIES_API_URL,
  MAIN_API_URL,
  MESSAGES,
  SHORT_DURATION,
  MIDDLE,
  SMALL,
  LARGE_PARAMS,
  MIDDLE_PARAMS,
  SMALL_PARAMS,
};
