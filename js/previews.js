import { generatePhotos } from './data.js';

const previewsContainer = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generatedPreviews = generatePhotos();

const previewsFragment = document.createDocumentFragment();
generatedPreviews.forEach((preview) => {
  const previewElement = previewTemplate.cloneNode(true);
  previewElement.dataset.id = preview.id;
  previewElement.querySelector('.picture__img').src = preview.url;
  previewElement.querySelector('.picture__img').alt = preview.description;
  previewElement.querySelector('.picture__likes').textContent = preview.likes;
  previewElement.querySelector('.picture__comments').textContent = preview.comments.length;

  previewsFragment.append(previewElement);
});

previewsContainer.append(previewsFragment);

export { generatedPreviews };
