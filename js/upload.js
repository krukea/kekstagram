import { toggleModal } from './modal.js';
import { changeScale, changeFilter, createSlider } from './edit-photo.js';

const TAGS_ERRORS = {
  length: 'Превышено количество хэш-тегов',
  repeat: 'Хэш-теги повторяются',
  invalid: 'Введён невалидный хэш-тег'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('#hashtags');
const description = uploadForm.querySelector('#description');

const clearUploadForm = () => {
  document.querySelector('.img-upload__input').value = '';
  hashTagsInput.value = '';
  description.value = '';
};

let hashErrors;
const validateHashTags = (value) => {
  hashErrors = [];
  const hashTags = value.trim().split(' ');
  if (hashTags.length > 5) {
    if (!hashErrors.includes('length')) {
      hashErrors.push('length');
    }
    return false;
  }

  const checkedHashTags = [];
  hashTags.forEach((tag) => {
    if (checkedHashTags.includes(tag)) {
      if (!hashErrors.includes('repeat')) {
        hashErrors.push('repeat');
      }
      return false;
    }

    const check = /^#[a-zа-яё0-9]{1,19}$/i;
    if (!check.test(tag)) {
      if (!hashErrors.includes('invalid')) {
        hashErrors.push('invalid');
      }

      return false;
    }

    checkedHashTags.push(tag);
  });

  if (checkedHashTags.length === hashTags.length) {
    hashErrors = [];
    return true;
  }
};

const getHashTagErrorMessage = () => hashErrors.map((item) => TAGS_ERRORS[item]);

const validateDescription = (value) => value.length <= 140;

const validateForm = function (evt) {
  evt.preventDefault();

  const pristine = new Pristine(
    uploadForm,
    {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__field--invalid',
      successClass: 'img-upload__field--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'span',
      errorTextClass: 'img-upload__error'
    },
    false
  );

  if (hashTagsInput.value !== '') {
    pristine.addValidator(hashTagsInput, validateHashTags, getHashTagErrorMessage);
  }
  if (description.value !== '') {
    pristine.addValidator(
      description,
      validateDescription,
      'Длина текста не должна превышать 140 символов'
    );
  }

  if (pristine.validate()) {
    const formData = new FormData(uploadForm);
    for (const [key, value] of formData) {
      console.log(`${key}: ${value}\n`);
    }
    //uploadForm.submit();
  }
};

const renderUploadImage = () => {
  const uploadBtn = document.querySelector('.img-upload__control');
  uploadBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleModal('upload');
  });

  uploadForm.addEventListener('submit', validateForm);
  uploadForm.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  /* Edit image */
  const scaleUpBtn = document.querySelector('.scale__control--bigger');
  const scaleDownBtn = document.querySelector('.scale__control--smaller');
  scaleUpBtn.addEventListener('click', changeScale);
  scaleDownBtn.addEventListener('click', changeScale);

  const filterOptions = uploadForm.querySelectorAll('.effects__radio');
  filterOptions.forEach(() => {
    addEventListener('change', changeFilter);
  });

  createSlider();
};

export { renderUploadImage, clearUploadForm };
