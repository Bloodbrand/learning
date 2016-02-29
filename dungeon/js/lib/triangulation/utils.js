System.register(["geometryModule"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var geometryModule_1;
    var Utils;
    return {
        setters:[
            function (geometryModule_1_1) {
                geometryModule_1 = geometryModule_1_1;
            }],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                Utils.UniqueID = function () {
                    return Utils.uniqueID++;
                };
                Utils.RandomNum = function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                Utils.RandomFromArray = function (arr, num) {
                    var chosenNumbers = [];
                    var chosen = [];
                    if (num > arr.length) {
                        num = arr.length;
                        console.warn("'RandomFromArray():'More elements than available, returning max number");
                    }
                    while (chosen.length < num) {
                        var randomNum = this.RandomNum(0, arr.length - 1);
                        if (chosenNumbers.indexOf(randomNum) == -1) {
                            var obj = arr[randomNum];
                            if (obj)
                                chosen.push(obj);
                        }
                    }
                    return chosen;
                };
                Utils.RandomUniqueFromArray = function (array, num) {
                    var uniqueArr = [];
                    while (uniqueArr.length != num) {
                        var randomNum = this.RandomNum(0, array.length);
                        var chosen = array[this.RandomNum(0, array.length - 1)];
                        if (uniqueArr.indexOf(chosen) == -1 && chosen)
                            uniqueArr.push(chosen);
                    }
                    return uniqueArr;
                };
                Utils.ArrayFromProp = function (arr, prop) {
                    var newArr = [];
                    var selectedFunction;
                    (typeof prop === "Array") ?
                        selectedFunction = cycleProps :
                        selectedFunction = singleProp;
                    function singleProp(obj, prop) {
                        newArr.push(obj[prop]);
                    }
                    function cycleProps(obj, prop) {
                        var propsArr = [];
                        for (var p = 0; p < prop.length; p++)
                            propsArr.push(obj[prop[p]]);
                        newArr = newArr.concat(propsArr);
                    }
                    return newArr;
                };
                Utils.PointInTriangle = function (pt, tri) {
                    function sign(p1, p2, p3) {
                        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
                    }
                    var b1 = sign(pt, tri.a, tri.b) < 0;
                    var b2 = sign(pt, tri.b, tri.c) < 0;
                    var b3 = sign(pt, tri.c, tri.a) < 0;
                    return ((b1 == b2) && (b2 == b3));
                };
                Utils.PointInCircumcircle = function (pt, tri) {
                    var A = tri.a.x;
                    var B = tri.a.y;
                    var C = Math.pow(tri.a.x, 2) + Math.pow(tri.a.y, 2);
                    var D = 1;
                    var E = tri.b.x;
                    var F = tri.b.y;
                    var G = Math.pow(tri.b.x, 2) + Math.pow(tri.b.y, 2);
                    var H = 1;
                    var I = tri.c.x;
                    var J = tri.c.y;
                    var K = Math.pow(tri.c.x, 2) + Math.pow(tri.c.y, 2);
                    var L = 1;
                    var M = pt.x;
                    var N = pt.y;
                    var O = Math.pow(pt.x, 2) + Math.pow(pt.y, 2);
                    var P = 1;
                    var Ma = new geometryModule_1.Geometry.Matrix4(A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P);
                    var result = Ma.Determine();
                    return (result < 0) ? true : false;
                };
                Utils.FindUniqueLines = function (tris) {
                    var lines = [];
                    var uniqueLines = [];
                    for (var t = 0; t < tris.length; t++)
                        lines = lines.concat([tris[t].Lines.AB,
                            tris[t].Lines.BC,
                            tris[t].Lines.CA]);
                    for (var l = 0; l < lines.length; l++) {
                        var curL = lines[l];
                        var linesWithout = lines.slice(0);
                        linesWithout.splice(l, 1); // remove line to test from test array
                        var matches = 0;
                        for (var ol = 0; ol < linesWithout.length; ol++) {
                            var otherL = linesWithout[ol];
                            if (this.IsSameLine(curL, otherL))
                                matches++; // line shared by 2 tris
                        }
                        ;
                        if (matches == 0)
                            uniqueLines.push(curL); // unique line
                    }
                    ;
                    return uniqueLines;
                };
                Utils.IsSamePoint = function (p1, p2) {
                    if (p1.x == p2.x && p1.y == p2.y)
                        return true;
                    if (p1.x == p2.y && p1.y == p2.x)
                        return true;
                    return false;
                };
                Utils.IsSameLine = function (l1, l2) {
                    if (this.IsSamePoint(l1.v1, l2.v1) && this.IsSamePoint(l1.v2, l2.v2))
                        return true;
                    if (this.IsSamePoint(l1.v2, l2.v1) && this.IsSamePoint(l1.v1, l2.v2))
                        return true;
                    return false;
                };
                Utils.Sort = function (arr, prop) {
                    try {
                        if (!arr[0].hasOwnProperty(prop))
                            throw ("Bubble sort error! No " + prop + " property found.");
                    }
                    catch (err) {
                        console.error(err);
                        return;
                    }
                    var swapped = true;
                    while (swapped) {
                        swapped = false;
                        for (var i = 1; i < arr.length; i++) {
                            var curVal = arr[i][prop];
                            var lastVal = arr[i - 1][prop];
                            var temp = undefined;
                            if (curVal < lastVal) {
                                swapped = true;
                                temp = arr[i];
                                arr[i] = arr[i - 1];
                                arr[i - 1] = temp;
                            }
                        }
                        ;
                    }
                    return arr;
                };
                Utils.FindCentroid = function (tri) {
                    var x = (tri.a.x + tri.b.x + tri.c.x) / 3;
                    var y = (tri.a.y + tri.b.y + tri.c.y) / 3;
                    tri.Centroid = new geometryModule_1.Geometry.Vector2(x, y);
                    return tri.Centroid;
                };
                Utils.FindPolyCentroid = function (pts) {
                    var totalX = 0;
                    var totalY = 0;
                    var length = pts.length;
                    for (var p = 0; p < length; p++) {
                        totalX += pts[p].x;
                        totalY += pts[p].y;
                    }
                    ;
                    return new geometryModule_1.Geometry.Vector2(totalX / length, totalY / length);
                };
                Utils.FindMidpoint = function (tri) {
                    var sumVecAB = tri.a.Add(tri.b);
                    var sumVecBC = tri.b.Add(tri.c);
                    var sumVecCA = tri.c.Add(tri.a);
                    var sumAB = new geometryModule_1.Geometry.Line(new geometryModule_1.Geometry.Vector2(0, 0), sumVecAB);
                    var lineAB = new geometryModule_1.Geometry.Line(tri.a, tri.b);
                    var sumBC = new geometryModule_1.Geometry.Line(new geometryModule_1.Geometry.Vector2(0, 0), sumVecBC);
                    var lineBC = new geometryModule_1.Geometry.Line(tri.b, tri.c);
                    var sumCA = new geometryModule_1.Geometry.Line(new geometryModule_1.Geometry.Vector2(0, 0), sumVecCA);
                    var lineCA = new geometryModule_1.Geometry.Line(tri.c, tri.a);
                    tri.Lines.AB.Midpoint = this.FindIntersection(sumAB, lineAB);
                    tri.Lines.BC.Midpoint = this.FindIntersection(sumBC, lineBC);
                    tri.Lines.CA.Midpoint = this.FindIntersection(sumCA, lineCA);
                    return [tri.Lines.AB.Midpoint,
                        tri.Lines.BC.Midpoint,
                        tri.Lines.CA.Midpoint];
                };
                Utils.FindIntersection = function (line1, line2) {
                    var intersectX = ((line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x) *
                        (line2.v1.x - line2.v2.x) -
                        (line1.v1.x - line1.v2.x) *
                            (line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x)) /
                        ((line1.v1.x - line1.v2.x) *
                            (line2.v1.y - line2.v2.y) -
                            (line1.v1.y - line1.v2.y) *
                                (line2.v1.x - line2.v2.x));
                    var intersectY = ((line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x) *
                        (line2.v1.y - line2.v2.x) -
                        (line1.v1.y - line1.v2.y) *
                            (line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x)) /
                        ((line1.v1.x - line1.v2.x) *
                            (line2.v1.y - line2.v2.y) -
                            (line1.v1.y - line1.v2.y) *
                                (line2.v1.x - line2.v2.x));
                    return new geometryModule_1.Geometry.Vector2(intersectX, intersectY);
                };
                Utils.ArrangePointsCCWTri = function (tri) {
                    var pts = [tri.a, tri.b, tri.c];
                    for (var p = 0; p < pts.length; p++)
                        pts[p].TriCCWAngle = Math.atan2((pts[p].y - tri.Centroid.y), (pts[p].x - tri.Centroid.x));
                    pts = this.Sort(pts, "TriCCWAngle");
                    tri.a = pts[2];
                    tri.b = pts[1];
                    tri.c = pts[0];
                    return tri;
                };
                Utils.ArrangePointsCCWPoly = function (pts, centroid) {
                    centroid = centroid || this.FindPolyCentroid(pts);
                    for (var p = 0; p < pts.length; p++)
                        pts[p].PolyCCWAngle = Math.atan2((pts[p].y - centroid.y), (pts[p].x - centroid.x));
                    var points = this.Sort(pts, "PolyCCWAngle");
                    return points;
                };
                Utils.CheckCCW = function (p1, p2, p3) {
                    // ccw > 0, cwise < 0, collinear if ccw = 0
                    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
                };
                Utils.RadToDeg = function (rad) {
                    return rad * (180 / Math.PI);
                };
                Utils.DegToRad = function (deg) {
                    return deg * (Math.PI / 180);
                };
                Utils.uniqueID = 0;
                return Utils;
            }());
            exports_1("Utils", Utils);
        }
    }
});
