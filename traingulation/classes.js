function Vector2 ( x, y ) {
    this.x = x;
    this.y = y;

    this.clone = function () {
        return new Vector2 ( this.x, this.y );
    }
}

function Line ( v1, v2 ) {
    this.v1 = v1;
    this.v2 = v2;
    this.midpoint = undefined;

    this.clone = function () {
        return new Line ( this.v1, this.v2 );
    }
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

function Matrix2 ( a, b, c, d ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}

function Matrix3 ( a, b, c, d, e, f, g, h, i ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
    this.i = i;
}

function Matrix4 ( a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
    this.i = i;
    this.j = j;
    this.k = k;
    this.l = l;
    this.m = m;
    this.n = n;
    this.o = o;
    this.p = p;
}

function Triangulation ( points ) {
    var _this = this;
    this.Points = points || [];
    this.Triangles = [];
    this.HullPoints = [];
    this.HullLines = [];
    this.HolderTriangle = undefined; 

    (function constructor () {

        _this.HolderTriangle = makeHolderTriangle();
        _this.Triangles.push( _this.HolderTriangle ); 

    }());

    function makeHolderTriangle ( dontAdd ) {

        var side = 1000;
        var a = new Vector2 ( width / 2, -side ) ;
        var b = new Vector2 ( -side, height );
        var c = new Vector2 ( side + width / 2, height );
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
                var tri = new Triangle( curP.clone(), curL.v1.clone(), curL.v2.clone() );
                this.Triangles.push( tri ); 
                     
            }

        }

        cleanHolderTriangle();        

    }

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

    }

}