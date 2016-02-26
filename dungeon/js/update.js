System.register([], function(exports_1) {
    "use strict";
    var Update;
    return {
        setters:[],
        execute: function() {
            Update = (function () {
                function Update() {
                }
                Update.Add = function (handler) {
                    this.handlers.push(handler);
                };
                Update.Remove = function (handler) {
                    var index = this.handlers.indexOf(handler);
                    if (index > -1)
                        this.handlers.splice(index, 1);
                };
                Update.Tick = function () {
                    for (var h = 0; h < this.handlers.length; h++)
                        this.handlers[h].Update();
                };
                Update.handlers = [];
                return Update;
            }());
            exports_1("Update", Update);
        }
    }
});
