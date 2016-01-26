define(["require", "exports", "Updater"], function (require, exports, Updater) {
    var Animator = (function () {
        function Animator(Loader, Camera, Renderer) {
            var _this = this;
            this.Loader = Loader;
            this.Camera = Camera;
            this.Renderer = Renderer;
            this.then = Date.now();
            this.now = undefined;
            this.delta = undefined;
            this.frameID = undefined;
            this.fps = 30;
            this.interval = 1000 / this.fps;
            this.ResizeWindow = function () {
                var renderSize = {
                    width: _this.Renderer.container.offsetWidth,
                    height: _this.Renderer.container.offsetHeight
                };
                _this.Renderer.setSize(renderSize.width, renderSize.height);
                _this.Camera.aspect = renderSize.width / renderSize.height;
                _this.Camera.updateProjectionMatrix();
            };
            this.Start();
            window.addEventListener('resize', this.ResizeWindow, false);
            console.info("new animator created");
        }
        Animator.prototype.Start = function () {
            this.render();
        };
        Animator.prototype.render = function () {
            var _this = this;
            this.frameID = requestAnimationFrame(function () { return _this.render(); });
            this.now = Date.now();
            this.delta = this.now - this.then;
            if (this.delta < this.interval)
                return;
            this.then = this.now - (this.delta % this.interval);
            Updater.Update();
            this.Renderer.render(this.Loader.Scene, this.Camera);
        };
        return Animator;
    })();
    return Animator;
});
