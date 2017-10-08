import Button from "./button";

export default class Buttons {

    constructor(options) {

        this.els = document.querySelectorAll(options.el);
        this.buttons = [];

        this.init()
    }

    init() {

        for(let el of this.els) {
            this.buttons.push(
                new Button({
                    el
                })
            )
        }

    }


}