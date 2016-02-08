var points = [];
var midpoints = [];
var triangles = [];

function custom() {	
	var startTime = Date.now();
	var rows = 10;
	var cols = 10;

	resetArrays();
	Draw.Clear();
	MakeHolderTriangle();
	GenerateCustomPoints( rows, cols );
	Sort( points, "y" );
	Triangulate( points );
	CleanHolderTri();
	Draw.Clear();
	Draw.Triangles( triangles );
	FindHull( triangles );
	//Draw.Points( points, "red", 3 );
	Draw.Points( FindHull( triangles ), "red", 3 );	
	logTime( rows * cols, Date.now() - startTime );
}

function random () {
	var startTime = Date.now();
	var pointsNum = 50;

	resetArrays();
	Draw.Clear();
	MakeHolderTriangle();
	GenerateRandomPoints( pointsNum );
	Sort( points, "y" );
	Triangulate( points );
	CleanHolderTri();
	Draw.Clear();
	Draw.Triangles( triangles );
	//Draw.Points( points, "red", 3 );
	Draw.Points( FindHull( triangles ), "red", 3 );	
	logTime( pointsNum, Date.now() - startTime );
}

function resetArrays () {	
	points.length = 
	midpoints.length = 
	triangles.length = 0;	
}

function logTime (points, time) {
	document.getElementById("time").innerHTML = points + " points " + time + " ms";
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
	//holderTri = ArrangePointsCCWTri( holderTri )
	if( !dontAdd ) triangles.push( holderTri );
	Draw.Triangle( holderTri );
}

function GenerateCustomPoints ( rows, cols ) {

	var margin = 50;
	var rowSize = ( height - margin * 2 ) / rows;
	var colSize = ( width  - margin * 2) / cols;

	for ( var r = 0; r <= rows; r++ ) {

		points.push( new Vector2(margin, rowSize * r + margin) );

		for ( var c = 1; c <= cols; c++ ) 
			points.push( new Vector2( colSize * c + margin + 1, rowSize * r + margin ) );
	};
}

function GenerateRandomPoints ( pointsNum ) {
	var margin = 50;

	for ( var i = 0; i < pointsNum; i++ ) 

		points.push( 
			new Vector2( 
			Utils.RandomNum( 0 + margin, height - margin), 
			Utils.RandomNum( 0 + margin, width  - margin)) 
		);

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

	/*
	for ( var ct = 0; ct < triangles.length; ct ++ ) {

		var curTri = triangles[ct];

		curTri.centroid = FindCentroid( curTri ); // must find centroid before clockwise
		curTri = ArrangePointsCCWTri( curTri )

		points = points.concat( [ curTri.a, curTri.b, curTri.c ]);
		midpoints = midpoints.concat( FindMidpoint( curTri ) );
	}	
	*/
		
}

