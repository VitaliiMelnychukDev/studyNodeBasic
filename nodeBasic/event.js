const CustomEmitter = require("./customEmitter");
const CoreEmitter = require("events");
const eventSettings = require("./eventSettings");

function printGreeting() {
    console.log("Hello!");
}

function logFunction(data) {
    console.log(data);
}

//Using custom emitter
const customEmitterObj = new CustomEmitter();
customEmitterObj.on(eventSettings.events.HELLO, printGreeting);
customEmitterObj.on(eventSettings.events.LOG, logFunction);
customEmitterObj.emit(eventSettings.events.HELLO);
customEmitterObj.emit(eventSettings.events.LOG, ["Log: emit log function"]);

//Using core emitter
const coreEmitterObj = new CoreEmitter();
coreEmitterObj.on(eventSettings.events.HELLO, printGreeting);
coreEmitterObj.emit(eventSettings.events.HELLO);

//Create own emitter that inherit core Event module
class OwnEmitter extends CoreEmitter {
    constructor() {
        super();
    }

    hello() {
        this.emit(eventSettings.events.HELLO);
    }

    log(data) {
        this.emit(eventSettings.events.LOG, data);
    }
}

const ownEmitterObj = new OwnEmitter();
ownEmitterObj.on(eventSettings.events.HELLO, printGreeting);
ownEmitterObj.on(eventSettings.events.LOG, logFunction);

ownEmitterObj.hello();
ownEmitterObj.log("Log: emit ownEmitter log function");

