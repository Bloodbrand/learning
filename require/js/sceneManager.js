define([], function(){
    var sceneVars = {
        scene: undefined,
        camera: undefined,
        renderer: undefined
    };

return{
    add: function(obj){ sceneVars.scene.add(obj); }
    ,
    remove: function(obj, parent){
        var p = parent;
        if(!p) p = sceneVars.scene;
        p.remove(obj);
    }
    ,
    get: function(name){ return sceneVars[name]; }
    ,
    set: function(name, val){ sceneVars[name] = val; }
}
});