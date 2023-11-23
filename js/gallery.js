import { generatePhotos } from './data.js';
import { renderPreviews } from './previews.js';

const generatedPreviews = generatePhotos();
const previewsContainer = document.querySelector('.pictures');

renderPreviews(generatedPreviews, previewsContainer);
