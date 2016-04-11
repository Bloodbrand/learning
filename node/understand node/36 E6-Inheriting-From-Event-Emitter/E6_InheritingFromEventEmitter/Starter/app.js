var EventEmitter = require("events");
var util = require("util");

function Greeter() {
    this.greeting = "Hello world!";
}

util.inherits(Greeter, EventEmitter);

Greeter.prototype.greet = function () {
    console.log(this.greeting);
    this.emit('greet');
};

var greeter1 = new Greeter();

greeter1.on("greet", function() {
    console.log("on greet");
});

greeter1.greet();

