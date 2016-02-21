System.register(["geometryModule", "utils", "quadTree"], function(exports_1) {
    "use strict";
    var geometryModule_1, utils_1, quadTree_1;
    var Triangulation;
    return {
        setters:[
            function (geometryModule_1_1) {
                geometryModule_1 = geometryModule_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (quadTree_1_1) {
                quadTree_1 = quadTree_1_1;
            }],
        execute: function() {
            Triangulation = (function () {
                function Triangulation(Points) {
                    if (Points === void 0) { Points = []; }
                    this.Points = Points;
                    this.Triangles = [];
                    this.Lines = [];
                    this.side = 10000;
                    this.HolderTriangle = this.makeHolderTriangle();
                    this.Triangles.push(this.HolderTriangle);
                }
                Triangulation.prototype.makeHolderTriangle = function () {
                    var a = new geometryModule_1.Geometry.Vector2(0, -this.side);
                    var b = new geometryModule_1.Geometry.Vector2(-this.side, this.side);
                    var c = new geometryModule_1.Geometry.Vector2(this.side, this.side);
                    var holderTri = new geometryModule_1.Geometry.Triangle(a, b, c);
                    holderTri.Centroid = utils_1.Utils.FindCentroid(holderTri);
                    return holderTri;
                };
                Triangulation.prototype.cleanHolderTriangle = function () {
                    var a = this.HolderTriangle.a;
                    var b = this.HolderTriangle.b;
                    var c = this.HolderTriangle.c;
                    for (var t = this.Triangles.length - 1; t >= 0; t--) {
                        var curT = this.Triangles[t];
                        if ((utils_1.Utils.IsSamePoint(curT.a, a) || utils_1.Utils.IsSamePoint(curT.b, a) || utils_1.Utils.IsSamePoint(curT.c, a)) ||
                            (utils_1.Utils.IsSamePoint(curT.a, b) || utils_1.Utils.IsSamePoint(curT.b, b) || utils_1.Utils.IsSamePoint(curT.c, b)) ||
                            (utils_1.Utils.IsSamePoint(curT.a, c) || utils_1.Utils.IsSamePoint(curT.b, c) || utils_1.Utils.IsSamePoint(curT.c, c)))
                            this.Triangles.splice(t, 1);
                    }
                    ;
                };
                Triangulation.prototype.Triangulate = function () {
                    var badTriangles = [];
                    for (var p = 0; p < this.Points.length; p++) {
                        var curP = this.Points[p];
                        for (var t = this.Triangles.length - 1; t >= 0; t--) {
                            var curT = this.Triangles[t];
                            if (utils_1.Utils.PointInCircumcircle(curP, curT) == true) {
                                this.Triangles.splice(t, 1);
                                badTriangles.push(curT);
                            }
                        }
                        var uniqueLines = utils_1.Utils.FindUniqueLines(badTriangles);
                        for (var ul = 0; ul < uniqueLines.length; ul++) {
                            var curL = uniqueLines[ul];
                            var tri = new geometryModule_1.Geometry.Triangle(curP, curL.v1, curL.v2);
                            this.Triangles.push(tri);
                        }
                    }
                    this.cleanHolderTriangle();
                };
                Triangulation.prototype.FindHull = function () {
                    var hullLines = [];
                    var uniqueLines = utils_1.Utils.FindUniqueLines(this.Triangles);
                    var pts = utils_1.Utils.ArrayFromProp(uniqueLines, ["v1", "v2"]);
                    var length = pts.length;
                    var centroid = utils_1.Utils.FindPolyCentroid(pts);
                    pts = utils_1.Utils.ArrangePointsCCWPoly(pts);
                    for (var p = length - 1; p >= 0; p -= 2)
                        pts.splice(p, 1);
                    length = pts.length;
                    for (var up = 1; up < length; up++)
                        hullLines.push(new geometryModule_1.Geometry.Line(pts[up - 1], pts[up]));
                    hullLines.push(new geometryModule_1.Geometry.Line(pts[length - 1], pts[0]));
                    this.HullPoints = pts;
                    this.HullLines = hullLines;
                    return pts;
                };
                Triangulation.prototype.FindMinSpanTree = function () {
                    var mst = [];
                    this.UniqueLines = this.Lines.slice(0);
                    for (var t = 0; t < this.Triangles.length; t++) {
                        var curTri = this.Triangles[t];
                        curTri.GetLinesLength();
                        this.UniqueLines = this.UniqueLines.concat(curTri.GetLinesArray());
                    }
                    ;
                    this.UniqueLines = utils_1.Utils.Sort(this.UniqueLines, "length");
                    for (var l = this.UniqueLines.length - 1; l >= 1; l--)
                        if (utils_1.Utils.IsSameLine(this.UniqueLines[l], this.UniqueLines[l - 1]))
                            this.UniqueLines.splice(l, 1);
                    this.NonMinSpanLines = this.UniqueLines.slice(0);
                    for (var p = 0; p < this.Points.length; p++)
                        new geometryModule_1.Geometry.DisjoinedSet(this.Points[p]);
                    for (var l = 0; l < this.UniqueLines.length; l++) {
                        var curLine = this.UniqueLines[l];
                        if (curLine.v1.DisjoinedSet.ID !== curLine.v2.DisjoinedSet.ID) {
                            curLine.v1.DisjoinedSet.Merge(curLine.v2.DisjoinedSet);
                            mst.push(curLine);
                            this.NonMinSpanLines[l] = undefined;
                        }
                    }
                    return mst;
                };
                Triangulation.prototype.MakeQuadTrees = function (points) {
                    var v1 = new geometryModule_1.Geometry.Vector2(0, 0);
                    var v2 = new geometryModule_1.Geometry.Vector2(200, 0);
                    var v3 = new geometryModule_1.Geometry.Vector2(200, 200);
                    var v4 = new geometryModule_1.Geometry.Vector2(0, 200);
                    var newQuad = new quadTree_1.QuadTree(v1, v2, v3, v4);
                    newQuad.Start(points);
                    return newQuad;
                };
                return Triangulation;
            }());
            exports_1("Triangulation", Triangulation);
        }
    }
});
