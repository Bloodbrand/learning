System.register(["utils", "animate", "update", "three"], function(exports_1) {
    "use strict";
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
                    var geometry = new THREE.SphereGeometry(2, 10, 3);
                    var whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    var blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
                    var innerMesh = new THREE.Mesh(geometry, blackMat);
                    innerMesh.scale.y = 0.2;
                    var outlineMesh = innerMesh.clone();
                    outlineMesh.material = whiteMat;
                    outlineMesh.scale.set(1.3, 0.1, 1.3);
                    innerMesh.add(outlineMesh);
                    innerMesh.position.set(point.x, 0, point.y);
                    return innerMesh;
                };
                Debug.Line = function (line) {
                    var geometry = new THREE.Geometry();
                    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
                    geometry.vertices.push(new THREE.Vector3(line.v1.x, 0, line.v1.y), new THREE.Vector3(line.v2.x, 0, line.v2.y));
                    return new THREE.Line(geometry, material);
                };
                Debug.Triangle = function (tri) {
                    var normal = new THREE.Vector3(0, 1, 0);
                    var color = new THREE.Color(0xffffff);
                    var face = new THREE.Face3(0, 1, 2, normal, color, 0);
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(tri.a.x, 0, tri.a.y), new THREE.Vector3(tri.b.x, 0, tri.b.y), new THREE.Vector3(tri.c.x, 0, tri.c.y));
                    geometry.faces.push(face);
                    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
                };
                Debug.Room = function (point) {
                    if (!point.QuadTree)
                        return new THREE.Mesh();
                    var side = point.QuadTree.Side;
                    var geometry = new THREE.BoxGeometry(side, 1, side);
                    var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
                    var cube = new THREE.Mesh(geometry, material);
                    cube.position.set(point.QuadTree.Centroid.x, -1, point.QuadTree.Centroid.y);
                    return cube;
                };
                Debug.Rooms = function (points) {
                    return this.RunMultiple(this.Room, points);
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
                            this.cameraCircleRadius = 10;
                            this.cameraAngle = 0;
                            this.initialPosition = animate_1.Animate.Camera.position.clone();
                        }
                        CameraRotator.prototype.Update = function () {
                            this.cameraAngle = this.cameraAngle % 360;
                            var angle = utils_1.Utils.DegToRad(this.cameraAngle += this.speed);
                            var curX = this.initialPosition.x;
                            var curY = this.initialPosition.y;
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
