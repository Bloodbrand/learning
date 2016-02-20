System.register([], function(exports_1) {
    "use strict";
    var Animate;
    return {
        setters:[],
        execute: function() {
            Animate = (function () {
                function Animate() {
                }
                Animate.Render = function () {
                };
                Animate.fps = 30;
                Animate.then = Date.now();
                Animate.interval = 1000 / Animate.fps;
                return Animate;
            }());
            exports_1("Animate", Animate);
        }
    }
});
