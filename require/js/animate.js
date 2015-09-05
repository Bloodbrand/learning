define(["sceneManager"], function(sceneManager){
    var settings = {
        then: Date.now(),
        now: undefined,
        fps: 60,
        delta: undefined,
        frameID: undefined
    };
    settings.interval = 1000 / settings.fps;

    function animate (/*time*/) {
        settings.frameID = requestAnimationFrame(animate);
        settings.now = Date.now();
        settings.delta = settings.now - settings.then;

        if (settings.delta > settings.interval){
            settings.then = settings.now - (settings.delta % settings.interval);
            //sceneManager.rotateCamera(settings.fps);
            sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
        }
    }

    return {
        startAnimating: animate
    };
});