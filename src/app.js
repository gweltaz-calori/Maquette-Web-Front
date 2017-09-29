import './assets/styles/style.scss';

// Le slider est réutilisable et indépendant
// possible d'ajouter un autre slider dans une autre div

import Slider from './js/components/slider/slider'
import Products from "./js/components/product/products";

let productSlider = new Slider({
    el : ".news__content",
    slidesUrl : "./slides.json"
});


let products = new Products({
    el : ".best-seller",
    productsEl :".products__content_list" ,
    productsUrl : "./bestSeller.json"
});