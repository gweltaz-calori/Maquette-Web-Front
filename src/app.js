import './assets/styles/style.scss';

// Le slider est réutilisable et indépendant
// possible d'ajouter un autre slider dans une autre div

import Slider from './newjs/slider'

let productSlider = new Slider({
    el : ".news__content",
    slidesUrl : "./slides.json"
});

