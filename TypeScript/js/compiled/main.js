define(["require", "exports", "three", "Loader", "Level"], function (require, exports, THREE, Loader, Level) {
    var Main = (function () {
        function Main() {
        }
        Main.addRenderer = function (width, height, container) {
            var renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);
            renderer.container = container;
            return renderer;
        };
        Main.addCamera = function (width, height) {
            return new THREE.PerspectiveCamera(this._fov, width / height, this._camNear, this._camFar);
        };
        Main.addLight = function () {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(-1, 1, 0);
            var ambientalLight = new THREE.AmbientLight(0x333333);
            directionalLight.add(ambientalLight);
            return directionalLight;
        };
        Main.Start = function (containerID) {
            if (containerID === void 0) { containerID = "webGL"; }
            var container = document.getElementById(containerID);
            if (container === null)
                return console.error("webGL container not found");
            var width = container.offsetWidth;
            var height = container.offsetHeight;
            var loader = new Loader(new THREE.Scene(), this.addCamera(width, height), this.addRenderer(width, height, container));
            loader.Add(this.addLight());
            this.loadTestLevel(loader);
        };
        Main.LoadScene = function (name) {
        };
        Main.loadTestLevel = function (loader) {
            var spawnPoint = { x: 0, y: -10.5 };
            var lvl = new Level(spawnPoint);
            var points = [
                { x: -10, y: 10 },
                { x: -10, y: -10 },
                { x: -5, y: -15 },
                { x: -5, y: -35 },
                { x: 5, y: -35 },
                { x: 5, y: -15 },
                { x: 10, y: -10 },
                { x: 10, y: 10 },
                { x: 5, y: 10 },
                { x: 5, y: -5 },
                { x: -5, y: -5 },
                { x: -5, y: 10 }
            ];
            lvl.AddPoints(points);
            loader.LoadLevel(lvl);
        };
        Main._fov = 45;
        Main._camNear = 0.1;
        Main._camFar = 1000;
        return Main;
    })();
    return Main;
});
