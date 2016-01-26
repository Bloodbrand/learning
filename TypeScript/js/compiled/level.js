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
