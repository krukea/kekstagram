import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';

const body = document.body;
const previewsContainer = document.querySelector('.pictures');

const commentsCount = fullSizeContainer.querySelector('.social__comment-count');
const commentsLoader = fullSizeContainer.querySelector('.comments-loader');
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

const openModal = (id) => {
  body.classList.add('modal-open');
  fullSizeContainer.classList.remove('hidden');
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onClickOutsideModal);

  renderFullImg(id);
};

const onPreviewClick = function ({ target }) {
  const previewContainer = target.closest('.picture');
  if (previewContainer) {
    openModal(parseInt(previewContainer.dataset.id));
  }
};

previewsContainer.addEventListener('click', onPreviewClick);

export { openModal, closeModal };
