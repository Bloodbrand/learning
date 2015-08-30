define(["models", "sceneManager"], function(models, sceneManager) {
    var map = {
        length: 15,
        width: 15,
        tileInterval: 0.1
    };
return{
    generateMap: function(){
        var holder = models.returnHolder();
        var tileWidth = models.get('tile', 'width');
        var tileLength = models.get('tile', 'length');

        for(var w = 0; w < map.width; w++)
            for(var l = 0; l < map.length; l++){
                var tile = models.returnTile();
                tile.position.setX( (-map.width / 2) + (w * tileWidth) + (w * map.tileInterval ));
                tile.position.setZ( (-map.length / 2) + (l * tileLength) + (l * map.tileInterval ));
                holder.add(tile);
            }

        sceneManager.add(holder);
    }
}
});