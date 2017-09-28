import Bus from "./bus";

export default class SliderIndicator {

    constructor(props) {

        this.el = document.createElement('button')
        this.props = props

        this.render()
        //this.initEvents()
    }

    initEvents() {
        let indicator = document.querySelectorAll('.slider__indicators__indicator')[this.props.id]
        indicator.addEventListener('click',this.move.bind(this))
        Bus.$on('sliderMoved',this.sliderMoved.bind(this))
    }

    sliderMoved(data) {
        let indicator = document.querySelectorAll('.slider__indicators__indicator')[this.props.id]
        if(data.detail.currentSlide == this.props.id) {
            indicator.classList.add('slider__indicators__indicator--active')
        }
        else {
            indicator.classList.remove('slider__indicators__indicator--active')
        }

    }

    move() {
        Bus.$emit('sliderMovedIndicator',{
            currentSlide : this.props.id
        })
    }

    render() {

        this.el.classList.add('slider__indicators__indicator')


        this.template = `
             <img class="slider__indicators__indicator__picture" src="${this.props.image}" alt="">
         
            `

        this.el.innerHTML += this.template;



    }
}