///<reference path="../bower_components/three.js/three.d.ts"/>
class settings{
    static camNear: number = 0.1;
    static camFar: number = 100;
}

class Main{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;

    constructor(){
        this.scene = new THREE.Scene();
        this.addRenderer();
        this.addCamera();
    }

    addRenderer(){
        this.renderer = new THREE.WebGLRenderer();
    }

    addCamera(){
        this.camera = new THREE.PerspectiveCamera();
    }
}

var m = new Main();