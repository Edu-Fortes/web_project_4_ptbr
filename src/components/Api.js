export default class Api {
  constructor(baseUrl, authorization) {
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
}
