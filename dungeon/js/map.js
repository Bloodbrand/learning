System.register(["./lib/triangulation/triangulation", "./lib/triangulation/utils", "./lib/triangulation/geometryModule", "./lib/triangulation/quadTree"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var triangulation_1, utils_1, geometryModule_1, quadTree_1;
    var Map;
    return {
        setters:[
            function (triangulation_1_1) {
                triangulation_1 = triangulation_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (geometryModule_1_1) {
                geometryModule_1 = geometryModule_1_1;
            },
            function (quadTree_1_1) {
                quadTree_1 = quadTree_1_1;
            }],
        execute: function() {
            Map = (function () {
                function Map() {
                    this.Rooms = [];
                    this.width = 300;
                    this.height = 300;
                    this.roomsNum = 150;
                    this.extraLines = 10;
                    this.quadTree = this.MakeQuadTrees(this.width, this.height);
                    this.Rooms = this.quadTree.BottomLayer;
                    this.Points = this.generateRandomPoints(this.roomsNum);
                    //this.points = this.generateCustomPoints( this.roomsNum );
                    this.tri = new triangulation_1.Triangulation(this.Points);
                    this.tri.Triangulate();
                    this.Mst = this.tri.FindMinSpanTree();
                    this.Mst = this.Mst.concat(utils_1.Utils.RandomFromArray(this.tri.NonMinSpanLines, this.extraLines));
                }
                Map.prototype.generateRandomPoints = function (points) {
                    var margin = 0;
                    var pts = [];
                    for (var i = 0; i < points; i++)
                        /*pts.push(
                            new Geometry.Vector2(
                            Utils.RandomNum( 0 + margin, this.width - margin ),
                            Utils.RandomNum( 0 + margin, this.height  - margin ))
                        );*/
                        pts.push(this.Rooms[utils_1.Utils.RandomNum(0, this.Rooms.length)].Centroid);
                    return utils_1.Utils.Sort(pts, "y");
                };
                Map.prototype.generateCustomPoints = function (points) {
                    var margin = 2;
                    var rows = 10;
                    var cols = 10;
                    var rowSize = (this.height - margin * 2) / rows;
                    var colSize = (this.width - margin * 2) / cols;
                    var pts = [];
                    for (var r = 0; r <= rows; r++) {
                        pts.push(new geometryModule_1.Geometry.Vector2(margin, rowSize * r + margin));
                        for (var c = 1; c <= cols; c++)
                            pts.push(new geometryModule_1.Geometry.Vector2(colSize * c + margin + 1, rowSize * r + margin));
                    }
                    ;
                    return utils_1.Utils.Sort(pts, "y");
                };
                Map.prototype.MakeQuadTrees = function (width, height) {
                    var v1 = new geometryModule_1.Geometry.Vector2(0, 0);
                    var v2 = new geometryModule_1.Geometry.Vector2(width, 0);
                    var v3 = new geometryModule_1.Geometry.Vector2(width, height);
                    var v4 = new geometryModule_1.Geometry.Vector2(0, height);
                    var newQuad = new quadTree_1.QuadTree(v1, v2, v3, v4);
                    //newQuad.Start( points );
                    newQuad.Start(5);
                    return newQuad;
                };
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
