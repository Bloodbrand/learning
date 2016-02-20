import THREE = require("three");
import {Animate} from 'animate';
import {Loader} from "loader";

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
  }


  public static Start( containerID: string = "webgl" ) {
    Animate.Container = document.getElementById( containerID );
    Animate.ContainerWidth = Animate.Container.offsetWidth;
    Animate.ContainerHeight = Animate.Container.offsetHeight;
    this.addRenderer();
    this.addCamera();
    //Animate.Render();
  }

}

Main.Start();
