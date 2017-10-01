import ProductItem from "./productItem";
import {TimelineMax,TweenLite} from 'gsap'

export default class Products {

    constructor(options) {

        this.el = document.querySelector(options.el);
        this.productsEl = this.el.querySelector(options.productsEl);
        this.productsUrl = options.productsUrl;
        this.products = [];
        this.hydrating = false

        this.getProducts().then(products => {

            this.initComponents(products);
            this.render();
            this.init();
            this.initEvents();
            //this.sortProducts(); //sort at load

        });

    }

    getProducts() {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();

            req.onreadystatechange = function (event) {

                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    }
                }
            };

            req.open('GET', this.productsUrl, true);
            req.send(null);
        });
    }

    initComponents(products) {
        for(let product of products) {
            let productItem = new ProductItem(product);
            this.products.push(productItem);
        }

    }

    initEvents() {
        this.filter.addEventListener('change',() => this.sortProducts())
    }

    sortProducts() {
        this.products = this.products.sort((productA,productB) => this.compare(productA.props,productB.props))
        this.render()
    }

    compare(a,b) {
        if (a[this.filter.value] < b[this.filter.value])
            return -1;
        if (a[this.filter.value] > b[this.filter.value])
            return 1;
        return 0;
    }

    init() {
        this.filter = this.el.querySelector('.filter__order__sort')
    }


    render() {

        for(let product of this.products) {
            product.position = product.el.getBoundingClientRect() //obtenir la position de chaque élément avant de les supprimer
        }

        this.productsEl.innerHTML = ""; //reset le html

        this.products.forEach(product => { //ajouter chaque produit au html

            let el = product.el;
            this.productsEl.appendChild(el)

        })

        //appeller getBoundingClientRect seulement quand tous les éléments ont été ajoutés à la liste
        this.products.forEach(product => {

            let el = product.el
            let style = el.style;
            let newPosition = el.getBoundingClientRect()

            let x = product.position.left - newPosition.left;
            let y = product.position.top - newPosition.top;

            el.style.transform = `translateX(${x}px) translateY(${y}px)`
            el.style.transition = `transform 0s`

            el.clientHeight
            el.style.transition = `transform 0.3s`
            el.style.transform = `translateX(0px) translateY(0px)`

            el.addEventListener("transitionend",() => {
                el.style.transform = ''
                el.style.transition = ''
            })
        })


    }



}