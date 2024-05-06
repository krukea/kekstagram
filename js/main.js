import { getData, sendData } from './api.js';
import { renderGallery } from './gallery.js';
import { renderUploadImage } from './upload.js';
import { toggleModal } from './modal.js';
import { showAlert, showSuccessMessage, showErrorMessage } from './message.js';
import { onFormSubmit } from './upload.js';

const MAX_PREVIEWS = 25;

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    toggleModal('upload');
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data.slice(0, MAX_PREVIEWS));
} catch (error) {
  showAlert(error.message);
}

renderUploadImage();
