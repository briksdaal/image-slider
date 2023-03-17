import imageSlider from './modules/slider';

import './style.css';

import Image1 from './images/image_1.jpg';
import Image2 from './images/image_2.jpg';
import Image3 from './images/image_3.jpg';
import Image4 from './images/image_4.jpg';
import Image5 from './images/image_5.jpg';
import Image6 from './images/image_6.jpg';

const imgs = [Image1, Image2, Image3, Image4, Image5, Image6];

const slider = imageSlider(imgs, 400, 300, false, true);

document.body.appendChild(slider);
