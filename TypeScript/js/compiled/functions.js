function log(msg) {
    var para = document.createElement("h2");
    var content = document.createTextNode(msg);
    para.appendChild(content);
    document.getElementById('text').appendChild(para);
}
var add = function (x, y) {
    return x + y;
};
var $ = function (id) { return document.getElementById(id); };
var Calc = (function () {
    function Calc() {
    }
    Calc.prototype.add = function (x, y) { return x + y; };
    return Calc;
})();
function optionalParam(mandatory, optional) {
    log(mandatory + " " + optional);
}
function defaultParam(mandatory, _default) {
    if (_default === void 0) { _default = "Milici"; }
    log(mandatory + " " + _default);
}
function restParams(mandatory) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    log(mandatory + " " + rest.join(" "));
}
