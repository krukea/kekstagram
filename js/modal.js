/* eslint-disable no-use-before-define */
import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';

const body = document.body;
const closeBtn = fullSizeContainer.querySelector('.cancel');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onClickOutsideModal = (evt) => {
  if (!evt.target.closest('.pictures')) {
    evt.preventDefault();
    closeModal();
  }
};

const closeModal = () => {
  body.classList.remove('modal-open');
  fullSizeContainer.classList.add('hidden');
  closeBtn.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onClickOutsideModal);

  clearFullImg();
};

const openModal = (picture) => {
  body.classList.add('modal-open');
  fullSizeContainer.classList.remove('hidden');
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onClickOutsideModal);

  renderFullImg(picture);
};

export { openModal, closeModal };
