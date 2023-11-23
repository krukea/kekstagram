import { renderPreviews } from './previews.js';
import { openModal } from './modal.js';

const previewsContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  previewsContainer.addEventListener('click', (evt) => {
    const previewContainer = evt.target.closest('.picture');
    if (!previewContainer) {
      return;
    }

    evt.preventDefault();
    const previewId = +previewContainer.dataset.id;
    const picture = pictures.find((item) => item.id === previewId);
    openModal(picture);
  });

  renderPreviews(pictures, previewsContainer);
};

export { renderGallery };
