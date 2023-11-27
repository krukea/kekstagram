const fullSizeContainer = document.querySelector('.big-picture');
const fullSizeImg = fullSizeContainer.querySelector('.big-picture__img img');
const likesCount = fullSizeContainer.querySelector('.likes-count');
const caption = fullSizeContainer.querySelector('.social__caption');

const renderFullImg = ({ url, description, likes }) => {
  fullSizeImg.src = url;
  fullSizeImg.alt = description;
  likesCount.textContent = likes;
  caption.textContent = description;
};

const clearFullImg = () => {
  fullSizeImg.src = '';
  fullSizeImg.alt = '';
  likesCount.textContent = '';
  caption.textContent = '';
};

export { fullSizeContainer, renderFullImg, clearFullImg };
