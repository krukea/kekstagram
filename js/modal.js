import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';
import { renderComments, clearComments } from './comments.js';

const body = document.body;
const closeBtn = fullSizeContainer.querySelector('.cancel');
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

const closeModal = () => {
  body.classList.remove('modal-open');
  fullSizeContainer.classList.add('hidden');
  closeBtn.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeyDown);
  //document.removeEventListener('click', onClickOutsideModal);

  clearFullImg();
  clearComments();
};

const openModal = (picture) => {
  body.classList.add('modal-open');
  fullSizeContainer.classList.remove('hidden');
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeyDown);
  //document.addEventListener('click', onClickOutsideModal);

  renderFullImg(picture);
  const comments = picture.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }

  loadCommentsBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(comments, true);
  });
};

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

/* function onClickOutsideModal(evt) {
  if (!evt.target.closest('.big-picture')) {
    evt.preventDefault();
    closeModal();
  }
} */

export { openModal, closeModal, loadCommentsBtn };
