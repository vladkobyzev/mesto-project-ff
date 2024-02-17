function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => handleEscClose(evt, popup));
  popup.addEventListener('click', (evt) => handleOverlayClose(evt, popup));
  popup.querySelector('.popup__close').addEventListener('click', (evt) => closeModal(popup))
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => handleEscClose(evt, popup));
  popup.removeEventListener('click', (evt) => handleOverlayClose(evt, popup));
}

function handleEscClose(evt, currentPopup) {
  if (evt.key === 'Escape') {
    closeModal(currentPopup)
  }
}

function handleOverlayClose(evt, currentPopup) {
  if (evt.target === currentPopup) {
    closeModal(currentPopup)
  }
}

export {openModal, closeModal}