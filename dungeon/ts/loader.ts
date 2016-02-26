import THREE = require("three");
import {Animate} from 'animate';
import {Map} from 'map';
import {Geometry} from "./lib/triangulation/geometryModule";
import {Utils} from "./lib/triangulation/utils";
import {Debug} from "./lib/triangulation/debug";

export class Loader {

  public Scene: THREE.Scene;

  private mapHolder: THREE.Object3D;

  constructor( private map: Map ){
    Animate.Loader = this;
    this.Scene = new THREE.Scene();
    this.addHolder();
    this.addLight();
    this.makeMap( map );
    Debug.RotateCamera(this);
  }

  addHolder(): void{
    this.mapHolder = new THREE.Object3D();
    this.mapHolder.position.x -= this.map.Width / 2;
    this.mapHolder.position.z -= this.map.Height / 2;
    this.Scene.add(this.mapHolder);
  }

  addLight(): void{
    this.Scene.add(new THREE.AmbientLight(0x333333));
  }

  makeMap( map: Map ): void{
    this.mapHolder.add(Debug.Lines(map.Mst));
    this.mapHolder.add(Debug.Points(map.Points));
    this.mapHolder.add(Debug.Rooms(map.Rooms));
    //this.Scene.add(Debug.Triangles(map.tri.Triangles));
  }

}
