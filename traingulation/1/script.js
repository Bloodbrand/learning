var pointsNum = 5;
var points = [];
var triangles = [];

makeHolderTriangle();
//generateCustomPoints();
generateRandomPoints();
triangulate(points);
drawPoints(points);

function makeHolderTriangle () {
	var a = new Vector2 (width / 2, 0);
	var b = new Vector2 (0, height);
	var c = new Vector2 (width, height);
	var holderTri = new Triangle (a, b, c);
	triangles.push(holderTri);
	drawTriangle(holderTri);
}

function generateCustomPoints () {
	points = [
		new Vector2(450, 250),
		new Vector2(300, 400),
		new Vector2(600, 400),
		new Vector2(600, 700),
		new Vector2(300, 700),
		new Vector2(450, 850),
		new Vector2(470, 150),
		new Vector2(430, 150),
		new Vector2(450, 450)
	];
}

function generateRandomPoints () {
	var margin = 0;
	for (var i = 0; i < pointsNum; i++) {
		points.push( 
			new Vector2( 
				randomNum(margin, width - margin), 
				randomNum(margin, height - margin) 
			) 
		);
	};
}

function triangulate (points) {
	for (var p = 0; p < points.length; p++) {
		var curP = points[p];

		for (var t = 0; t < triangles.length; t++) {
			var curT = triangles[t];

			if ( PointInTriangle(curP, curT) == true ) {

				triangles.splice( t, 1 );

				triangles.push( new Triangle(curP, curT.a, curT.b) );
				triangles.push( new Triangle(curP, curT.b, curT.c) );
				triangles.push( new Triangle(curP, curT.c, curT.a) );
			}

		};

	};

	for (var dt = 0; dt < triangles.length; dt++) 
		drawTriangle( triangles[dt] );
}

