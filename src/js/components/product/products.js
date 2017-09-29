import ProductItem from "./productItem";

export default class Products {

    constructor(options) {

        this.el = document.querySelector(options.el);
        this.productsEl = this.el.querySelector(options.productsEl);
        this.productsUrl = options.productsUrl;

        this.products = []

        this.getProducts().then(products => {
            this.initComponents(products);
            this.render();
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

    }

    render() {

        for(let product of this.products) {
            this.productsEl.appendChild(product.el);
        }

        this.filter = this.el.querySelector('.filter__order')


    }

}