class Api {
  constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка ${res.status}`);
    }

    createUser(userData) {
      return fetch(`${this._baseUrl}/users/create/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(this._checkResponse);
    }

    loginUser(userData) {
      return fetch(`${this._baseUrl}/users/login/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(this._checkResponse);
    }

    refreshToken(token) {
      return fetch(`${this._baseUrl}/users/refresh_token/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
        .then(this._checkResponse);
    }
  
    getCards(token) {
      return fetch(`${this._baseUrl}/cards/`, { 
        method: 'GET', 
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(this._checkResponse);
    }
  
    createCard(text, row, token) {
      return fetch(`${this._baseUrl}/cards/`, { 
        method: 'POST', 
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ text, row })
      })
        .then(this._checkResponse);
    }
  
    deleteCard(cardId, token) {
      return fetch(`${this._baseUrl}/cards/${cardId}/`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.ok) {
            return
          } 
          return Promise.reject(`Ошибка ${res.status}`);
        });
    }
  }

  const api = new Api({
    baseUrl: 'https://trello.backend.tests.nekidaem.ru/api/v1'
  });

  export default api;