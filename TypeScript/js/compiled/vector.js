define(["require", "exports"], function (require, exports) {
    var Vector = (function () {
        function Vector() {
        }
        Vector.Bisector = function (v1, v2) {
            var v1n = this.Normalize(v1);
            var v2n = this.Normalize(v2);
            var sum = this.Add(v1n, v2n);
            return sum;
        };
        Vector.Add = function (v1, v2) {
            return { x: v1.x + v2.x, y: v1.y + v2.y };
        };
        Vector.Subtract = function (v1, v2) {
            return { x: v1.x + -v2.x, y: v1.y + -v2.y };
        };
        Vector.Magnitude = function (v) {
            return Number(Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)).toFixed(this.floatPrecision));
        };
        Vector.Normalize = function (v) {
            var magnitude = this.Magnitude(v);
            return { x: v.x / magnitude, y: v.y / magnitude };
        };
        Vector.Negative = function (v) {
            return { x: v.x * -1, y: v.y * -1 };
        };
        Vector.Scale = function (v, length) {
            var n = this.Normalize(v);
            return { x: n.x * length, y: n.y * length };
        };
        Vector.PointInPoly = function (v, poly) {
            var x = v.x;
            var y = v.y;
            var inside = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var xi = poly[i].x;
                var yi = poly[i].y;
                var xj = poly[j].x;
                var yj = poly[j].y;
                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        Vector.floatPrecision = 2;
        return Vector;
    })();
    return Vector;
});
