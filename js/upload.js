import { toggleModal } from './modal.js';

const validateHashTags = (value) => {
  const hashTags = value.split(' ');
  if (hashTags.length > 5) {
    return false;
  }

  const checkedHashTags = [];
  hashTags.forEach((tag) => {
    if (checkedHashTags.includes(tag)) {
      return false;
    }

    const check = /^#[a-zа-яё0-9]{1,19}$/i;
    if (!check.test()) {
      return false;
    }

    checkedHashTags.push(tag);
  });

  return checkedHashTags.length > 0;
};

const validateDescription = (value) => value.length <= 140;

/*если фокус находится в поле ввода хэш-тега или комментария, нажатие на Esc не должно приводить к закрытию формы
  редактирования изображения. */

const validateForm = function (evt) {
  evt.preventDefault();

  const uploadForm = this;
  const pristine = new Pristine(
    uploadForm,
    {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'form__item--invalid',
      successClass: 'form__item--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'span',
      errorTextClass: 'form__error'
    },
    false
  );

  const hashTags = uploadForm.querySelector('#hashtags');
  const description = uploadForm.querySelector('#description');
  if (hashTags.value !== '') {
    pristine.addValidator(hashTags, validateHashTags, 'hash error');
  }
  if (description.value !== '') {
    pristine.addValidator(description, validateDescription, 'description error');
  }

  if (pristine.validate()) {
    uploadForm.submit();
  }
};

const renderUploadImage = () => {
  const uploadBtn = document.querySelector('.img-upload__control');
  uploadBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleModal('upload');
  });

  const form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', validateForm);
};

export { renderUploadImage };
