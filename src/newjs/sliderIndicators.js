import SliderIndicator from "./sliderIndicator";

export default class SliderIndicators {

    constructor(props) {

        this.el = document.createElement('div')
        this.props = props
        this.indicators = []

        for(let slide of this.props.slides) {

            let newIndicator = new SliderIndicator(slide.props)
            this.indicators.push(newIndicator)
        }



        this.render()
    }

    initEvents() {
        for(let indicator of this.indicators) {
            indicator.initEvents()
        }
    }

    render() {

        this.el.classList.add('slider__indicators')


        this.template = `
          
            <div class="slider__indicators__wrapper">
                ${this.indicators.map((indicator, index) => indicator.el.outerHTML.trim()).join('')}
            </div>
            
            `

        this.el.innerHTML = this.template;

    }
}