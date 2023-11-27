import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';
import { renderComments, clearComments } from './comments.js';

const body = document.body;
const closeBtn = fullSizeContainer.querySelector('.cancel');
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

function toggleModal(picture) {
  const comments = picture.comments;

  function onDocumentKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  /*   function onClickOutsideModal(evt) {
    if (!evt.target.closest('.big-picture')) {
      evt.preventDefault();
      closeModal();
    }
  }
 */
  function onLoadMore(evt) {
    evt.preventDefault();
    renderComments(comments, true);
  }

  function closeModal() {
    body.classList.remove('modal-open');
    fullSizeContainer.classList.add('hidden');
    closeBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onDocumentKeyDown);
    //document.removeEventListener('click', onClickOutsideModal);

    loadCommentsBtn.removeEventListener('click', onLoadMore);

    clearFullImg();
    clearComments();
  }

  const openModal = () => {
    body.classList.add('modal-open');
    fullSizeContainer.classList.remove('hidden');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeyDown);
    //addEventListener('click', onClickOutsideModal);

    renderFullImg(picture);

    if (comments.length > 0) {
      renderComments(comments);
    }

    loadCommentsBtn.addEventListener('click', onLoadMore);
  };

  if (fullSizeContainer.classList.contains('hidden')) {
    openModal(picture);
  } else {
    closeModal();
  }
}

export { toggleModal, loadCommentsBtn };
