import ProductItem from "./productItem";
import {TimelineMax, TweenLite} from 'gsap';

export default class Products {

    constructor(options) {

        this.el = document.querySelector(options.el);
        this.productsEl = this.el.querySelector(options.productsEl);
        this.productsUrl = options.productsUrl;
        this.products = [];

        this.getProducts().then(products => {

            this.initComponents(products);
            this.init();
            this.initEvents();
            this.render(false); //trier au chargment sans anim

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
        for (let product of products) {
            let productItem = new ProductItem(product);
            this.products.push(productItem);
        }

    }

    initEvents() {

        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.render(true));
        }
        this.filter.addEventListener('change', () => this.render(true));

    }

    //filtered list retourne une copie de la liste avec l'application des filtres et recherche (computed)
    filteredList() {
        let value = this.searchInput ? this.searchInput.value : ''; //input value
        let list = this.products; //copie de la liste

        list = list.filter(product => {
            //pour chaque propriété de l'objet on cherche
            return Object.values(product.props).reduce((a, b) => {
                return a || b.toString().toUpperCase().includes(value.toUpperCase());
            }, false);
        });

        list = list.sort((productA, productB) => this.compare(productA.props, productB.props));
        return list;
    }


    compare(a, b) {
        if (a[this.filter.value] < b[this.filter.value])
            return -1;
        if (a[this.filter.value] > b[this.filter.value])
            return 1;
        return 0;
    }

    init() {
        this.filter = this.el.querySelector('.filter__order__sort');
        this.searchInput = this.el.querySelector('.filter__search__order');

    }

    //render + animations du sort
    render(isAnimation) {

        let filteredList = this.filteredList(); //retrieve filtered list

        for (let product of filteredList) {
            product.position = product.el.getBoundingClientRect(); //obtenir la position de chaque élément avant de les supprimer
        }

        //this.productsEl.innerHTML = ""; // plante sur ie11 ???

        let firstChild = this.productsEl.firstChild; //pour ie

        while (firstChild) {
            this.productsEl.removeChild(firstChild);
            firstChild = this.productsEl.firstChild;
        }

        filteredList.forEach(product => { //ajouter chaque produit au html

            let el = product.el;
            this.productsEl.appendChild(el);


        });


        //si pas d'anim pas la peine d'aller plus loin
        if (!isAnimation)
            return;


        //animations
        filteredList.forEach(product => {

            let el = product.el;
            let style = el.style;
            let newPosition = el.getBoundingClientRect();

            let x = product.position.left - newPosition.left;
            let y = product.position.top - newPosition.top;

            if (product.position.x == 0 || product.position.y == 0) //pas besoin d'animer si l'élément n'existait pas
                return;

            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
            el.style.transition = `transform 0s`;

            el.clientHeight;
            el.style.transition = `transform 0.3s`;
            el.style.transform = `translateX(0px) translateY(0px)`;

            el.addEventListener("transitionend", () => {
                el.style.transform = '';
                el.style.transition = '';
            });
        });

        if (filteredList.length == 0) {

            let noProducts = document.createElement('div');
            noProducts.classList.add('products__content_list--no-products');
            noProducts.textContent = "Aucun produit trouvé pour votre recherche";
            this.productsEl.appendChild(noProducts);
        }


    }


}