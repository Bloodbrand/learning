export class Animate {

  public static Container: HTMLElement;
  public static ContainerHeight: number;
  public static ContainerWidth: number;
  public static Renderer: THREE.Renderer;

	static fps: number = 30;
	static then: number = Date.now();
	static now: number;
	static delta: number;
	static frameID: number;
	static interval: number = 1000 / Animate.fps;  

  public static Render() {

  }

}
