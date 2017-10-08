import './assets/styles/style.scss';

// Le slider est réutilisable et indépendant
// possible d'ajouter un autre slider dans une autre div

import Slider from './js/components/slider/slider'
import Products from "./js/components/product/products";
import Buttons from "./js/components/button/buttons";

let productSlider = new Slider({
    el : ".news__content",
    slidesUrl : "./slides.json",
    onComplete : () => initButtons()
});

let bestSeller = new Products({
    el : ".best-seller",
    productsEl :".products__content_list--best-seller" ,
    productsUrl : "./products.json"
});

let allModels = new Products({
    el : ".all-models",
    productsEl :".products__content_list--all-models" ,
    productsUrl : "./products.json"
});

//initializer les boutons que quand toutes les données asynchrones sont chargées
const initButtons = () => {
    let buttons = new Buttons({
        el : '.button'
    })
}
