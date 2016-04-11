function Greeter(){
    this.greeting = "Hello from greet4.js!";
    this.greet = function(){
        console.log(this.greeting);
    };
}

module.exports = Greeter;