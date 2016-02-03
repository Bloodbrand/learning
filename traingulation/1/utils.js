function Vector2 ( x, y ) {
    this.x = x;
    this.y = y;
}

function Line ( v1, v2 ) {
    this.v1 = v1;
    this.v2 = v2;
    this.midpoint = undefined;
}

function Triangle ( a, b, c ) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.centroid = undefined;

    this.lines = {
        AB: new Line ( a, b ),
        BC: new Line ( b, c ),
        CA: new Line ( c, a )
    }
}

function RandomNum ( min, max ) {
	return Math.floor( Math.random() * (max - min + 1 ) + min );
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

function Sort ( arr, prop ) { // bubble sort
    var swapped = true;

    while (swapped) { 

        swapped = false;

        for (var i = 1; i < arr.length; i++) { 

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
}

function FindCentroid ( tri ) {
    var x = ( tri.a.x + tri.b.x + tri.c.x ) / 3;
    var y = ( tri.a.y + tri.b.y + tri.c.y ) / 3;
    return new Vector2 (x, y);
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

    DrawPoint( tri.lines.AB.midpoint, "red", 5 );  
    DrawPoint( tri.lines.BC.midpoint, "red", 5 );   
    DrawPoint( tri.lines.CA.midpoint, "red", 5 );  
    
    /*DrawLine( new Vector2(0, 0), intersectAB );
    DrawLine( new Vector2(0, 0), intersectBC );
    DrawLine( new Vector2(0, 0), intersectCA );*/
    console.log(tri)
    
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
