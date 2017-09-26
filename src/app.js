import './assets/styles/style.scss';

import Slider from "./js/slider";


var productSlider = new Slider({
    el : ".slider",
    elContent : ".slider__content",
    controls : {
        left : ".slider__left-control",
        right : ".slider__right-control"
    },
    slidesUrl : "http://localhost:3001/",

});

productSlider.init();


