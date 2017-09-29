export default class Bus {

    static $emit(eventName, data) {
        let event = new CustomEvent(eventName, {detail: data});
        Bus.obj.dispatchEvent(event);
    }

    static $on(eventName, cb) {
        Bus.obj.addEventListener(eventName, cb);
    }
}

Bus.obj = document.createElement('div');