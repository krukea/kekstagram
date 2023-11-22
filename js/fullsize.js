import { generatedPreviews } from './previews.js';

const fullSizeContainer = document.querySelector('.big-picture');
const fullSizeImg = fullSizeContainer.querySelector('.big-picture__img img');
const likesCount = fullSizeContainer.querySelector('.likes-count');
const commentsList = fullSizeContainer.querySelector('.social__comments');
const commentsCount = fullSizeContainer.querySelector('.comments-count');
const caption = fullSizeContainer.querySelector('.social__caption');

const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

const renderFullImg = (id) => {
  const imgElement = generatedPreviews.find((item) => item.id === id);

  fullSizeImg.src = imgElement.url;
  fullSizeImg.alt = imgElement.description;
  likesCount.textContent = imgElement.likes;

  const commentsNumber = imgElement.comments.length;
  if (commentsNumber > 0) {
    commentsCount.textContent = commentsNumber;
    commentsList.append(renderComments(imgElement.comments));
  }

  caption.textContent = imgElement.description;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentElement);
  });

  return commentsFragment;
};

const clearFullImg = () => {
  fullSizeImg.src = '';
  likesCount.textContent = '';
  commentsCount.textContent = '';
  commentsList.innerHTML = '';
  caption.textContent = '';
};

export { fullSizeContainer, renderFullImg, clearFullImg };
