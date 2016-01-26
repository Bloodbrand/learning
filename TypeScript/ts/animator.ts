/// <reference path="refs.d.ts"/>
import THREE = require("three");
import Updater = require("Updater");

class Animator{
	private then = Date.now();
	private now = undefined;
	private delta = undefined;
	private frameID = undefined;
	private fps = 30;
	private interval = 1000 / this.fps;


	constructor(public Loader, public Camera: THREE.PerspectiveCamera, public Renderer: THREE.WebGLRenderer) {
		this.Start();
		window.addEventListener('resize', this.ResizeWindow, false);
		console.info("new animator created");
	}

	Start(){
		this.render();
	}

	private render(){
		this.frameID = requestAnimationFrame( () => this.render() );
		this.now = Date.now();
		this.delta = this.now - this.then;

		if (this.delta < this.interval) return;
		this.then = this.now - (this.delta % this.interval);  
		Updater.Update();
		this.Renderer.render(this.Loader.Scene, this.Camera);	}


    ResizeWindow = () => {
		let renderSize = {
	        width: this.Renderer.container.offsetWidth,
			height: this.Renderer.container.offsetHeight
		};

		this.Renderer.setSize(renderSize.width, renderSize.height);
		this.Camera.aspect = renderSize.width / renderSize.height;
		this.Camera.updateProjectionMatrix();
	}
}


export = Animator;