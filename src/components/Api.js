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

  patch(where, dataToPatch) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "apllication/json",
      },
      body: JSON.stringify({
        name: dataToPatch.name,
        about: dataToPatch.about,
      }),
    });
  }
}
