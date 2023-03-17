import './slider_style.css';
import getSliderElements from './slider_elements';

const slider = (imgs, width, height, autoscroll, infinite) => {
  const {
    imageSlider,
    wideDiv,
    dotsArray,
    prevBtn,
    nextBtn,
  } = getSliderElements(imgs, width, height);

  const numOfImgs = imgs.length;
  const sliderWidth = width * numOfImgs;
  const positions = {
    left: numOfImgs,
    main: 0,
    right: -numOfImgs,
  };

  wideDiv.style.transform = 'translateX(0px)';

  const wideDivRight = wideDiv.cloneNode(true);
  const wideDivLeft = wideDiv.cloneNode(true);
  if (infinite) {
    wideDiv.parentNode.insertBefore(wideDivLeft, wideDiv);
    wideDiv.parentNode.appendChild(wideDivRight);
    wideDivRight.style.transform = `translateX(${-positions.right * width}px)`;
    wideDivLeft.style.transform = `translateX(${-positions.left * width}px)`;
  }
  /* slide position functions */

  function changePosition(newPositions) {
    // dotsArray[positions.main % numOfImgs].classList.remove('active');
    // dotsArray[newPositions.main % numOfImgs].classList.add('active');
    Object.keys(positions).forEach((pos) => {
      if (Math.abs(newPositions[pos]) === numOfImgs * 2) {
        positions[pos] = newPositions[pos] / (-2);
      } else {
        positions[pos] = newPositions[pos];
      }
    });
    wideDiv.style.transform = `translateX(${-positions.main * width}px)`;
    wideDivRight.style.transform = `translateX(${-positions.right * width}px)`;
    wideDivLeft.style.transform = `translateX(${-positions.left * width}px)`;
  }

  function prevSlide() {
    if (!infinite) {
      let newPosition = mainPosition - 1;
      if (newPosition < 0) {
        newPosition = numOfImgs - 1;
      }
      changePosition(newPosition);
    } else {
      const newPositions = { ...positions };
      Object.keys(newPositions).forEach((pos) => { newPositions[pos] -= 1; });
      changePosition(newPositions);
    }
  }

  function nextSlide() {
    if (!infinite) {
      const newPositions = positions;
      newPositions.main = positions.main + 1;
      if (newPositions.main > numOfImgs - 1) {
        newPositions.main = 0;
      }
      changePosition(newPositions);
    } else {
      const newPositions = { ...positions };
      Object.keys(newPositions).forEach((pos) => { newPositions[pos] += 1; });
      changePosition(newPositions);
    }
  }

  function findSlideByDot(e) {
    const newPosition = +e.target.dataset.position;
    // changePosition(newPosition);
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
