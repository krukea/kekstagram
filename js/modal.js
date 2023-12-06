import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';
import { renderComments, clearComments } from './comments.js';
import { clearUploadForm } from './upload.js';

const body = document.body;
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

let modalType;
let modalElement;

function toggleModal(modalClass, picture) {
  let comments;

  if (modalClass === 'big-picture') {
    modalType = 'fullsize';
    modalElement = fullSizeContainer;

    comments = picture.comments;
  } else if (modalClass === 'upload') {
    modalType = 'upload';
    modalElement = document.querySelector('.img-upload__overlay');
  }

  const closeBtn = modalElement.querySelector('.cancel');

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
    modalElement.classList.add('hidden');
    closeBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onDocumentKeyDown);
    //document.removeEventListener('click', onClickOutsideModal);

    if (modalType === 'fullsize') {
      loadCommentsBtn.removeEventListener('click', onLoadMore);

      clearFullImg();
      clearComments();
    } else if (modalType === 'upload') {
      clearUploadForm();
    }
  }

  const openModal = () => {
    body.classList.add('modal-open');
    modalElement.classList.remove('hidden');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeyDown);
    //addEventListener('click', onClickOutsideModal);

    if (modalType === 'fullsize') {
      renderFullImg(picture);

      if (comments.length > 0) {
        renderComments(comments);
      }

      loadCommentsBtn.addEventListener('click', onLoadMore);
    }
  };

  if (modalElement.classList.contains('hidden')) {
    openModal(picture);
  } else {
    closeModal();
  }
}

export { toggleModal, loadCommentsBtn };
