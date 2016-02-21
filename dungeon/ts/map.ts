import {Triangulation} from "./lib/triangulation/triangulation";
import {Utils} from "./lib/triangulation/utils";
import {Geometry} from "./lib/triangulation/geometryModule";
import {QuadTree} from "./lib/triangulation/quadTree";

export class Map {

  width: number = 200;
  height: number = 200;
  rooms: number = 15;

  points: Geometry.Vector2[];
  tri: Triangulation;
  mst: Geometry.Line[];
  quadTree: QuadTree;

  constructor(){
    this.points = this.generateRandomPoints( this.rooms );
    this.tri = new Triangulation( this.points );
    this.tri.Triangulate();
    this.mst = this.tri.FindMinSpanTree();

    let v1 = new Geometry.Vector2(0, 0);
    let v2 = new Geometry.Vector2(this.width, 0);
    let v3 = new Geometry.Vector2(this.width, this.height);
    let v4 = new Geometry.Vector2(0, this.height);
    this.quadTree = new QuadTree( v1, v2, v3, v4 );
    this.quadTree.Start( this.points );
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

  	Utils.Sort( pts, "y" );
  	return pts;
  }

}
