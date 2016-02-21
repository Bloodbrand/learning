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
                    animate_1.Animate.Loader = this;
                    this.Scene = new THREE.Scene();
                    this.addLight();
                    this.makeMap(map);
                }
                Loader.prototype.addLight = function () {
                    this.Scene.add(new THREE.AmbientLight(0x333333));
                };
                Loader.prototype.makeMap = function (map) {
                    this.placePoints(map.points);
                    this.placeLines(map.tri.UniqueLines);
                };
                Loader.prototype.placePoints = function (pts) {
                    for (var p = 0; p < pts.length; p++) {
                        var mat = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
                        var curP = pts[p];
                        var q = curP.QuadTree;
                        var geom = new THREE.BoxGeometry(2, 1, 2);
                        var mesh = new THREE.Mesh(geom, mat);
                        mesh.position.set(curP.x, 0, curP.y);
                        this.Scene.add(mesh);
                    }
                };
                Loader.prototype.placeLines = function (lines) {
                    var material = new THREE.LineBasicMaterial({
                        color: 0xffffff
                    });
                    for (var l = 0; l < lines.length; l++) {
                        var curL = lines[l];
                        var geometry = new THREE.Geometry();
                        geometry.vertices.push(new THREE.Vector3(curL.v1.x, 0, curL.v1.y), new THREE.Vector3(curL.v2.x, 0, curL.v2.y));
                        var line = new THREE.Line(geometry, material);
                        this.Scene.add(line);
                    }
                };
                return Loader;
            }());
            exports_1("Loader", Loader);
        }
    }
});
