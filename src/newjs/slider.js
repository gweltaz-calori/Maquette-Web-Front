import SliderItem from "./sliderItem";
import SliderIndicators from "./sliderIndicators";
import {TimelineMax, TweenMax} from 'gsap';
import Bus from "./bus";

export default class Slider {

    constructor(options) {

        this.el = document.querySelector(options.el);
        this.slidesUrl = options.slidesUrl;
        this.slides = [];
        this.htmlSlides = [];
        this.sliderIndicators = null;
        this.currentSlide = 0;
        this.currentSlideValue = null;
        this.animating = false;

        this.getSlides().then(slides => {

            this.initComponents(slides);
            this.render();
            this.initEvents();
            this.initElements();
            this.initStyle();
            Bus.$emit('sliderMoved', {
                currentSlide: 0
            });

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

    initEvents() {
        this.left__slider__control.addEventListener('click', this.move.bind(this, -1));
        this.right__slider__control.addEventListener('click', this.move.bind(this, 1));

        Bus.$on('sliderMovedIndicator', this.sliderMovedIndicator.bind(this));

    }

    initStyle() {
        this.htmlSlides[this.currentSlide].style.opacity = 1;
    }

    initComponents(slides) {

        slides.forEach((slide, index) => {
            slide['id'] = index;

            let newSlide = new SliderItem(slide);
            this.slides.push(newSlide);
        });


        this.sliderIndicators = new SliderIndicators({
            slides: this.slides
        });
    }

    initElements() {
        this.htmlSlides = [...this.el.querySelectorAll('.slider__slide')].reverse();
        for (let slide in this.htmlSlides) {
            this.slides[slide].el = this.htmlSlides[slide];
        }
    }

    sliderMovedIndicator(data) {
        let index = this.slides.findIndex(slide => slide.props.id == data.detail.currentSlide);
        this.slides.move(index, 1);
        this.move(1);
    }

    move(dir) {

        if (this.animating)
            return;

        let tl = new TimelineMax({

            onStart: () => {
                Bus.$emit('sliderMoved', {
                    currentSlide: this.slides[this.currentSlide + 1].props.id
                });
                this.animating = true;
            },
            onComplete: () => {

                this.slides.move(this.currentSlide, this.slides.length - 1);

                this.animating = false;

            }
        });


        let translateY = 0;
        let scale = 1;
        let rotateX = -23;
        let maxIndex = this.slides.length - 1;


        for (let i = 0; i < this.slides.length; i++) {
            tl.set(this.slides[i].el, {
                zIndex: maxIndex
            });
            maxIndex--;
        }

        for (let i = 0; i < this.slides.length; i++) {

            maxIndex--;
            tl.to(this.slides[i].el, 0.8, {
                opacity: 1,
                y: translateY,
                scale: scale,
                rotationX: rotateX,
                boxShadow: "rgba(0,0,0,.06) 0 -8px 20px 0px ",
                ease: Expo.easeOut,
                clearProps: "boxShadow"

            }, 0.2);

            translateY -= 70;
            scale -= 0.1;
        }

        tl.to(this.slides[this.currentSlide].el, 0.6, {
            z: 300,
            opacity: 0,
            y: 200,
            ease: Circ.easeInOut,
            clearProps: 'transform',

        });


        for (let i = this.currentSlide + 1; i < this.slides.length; i++) {

            let opacity = this.currentSlide + 1 == i ? 1 : 0;

            tl.to(this.slides[i].el, 1, {
                y: 0,
                scale: 1,
                rotationX: 0,
                opacity: opacity,
                ease: Power2.easeInOut,
                clearProps: 'transform'
            }, 1);
        }

    }

    render() {

        let slider = document.createElement("div");
        slider.classList.add("slider");

        this.left__slider__control = document.createElement('button');
        this.left__slider__control.classList.add('slider__control');
        this.left__slider__control.classList.add('slider__left-control');

        let slider__left__image__control = document.createElement('img');
        slider__left__image__control.setAttribute('src','./icons/components/slider/left_control.png');

        let slider__wrapper = document.createElement('div');
        slider__wrapper.classList.add('slider__wrapper');

        let slider__interface = document.createElement('div');
        slider__interface.classList.add('slider__interface');

        let slider__content = document.createElement('div');
        slider__content.classList.add('slider__content');

        this.right__slider__control = document.createElement('button');
        this.right__slider__control.classList.add('slider__control');
        this.right__slider__control.classList.add('slider__right-control');

        let slider__right__image__control = document.createElement('img');
        slider__right__image__control.setAttribute('src','./icons/components/slider/right_control.png');


        /*left control*/

        this.left__slider__control.appendChild(slider__left__image__control);


        /*slider_wrapper*/

        slider__wrapper.appendChild(slider__interface);
        slider__wrapper.appendChild(this.sliderIndicators.el);
        slider__interface.appendChild(slider__content);

        /* slider content */

        for(let slide of this.slides) {
            slider__content.appendChild(slide.el)
        }


        /*right control*/

        this.right__slider__control.appendChild(slider__right__image__control);


        /* slider */

        slider.appendChild(this.left__slider__control);
        slider.appendChild(slider__wrapper);
        slider.appendChild(this.right__slider__control);


        this.el.appendChild(slider)
    }
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};