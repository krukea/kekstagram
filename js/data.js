import { getRandomNumber, getRandomArrayElement, createRandomIdGenerator } from './utility.js';

/* const photo = {
  id: 1, не повторяющийся 1 - 25
  url: 'photos/1.jpg', номер картинки не повторяющийся 1 - 25
  description: 'description',
  likes: 10, случайное 15 - 200
  comments: кол-во случайно 0 - 30, все комменты рандомные
  [
    {
      id: 135, любое не повторяющееся число
      avatar: 'img/avatar-6.svg', 1 - 6
      message: 'В целом всё неплохо. Но не всё.', случайно из COMMENTS
      name: 'Артём' случайно из USER_NAMES
    }
  ]
}; */

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = ['Артём', 'Даша', 'Мария', 'Алексей', 'Николай', 'Галина'];

const MAX_ID = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;

/* const generatePhotoId = createRandomIdGenerator(1, MAX_ID);
const generateCommentoId = createRandomIdGenerator(0, MAX_COMMENTS); */

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(USER_NAMES)
});

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Описание картинки',
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomNumber(0, MAX_COMMENTS) }, (_, index) =>
    createComment(index + 1)
  )
});

const generatePhotos = () => Array.from({ length: MAX_ID }, (_, index) => createPhoto(index + 1));

export { generatePhotos };
