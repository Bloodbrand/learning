define(["three", "sceneManager", "animate", "materials"],
    function(three, sceneManager, animate, materials){
    var modelSettings = {
        tile: {
            length: 1,
            width: 1,
            height: 0.1
        }
    };

return{
    returnTile: function(tile){
        return new THREE.Mesh( new THREE.BoxGeometry(
            modelSettings.tile.width,
            modelSettings.tile.height,
            modelSettings.tile.length ),
            new THREE.MeshLambertMaterial( {color: sceneManager.get("unexploredC"), map: sceneManager.get(tile)} ));
            //new materials.SnowShader());
    }
    ,
    returnTree: function(){
        var height = 1.3, width = 0.5;
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(width, height),
            new THREE.MeshBasicMaterial( {
                color: sceneManager.get("unexploredC"),
                map: sceneManager.get("pine1"),
                transparent: true,
                side: THREE.DoubleSide
            } ));
        mesh.position.y += height / 2;
        mesh.update = function(){
            mesh.rotation.y = sceneManager.get("controls").getAzimuthalAngle();
        };
        animate.Updater.addHandler(mesh);
        return mesh;
    }
    ,
    returnPlayer: function(){
            var height = 1, width = 0.5;
            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(width, height),
                new THREE.MeshBasicMaterial( {
                    map: sceneManager.get("alien"),
                    transparent: true
                } ));
            mesh.position.y += height / 2;
            mesh.update = function(){
                mesh.rotation.y = sceneManager.get("controls").getAzimuthalAngle();
            };
            animate.Updater.addHandler(mesh);
            mesh.height = height;
            return mesh;
        }
        ,
    returnHolder: function(){ return new THREE.Object3D(); }
    ,
    get: function(model, prop){ return modelSettings[model][prop]; }
    ,
    set: function(model, prop, val){ modelSettings[model][prop] = val; }
}
});