define(["three"], function(three){
    var sceneVars = {
        scene: undefined,
        camera: undefined,
        cameraAngle: 0,
        cameraPivot: new THREE.Vector3(0,0,0),
        cameraPosition: new THREE.Vector3(0, 15, 1),
        cameraCircleRadius: 20,
        renderer: undefined
    };

return{
    rotateCamera: function(cam, fps){
        var angle = this.degreesToRadians(sceneVars.cameraAngle += 10 / fps),
            newX = sceneVars.cameraPosition.x + (sceneVars.cameraCircleRadius * Math.cos(angle)),
            newZ = sceneVars.cameraPosition.z + (sceneVars.cameraCircleRadius * Math.sin(angle));

        cam.position.set(newX, sceneVars.cameraPosition.y, newZ);
        cam.lookAt(sceneVars.cameraPivot);
    }
    ,
    randomColor: function(){ return Math.random() * 0xffffff; }
    ,
    add: function(obj){ sceneVars.scene.add(obj); }
    ,
    remove: function(obj, parent){
        var p = parent;
        if(!p) p = sceneVars.scene;
        p.remove(obj);
    }
    ,
    degreesToRadians: function(deg) { return deg * (Math.PI / 180); }
    ,
    radiansToDegrees: function(rad) { return (rad * 180) / Math.PI; }
    ,
    get: function(name){ return sceneVars[name]; }
    ,
    set: function(name, val){ sceneVars[name] = val; }
}
});