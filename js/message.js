import { isEscapeKey } from './utility.js';

const ALERT_SHOW_TIME = 5000;

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorsMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.classList.add('error-alert');
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
  body.removeEventListener('click', onBodyClick);
};

const showMessage = (messageElement, closeBtnClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeyDown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeBtnClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorsMessage, '.error__button');
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  hideMessage();
}

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

export { showSuccessMessage, showErrorMessage, showAlert };
