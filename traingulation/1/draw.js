var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;
var pointSize = 5;

function drawPoints (points) {
	for (var i = 0; i < points.length; i++) {
		ctx.beginPath();
		ctx.arc(points[i].x, points[i].y, pointSize, 0, 2*Math.PI);
      	ctx.fillStyle = 'green';
      	ctx.fill();
		ctx.stroke();
	};
}

function drawLine (p1, p2) {	
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);	
	ctx.stroke();
}

function drawTriangle (tri) {
	ctx.beginPath();
	ctx.moveTo(tri.a.x, tri.a.y);
	ctx.lineTo(tri.b.x, tri.b.y);
	ctx.lineTo(tri.c.x, tri.c.y);
	ctx.lineTo(tri.a.x, tri.a.y);	
	ctx.fillStyle = 'hsl(' + randomNum(180, 210) + ',' + randomNum(70, 100) + '%, 40%)';
	ctx.fill();
	ctx.stroke();
}