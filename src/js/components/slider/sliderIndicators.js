import SliderIndicator from "./sliderIndicator";

export default class SliderIndicators {

    constructor(props) {

        this.el = document.createElement('div');
        this.props = props;
        this.indicators = [];

        this.init();
    }

    /**
     * Init everything and indicators
     */
    init() {

        for (let slide of this.props.slides) {
            let newIndicator = new SliderIndicator(slide.props);
            this.indicators.push(newIndicator);
        }

        this.render();
    }

    /**
     * Render a group of sliderIndicators
     */
    render() {

        this.el.classList.add('slider__indicators');

        let slider__indicators__wrapper = document.createElement('div');
        slider__indicators__wrapper.classList.add('slider__indicators__wrapper');

        for (let indicator of this.indicators) {
            slider__indicators__wrapper.appendChild(indicator.el);
        }

        this.el.appendChild(slider__indicators__wrapper);


    }
}