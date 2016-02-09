function CustomTriangulation () {	
	var startTime = Date.now();	
	var rows = 30;
	var cols = 30;
	var pts = GenerateCustomPoints( rows, cols );
	var tri = new Triangulation( pts );

	Draw.Clear();

	tri.Triangulate();
	tri.FindHull();

	Draw.Triangles( tri.Triangles );
	Draw.Lines( tri.HullLines, "red", 3 );
	Draw.Points( tri.HullPoints, "red", 3 );

	Utils.LogTime( rows * cols, Date.now() - startTime );
	
}

function RandomTriangulation () {
	var startTime = Date.now();
	var pointsNum = 900;
	var pts = GenerateRandomPoints( pointsNum );
	var tri = new Triangulation( pts );

	Draw.Clear();

	tri.Triangulate();
	tri.FindHull();

	Draw.Triangles( tri.Triangles );
	Draw.Lines( tri.HullLines, "red", 3 );
	Draw.Points( tri.HullPoints, "red", 3 );

	Utils.LogTime( pointsNum, Date.now() - startTime );
}


function GenerateCustomPoints ( rows, cols ) {

	var margin = 50;
	var rowSize = ( height - margin * 2 ) / rows;
	var colSize = ( width  - margin * 2) / cols;
	var pts = [];

	for ( var r = 0; r <= rows; r++ ) {

		pts.push( new Vector2(margin, rowSize * r + margin) );

		for ( var c = 1; c <= cols; c++ ) 
			pts.push( new Vector2( colSize * c + margin + 1, rowSize * r + margin ) );
	};

	Sort( pts, "y" );

	return pts;
}

function GenerateRandomPoints ( pointsNum ) {
	var margin = 50;
	var pts = [];

	for ( var i = 0; i < pointsNum; i++ ) 

		pts.push( 
			new Vector2( 
			Utils.RandomNum( 0 + margin, height - margin), 
			Utils.RandomNum( 0 + margin, width  - margin)) 
		);

	Sort( pts, "y" );

	return pts;

}

