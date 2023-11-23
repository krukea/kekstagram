import { renderComments, onLoadCommentsClick } from './comments.js';

const fullSizeContainer = document.querySelector('.big-picture');
const fullSizeImg = fullSizeContainer.querySelector('.big-picture__img img');
const likesCount = fullSizeContainer.querySelector('.likes-count');
const commentsList = fullSizeContainer.querySelector('.social__comments');
const commentsCount = fullSizeContainer.querySelector('.comments-count');
const caption = fullSizeContainer.querySelector('.social__caption');
const loadCommentsBtn = fullSizeContainer.querySelector('.comments-loader');

const renderFullImg = (imgElement) => {
  fullSizeImg.src = imgElement.url;
  fullSizeImg.alt = imgElement.description;
  likesCount.textContent = imgElement.likes;

  const commentsNumber = imgElement.comments.length;
  if (commentsNumber > 0) {
    commentsCount.textContent = commentsNumber;
    commentsList.append(renderComments(imgElement.comments));

    if (commentsNumber > 5) {
      loadCommentsBtn.classList.remove('hidden');
      loadCommentsBtn.addEventListener('click', onLoadCommentsClick);
    }
  }

  caption.textContent = imgElement.description;
};

const clearFullImg = () => {
  fullSizeImg.src = '';
  likesCount.textContent = '';
  commentsCount.textContent = '';
  commentsList.innerHTML = '';
  caption.textContent = '';

  loadCommentsBtn.classList.add('hidden');
  loadCommentsBtn.removeEventListener('click', onLoadCommentsClick);
};

export { fullSizeContainer, renderFullImg, clearFullImg, loadCommentsBtn };
