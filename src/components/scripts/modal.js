import {profileName, profileDescription, inputName, inputDescription} from '../../index'

function openModal(popup) {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => handleEscClose(evt, popup));
}

function handleEscClose(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(openedPopup)
  }
}

function handleOverlayClose(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openedPopup) {
    closeModal(openedPopup)
  }
}

function setCloseModalOnOverlayListeners(popupList) {
  popupList.forEach(popup => popup.addEventListener('click', handleOverlayClose))
}

export {openModal, closeModal, setCloseModalOnOverlayListeners}