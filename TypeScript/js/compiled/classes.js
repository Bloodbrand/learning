/***********standard class***********/
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () { log(this.greeting); };
    return Greeter;
})();
//var g = new Greeter("I'm a new class!");
//g.greet();
/***********static class***********/
var BankAccount = (function () {
    function BankAccount() {
    }
    BankAccount.getAccountNumber = function () {
        return BankAccount.accountNumber;
    };
    BankAccount.accountNumber = 12341234; //private, canot access with BankAccount.accountNumber
    return BankAccount;
})();
//log(BankAccount.getAccountNumber().toString());//class is not instantiated
/***********properties***********/
var Account_3 = (function () {
    function Account_3() {
        this._balance = 0;
    }
    Object.defineProperty(Account_3.prototype, "balance", {
        get: function () { return this._balance; },
        set: function (val) {
            if (val <= 100)
                this._balance = val;
        },
        enumerable: true,
        configurable: true
    });
    return Account_3;
})();
/*
var a_3 = new Account_3();
log(a_3.balance.toString()); //0
a_3.balance = 100;
log(a_3.balance.toString()); //100
a_3.balance = 300;
log(a_3.balance.toString()); //100
*/
/***********static properties***********/
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "STATIC_NUMBER", {
        get: function () { return 1234123412341234; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "STATIC_STRING", {
        get: function () { return "test_test_test_test"; },
        enumerable: true,
        configurable: true
    });
    ;
    return Constants;
})();
var Account_2 = (function () {
    function Account_2() {
    }
    Object.defineProperty(Account_2.prototype, "accountInfo", {
        get: function () {
            return {
                staticNumber: Constants.STATIC_NUMBER,
                staticString: Constants.STATIC_STRING
            };
        },
        enumerable: true,
        configurable: true
    });
    return Account_2;
})();
/*
var a_2 = new Account_2();
log(a_2.accountInfo.staticNumber.toString());
log(a_2.accountInfo.staticString);
*/
/***********revealing module pattern***********/
var Account = function () {
    var balance = 100;
    var getBalance = function () {
        log(balance.toString());
    };
    return {
        getBalance: getBalance
    };
}(); //auto invoked
//Account.getBalance();
/***********constructor***********/
var ConstructorTest = (function () {
    function ConstructorTest(msg) {
        this.message = msg;
    }
    ConstructorTest.prototype.sayMessage = function () {
        log(this.message);
    };
    return ConstructorTest;
})();
