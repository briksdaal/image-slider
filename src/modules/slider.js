import './slider_style.css';
import getSliderElements from './slider_elements';

const slider = (props) => {
  const {
    imgs,
    width,
    height,
    autoscroll,
    infinite,
  } = props;

  const {
    imageSlider,
    wideDiv,
    dotsArray,
    prevBtn,
    nextBtn,
  } = getSliderElements(imgs, width, height);

  const numOfImgs = imgs.length;
  const positions = infinite ? {
    left: numOfImgs,
    main: 0,
    right: -numOfImgs,
  } : {
    main: 0,
  };

  wideDiv.style.transform = 'translateX(0px)';

  const wideDivRight = wideDiv.cloneNode(true);
  wideDivRight.dataset.container = 'right';
  const wideDivLeft = wideDiv.cloneNode(true);
  wideDivLeft.dataset.container = 'left';

  if (infinite) {
    wideDivRight.style.transform = `translateX(${-positions.right * width}px)`;
    wideDivLeft.style.transform = `translateX(${-positions.left * width}px)`;

    wideDivRight.style.zIndex = '0';
    wideDivLeft.style.zIndex = '0';

    wideDiv.parentNode.insertBefore(wideDivLeft, wideDiv);
    wideDiv.parentNode.appendChild(wideDivRight);
  }

  let activeContainer = wideDiv;
  let prevContainer = wideDivLeft;
  let activePosition = 0;
  /* slide position functions */

  function normalizePositions(newPositions) {
    const normalizedPositions = {};

    if (!infinite) {
      if (newPositions.main > numOfImgs - 1) {
        normalizedPositions.main = numOfImgs - 1;
      } else if (newPositions.main < 0) {
        normalizedPositions.main = 0;
      } else {
        normalizedPositions.main = newPositions.main;
      }
    } else {
      Object.keys(newPositions).forEach((pos) => {
        if (Math.abs(newPositions[pos]) === numOfImgs * 2) {
          normalizedPositions[pos] = newPositions[pos] / (-2);
        } else {
          normalizedPositions[pos] = newPositions[pos];
        }
      });
    }

    return normalizedPositions;
  }

  function setActiveContainer() {
    Object.keys(positions).forEach((pos) => {
      if (
        activeContainer.dataset.container !== pos
      && positions[pos] >= 0
      && positions[pos] < numOfImgs
      ) {
        prevContainer.style.zIndex = 0;
        prevContainer = activeContainer;
        activeContainer = imageSlider.querySelector(`[data-container = "${pos}"`);
        activeContainer.style.zIndex = 10;
      }
    });
  }

  function changePosition(newPositions) {
    const normalizedPositions = normalizePositions(newPositions);

    Object.keys(positions).forEach((pos) => {
      positions[pos] = normalizedPositions[pos];
    });

    setActiveContainer();

    dotsArray[activePosition].classList.remove('active');
    activePosition = positions[activeContainer.dataset.container];
    dotsArray[activePosition].classList.add('active');

    wideDiv.style.transform = `translateX(${-positions.main * width}px)`;
    wideDivRight.style.transform = `translateX(${-positions.right * width}px)`;
    wideDivLeft.style.transform = `translateX(${-positions.left * width}px)`;
  }

  function prevSlide() {
    const newPositions = { ...positions };
    Object.keys(newPositions).forEach((pos) => { newPositions[pos] -= 1; });

    changePosition(newPositions);
  }

  function nextSlide() {
    const newPositions = { ...positions };
    Object.keys(newPositions).forEach((pos) => { newPositions[pos] += 1; });

    changePosition(newPositions);
  }

  function findSlideByDot(e) {
    const slideToPosition = +e.target.dataset.position;
    const delta = slideToPosition - activePosition;
    const moveSlide = delta > 0 ? nextSlide : prevSlide;
    for (let i = 0; i < Math.abs(delta); i += 1) {
      moveSlide();
    }
  }

  /* event listeners and intervals */

  if (autoscroll) {
    let hoverFlag = false;

    setInterval(() => {
      if (!hoverFlag) {
        nextSlide();
      }
    }, 5000);

    imageSlider.addEventListener('mouseenter', () => {
      hoverFlag = true;
    });
    imageSlider.addEventListener('mouseleave', () => {
      hoverFlag = false;
    });
  }
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  dotsArray.forEach((dot) => {
    dot.addEventListener('click', (e) => findSlideByDot(e));
  });

  return imageSlider;
};

export default slider;
