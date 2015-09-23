define(["underscore", "sceneManager", "models"], function(underscore, sceneManager, models){
    var pathVars = {
        upDownMoveCost: 1.0,
        diagMoveCost: Infinity,//1.4,//
        obstacles: [],
        openList: [],
        closedList: [],
        start: undefined,
        current: undefined,
        end: undefined,
        pathLine: undefined,
        movement: 5,
        path: []
    };

    function isDiagonal(node, checkNode){
        return (checkNode.col != node.col && checkNode.row != node.row);
    }

    function determineParent(node, checkNode){
        if(!checkNode.parentNode){
            checkNode.parentNode = node;
            return true;
        }

        var moveCost = pathVars.upDownMoveCost;
        if(isDiagonal(node, checkNode)) moveCost = pathVars.diagMoveCost;
        if((node.gVal + moveCost) < checkNode.gVal){
            checkNode.parentNode = node;
            return true;
        }
    }

    var pathUtils = function(){
        return{
            stepTime: 100
            ,
            clearAllSprites: function(){
                _.each(this.nodes, function(node){
                    if(node.sprite) node.mesh.remove(node.sprite);
                })
            }
            ,
            drawPathLine: function(nodes){
                var material = new THREE.LineBasicMaterial({color: sceneManager.get("unexploredC")});
                var materialFatigue = new THREE.LineBasicMaterial({color: sceneManager.get("startC")});
                var geometry = new THREE.Geometry();

                for (var i = 0; i < nodes.length; i++) {
                    var curNodePos = new THREE.Vector3().copy(nodes[i].mesh.position);
                    curNodePos.y += models.get("tile", "height");
                    geometry.vertices.push(curNodePos);
                }

                var line = new THREE.Line( geometry, material );
                pathVars.pathLine = line;
                sceneManager.add(line);
            }
        }
    }();

return{
    rows: []
    ,
    nodes: []
    ,
    get: function(prop){ return pathVars[prop]; }
    ,
    set: function(prop, val){ pathVars[prop] = val; }
    ,
    calcH: function(){
        //manhattan
        _.each(this.nodes, function (node) {
            node.hVal = Math.abs(node.col - pathVars.end.col) + Math.abs(node.row - pathVars.end.row);
        });
    }
    ,
    calcG: function(node){
        if(!node) return;
        pathVars.current = node;
        var neighbours = 9, curRow = undefined, curNode = undefined;
        for (var i = 0; i < neighbours; i++){
            var rowNum = neighbours + -Math.floor((32 - i) / 3);
            if((curRow = this.rows[node.row + rowNum]) == undefined) continue;

            var colNum = node.col + (i % 3) - 1;
            if((curNode = curRow[colNum]) == undefined) continue;
                                        //obstacle
            if(_.contains(pathVars.obstacles, curNode)) continue;
                                        //on closed list
            if(_.contains(pathVars.closedList, curNode)) continue;
                                        //parent node
            if(_.isEqual(curNode, node)) pathVars.closedList.push(curNode);
            else {                      //neighbour node
                if(!determineParent(node, curNode)) continue;
                                        //only add if not contains
                if(!_.contains(pathVars.openList, curNode)) pathVars.openList.push(curNode);
                                        //g value gets assigned here
                if(isDiagonal(node, curNode)) curNode.gVal = node.gVal + pathVars.diagMoveCost;
                else curNode.gVal = node.gVal + pathVars.upDownMoveCost;

                this.calcF(curNode);
            }
        }
        this.chooseNext();
        //setTimeout(_.bind(this.chooseNext, this), pathUtils.stepTime);
    }
    ,
    calcF: function(node){ node.fVal = node.hVal + node.gVal;}
    ,
    chooseNext:function(){
        pathVars.openList = _.sortBy(pathVars.openList, "fVal");
        var nextNode = _.first(pathVars.openList);
        pathVars.openList.shift();
        pathVars.closedList.push(nextNode);
        if(_.isEqual(nextNode, pathVars.end)){
            pathVars.current = pathVars.end;
            this.drawPath();
            return;
        }
        this.calcG(nextNode);
    }
    ,
    addNode: function(node){ this.nodes.push(node); }
    ,
    addObstacle: function(obs){
        if(_.contains(pathVars.obstacles, obs)) return;
        pathVars.obstacles.push(obs);
        //obs.mesh.visible = false;
    }
    ,
    setStart: function(node){ pathVars.start = this.rows[node.x][node.y]; }
    ,
    setEnd: function(node){ pathVars.end = this.rows[node.x][node.y]; }
    ,
    start: function(){
        this.calcH();
        pathVars.closedList.push(pathVars.start);
        this.calcG(pathVars.start);
        pathVars.start.gVal = 0;
    }
    ,
    drawPath: function () {
        var path = [];
        while(!_.isEqual(pathVars.current, pathVars.start)){
            path.push(pathVars.current);
            pathVars.current = pathVars.current.parentNode;
        }
        path.push(pathVars.start);
        pathUtils.drawPathLine(path);
        path.reverse();
        pathVars.path = path;
    }
    ,
    reset: function(){
        _.each(this.nodes, function (node) {
            node.reset();
        });
        sceneManager.remove(pathVars.pathLine);
        pathVars.closedList = [];
        pathVars.openList = [];
    }
}
});