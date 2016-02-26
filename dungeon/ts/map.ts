import {Triangulation} from "./lib/triangulation/triangulation";
import {Utils} from "./lib/triangulation/utils";
import {Geometry} from "./lib/triangulation/geometryModule";
import {QuadTree} from "./lib/triangulation/quadTree";

export class Map {
  public Rooms = [];
  public Points: Geometry.Vector2[];

  width: number = 300;
  height: number = 300;
  roomsNum: number = 150;
  extraLines: number = 10;

  tri: Triangulation;
  Mst: Geometry.Line[];
  quadTree: QuadTree;

  constructor(){
    this.quadTree = this.MakeQuadTrees(this.width, this.height);
    this.Rooms = this.quadTree.BottomLayer;
    this.Points = this.generateRandomPoints( this.roomsNum );
    //this.points = this.generateCustomPoints( this.roomsNum );
    this.tri = new Triangulation( this.Points );
    this.tri.Triangulate();
    this.Mst = this.tri.FindMinSpanTree();
    this.Mst = this.Mst.concat( Utils.RandomFromArray( this.tri.NonMinSpanLines, this.extraLines ) );
  }

  generateRandomPoints(points: number): Geometry.Vector2[]{
    let margin = 0;
  	let pts = [];

  	for ( let i = 0; i < points; i++ )
  		/*pts.push(
  			new Geometry.Vector2(
  			Utils.RandomNum( 0 + margin, this.width - margin ),
  			Utils.RandomNum( 0 + margin, this.height  - margin ))
  		);*/
      pts.push(this.Rooms[Utils.RandomNum(0, this.Rooms.length)].Centroid);

  	return Utils.Sort( pts, "y" );
  }

  generateCustomPoints(points: number): Geometry.Vector2[]{
    let margin = 2;
    let rows = 10;
    let cols = 10;
    let rowSize = ( this.height - margin * 2 ) / rows;
    let colSize = ( this.width  - margin * 2) / cols;
    let pts = [];

    for ( let r = 0; r <= rows; r++ ) {
      pts.push( new Geometry.Vector2(margin, rowSize * r + margin) );

      for ( let c = 1; c <= cols; c++ )
        pts.push( new Geometry.Vector2( colSize * c + margin + 1, rowSize * r + margin ) );

    };

    return Utils.Sort(pts, "y");
  }

  public MakeQuadTrees ( width: number, height: number ) {
    let v1 = new Geometry.Vector2(0, 0);
    let v2 = new Geometry.Vector2(width, 0);
    let v3 = new Geometry.Vector2(width, height);
    let v4 = new Geometry.Vector2(0, height);
    let newQuad = new QuadTree( v1, v2, v3, v4 );

    //newQuad.Start( points );
    newQuad.Start( 5 );
    return newQuad;
  }

}
