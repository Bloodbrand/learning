import THREE = require("three");
import {Animate} from "animate";
import {Triangulation} from "./lib/triangulation/triangulation";
import {Geometry} from "./lib/triangulation/geometryModule";
import {Loader} from "loader";
import {Map} from "map";


export class Main{

  static addRenderer() {
    Animate.Renderer = new THREE.WebGLRenderer( {antialias: true} );
    Animate.Renderer.setSize( Animate.ContainerWidth, Animate.ContainerHeight);
    Animate.Container.appendChild( Animate.Renderer.domElement );
  }

  static addCamera() {
    Animate.Camera = new THREE.PerspectiveCamera( Animate.FOV,
      Animate.ContainerWidth / Animate.ContainerHeight,
      Animate.CamNear, Animate.CamFar);

    Animate.Camera.position.y = 500;
    Animate.Camera.lookAt(new THREE.Vector3(0,0,0));
  }

  static testMap(){
    //let t = new Triangulation();
    //console.log(t);
    let m = new Map();
    //console.log(m)
    let l = new Loader(m);
  }


  public static Start( containerID: string = "webgl" ) {
    Animate.Container = document.getElementById( containerID );
    Animate.ContainerWidth = Animate.Container.offsetWidth;
    Animate.ContainerHeight = Animate.Container.offsetHeight;
    this.addRenderer();
    this.addCamera();
    this.testMap();
    Animate.Start();
  }

}

Main.Start();
