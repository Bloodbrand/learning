var ListOfNumbers = (function () {
    function ListOfNumbers() {
        this._items = [];
    }
    ListOfNumbers.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOfNumbers.prototype.getItems = function () {
        return this._items;
    };
    return ListOfNumbers;
})();
var ListOfStrings = (function () {
    function ListOfStrings() {
        this._items = [];
    }
    ListOfStrings.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOfStrings.prototype.getItems = function () {
        return this._items;
    };
    return ListOfStrings;
})();
function test2(a, b) {
    console.log(a + b);
}
test2("33", false);
function processData(data) {
    console.log(typeof data);
}
function identity(arg) {
    return arg;
}
var ListOf = (function () {
    function ListOf() {
        this._items = [];
    }
    ListOf.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOf.prototype.getItems = function () {
        return this._items;
    };
    return ListOf;
})();
var BankingAccount = (function () {
    function BankingAccount() {
    }
    Object.defineProperty(BankingAccount.prototype, "accountInfo", {
        get: function () {
            return {
                routingNum: "100",
                bankNum: 2001
            };
        },
        enumerable: true,
        configurable: true
    });
    return BankingAccount;
})();
