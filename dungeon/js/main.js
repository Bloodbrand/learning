System.register(["three", 'animate'], function(exports_1) {
    "use strict";
    var THREE, animate_1;
    var Main;
    return {
        setters:[
            function (THREE_1) {
                THREE = THREE_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
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
                Main.Start = function (containerID) {
                    if (containerID === void 0) { containerID = "webgl"; }
                    animate_1.Animate.Container = document.getElementById(containerID);
                    animate_1.Animate.ContainerWidth = animate_1.Animate.Container.offsetWidth;
                    animate_1.Animate.ContainerHeight = animate_1.Animate.Container.offsetHeight;
                    this.addRenderer();
                };
                return Main;
            }());
            exports_1("Main", Main);
            Main.Start();
        }
    }
});
