import './pages/index.css';
import { createCard, likeCard, openImage } from './components/scripts/cards.js';
import { initialCards } from './components/scripts/cardsData.js';
import { openModal, closeModal, setCloseModalOnOverlayListeners} from './components/scripts/modal.js';

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const popupCloseButton = editPopup.querySelector('.popup__close')
const formEdit = document.forms.profile;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;
const formNewCard = document.forms.newplace;
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupCLoseButton = newCardPopup.querySelector('.popup__close')
const inputPlace = formNewCard.elements.placename;
const inputLink = formNewCard.elements.link;
const closeButtonContainer = document.querySelectorAll('.popup__close');
const popupContainer = document.querySelectorAll('.popup');

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Редактирование пользователя
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(editPopup);
}

// Добавление карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newItem = {
    name: inputPlace.value,
    link: inputLink.value
  }
  cardsContainer.prepend(createCard(newItem, deleteCard, likeCard, openImage));
  formNewCard.reset();
  closeModal(newCardPopup);
}

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsContainer.append(createCard(item, deleteCard, likeCard, openImage));
})

closeButtonContainer.forEach(closeButton => closeButton.addEventListener('click', (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  closeModal(openedPopup)
}));

setCloseModalOnOverlayListeners(popupContainer)

// Event listeners
editButton.addEventListener('click', () => openModal(editPopup));
popupCloseButton.addEventListener('click', () => closeModal(editPopup));
formEdit.addEventListener('submit', handleProfileFormSubmit)
formNewCard.addEventListener('submit', handleAddCardFormSubmit)
addCardButton.addEventListener('click',() => openModal(newCardPopup));
newCardPopupCLoseButton.addEventListener('click', () => closeModal(newCardPopup));

export {profileName, profileDescription, inputName, inputDescription}
