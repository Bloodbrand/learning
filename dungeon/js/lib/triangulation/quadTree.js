System.register(["geometryModule", "utils"], function(exports_1) {
    "use strict";
    var geometryModule_1, utils_1;
    var QuadTree;
    return {
        setters:[
            function (geometryModule_1_1) {
                geometryModule_1 = geometryModule_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            QuadTree = (function () {
                function QuadTree(a, b, c, d) {
                    this.Children = [];
                    this.BottomLayer = [];
                    this.capacity = 1;
                    this.containedPoints = [];
                    this.ID = utils_1.Utils.UniqueID();
                    this.Vertices = [a, b, c, d];
                    this.Centroid = utils_1.Utils.FindPolyCentroid([a, b, c, d]);
                    var verticesClone = this.Vertices.slice(0);
                    utils_1.Utils.Sort(verticesClone, "x");
                    this.Left = verticesClone[0].x;
                    this.Right = verticesClone[3].x;
                    this.Side = this.Right - this.Left;
                    utils_1.Utils.Sort(verticesClone, "y");
                    this.Bottom = verticesClone[0].y;
                    this.Top = verticesClone[3].y;
                }
                QuadTree.prototype.Contains = function (p) {
                    var x = p.x;
                    var y = p.y;
                    if ((x > this.Left && x < this.Right) &&
                        (y < this.Top && y > this.Bottom))
                        return true;
                    else
                        return false;
                };
                QuadTree.prototype.Divide = function (arg) {
                    var width = this.Right - this.Left;
                    var height = this.Top - this.Bottom;
                    var midwayX = this.Left + width / 2;
                    var midwayY = this.Bottom + height / 2;
                    var quad1 = new QuadTree(this.Vertices[0], new geometryModule_1.Geometry.Vector2(midwayX, this.Bottom), new geometryModule_1.Geometry.Vector2(midwayX, midwayY), new geometryModule_1.Geometry.Vector2(this.Left, midwayY));
                    var quad2 = new QuadTree(new geometryModule_1.Geometry.Vector2(midwayX, this.Bottom), this.Vertices[1], new geometryModule_1.Geometry.Vector2(this.Right, midwayY), new geometryModule_1.Geometry.Vector2(midwayX, midwayY));
                    var quad3 = new QuadTree(new geometryModule_1.Geometry.Vector2(midwayX, midwayY), new geometryModule_1.Geometry.Vector2(this.Right, midwayY), this.Vertices[2], new geometryModule_1.Geometry.Vector2(midwayX, this.Top));
                    var quad4 = new QuadTree(new geometryModule_1.Geometry.Vector2(this.Left, midwayY), new geometryModule_1.Geometry.Vector2(midwayX, midwayY), new geometryModule_1.Geometry.Vector2(midwayX, this.Top), this.Vertices[3]);
                    this.Children = [quad1, quad2, quad3, quad4];
                    for (var c = 0; c < this.Children.length; c++) {
                        var curC = this.Children[c];
                        curC.Parent = this;
                        if (typeof arg === "number")
                            curC.Start(arg);
                        else
                            curC.Start(this.Points);
                    }
                    return this.Children;
                };
                ;
                QuadTree.prototype.Start = function (args) {
                    // depth
                    if (typeof args === "number")
                        this.startDepth(args);
                    // points
                    if (args.constructor.name === "Array")
                        this.startPoints(args);
                };
                ;
                QuadTree.prototype.startDepth = function (depth) {
                    if (!this.Parent)
                        this.Depth = 0;
                    else
                        this.Depth = this.Parent.Depth + 1;
                    if (this.Depth < depth)
                        this.Divide(depth);
                    else {
                        var parent_1 = this.Parent;
                        var last = void 0;
                        while (parent_1) {
                            last = parent_1;
                            parent_1 = parent_1.Parent;
                        }
                        last.BottomLayer.push(this);
                    }
                };
                QuadTree.prototype.startPoints = function (points) {
                    this.Points = points;
                    for (var p = 0; p < this.Points.length; p++) {
                        var curP = this.Points[p];
                        if (this.Contains(curP)) {
                            if (this.containedPoints.length < this.capacity) {
                                curP.QuadTree = this;
                                this.containedPoints.push(curP);
                            }
                            else {
                                this.containedPoints.length = 0;
                                this.Divide();
                                break;
                            }
                        }
                    }
                };
                return QuadTree;
            }());
            exports_1("QuadTree", QuadTree);
        }
    }
});
