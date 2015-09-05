define(["jquery", "pathfinding", "sceneManager"], function (jquery, pathfinding, sceneManager) {
    var raycaster = new THREE.Raycaster(),
            mouse = new THREE.Vector2(),
    eventContainer = $("#webGL");

    $("#startPathfinding").click(function(){ pathfinding.start(); });
    $("#resetPathfinding").click(function(){ pathfinding.reset(); });
    eventContainer.on('contextmenu', function(){ return false; });

    eventContainer.mousemove(function( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        castRay();
    });

    eventContainer.mousedown(function(event) {
        var intersect;
        if((intersect = castRay()) == undefined) return;
        if(event.which == 1) {//left click
            intersect.object.node.setColor(sceneManager.get("startC"));
            pathfinding.set("start", intersect.object.node);
        }
        if(event.which == 3) {//right click
            intersect.object.node.setColor(sceneManager.get("endC"));
            pathfinding.set("end", intersect.object.node);
        }
    });

    function castRay(){
        raycaster.setFromCamera( mouse, sceneManager.camera );
        return (raycaster.intersectObjects( sceneManager.nodeMeshes )[0]);
    }
});