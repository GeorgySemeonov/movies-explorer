import { URL_BEATFILM } from './constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: URL_BEATFILM,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;