var OptionalPropClass = (function () {
    function OptionalPropClass() {
        this.mandatory = "hello";
    }
    return OptionalPropClass;
})();
var Greeter_2 = (function () {
    function Greeter_2() {
    }
    Greeter_2.prototype.greet = function (msg) {
        log(msg.greeting);
    };
    return Greeter_2;
})();
var Message = (function () {
    function Message() {
        this.greeting = "hello!";
    }
    return Message;
})();
var CheckingAccount = (function () {
    function CheckingAccount(amount) {
        this.balance = amount;
    }
    CheckingAccount.prototype.deposit = function () { };
    CheckingAccount.prototype.withdrawl = function () { return 0; };
    return CheckingAccount;
})();
var mySearch;
mySearch = function (src) {
    return true;
};
