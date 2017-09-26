var SliderItem = function (data) {
    this.el = null;
    this.data = data;
    this.template = `
        <article class="slider__slide">
            <header class="slider__slide__header">
                <img class="slider__slide__picture" src="{{image}}" alt="">
            </header>
            <div class="slider__slide__content">
                <h1 class="slider__slide__title">{{title}}</h1>
                <p class="slider__slide__description">
                    {{description}}
                </p>
                <a href="{{url}}" class="button button--normal slider__slide__order">
                    <div class="button__wrapper">
                        <span class="button__content button__content--normal">commander</span>
                        <img class="button__icon" src="icons/black_arrow_right.png" alt="">
                    </div>
                </a>
            </div>
        </article>
    `

};


SliderItem.prototype.render = function () {

    var templateHtml = this.template;
    var mustacheExp = new RegExp("(?:{{(.+)}})","g");

    var generatedHtml = templateHtml.replace(mustacheExp,(match,content) => {
        return this.data[content]
    });

    return generatedHtml;
};


export default SliderItem