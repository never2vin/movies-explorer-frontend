// import MAIN_API_URL from '../../config.js';

const MAIN_API_URL =
  process.env.REACT_APP_MAIN_API_URL ||
  'https://api.diploma.nomoredomainsicu.ru';

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, method, body, token) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${this._baseUrl}/${endpoint}`, options).then(
      this._getResponseData
    );
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  registerUser(name, email, password) {
    return this._request('signup', 'POST', { name, email, password });
  }

  authorizeUser({ email, password }) {
    return this._request('signin', 'POST', { email, password });
  }

  getUserInfo(token) {
    return this._request('users/me', 'GET', null, token);
  }

  setUserInfo(info, token) {
    return this._request('users/me', 'PATCH', info, token);
  }

  getAllInitialData(token) {
    return Promise.all([this.getUserInfo(token), this.getMovies(token)]);
  }

  getMovies(token) {
    return this._request('movies', 'GET', null, token);
  }

  saveMovie(data, token) {
    return this._request('movies', 'POST', data, token);
  }

  removeMovie(id, token) {
    return this._request(`movies/${id}`, 'DELETE', null, token);
  }
}

const api = new Api(MAIN_API_URL);

export default api;
