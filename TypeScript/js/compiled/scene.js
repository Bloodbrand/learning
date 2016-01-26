var MainClass = (function () {
    function MainClass() {
    }
    MainClass.StartScene = function (i) {
        MainClass.Scenes[i].Start();
    };
    MainClass.Scenes = [];
    return MainClass;
})();
var Scene = (function () {
    function Scene(scene, loader) {
        this._onStartFunctions = [];
        this._assets = [];
        this._scene = undefined;
        this._loader = undefined;
        this._scene = scene;
        this._loader = loader;
        MainClass.Scenes.push(this);
    }
    Object.defineProperty(Scene.prototype, "OnStartFunctions", {
        get: function () { return this._onStartFunctions; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Scene.prototype, "Assets", {
        get: function () { return this._assets; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "Scene", {
        get: function () { return this._scene; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "Loader", {
        get: function () { return this._loader; },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.Start = function () {
        for (var i = 0; i < this._onStartFunctions.length; i++)
            this._onStartFunctions[i](this._scene, this._loader);
        for (var i = 0; i < this._assets.length; i++)
            console.log(this._loader + " loading " + this._assets[i]);
    };
    Scene.prototype.OnStart = function (fun) {
        this._onStartFunctions.push(fun);
    };
    Scene.prototype.AddAsset = function (asset) { this._assets.push(asset); };
    return Scene;
})();
