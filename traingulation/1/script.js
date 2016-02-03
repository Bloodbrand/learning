var pointsNum = 5;
var points = [];
var midpoints = [];
var centroids = [];
var triangles = [];

MakeHolderTriangle();
//GenerateCustomPoints();
GenerateRandomPoints();
Sort( points, "y" );
Triangulate( points);
//DrawPoints( points, "green", 3 );
DrawPoints( centroids, "green", 5 );
//DrawPoints( midpoints, "red", 5 );


function MakeHolderTriangle () {
	var a = new Vector2 ( width / 2, 0 ) ;
	var b = new Vector2 ( 0, height );
	var c = new Vector2 ( width, height );
	var holderTri = new Triangle ( a, b, c );
	triangles.push( holderTri );
	DrawTriangle( holderTri );
}

function GenerateCustomPoints () {
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

function GenerateRandomPoints () {
	var margin = 0;
	for (var i = 0; i < pointsNum; i++) {
		points.push( 
			new Vector2( 
				RandomNum(margin, width - margin), 
				RandomNum(margin, height - margin) 
			) 
		);
	};
}

function Triangulate (points) {
	for (var p = 0; p < points.length; p++) {
		var curP = points[p];

		for (var t = 0; t < triangles.length; t++) {
			var curT = triangles[t];

			if ( PointInTriangle( curP, curT ) === true ) {

				triangles.splice( t, 1 );

				var tri1 = new Triangle( curP, curT.a, curT.b );
				var tri2 = new Triangle( curP, curT.b, curT.c );
				var tri3 = new Triangle( curP, curT.c, curT.a );

				triangles.push( tri1 );
				triangles.push( tri2 );
				triangles.push( tri3 );

			}

		};

	};

	for ( var ct = 0; ct < triangles.length; ct++ ) {

		var curTri = triangles[ct];

		var centroid = FindCentroid( curTri );
		//var midpoint = FindMidpoint( curTri );
		curTri.centroid = centroid;

		centroids.push( centroid );
		//midpoints.push( midpoint );

		DrawTriangle( curTri );
		FindMidpoint( curTri );
	}		
}

