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
