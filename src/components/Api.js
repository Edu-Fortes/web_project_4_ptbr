export default class Api {
  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  get(what) {
    return fetch(`${this._baseUrl}/${what}`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  patch(where, { name, about }) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}
