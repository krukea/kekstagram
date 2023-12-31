const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNumber, getRandomArrayElement, createRandomIdGenerator, isEscapeKey };
