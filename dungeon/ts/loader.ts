import THREE = require("three");
import {Animate} from 'animate';
import {Map} from 'map';

export class Loader {

  public Scene: THREE.Scene;

  constructor(map: Map){
    this.Scene = new THREE.Scene();
    Animate.Loader = this;
  }

}
