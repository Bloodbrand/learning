define(["models", "sceneManager", "pathfinding", "underscore"],
    function(models, sceneManager, pathfinding, underscore) {
    var map = {
        length: 5,
        width: 40,
        tileInterval: 0.2
    };

    function makeSprite(text){
        //text = "h:" + text;
        var gyro = new THREE.Gyroscope(),
            sizeDivision = 80,
            font = "Trebuchet MS",
            size = 30,
            color = "#ffffff";

        font = size + "px " + font;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = font;
        var metrics = context.measureText(text),
            textWidth = metrics.width;
        canvas.width = textWidth + 3;
        canvas.height = size + 3;

        context.font = font;
        context.fillStyle = color;
        context.fillText(text, 0, size);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var spriteData = {c: canvas, t: texture, text: text};

        var planeMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry (
                spriteData.c.width / sizeDivision,
                spriteData.c.height / sizeDivision),
            new THREE.MeshBasicMaterial({ map: spriteData.t, side: THREE.DoubleSide}));
        gyro.add(planeMesh);
        return gyro;
    }

return{
    makeNode: function(row, num){
        return{
            gVal: 0,
            hVal: undefined,
            fVal: undefined,
            id: _.uniqueId(),
            parentNode: undefined,
            row: row,
            col: num,
            mesh: models.returnTile(),
            sprite: undefined,
            setColor: function(color){
                this.mesh.material.color.setHex(color);
            },
            setScale: function(scale){
                this.mesh.scale.set(scale.x, scale.y, scale.z);
            }
            ,
            setSprite: function(text, h, f){
                var sprite = makeSprite(text);
                sprite.rotation.set(-Math.PI / 2, 0, 0);
                sprite.position.y += 0.4;
                this.sprite = sprite;
                this.mesh.add(sprite);
            }
            ,
            reset: function(){
                this.gVal = 0;
                this.hVal = undefined;
                this.fVal = undefined;
                this.parentNode = undefined;
            }
        }
    }
    ,
    generateMap: function(){
        var holder = models.returnHolder(),
            tileWidth = models.get('tile', 'width'),
            tileLength = models.get('tile', 'length'),
            totalWidthOffset = tileWidth + map.tileInterval,
            totalHeightOffset = tileLength + map.tileInterval;

        for(var l = 0; l < map.length; l++){
            var row = [];

            for(var w = 0; w < map.width; w++){
                var node = this.makeNode(l, w);
                node.mesh.node = node;

                node.mesh.position.setX(
                    -(map.width / 2) * totalWidthOffset +
                    w * tileWidth +
                    w * map.tileInterval +
                    totalWidthOffset / 2);

                node.mesh.position.setZ(
                    -(map.length / 2) * totalHeightOffset +
                    l * tileLength +
                    l * map.tileInterval +
                    totalHeightOffset / 2);

                pathfinding.addNode(node);
                row.push(node);
                sceneManager.nodeMeshes.push(node.mesh);
                holder.add(node.mesh);
            }
            pathfinding.rows.push(row);
        }

        //pathfinding.set("start", pathfinding.rows[14][14]);
        //pathfinding.set("end",   pathfinding.rows[0][14]);

        //pathfinding.addObstacle(pathfinding.rows[0][5]);

        sceneManager.add(holder);
    }
    ,
    random: {
    }
}
});