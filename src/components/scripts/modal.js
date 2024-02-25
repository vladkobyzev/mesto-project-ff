import {profileName, profileDescription, inputName, inputDescription} from '../../index'

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function openPropfilePopup(popup) { 
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openModal(popup);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
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

export {openModal, openPropfilePopup, closeModal, setCloseModalOnOverlayListeners}