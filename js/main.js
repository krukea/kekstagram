import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { renderUploadImage } from './upload.js';

const MAX_PREVIEWS = 25;

getData()
  .then((previews) => {
    renderGallery(previews.slice(0, MAX_PREVIEWS));
  })
  .catch((err) => console.log(err.message));

renderUploadImage();
