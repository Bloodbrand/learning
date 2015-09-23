define(["jquery", "pathfinding", "sceneManager", "gameManager", "fileSaver", "maps"],
    function (jquery, pathfinding, sceneManager, gameManager, fileSaver, maps) {

    var raycaster = new THREE.Raycaster(),
            mouse = new THREE.Vector2(),
    eventContainer = $("#webGL"),
    currentMouseOver = undefined;

    $("#startPathfinding").click(function(){ pathfinding.start(); });
    $("#resetPathfinding").click(function(){ pathfinding.reset(); });
    $("#rerollMap").click(function(){ gameManager.rerollMap(); });

        //disable right click context menu
    eventContainer.on('contextmenu', function(){ return false; });

    eventContainer.mousemove(function( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //castRay();
        //currentMouseOver = gameManager.updateVisibleRoute(castRay(), currentMouseOver);
    });

    eventContainer.mousedown(function(event) { mouseDown(event); });

    function mouseDown(event){
        var intersect;
        if((intersect = castRay()) == undefined) return;
        if(event.which == 1) {//left click
            pathfinding.set("end", intersect.object.node);
            //intersect.object.node.setColor(sceneManager.get("startC"));
            //debug.addNode(intersect.object.node);
            //console.log(intersect.object.node);
            //sandbox.applyTexture(intersect.object.node);
            //sandbox.addObstacle(intersect.object.node);
        }
        if(event.which == 3) {//right click
            //intersect.object.node.setColor(sceneManager.get("endC"));
            //pathfinding.set("end", intersect.object.node);
        }
    }

    function castRay(){
        raycaster.setFromCamera( mouse, sceneManager.camera );
        return (raycaster.intersectObjects( sceneManager.nodeMeshes )[0]);
    }

    $(document).keypress(function(event){
        switch (event.which){
            case 96:
                //var node = castRay().object;
                //if(node)debug.addNode(node);
                //sandbox.printNodes();
                sandbox.saveMap();
            break;
        }
    });

    //sandbox creation
    $('#obstacle').click(function(){});
    $('#tile1').click(function(){ sandbox.selectedMap = "tile1"; });
    $('#tile2').click(function(){ sandbox.selectedMap = "tile2"; });
    $('#tile3').click(function(){ sandbox.selectedMap = "tile3"; });
    $('#tile4').click(function(){ sandbox.selectedMap = "tile4"; });
    $('#tile6').click(function(){ sandbox.selectedMap = "tile6"; });
    $('#tile7').click(function(){ sandbox.selectedMap = "tile7"; });
    $('#tile8').click(function(){ sandbox.selectedMap = "tile8"; });
    $('#tile9').click(function(){ sandbox.selectedMap = "tile9"; });
    $('#tile10').click(function(){ sandbox.selectedMap = "tile10"; });
    $('#tile18').click(function(){ sandbox.selectedMap = "tile18"; });
    $('#tile19').click(function(){ sandbox.selectedMap = "tile19"; });
    $('#tile27').click(function(){ sandbox.selectedMap = "tile27"; });
    $('#tile25').click(function(){ sandbox.selectedMap = "tile25"; });
    $('#tile26').click(function(){ sandbox.selectedMap = "tile26"; });
    $('#tile17').click(function(){ sandbox.selectedMap = "tile17"; });
    $('#tile11').click(function(){ sandbox.selectedMap = "tile11"; });
    $('#tile12').click(function(){ sandbox.selectedMap = "tile12"; });
    $('#tile13').click(function(){ sandbox.selectedMap = "tile13"; });
    $('#tile14').click(function(){ sandbox.selectedMap = "tile14"; });
    $('#tile15').click(function(){ sandbox.selectedMap = "tile15"; });
    $('#tile21').click(function(){ sandbox.selectedMap = "tile21"; });
    $('#tile22').click(function(){ sandbox.selectedMap = "tile22"; });
    $('#tile20').click(function(){ sandbox.selectedMap = "tile20"; });
    $('#tile3b').click(function(){ sandbox.selectedMap = "tile3b"; });
    $('#tile16').click(function(){ sandbox.selectedMap = "tile16"; });
    $('#terrainTile2').click(function(){ sandbox.selectedMap = "terrainTile2"; });
    $('#terrainTile3').click(function(){ sandbox.selectedMap = "terrainTile3"; });

    var sandbox = function(){
        var nodes = [];
        return{
            selectedMap: undefined
            ,
            addNode: function(node){
                nodes.push({row: node.row, col: node.col});
            }
            ,
            printNodes: function(){
                var retS = "";
                _.each(nodes, function(node){
                    retS+="["+node.row+","+node.col+"],";
                });
                console.log(retS);
            }
            ,
            applyTexture: function(node){
                node.tile = this.selectedMap;
                node.mesh.material.map = sceneManager.get(this.selectedMap);
                node.mesh.material.needsUpdate = true;
            }
            ,
            addObstacle: function(node){
                var map = maps.getMap();
                node.tile = this.selectedMap;
                //node.setColor(0x00ff00);
                map.addObstacles(node);
                node.mesh.material.map = sceneManager.get(this.selectedMap);
                node.mesh.material.needsUpdate = true;
            }
            ,
            saveMap: function(){
                var map = maps.getMap();

                map.rows = [];
                map.obstacles = [];

                _.each(pathfinding.rows, function(row){ map.addRow(row); });
                _.each(pathfinding.get("obstacles"), function(obs){ map.addObstacles(obs); });
                var json = JSON.stringify(map, null, 1);

                var blob = new Blob([json], {type: "application/json"});
                saveAs(blob, "test.JSON");
            }
        }
    }();
});