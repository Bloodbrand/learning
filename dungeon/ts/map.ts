import {Triangulation} from "./lib/triangulation/triangulation";
import {Utils} from "./lib/triangulation/utils";
import {Geometry} from "./lib/triangulation/geometryModule";
import {QuadTree} from "./lib/triangulation/quadTree";
import {Room} from "room";

export class Map {
  get Mst(){ return this.mst; }
  get Width(){ return this.width; }
  get Height(){ return this.height; }
  get Rooms(){ return this.rooms; }
  get Points(){ return this.points; }

  private rooms: Room[] = [];
  private width: number = 300;
  private height: number = 300;
  private roomsNum: number = 75;
  private extraLines: number = 100;

  private tri: Triangulation;
  private mst: Geometry.Line[];
  private quadTree: QuadTree;
  private points: Geometry.Vector2[];
  private allRooms: QuadTree[];

  constructor(){
    this.quadTree = this.MakeQuadTrees();
    this.allRooms = this.quadTree.BottomLayer;
    this.points = this.chooseRandomRooms( this.roomsNum );
    this.tri = new Triangulation( this.points );
    this.tri.Triangulate();
    this.mst = this.tri.FindMinSpanTree();
    this.mst = this.mst.concat( Utils.RandomUniqueFromArray( this.tri.NonMinSpanLines, this.extraLines ) );
  }

  chooseRandomRooms(points: number): Geometry.Vector2[]{
  	let pts = [];

    let quadTrees = Utils.RandomFromArray(this.allRooms, this.roomsNum);

    for (let q = 0; q < quadTrees.length; q++){
      let newRoom = new Room(3);
      newRoom.QuadTree = quadTrees[q];
      this.rooms.push(newRoom);
    }

    for (let r = 0; r < this.rooms.length; r++)
        pts.push(this.rooms[r].QuadTree.Centroid);

  	return Utils.Sort( pts, "y" );
  }

  public MakeQuadTrees () {
    let v1 = new Geometry.Vector2(0, 0);
    let v2 = new Geometry.Vector2(this.width, 0);
    let v3 = new Geometry.Vector2(this.width, this.height);
    let v4 = new Geometry.Vector2(0, this.height);
    let newQuad = new QuadTree( v1, v2, v3, v4 );
    newQuad.Start( 4 );
    return newQuad;
  }

}
