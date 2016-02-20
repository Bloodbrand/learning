import {Loader} from "loader";

export class Animate {

  // Container
  public static Container: HTMLElement;
  public static ContainerHeight: number;
  public static ContainerWidth: number;

  // Renderer
  public static Renderer: THREE.Renderer;

  // Camera
  public static Camera: THREE.Camera;
  public static FOV: number = 45;
  public static CamNear: number = 1;
  public static CamFar: number = 100;

  // Loader
  public static Loader: Loader;

  // Delta time
	static fps: number = 30;
	static then: number = Date.now();
	static now: number;
	static delta: number;
	static frameID: number;
	static interval: number = 1000 / Animate.fps;

  static render() {
    Animate.frameID = requestAnimationFrame( () => this.render() );
		this.now = Date.now();
		this.delta = this.now - this.then;

    if ( this.delta < this.interval ) return;

    this.then = this.now - ( this.delta % this.interval );
    this.Renderer.render(this.Loader.Scene, this.Camera);
  }

  public static Start(){
    this.render();
  }

  public static Stop(){

  }

}
