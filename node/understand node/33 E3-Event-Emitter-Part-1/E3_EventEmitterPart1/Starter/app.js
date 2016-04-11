var Emitter = require("./emitter");

var emitter = new Emitter();

emitter.on("greet", function(){
    console.log("Someone said hello!");
});

emitter.on("greet", function(){
    console.log("Someone else said hello!");
});

console.log("hello!");
emitter.emit("greet");