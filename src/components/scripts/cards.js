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
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
    .then(data => {
      updateLikeCount(data, cardLikeCount);
    });
  } else {
    addLikeCard(cardId)
    .then(data => {
      updateLikeCount(data, cardLikeCount)
    });;
  }
  likeButton.classList.toggle('card__like-button_is-active');
}

function updateLikeCount (cardInfo, cardLikeCount) {
  if (cardInfo.likes.length != 0) {
    cardLikeCount.textContent = cardInfo.likes.length
  } else {
    cardLikeCount.textContent = '';
  }
}

// Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardRequest(cardId)
  cardElement.remove();
}

export {createCard, likeCard, deleteCard}