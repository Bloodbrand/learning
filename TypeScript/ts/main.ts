import THREE = require("three");
import Loader = require("Loader");
import Level = require("Level");
import Refs = require("Refs");

class Main{	
	private static _fov: number = 45;
	private static _camNear: number = 0.1;
	private static _camFar: number = 1000;

	private static addRenderer(width: number, height: number, container): THREE.WebGLRenderer {
		let renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(width, height);
		container.appendChild(renderer.domElement);
		renderer.container = container;
		return renderer;
	}

	private static addCamera(width: number, height: number): THREE.PerspectiveCamera{
		return new THREE.PerspectiveCamera(this._fov, width / height, this._camNear, this._camFar);
	}

	private static addLight(){
		let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 1, 0);

        let ambientalLight = new THREE.AmbientLight(0x333333);
        directionalLight.add(ambientalLight);
        return directionalLight;
	}

	static Start(containerID: string = "webGL") {
		let container = document.getElementById(containerID);
		if (container === null) 
			return console.error("webGL container not found"); 
		let width = container.offsetWidth;
		let height = container.offsetHeight;
		let loader = new Loader(
			new THREE.Scene(), 
			this.addCamera(width, height),
			this.addRenderer(width, height, container)
		);
		loader.Add(this.addLight());
		this.loadTestLevel(loader);
	}

	static LoadScene(name: string){

	}

	private static loadTestLevel(loader: Loader) {
		let spawnPoint = { x: 0, y: -10.5 };		
		let lvl = new Level(spawnPoint);
		let points: Refs.Point2D[] = 
		[
			{ x: -10, y:  10 },
			{ x: -10, y: -10 },
			{ x:  -5, y: -15 },
			{ x:  -5, y: -35 },
			{ x:   5, y: -35 },
			{ x:   5, y: -15 },
			{ x:  10, y: -10 },
			{ x:  10, y:  10 },
			{ x:   5, y:  10 },
			{ x:   5, y:  -5 },
			{ x:  -5, y:  -5 },
			{ x:  -5, y:  10 }
			/*{ x: -10, y: -10 },
			{ x: -10, y: 10 },
			{ x:  10, y: 10 },
			{ x:  10, y: -10 }*/

		];
		lvl.AddPoints(points);
		loader.LoadLevel(lvl);
	} 
}

export = Main;