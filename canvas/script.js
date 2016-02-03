var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;
var canvasData = ctx.getImageData(0, 0, width, height);

Vector.drawGraph();
/*var line1 = new Line({a: {x: 50, y: 50}, b: {x: 200, y: 200}});
line1.draw();

var line2 = new Line({a: {x: 50, y: 200}, b: {x: 200, y: 50}});
line2.draw();

line1.intersects(line2);*/

var v1 = Vector.random();
var v2 = Vector.random();
//var v1 = {x: -100, y:  100};
//var v2 = {x: -100, y: -100};
var vBisect = Vector.bisector(v1, v2);
var vAdd = Vector.add(v1, v2);
var vSubtract = Vector.subtract(v1, v2);
var vBisectNeg = Vector.negative(vBisect);
var vBisectAdj = Vector.adjacent(vBisect);
vBisectAdj.right = Vector.scale(vBisectAdj.right, Vector.magnitude(vBisect) / 2);
vBisectAdj.left = Vector.scale(vBisectAdj.left, Vector.magnitude(vBisect) / 2);


document.getElementById("angle").textContent = "angle:"+ Math.round(Vector.angle(v1, v2))+"°";

Vector.draw({v: v1, name: "v1"});
Vector.draw({v: v2, name: "v2"});
Vector.draw({v: v2, col: undefined, ori: v1, dash: [5, 4]});
Vector.draw({v: v1, col: undefined, ori: v2, dash: [5, 4]});
Vector.draw({v: vAdd});
Vector.draw({v: vSubtract, col: '#ffff00', ori: v2});
Vector.draw({v: vBisect, col: '#ff0000'});
Vector.draw({v: vBisectNeg, col: '#0000ff'});
Vector.draw({v: vBisectAdj.right, col: '#00ff00'});
Vector.draw({v: vBisectAdj.left, col: '#00ff00'});

