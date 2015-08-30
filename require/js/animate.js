define([], function(){
    var settings = {
        then: Date.now(),
        now: undefined,
        fps: 30,
        delta: undefined
    };
    settings.interval = 1000 / settings.fps;

    var animVars = {
        renderer: undefined,
        scene: undefined,
        camera: undefined,
        frameID: 0
    };

    function animate (/*time*/) {
        animVars.frameID = requestAnimationFrame(animate);
        settings.now = Date.now();
        settings.delta = settings.now - settings.then;

        if (settings.delta > settings.interval){
            settings.then = settings.now - (settings.delta % settings.interval);
            animVars.renderer.render(animVars.scene, animVars.camera);
        }
    }

    return {
        animate: animate
        ,
        set: function(name, val){ animVars[name] = val; }
    };
});