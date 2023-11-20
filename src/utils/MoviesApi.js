import { MOVIES_API_URL } from 'utils/constants';

function makeRequest(url, method) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${MOVIES_API_URL}/${url}`, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getAllMovies() {
  return makeRequest('beatfilm-movies', 'GET');
}
