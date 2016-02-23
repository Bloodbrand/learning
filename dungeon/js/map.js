System.register(["./lib/triangulation/triangulation", "./lib/triangulation/utils", "./lib/triangulation/geometryModule"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var triangulation_1, utils_1, geometryModule_1;
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
            }],
        execute: function() {
            Map = (function () {
                function Map() {
                    this.width = 200;
                    this.height = 200;
                    this.rooms = 125;
                    this.extraLines = 10;
                    this.points = this.generateRandomPoints(this.rooms);
                    //this.points = this.generateCustomPoints( this.rooms );
                    this.tri = new triangulation_1.Triangulation(this.points);
                    this.tri.Triangulate();
                    this.mst = this.tri.FindMinSpanTree();
                    this.mst = this.mst.concat(utils_1.Utils.RandomFromArray(this.tri.NonMinSpanLines, this.extraLines));
                    this.quadTree = this.tri.MakeQuadTrees(this.points, this.width, this.height);
                }
                Map.prototype.generateRandomPoints = function (points) {
                    var margin = 0;
                    var pts = [];
                    for (var i = 0; i < points; i++)
                        pts.push(new geometryModule_1.Geometry.Vector2(utils_1.Utils.RandomNum(0 + margin, this.width - margin), utils_1.Utils.RandomNum(0 + margin, this.height - margin)));
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
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
