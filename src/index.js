import './pages/index.css';
import { createCard, likeCard, deleteCard } from './components/scripts/cards.js';
import { initialCards } from './components/scripts/cardsData.js';
import { openModal, closeModal, setCloseModalOnOverlayListeners} from './components/scripts/modal.js';

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const formEdit = document.forms.profile;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;
const formNewCard = document.forms.newplace;
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const inputPlace = formNewCard.elements.placename;
const inputLink = formNewCard.elements.link;
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

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

// Open Image Popup 
function openImage(cardInfo) {
  imagePopupPhoto.src = cardInfo.link;
  imagePopupPhoto.alt = cardInfo.name;
  imageCaption.textContent = cardInfo.name;

  openModal(imagePopup)
}

function openPropfilePopup(popup) { 
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openModal(popup);
}

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsContainer.append(createCard(item, deleteCard, likeCard, openImage));
})

popupCloseButtonList.forEach(closeButton => closeButton.addEventListener('click', (evt) => {
  const openedPopup = evt.target.closest('.popup');
  closeModal(openedPopup)
}));

setCloseModalOnOverlayListeners(popupList)

// Event listeners
editButton.addEventListener('click', () => openPropfilePopup(editPopup));
formEdit.addEventListener('submit', handleProfileFormSubmit)
formNewCard.addEventListener('submit', handleAddCardFormSubmit)
addCardButton.addEventListener('click',() => openModal(newCardPopup));

export {profileName, profileDescription, inputName, inputDescription}
