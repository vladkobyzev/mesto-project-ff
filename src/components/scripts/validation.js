const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const clearValidation = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    let validityMessage = inputElement.validationMessage;
    if (inputElement.validity.valueMissing) {
      validityMessage = 'Вы пропустили это поле'
    } else if (inputElement.validity.tooShort) {
      validityMessage = `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ.`;
    } else if (inputElement.validity.tooShort) {
      validityMessage = `Минимальное количество символов: ${inputElement.maxLength}. Длина текста сейчас: ${inputElement.value.length} символ.`;
    } else if (inputElement.validity.patternMismatch) {
      validityMessage = inputElement.dataset.errorMessage;
    } else if (inputElement.validity.typeMismatch) {
      validityMessage = 'Введите адрес сайта';
    }
    showInputError(formElement, inputElement, validityMessage);
  } else {
    clearValidation(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
}

export {enableValidation, clearValidation, toggleButtonState}