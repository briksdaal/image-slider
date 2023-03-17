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

  let mainPosition = 0;
  const numOfImgs = imgs.length;
  const sliderWidth = width * numOfImgs;

  wideDiv.style.transform = `translateX(${-mainPosition * width}px)`;

  /* slide position functions */

  function changePosition(newPosition) {
    dotsArray[mainPosition % numOfImgs].classList.remove('active');
    dotsArray[newPosition % numOfImgs].classList.add('active');
    mainPosition = newPosition;
    wideDiv.style.transform = `translateX(${-mainPosition * width}px)`;
  }

  function prevSlide() {
    let newPosition = mainPosition - 1;
    if (newPosition < 0) {
      newPosition = numOfImgs - 1;
    }
    changePosition(newPosition);
  }

  function nextSlide() {
    let newPosition = mainPosition + 1;
    if (newPosition > numOfImgs - 1) {
      newPosition = 0;
    }
    changePosition(newPosition);
  }

  function findSlideByDot(e) {
    const newPosition = +e.target.dataset.position;
    changePosition(newPosition);
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
