var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;
var canvasData = ctx.getImageData(0, 0, width, height);

Vector.drawGraph();

var v1 = Vector.random();
var v2 = Vector.random();
var v3 = Vector.bisector(v1, v2);
console.log(Vector.angle(v1, v2));


Vector.drawArc(v1, v2);

Vector.draw(v3, '#ff0000');
Vector.draw(v1);
Vector.draw(v2);
