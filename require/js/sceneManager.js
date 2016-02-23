define(["three", "materials", "underscore"], function(three, materials, underscore){
    var sceneVars = {
        cameraAngle: 90,
        cameraPivot: new THREE.Vector3(0,0,0),
        cameraPosition: new THREE.Vector3(-10, 15, -10),
        cameraCircleRadius: 20,
        controls: undefined,
        unexploredC: 0xffffff,
        exploredC: 0x00ff00,
        endC: 0x0000ff,
        pathC: 0xff0000,
        startC: 0xff0000,
        tile11: THREE.ImageUtils.loadTexture( "art/roadTile11.png" ),
        tile12: THREE.ImageUtils.loadTexture( "art/roadTile12.png" ),
        tile13: THREE.ImageUtils.loadTexture( "art/roadTile13.png" ),
        tile14: THREE.ImageUtils.loadTexture( "art/roadTile14.png" ),
        tile15: THREE.ImageUtils.loadTexture( "art/roadTile15.png" ),
        tile21: THREE.ImageUtils.loadTexture( "art/roadTile21.png" ),
        tile22: THREE.ImageUtils.loadTexture( "art/roadTile22.png" ),
        tile25: THREE.ImageUtils.loadTexture( "art/roadTile25.png" ),
        tile26: THREE.ImageUtils.loadTexture( "art/roadTile26.png" ),
        tile27: THREE.ImageUtils.loadTexture( "art/roadTile27.png" ),
        tile6: THREE.ImageUtils.loadTexture( "art/roadTile6.png" ),
        tile19: THREE.ImageUtils.loadTexture( "art/roadTile19.png" ),
        tile18: THREE.ImageUtils.loadTexture( "art/roadTile18.png" ),
        tile3: THREE.ImageUtils.loadTexture( "art/roadTile3.png" ),
        tile4: THREE.ImageUtils.loadTexture( "art/roadTile4.png" ),
        tile9: THREE.ImageUtils.loadTexture( "art/roadTile9.png" ),
        tile10: THREE.ImageUtils.loadTexture( "art/roadTile10.png" ),
        tile1: THREE.ImageUtils.loadTexture( "art/roadTile1.png" ),
        tile2: THREE.ImageUtils.loadTexture( "art/roadTile2.png" ),
        tile7: THREE.ImageUtils.loadTexture( "art/roadTile7.png" ),
        tile17: THREE.ImageUtils.loadTexture( "art/roadTile17.png" ),
        tile8: THREE.ImageUtils.loadTexture( "art/roadTile8.png" ),
        tile3b: THREE.ImageUtils.loadTexture( "art/roadTile3b.png" ),
        tile20: THREE.ImageUtils.loadTexture( "art/roadTile20.png" ),
        terrainTile2: THREE.ImageUtils.loadTexture( "art/terrainTile2.png" ),
        terrainTile3: THREE.ImageUtils.loadTexture( "art/terrainTile3.png" ),
        tile16: THREE.ImageUtils.loadTexture( "art/roadTile16.png" ),
        pine1: THREE.ImageUtils.loadTexture( "art/pine1.png" ),
        snowRock: THREE.ImageUtils.loadTexture( "art/snowRock.png" ),
        alien: THREE.ImageUtils.loadTexture( "art/alien.png" )
    };

return{
    camera: undefined
    ,
    scene: undefined
    ,
    renderer: undefined
    ,
    mapHolder: undefined
    ,
    nodeMeshes: []
    ,
    rotateCamera: function(fps){
        var angle = this.degreesToRadians(sceneVars.cameraAngle += 30 / fps),
            newX = sceneVars.cameraPosition.x + (sceneVars.cameraCircleRadius * Math.cos(angle)),
            newZ = sceneVars.cameraPosition.z + (sceneVars.cameraCircleRadius * Math.sin(angle));

        this.camera.position.set(newX, sceneVars.cameraPosition.y, newZ);
        this.camera.lookAt(sceneVars.cameraPivot);
    }
    ,
    randomColor: function(){ return Math.random() * 0xffffff; }
    ,
    add: function(obj, parent){
        var p = parent;
        if(!p) p = this.scene;
        p.add(obj);
    }
    ,
    remove: function(obj, parent){
        var p = parent;
        if(!p) p = this.scene;
        obj.geometry.dispose();
        obj.material.dispose();
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
    ,
    addRain: function(){
        var width = 10,
            height = 10,
            depth = 10,
            particleCount = 250,
            geometry = new THREE.Geometry();

        for(var i = 0; i < particleCount; i++){
            var vertex = new THREE.Vector3(
                _.random(-width / 2, width / 2),
                _.random(height),
                _.random(-depth / 2, depth / 2)
            );

            geometry.vertices.push(vertex);
        }

        var rain = new THREE.PointCloud(geometry, new materials.SnowShader());
        this.add(rain);
        return rain.material;
    }
    ,
    addWater: function(){
        var width = 100,
            height = 100,
            segments = 150,
            geometry = new THREE.PlaneBufferGeometry(width, height, segments, segments);

        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
        var water = new THREE.Mesh(geometry, new materials.WaterShader());
        //water.position.x += 10;
        water.position.y -= 2;
        this.add(water);
        return water.material;
    }
}
});