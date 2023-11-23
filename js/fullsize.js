const fullSizeContainer = document.querySelector('.big-picture');
const fullSizeImg = fullSizeContainer.querySelector('.big-picture__img img');
const likesCount = fullSizeContainer.querySelector('.likes-count');
const caption = fullSizeContainer.querySelector('.social__caption');
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

const renderFullImg = (imgElement) => {
  fullSizeImg.src = imgElement.url;
  fullSizeImg.alt = imgElement.description;
  likesCount.textContent = imgElement.likes;
  caption.textContent = imgElement.description;
};

const clearFullImg = () => {
  fullSizeImg.src = '';
  fullSizeImg.alt = '';
  likesCount.textContent = '';
  caption.textContent = '';
};

export { fullSizeContainer, renderFullImg, clearFullImg, loadCommentsBtn };
