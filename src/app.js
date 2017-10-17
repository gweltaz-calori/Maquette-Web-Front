import './js/utils/polyfills'


import './assets/styles/style.scss';
// Le slider est réutilisable et indépendant
// possible d'ajouter un autre slider dans une autre div

import Slider from './js/components/slider/slider';
import Products from "./js/components/product/products";
import Buttons from "./js/components/button/buttons";
import Orders from "./js/components/order/orders";
import Graph from "./js/components/graph/graph";


let productSlider = new Slider({
    el: ".news__content",
    slidesUrl: "./json/slides.json",
    onComplete: () => initButtons()
});

let bestSeller = new Products({
    el: ".best-seller",
    productsEl: ".products__content_list--best-seller",
    productsUrl: "./json/products.json"
});

let allModels = new Products({
    el: ".all-models",
    productsEl: ".products__content_list--all-models",
    productsUrl: "./json/products.json"
});

let graph = new Graph({
    el : ".sales__graph"
});

let orders = new Orders({
    el: '.order'
});

//initializer les boutons que quand toutes les données asynchrones sont chargées
const initButtons = () => {
    let buttons = new Buttons({
        el: '.button'
    });
};
