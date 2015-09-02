define(["underscore"], function(underscore){
    var pathVars = {
        start: undefined,
        current: undefined,
        end: undefined,
        upDownG_Val: 10,
        diagG_Val: 14,
        openList: [],
        closedList: []
    };

    function isDiagonal(node, checkNode){
        return !(checkNode.col == node.col || checkNode.row == node.row);
    }

    function determineParent(node, checkNode){
        if(!checkNode.parentNode) {
            checkNode.parentNode = node;
            return;
        }
        checkNode.parent = 1;
    }

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
            var colVals = [node.col, pathVars.end.col].sort(),
                rowVals = [node.row, pathVars.end.row].sort();

            node.hVal = (colVals[1] - colVals[0]) + (rowVals[1] - rowVals[0]);
        });
    }
    ,
    calcG: function(node){
        var total = 9;
        for (var i = 0; i < total; i++){
            var rowNum = total + -Math.floor((32 - i) / 3),
                curRow = this.rows[node.row + rowNum];
            if(!curRow) continue;

            var colNum = node.col + (i % 3) - 1,
                curNode = curRow[colNum];
            if(!curNode) continue;

                                         //on closed list
            if(_.contains(pathVars.closedList, curNode)) continue;

            if(_.isEqual(curNode, node)){//parent node
                pathVars.closedList.push(curNode);
                curNode.setScale({x: 1, y: 1, z: 1});
            } else {                     //neighbour node
                determineParent(node, curNode);
                                         //only add if not contains
                if(!_.contains(pathVars.openList, curNode))
                    pathVars.openList.push(curNode);

                curNode.setScale({x: 0.3, y: 1, z: 0.3});
                                         //values get assigned here
                if(isDiagonal(node, curNode))
                    curNode.gVal = pathVars.diagG_Val;
                else curNode.gVal = pathVars.upDownG_Val;

                curNode.setScale({x: 0.3, y: 1, z: 0.3});
                this.calcF(curNode);
            }
        }
        this.chooseNext();
    }
    ,
    calcF: function(node){ node.fVal = node.hVal + node.gVal; }
    ,
    chooseNext:function(){
        pathVars.openList = _.sortBy(pathVars.openList, "fVal");
        var nextNode = _.first(pathVars.openList);
        pathVars.openList.shift();
        //console.log(nextNode);
        pathVars.closedList.push(nextNode);
        nextNode.setScale({x: 0.5, y: 2, z: 0.5});
        nextNode.setColor(0xffffff);
        if(_.isEqual(nextNode, pathVars.end)){
            nextNode.setColor(0x00ff00);
            nextNode.setScale({x: 0.5, y: 30, z: 0.5});
            return;
        }
        this.calcG(nextNode);

    }
    ,
    start: function(){
        this.calcH();
        pathVars.closedList.push(pathVars.start);
        this.calcG(pathVars.start);
        pathVars.start.setScale({x: 0.5, y: 30, z: 0.5});
        pathVars.start.setColor(0xff0000);
        //this.calcG(pathVars.end);
    }
}
});