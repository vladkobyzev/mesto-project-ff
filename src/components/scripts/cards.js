import { openModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

// Create new card
function createCard(cardInfo, deleteCardCallback, likeCardCallback, openImageCardCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement))
  likeButton.addEventListener('click', () => likeCardCallback(cardElement))
  cardImage.addEventListener('click',() => openImageCardCallback(cardInfo));
  return cardElement;
}

// Like
function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export {createCard, likeCard, deleteCard}