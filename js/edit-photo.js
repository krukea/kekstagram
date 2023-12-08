const SCALE_STEP = 25;
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
let filterName;

const changeScale = (evt) => {
  const scaleUp = evt.target.classList.contains('scale__control--bigger');
  const scaleValueInput = document.querySelector('.scale__control--value');
  let scaleNumValue = parseInt(scaleValueInput.value.slice(0, -1));

  if (scaleUp) {
    if (scaleNumValue === 100) {
      return;
    }

    scaleNumValue += SCALE_STEP;
  } else {
    if (scaleNumValue === SCALE_STEP) {
      return;
    }

    scaleNumValue -= SCALE_STEP;
  }

  scaleValueInput.value = scaleNumValue + '%';
  imgPreview.style.transform = `scale(${scaleNumValue / 100})`;
};

const createSlider = () => {
  sliderContainer.classList.add('hidden');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = sliderValue;
    changeFilterIntensity(filterName, sliderValue);
  });
};

const setFilterOptions = ({ min, max, start, step }) => {
  sliderElementValue.value = start;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step
  });
};

const changeFilterIntensity = (filterName, filterIntensity) => {
  let suffix = '';
  switch (filterName) {
    case 'invert':
      suffix = '%';
      break;
    case 'blur':
      suffix = 'px';
      break;
  }

  imgPreview.style.filter = `${filterName}(${filterIntensity}${suffix})`;
};

const changeFilter = (evt) => {
  const filterType = evt.target.value;

  if (filterType === 'none') {
    imgPreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    sliderElementValue.value = 0;
    return;
  }

  sliderContainer.classList.remove('hidden');
  filterName = filterType;
  let filterOptions = {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1
  };

  switch (filterType) {
    case 'chrome':
      filterName = 'grayscale';
      break;
    case 'marvin':
      filterName = 'invert';

      filterOptions.max = 100;
      filterOptions.start = 100;
      filterOptions.step = 1;
      break;
    case 'phobos':
      filterName = 'blur';

      filterOptions.max = 3;
      filterOptions.start = 3;
      break;
    case 'heat':
      filterName = 'brightness';

      filterOptions.min = 1;
      filterOptions.max = 3;
      filterOptions.start = 3;
      break;
  }

  imgPreview.style.filter = changeFilterIntensity(filterName, filterOptions.start);

  setFilterOptions(filterOptions);
};

export { changeScale, changeFilter, createSlider };
