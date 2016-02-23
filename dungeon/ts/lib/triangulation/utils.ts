import {Geometry} from "geometryModule";

export class Utils{
  static uniqueID: number = 0;

  public static UniqueID(): number{
    return Utils.uniqueID++;
  }

  public static RandomNum( min: number, max: number ): number{
    return Math.floor( Math.random() * (max - min + 1 ) + min );
  }

  public static RandomFromArray ( arr: any[], num: number ): any[]{
    let chosenNumbers = [];
    let chosen = [];

    if(num > arr.length){
      num = arr.length;
      console.warn("'RandomFromArray():'More elements than available, returning max number");
    }

    while ( chosen.length < num ) {
        let randomNum = this.RandomNum( 0, arr.length - 1 );
        if ( chosenNumbers.indexOf( randomNum ) == -1 ) {
            let obj = arr[ randomNum ];
            if( obj ) chosen.push( obj );
        }
    }
    return chosen;
  }

  public static ArrayFromProp ( arr: any[], prop: string | string[] ): any[] {
    let newArr = [];
    let selectedFunction;

    ( typeof prop === "Array" ) ?
    selectedFunction = cycleProps :
    selectedFunction = singleProp;

    function singleProp ( obj, prop ) {
      newArr.push( obj[prop] );
    }

    function cycleProps (obj, prop) {
      let propsArr = [];

      for ( let p = 0; p < prop.length; p++ )
          propsArr.push( obj[ prop[p] ] );

      newArr = newArr.concat( propsArr );
    }

    return newArr;
  }

  public static PointInTriangle( pt, tri ): boolean {
    function sign (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    let b1 = sign(pt, tri.a, tri.b) < 0;
    let b2 = sign(pt, tri.b, tri.c) < 0;
    let b3 = sign(pt, tri.c, tri.a) < 0;

    return ((b1 == b2) && (b2 == b3));
  }

  public static PointInCircumcircle( pt: Geometry.Vector2, tri: Geometry.Triangle): boolean{
    let A: number = tri.a.x;
    let B: number = tri.a.y;
    let C: number = Math.pow( tri.a.x, 2 ) + Math.pow( tri.a.y, 2 );
    let D: number = 1;
    let E: number = tri.b.x;
    let F: number = tri.b.y;
    let G: number = Math.pow( tri.b.x, 2 ) + Math.pow( tri.b.y, 2 );
    let H: number = 1;
    let I: number = tri.c.x;
    let J: number = tri.c.y;
    let K: number = Math.pow( tri.c.x, 2 ) + Math.pow( tri.c.y, 2 );
    let L: number = 1;
    let M: number = pt.x;
    let N: number = pt.y;
    let O: number = Math.pow( pt.x, 2 ) + Math.pow( pt.y, 2 );
    let P: number = 1;

    let Ma: Geometry.Matrix4 = new Geometry.Matrix4( A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P );
    let result = Ma.Determine();

    return ( result < 0 ) ? true : false;
  }

  public static FindUniqueLines ( tris: Geometry.Triangle[] ): Geometry.Line[] {
    let lines = [];
    let uniqueLines = [];

    for ( let t = 0; t < tris.length; t++ )
        lines = lines.concat( [ tris[t].Lines.AB,
                                tris[t].Lines.BC,
                                tris[t].Lines.CA ]);

    for ( let l = 0; l < lines.length; l++ ) {              // line to test
        let curL = lines[l];
        let linesWithout = lines.slice( 0 );
        linesWithout.splice( l, 1 );                        // remove line to test from test array
        let matches = 0;

        for (let ol = 0; ol < linesWithout.length; ol++ ) { // other lines
            let otherL = linesWithout[ol];
            if ( this.IsSameLine ( curL, otherL ) ) matches++;   // line shared by 2 tris
        };

        if( matches == 0 ) uniqueLines.push( curL );        // unique line
    };

    return uniqueLines;
  }

  public static IsSamePoint ( p1: Geometry.Vector2, p2: Geometry.Vector2 ): boolean {
    if ( p1.x == p2.x && p1.y == p2.y ) return true;
    if ( p1.x == p2.y && p1.y == p2.x ) return true;

    return false;
  }

  public static IsSameLine ( l1: Geometry.Line, l2: Geometry.Line ): boolean {
    if ( this.IsSamePoint( l1.v1, l2.v1 ) && this.IsSamePoint( l1.v2, l2.v2 ) ) return true;
    if ( this.IsSamePoint( l1.v2, l2.v1 ) && this.IsSamePoint( l1.v1, l2.v2 ) ) return true;

    return false;
  }

  public static Sort ( arr: any[], prop: string ): any[] { // bubble sort

    try{
      if( !arr[0].hasOwnProperty(prop) )
        throw("Bubble sort error! No " + prop + " property found.");
    }
    catch(err){
      console.error(err);
      return;
    }

    let swapped = true;

    while (swapped) {
        swapped = false;

        for ( let i = 1; i < arr.length; i++ ) {
            let curVal  = arr[ i ][prop];
            let lastVal = arr[ i - 1 ][prop];
            let temp = undefined;

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

  public static FindCentroid ( tri: Geometry.Triangle ): Geometry.Vector2 {
    let x: number = ( tri.a.x + tri.b.x + tri.c.x ) / 3;
    let y: number = ( tri.a.y + tri.b.y + tri.c.y ) / 3;

    tri.Centroid = new Geometry.Vector2 ( x, y );
    return tri.Centroid;
  }

  public static FindPolyCentroid ( pts: Geometry.Vector2[] ): Geometry.Vector2 {
    let totalX: number = 0;
    let totalY: number = 0;
    let length: number = pts.length;

    for ( let p = 0; p < length; p++ ) {
        totalX += pts[p].x;
        totalY += pts[p].y;
    };

    return new Geometry.Vector2 ( totalX / length, totalY / length );
  }

  public static FindMidpoint ( tri: Geometry.Triangle ) {
    let sumVecAB = tri.a.Add(tri.b);
    let sumVecBC = tri.b.Add(tri.c);
    let sumVecCA = tri.c.Add(tri.a);


    let sumAB = new Geometry.Line ( new Geometry.Vector2(0, 0), sumVecAB );
    let lineAB = new Geometry.Line ( tri.a, tri.b );

    let sumBC = new Geometry.Line ( new Geometry.Vector2(0, 0), sumVecBC );
    let lineBC = new Geometry.Line ( tri.b, tri.c );

    let sumCA = new Geometry.Line ( new Geometry.Vector2(0, 0), sumVecCA );
    let lineCA = new Geometry.Line ( tri.c, tri.a );

    tri.Lines.AB.Midpoint = this.FindIntersection(sumAB, lineAB);
    tri.Lines.BC.Midpoint = this.FindIntersection(sumBC, lineBC);
    tri.Lines.CA.Midpoint = this.FindIntersection(sumCA, lineCA);

    return [ tri.Lines.AB.Midpoint,
             tri.Lines.BC.Midpoint,
             tri.Lines.CA.Midpoint ];


  }

  public static FindIntersection ( line1: Geometry.Line, line2: Geometry.Line ): Geometry.Vector2 {
    var intersectX: number =
       (( line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x ) *
        ( line2.v1.x - line2.v2.x ) -
        ( line1.v1.x - line1.v2.x ) *
        ( line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x )) /
       (( line1.v1.x - line1.v2.x ) *
        ( line2.v1.y - line2.v2.y ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x - line2.v2.x ));

    var intersectY: number =
       (( line1.v1.x * line1.v2.y - line1.v1.y * line1.v2.x ) *
        ( line2.v1.y - line2.v2.x ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x * line2.v2.y - line2.v1.y * line2.v2.x )) /
       (( line1.v1.x - line1.v2.x ) *
        ( line2.v1.y - line2.v2.y ) -
        ( line1.v1.y - line1.v2.y ) *
        ( line2.v1.x - line2.v2.x ));

    return new Geometry.Vector2 ( intersectX, intersectY );
  }

  public static ArrangePointsCCWTri ( tri: Geometry.Triangle ): Geometry.Triangle {
    var pts = [ tri.a, tri.b, tri.c ];

    for ( var p = 0; p < pts.length; p++ )
        pts[p].TriCCWAngle = Math.atan2( (pts[p].y - tri.Centroid.y), (pts[p].x - tri.Centroid.x) );

    pts = this.Sort( pts, "TriCCWAngle" );

    tri.a = pts [2];
    tri.b = pts [1];
    tri.c = pts [0];

    return tri;
  }

  public static ArrangePointsCCWPoly ( pts: Geometry.Vector2[], centroid?: Geometry.Vector2 ): Geometry.Vector2[] {
    centroid = centroid || this.FindPolyCentroid( pts );

    for ( var p = 0; p < pts.length; p++ )
        pts[p].PolyCCWAngle = Math.atan2( (pts[p].y - centroid.y), (pts[p].x - centroid.x) );

    let points = this.Sort( pts, "PolyCCWAngle" );
    return points;
  }

  public static CheckCCW ( p1: Geometry.Vector2, p2: Geometry.Vector2, p3: Geometry.Vector2 ): number {
    // ccw > 0, cwise < 0, collinear if ccw = 0
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  }

  public static RadToDeg ( rad:number ):number {
    return rad * ( 180 / Math.PI )
  }

	public static DegToRad ( deg:number ):number {
    return deg * ( Math.PI / 180 )
  }

}
