var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;

var Draw = function () {

	function randomColor () {
		return 'hsl(' + RandomNum(180, 210) + ',' + RandomNum(70, 100) + '%, 40%)';
	}

	function returnDefs ( obj ) {

		var type = obj.constructor.name;

		switch ( type ) {

			case "Vector2":
				return {
					color: "green",
					size : 5
				}
			break;

			case "Triangle":
				return {
					color: randomColor()
				}
			break;

			case "Line":

			break;

		}


	}

return {
	Point: function ( point, color, size ) {
		var def = returnDefs( point );
		color = color || def.color;
		size = size || def.size;
		
		ctx.beginPath();
		ctx.arc(point.x, point.y, size, 0, 2*Math.PI);
	  	ctx.fillStyle = color;
	  	ctx.fill();
		ctx.stroke();
	}
	,
	Points: function ( points, color, size ) {
		var def = returnDefs( points[0] );
		color = color || def.color;
		size = size || def.size;

		for (var i = 0; i < points.length; i++) 
			this.Point( points[i], color, size );
	}
	,
	Line: function ( line ) {
		ctx.beginPath();
		ctx.moveTo(line.v1.x, line.v1.y);
		ctx.lineTo(line.v2.x, line.v2.y);	
		ctx.stroke();
	}
	,
	Triangle: function( tri, color ) {
		var def = returnDefs( tri );
		color = color || def.color;

		this.Line( tri.lines.AB );
		this.Line( tri.lines.BC );
		this.Line( tri.lines.CA );

		ctx.moveTo(tri.a.x, tri.a.y);
		ctx.lineTo(tri.b.x, tri.b.y);
		ctx.lineTo(tri.c.x, tri.c.y);
		ctx.lineTo(tri.a.x, tri.a.y);	
		ctx.fillStyle = color;
		ctx.fill();
	}
	,
	Triangles: function ( tris ) {

		for ( var t = 0; t < tris.length; t++ ) 
			this.Triangle( tris[t] );

	}
	,
	Clear: function () {

		ctx.clearRect(0, 0, width, height);

	}
}
}();
