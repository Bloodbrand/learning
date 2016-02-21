System.register(["utils"], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var utils_1;
    var Geometry;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            (function (Geometry) {
                var Vector2 = (function () {
                    function Vector2(x, y) {
                        this.x = x;
                        this.y = y;
                    }
                    Vector2.prototype.Clone = function () {
                        return new Vector2(this.x, this.y);
                    };
                    Vector2.prototype.Magnitude = function () {
                        return Number(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)).toFixed(2));
                    };
                    Vector2.prototype.Add = function (v) {
                        return new Vector2(this.x + v.x, this.y + v.y);
                    };
                    Vector2.prototype.Subtract = function (v) {
                        return new Vector2(this.x + -v.x, this.y + -v.y);
                    };
                    return Vector2;
                }());
                Geometry.Vector2 = Vector2;
                var Line = (function () {
                    function Line(v1, v2) {
                        this.v1 = v1;
                        this.v2 = v2;
                    }
                    Line.prototype.Clone = function () {
                        return new Line(this.v1, this.v2);
                    };
                    Line.prototype.GetLength = function () {
                        this.Length = this.v1.Subtract(this.v2).Magnitude();
                        return this.Length;
                    };
                    return Line;
                }());
                Geometry.Line = Line;
                var Triangle = (function () {
                    function Triangle(a, b, c) {
                        this.a = a;
                        this.b = b;
                        this.c = c;
                        this.Lines = {
                            AB: undefined,
                            BC: undefined,
                            CA: undefined
                        };
                        this.Lines.AB = new Line(a, b);
                        this.Lines.BC = new Line(b, c);
                        this.Lines.CA = new Line(c, a);
                    }
                    Triangle.prototype.GetLinesLength = function () {
                        this.Lines.AB.GetLength();
                        this.Lines.BC.GetLength();
                        this.Lines.CA.GetLength();
                    };
                    Triangle.prototype.GetLinesArray = function () {
                        return [this.Lines.AB, this.Lines.BC, this.Lines.CA];
                    };
                    return Triangle;
                }());
                Geometry.Triangle = Triangle;
                var DisjoinedSet = (function () {
                    function DisjoinedSet(point) {
                        this.ID = utils_1.Utils.UniqueID();
                        point.DisjoinedSet = this;
                        this.Points.push(point);
                    }
                    DisjoinedSet.prototype.Merge = function (set) {
                        for (var i = 0; i < set.Points.length; i++) {
                            var curPoint = set.Points[i];
                            curPoint.DisjoinedSet = this;
                            this.Points.push(curPoint);
                        }
                        set = this;
                    };
                    return DisjoinedSet;
                }());
                Geometry.DisjoinedSet = DisjoinedSet;
                var Matrix2 = (function () {
                    function Matrix2(a, b, c, d) {
                        this.a = a;
                        this.b = b;
                        this.c = c;
                        this.d = d;
                    }
                    Matrix2.prototype.Determine = function () {
                        return this.a * this.d - this.b * this.c;
                    };
                    return Matrix2;
                }());
                Geometry.Matrix2 = Matrix2;
                var Matrix3 = (function (_super) {
                    __extends(Matrix3, _super);
                    function Matrix3(a, b, c, d, e, f, g, h, i) {
                        _super.call(this, a, b, c, d);
                        this.e = e;
                        this.f = f;
                        this.g = g;
                        this.h = h;
                        this.i = i;
                    }
                    Matrix3.prototype.Determine = function () {
                        return this.a * new Matrix2(this.e, this.f, this.h, this.i).Determine() -
                            this.b * new Matrix2(this.d, this.f, this.g, this.i).Determine() +
                            this.c * new Matrix2(this.d, this.e, this.g, this.h).Determine();
                    };
                    return Matrix3;
                }(Matrix2));
                Geometry.Matrix3 = Matrix3;
                var Matrix4 = (function (_super) {
                    __extends(Matrix4, _super);
                    function Matrix4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
                        _super.call(this, a, b, c, d, e, f, g, h, i);
                        this.j = j;
                        this.k = k;
                        this.l = l;
                        this.m = m;
                        this.n = n;
                        this.o = o;
                        this.p = p;
                    }
                    Matrix4.prototype.Determine = function () {
                        return (this.a * new Matrix3(this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p).Determine()) -
                            (this.b * new Matrix3(this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p).Determine()) +
                            (this.c * new Matrix3(this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p).Determine()) -
                            (this.d * new Matrix3(this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o).Determine());
                    };
                    return Matrix4;
                }(Matrix3));
                Geometry.Matrix4 = Matrix4;
            })(Geometry = Geometry || (Geometry = {}));
            exports_1("Geometry", Geometry);
        }
    }
});
