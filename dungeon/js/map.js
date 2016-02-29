System.register(["./lib/triangulation/triangulation", "./lib/triangulation/utils", "./lib/triangulation/geometryModule", "./lib/triangulation/quadTree", "room"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var triangulation_1, utils_1, geometryModule_1, quadTree_1, room_1;
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
            },
            function (room_1_1) {
                room_1 = room_1_1;
            }],
        execute: function() {
            Map = (function () {
                function Map() {
                    this.rooms = [];
                    this.width = 300;
                    this.height = 300;
                    this.roomsNum = 75;
                    this.extraLines = 100;
                    this.quadTree = this.MakeQuadTrees();
                    this.allRooms = this.quadTree.BottomLayer;
                    this.points = this.chooseRandomRooms(this.roomsNum);
                    this.tri = new triangulation_1.Triangulation(this.points);
                    this.tri.Triangulate();
                    this.mst = this.tri.FindMinSpanTree();
                    this.mst = this.mst.concat(utils_1.Utils.RandomUniqueFromArray(this.tri.NonMinSpanLines, this.extraLines));
                }
                Object.defineProperty(Map.prototype, "Mst", {
                    get: function () { return this.mst; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "Width", {
                    get: function () { return this.width; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "Height", {
                    get: function () { return this.height; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "Rooms", {
                    get: function () { return this.rooms; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "Points", {
                    get: function () { return this.points; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.chooseRandomRooms = function (points) {
                    var pts = [];
                    var quadTrees = utils_1.Utils.RandomFromArray(this.allRooms, this.roomsNum);
                    for (var q = 0; q < quadTrees.length; q++) {
                        var newRoom = new room_1.Room(3);
                        newRoom.QuadTree = quadTrees[q];
                        this.rooms.push(newRoom);
                    }
                    for (var r = 0; r < this.rooms.length; r++)
                        pts.push(this.rooms[r].QuadTree.Centroid);
                    return utils_1.Utils.Sort(pts, "y");
                };
                Map.prototype.MakeQuadTrees = function () {
                    var v1 = new geometryModule_1.Geometry.Vector2(0, 0);
                    var v2 = new geometryModule_1.Geometry.Vector2(this.width, 0);
                    var v3 = new geometryModule_1.Geometry.Vector2(this.width, this.height);
                    var v4 = new geometryModule_1.Geometry.Vector2(0, this.height);
                    var newQuad = new quadTree_1.QuadTree(v1, v2, v3, v4);
                    newQuad.Start(4);
                    return newQuad;
                };
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
