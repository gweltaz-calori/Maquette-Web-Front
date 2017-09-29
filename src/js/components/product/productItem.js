export default class ProductItem {

    constructor(props) {

        this.props = props;

        this.render()
    }

    render() {

        this.el = document.createElement('li');
        this.el.classList.add('products__content__list-item');

        this.template = `
            
            <article class="product">
                <header class="product__header">
                    <img class="product__header__image" src="${this.props.image}" alt="">
                </header>
                <div class="product__content">
                    <h1 class="product__content__name">${this.props.name}</h1>
                    <h2 class="product__content__color">${this.props.description}</h2>
                </div>
                <footer class="product__footer">
                    <span class="product__footer__stock">${this.props.stock} en stock</span>
                </footer>
            </article>
            
        `;

        this.el.innerHTML = this.template;
    }

}