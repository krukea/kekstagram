import { isEscapeKey } from './utility.js';
import { toggleModal } from './modal.js';
import { sendData } from './api.js';
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

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('#hashtags');
const description = uploadForm.querySelector('#description');

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

//const validateDescription = (value) => value.length <= MAX_DESC_LENGTH;

const validateForm = function (evt) {
  evt.preventDefault();

  if (hashTagsInput.value !== '') {
    pristine.addValidator(hashTagsInput, validateHashTags, getHashTagErrorMessage);
  }

  /* if (description.value !== '') {
    pristine.addValidator(
      description,
      validateDescription,
      'Длина текста не должна превышать 140 символов'
    );
  } */

  if (pristine.validate()) {
    const formData = new FormData(uploadForm);
    /*3.4. Если отправка данных прошла успешно, показывается соответствующее сообщение.
    Разметку сообщения, которая находится в блоке #success внутри шаблона template,
    нужно разместить перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на
    кнопку .success__button, по нажатию на клавишу Esc и по клику на произвольную область экрана
    за пределами блока с сообщением. */

    /*3.5. Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение.
    Разметку сообщения, которая находится в блоке #error внутри шаблона template, нужно разместить
    перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на кнопку .error__button,
    по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
    В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность
    отправить форму повторно. */

    sendData(formData)
      .then((response) => {
        toggleModal('message', false, { ok: true, msg: '' });
      })
      .catch((err) => {
        toggleModal('message', false, { ok: false, msg: err.message });
      });
  }
};

const renderUploadImage = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    toggleModal('upload');
  });

  uploadForm.addEventListener('submit', validateForm);
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

export { renderUploadImage, clearUploadForm };
