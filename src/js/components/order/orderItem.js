export default class OrderItem {

    constructor(el) {
        this.el = el;
        this.icon = this.el.querySelector('.order__profile__icon ');
        this.status = this.el.querySelector('.order__profile__status ');
        this.button = this.el.querySelector('.button');

        this.initEvents();
    }

    initEvents() {
        this.el.addEventListener('mouseenter', () => this.hoverIn());
        this.el.addEventListener('mouseleave', () => this.hoverOut());
    }

    hoverIn() {

        TweenLite.to(this.icon, 0.4, {
            x: 20,
            ease: Quad.easeOut
        });

        TweenLite.to(this.status, 0.4, {
            x: -20,
            ease: Quad.easeOut
        });


        TweenLite.to(this.button, 0.4, {
            y: "-50%",
            opacity: 1,
            ease: Quad.easeOut
        });
    }

    //animate out
    hoverOut() {

        TweenLite.to([this.status, this.icon], 0.4, {
            x: 0,
            ease: Quad.easeOut
        });

        TweenLite.to(this.button, 0.4, {
            y: 30,
            opacity: 0,
            ease: Quad.easeOut
        });


    }
}