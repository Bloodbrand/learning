///<reference path="../bower_components/three.js/three.d.ts"/>
var settings = (function () {
    function settings() {
    }
    settings.camNear = 0.1;
    settings.camFar = 100;
    return settings;
})();
var Main = (function () {
    function Main() {
        this.scene = new THREE.Scene();
        this.addRenderer();
        this.addCamera();
    }
    Main.prototype.addRenderer = function () {
        this.renderer = new THREE.WebGLRenderer();
    };
    Main.prototype.addCamera = function () {
        this.camera = new THREE.PerspectiveCamera();
    };
    return Main;
})();
var m = new Main();
//# sourceMappingURL=main.js.map