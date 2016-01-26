import THREE = require("three");
import Animator = require("Animator");
import Updater = require("Updater");
import Refs = require("Refs");
import FirstPersonController = require("Controller");
import Level = require("Level");
import Vector = require("Vector");

class Loader{
	Animator: Animator;
	Controller: FirstPersonController;

	constructor(public Scene: THREE.Scene, public Camera: THREE.PerspectiveCamera, public Renderer: THREE.WebGLRenderer) {
		this.Animator = new Animator(this, Camera, Renderer);
		console.info("new loader created");
	}

	LoadLevel(level: Refs.ILevel){
		let allObjs: THREE.Mesh[] = level.Rooms.concat(level.Doodads);

		for (var i = 0; i < allObjs.length; i++) 
			this.Add(allObjs[i]);

		this.Controller = new FirstPersonController(this.Camera, this.Animator.Renderer.container, level, this);
		this.Controller.GetObject().position.set(level.SpawnPoint.x, this.Controller.GetHeight(), level.SpawnPoint.y);
		this.Add(this.Controller.GetObject());
		//let cont = this.Controller;
		//setTimeout(function() { cont.fire() }, 200);
	}

	Add(obj: THREE.Object3D) {
		this.Scene.add(obj);
	}

	Remove(obj: THREE.Mesh){
		obj.geometry.dispose();
		//obj.material.map.dispose();
		console.log(obj.material)
		this.Scene.remove(obj);
	}
}

export = Loader;