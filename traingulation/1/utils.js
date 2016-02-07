function RandomNum ( min, max ) {

	return Math.floor( Math.random() * (max - min + 1 ) + min );

}

function ArrayFromProp ( arr, prop ) {

    var newArr = [];

    for (var i = 0; i < arr.length; i++) 
        newArr.push( arr[i][prop] );

    return newArr;

}

function PointInTriangle ( pt, tri ) {

    function sign (p1, p2, p3) {

        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);

    }

    var b1 = sign(pt, tri.a, tri.b) < 0;
    var b2 = sign(pt, tri.b, tri.c) < 0;
    var b3 = sign(pt, tri.c, tri.a) < 0;

    return ((b1 == b2) && (b2 == b3)); 

}

function PointInCircumcircle ( pt, tri ) {

    var A = tri.a.x;
    var B = tri.a.y;
    var C = Math.pow( tri.a.x, 2 ) + Math.pow( tri.a.y, 2 );
    var D = 1;
    var E = tri.b.x;
    var F = tri.b.y;
    var G = Math.pow( tri.b.x, 2 ) + Math.pow( tri.b.y, 2 );
    var H = 1;
    var I = tri.c.x;
    var J = tri.c.y;
    var K = Math.pow( tri.c.x, 2 ) + Math.pow( tri.c.y, 2 );
    var L = 1;
    var M = pt.x;
    var N = pt.y;
    var O = Math.pow( pt.x, 2 ) + Math.pow( pt.y, 2 );
    var P = 1;

    var M = new Matrix4( A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P );  
    var result = Matrix.DetM4( M );  

    return ( result < 0 ) ? true : false;

}

function FindUniqueLines ( tris ) {

    var lines = [];
    var uniqueLines = [];

    for ( var t = 0; t < tris.length; t++ ) 
        lines = lines.concat( [ tris[t].lines.AB, 
                                tris[t].lines.BC, 
                                tris[t].lines.CA ]);

    for ( var l = 0; l < lines.length; l++ ) {              // line to test

        var curL = lines[l];

        var linesWithout = lines.slice( 0 );
        linesWithout.splice( l, 1 );                        // remove line to test from test array

        var matches = 0;         

        for (var ol = 0; ol < linesWithout.length; ol++ ) { // other lines
            var otherL = linesWithout[ol];

            if ( IsSameLine ( curL, otherL ) ) matches++;   // line shared by 2 tris 

        };

        if( matches == 0 ) uniqueLines.push( curL );        // unique line
    };

    return uniqueLines;

}

function IsSamePoint ( p1, p2 ) {

    if ( p1.x == p2.x && p1.y == p2.y ) return true;
    if ( p1.x == p2.y && p1.y == p2.x ) return true;

    return false;

}

function IsSameLine ( l1, l2 ) {

    if ( IsSamePoint( l1.v1, l2.v1 ) && IsSamePoint( l1.v2, l2.v2 ) ) return true;
    if ( IsSamePoint( l1.v2, l2.v1 ) && IsSamePoint( l1.v1, l2.v2 ) ) return true;

    return false;

}

function Sort ( arr, prop ) { // bubble sort

    var swapped = true;

    while (swapped) { 

        swapped = false;

        for ( var i = 1; i < arr.length; i++ ) {

            var curVal  = arr[ i ][prop];
            var lastVal = arr[ i - 1 ][prop];
            var temp = undefined;

            if ( curVal < lastVal ) {

                swapped = true;
                temp = arr[ i ];
                arr[ i ]     = arr[ i - 1 ];
                arr[ i - 1 ] = temp;

            }

        };

    }   

    return arr;

}

function FindCentroid ( tri ) {

    var x = ( tri.a.x + tri.b.x + tri.c.x ) / 3;
    var y = ( tri.a.y + tri.b.y + tri.c.y ) / 3;

    tri.centroid = new Vector2 ( x, y );

    return tri.centroid;

}

function FindMidpoint ( tri ) {

    var sumVecAB = Vector.add( tri.a, tri.b ) ;
    var sumVecBC = Vector.add( tri.b, tri.c ) ;
    var sumVecCA = Vector.add( tri.c, tri.a ) ;

    
    var sumAB = new Line ( new Vector2(0, 0), sumVecAB );
    var lineAB = new Line ( tri.a, tri.b );

    var sumBC = new Line ( new Vector2(0, 0), sumVecBC );
    var lineBC = new Line ( tri.b, tri.c );

    var sumCA = new Line ( new Vector2(0, 0), sumVecCA );
    var lineCA = new Line ( tri.c, tri.a );

    tri.lines.AB.midpoint = FindIntersection(sumAB, lineAB);
    tri.lines.BC.midpoint = FindIntersection(sumBC, lineBC);
    tri.lines.CA.midpoint = FindIntersection(sumCA, lineCA);

    return [ tri.lines.AB.midpoint,
             tri.lines.BC.midpoint,
             tri.lines.CA.midpoint ];  

}

function FindIntersection ( line1, line2 ) {

    var intersectX = 
       (( line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x ) * 
        ( line2.v1.x - line2.v2.x ) -
        ( line1.v1.x - line1.v2.x ) *
        ( line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x )) /
       (( line1.v1.x - line1.v2.x ) *
        ( line2.v1.y - line2.v2.y ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x - line2.v2.x ));

    var intersectY =  
       (( line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x ) * 
        ( line2.v1.y - line2.v2.x ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x )) /
       (( line1.v1.x - line1.v2.x ) *
        ( line2.v1.y - line2.v2.y ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x - line2.v2.x ));

    return new Vector2 ( intersectX, intersectY );

}

function ArrangePointsCCW ( tri ) {

    var pts = [ tri.a, tri.b, tri.c ];

    for ( var p = 0; p < pts.length; p++ ) 
        pts[p].angle = Math.atan2( (pts[p].y - tri.centroid.y), (pts[p].x - tri.centroid.x) );

    pts = Sort( pts, "angle" );

    tri.a = pts [2];
    tri.b = pts [1];
    tri.c = pts [0];

    return tri;
    
}

function CheckCCW ( p1, p2, p3 ) { // ccw > 0, cwise < 0, collinear if ccw = 0

    return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);

}

function CleanHolderTri () {    
    var a = new Vector2 ( width / 2, 0 ) ;
    var b = new Vector2 ( 0, height );
    var c = new Vector2 ( width, height );

    for (var t = triangles.length - 1; t >= 0; t--) {

        var curT = triangles[t];

        if
            ( IsSamePoint (curT.a, a) || IsSamePoint (curT.b, a) ||  IsSamePoint(curT.c, a) )
                triangles.splice( t, 1 );
        else if
            ( IsSamePoint (curT.a, b) || IsSamePoint (curT.b, b) ||  IsSamePoint(curT.c, b) )
                triangles.splice( t, 1 );
        else if
            ( IsSamePoint (curT.a, c) || IsSamePoint (curT.b, c) ||  IsSamePoint(curT.c, c) )
                triangles.splice( t, 1 );


    };

}

function FindConvexHull ( points ) {

    var N = points.length;

    var temp = points[0];
    points[0] = points[1];
    points[1] = temp;

    for ( var p = 0; p < points.length; p++ ) {

        points[p].hullAngle = Vector.dotProduct( points[p], points[1] );
        //Math.atan2( (points[p].y - points[1].y), (points[p].x - points[1].y) );

    };

    points = Sort( points, "hullAngle" );

    points[0] = points[ N - 1 ];

    var M = 1;

    for ( var i = 2; i < N; i++ ) {

        while ( CheckCCW( points[M-1], points[M], points[i] ) <= 0 ) {

            if ( M > 1 )
                M -= 1;
            else if ( i == N )
                break;
            else
                i += 1;            

        }

        M += 1;

        var temp = points[M];
        points[M] = points[i];
        points[i] = temp;

    };

    console.log(M)
    points.splice(M, points.length);
    Draw.Points( points, "red", 3 );

}
