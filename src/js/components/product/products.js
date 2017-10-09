import ProductItem from "./productItem";
import {TimelineMax,TweenLite} from 'gsap'

export default class Products {

    constructor(options) {

        this.el = document.querySelector(options.el);
        this.productsEl = this.el.querySelector(options.productsEl);
        this.productsUrl = options.productsUrl;
        this.products = [];
        this.computedProducts = []
        this.hydrating = false

        this.getProducts().then(products => {

            this.initComponents(products);
            this.render();
            this.init();
            this.initEvents();
            this.sortProducts(false); //sort at load

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
        this.computedProducts = this.products

    }

    initEvents() {


        if(this.searchInput) {
            this.searchInput.addEventListener('input',() => this.searchProducts())
        }
        this.filter.addEventListener('change',() => this.sortProducts())

    }

    sortProducts(isAnimation = true) {
        this.computedProducts = this.computedProducts.sort((productA,productB) => this.compare(productA.props,productB.props))
        this.render(isAnimation)
    }

    searchProducts() {

        let value = this.searchInput.value;
        this.computedProducts = this.products.filter(product => product.props.name.toUpperCase().includes(value.toUpperCase()))

        this.render(true)
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
        this.searchInput = this.el.querySelector('.filter__search__order')

    }

    //render + animations du sort
    render(isAnimation) {

        for(let product of this.computedProducts) {
            product.position = product.el.getBoundingClientRect() //obtenir la position de chaque élément avant de les supprimer
        }

        this.productsEl.innerHTML = ""; //reset le html

        this.computedProducts.forEach(product => { //ajouter chaque produit au html

            let el = product.el;
            this.productsEl.appendChild(el)

        })

        //si pas d'anim pas la peine d'aller plus loin
        if(!isAnimation)
            return;

        //animations
        this.computedProducts.forEach(product => {

            let el = product.el
            let style = el.style;
            let newPosition = el.getBoundingClientRect()

            let x = product.position.left - newPosition.left;
            let y = product.position.top - newPosition.top;

            if(product.position.x == 0 || product.position.y ==0) //pas besoin d'animer si l'élément n'existait pas
                return;

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

        if(this.computedProducts.length == 0) {

            let noProducts = document.createElement('div')
            noProducts.classList.add('products__content_list--no-products')
            noProducts.textContent = "Aucun produit trouvé pour votre recherche"

            this.productsEl.appendChild(noProducts)
        }


    }



}