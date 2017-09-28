export default class SliderIndicator {

    constructor(props) {

        this.el = document.createElement('button')
        this.props = props

        this.render()
    }

    render() {

        this.el.classList.add('slider__indicators__indicator')

        this.template = `
             <img class="slider__indicators__indicator__picture" src="${this.props.image}" alt="">
         
            `

        this.el.innerHTML += this.template;



    }
}