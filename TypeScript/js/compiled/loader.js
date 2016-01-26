define(["require", "exports", "Animator", "Controller"], function (require, exports, Animator, FirstPersonController) {
    var Loader = (function () {
        function Loader(Scene, Camera, Renderer) {
            this.Scene = Scene;
            this.Camera = Camera;
            this.Renderer = Renderer;
            this.Animator = new Animator(this, Camera, Renderer);
            console.info("new loader created");
        }
        Loader.prototype.LoadLevel = function (level) {
            var allObjs = level.Rooms.concat(level.Doodads);
            for (var i = 0; i < allObjs.length; i++)
                this.Add(allObjs[i]);
            this.Controller = new FirstPersonController(this.Camera, this.Animator.Renderer.container, level, this);
            this.Controller.GetObject().position.set(level.SpawnPoint.x, this.Controller.GetHeight(), level.SpawnPoint.y);
            this.Add(this.Controller.GetObject());
        };
        Loader.prototype.Add = function (obj) {
            this.Scene.add(obj);
        };
        Loader.prototype.Remove = function (obj) {
            obj.geometry.dispose();
            console.log(obj.material);
            this.Scene.remove(obj);
        };
        return Loader;
    })();
    return Loader;
});
