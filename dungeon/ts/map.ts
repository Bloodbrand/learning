import {Triangulation} from "./lib/triangulation/triangulation";
import {Utils} from "./lib/triangulation/utils";
import {Geometry} from "./lib/triangulation/geometryModule";
import {QuadTree} from "./lib/triangulation/quadTree";

export class Map {
  width: number = 200;
  height: number = 200;
  rooms: number = 125;
  extraLines: number = 10;

  points: Geometry.Vector2[];
  tri: Triangulation;
  mst: Geometry.Line[];
  quadTree: QuadTree;

  constructor(){
    this.points = this.generateRandomPoints( this.rooms );
    //this.points = this.generateCustomPoints( this.rooms );
    this.tri = new Triangulation( this.points );
    this.tri.Triangulate();
    this.mst = this.tri.FindMinSpanTree();
    this.mst = this.mst.concat( Utils.RandomFromArray( this.tri.NonMinSpanLines, this.extraLines ) );
    this.quadTree = this.tri.MakeQuadTrees(this.points, this.width, this.height);
  }

  generateRandomPoints(points: number): Geometry.Vector2[]{
    let margin = 0;
  	let pts = [];

  	for ( let i = 0; i < points; i++ )
  		pts.push(
  			new Geometry.Vector2(
  			Utils.RandomNum( 0 + margin, this.width - margin ),
  			Utils.RandomNum( 0 + margin, this.height  - margin ))
  		);

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

}
