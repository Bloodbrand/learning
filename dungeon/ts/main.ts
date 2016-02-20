import THREE = require("three");
import {Animate} from 'animate';

export class Main{

  static addRenderer() {

    Animate.Renderer = new THREE.WebGLRenderer( {antialias: true} );
    Animate.Renderer.setSize( Animate.ContainerWidth, Animate.ContainerHeight);
    Animate.Container.appendChild( Animate.Renderer.domElement );

  }


  public static Start( containerID: string = "webgl" ) {

    Animate.Container = document.getElementById( containerID );
    Animate.ContainerWidth = Animate.Container.offsetWidth;
    Animate.ContainerHeight = Animate.Container.offsetHeight;
    this.addRenderer();

  }

}

Main.Start();
