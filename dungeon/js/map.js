System.register(["./lib/triangulation/triangulation", "./lib/triangulation/utils", "./lib/triangulation/geometryModule", "./lib/triangulation/quadTree"], function(exports_1) {
    "use strict";
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
                    this.width = 200;
                    this.height = 200;
                    this.rooms = 15;
                    this.points = this.generateRandomPoints(this.rooms);
                    this.tri = new triangulation_1.Triangulation(this.points);
                    this.tri.Triangulate();
                    this.mst = this.tri.FindMinSpanTree();
                    var v1 = new geometryModule_1.Geometry.Vector2(0, 0);
                    var v2 = new geometryModule_1.Geometry.Vector2(this.width, 0);
                    var v3 = new geometryModule_1.Geometry.Vector2(this.width, this.height);
                    var v4 = new geometryModule_1.Geometry.Vector2(0, this.height);
                    this.quadTree = new quadTree_1.QuadTree(v1, v2, v3, v4);
                    this.quadTree.Start(this.points);
                }
                Map.prototype.generateRandomPoints = function (points) {
                    var margin = 0;
                    var pts = [];
                    for (var i = 0; i < points; i++)
                        pts.push(new geometryModule_1.Geometry.Vector2(utils_1.Utils.RandomNum(0 + margin, this.width - margin), utils_1.Utils.RandomNum(0 + margin, this.height - margin)));
                    utils_1.Utils.Sort(pts, "y");
                    return pts;
                };
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
