import {addLikeCard, deleteLikeCard, deleteCardRequest} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

// Create new card
function createCard(cardInfo, deleteCardCallback, likeCardCallback, openImageCardCallback, currentUserId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  
  if (cardInfo.likes) {
    updateLikeCount(cardInfo, cardLikeCount);
    if (cardInfo.likes.some(user => user._id == currentUserId)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  if (cardInfo.owner && cardInfo.owner._id == currentUserId) {
    deleteButton.addEventListener('click', () => deleteCardCallback(cardElement, cardInfo._id));
  } else {
    deleteButton.remove();
  }

  
  likeButton.addEventListener('click', () => likeCardCallback(cardElement, cardInfo._id));
  cardImage.addEventListener('click',() => openImageCardCallback(cardInfo));
  return cardElement;
}

// Like
function likeCard(cardElement, cardId) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const likeMethod = likeButton.classList.contains('card__like-button_is-active')
    ? deleteLikeCard
    : addLikeCard;

  likeMethod(cardId)
    .then(data => {
      likeButton.classList.toggle('card__like-button_is-active');
      updateLikeCount(data, cardLikeCount);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateLikeCount (cardInfo, cardLikeCount) {
  cardLikeCount.textContent = cardInfo.likes.length || '';
}

// Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardRequest(cardId)
    .then(res => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export {createCard, likeCard, deleteCard}