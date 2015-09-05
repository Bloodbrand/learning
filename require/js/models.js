define(["three", "sceneManager"], function(three, sceneManager){
    var modelSettings = {
        tile: {
            length: 1,
            width: 1,
            height: 0.3
        }
    };

return{
    returnTile: function(){
        return new THREE.Mesh( new THREE.BoxGeometry(
            modelSettings.tile.width,
            modelSettings.tile.height,
            modelSettings.tile.length ),
            new THREE.MeshLambertMaterial( {color: sceneManager.get("unexploredC")} ));
    }
    ,
    returnHolder: function(){ return new THREE.Object3D(); }
    ,
    get: function(model, prop){ return modelSettings[model][prop]; }
    ,
    set: function(model, prop, val){ modelSettings[model][prop] = val; }
}
});