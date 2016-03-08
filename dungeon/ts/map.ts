import {Triangulation} from "./lib/triangulation/triangulation";
import {Utils} from "./lib/triangulation/utils";
import {Geometry} from "./lib/triangulation/geometryModule";
import {QuadTree} from "./lib/triangulation/quadTree";
import {Room} from "room";
import {Defs} from "defs";

export class Map {
  get Corridors(){ return this.corridors; }
  get Width(){ return this.width; }
  get Height(){ return this.height; }
  get Rooms(){ return this.rooms; }
  get Points(){ return this.points; }
  get Triangulation(){ return this.tri; }

  private rooms: Room[] = [];
  private width: number = 300;
  private height: number = 300;

  private tri: Triangulation;
  private corridors: Geometry.Line[];
  private quadTree: QuadTree;
  private points: Geometry.Vector2[];
  private allPossibleRooms: QuadTree[];
  private roomsRow: Room[] = [];
  private roomsCol: Room[] = [];

  private roomsNum: number = 75;
  private extraCorridors: number = 0;

  constructor(){
    this.roomsRow.length = this.width;
    this.roomsCol.length = this.height;
    this.quadTree = this.makeQuadTrees();
    this.allPossibleRooms = this.quadTree.BottomLayer;
    this.points = this.chooseRandomRooms( this.roomsNum );
    this.tri = new Triangulation( this.points );
    this.tri.Triangulate();
    this.corridors = this.tri.FindMinSpanTree();
    this.corridors = this.corridors.concat( Utils.RandomUniqueFromArray( this.tri.NonMinSpanLines, this.extraCorridors ) );
    this.corridors = this.makeManhattanCorridors();
    this.cleanCorridors();
  }

  makeQuadTrees () {
    let v1 = new Geometry.Vector2(0, 0);
    let v2 = new Geometry.Vector2(this.width, 0);
    let v3 = new Geometry.Vector2(this.width, this.height);
    let v4 = new Geometry.Vector2(0, this.height);
    let newQuad = new QuadTree( v1, v2, v3, v4 );
    newQuad.Start( 4 );
    return newQuad;
  }

  chooseRandomRooms(points: number): Geometry.Vector2[]{
  	let pts = [];

    let selectedQuadTrees = Utils.RandomFromArray(this.allPossibleRooms, this.roomsNum);

    for (let q = 0; q < selectedQuadTrees.length; q++){
      let newRoom = new Room({difficulty: 3});
      newRoom.QuadTree = selectedQuadTrees[q];
      newRoom.QuadTree.Centroid.AssociatedRoom = newRoom;
      this.addToRoomGrid(newRoom);
      this.rooms.push(newRoom);
    }

    for (let r = 0; r < this.rooms.length; r++)
        pts.push(this.rooms[r].QuadTree.Centroid);

  	return Utils.Sort( pts, "y" );
  }

  addToRoomGrid(room: Room){
    room.MapGridX = Math.round(room.QuadTree.Centroid.x);
    room.MapGridY = Math.round(room.QuadTree.Centroid.y);

    this.roomsRow[room.MapGridX] = room;
    this.roomsCol[room.MapGridY] = room;
  }

  makeManhattanCorridors(): Geometry.Line[]{
    let manhattanCorridors = [];

    for (let c = 0; c < this.corridors.length; c++) {
      let curLine = this.corridors[c];

      let line1 = new Geometry.Line(
        curLine.v1,
        new Geometry.Vector2(curLine.v1.x, curLine.v2.y));

      let line2 = new Geometry.Line(
        curLine.v2,
        new Geometry.Vector2(curLine.v1.x, curLine.v2.y));

      manhattanCorridors.push(line1);
      manhattanCorridors.push(line2);
    }

    return manhattanCorridors;
  }

  cleanCorridors(){ // remove corridors between adjacent rooms
    for (let c = this.corridors.length - 1; c >= 0; c--) {
      let curCor = this.corridors[c];
      let room1 = curCor.v1.AssociatedRoom;
      let room2 = curCor.v2.AssociatedRoom;

      if(this.areRoomsAdjacent(room1, room2))
        this.corridors.splice(c, 1);
    }
  }

  areRoomsAdjacent(room1: Room, room2: Room): boolean{
    if( (this.roomsRow[room1.MapGridX] == this.roomsRow[room2.MapGridX]) )
    return true;
  }
}
