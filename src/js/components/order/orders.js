import OrderItem from "./orderItem";

export default class Orders {

    constructor(options) {
        this.els = document.querySelectorAll(options.el);
        this.orders = [];

        this.init();
    }

    init() {
        for (let orderEl of this.els) {
            this.orders.push(new OrderItem(orderEl));
        }
    }
}