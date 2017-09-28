import SliderItem from "./sliderItem";
import SliderIndicator from './sliderIndicator'
import SliderIndicators from "./sliderIndicators";

export default class Slider {

    constructor(options) {

        this.el = document.querySelector(options.el)
        this.slidesUrl = options.slidesUrl
        this.slides = []
        this.sliderIndicators = null

        this.getSlides().then(slides => {

            for(let slide of slides) {

                let newSlide = new SliderItem(slide)
                this.slides.push(newSlide)

            }

            this.sliderIndicators = new SliderIndicators({
                slides : this.slides
            })



            this.render()

        });
    }

    getSlides() {

        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();

            req.onreadystatechange = function (event) {

                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    }
                }
            };

            req.open('GET', this.slidesUrl, true);
            req.send(null);
        });
    }

    render() {

        this.template = `
            <div class="slider">
                <button class="slider__control slider__left-control">
                    <img src="./icons/components/slider/left_control.png" alt="">
                </button>
                <div class="slider__wrapper">
                    <div class="slider__interface">
                        <div class="slider__content">
                             ${this.slides.map((slide, index) => slide.el.innerHTML.trim()).join('')}
                        </div>
                    </div>
                    ${this.sliderIndicators.el.innerHTML}
                </div>
                <button class="slider__control slider__right-control">
                    <img src="./icons/components/slider/right_control.png" alt="">
                </button>
            </div>
        
        `

        this.el.innerHTML += this.template
    }
}