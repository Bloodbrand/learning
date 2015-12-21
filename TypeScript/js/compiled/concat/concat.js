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

/***********named function***********/
function log(msg) {
    var para = document.createElement("h2");
    var content = document.createTextNode(msg);
    para.appendChild(content);
    document.getElementById('text').appendChild(para);
}
/***********anonymous function***********/
var add = function (x, y) {
    return x + y;
};
//log(add(3, 5).toString());
/***********lambda function***********/
var $ = function (id) { return document.getElementById(id); };
/*
same as:
var $ = function(id){ return document.getElementById(id); }
*/
/***********function inside class***********/
var Calc = (function () {
    function Calc() {
    }
    Calc.prototype.add = function (x, y) { return x + y; }; //returns number
    return Calc;
})();
/***********optional params***********/
function optionalParam(mandatory, optional) {
    log(mandatory + " " + optional);
}
//optionalParam("Radu"); //"Radu undefined"
//optionalParam("Radu", "Milici");
/***********default params***********/
function defaultParam(mandatory, _default) {
    if (_default === void 0) { _default = "Milici"; }
    log(mandatory + " " + _default);
}
//defaultParam("Radu"); //"Radu Milici"
//defaultParam("Radu", "Cavalera"); //"Radu Cavalera"
/***********rest params***********/
function restParams(mandatory) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    log(mandatory + " " + rest.join(" "));
}
//restParams("Radu", "param1", "param2", "param3"); //"Radu param1 param2 param3"

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/***********calling a base class using 'super'***********/
var BaseClass = (function () {
    function BaseClass(title) {
        this._title = title;
    }
    return BaseClass;
})();
var ExtendsClass = (function (_super) {
    __extends(ExtendsClass, _super);
    function ExtendsClass(title) {
        _super.call(this, title);
    }
    return ExtendsClass;
})(BaseClass);
//var test = new ExtendsClass("new ExtendsClass");
/***********overloads***********/
var Plant = (function () {
    function Plant() {
    }
    Plant.prototype.getName = function (nameOrId) {
        if (typeof nameOrId == "string")
            return "The name of this plane is: " + nameOrId;
        else
            return nameOrId;
    };
    return Plant;
})();
var PlantInfo = (function (_super) {
    __extends(PlantInfo, _super);
    function PlantInfo() {
        _super.call(this);
    }
    PlantInfo.prototype.getName = function (nameOrId) {
        var studentID = _super.prototype.getName.call(this, nameOrId);
        return studentID;
    };
    return PlantInfo;
})(Plant);
/*
var test2 = new PlantInfo();
log(test2.getName(1)); // "1"
log(test2.getName("Rose")); // "The name of this plane is: Rose"
*/
/***********overrides***********/
var Plant_2 = (function () {
    function Plant_2(plantName) {
        this._plant = plantName;
    }
    Plant_2.prototype.getName = function () {
        return "The name of this plane is: " + this._plant;
    };
    return Plant_2;
})();
var PlantInfo_2 = (function (_super) {
    __extends(PlantInfo_2, _super);
    function PlantInfo_2(plantName) {
        _super.call(this, plantName);
        this._plant = plantName;
    }
    return PlantInfo_2;
})(Plant_2);


