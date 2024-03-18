import "./pages/index.css";
import {
  createCard,
  likeCard,
  deleteCard,
} from "./components/scripts/card.js";
import {
  openModal,
  closeModal,
  setCloseModalOnOverlayListeners,
} from "./components/scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  toggleButtonState,
} from "./components/scripts/validation.js";
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
  getAllCards,
  addNewCard,
} from "./components/scripts/api.js";

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const formEdit = document.forms.profile;
const profileImage = document.querySelector(".profile__image");
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");
const formNewAvatar = document.forms.avatar;
const newAvatarInput = formNewAvatar.elements.avatar;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;
const formNewCard = document.forms.newplace;
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const inputPlace = formNewCard.elements.placename;
const inputLink = formNewCard.elements.link;
const popupCloseButtonList = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPhoto = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
let currentUser;

// Редактирование пользователя
function handleProfileFormSubmit(evt) {
  const saveButton = evt.target.querySelector(".popup__button");
  evt.preventDefault();

  saveButton.textContent = "Сохранение...";
  updateCurrentUser(inputName.value, inputDescription.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    })

  closeModal(editPopup);
}

Promise.all([getCurrentUser(), getAllCards()])
  .then(([userData, cardData]) => {
    // Обработка данных о текущем пользователе
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    currentUser = userData;

    // Обработка данных о карточках
    cardData.forEach((item) => {
      cardsContainer.append(
        createCard(item, deleteCard, likeCard, openImage, currentUser._id)
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Добавление карточки
function handleAddCardFormSubmit(evt) {
  const saveButton = evt.target.querySelector(".popup__button");
  evt.preventDefault();
  saveButton.textContent = "Сохранение...";
  addNewCard(inputPlace.value, inputLink.value)
    .then((persistedCard) => {
      cardsContainer.prepend(
        createCard(
          persistedCard,
          deleteCard,
          likeCard,
          openImage,
          currentUser._id
        )
      );
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });

  formNewCard.reset();
  closeModal(newCardPopup);
}

//
function handleUpdateUserAvatar(evt) {
  const saveButton = evt.target.querySelector(".popup__button");
  evt.preventDefault();

  saveButton.textContent = "Сохранение...";
  updateUserAvatar(newAvatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });

  formNewAvatar.reset();
  closeModal(newAvatarPopup);
}

// Open Image Popup
function openImage(cardInfo) {
  imagePopupPhoto.src = cardInfo.link;
  imagePopupPhoto.alt = cardInfo.name;
  imageCaption.textContent = cardInfo.name;

  openModal(imagePopup);
}

function openPropfilePopup(popup) {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(document.forms.profile, validationConfig);


  openModal(popup);
}

popupCloseButtonList.forEach((closeButton) =>
  closeButton.addEventListener("click", (evt) => {
    const openedPopup = evt.target.closest(".popup");
    closeModal(openedPopup);
  })
);

setCloseModalOnOverlayListeners(popupList);
enableValidation(validationConfig);

// Event listeners
editButton.addEventListener("click", () => openPropfilePopup(editPopup));
formEdit.addEventListener("submit", handleProfileFormSubmit);
formNewCard.addEventListener("submit", handleAddCardFormSubmit);
formNewAvatar.addEventListener("submit", handleUpdateUserAvatar);
addCardButton.addEventListener("click", () => openModal(newCardPopup));
profileImage.addEventListener("click", () => openModal(newAvatarPopup));

export { profileName, profileDescription, inputName, inputDescription };
