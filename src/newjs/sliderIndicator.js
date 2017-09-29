import Bus from "./bus";

export default class SliderIndicator {

    constructor(props) {

        this.el = document.createElement('button');
        this.props = props;

        this.render();
        this.initEvents()
    }

    initEvents() {

        this.el.addEventListener('click', this.move.bind(this));
        Bus.$on('sliderMoved', this.sliderMoved.bind(this));
    }

    sliderMoved(data) {

        if (data.detail.currentSlide == this.props.id) {
            this.el.classList.add('slider__indicators__indicator--active');
        }
        else {
            this.el.classList.remove('slider__indicators__indicator--active');
        }

    }

    move() {
        Bus.$emit('sliderMovedIndicator', {
            currentSlide: this.props.id
        });
    }

    render() {

        this.el.classList.add('slider__indicators__indicator');

        let slider__indicators__indicator__picture = document.createElement('img');
        slider__indicators__indicator__picture.classList.add('slider__indicators__indicator__picture');
        slider__indicators__indicator__picture.setAttribute('src',this.props.image);

        this.el.appendChild(slider__indicators__indicator__picture)

    }
}