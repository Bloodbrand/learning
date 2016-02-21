System.register(["three", "animate", "./lib/triangulation/triangulation", "loader", "map"], function(exports_1) {
    "use strict";
    var THREE, animate_1, triangulation_1, loader_1, map_1;
    var Main;
    return {
        setters:[
            function (THREE_1) {
                THREE = THREE_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (triangulation_1_1) {
                triangulation_1 = triangulation_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main() {
                }
                Main.addRenderer = function () {
                    animate_1.Animate.Renderer = new THREE.WebGLRenderer({ antialias: true });
                    animate_1.Animate.Renderer.setSize(animate_1.Animate.ContainerWidth, animate_1.Animate.ContainerHeight);
                    animate_1.Animate.Container.appendChild(animate_1.Animate.Renderer.domElement);
                };
                Main.addCamera = function () {
                    animate_1.Animate.Camera = new THREE.PerspectiveCamera(animate_1.Animate.FOV, animate_1.Animate.ContainerWidth / animate_1.Animate.ContainerHeight, animate_1.Animate.CamNear, animate_1.Animate.CamFar);
                };
                Main.testMap = function () {
                    var t = new triangulation_1.Triangulation();
                    console.log(t);
                    var m = new map_1.Map();
                    var l = new loader_1.Loader(m);
                };
                Main.Start = function (containerID) {
                    if (containerID === void 0) { containerID = "webgl"; }
                    animate_1.Animate.Container = document.getElementById(containerID);
                    animate_1.Animate.ContainerWidth = animate_1.Animate.Container.offsetWidth;
                    animate_1.Animate.ContainerHeight = animate_1.Animate.Container.offsetHeight;
                    this.addRenderer();
                    this.addCamera();
                    this.testMap();
                    //Animate.Render();
                };
                return Main;
            }());
            exports_1("Main", Main);
            Main.Start();
        }
    }
});
