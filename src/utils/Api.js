class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _sendRequest(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  getInitialCards() {
    return fetch(this._url + `cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._sendRequest)
  }

  getUserInfo() {
    return fetch(this._url + `users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._sendRequest)
  }

  newUserInfo(data) {
    return fetch(this._url + `users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._sendRequest)
  }
  
  addCard(data) {
    return fetch(this._url + `cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._sendRequest)
  }

  deleteCard(id) {
    return fetch( this._url + `cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._sendRequest)
  }

  editAvatar({avatar}) {
    return fetch(this._url + `users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._sendRequest)
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._sendRequest)
  }

  disLikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._sendRequest)
  }
  
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    authorization: 'f19d5955-fde2-4669-b21e-ba1c6a5901ef',
    'Content-Type': 'application/json'
  }
});