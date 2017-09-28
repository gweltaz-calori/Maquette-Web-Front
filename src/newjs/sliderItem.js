export default class SliderItem {

    constructor(props) {

        this.el = document.createElement('article');
        this.props = props
        this.render()

    }

    render() {
        this.el.classList.add('slider__slide')
        this.template = `
            
            <header class="slider__slide__header">
                <img class="slider__slide__picture" src="${this.props.image}" alt="">
            </header>
            <div class="slider__slide__content">
                <h1 class="slider__slide__title">${this.props.title}</h1>
                <p class="slider__slide__description">
                    ${this.props.description}
                </p>
                <a href="${this.props.url}" class="button button--normal slider__slide__order">
                    <div class="button__wrapper">
                        <span class="button__content button__content--normal">commander</span>
                        <img class="button__icon" src="icons/black_arrow_right.png" alt="">
                    </div>
                </a>
            </div>
             
            `

        this.el.innerHTML = this.template;

    }


}