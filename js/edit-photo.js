const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_FILTER = 'none';
const scaleValueInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
let chosenFilter = DEFAULT_FILTER;

const filterOptions = {
  none: {
    style: '',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  chrome: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const changeScale = (value) => {
  scaleValueInput.value = value + '%';
  imgPreview.style.transform = `scale(${value / 100})`;
};

const scaleUp = () => {
  changeScale(Math.min(parseInt(scaleValueInput.value) + SCALE_STEP, MAX_SCALE));
};

const scaleDown = () => {
  changeScale(Math.max(parseInt(scaleValueInput.value) - SCALE_STEP, MIN_SCALE));
};

const resetScale = () => changeScale(DEFAULT_SCALE);

const resetFilter = () => {
  console.log(document.querySelector('.img-upload__preview').querySelector('img'));
  document.querySelector('.img-upload__preview').querySelector('img').style.filter = '';
};

const hideSlider = () => {
  resetFilter();
  sliderContainer.classList.add('hidden');
  sliderElementValue.value = 0;
};

const showSlider = () => {
  if (sliderContainer.classList.contains('hidden')) {
    sliderContainer.classList.remove('hidden');
  }
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    resetFilter();
    sliderElementValue.value = 0;
    sliderElement.noUiSlider.destroy();
  }
};

const createSlider = () => {
  if (sliderElement.noUiSlider) {
    return;
  }
  
  if (chosenFilter === DEFAULT_FILTER) {
    hideSlider();
  }

  showSlider();
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
    changeFilterOpacity(filterOptions[chosenFilter], sliderValue);
  });
};

const setFilterOptions = ({ min, max, step }) => {
  sliderElementValue.value = max;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });
};

const changeFilterOpacity = ({ style, start, unit }, value = start) => {
  imgPreview.style.filter = `${style}(${value}${unit})`;
};

const changeFilter = (evt) => {
  const filterType = evt.target.value;

  if (filterType === DEFAULT_FILTER) {
    hideSlider();
    return;
  }

  showSlider();

  chosenFilter = filterType;
  const newFilter = filterOptions[filterType];

  imgPreview.style.filter = changeFilterOpacity(newFilter);

  setFilterOptions(newFilter);
};

export { scaleUp, scaleDown, resetScale, changeFilter, resetFilter, createSlider, destroySlider };
