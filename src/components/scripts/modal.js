function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
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
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target)
  }
}

function setCloseModalOnOverlayListeners(popupList) {
  popupList.forEach(popup => popup.addEventListener('click', handleOverlayClose))
}

export {openModal, closeModal, setCloseModalOnOverlayListeners}