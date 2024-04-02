import { isEscapeKey } from './utility.js';
import { fullSizeContainer, renderFullImg, clearFullImg } from './fullsize.js';
import { renderComments, clearComments } from './comments.js';
import { clearUploadForm, createSlider } from './upload.js';

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
  let closeBtn;

  switch (modalType) {
    case 'fullsize':
      modalElement = fullSizeContainer;
      comments = picture.comments;
      break;

    case 'upload':
      modalElement = document.querySelector('.img-upload__overlay');
      closeBtn = modalElement.querySelector('.cancel');
      break;

    case 'message':
      const type = !ok ? 'error' : 'success';
      modalElement = createUploadResponseModal(type, msg);
      body.appendChild(modalElement);
      closeBtn = modalElement.querySelector(`.${type}__button`);
      break;

    default:
      break;
  }

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
        if (modalElement && !modalElement.classList.contains('error')) {
          clearUploadForm();

          const uploadModal = document.querySelector('.img-upload__overlay');
          if (uploadModal) {
            uploadModal.classList.add('hidden');
          }
        }
        break;

      default:
        break;
    }

    body.classList.remove('modal-open');
    modalElement.classList.add('hidden');
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeModal);
    }
    //document.removeEventListener('click', onClickOutsideModal);
  }

  const openModal = () => {
    body.classList.add('modal-open');
    modalElement.classList.remove('hidden');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
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

      case 'upload':
        createSlider();
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
