define(["require", "exports", "Shaders"], function (require, exports, Shaders) {
    var Portal = (function () {
        function Portal(loader, color) {
            this._loader = loader;
            this._isApertureOpen = false;
            this._width = 3;
            this._height = 5;
            var rendererSize = loader.Renderer.getSize();
            this._renderTarget = new THREE.WebGLRenderTarget(rendererSize.width, rendererSize.height, { format: THREE.RGBAFormat });
            this.Camera = new THREE.PerspectiveCamera(loader.Camera.fov, loader.Camera.aspect, loader.Camera.near, loader.Camera.far);
            this.Mesh = this.makeMesh(this._renderTarget, loader, this.Camera, color);
            this._loader.Add(this.Camera);
            this._loader.Add(this.Mesh);
        }
        Portal.prototype.OpenAperture = function (camera) {
            this._material.SetCamera(camera);
            if (!this._isApertureOpen)
                this._material.OpenAperture();
            this._isApertureOpen = true;
        };
        Portal.prototype.makeMesh = function (map, loader, camera, color) {
            var geometry = new THREE.PlaneGeometry(this._width, this._height, .001);
            this._material = new Shaders.PortalShader(map, loader, camera, color);
            var portalPlane = new THREE.Mesh(geometry, this._material);
            return portalPlane;
        };
        return Portal;
    })();
    return Portal;
});
