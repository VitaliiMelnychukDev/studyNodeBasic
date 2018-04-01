let CustomEmitter = require('./customEmitter');
let CoreEmitter = require('events');
let settings = require('./settings');
let util = require('util');


let customEmitterObj = new CustomEmitter();
let coreEmitterObj = new CoreEmitter();

function helloFunction1() {
    console.log('Hello message1');
}

function helloFunction2() {
    console.log('Hello message2');
}

function logFunction(data) {
    console.log(data);
}

customEmitterObj.on(settings.events.HELLO, helloFunction1);
coreEmitterObj.on(settings.events.HELLO, helloFunction1);

customEmitterObj.on(settings.events.HELLO, helloFunction2);
coreEmitterObj.on(settings.events.HELLO, helloFunction2);

function OwnEmitter() {
    CoreEmitter.call(this);
}

util.inherits(OwnEmitter, CoreEmitter);

OwnEmitter.prototype.hello = function () {
    this.emit(settings.events.HELLO);
};

OwnEmitter.prototype.log = function (data) {
    this.emit(settings.events.LOG, data);
};

let ownEmitterObj = new OwnEmitter();

ownEmitterObj.on(settings.events.HELLO, helloFunction1);
ownEmitterObj.on(settings.events.LOG, logFunction);

customEmitterObj.emit(settings.events.HELLO);
coreEmitterObj.emit(settings.events.HELLO);
ownEmitterObj.hello();
ownEmitterObj.log({text: "test"});

