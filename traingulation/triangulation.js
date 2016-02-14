function Triangulation ( points ) {
    var _this = this;
    this.Points = points || [];
    this.Triangles = [];
    this.Lines = [];            // all lines of all tris
    this.UniqueLines = [];      // all unique lines, drawn only once, no duplicates 
    this.NonMinSpanLines = [];  // remaining lines after min spanning tree
    this.HullPoints = [];
    this.HullLines = [];
    this.HolderTriangle = undefined; 

    (function constructor () {

        _this.HolderTriangle = makeHolderTriangle();
        _this.Triangles.push( _this.HolderTriangle ); 

    }());

    function makeHolderTriangle ( ) {

        var side = 100000;
        var a = new Vector2 ( 0,     -side );
        var b = new Vector2 ( -side,  side );
        var c = new Vector2 (  side,  side );
        var holderTri = new Triangle ( a, b, c );

        holderTri.centroid = FindCentroid( holderTri ); 

        return holderTri;

    }

    function cleanHolderTriangle () {

        var a = _this.HolderTriangle.a;
        var b = _this.HolderTriangle.b;
        var c = _this.HolderTriangle.c;

        for (var t = _this.Triangles.length - 1; t >= 0; t--) {

            var curT = _this.Triangles[t];

            if (( IsSamePoint (curT.a, a) || IsSamePoint (curT.b, a) ||  IsSamePoint(curT.c, a) ) ||
                ( IsSamePoint (curT.a, b) || IsSamePoint (curT.b, b) ||  IsSamePoint(curT.c, b) ) ||
                ( IsSamePoint (curT.a, c) || IsSamePoint (curT.b, c) ||  IsSamePoint(curT.c, c) ) )
                    _this.Triangles.splice( t, 1 );

        };

    }

    this.Triangulate = function () {

        for ( var p = 0; p < this.Points.length; p++ ) {

            var curP = this.Points[p];
            var badTriangles = [];

            for ( var t = this.Triangles.length - 1; t >= 0; t-- ) {

                var curT = this.Triangles[t];
                
                if ( PointInCircumcircle( curP, curT ) == true ) {
                    
                    this.Triangles.splice( t, 1 );
                    badTriangles.push( curT );

                }  

            }

            var uniqueLines = FindUniqueLines( badTriangles );

            for ( var ul = 0; ul < uniqueLines.length; ul++ ) {

                var curL = uniqueLines[ul];
                var tri = new Triangle( curP, curL.v1, curL.v2 );
                this.Triangles.push( tri ); 
                     
            }

        }

        cleanHolderTriangle();        

    };

    this.FindHull = function () {

        var hullLines = [];
        var uniqueLines = FindUniqueLines( this.Triangles );
        var pts = Utils.ArrayFromProp ( uniqueLines, [ "v1", "v2" ] );
        var length = pts.length;
        var centroid = FindPolyCentroid( pts );    

        pts = ArrangePointsCCWPoly( pts );    

        for ( var p = length - 1; p >= 0; p -= 2 ) // eliminate duplicates
            pts.splice( p, 1 );

        var length = pts.length;

        for ( var up = 1; up < length; up++ ) 
            hullLines.push( new Line( pts[up - 1], pts[up] ) );

        hullLines.push( new Line( pts[length - 1], pts[0] ) );

        this.HullPoints = pts;
        this.HullLines = hullLines;

        return pts;

    };

    this.FindMinSpanTree = function () {

        var mst = [];
        var sets = [];

        this.UniqueLines = this.Lines.slice(0);    

        for ( var t = 0; t < this.Triangles.length; t++ ) {

            var curTri = this.Triangles[t];
            curTri.getLinesLength();
            this.UniqueLines = this.UniqueLines.concat( curTri.getLinesArray() );

        };

        this.UniqueLines = Sort( this.UniqueLines, "length" );


        for ( var l = this.UniqueLines.length - 1; l >= 1 ; l-- ) // eliminate duplicates

            if( IsSameLine( this.UniqueLines[l], this.UniqueLines[l - 1] ) ) 

                this.UniqueLines.splice( l, 1 );  


        this.NonMinSpanLines = this.UniqueLines.slice(0);         

         for ( var p = 0; p < this.Points.length; p++ )     // make a set for each point
            new DisjoinedSet( this.Points[p] );
        
        for ( var l = 0; l < this.UniqueLines.length; l++ ) {     // Kruskal's algorithm

            var curLine = this.UniqueLines[l];

            if ( curLine.v1.set.disjoinedSetID !== curLine.v2.set.disjoinedSetID ) {

                curLine.v1.set.Merge( curLine.v2.set );
                mst.push ( curLine );
                this.NonMinSpanLines[ l ] = undefined;

            }

        }
        
        return mst;

    };       

}