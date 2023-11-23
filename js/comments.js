import { loadCommentsBtn } from './fullsize.js';

const MAX_COMMENTS = 5;

const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i <= MAX_COMMENTS; i++) {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;

    commentsFragment.append(commentElement);
  }

  return commentsFragment;
};

const onLoadCommentsClick = () => {
  // load 5 more comments
  renderComments();
  // if no more comments hide btn
  loadCommentsBtn.classList.add('hidden');
};

export { renderComments, onLoadCommentsClick };
