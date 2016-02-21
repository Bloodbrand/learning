import THREE = require("three");
import {Animate} from 'animate';
import {Map} from 'map';
import {Geometry} from "./lib/triangulation/geometryModule";
import {Utils} from "./lib/triangulation/utils";

export class Loader {

  public Scene: THREE.Scene;

  constructor( map: Map ){
    Animate.Loader = this;
    this.Scene = new THREE.Scene();
    this.addLight();
    this.makeMap( map );
  }

  addLight(): void{
    this.Scene.add(new THREE.AmbientLight(0x333333));
  }

  makeMap( map: Map ): void{
    this.placePoints(map.points);
    this.placeLines(map.tri.UniqueLines);
  }

  placePoints(pts: Geometry.Vector2[]): void{
    for(let p = 0; p < pts.length; p++){
      let mat = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
      let curP = pts[p];
      let q = curP.QuadTree;
      let geom = new THREE.BoxGeometry(2, 1, 2)
      let mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(curP.x, 0, curP.y);
      this.Scene.add(mesh);
    }
  }

  placeLines(lines: Geometry.Line[]){
    let material = new THREE.LineBasicMaterial({
  	   color: 0xffffff
    });

    for(let l = 0; l < lines.length; l++){
      let curL = lines[l];
      let geometry = new THREE.Geometry();
      geometry.vertices.push(
        	new THREE.Vector3( curL.v1.x, 0, curL.v1.y ),
          new THREE.Vector3( curL.v2.x, 0, curL.v2.y )
      );

      let line = new THREE.Line( geometry, material );
      this.Scene.add( line );
    }
  }

}
