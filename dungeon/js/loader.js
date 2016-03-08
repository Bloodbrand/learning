System.register(["three", 'animate', "./lib/triangulation/debug"], function(exports_1) {
    "use strict";
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
                    this.map = map;
                    animate_1.Animate.Loader = this;
                    this.Scene = new THREE.Scene();
                    this.addHolder();
                    //this.addLight();
                    this.makeMap(map);
                    debug_1.Debug.RotateCamera(this);
                }
                Loader.prototype.addHolder = function () {
                    this.mapHolder = new THREE.Object3D();
                    this.mapHolder.position.x -= this.map.Width / 2;
                    this.mapHolder.position.z -= this.map.Height / 2;
                    this.Scene.add(this.mapHolder);
                };
                Loader.prototype.addLight = function () {
                    this.Scene.add(new THREE.AmbientLight(0xffffff));
                };
                Loader.prototype.makeMap = function (map) {
                    this.mapHolder.add(debug_1.Debug.Lines(map.Corridors));
                    this.mapHolder.add(debug_1.Debug.Points(map.Points));
                    this.mapHolder.add(debug_1.Debug.Rooms(map.Rooms));
                    //this.mapHolder.add(Debug.Triangles(map.Triangulation.Triangles));
                };
                return Loader;
            }());
            exports_1("Loader", Loader);
        }
    }
});
