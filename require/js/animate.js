define(["sceneManager", "underscore", "tween"], function(sceneManager, underscore, tween){
    var settings = {
        then: _.now(),
        now: undefined,
        fps: 60,
        delta: undefined,
        frameID: undefined
    };
    settings.interval = 1000 / settings.fps;
    function animate (/*time*/) {
        settings.frameID = requestAnimationFrame(animate);
        settings.now = _.now();
        settings.delta = settings.now - settings.then;

        if (settings.delta > settings.interval){
            settings.then = settings.now - (settings.delta % settings.interval);
            publicAnim.Updater.updateHandlers();
            tween.update();
            sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
        }
    }

    function Updater() {
        this.handlers = [];

        this.addHandler = function(h){ this.handlers.push(h) };

        this.removeHandler = function(h){ _.without(this.handlers, h); };

        this.updateHandlers = function () {
            _.each(this.handlers, function(h){ h.update(); });
        };
    }

    var publicAnim = {};

    publicAnim.startAnimating = animate;

    publicAnim.Updater  = new Updater();

    return publicAnim;
});