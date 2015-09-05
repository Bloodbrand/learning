define(["underscore", "sceneManager"], function(underscore, sceneManager){
    var pathVars = {
        upDownMoveCost: 10,
        diagMoveCost: 14,
        obstacles: [],
        openList: [],
        closedList: [],
        start: undefined,
        current: undefined,
        end: undefined
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
            stepTime: 10
            ,
            clearAllSprites: function(){
                _.each(this.nodes, function(node){
                    if(node.sprite) node.mesh.remove(node.sprite);
                })
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
        //this.chooseNext();
        setTimeout(_.bind(this.chooseNext, this), pathUtils.stepTime);
    }
    ,
    calcF: function(node){ node.fVal = node.hVal + node.gVal;}
    ,
    chooseNext:function(){
        pathVars.openList = _.sortBy(pathVars.openList, "fVal");
        var nextNode = _.first(pathVars.openList);
        pathVars.openList.shift();
        pathVars.closedList.push(nextNode);
        nextNode.setColor(sceneManager.get("exploredC"));
        if(_.isEqual(nextNode, pathVars.end)){
            pathVars.end.setColor(sceneManager.get("endC"));
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
        pathVars.obstacles.push(obs);
        obs.mesh.visible = false;
    }
    ,
    start: function(){
        this.calcH();
        pathVars.closedList.push(pathVars.start);
        this.calcG(pathVars.start);
        pathVars.start.gVal = 0;
        pathVars.start.setColor(sceneManager.get("startC"));
        pathVars.end.setColor(sceneManager.get("endC"));
    }
    ,
    drawPath: function () {
        while(!_.isEqual(pathVars.current, pathVars.start)){
            pathVars.current.setColor(sceneManager.get("pathC"));
            pathVars.current = pathVars.current.parentNode;
        }
    }
    ,
    reset: function(){
        _.each(this.nodes, function (node) {
            node.setColor(sceneManager.get("unexploredC"));
            node.reset();
        });
        pathVars.closedList = [];
        pathVars.openList = [];

    }
}
});