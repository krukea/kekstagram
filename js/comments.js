/* eslint-disable no-unused-vars */
import { fullSizeContainer } from './fullsize.js';
import { loadCommentsBtn } from './modal.js';

const COMMENTS_PER_LOAD = 5;

const commentsList = fullSizeContainer.querySelector('.social__comments');
const commentsCount = fullSizeContainer.querySelector('.comments-count');
const commentsLoadedCount = fullSizeContainer.querySelector('.comments-loaded-count');

let commentsShown = 0;
let comments = [];

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

const renderComments = (comments) => {
  commentsShown = COMMENTS_PER_LOAD;

  if (commentsShown >= comments.length) {
    loadCommentsBtn.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    loadCommentsBtn.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    commentsFragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);
  commentsLoadedCount.textContent = commentsShown;
  commentsCount.textContent = comments.length;
};

const clearComments = () => {
  commentsShown = 0;
  commentsCount.textContent = '';
  commentsList.innerHTML = '';

  loadCommentsBtn.classList.add('hidden');
};

export { renderComments, clearComments };
