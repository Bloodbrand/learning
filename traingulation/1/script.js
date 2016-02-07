var pointsNum = 100;
var points = [];
var midpoints = [];
var triangles = [];

function custom() {	
	var startTime = Date.now();
	resetArrays();
	Draw.Clear();
	MakeHolderTriangle();
	GenerateCustomPoints();
	Sort( points, "y" );
	Triangulate( points );
	CleanHolderTri();
	Draw.Clear();
	Draw.Triangles( triangles );
	Draw.Points( points, "red", 3 );
	logTime( Date.now() - startTime );
}

function random () {
	var startTime = Date.now();
	resetArrays();
	Draw.Clear();
	MakeHolderTriangle();
	GenerateRandomPoints();
	Sort( points, "y" );
	Triangulate( points );
	CleanHolderTri();
	Draw.Clear();
	Draw.Triangles( triangles );
	Draw.Points( points, "red", 3 );
	logTime( Date.now() - startTime );
}

function resetArrays () {	
	points.length = 0;
	midpoints.length = 0;
	triangles.length = 0;	
}

function logTime (time) {
	document.getElementById("time").innerHTML = time + " ms";
}



//var centroids = Utils.ArrayFromProp ( triangles, "centroid" );

//FindConvexHull( points );	
//Draw.Points( centroids, "blue", 2 );
//Draw.Points( midpoints, "yellow", 2 );


function MakeHolderTriangle ( dontAdd ) {
	var a = new Vector2 ( width / 2, -1000 ) ;
	var b = new Vector2 ( -1000, height );
	var c = new Vector2 (  2000, height );
	var holderTri = new Triangle ( a, b, c );
	holderTri.centroid = FindCentroid( holderTri ); 
	holderTri = ArrangePointsCCW( holderTri )
	if( !dontAdd ) triangles.push( holderTri );
	Draw.Triangle( holderTri );
}

function GenerateCustomPoints () {

	var rows = 20;
	var cols = 20;

	var rowSize = height / rows;
	var colSize = width  / cols;

	for (var r = 0; r <= rows; r++) {

		points.push( new Vector2(0, rowSize * r) );

		for (var c = 1; c <= cols; c++) {
			points.push( new Vector2(colSize * c + 1, rowSize * r) );
		};
	};
}

function GenerateRandomPoints () {
	var marginX = 25;
	var marginY = 25;
	var offsetY = 200;
	var midX = width / 2;

	for (var i = 0; i < pointsNum; i++) {

		//var chosenY = Utils.RandomNum(marginY + offsetY, height - marginY );
		//var chosenX = midX + Utils.RandomNum( -chosenY / 2 + marginX , chosenY / 2 - marginX);
		var chosenY = Utils.RandomNum( 0, height );
		var chosenX = Utils.RandomNum( 0 , width );

		points.push( new Vector2( chosenX, chosenY ) );

	};

}

function Triangulate (points) {

	for ( var p = 0; p < points.length; p++ ) {
		var curP = points[p];
		var badTriangles = [];

		for ( var t = triangles.length - 1; t >= 0; t-- ) {

			var curT = triangles[t];

			
			if ( PointInCircumcircle( curP, curT ) == true ) {
				
				triangles.splice( t, 1 );
				badTriangles.push( curT );

			}			

		};	

		var uniqueLines = FindUniqueLines( badTriangles );

		for ( var ul = 0; ul < uniqueLines.length; ul++ ) {
			var curL = uniqueLines[ul];
			var tri = new Triangle( curP.clone(), curL.v1.clone(), curL.v2.clone() );
			triangles.push( tri );		
		};

	};

	for ( var ct = 0; ct < triangles.length; ct ++ ) {

		var curTri = triangles[ct];

		curTri.centroid = FindCentroid( curTri ); // must find centroid before clockwise
		curTri = ArrangePointsCCW( curTri )

		points = points.concat( [ curTri.a, curTri.b, curTri.c ]);
		midpoints = midpoints.concat( FindMidpoint( curTri ) );
	}	
		
}

