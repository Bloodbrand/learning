System.register(["./lib/triangulation/triangulation", "./lib/triangulation/utils", "./lib/triangulation/geometryModule", "./lib/triangulation/quadTree", "room"], function(exports_1) {
    "use strict";
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
                    this.roomsRow = [];
                    this.roomsCol = [];
                    this.roomsNum = 75;
                    this.extraCorridors = 0;
                    this.roomsRow.length = this.width;
                    this.roomsCol.length = this.height;
                    this.quadTree = this.makeQuadTrees();
                    this.allPossibleRooms = this.quadTree.BottomLayer;
                    this.points = this.chooseRandomRooms(this.roomsNum);
                    this.tri = new triangulation_1.Triangulation(this.points);
                    this.tri.Triangulate();
                    this.corridors = this.tri.FindMinSpanTree();
                    this.corridors = this.corridors.concat(utils_1.Utils.RandomUniqueFromArray(this.tri.NonMinSpanLines, this.extraCorridors));
                    this.corridors = this.makeManhattanCorridors();
                    this.cleanCorridors();
                }
                Object.defineProperty(Map.prototype, "Corridors", {
                    get: function () { return this.corridors; },
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
                Object.defineProperty(Map.prototype, "Triangulation", {
                    get: function () { return this.tri; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.makeQuadTrees = function () {
                    var v1 = new geometryModule_1.Geometry.Vector2(0, 0);
                    var v2 = new geometryModule_1.Geometry.Vector2(this.width, 0);
                    var v3 = new geometryModule_1.Geometry.Vector2(this.width, this.height);
                    var v4 = new geometryModule_1.Geometry.Vector2(0, this.height);
                    var newQuad = new quadTree_1.QuadTree(v1, v2, v3, v4);
                    newQuad.Start(4);
                    return newQuad;
                };
                Map.prototype.chooseRandomRooms = function (points) {
                    var pts = [];
                    var selectedQuadTrees = utils_1.Utils.RandomFromArray(this.allPossibleRooms, this.roomsNum);
                    for (var q = 0; q < selectedQuadTrees.length; q++) {
                        var newRoom = new room_1.Room({ difficulty: 3 });
                        newRoom.QuadTree = selectedQuadTrees[q];
                        newRoom.QuadTree.Centroid.AssociatedRoom = newRoom;
                        this.addToRoomGrid(newRoom);
                        this.rooms.push(newRoom);
                    }
                    for (var r = 0; r < this.rooms.length; r++)
                        pts.push(this.rooms[r].QuadTree.Centroid);
                    return utils_1.Utils.Sort(pts, "y");
                };
                Map.prototype.addToRoomGrid = function (room) {
                    room.MapGridX = Math.round(room.QuadTree.Centroid.x);
                    room.MapGridY = Math.round(room.QuadTree.Centroid.y);
                    this.roomsRow[room.MapGridX] = room;
                    this.roomsCol[room.MapGridY] = room;
                };
                Map.prototype.makeManhattanCorridors = function () {
                    var manhattanCorridors = [];
                    for (var c = 0; c < this.corridors.length; c++) {
                        var curLine = this.corridors[c];
                        var line1 = new geometryModule_1.Geometry.Line(curLine.v1, new geometryModule_1.Geometry.Vector2(curLine.v1.x, curLine.v2.y));
                        var line2 = new geometryModule_1.Geometry.Line(curLine.v2, new geometryModule_1.Geometry.Vector2(curLine.v1.x, curLine.v2.y));
                        manhattanCorridors.push(line1);
                        manhattanCorridors.push(line2);
                    }
                    return manhattanCorridors;
                };
                Map.prototype.cleanCorridors = function () {
                    for (var c = this.corridors.length - 1; c >= 0; c--) {
                        var curCor = this.corridors[c];
                        var room1 = curCor.v1.AssociatedRoom;
                        var room2 = curCor.v2.AssociatedRoom;
                        if (this.areRoomsAdjacent(room1, room2))
                            this.corridors.splice(c, 1);
                    }
                };
                Map.prototype.areRoomsAdjacent = function (room1, room2) {
                    if ((this.roomsRow[room1.MapGridX] == this.roomsRow[room2.MapGridX]))
                        return true;
                };
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
