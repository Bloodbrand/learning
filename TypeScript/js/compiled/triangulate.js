define(["require", "exports"], function (require, exports) {
    var Triangulate = (function () {
        function Triangulate() {
        }
        Triangulate.AddPoints = function (points) {
            for (var i = 0; i < points.length; i++) {
                console.log(points[i]);
            }
        };
        return Triangulate;
    })();
    return Triangulate;
});
