define(["three"], function(three){
    SnowShader.prototype = new THREE.ShaderMaterial();
    WaterShader.prototype = new THREE.ShaderMaterial();

    function SnowShader(){
        var raindrop = THREE.ImageUtils.loadTexture( "art/raindrop.png" );
        var speed = 0.2;

        this.uniforms = {
            texture: { type: 't', value: raindrop },
            height: { type: 'f', value: 10 },
            color: {type: 'c', value: new THREE.Color(0xffffff)},
            time: { type: 'f', value: 0 }
        };

        this.vertexShader = vSh();
        this.fragmentShader = fSh();
        this.blending = THREE.AdditiveBlending;
        this.transparent = true;
        this.depthTest = false;
        this.update = function(){ this.uniforms.time.value += speed; };


        function vSh(){
            return[
            "uniform float height;",
            "uniform float time;",

            "void main() {",
                "vec3 pos = position;",
                "pos.y = mod(pos.y - time, height);",
                "gl_PointSize = 3.0;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );}"
            ].join('\n');
        }

        function fSh(){
            return[
                "uniform vec3 color;",
                "uniform sampler2D texture;",

                "void main() {",
                    "vec4 texColor = texture2D( texture, gl_PointCoord);",
                    "gl_FragColor = texColor * vec4(color, 1.0);}"
            ].join('\n');
        }
    }

    function WaterShader(){
        this.uniforms = {
            time: { type: 'f', value: 0 }
        };

        this.vertexShader = vSh();
        this.fragmentShader = fSh();
        this.side = THREE.DoubleSide;
        //this.wireframe = true;
        this.update = function(){ this.uniforms.time.value += 0.01; };

        function vSh(){
            return[
                "uniform float time;",
                "varying vec2 vUv;",
                "varying float vY;",
                "void main() {",
                "vec3 pos = position;",
                "vY = pos.y = sin(time + pos.z * pos.x);",
                "vUv = uv;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );}"
            ].join('\n');
        }

        function fSh(){
            return[
                "uniform sampler2D texture;",
                "varying vec2 vUv;",
                "varying float vY;",

                "void main() {",
                "vec3 color = vec3(0., vY, vUv.x);",
                "gl_FragColor = vec4(color, 1.);}"
            ].join('\n');
        }
    }

    return{
        SnowShader: SnowShader,
        WaterShader: WaterShader
    }
});