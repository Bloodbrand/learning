import Updater = require("Updater");
import THREE = require("three");
import Refs = require("Refs");

module Shaders {
	export class Materials {
		private static _dataTexture: THREE.DataTexture = Materials.makeDataTexture();

		static Get(name: string): THREE.Material{
			switch(name){
				case "floor":
				case "ceiling":
					return new Shaders.FloorShader(this._dataTexture);
					break;
				case "wall":
					return new Shaders.WallShader(this._dataTexture);
					break;
				case "portal":
					//return new Shaders.PortalShader();
					break;
				default:
					return new THREE.MeshBasicMaterial({color: 0x00ff00});
			}
		}

		private static makeDataTexture(): THREE.DataTexture {
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
		}
	}

	export class FloorShader extends THREE.ShaderMaterial{
		private _set: THREE.ShaderMaterialParameters;
		private _loader;
		private _camera;

		constructor(map: THREE.Texture) {
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
			super(this._set);		
			Updater.Add(this);
		}

		Update(){
			//this._set.uniforms.time.value += this._set.uniforms.timeFlow.value;
		}

		vertShader(): string {
			return [
            "varying vec2 vUv;",
			"void main(){",
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
			].join('\n');
		}

		fragShader(): string{
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
                //"grid.g += 1.;",
                //"mapColor -= grid;",
				//"gl_FragColor = mapColor;",
				"gl_FragColor = grid;",
			"}"
			].join('\n');
		}
	}

	export class WallShader extends THREE.ShaderMaterial {
		_set: THREE.ShaderMaterialParameters;
		constructor(map: THREE.Texture) {
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
			super(this._set);
			Updater.Add(this);
		}

		Update() {
			this._set.uniforms.time.value += this._set.uniforms.timeFlow.value;
		}

		vertShader(): string {
			return [
				"varying vec2 vUv;",
				"void main(){",
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"}"
			].join('\n');
		}

		fragShader(): string {
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
		}
	}

	class PortalOpener implements Refs.IHandler {
		private _shader: PortalShader;
		private _value: string;
		private _max: string;
		private _increment: number;

		constructor(shader: PortalShader, value: string, max: string, increment: number) {
			this._shader = shader;
			this._value = value;
			this._max = max;
			this._increment = increment;
			Updater.Add(this);
		}

		Update() {
			if (this._shader._set.uniforms[this._value].value >= this._shader[this._max]) {
				this._shader._set.uniforms[this._value].value = this._shader[this._max];
				Updater.Remove(this);
			}
			this._shader._set.uniforms[this._value].value += this._increment;
		}
	}

	export class PortalShader extends THREE.ShaderMaterial {
		_set: THREE.ShaderMaterialParameters;
		_maxAperture: number;
		_apertureTimeFlow: number;
		_maxSize: number;
		//_renderTarget: THREE.RenderTarget;
		private _loader;
		private _camera;
		private _timeFlow: number;		

		constructor(map: THREE.RenderTarget, loader, camera, color: THREE.Color) {
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
			super(this._set);
			this.openPortal();
			Updater.Add(this);
		}

		Update() {
			this._set.uniforms.time.value += this._timeFlow;

			this._loader.Renderer.render(
				this._loader.Scene, this._camera, this.uniforms.map.value
			); 

			this._loader.Renderer.render(
				this._loader.Scene, this._camera, this.uniforms.map.value
			);
		}

		SetCamera(camera: THREE.Camera) {
			this._camera = camera;
		}

		private openPortal(){
			let opener = new PortalOpener(this, "size", "_maxSize", this._apertureTimeFlow);
		}

		OpenAperture() {
			let opener = new PortalOpener(this, "aperture", "_maxAperture", this._apertureTimeFlow);
		}

		private vertShader(): string {
			return [
				"varying vec2 vUv;",
				"void main(){",
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"}"
			].join('\n');
		}

		private fragShader(): string {
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
		}
	}
}

export = Shaders;