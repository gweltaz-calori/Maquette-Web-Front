export default class SliderItem {

    constructor(props) {

        this.el = document.createElement('article');
        this.props = props;
        this.render();

    }

    render() {
        this.el.classList.add('slider__slide');

        let slider__slide__header = document.createElement('header');
        slider__slide__header.classList.add('slider__slide__header');

        let slider__slide__picture = document.createElement('img');
        slider__slide__picture.classList.add('slider__slide__picture');
        slider__slide__picture.setAttribute('src',this.props.image);

        let slider__slide__content = document.createElement('div');
        slider__slide__content.classList.add('slider__slide__content');

        let slider__slide__title = document.createElement('h1');
        slider__slide__title.classList.add('slider__slide__title');
        slider__slide__title.textContent = this.props.title;

        let slider__slide__description = document.createElement('p');
        slider__slide__description.classList.add('slider__slide__description');
        slider__slide__description.textContent = this.props.description;

        let slider__slide__order = document.createElement('a');
        slider__slide__order.classList.add('button');
        slider__slide__order.classList.add('button--normal');
        slider__slide__order.classList.add('slider__slide__order');
        slider__slide__order.setAttribute('href',this.props.url);

        let button__wrapper = document.createElement('div');
        button__wrapper.classList.add('button__wrapper');

        let button__content = document.createElement('span');
        button__content.classList.add('button__content');
        button__content.classList.add('button__content--normal');
        button__content.textContent = "commander";

        let button__icon = document.createElement('img');
        button__icon.classList.add('button__icon');
        button__icon.setAttribute('src','icons/black_arrow_right.png');



        slider__slide__header.appendChild(slider__slide__picture);

        button__wrapper.appendChild(button__content);
        button__wrapper.appendChild(button__icon);

        slider__slide__order.appendChild(button__wrapper);

        slider__slide__content.appendChild(slider__slide__title);
        slider__slide__content.appendChild(slider__slide__description);
        slider__slide__content.appendChild(slider__slide__order);

        this.el.appendChild(slider__slide__header);
        this.el.appendChild(slider__slide__content);

    }


}