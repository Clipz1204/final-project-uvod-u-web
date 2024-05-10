const apiKey = '0eb06bfe-223f-43e6-92a3-4d0775b8df29';

const cardIds = [
  'base1-58',
  'base1-4',
  'sv4-1',
  'sv4-2',
  'sv4-3',
  'sv4pt5-1',
  'sv4pt5-2',
  'sv4pt5-3',
  'sv5-1',
  'sv5-2',
  'sv5-3',
];
const containers = [
  '.pikachu',
  '.charazard',
  '.card-1',
  '.card-2',
  '.card-3',
  '.card-4',
  '.card-5',
  '.card-6',
  '.card-7',
  '.card-8',
  '.card-9',
];

function displayCard(cardId, container) {
  fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const card = data.data;

      const cardImage = document.createElement('img');
      cardImage.src = card.images.small;
      cardImage.alt = card.name;

      const cardContainer = document.querySelector(container);
      cardContainer.appendChild(cardImage);
    })
    .catch((error) => {
      console.error('Error fetching card:', error);
    });
}

for (let i = 0; i < cardIds.length; i++) {
  displayCard(cardIds[i], containers[i]);
}

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//////////////// Read more button

const readMoreBtn = document.querySelector('.read-more-btn');
const text = document.querySelector('.card');

readMoreBtn.addEventListener('click', (e) => {
  text.classList.toggle('show-more');
  if (readMoreBtn.innerText === 'Read More') {
    readMoreBtn.innerText = 'Show Less';
  } else {
    readMoreBtn.innerText = 'Read More';
  }
});
