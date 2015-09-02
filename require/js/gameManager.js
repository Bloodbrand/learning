define(["models", "sceneManager", "pathfinding", "underscore"],
    function(models, sceneManager, pathfinding, underscore) {
    var map = {
        length: 15,
        width: 15,
        tileInterval: 0.2
    };
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
            setColor: function(color){
                this.mesh.material.color.setHex(color);
            },
            setScale: function(scale){
                this.mesh.scale.set(scale.x, scale.y, scale.z);
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

                pathfinding.nodes.push(node);
                row.push(node);
                holder.add(node.mesh);
            }
            pathfinding.rows.push(row);
        }

        pathfinding.set("start", pathfinding.rows[0][0]);
        pathfinding.set("end",   pathfinding.rows[9][5]);
        pathfinding.start();

        sceneManager.add(holder);
    }
}
});