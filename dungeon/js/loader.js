System.register(["three", 'animate'], function(exports_1) {
    "use strict";
    var THREE, animate_1;
    var Loader;
    return {
        setters:[
            function (THREE_1) {
                THREE = THREE_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            }],
        execute: function() {
            Loader = (function () {
                function Loader(map) {
                    this.Scene = new THREE.Scene();
                    this.makeMap(map);
                    animate_1.Animate.Loader = this;
                }
                Loader.prototype.makeMap = function (map) {
                };
                return Loader;
            }());
            exports_1("Loader", Loader);
        }
    }
});
