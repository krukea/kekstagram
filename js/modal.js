import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';
import { renderComments, clearComments } from './comments.js';
import { clearUploadForm } from './upload.js';

const body = document.body;
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

const createUploadResponseModal = (type, msg = '') => {
  const modalTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const modalElement = modalTemplate.cloneNode(true);
  modalElement.classList.add('hidden');

  if (type === 'error') {
    modalElement.querySelector('.error__title').textContent = msg;
  }

  return modalElement;
};

let modalElement;

function toggleModal(modalType, picture, { ok, msg } = {}) {
  let comments;

  switch (modalType) {
    case 'fullsize':
      modalElement = fullSizeContainer;
      comments = picture.comments;
      break;

    case 'upload':
      modalElement = document.querySelector('.img-upload__overlay');
      break;

    case 'message':
      const type = !ok ? 'error' : '';
      modalElement = createUploadResponseModal(type, msg);
      break;

    default:
      break;
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
    //document.removeEventListener('click', onClickOutsideModal);

    switch (modalType) {
      case 'fullsize':
        loadCommentsBtn.removeEventListener('click', onLoadMore);
        document.removeEventListener('keydown', onDocumentKeyDown);

        clearFullImg();
        clearComments();
        break;

      case 'upload':
        document.removeEventListener('keydown', onDocumentKeyDown);

        clearUploadForm();
        break;

      case 'message':
        clearUploadForm();
        break;

      default:
        break;
    }
  }

  const openModal = () => {
    body.classList.add('modal-open');
    modalElement.classList.remove('hidden');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeyDown);
    //addEventListener('click', onClickOutsideModal);

    switch (modalType) {
      case 'fullsize':
        renderFullImg(picture);

        if (comments.length > 0) {
          renderComments(comments);
        }

        loadCommentsBtn.addEventListener('click', onLoadMore);
        break;

      case 'message':
        break;

      default:
        break;
    }
  };

  if (modalElement.classList.contains('hidden')) {
    openModal();
  } else {
    closeModal();
  }
}

export { toggleModal, loadCommentsBtn };
