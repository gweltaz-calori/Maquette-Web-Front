import SliderItem from "./sliderItem";

var Slider = function (options) {

    this.el = document.querySelector(options.el);
    this.elContent = document.querySelector(options.elContent);
    this.slidesUrl = options.slidesUrl;
    this.template = options.template;
    this.controls = this.initControls(options.controls);

    this.slides = options.slides || [];
    this.currentSlide = 0;

};

Slider.prototype.init = function () {

    this.getSlides().then(slides => {

        for (let slide of slides) {

            var sliderItem = new SliderItem(slide);
            var slideHTML = sliderItem.render();

            this.elContent.innerHTML += slideHTML;

            sliderItem.el = this.elContent.querySelector('.slider__slide');

            this.slides.push(sliderItem);
        }

        this.max = this.slides.length - 1;

        this.setEvents();

    });
};

Slider.prototype.initControls = function (controls) {

    var domControls = {};
    Object.keys(controls).forEach(control => {

        domControls[control] = this.el.querySelector(controls[control]);
    });

    return domControls;
};


Slider.prototype.setEvents = function () {

    this.controls.left.addEventListener("click", this.moveSlide.bind(this, -1));
    this.controls.right.addEventListener("click", this.moveSlide.bind(this, 1));
};


Slider.prototype.moveSlide = function (dir) {

    this.slides[this.currentSlide].classList.remove('.slider__slide--appear');

    this.currentSlide = Math.max(0, Math.min(this.max, this.currentSlide + dir));

    this.slides[this.currentSlide].classList.add('.slider__slide--appear');

};

Slider.prototype.getSlides = function () {
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
};


export default Slider;