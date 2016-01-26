var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () { log(this.greeting); };
    return Greeter;
})();
var BankAccount = (function () {
    function BankAccount() {
    }
    BankAccount.getAccountNumber = function () {
        return BankAccount.accountNumber;
    };
    BankAccount.accountNumber = 12341234;
    return BankAccount;
})();
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
var Account = function () {
    var balance = 100;
    var getBalance = function () {
        log(balance.toString());
    };
    return {
        getBalance: getBalance
    };
}();
var ConstructorTest = (function () {
    function ConstructorTest(msg) {
        this.message = msg;
    }
    ConstructorTest.prototype.sayMessage = function () {
        log(this.message);
    };
    return ConstructorTest;
})();
