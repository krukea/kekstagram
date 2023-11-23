const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreview = ({ id, url, description, likes, comments }) => {
  const previewElement = previewTemplate.cloneNode(true);
  previewElement.dataset.id = id;
  previewElement.querySelector('.picture__img').src = url;
  previewElement.querySelector('.picture__img').alt = description;
  previewElement.querySelector('.picture__likes').textContent = likes;
  previewElement.querySelector('.picture__comments').textContent = comments.length;

  return previewElement;
};

const renderPreviews = (pictures, container) => {
  const previewsFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const preview = createPreview(picture);
    previewsFragment.append(preview);
  });

  container.append(previewsFragment);
};

export { renderPreviews };
