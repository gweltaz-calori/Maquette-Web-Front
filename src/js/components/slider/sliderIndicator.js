import Bus from "../../utils/bus";

export default class SliderIndicator {

    constructor(props) {

        this.el = document.createElement('button');
        this.props = props;

        this.render();
        this.initEvents();
        this.initBusEvents();
    }

    /**
     * Init all events
     */
    initEvents() {
        this.el.addEventListener('click', () => this.move());
    }

    /**
     * Init all bus events
     */
    initBusEvents() {
        Bus.$on('sliderMoved', (data) => this.sliderMoved(data));
    }

    /**
     * Callback when slider moved
     */
    sliderMoved(data) {

        if (data.detail.currentSlide == this.props.id) {
            this.el.classList.add('slider__indicators__indicator--active');
        }
        else {
            this.el.classList.remove('slider__indicators__indicator--active');
        }

    }

    /**
     * emit that slider moved
     */
    move() {
        Bus.$emit('sliderMovedIndicator', {
            currentSlide: this.props.id
        });
    }


    render() {

        this.el.classList.add('slider__indicators__indicator');
        this.el.innerHTML = `
            <img class="slider__indicators__indicator__picture" src="${this.props.image}" alt="">
            
        `;

    }
}