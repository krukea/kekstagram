import { isEscapeKey } from './utility.js';
import { toggleModal } from './modal.js';
import {
  scaleUp,
  scaleDown,
  resetScale,
  changeFilter,
  createSlider,
  destroySlider
} from './edit-photo.js';

const TAGS_ERRORS = {
  length: 'Превышено количество хэш-тегов',
  repeat: 'Хэш-теги повторяются',
  invalid: 'Введён невалидный хэш-тег'
};
const MAX_HASHTAGS = 5;
const HASHTAGS_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESC_LENGTH = 140;

const SubmitButtonText = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('#hashtags');
const description = uploadForm.querySelector('#description');
const submitBtn = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  successClass: 'img-upload__field--valid',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const clearUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  destroySlider();
};

const normalizeHashtags = (value) =>
  value
    .trim()
    .split(' ')
    .filter((item) => Boolean(item.length));

let hashErrors;
const validateHashTags = (value) => {
  pristine.reset();

  hashErrors = [];
  const hashTags = normalizeHashtags(value);
  if (hashTags.length > MAX_HASHTAGS) {
    if (!hashErrors.includes('length')) {
      hashErrors.push('length');
    }
    return false;
  }

  if (!hashTags.every((tag) => HASHTAGS_PATTERN.test(tag))) {
    if (!hashErrors.includes('invalid')) {
      hashErrors.push('invalid');
    }
    return false;
  }

  const lowerCaseTags = hashTags.map((tag) => tag.toLowerCase());
  if (lowerCaseTags.length !== new Set(lowerCaseTags).size) {
    if (!hashErrors.includes('repeat')) {
      hashErrors.push('repeat');
    }
    return false;
  }

  hashErrors = [];
  return true;
};

const getHashTagErrorMessage = () => hashErrors.map((item) => TAGS_ERRORS[item]);

const toggleSubmitBtn = (isDisabled) => {
  submitBtn.disabled = isDisabled;
  submitBtn.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
};

const onFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      toggleSubmitBtn(true);
      await callback(new FormData(uploadForm));
      toggleSubmitBtn();
    }
  });
};

pristine.addValidator(hashTagsInput, validateHashTags, getHashTagErrorMessage, 1, true);

const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const renderUploadImage = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    toggleModal('upload');
  });

  uploadForm.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  /* Edit image */
  const scaleUpBtn = document.querySelector('.scale__control--bigger');
  const scaleDownBtn = document.querySelector('.scale__control--smaller');
  scaleUpBtn.addEventListener('click', scaleUp);
  scaleDownBtn.addEventListener('click', scaleDown);

  const filterOptions = uploadForm.querySelectorAll('.effects__radio');
  filterOptions.forEach((option) => {
    option.addEventListener('change', changeFilter);
  });

  createSlider();
};

export { renderUploadImage, clearUploadForm, createSlider, imgPreview, onFormSubmit };
