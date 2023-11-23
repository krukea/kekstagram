/* eslint-disable no-use-before-define */
import { fullSizeContainer, loadCommentsBtn } from './fullsize.js';

const MAX_COMMENTS = 5;

const commentsList = fullSizeContainer.querySelector('.social__comments');
const commentsCount = fullSizeContainer.querySelector('.comments-count');

const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

const createComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const onLoadCommentsClick = () => {
  // load 5 more comments
  renderComments();
  // if no more comments hide btn
  loadCommentsBtn.classList.add('hidden');
};

const renderComments = (comments) => {
  const commentsNumber = comments.length;
  if (commentsNumber > 0) {
    commentsCount.textContent = commentsNumber;

    const commentsFragment = document.createDocumentFragment();
    comments.forEach((comment) => {
      const commentElement = createComment(comment);
      commentsFragment.append(commentElement);
    });

    commentsList.append(commentsFragment);

    if (commentsNumber > 5) {
      loadCommentsBtn.classList.remove('hidden');
      loadCommentsBtn.addEventListener('click', onLoadCommentsClick);
    }
  }
};

const clearComments = () => {
  commentsCount.textContent = '';
  commentsList.innerHTML = '';

  loadCommentsBtn.classList.add('hidden');
  loadCommentsBtn.removeEventListener('click', onLoadCommentsClick);
};

export { renderComments, clearComments };
