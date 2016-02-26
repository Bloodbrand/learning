import {QuadTree} from "./lib/triangulation/quadTree";
import {Utils} from "./lib/triangulation/Utils";

export class Room{
  public QuadTree: QuadTree;

  private maxDifficulty = 4;

  constructor(public Difficulty?: number){
    if(Difficulty == undefined) this.Difficulty = Utils.RandomNum(0, this.maxDifficulty)
  }

  public SetDifficulty(d: number):void{

  }
}
