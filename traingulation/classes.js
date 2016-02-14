function Vector2 ( x, y ) {
    this.x = x;
    this.y = y;
    //this.pointID = Utils.UniqueID();

    this.clone = function () {
        return new Vector2 ( this.x, this.y );
    };
}

function Line ( v1, v2 ) {
    this.v1 = v1;
    this.v2 = v2;
    this.midpoint = undefined;
    this.length = undefined;

    this.clone = function () {
        return new Line ( this.v1, this.v2 );
    };

    this.getLength = function () {

        this.length = Vector.magnitude ( Vector.subtract (this.v1, this.v2) );
        return this.length;

    };

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
    };

    this.getLinesLength = function () {

        this.lines.AB.getLength();
        this.lines.BC.getLength();
        this.lines.CA.getLength();

    };

    this.getLinesArray = function () {

        return [ this.lines.AB, this.lines.BC, this.lines.CA ];

    };

}

function DisjoinedSet ( point ) {

    this.disjoinedSetID = Utils.UniqueID();
    this.points = [ point ];

    point.set = this;

    this.Merge = function ( set ) {

        for ( var i = 0; i < set.points.length; i++ ) {

            set.points[i].set = this;
            this.points.push( set.points[i] );

        }  

        set = this;

    };
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

