var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height, width = canvas.width;

var Draw = function () {

	function randomColor () {

		return 'hsl(' + Utils.RandomNum(180, 210) + ',' + Utils.RandomNum(70, 100) + '%, 40%)';
		
	}

	function returnDefaults ( obj ) {

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
				return {
					color: "black",
					size : 1
				}
			break;
			case "QuadTree":
				return {
					color: randomColor()
				}
			break;

		}


	}

return {
	Point: function ( point, color, size ) {
		var def = returnDefaults( point );
		color = color || def.color;
		size = size || def.size;
		
		ctx.beginPath();
		ctx.arc(point.x, point.y, size, 0, 2*Math.PI);
	  	ctx.fillStyle = color;
	  	ctx.strokeStyle = color;
		ctx.lineWidth = size;
	  	ctx.fill();
		ctx.stroke();
	}
	,
	Points: function ( points, color, size ) {
		var def = returnDefaults( points[0] );
		color = color || def.color;
		size = size || def.size;

		for (var i = 0; i < points.length; i++) 
			this.Point( points[i], color, size );

	}
	,
	Line: function ( line, color, size ) {		
		var def = returnDefaults( line );
		color = color || def.color;
		size = size || def.size;

		ctx.beginPath();
		ctx.lineWidth = size;
		ctx.strokeStyle = color;
		ctx.moveTo(line.v1.x, line.v1.y);
		ctx.lineTo(line.v2.x, line.v2.y);	
		ctx.stroke();
	}
	,
	Lines: function ( lines, color, size ) {
		var def = returnDefaults( lines[0] );
		color = color || def.color;
		size = size || def.size;

		for ( var i = 0; i < lines.length; i++ ) 
			this.Line( lines[i], color, size );
	}
	,
	Triangle: function( tri, color ) {
		var def = returnDefaults( tri );
		color = color || def.color;

		this.Line( tri.lines.AB );
		this.Line( tri.lines.BC );
		this.Line( tri.lines.CA );

		ctx.moveTo(tri.a.x, tri.a.y);
		ctx.lineTo(tri.b.x, tri.b.y);
		ctx.lineTo(tri.c.x, tri.c.y);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}
	,
	Triangles: function ( tris ) {

		for ( var t = 0; t < tris.length; t++ ) 
			this.Triangle( tris[t] );

	}
	,
	Square: function ( square, color ) {
		var def = returnDefaults( square );
		color = color || def.color;

		var pts = square.vertices;

		ctx.beginPath();
		ctx.moveTo(pts[0].x, pts[0].y);
		ctx.lineTo(pts[1].x, pts[1].y);
		ctx.lineTo(pts[2].x, pts[2].y);
		ctx.lineTo(pts[3].x, pts[3].y);
		ctx.closePath();

		ctx.fillStyle = color;

		ctx.fill();

	}
	,
	QuadTree: function ( quad, color ) {

		var _this = this;

		quad.children.forEach( function ( child ) {

			var pts = child.vertices;

			_this.Lines( [ new Line( pts[0], pts[1] ), 
				           new Line( pts[1], pts[2] ), 
				           new Line( pts[2], pts[3] ), 
				           new Line( pts[3], pts[0] ) ] );
			_this.Square( child, color );
			_this.QuadTree( child );

		});

	}
	,
	RandomColor: randomColor
	,
	Clear: function () {

		ctx.clearRect(0, 0, width, height);

	}
}
}();
