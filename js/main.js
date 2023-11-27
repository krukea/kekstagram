import './utility.js';
import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';

const generatedPhotos = generatePhotos();
renderGallery(generatedPhotos);
