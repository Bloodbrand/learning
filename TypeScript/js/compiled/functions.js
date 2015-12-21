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
