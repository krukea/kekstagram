import { generatePhotos } from './data.js';

const previewsContainer = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generatedPreviews = generatePhotos();
console.log(generatedPreviews);
const previewsFragment = document.createDocumentFragment();
generatedPreviews.forEach((preview) => {
  /* Адрес изображения url подставьте как атрибут src изображения.
Описание изображения description подставьте в атрибут alt изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments. */
  const previewElement = previewTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = preview.url;
  previewElement.querySelector('.picture__img').alt = preview.description;
  previewElement.querySelector('.picture__likes').textContent = preview.likes;
  previewElement.querySelector('.picture__comments').textContent = preview.comments.length;

  previewsFragment.append(previewElement);
});

previewsContainer.append(previewsFragment);
