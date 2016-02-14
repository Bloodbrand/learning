function CustomTriangulation () {	
	var startTime = Date.now();	
	var rows = 20;
	var cols = 20;
	var pts = GenerateCustomPoints( rows, cols );
	var tri = new Triangulation( pts );

	Draw.Clear();

	tri.Triangulate();
	//tri.FindHull();

	var mst = tri.FindMinSpanTree();

	Draw.Triangles( tri.Triangles );
	//Draw.Lines( tri.HullLines, "red", 3 );
	//Draw.Points( tri.HullPoints, "red", 3 );
	var qTree = Utils.MakeQuadTrees( pts );
	//Draw.QuadTree( qTree );

	Draw.Lines( mst, "black", 5 ); 
	/*Draw.Points( pts, "black", 4 );
	Draw.Lines( mst, "black", 5 ); 
	Draw.Lines( mst, "white", 3 ); 
	Draw.Points( pts, "white", 3 );*/

	Utils.LogTime( rows * cols, Date.now() - startTime );
	
}

function RandomTriangulation () {
	var startTime = Date.now();
	var pointsNum = 700;
	var pts = GenerateRandomPoints( pointsNum );
	var tri = new Triangulation( pts );

	Draw.Clear();

	tri.Triangulate();
	//tri.FindHull();
	var mst = tri.FindMinSpanTree();

	//var extraLines = Utils.RandomFromArray( tri.NonMinSpanLines, 1 );
	//mst = mst.concat( extraLines );

	
	Draw.Triangles( tri.Triangles );
	//Draw.Lines( tri.HullLines, "red", 3 );
	//Draw.Points( tri.HullPoints, "red", 3 );

	var qTree = Utils.MakeQuadTrees( pts );
	Draw.QuadTree( qTree );   

	Draw.Points( pts, "black", 4 );
	Draw.Lines( mst, "black", 5 ); 
	Draw.Lines( mst, "white", 3 ); 
	Draw.Points( pts, "white", 3 );

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
			Utils.RandomNum( 0 + margin, width - margin), 
			Utils.RandomNum( 0 + margin, height  - margin)) 
		);

	Sort( pts, "y" );

	return pts;

}

