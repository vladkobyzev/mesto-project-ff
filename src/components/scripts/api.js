const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: 'cdea2609-51f4-4604-8d74-eb96bd5a104d',
    'Content-Type': 'application/json'
  }
}

const getCurrentUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const updateCurrentUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const updateUserAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    console.log(`Card with id: ${cardId} was deleted`)
  })
  .catch(err => {
    console.log(err);
  });
}

const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
  .catch(err => {
    console.log(err);
  });
}

export {getCurrentUser, updateCurrentUser, updateUserAvatar, getAllCards, addNewCard, addLikeCard, deleteLikeCard, deleteCardRequest}
