import {Geometry} from "geometryModule";
import {Utils} from "utils";
import {QuadTree} from "quadTree";

export class Triangulation{

  public Triangles: Geometry.Triangle[] = [];
  public Lines: Geometry.Line[] = [];
  public UniqueLines: Geometry.Line[];
  public NonMinSpanLines: Geometry.Line[];
  public HullPoints: Geometry.Vector2[];
  public HullLines: Geometry.Line[];
  public HolderTriangle: Geometry.Triangle;
  private side: number = 10000;

  constructor( public Points: Geometry.Vector2[] = [] ){
    this.HolderTriangle = this.makeHolderTriangle();
    this.Triangles.push( this.HolderTriangle );
  }

  makeHolderTriangle(): Geometry.Triangle{
    let a = new Geometry.Vector2 (          0,  -this.side );
    let b = new Geometry.Vector2 ( -this.side,  this.side );
    let c = new Geometry.Vector2 (  this.side,  this.side );
    let holderTri = new Geometry.Triangle ( a, b, c );

    holderTri.Centroid = Utils.FindCentroid( holderTri );

    return holderTri;
  }

  cleanHolderTriangle(): void{
    let a = this.HolderTriangle.a;
    let b = this.HolderTriangle.b;
    let c = this.HolderTriangle.c;

    for (let t = this.Triangles.length - 1; t >= 0; t--) {

        let curT = this.Triangles[t];

        if (( Utils.IsSamePoint (curT.a, a) || Utils.IsSamePoint (curT.b, a) ||  Utils.IsSamePoint(curT.c, a) ) ||
            ( Utils.IsSamePoint (curT.a, b) || Utils.IsSamePoint (curT.b, b) ||  Utils.IsSamePoint(curT.c, b) ) ||
            ( Utils.IsSamePoint (curT.a, c) || Utils.IsSamePoint (curT.b, c) ||  Utils.IsSamePoint(curT.c, c) ) )
                this.Triangles.splice( t, 1 );
    };
  }

  public Triangulate(): void{

    for ( let p = 0; p < this.Points.length; p++ ) {
      let curP: Geometry.Vector2 = this.Points[p];
      let badTriangles: Geometry.Triangle[] = [];

      for ( let t = this.Triangles.length - 1; t >= 0; t-- ) {
        let curT: Geometry.Triangle = this.Triangles[t];

        if ( Utils.PointInCircumcircle( curP, curT ) == true ) {
            this.Triangles.splice( t, 1 );
            badTriangles.push( curT );
        }
      }

      let uniqueLines = Utils.FindUniqueLines( badTriangles );

      for ( let ul = 0; ul < uniqueLines.length; ul++ ) {
          let curL = uniqueLines[ul];
          let tri = new Geometry.Triangle( curP, curL.v1, curL.v2 );
          this.Triangles.push( tri );
      }
    }
    this.cleanHolderTriangle();
  }

  public FindHull():Geometry.Vector2[] {
    let hullLines = [];
    let uniqueLines = Utils.FindUniqueLines( this.Triangles );
    let pts = Utils.ArrayFromProp ( uniqueLines, [ "v1", "v2" ] );
    let length = pts.length;
    let centroid = Utils.FindPolyCentroid( pts );


    pts = Utils.ArrangePointsCCWPoly( pts );


    for ( let p = length - 1; p >= 0; p -= 2 ) // eliminate duplicates
        pts.splice( p, 1 );

    length = pts.length;

    for ( let up = 1; up < length; up++ )
        hullLines.push( new Geometry.Line( pts[up - 1], pts[up] ) );

    hullLines.push( new Geometry.Line( pts[length - 1], pts[0] ) );

    this.HullPoints = pts;
    this.HullLines = hullLines;
    return pts;
  }

  public FindMinSpanTree(){
    let mst: Geometry.Line[] = [];

    this.UniqueLines = this.Lines.slice(0);

    for ( let t = 0; t < this.Triangles.length; t++ ) {
        let curTri = this.Triangles[t];
        curTri.GetLinesLength();
        this.UniqueLines = this.UniqueLines.concat( curTri.GetLinesArray() );
    };

    this.UniqueLines = Utils.Sort( this.UniqueLines, "Length" );

    for ( let l = this.UniqueLines.length - 1; l >= 1 ; l-- ) // eliminate duplicates
        if( Utils.IsSameLine( this.UniqueLines[l], this.UniqueLines[l - 1] ) )
            this.UniqueLines.splice( l, 1 );

    this.NonMinSpanLines = this.UniqueLines.slice(0);

     for ( let p = 0; p < this.Points.length; p++ )     // make a set for each point
        new Geometry.DisjoinedSet( this.Points[p] );

    for ( let l = 0; l < this.UniqueLines.length; l++ ) {     // Kruskal's algorithm
        let curLine = this.UniqueLines[l];

        if ( curLine.v1.DisjoinedSet.ID != curLine.v2.DisjoinedSet.ID ) {
            curLine.v1.DisjoinedSet.Merge( curLine.v2.DisjoinedSet );
            mst.push ( curLine );
            this.NonMinSpanLines[ l ] = undefined;
        }
    }

    return mst;
  }

}
