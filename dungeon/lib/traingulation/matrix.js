var Matrix = function () {
return {
	DetM2: function ( m ) {
		return m.a * m.d - m.b * m.c;
	}
	,
	DetM3: function ( m ) {
		return m.a * this.DetM2( new Matrix2( m.e, m.f, m.h, m.i) ) -
			   m.b * this.DetM2( new Matrix2( m.d, m.f, m.g, m.i) ) +
			   m.c * this.DetM2( new Matrix2( m.d, m.e, m.g, m.h) );
	}
	,
	DetM4: function ( m ) {
		return ( m.a * this.DetM3( new Matrix3( m.f, m.g, m.h, m.j, m.k, m.l, m.n, m.o, m.p ) ) ) -
			   ( m.b * this.DetM3( new Matrix3( m.e, m.g, m.h, m.i, m.k, m.l, m.m, m.o, m.p ) ) ) +
			   ( m.c * this.DetM3( new Matrix3( m.e, m.f, m.h, m.i, m.j, m.l, m.m, m.n, m.p ) ) ) -
			   ( m.d * this.DetM3( new Matrix3( m.e, m.f, m.g, m.i, m.j, m.k, m.m, m.n, m.o ) ) ); 
	}
}
}();