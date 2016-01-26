define(["require", "exports", "Updater"], function (require, exports, Updater) {
    var Animator = (function () {
        function Animator(Loader, Camera, Renderer) {
            var _this = this;
            this.Loader = Loader;
            this.Camera = Camera;
            this.Renderer = Renderer;
            this.then = Date.now();
            this.now = undefined;
            this.delta = undefined;
            this.frameID = undefined;
            this.fps = 30;
            this.interval = 1000 / this.fps;
            this.ResizeWindow = function () {
                var renderSize = {
                    width: _this.Renderer.container.offsetWidth,
                    height: _this.Renderer.container.offsetHeight
                };
                _this.Renderer.setSize(renderSize.width, renderSize.height);
                _this.Camera.aspect = renderSize.width / renderSize.height;
                _this.Camera.updateProjectionMatrix();
            };
            this.Start();
            window.addEventListener('resize', this.ResizeWindow, false);
            console.info("new animator created");
        }
        Animator.prototype.Start = function () {
            this.render();
        };
        Animator.prototype.render = function () {
            var _this = this;
            this.frameID = requestAnimationFrame(function () { return _this.render(); });
            this.now = Date.now();
            this.delta = this.now - this.then;
            if (this.delta < this.interval)
                return;
            this.then = this.now - (this.delta % this.interval);
            Updater.Update();
            this.Renderer.render(this.Loader.Scene, this.Camera);
        };
        return Animator;
    })();
    return Animator;
});

require.config({
    paths: {
        "three": "../../bower_components/three.js/three"
    }
});
require(["Main"], function (Main) {
    Main.Start();
});

var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () { log(this.greeting); };
    return Greeter;
})();
var BankAccount = (function () {
    function BankAccount() {
    }
    BankAccount.getAccountNumber = function () {
        return BankAccount.accountNumber;
    };
    BankAccount.accountNumber = 12341234;
    return BankAccount;
})();
var Account_3 = (function () {
    function Account_3() {
        this._balance = 0;
    }
    Object.defineProperty(Account_3.prototype, "balance", {
        get: function () { return this._balance; },
        set: function (val) {
            if (val <= 100)
                this._balance = val;
        },
        enumerable: true,
        configurable: true
    });
    return Account_3;
})();
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "STATIC_NUMBER", {
        get: function () { return 1234123412341234; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "STATIC_STRING", {
        get: function () { return "test_test_test_test"; },
        enumerable: true,
        configurable: true
    });
    ;
    return Constants;
})();
var Account_2 = (function () {
    function Account_2() {
    }
    Object.defineProperty(Account_2.prototype, "accountInfo", {
        get: function () {
            return {
                staticNumber: Constants.STATIC_NUMBER,
                staticString: Constants.STATIC_STRING
            };
        },
        enumerable: true,
        configurable: true
    });
    return Account_2;
})();
var Account = function () {
    var balance = 100;
    var getBalance = function () {
        log(balance.toString());
    };
    return {
        getBalance: getBalance
    };
}();
var ConstructorTest = (function () {
    function ConstructorTest(msg) {
        this.message = msg;
    }
    ConstructorTest.prototype.sayMessage = function () {
        log(this.message);
    };
    return ConstructorTest;
})();

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

define(["require", "exports"], function (require, exports) {
    var Events = (function () {
        function Events() {
        }
        return Events;
    })();
    return Events;
});

function log(msg) {
    var para = document.createElement("h2");
    var content = document.createTextNode(msg);
    para.appendChild(content);
    document.getElementById('text').appendChild(para);
}
var add = function (x, y) {
    return x + y;
};
var $ = function (id) { return document.getElementById(id); };
var Calc = (function () {
    function Calc() {
    }
    Calc.prototype.add = function (x, y) { return x + y; };
    return Calc;
})();
function optionalParam(mandatory, optional) {
    log(mandatory + " " + optional);
}
function defaultParam(mandatory, _default) {
    if (_default === void 0) { _default = "Milici"; }
    log(mandatory + " " + _default);
}
function restParams(mandatory) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    log(mandatory + " " + rest.join(" "));
}

var ListOfNumbers = (function () {
    function ListOfNumbers() {
        this._items = [];
    }
    ListOfNumbers.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOfNumbers.prototype.getItems = function () {
        return this._items;
    };
    return ListOfNumbers;
})();
var ListOfStrings = (function () {
    function ListOfStrings() {
        this._items = [];
    }
    ListOfStrings.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOfStrings.prototype.getItems = function () {
        return this._items;
    };
    return ListOfStrings;
})();
function test2(a, b) {
    console.log(a + b);
}
test2("33", false);
function processData(data) {
    console.log(typeof data);
}
function identity(arg) {
    return arg;
}
var ListOf = (function () {
    function ListOf() {
        this._items = [];
    }
    ListOf.prototype.add = function (item) {
        this._items.push(item);
    };
    ListOf.prototype.getItems = function () {
        return this._items;
    };
    return ListOf;
})();
var BankingAccount = (function () {
    function BankingAccount() {
    }
    Object.defineProperty(BankingAccount.prototype, "accountInfo", {
        get: function () {
            return {
                routingNum: "100",
                bankNum: 2001
            };
        },
        enumerable: true,
        configurable: true
    });
    return BankingAccount;
})();

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseClass = (function () {
    function BaseClass(title) {
        this._title = title;
    }
    return BaseClass;
})();
var ExtendsClass = (function (_super) {
    __extends(ExtendsClass, _super);
    function ExtendsClass(title) {
        _super.call(this, title);
    }
    return ExtendsClass;
})(BaseClass);
var Plant = (function () {
    function Plant() {
    }
    Plant.prototype.getName = function (nameOrId) {
        if (typeof nameOrId == "string")
            return "The name of this plane is: " + nameOrId;
        else
            return nameOrId;
    };
    return Plant;
})();
var PlantInfo = (function (_super) {
    __extends(PlantInfo, _super);
    function PlantInfo() {
        _super.call(this);
    }
    PlantInfo.prototype.getName = function (nameOrId) {
        var studentID = _super.prototype.getName.call(this, nameOrId);
        return studentID;
    };
    return PlantInfo;
})(Plant);
var Plant_2 = (function () {
    function Plant_2(plantName) {
        this._plant = plantName;
    }
    Plant_2.prototype.getName = function () {
        return "The name of this plane is: " + this._plant;
    };
    return Plant_2;
})();
var PlantInfo_2 = (function (_super) {
    __extends(PlantInfo_2, _super);
    function PlantInfo_2(plantName) {
        _super.call(this, plantName);
        this._plant = plantName;
    }
    PlantInfo_2.prototype.getName = function () {
        return "The name of this plant is: " + this._plant + ". The plant ID is 1234";
    };
    return PlantInfo_2;
})(Plant_2);

var OptionalPropClass = (function () {
    function OptionalPropClass() {
        this.mandatory = "hello";
    }
    return OptionalPropClass;
})();
var Greeter_2 = (function () {
    function Greeter_2() {
    }
    Greeter_2.prototype.greet = function (msg) {
        log(msg.greeting);
    };
    return Greeter_2;
})();
var Message = (function () {
    function Message() {
        this.greeting = "hello!";
    }
    return Message;
})();
var CheckingAccount = (function () {
    function CheckingAccount(amount) {
        this.balance = amount;
    }
    CheckingAccount.prototype.deposit = function () { };
    CheckingAccount.prototype.withdrawl = function () { return 0; };
    return CheckingAccount;
})();
var mySearch;
mySearch = function (src) {
    return true;
};

define(["require", "exports", "three", "Vector", "Shaders"], function (require, exports, THREE, Vector, Shaders) {
    var Level = (function () {
        function Level(SpawnPoint) {
            this.SpawnPoint = SpawnPoint;
            this._floorThickness = 0.1;
            this._wallHeight = 5;
            this.Rooms = [];
            this.Doodads = [];
        }
        Level.prototype.AddPoints = function (points) {
            this.makeRoom(points);
        };
        Level.prototype.makeRoom = function (points) {
            var roomShape = new THREE.Shape();
            for (var i = 0; i < points.length; i++) {
                var curPoint = points[i];
                if (i == 0)
                    roomShape.moveTo(curPoint.x, curPoint.y);
                else
                    roomShape.lineTo(curPoint.x, curPoint.y);
                this.findRoomBisectors(i, points);
            }
            this.extrude(roomShape, this._floorThickness, "floor");
            this.extrude(roomShape, this._floorThickness, "ceiling", this._wallHeight);
        };
        Level.prototype.findRoomBisectors = function (index, points) {
            var first = points[index];
            var second = points[index + 1];
            var third = points[index + 2];
            if (third === undefined)
                third = points[0];
            if (second === undefined) {
                second = points[0];
                third = points[1];
            }
            var wallShape = new THREE.Shape();
            wallShape.moveTo(first.x, first.y);
            wallShape.lineTo(second.x, second.y);
            var v1 = Vector.Subtract(second, first);
            var v2 = Vector.Subtract(second, third);
            var bisec = Vector.Add(Vector.Bisector(v1, v2), second);
            if (Vector.PointInPoly(bisec, points)) {
                var negativeBisec = Vector.Add(Vector.Negative(Vector.Bisector(v1, v2)), second);
                wallShape.lineTo(negativeBisec.x, negativeBisec.y);
            }
            else
                wallShape.lineTo(bisec.x, bisec.y);
            this.extrude(wallShape, this._wallHeight, "wall");
        };
        Level.prototype.extrude = function (shape, amt, name, yOffset) {
            var extrusionSettings = {
                amount: amt,
                bevelEnabled: false
            };
            var geom = new THREE.ExtrudeGeometry(shape, extrusionSettings);
            var transMat = new THREE.Matrix4().makeTranslation(0, 0, -amt);
            geom.applyMatrix(transMat);
            this.addRoom(geom, name, yOffset);
        };
        Level.prototype.addRoom = function (geom, name, yOffset) {
            var mat = Shaders.Materials.Get(name);
            var mesh = new THREE.Mesh(geom, mat);
            mesh.geometry.computeFaceNormals();
            mesh.geometry.computeVertexNormals();
            mesh.rotation.x += Math.PI / 2;
            if (yOffset !== undefined)
                mesh.position.setY(yOffset);
            this.Rooms.push(mesh);
        };
        Level.prototype.addTestCube = function (pos) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            var cube = new THREE.Mesh(geometry, material);
            cube.position.set(pos.x, 0, pos.y);
            this.Doodads.push(cube);
        };
        return Level;
    })();
    return Level;
});

define(["require", "exports", "Animator", "Controller"], function (require, exports, Animator, FirstPersonController) {
    var Loader = (function () {
        function Loader(Scene, Camera, Renderer) {
            this.Scene = Scene;
            this.Camera = Camera;
            this.Renderer = Renderer;
            this.Animator = new Animator(this, Camera, Renderer);
            console.info("new loader created");
        }
        Loader.prototype.LoadLevel = function (level) {
            var allObjs = level.Rooms.concat(level.Doodads);
            for (var i = 0; i < allObjs.length; i++)
                this.Add(allObjs[i]);
            this.Controller = new FirstPersonController(this.Camera, this.Animator.Renderer.container, level, this);
            this.Controller.GetObject().position.set(level.SpawnPoint.x, this.Controller.GetHeight(), level.SpawnPoint.y);
            this.Add(this.Controller.GetObject());
        };
        Loader.prototype.Add = function (obj) {
            this.Scene.add(obj);
        };
        Loader.prototype.Remove = function (obj) {
            obj.geometry.dispose();
            console.log(obj.material);
            this.Scene.remove(obj);
        };
        return Loader;
    })();
    return Loader;
});

define(["require", "exports", "three", "Loader", "Level"], function (require, exports, THREE, Loader, Level) {
    var Main = (function () {
        function Main() {
        }
        Main.addRenderer = function (width, height, container) {
            var renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);
            renderer.container = container;
            return renderer;
        };
        Main.addCamera = function (width, height) {
            return new THREE.PerspectiveCamera(this._fov, width / height, this._camNear, this._camFar);
        };
        Main.addLight = function () {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(-1, 1, 0);
            var ambientalLight = new THREE.AmbientLight(0x333333);
            directionalLight.add(ambientalLight);
            return directionalLight;
        };
        Main.Start = function (containerID) {
            if (containerID === void 0) { containerID = "webGL"; }
            var container = document.getElementById(containerID);
            if (container === null)
                return console.error("webGL container not found");
            var width = container.offsetWidth;
            var height = container.offsetHeight;
            var loader = new Loader(new THREE.Scene(), this.addCamera(width, height), this.addRenderer(width, height, container));
            loader.Add(this.addLight());
            this.loadTestLevel(loader);
        };
        Main.LoadScene = function (name) {
        };
        Main.loadTestLevel = function (loader) {
            var spawnPoint = { x: 0, y: -10.5 };
            var lvl = new Level(spawnPoint);
            var points = [
                { x: -10, y: 10 },
                { x: -10, y: -10 },
                { x: -5, y: -15 },
                { x: -5, y: -35 },
                { x: 5, y: -35 },
                { x: 5, y: -15 },
                { x: 10, y: -10 },
                { x: 10, y: 10 },
                { x: 5, y: 10 },
                { x: 5, y: -5 },
                { x: -5, y: -5 },
                { x: -5, y: 10 }
            ];
            lvl.AddPoints(points);
            loader.LoadLevel(lvl);
        };
        Main._fov = 45;
        Main._camNear = 0.1;
        Main._camFar = 1000;
        return Main;
    })();
    return Main;
});

define(["require", "exports", "Shaders"], function (require, exports, Shaders) {
    var Portal = (function () {
        function Portal(loader, color) {
            this._loader = loader;
            this._isApertureOpen = false;
            this._width = 3;
            this._height = 5;
            var rendererSize = loader.Renderer.getSize();
            this._renderTarget = new THREE.WebGLRenderTarget(rendererSize.width, rendererSize.height, { format: THREE.RGBAFormat });
            this.Camera = new THREE.PerspectiveCamera(loader.Camera.fov, loader.Camera.aspect, loader.Camera.near, loader.Camera.far);
            this.Mesh = this.makeMesh(this._renderTarget, loader, this.Camera, color);
            this._loader.Add(this.Camera);
            this._loader.Add(this.Mesh);
        }
        Portal.prototype.OpenAperture = function (camera) {
            this._material.SetCamera(camera);
            if (!this._isApertureOpen)
                this._material.OpenAperture();
            this._isApertureOpen = true;
        };
        Portal.prototype.makeMesh = function (map, loader, camera, color) {
            var geometry = new THREE.PlaneGeometry(this._width, this._height, .001);
            this._material = new Shaders.PortalShader(map, loader, camera, color);
            var portalPlane = new THREE.Mesh(geometry, this._material);
            return portalPlane;
        };
        return Portal;
    })();
    return Portal;
});

var MainClass = (function () {
    function MainClass() {
    }
    MainClass.StartScene = function (i) {
        MainClass.Scenes[i].Start();
    };
    MainClass.Scenes = [];
    return MainClass;
})();
var Scene = (function () {
    function Scene(scene, loader) {
        this._onStartFunctions = [];
        this._assets = [];
        this._scene = undefined;
        this._loader = undefined;
        this._scene = scene;
        this._loader = loader;
        MainClass.Scenes.push(this);
    }
    Object.defineProperty(Scene.prototype, "OnStartFunctions", {
        get: function () { return this._onStartFunctions; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Scene.prototype, "Assets", {
        get: function () { return this._assets; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "Scene", {
        get: function () { return this._scene; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "Loader", {
        get: function () { return this._loader; },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.Start = function () {
        for (var i = 0; i < this._onStartFunctions.length; i++)
            this._onStartFunctions[i](this._scene, this._loader);
        for (var i = 0; i < this._assets.length; i++)
            console.log(this._loader + " loading " + this._assets[i]);
    };
    Scene.prototype.OnStart = function (fun) {
        this._onStartFunctions.push(fun);
    };
    Scene.prototype.AddAsset = function (asset) { this._assets.push(asset); };
    return Scene;
})();

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Updater", "three"], function (require, exports, Updater, THREE) {
    var Shaders;
    (function (Shaders) {
        var Materials = (function () {
            function Materials() {
            }
            Materials.Get = function (name) {
                switch (name) {
                    case "floor":
                    case "ceiling":
                        return new Shaders.FloorShader(this._dataTexture);
                        break;
                    case "wall":
                        return new Shaders.WallShader(this._dataTexture);
                        break;
                    case "portal":
                        break;
                    default:
                        return new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                }
            };
            Materials.makeDataTexture = function () {
                var noiseSize = 8;
                var size = noiseSize * noiseSize;
                var data = new Uint8Array(4 * size);
                for (var i = 0; i < size * 4; i++) {
                    data[i] = Math.random() * 255 | 0;
                }
                var dt = new THREE.DataTexture(data, noiseSize, noiseSize, THREE.RGBAFormat);
                dt.wrapS = THREE.RepeatWrapping;
                dt.wrapT = THREE.RepeatWrapping;
                dt.needsUpdate = true;
                return dt;
            };
            Materials._dataTexture = Materials.makeDataTexture();
            return Materials;
        })();
        Shaders.Materials = Materials;
        var FloorShader = (function (_super) {
            __extends(FloorShader, _super);
            function FloorShader(map) {
                this._set = {
                    uniforms: {
                        map: { type: "t", value: map },
                        gridSize: { type: "f", value: 5 },
                        time: { type: "f", value: 0 },
                        timeFlow: { type: "f", value: 0.01 }
                    },
                    vertexShader: this.vertShader(),
                    fragmentShader: this.fragShader()
                };
                _super.call(this, this._set);
                Updater.Add(this);
            }
            FloorShader.prototype.Update = function () {
            };
            FloorShader.prototype.vertShader = function () {
                return [
                    "varying vec2 vUv;",
                    "void main(){",
                    "vUv = uv;",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                    "}"
                ].join('\n');
            };
            FloorShader.prototype.fragShader = function () {
                return [
                    "#define BROWN vec4(0.647059, 0.164706, 0.164706, 1.)\n",
                    "#define GREY vec4(0.362745, 0.362745, 0.362745, 1.)\n",
                    "uniform sampler2D map;",
                    "uniform float gridSize;",
                    "uniform float time;",
                    "varying vec2 vUv;",
                    "void main(){",
                    "vec4 mapColor = texture2D( map, vUv );",
                    "vec4 grid = vec4(sin(vUv.y * gridSize + time) * sin(vUv.x * gridSize + time));",
                    "vec4 invGrid = vec4(-sin(vUv.y * gridSize + time) * sin(vUv.x * gridSize + time));",
                    "grid = step(0., grid);",
                    "if(grid.g <= 0.) grid += smoothstep(0., 1., invGrid.x) * BROWN;",
                    "else grid = GREY;",
                    "gl_FragColor = grid;",
                    "}"
                ].join('\n');
            };
            return FloorShader;
        })(THREE.ShaderMaterial);
        Shaders.FloorShader = FloorShader;
        var WallShader = (function (_super) {
            __extends(WallShader, _super);
            function WallShader(map) {
                this._set = {
                    uniforms: {
                        map: { type: "t", value: map },
                        gridSize: { type: "f", value: 5 },
                        time: { type: "f", value: 0 },
                        timeFlow: { type: "f", value: 0.05 }
                    },
                    vertexShader: this.vertShader(),
                    fragmentShader: this.fragShader()
                };
                _super.call(this, this._set);
                Updater.Add(this);
            }
            WallShader.prototype.Update = function () {
                this._set.uniforms.time.value += this._set.uniforms.timeFlow.value;
            };
            WallShader.prototype.vertShader = function () {
                return [
                    "varying vec2 vUv;",
                    "void main(){",
                    "vUv = uv;",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                    "}"
                ].join('\n');
            };
            WallShader.prototype.fragShader = function () {
                return [
                    "#define BROWN vec4(0.647059, 0.164706, 0.164706, 1.)\n",
                    "#define GREY vec4(0.362745, 0.362745, 0.362745, 1.)\n",
                    "#define BLACK vec4(0., 0., 0., 1.)\n",
                    "uniform sampler2D map;",
                    "uniform float gridSize;",
                    "uniform float time;",
                    "varying vec2 vUv;",
                    "void main(){",
                    "float stripeY = sin(vUv.y * gridSize);",
                    "float stripeX = sin(vUv.x * gridSize);",
                    "vec4 grid = GREY;",
                    "if(stripeY <= 0.) {",
                    "if(stripeX > 0.99) grid = BLACK;",
                    "}",
                    "else{",
                    "if(stripeX < -0.99) grid = BLACK;",
                    "}",
                    "if(stripeY > -0.1 && stripeY < 0.) grid = BLACK;",
                    "gl_FragColor = grid;",
                    "}"
                ].join('\n');
            };
            return WallShader;
        })(THREE.ShaderMaterial);
        Shaders.WallShader = WallShader;
        var PortalOpener = (function () {
            function PortalOpener(shader, value, max, increment) {
                this._shader = shader;
                this._value = value;
                this._max = max;
                this._increment = increment;
                Updater.Add(this);
            }
            PortalOpener.prototype.Update = function () {
                if (this._shader._set.uniforms[this._value].value >= this._shader[this._max]) {
                    this._shader._set.uniforms[this._value].value = this._shader[this._max];
                    Updater.Remove(this);
                }
                this._shader._set.uniforms[this._value].value += this._increment;
            };
            return PortalOpener;
        })();
        var PortalShader = (function (_super) {
            __extends(PortalShader, _super);
            function PortalShader(map, loader, camera, color) {
                this._loader = loader;
                this._camera = camera;
                this._timeFlow = 0.005;
                this._apertureTimeFlow = 0.1;
                this._maxSize = 0.4;
                this._maxAperture = 0.35;
                this._set = {
                    uniforms: {
                        map: { type: "t", value: map },
                        gridSize: { type: "f", value: 5 },
                        time: { type: "f", value: 0 },
                        color: { type: "c", value: color },
                        aperture: { type: "f", value: 0 },
                        size: { type: "f", value: 0 }
                    },
                    vertexShader: this.vertShader(),
                    fragmentShader: this.fragShader()
                };
                _super.call(this, this._set);
                this.openPortal();
                Updater.Add(this);
            }
            PortalShader.prototype.Update = function () {
                this._set.uniforms.time.value += this._timeFlow;
                this._loader.Renderer.render(this._loader.Scene, this._camera, this.uniforms.map.value);
                this._loader.Renderer.render(this._loader.Scene, this._camera, this.uniforms.map.value);
            };
            PortalShader.prototype.SetCamera = function (camera) {
                this._camera = camera;
            };
            PortalShader.prototype.openPortal = function () {
                var opener = new PortalOpener(this, "size", "_maxSize", this._apertureTimeFlow);
            };
            PortalShader.prototype.OpenAperture = function () {
                var opener = new PortalOpener(this, "aperture", "_maxAperture", this._apertureTimeFlow);
            };
            PortalShader.prototype.vertShader = function () {
                return [
                    "varying vec2 vUv;",
                    "void main(){",
                    "vUv = uv;",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                    "}"
                ].join('\n');
            };
            PortalShader.prototype.fragShader = function () {
                return [
                    "#define BROWN vec4(0.647059, 0.164706, 0.164706, 1.)\n",
                    "#define GREY vec4(0.362745, 0.362745, 0.362745, 1.)\n",
                    "#define BLACK vec4(0., 0., 0., 1.)\n",
                    "uniform sampler2D map;",
                    "uniform vec3 color;",
                    "uniform float time;",
                    "uniform float aperture;",
                    "uniform float size;",
                    "varying vec2 vUv;",
                    "void main(){",
                    "vec4 mapColor = texture2D( map, vUv );",
                    "vec2 mid = vec2(.5, .5);",
                    "vec2 p = vUv - mid;",
                    "float radius = length(p);",
                    "float angle = abs(atan(p.y, p.x));",
                    "if(radius - 1.45 > sin(abs(angle + time) * 32.)) discard;",
                    "if(radius > size) discard;",
                    "if(radius > aperture && radius < 0.5) {",
                    "mapColor = vec4(color, 1.);",
                    "}",
                    "gl_FragColor = mapColor;",
                    "}"
                ].join('\n');
            };
            return PortalShader;
        })(THREE.ShaderMaterial);
        Shaders.PortalShader = PortalShader;
    })(Shaders || (Shaders = {}));
    return Shaders;
});

define(["require", "exports"], function (require, exports) {
    var testPad = (function () {
        function testPad() {
        }
        return testPad;
    })();
    exports.testPad = testPad;
});

///<reference path="three.d.ts"/>
var ParamsTest = (function () {
    function ParamsTest() {
        this.color = 0xffffff;
    }
    return ParamsTest;
})();
var Main = (function () {
    function Main() {
    }
    Main.Init = function () {
    };
    return Main;
})();
Main.Init();

define(["require", "exports"], function (require, exports) {
    var Triangulate = (function () {
        function Triangulate() {
        }
        Triangulate.AddPoints = function (points) {
            for (var i = 0; i < points.length; i++) {
                console.log(points[i]);
            }
        };
        return Triangulate;
    })();
    return Triangulate;
});

define(["require", "exports"], function (require, exports) {
    var Updater = (function () {
        function Updater() {
        }
        Updater.Add = function (handler) {
            this._handlers.push(handler);
        };
        Updater.Remove = function (handler) {
            var index = this._handlers.indexOf(handler);
            if (index > -1)
                this._handlers.splice(index, 1);
        };
        Updater.Clear = function () {
            this._handlers.length = 0;
        };
        Updater.Update = function () {
            for (var i = 0; i < this._handlers.length; i++)
                this._handlers[i].Update();
        };
        Updater._handlers = [];
        return Updater;
    })();
    return Updater;
});

define(["require", "exports"], function (require, exports) {
    var Vector = (function () {
        function Vector() {
        }
        Vector.Bisector = function (v1, v2) {
            var v1n = this.Normalize(v1);
            var v2n = this.Normalize(v2);
            var sum = this.Add(v1n, v2n);
            return sum;
        };
        Vector.Add = function (v1, v2) {
            return { x: v1.x + v2.x, y: v1.y + v2.y };
        };
        Vector.Subtract = function (v1, v2) {
            return { x: v1.x + -v2.x, y: v1.y + -v2.y };
        };
        Vector.Magnitude = function (v) {
            return Number(Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)).toFixed(this.floatPrecision));
        };
        Vector.Normalize = function (v) {
            var magnitude = this.Magnitude(v);
            return { x: v.x / magnitude, y: v.y / magnitude };
        };
        Vector.Negative = function (v) {
            return { x: v.x * -1, y: v.y * -1 };
        };
        Vector.Scale = function (v, length) {
            var n = this.Normalize(v);
            return { x: n.x * length, y: n.y * length };
        };
        Vector.PointInPoly = function (v, poly) {
            var x = v.x;
            var y = v.y;
            var inside = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var xi = poly[i].x;
                var yi = poly[i].y;
                var xj = poly[j].x;
                var yj = poly[j].y;
                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        Vector.floatPrecision = 2;
        return Vector;
    })();
    return Vector;
});
