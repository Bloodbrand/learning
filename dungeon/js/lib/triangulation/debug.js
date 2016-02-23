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
                    var geometry = new THREE.SphereGeometry(2, 10, 3);
                    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.position.set(point.x, 0, point.y);
                    return mesh;
                };
                Debug.Line = function (line) {
                    var geometry = new THREE.Geometry();
                    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
                    geometry.vertices.push(new THREE.Vector3(line.v1.x, 1, line.v1.y), new THREE.Vector3(line.v2.x, 1, line.v2.y));
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
                Debug.Points = function (points) {
                    var holder = new THREE.Object3D();
                    for (var p = 0; p < points.length; p++)
                        holder.add(this.Point(points[p]));
                    return holder;
                };
                Debug.Lines = function (lines) {
                    var holder = new THREE.Object3D();
                    for (var l = 0; l < lines.length; l++)
                        holder.add(this.Line(lines[l]));
                    return holder;
                };
                Debug.Triangles = function (tris) {
                    var holder = new THREE.Object3D();
                    for (var t = 0; t < tris.length; t++)
                        holder.add(this.Triangle(tris[t]));
                    return holder;
                };
                Debug.RotateCamera = function (loader) {
                    var CameraRotator = (function () {
                        function CameraRotator(loader) {
                            this.loader = loader;
                            this.speed = 1;
                            this.cameraCircleRadius = 10;
                            this.cameraAngle = 0;
                        }
                        CameraRotator.prototype.Update = function () {
                            var angle = utils_1.Utils.DegToRad(this.cameraAngle += this.speed);
                            /*let newX = Animate.Camera.position.x + (this.cameraCircleRadius * Math.cos(angle));
                            let newZ = Animate.Camera.position.z + (this.cameraCircleRadius * Math.sin(angle));*/
                            var newX = Math.cos(angle) * (animate_1.Animate.Camera.position.x - animate_1.Animate.CameraTarget.x) - Math.sin(angle) *
                                (animate_1.Animate.Camera.position.y - animate_1.Animate.CameraTarget.y) + animate_1.Animate.CameraTarget.x;
                            var newZ = Math.sin(angle) * (animate_1.Animate.Camera.position.x - animate_1.Animate.CameraTarget.x) + Math.cos(angle) *
                                (animate_1.Animate.Camera.position.y - animate_1.Animate.CameraTarget.y) + animate_1.Animate.CameraTarget.y;
                            animate_1.Animate.Camera.position.set(newX, animate_1.Animate.Camera.position.y, newZ);
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
