import './utility.js';
import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { renderUploadImage } from './upload.js';

const generatedPhotos = generatePhotos();
renderGallery(generatedPhotos);
renderUploadImage();
