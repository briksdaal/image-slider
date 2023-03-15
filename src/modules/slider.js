import './slider_style.css';

const slider = (imgs, width, height) => {
  let position = 0;
  const numOfImgs = imgs.length;

  const imageSlider = document.createElement('div');
  imageSlider.classList.add('image-slider');

  /* slider code */

  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');
  sliderContainer.style.width = `${width}px`;
  sliderContainer.style.height = `${height}px`;

  const wideDiv = document.createElement('div');
  wideDiv.classList.add('wide-imgs-container');
  wideDiv.style.transform = `translateX(${-position * width}px)`;

  imgs.forEach((img) => {
    const imgElement = new Image();
    imgElement.src = img;
    imgElement.width = width;
    imgElement.height = height;
    imgElement.classList.add('slider-img');
    wideDiv.appendChild(imgElement);
  });

  sliderContainer.appendChild(wideDiv);

  /* interface code */

  const sliderInterface = document.createElement('div');
  sliderInterface.classList.add('slider-interface');

  const btns = document.createElement('div');
  btns.classList.add('nav-btns');
  btns.style.bottom = `${height / 2}px`;

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '‹';
  prevBtn.classList.add('prev-btn');
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '›';
  nextBtn.classList.add('next-btn');

  btns.appendChild(prevBtn);
  btns.appendChild(nextBtn);
  sliderInterface.appendChild(btns);

  const dotsContainer = document.createElement('div');
  const dotsArray = [];

  for (let i = 0; i < numOfImgs; i += 1) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) {
      dot.classList.add('active');
    }
    dot.dataset.position = i;
    dotsArray.push(dot);
    dotsContainer.appendChild(dot);
  }

  dotsContainer.classList.add('dots-container');

  sliderInterface.appendChild(dotsContainer);

  imageSlider.appendChild(sliderContainer);
  imageSlider.appendChild(sliderInterface);

  /* slide position functions */

  function changePosition(newPosition) {
    dotsArray[position].classList.remove('active');
    dotsArray[newPosition].classList.add('active');
    position = newPosition;
    wideDiv.style.transform = `translateX(${-position * width}px)`;
  }

  function prevSlide() {
    let newPosition = position - 1;
    if (newPosition < 0) {
      newPosition = numOfImgs - 1;
    }
    changePosition(newPosition);
  }

  function nextSlide() {
    let newPosition = position + 1;
    if (newPosition > numOfImgs - 1) {
      newPosition = 0;
    }
    changePosition(newPosition);
  }

  function findSlideByDot(e) {
    const newPosition = e.target.dataset.position;
    changePosition(newPosition);
  }

  /* event listeners and intervals */

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
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  dotsArray.forEach((dot) => {
    dot.addEventListener('click', (e) => findSlideByDot(e));
  });

  return imageSlider;
};

export default slider;
