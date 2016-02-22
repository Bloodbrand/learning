import THREE = require("three");
import {Animate} from 'animate';
import {Map} from 'map';
import {Geometry} from "./lib/triangulation/geometryModule";
import {Utils} from "./lib/triangulation/utils";
import {Debug} from "./lib/triangulation/debug";

export class Loader {

  public Scene: THREE.Scene;

  constructor( map: Map ){
    Animate.Loader = this;
    this.Scene = new THREE.Scene();
    this.addLight();
    this.makeMap( map );
    Debug.RotateCamera(this);
  }

  addLight(): void{
    this.Scene.add(new THREE.AmbientLight(0x333333));
  }

  makeMap( map: Map ): void{
    this.Scene.add(Debug.Lines(map.mst));
    this.Scene.add(Debug.Points(map.points));
    //this.Scene.add(Debug.Triangles(map.tri.Triangles));
  }

}
