define([], function(){
    var Map = function(data){
        this.width = data.width;
        this.length = data.length;
        this.tileInterval = 0.1;
        this.obstacles = (data.obstacles || []);
        this.rows = data.rows;
        this.start = undefined;
        this.end = undefined;

        this.addRow = function(row){
            var cleanedRow = [];
            _.each(row, function(node){
                cleanedRow.push(_.omit(node, 'mesh'));
            });
            this.rows.push(cleanedRow);
        };

        this.addObstacles = function(obs){
            obs = _.omit(obs, 'mesh');
            if(_.contains(this.obstacles, obs)) return;
            this.obstacles.push({row: obs.row, col: obs.col});
        };

        this.setStart = function(node){
            this.start = node;
        };

        this.setEnd = function(node){
            this.end = node;
        }
    };

    var map1 = new Map({width: 10, length: 10});
    //var map1 = new Map(parseJSONfile("maps/1.json"));
    map1.setStart({x: 0, y: 0});
    map1.setEnd({x: 9, y: 9});

    function parseJSONfile(file) {
        var request = new XMLHttpRequest();
        request.open("GET", file, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }

    var mapPublic = {};

    mapPublic.getMap = function(){
        return map1;
    };

    return mapPublic;
});