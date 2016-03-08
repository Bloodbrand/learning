import {QuadTree} from "./lib/triangulation/quadTree";
import {Utils} from "./lib/triangulation/Utils";
import {Defs} from "defs";

export class Room{
  public QuadTree: QuadTree;
  public Difficulty: number;
  public MapGridX: number;
  public MapGridY: number;

  constructor(set: Defs.Room){
    this.Difficulty = set.difficulty;
  }

  public SetDifficulty(d: number):void{

  }
}
