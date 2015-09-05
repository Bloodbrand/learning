define(["three"], function(three){
    var sceneVars = {
        cameraAngle: 90,
        cameraPivot: new THREE.Vector3(0,0,0),
        cameraPosition: new THREE.Vector3(0, 45, 1),
        cameraCircleRadius: 25,
        unexploredC: 0xffffff,
        exploredC: 0x00ff00,
        endC: 0x0000ff,
        pathC: 0xff0000,
        startC: 0xff0000
    };

return{
    camera: undefined
    ,
    scene: undefined
    ,
    renderer: undefined
    ,
    nodeMeshes: []
    ,
    rotateCamera: function(fps){
        var angle = this.degreesToRadians(sceneVars.cameraAngle += 3 / fps),
            newX = sceneVars.cameraPosition.x + (sceneVars.cameraCircleRadius * Math.cos(angle)),
            newZ = sceneVars.cameraPosition.z + (sceneVars.cameraCircleRadius * Math.sin(angle));

        this.camera.position.set(newX, sceneVars.cameraPosition.y, newZ);
        this.camera.lookAt(sceneVars.cameraPivot);
    }
    ,
    randomColor: function(){ return Math.random() * 0xffffff; }
    ,
    add: function(obj){ this.scene.add(obj); }
    ,
    remove: function(obj, parent){
        var p = parent;
        if(!p) p = this.scene;
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