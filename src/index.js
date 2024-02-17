import '../pages/index.css';
import { initialCards, createCard } from './components/scripts/cards.js';
import { openModal, closeModal } from './components/scripts/modal.js';

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Like
function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Open Image Popup 
function openImage(cardInfo) {
  const imagePopup = document.querySelector('.popup_type_image');

  imagePopup.querySelector('.popup__image').src = cardInfo.link;
  imagePopup.querySelector('.popup__caption').textContent = cardInfo.name;

  openModal(imagePopup)
}

// Вывести карточки на страницу
initialCards.forEach(item => {
  placesList.append(createCard(item, deleteCard, likeCard, openImage));
})

// Редактирование пользователя
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const popupCloseButton = editPopup.querySelector('.popup__close')
const formEdit = document.forms.profile;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(editPopup);
}

editButton.addEventListener('click', () => openModal(editPopup));
popupCloseButton.addEventListener('click', () => closeModal(editPopup));
formEdit.addEventListener('submit', handleProfileFormSubmit)

// Добавление карточки
const formNewCard = document.forms.newplace;
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupCLoseButton = newCardPopup.querySelector('.popup__close')
const inputPlace = formNewCard.elements.placename;
const inputLink = formNewCard.elements.link;

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newItem = {
    name: inputPlace.value,
    link: inputLink.value
  }
  placesList.prepend(createCard(newItem, deleteCard, likeCard, openImage));
  formNewCard.reset();
  closeModal(newCardPopup);
}

formNewCard.addEventListener('submit', handleAddCardFormSubmit)
addCardButton.addEventListener('click',() => openModal(newCardPopup));
newCardPopupCLoseButton.addEventListener('click', () => closeModal(newCardPopup));

