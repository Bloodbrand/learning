System.register(["utils", "animate", "update", "three"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utils_1, animate_1, update_1, THREE;
    var Debug;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (update_1_1) {
                update_1 = update_1_1;
            },
            function (THREE_1) {
                THREE = THREE_1;
            }],
        execute: function() {
            Debug = (function () {
                function Debug() {
                }
                Debug.Point = function (point) {
                    var sides = 6;
                    var geometry = new THREE.CircleGeometry(1.5, sides);
                    var mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
                    var innerMesh = new THREE.Mesh(geometry, mat);
                    geometry = new THREE.CircleGeometry(2, sides);
                    mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    var outerMesh = new THREE.Mesh(geometry, mat);
                    outerMesh.position.z -= 0.1;
                    innerMesh.add(outerMesh);
                    innerMesh.rotation.x -= Math.PI / 2;
                    innerMesh.position.set(point.x, 0.1, point.y);
                    return innerMesh;
                };
                Debug.Line = function (line) {
                    var geometry = new THREE.Geometry();
                    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
                    var v1 = line.v1;
                    var v2 = line.v2;
                    if (v1.x == v2.x || v1.y == v2.y) {
                        geometry.vertices.push(new THREE.Vector3(v1.x, 0, v1.y), new THREE.Vector3(v2.x, 0, v2.y));
                    }
                    else {
                        geometry.vertices.push(new THREE.Vector3(v1.x, 0, v1.y), new THREE.Vector3(v1.x, 0, v2.y));
                        geometry.vertices.push(new THREE.Vector3(v1.x, 0, v2.y), new THREE.Vector3(v2.x, 0, v2.y));
                    }
                    return new THREE.Line(geometry, material);
                };
                /*private straightLine(line: Geometry.Line): Geometry.Line{
              
                }*/
                Debug.Triangle = function (tri) {
                    var normal = new THREE.Vector3(0, 1, 0);
                    var color = new THREE.Color(0xffffff);
                    var face = new THREE.Face3(0, 1, 2, normal, color, 0);
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(tri.a.x, 0, tri.a.y), new THREE.Vector3(tri.b.x, 0, tri.b.y), new THREE.Vector3(tri.c.x, 0, tri.c.y));
                    geometry.faces.push(face);
                    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
                };
                Debug.Room = function (room) {
                    var Color;
                    (function (Color) {
                        Color[Color["gray"] = 0] = "gray";
                        Color[Color["white"] = 1] = "white";
                        Color[Color["yellow"] = 2] = "yellow";
                        Color[Color["blue"] = 3] = "blue";
                        Color[Color["red"] = 4] = "red";
                    })(Color || (Color = {}));
                    ;
                    var qt = room.QuadTree;
                    var side = qt.Side;
                    var geometry = new THREE.PlaneBufferGeometry(side, side);
                    var material = new THREE.MeshBasicMaterial({ color: Color[room.Difficulty] });
                    var plane = new THREE.Mesh(geometry, material);
                    plane.position.set(qt.Centroid.x, -1, qt.Centroid.y);
                    plane.rotation.x -= Math.PI / 2;
                    return plane;
                };
                Debug.Rooms = function (rooms) {
                    return this.RunMultiple(this.Room, rooms);
                };
                Debug.Points = function (points) {
                    return this.RunMultiple(this.Point, points);
                };
                Debug.Lines = function (lines) {
                    return this.RunMultiple(this.Line, lines);
                };
                Debug.Triangles = function (tris) {
                    return this.RunMultiple(this.Triangle, tris);
                };
                Debug.RunMultiple = function (func, arr) {
                    var holder = new THREE.Object3D();
                    for (var i = 0; i < arr.length; i++)
                        holder.add(func(arr[i]));
                    return holder;
                };
                Debug.RotateCamera = function (loader) {
                    var CameraRotator = (function () {
                        function CameraRotator(loader) {
                            this.loader = loader;
                            this.speed = 0.1;
                            this.cameraCircleRadius = 50;
                            this.cameraAngle = 0;
                            this.initialPosition = animate_1.Animate.Camera.position.clone();
                        }
                        CameraRotator.prototype.Update = function () {
                            this.cameraAngle = this.cameraAngle % 360;
                            var angle = utils_1.Utils.DegToRad(this.cameraAngle += this.speed);
                            var curX = this.initialPosition.x + this.cameraCircleRadius;
                            var curY = this.initialPosition.y + this.cameraCircleRadius;
                            animate_1.Animate.Camera.position.set(curX * Math.cos(angle) - curY * Math.sin(angle), animate_1.Animate.Camera.position.y, curX * Math.sin(angle) + curY * Math.cos(angle));
                            animate_1.Animate.Camera.lookAt(animate_1.Animate.CameraTarget);
                        };
                        return CameraRotator;
                    }());
                    update_1.Update.Add(new CameraRotator(loader));
                };
                return Debug;
            }());
            exports_1("Debug", Debug);
        }
    }
});
