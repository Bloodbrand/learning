define(["require", "exports", "three", "Updater", "Portal"], function (require, exports, THREE, Updater, Portal) {
    var FirstPersonController = (function () {
        function FirstPersonController(Camera, container, level, loader) {
            var _this = this;
            this.Camera = Camera;
            this._PI_2 = Math.PI / 2;
            this._sensitivity = 0.002;
            this._moveSpeed = 0.2;
            this._height = 2;
            this._orangePortalButtonNum = 3;
            this._bluePortalButtonNum = 1;
            this.onMouseMove = function (event) {
                var movementX = event.movementX || event.mozMovementX || event.movementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.movementY || 0;
                _this._yawObject.rotation.y -= movementX * _this._sensitivity;
                _this._pitchObject.rotation.x -= movementY * _this._sensitivity;
                _this._pitchObject.rotation.x = Math.max(-_this._PI_2, Math.min(_this._PI_2, _this._pitchObject.rotation.x));
            };
            this.onMouseDown = function (event) {
                var btmNum = event.which;
                if (btmNum == _this._orangePortalButtonNum || btmNum == _this._bluePortalButtonNum)
                    _this.fire(btmNum);
            };
            this.onKeyDown = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        _this._moveForward = true;
                        _this._velocity.z = -_this._moveSpeed;
                        break;
                    case 37:
                    case 65:
                        _this._moveLeft = true;
                        _this._velocity.x = -_this._moveSpeed;
                        break;
                    case 40:
                    case 83:
                        _this._moveBackward = true;
                        _this._velocity.z = _this._moveSpeed;
                        break;
                    case 39:
                    case 68:
                        _this._moveRight = true;
                        _this._velocity.x = _this._moveSpeed;
                        break;
                    case 32:
                        break;
                }
            };
            this.onKeyUp = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        _this._moveForward = false;
                        _this._velocity.z = 0;
                        break;
                    case 37:
                    case 65:
                        _this._moveLeft = false;
                        _this._velocity.x = 0;
                        break;
                    case 40:
                    case 83:
                        _this._moveBackward = false;
                        _this._velocity.z = 0;
                        break;
                    case 39:
                    case 68:
                        _this._moveRight = false;
                        _this._velocity.x = 0;
                        break;
                }
            };
            this.requestPointerLock = function (event) {
                _this._element.requestPointerLock = _this._element.requestPointerLock ||
                    _this._element.mozRequestPointerLock ||
                    _this._element.webkitRequestPointerLock;
                if (/Firefox/i.test(navigator.userAgent))
                    _this.fullscreen();
                else
                    _this._element.requestPointerLock();
            };
            this.pointerLockChange = function (event) {
                if (document.pointerLockElement === _this._element || document.mozPointerLockElement === _this._element)
                    _this.Toggle(true);
                else
                    _this.Toggle(false);
            };
            this._level = level;
            this._loader = loader;
            this._element = container;
            this._velocity = new THREE.Vector3();
            this._moveRaycaster = new THREE.Raycaster();
            this._aimRaycaster = new THREE.Raycaster();
            this._testCube = this.makeMesh();
            this._crossHair = new THREE.Vector2(((window.innerWidth / 2) / window.innerWidth) * 2 - 1, -((window.innerHeight / 2) / window.innerHeight) * 2 + 1);
            this._havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
            this._pitchObject = new THREE.Mesh();
            Camera.rotation.set(0, 0, 0);
            this._pitchObject.add(Camera);
            this._yawObject = new THREE.Mesh();
            this._yawObject.add(this._pitchObject);
            this._yawObject.add(this._testCube);
            this.addEvents();
            Updater.Add(this);
        }
        FirstPersonController.prototype.Update = function () {
            this.move();
        };
        FirstPersonController.prototype.GetObject = function () {
            return this._yawObject;
        };
        FirstPersonController.prototype.GetHeight = function () {
            return this._height;
        };
        FirstPersonController.prototype.SetSensitivity = function (newSensitivity) {
            this._sensitivity = newSensitivity;
        };
        FirstPersonController.prototype.SetSpeed = function (newSpeed) {
            this._moveSpeed = newSpeed;
        };
        FirstPersonController.prototype.Toggle = function (bool) {
            if (bool == false)
                this.removeMoveEvents();
            else
                this.addMoveEvents();
        };
        FirstPersonController.prototype.addEvents = function () {
            if (this._havePointerLock === false)
                console.error("Your browser doesn't support Pointer Lock API");
            else {
                this._element.addEventListener('click', this.requestPointerLock, false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange, false);
                document.addEventListener('pointerlockchange', this.pointerLockChange, false);
            }
        };
        FirstPersonController.prototype.addMoveEvents = function () {
            this._element.addEventListener('mousedown', this.onMouseDown, false);
            this._element.addEventListener('mousemove', this.onMouseMove, false);
            document.addEventListener('keydown', this.onKeyDown, false);
            document.addEventListener('keyup', this.onKeyUp, false);
        };
        FirstPersonController.prototype.removeMoveEvents = function () {
            this._element.removeEventListener('mousedown', this.onMouseDown, false);
            this._element.removeEventListener('mousemove', this.onMouseMove, false);
        };
        FirstPersonController.prototype.fullscreen = function () {
            var element = this._element;
            var fullscreenchange = function (event) {
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
        };
        FirstPersonController.prototype.checkCollision = function (velocity) {
            var nextMove = new THREE.Vector3();
            var nVelocity = new THREE.Vector3();
            var v1 = new THREE.Vector3();
            nVelocity.copy(velocity).normalize();
            v1.copy(nVelocity).applyQuaternion(this._yawObject.quaternion);
            nextMove.add(v1);
            nextMove.add(this._yawObject.position);
            this._moveRaycaster.set(nextMove, new THREE.Vector3(0, -1, 0));
            var intersects = this._moveRaycaster.intersectObjects(this._level.Rooms);
            if (intersects[0] !== undefined)
                return true;
            else
                return false;
        };
        FirstPersonController.prototype.move = function () {
            if (this.checkCollision(this._velocity) === false)
                return;
            this._yawObject.translateZ(this._velocity.z);
            this._yawObject.translateX(this._velocity.x);
        };
        FirstPersonController.prototype.aim = function () {
            this._aimRaycaster.setFromCamera(this._crossHair, this.Camera);
            var intersects = this._aimRaycaster.intersectObjects(this._level.Rooms);
            var int = intersects[0];
            if (int) {
                var n = int.face.normal;
                var posObj = new THREE.Mesh();
                posObj.position.set(0, 0, 0);
                posObj.lookAt(new THREE.Vector3(n.x, -n.z, n.y));
                posObj.position.copy(int.point);
                return posObj;
            }
            else
                return null;
        };
        FirstPersonController.prototype.fire = function (btnNum) {
            var posObj = this.aim();
            if (!posObj)
                return;
            var color;
            if (btnNum == this._orangePortalButtonNum) {
                color = new THREE.Color(0xff9900);
                if (this._orangePortal)
                    this._loader.Remove(this._orangePortal.Mesh);
            }
            if (btnNum == this._bluePortalButtonNum) {
                color = new THREE.Color(0x0000ff);
                if (this._bluePortal)
                    this._loader.Remove(this._bluePortal.Mesh);
            }
            var portal = new Portal(this._loader, color);
            portal.Mesh.position.copy(posObj.position);
            portal.Mesh.rotation.copy(posObj.rotation);
            portal.Mesh.translateZ(.01);
            portal.Camera.position.copy(posObj.position);
            portal.Camera.rotation.copy(posObj.rotation);
            portal.Camera.rotateY(Math.PI);
            if (btnNum == this._orangePortalButtonNum) {
                this._orangePortal = portal;
                if (this._bluePortal)
                    this.openBothApertures();
            }
            if (btnNum == this._bluePortalButtonNum) {
                this._bluePortal = portal;
                if (this._orangePortal)
                    this.openBothApertures();
            }
        };
        FirstPersonController.prototype.openBothApertures = function () {
            this._bluePortal.OpenAperture(this._orangePortal.Camera);
            this._orangePortal.OpenAperture(this._bluePortal.Camera);
        };
        FirstPersonController.prototype.makeMesh = function () {
            var geometry = new THREE.BoxGeometry(1, 3, 1);
            var material = new THREE.MeshBasicMaterial();
            var cube = new THREE.Mesh(geometry, material);
            return cube;
        };
        return FirstPersonController;
    })();
    return FirstPersonController;
});
