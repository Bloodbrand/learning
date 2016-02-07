var pointsNum = 100;
var points = [];
var midpoints = [];
var triangles = [];

MakeHolderTriangle();
//GenerateCustomPoints();
GenerateRandomPoints();
Sort( points, "y" );
Triangulate( points );
CleanHolderTri();
Draw.Clear();
//MakeHolderTriangle( true );
Draw.Triangles( triangles );

var centroids = Utils.ArrayFromProp ( triangles, "centroid" );

Draw.Points( points, "red", 3 );
//FindConvexHull( points );	
//Draw.Points( centroids, "green", 2 );
//Draw.Points( midpoints, "red", 5 );


function MakeHolderTriangle ( dontAdd ) {
	var a = new Vector2 ( width / 2, 0 ) ;
	var b = new Vector2 ( 0, height );
	var c = new Vector2 ( width, height );
	var holderTri = new Triangle ( a, b, c );
	holderTri.centroid = FindCentroid( holderTri ); 
	holderTri = ArrangePointsCCW( holderTri )
	if( !dontAdd ) triangles.push( holderTri );
	Draw.Triangle( holderTri );
}

function GenerateCustomPoints () {
	var rows = 10;
	var cols = 4;
	var marginX = 340;
	var marginY = 350;
	var midX = width / 2;
	var rowSize = height / rows;
	var margin = 25;

	for (var r = 1; r < rows; r++) {

		var curY = rowSize * r + 40;

		points.push( new Vector2(midX, curY) );

		for (var c = 1; c <= cols; c++) {
			points.push( new Vector2(midX + ( curY / cols ) * ( c / 2 ) - margin, curY) );
			points.push( new Vector2(midX - ( curY / cols ) * ( c / 2 ) + margin, curY) );
		};
	};
}

function GenerateRandomPoints () {
	var marginX = 25;
	var marginY = 25;
	var offsetY = 200;
	var midX = width / 2;

	for (var i = 0; i < pointsNum; i++) {

		var chosenY = Utils.RandomNum(marginY + offsetY, height - marginY );
		var chosenX = midX + Utils.RandomNum( -chosenY / 2 + marginX , chosenY / 2 - marginX);

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

