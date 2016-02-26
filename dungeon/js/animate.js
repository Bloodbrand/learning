System.register(["update"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var update_1;
    var Animate;
    return {
        setters:[
            function (update_1_1) {
                update_1 = update_1_1;
            }],
        execute: function() {
            Animate = (function () {
                function Animate() {
                }
                Animate.render = function () {
                    var _this = this;
                    Animate.frameID = requestAnimationFrame(function () { return _this.render(); });
                    this.now = Date.now();
                    this.delta = this.now - this.then;
                    if (this.delta < this.interval)
                        return;
                    this.then = this.now - (this.delta % this.interval);
                    update_1.Update.Tick();
                    this.Renderer.render(this.Loader.Scene, this.Camera);
                };
                Animate.Start = function () {
                    this.render();
                };
                Animate.Stop = function () {
                };
                Animate.FOV = 45;
                Animate.CamNear = 1;
                Animate.CamFar = 10000;
                // Delta time
                Animate.fps = 30;
                Animate.then = Date.now();
                Animate.interval = 1000 / Animate.fps;
                return Animate;
            }());
            exports_1("Animate", Animate);
        }
    }
});
