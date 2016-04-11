var greet = require("./greet1");
greet();

var greet2 = require("./greet2").greet;
greet2();

var greet3 = require("./greet3");
greet3.greet();
greet3.greeting = "Changed hello world!";

var greet3b = require("./greet3");
greet3b.greet(); // returns same object as greet 3 because modules are cached

var Greet4 = require("./greet4");
var greet4 = new Greet4();
greet4.greet();

var greet5 = require("./greet5");
greet5.greet();