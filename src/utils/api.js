class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _customFetch(res) {

        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._customFetch);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._customFetch);
    }
    setUserInfo({
        name,
        about
    }) {

        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then(this._customFetch);
    }
    createCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(this._customFetch);

    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(this._customFetch);
    }
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',
        }).then(this._customFetch);
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(this._customFetch);
    }
    setUserAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._customFetch);
    }


    // other methods for working with the API
}

export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en", //cohort-3-en
    headers: {
        authorization: "edde3a5c-b30d-40b0-99e9-6f72ee976ddf",
        "Content-Type": "application/json"
    }
});