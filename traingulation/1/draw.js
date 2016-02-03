var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;
var pointSize = 5;

function DrawPoints (points, color, size) {
	color = color || 'green';
	size = size || pointSize;

	for (var i = 0; i < points.length; i++) 
		DrawPoint( points[i], color, size );
}

function DrawPoint ( point, color, size ) {
	color = color || 'green';
	size = size || pointSize;
	
	ctx.beginPath();
	ctx.arc(point.x, point.y, size, 0, 2*Math.PI);
  	ctx.fillStyle = color;
  	ctx.fill();
	ctx.stroke();
}

function DrawLine ( line ) {	
	ctx.beginPath();
	ctx.moveTo(line.v1.x, line.v1.y);
	ctx.lineTo(line.v2.x, line.v2.y);	
	ctx.stroke();
}

function DrawTriangle (tri) {
	DrawLine( tri.lines.AB );
	DrawLine( tri.lines.BC );
	DrawLine( tri.lines.CA );

	ctx.moveTo(tri.a.x, tri.a.y);
	ctx.lineTo(tri.b.x, tri.b.y);
	ctx.lineTo(tri.c.x, tri.c.y);
	ctx.lineTo(tri.a.x, tri.a.y);	
	ctx.fillStyle = 'hsl(' + RandomNum(180, 210) + ',' + RandomNum(70, 100) + '%, 40%)';
	ctx.fill();
}