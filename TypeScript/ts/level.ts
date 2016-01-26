import THREE = require("three");
import Refs = require("Refs");
import Vector = require("Vector");
import Shaders = require("Shaders");
import Triangulate = require("Triangulate");

class Level implements Refs.ILevel {
	Rooms: THREE.Mesh[];
	Doodads: THREE.Mesh[];

	private _floorThickness: number = 0.1;
	private _wallHeight: number = 5;

	constructor(public SpawnPoint: Refs.Point2D) {
		this.Rooms = [];
		this.Doodads = [];
	}

	AddPoints(points: Refs.Point2D[]){
		this.makeRoom(points);
	}

	private makeRoom(points: Refs.Point2D[]){
		let roomShape = new THREE.Shape();

		for (let i = 0; i < points.length; i++) {
			let curPoint = points[i];

			if (i == 0) 
				roomShape.moveTo(curPoint.x, curPoint.y);			
			else 
				roomShape.lineTo(curPoint.x, curPoint.y);

			this.findRoomBisectors(i, points);
		}

		this.extrude(roomShape, this._floorThickness, "floor");
		this.extrude(roomShape, this._floorThickness, "ceiling", this._wallHeight);
	}

	private findRoomBisectors(index: number, points: Refs.Point2D[]) {		
		let first = points[index];
		let second = points[index + 1];
		let third = points[index + 2];

		if (third === undefined)
			third = points[0];

		if (second === undefined) {
			second = points[0];
			third = points[1];
		} 

		let wallShape = new THREE.Shape();
		wallShape.moveTo(first.x, first.y);
		wallShape.lineTo(second.x, second.y);	

		let v1 = Vector.Subtract(second, first);
		let v2 = Vector.Subtract(second, third);
		let bisec = Vector.Add(Vector.Bisector(v1, v2), second);

		if (Vector.PointInPoly(bisec, points)) {
			let negativeBisec = Vector.Add(Vector.Negative(Vector.Bisector(v1, v2)), second);
			wallShape.lineTo(negativeBisec.x, negativeBisec.y);	
		}
		else 
			wallShape.lineTo(bisec.x, bisec.y);	

		this.extrude(wallShape, this._wallHeight, "wall");
	}

	private extrude(shape: THREE.Shape, amt: number, name: string, yOffset?: number){
		let extrusionSettings = { 
			amount: amt, 
			bevelEnabled: false 
		};	

		let geom = new THREE.ExtrudeGeometry(shape, extrusionSettings);
		let transMat = new THREE.Matrix4().makeTranslation(0, 0, -amt); 
		geom.applyMatrix(transMat);
		this.addRoom(geom, name, yOffset);
	}

	private addRoom(geom: THREE.ExtrudeGeometry, name: string, yOffset?: number) {
		//let mat = new THREE.MeshLambertMaterial({ color: 0x00ff00, map: this._dataTexture });
		//let mat = new Shaders.FloorShader(this._dataTexture);
		let mat = Shaders.Materials.Get(name);
		let mesh = new THREE.Mesh(geom, mat);
		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();
		mesh.rotation.x += Math.PI / 2;
		if (yOffset !== undefined) mesh.position.setY(yOffset);
		this.Rooms.push(mesh);
	}

	private addTestCube(pos: Refs.Point2D){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		//let geometry = new THREE.CylinderGeometry(.3, .3, this._wallHeight, 6);
		let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 /*, map: this._dataTexture*/});
		let cube = new THREE.Mesh(geometry, material);
		cube.position.set(pos.x, 0, pos.y);
		this.Doodads.push(cube);
	}
}

export = Level;