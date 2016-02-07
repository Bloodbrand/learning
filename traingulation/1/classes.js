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