System.register(["three", 'animate', "./lib/triangulation/debug"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var THREE, animate_1, debug_1;
    var Loader;
    return {
        setters:[
            function (THREE_1) {
                THREE = THREE_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }],
        execute: function() {
            Loader = (function () {
                function Loader(map) {
                    animate_1.Animate.Loader = this;
                    this.Scene = new THREE.Scene();
                    this.addLight();
                    this.makeMap(map);
                    debug_1.Debug.RotateCamera(this);
                }
                Loader.prototype.addLight = function () {
                    this.Scene.add(new THREE.AmbientLight(0x333333));
                };
                Loader.prototype.makeMap = function (map) {
                    this.Scene.add(debug_1.Debug.Lines(map.mst));
                    this.Scene.add(debug_1.Debug.Points(map.points));
                    //this.Scene.add(Debug.Triangles(map.tri.Triangles));
                };
                return Loader;
            }());
            exports_1("Loader", Loader);
        }
    }
});
