import {TweenLite} from 'gsap';

export default class Button {

    constructor(options) {

        this.el = options.el;

        this.background = options.el.querySelector('.button__background');
        this.overBackground = options.el.querySelector('.button__background--over');

        this.overText = options.el.querySelector('.button__content--over');
        this.text = options.el.querySelector('.button__content');

        this.icon = options.el.querySelector('.button__icon');
        this.overIcon = options.el.querySelector('.button__icon--over');

        this.init();
    }

    init() {
        this.initEvents();

    }

    initEvents() {

        this.el.addEventListener('mouseenter', () => this.hoverIn());
        this.el.addEventListener('mouseleave', () => this.hoverOut());

    }

    //animate in
    hoverIn() {

        //il y a certains ca ou on ne veut pas animer licon
        if (this.overIcon) {
            TweenLite.to(this.overIcon, 0.3, {
                opacity: 1,
                y: "-50%",
                ease: Quart.easeOut
            });

            TweenLite.set(this.overIcon, {
                y: 10,
            });

            TweenLite.to(this.icon, 0.3, {
                opacity: 0,
                y: -10,
                ease: Quart.easeOut
            });
        }

        TweenLite.set(this.overText, {
            y: 10,
        });

        TweenLite.to(this.overText, 0.3, {
            opacity: 1,
            y: "-50%",
            ease: Quart.easeOut
        });

        //over background
        TweenLite.set(this.overBackground, {
            y: this.el.offsetHeight,
        });

        TweenLite.to(this.overBackground, 0.3, {
            y: 0,
            ease: Quart.easeOut
        });

        //text

        TweenLite.to(this.text, 0.3, {
            opacity: 0,
            y: -10,
            ease: Quart.easeOut
        });


    }

    //animate out
    hoverOut() {

        //il y a certains ca ou on ne veut pas animer licon
        if (this.overIcon) {
            TweenLite.to(this.overIcon, 0.3, {
                opacity: 0,
                y: 10,
                ease: Quart.easeOut

            });

            TweenLite.set(this.icon, {
                y: 10,
            });

            TweenLite.to(this.icon, 0.3, {
                opacity: 1,
                y: "-50%",
                ease: Quart.easeOut

            });
        }


        TweenLite.to(this.overText, 0.3, {
            opacity: 0,
            y: -10,
            ease: Quart.easeOut

        });

        TweenLite.to(this.overBackground, 0.3, {
            y: -this.el.offsetHeight,
            ease: Quart.easeOut
        });

        TweenLite.set(this.text, {
            y: 10,
        });

        TweenLite.to(this.text, 0.3, {
            opacity: 1,
            y: "-50%",
            ease: Quart.easeOut

        });


    }
}