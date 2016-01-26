import THREE = require("three");
import Refs = require("Refs");
import Updater = require("Updater");
import Portal = require("Portal");
import Level = require("Level");

class FirstPersonController implements Refs.IHandler {
	private _element;
	private _level: Refs.ILevel;
	private _loader;
	private _pitchObject: THREE.Mesh;
	private _yawObject: THREE.Mesh;
	private _PI_2: number = Math.PI / 2;
	private _sensitivity: number = 0.002;
	private _moveSpeed: number = 0.2;
	private _height: number = 2;
	private _havePointerLock: boolean;
	private _moveForward: boolean;
	private _moveBackward: boolean;
	private _moveLeft: boolean;
	private _moveRight: boolean;
	private _velocity: THREE.Vector3;
	private _moveRaycaster: THREE.Raycaster;
	private _aimRaycaster: THREE.Raycaster;
	private _crossHair: THREE.Vector2;
	private _testCube: THREE.Mesh;
	private _bluePortal: Portal;
	private _orangePortal: Portal;
	private _orangePortalButtonNum: number = 3;
	private _bluePortalButtonNum: number = 1;

	constructor(public Camera: THREE.PerspectiveCamera, container, level: Refs.ILevel, loader) {
		this._level = level;
		this._loader = loader;
		this._element = container;
		this._velocity = new THREE.Vector3();
		this._moveRaycaster = new THREE.Raycaster();
		this._aimRaycaster = new THREE.Raycaster();
		this._testCube = this.makeMesh();

		this._crossHair = new THREE.Vector2(
			((window.innerWidth / 2) / window.innerWidth) * 2 - 1 ,
		  - ((window.innerHeight / 2) / window.innerHeight) * 2 + 1
		);

		this._havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
		this._pitchObject = new THREE.Mesh();
		Camera.rotation.set(0, 0, 0);
		this._pitchObject.add(Camera);
		this._yawObject = new THREE.Mesh();
		this._yawObject.add(this._pitchObject);
		this._yawObject.add(this._testCube);
		//this._yawObject.rotateY(3.14159);
		this.addEvents();
		//this.addTestBox();
		Updater.Add(this);
		//this.fire();
	}

	Update(){
		//this.aim();
		this.move();

	}

	GetObject(): THREE.Mesh{
		return this._yawObject;
	}

	GetHeight(): number{
		return this._height;
	}

	SetSensitivity(newSensitivity: number){
		this._sensitivity = newSensitivity;
	}

	SetSpeed(newSpeed: number){
		this._moveSpeed = newSpeed;
	}

	Toggle(bool: boolean){
		if (bool == false) 
			this.removeMoveEvents();
		else
			this.addMoveEvents();
	}

	/*events*/
	private addEvents() {
		if (this._havePointerLock === false)
			console.error("Your browser doesn't support Pointer Lock API");
		else {
			this._element.addEventListener('click', this.requestPointerLock, false);
			document.addEventListener('mozpointerlockchange', this.pointerLockChange, false);
			document.addEventListener('pointerlockchange', this.pointerLockChange, false);
		}
	}

	private addMoveEvents() {
		this._element.addEventListener('mousedown', this.onMouseDown, false);
		this._element.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('keydown', this.onKeyDown, false);
		document.addEventListener('keyup', this.onKeyUp, false);
	}

	private removeMoveEvents() {
		this._element.removeEventListener('mousedown', this.onMouseDown, false);
		this._element.removeEventListener('mousemove', this.onMouseMove, false);
	}

	private onMouseMove = (event) => {
		let movementX = event.movementX || event.mozMovementX || event.movementX || 0;
		let movementY = event.movementY || event.mozMovementY || event.movementY || 0;

		this._yawObject.rotation.y -= movementX * this._sensitivity;
		this._pitchObject.rotation.x -= movementY * this._sensitivity;
		this._pitchObject.rotation.x = Math.max(- this._PI_2, Math.min(this._PI_2, this._pitchObject.rotation.x));
	}

	private onMouseDown = (event) => {
		let btmNum = event.which;
		if (btmNum == this._orangePortalButtonNum || btmNum == this._bluePortalButtonNum)//LMB or RMB
			this.fire(btmNum);
	}

	private onKeyDown = (event) => {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				this._moveForward = true;
				this._velocity.z = -this._moveSpeed;
				break;
			case 37: // left
			case 65: // a
				this._moveLeft = true;
				this._velocity.x = -this._moveSpeed;
				break;
			case 40: // down
			case 83: // s
				this._moveBackward = true;
				this._velocity.z = this._moveSpeed;
				break;
			case 39: // right
			case 68: // d
				this._moveRight = true;
				this._velocity.x = this._moveSpeed;
				break;
			case 32: // space
				//if (canJump === true) velocity.y += 350;
				//canJump = false;
				break;
		}
	}

	private onKeyUp = (event) => {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				this._moveForward = false;
				this._velocity.z = 0;
				break;
			case 37: // left
			case 65: // a
				this._moveLeft = false;
				this._velocity.x = 0;
				break;
			case 40: // down
			case 83: // s
				this._moveBackward = false;
				this._velocity.z = 0;
				break;
			case 39: // right
			case 68: // d
				this._moveRight = false;
				this._velocity.x = 0;
				break;
		}
	};

	private requestPointerLock = (event) => {
		this._element.requestPointerLock = this._element.requestPointerLock || 
		                                   this._element.mozRequestPointerLock || 
		                                   this._element.webkitRequestPointerLock;
		if (/Firefox/i.test(navigator.userAgent)) 
			this.fullscreen();                                 
		else 
			this._element.requestPointerLock();
	}

	private pointerLockChange = (event) => {
		if (document.pointerLockElement === this._element || document.mozPointerLockElement === this._element)
			this.Toggle(true);
		else
			this.Toggle(false);
	}

	private fullscreen(){
		var element = this._element;
		var fullscreenchange = function(event) {
			if (document.fullscreenElement === element || 
				document.mozFullScreenElement === element) {
				document.removeEventListener('fullscreenchange', fullscreenchange);
				document.removeEventListener('mozfullscreenchange', fullscreenchange);
				element.requestPointerLock();
			}
		};
		document.addEventListener('fullscreenchange', fullscreenchange, false);
		document.addEventListener('mozfullscreenchange', fullscreenchange, false);
		this._element.requestFullscreen = this._element.requestFullscreen || this._element.mozRequestFullscreen || this._element.mozRequestFullScreen || 
		this._element.webkitRequestFullscreen;
		this._element.requestFullscreen();
		this._loader.Animator.ResizeWindow();
	}

	/*movement*/
	private checkCollision(velocity: THREE.Vector3): boolean{
		let nextMove: THREE.Vector3 = new THREE.Vector3();
		let nVelocity: THREE.Vector3 = new THREE.Vector3();
		let v1: THREE.Vector3 = new THREE.Vector3();

		nVelocity.copy(velocity).normalize();

		v1.copy(nVelocity).applyQuaternion(this._yawObject.quaternion);
		nextMove.add(v1);
		nextMove.add(this._yawObject.position);

		this._moveRaycaster.set(nextMove, new THREE.Vector3(0, -1, 0));
		let intersects = this._moveRaycaster.intersectObjects(this._level.Rooms);

		if (intersects[0] !== undefined) 
			return true;
		else 
			return false;
	}

	private move(){
		if (this.checkCollision(this._velocity) === false) return;
		this._yawObject.translateZ(this._velocity.z); //forward/backward
		this._yawObject.translateX(this._velocity.x); //left/right
	}

	private aim(){
		this._aimRaycaster.setFromCamera(this._crossHair, this.Camera);
		let intersects = this._aimRaycaster.intersectObjects(this._level.Rooms);
		let int = intersects[0];
		if (int) {
			let n = int.face.normal;
			let posObj = new THREE.Mesh();
			posObj.position.set(0, 0, 0);
			posObj.lookAt(new THREE.Vector3(n.x, -n.z, n.y));
			posObj.position.copy(int.point);
			return posObj;
		}
		else return null;
	}

	fire(btnNum: number){
		let posObj = this.aim();
		if (!posObj) return;

		let color: THREE.Color;
		if (btnNum == this._orangePortalButtonNum){
			color = new THREE.Color(0xff9900);
			if (this._orangePortal) this._loader.Remove(this._orangePortal.Mesh);
		}

		if (btnNum == this._bluePortalButtonNum){
			color = new THREE.Color(0x0000ff);
			if (this._bluePortal) this._loader.Remove(this._bluePortal.Mesh);
		} 

		let portal = new Portal(this._loader, color);
		portal.Mesh.position.copy(posObj.position);
		portal.Mesh.rotation.copy(posObj.rotation);
		portal.Mesh.translateZ(.01);
		portal.Camera.position.copy(posObj.position);
		portal.Camera.rotation.copy(posObj.rotation);
		portal.Camera.rotateY(Math.PI);

		if (btnNum == this._orangePortalButtonNum){
			this._orangePortal = portal;
			if (this._bluePortal) this.openBothApertures();
		} 
		
		if (btnNum == this._bluePortalButtonNum){
			this._bluePortal = portal;
			if (this._orangePortal) this.openBothApertures();
		}   
	}

	private openBothApertures(){
		this._bluePortal.OpenAperture(this._orangePortal.Camera);
		this._orangePortal.OpenAperture(this._bluePortal.Camera);
	}


	private makeMesh() {
		var geometry = new THREE.BoxGeometry(1, 3, 1);
		var material = new THREE.MeshBasicMaterial();
		var cube = new THREE.Mesh(geometry, material);
		return cube;
	}	

}

export = FirstPersonController;

