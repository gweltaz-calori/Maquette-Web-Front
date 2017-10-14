export default class SliderItem {

    constructor(props) {

        this.el = document.createElement('article');
        this.props = props;
        this.props.imageUrl = require('../../../images/sections/new/'+this.props.image+'.jpeg');
        this.render();

    }


    /**
     * Render a slider item
     */
    render() {

        this.el.classList.add('slider__slide');
        this.el.innerHTML = `
            <header class="slider__slide__header">
                <img class="slider__slide__picture" src="${this.props.imageUrl}" alt="">
            </header>
            <div class="slider__slide__content">
                <h1 class="slider__slide__title">${this.props.title}</h1>
                <p class="slider__slide__description">
                    ${this.props.description}
                </p>
                <a href="${this.props.url}" class="button button--normal slider__slide__order">
                    <div class="button__wrapper">
                        <span class="button__content">commander</span>
                        <span class="button__content button__content--over">commander</span> 
                        <img class="button__icon" src="${require('../../../icons/black_arrow_right.png')}" alt="">
                        <img class="button__icon button__icon--over" src="${require('../../../icons/green_arrow_right.png')}" alt="">
                    </div>
                    <div class="button__background button__background--over"></div>
                </a>
            </div>
            
        `;

    }


}