define(["three", "jquery", "sceneManager", "gameManager", "animate", "orbitControls", "materials"],
    function(three, jquery, sceneManager, gameManager, animate, orbitControls, materials){
    var mainVars = {
        width: 0,
        height: 0,
        container: undefined,
        camFov: 45,
        camNear: 0.1,
        camFar: 1000,
        orthoZoom: 23
    };
return{
    Init: function(){
        mainVars.width = $(window).width();
        mainVars.height = $(window).height();
        mainVars.container = $('#webGL');
        sceneManager.scene = new THREE.Scene();
        this.addRenderer();
        this.addCamera("perspective");
        this.addLight();
        animate.startAnimating();
        gameManager.startGame();
    }
    ,
    addRenderer: function(){
        var r = new THREE.WebGLRenderer({antialias: true});
        r.setSize( mainVars.width, mainVars.height );
        mainVars.container.append( r.domElement );
        sceneManager.renderer = r;
    }
    ,
    addCamera: function(t){
        var c = undefined;

        var type = {
            perspective: function(){
                c = new THREE.PerspectiveCamera( mainVars.camFov, mainVars.width / mainVars.height,
                    mainVars.camNear, mainVars.camFar );
            }
            ,
            orthographic: function(){
                c = new THREE.OrthographicCamera(
                    mainVars.width / - 2, mainVars.width / 2,
                    mainVars.height / 2, mainVars.height / - 2,
                    mainVars.near, mainVars.far );
                c.zoom = mainVars.orthoZoom;
                c.updateProjectionMatrix();
            }
        };
        type[t]();

        c.position.copy(sceneManager.get("cameraPosition"));

        var controls = new THREE.OrbitControls( c );
        var curPolar = controls.getPolarAngle();
        controls.minPolarAngle = controls.maxPolarAngle = curPolar;
        controls.noPan = controls.noZoom = true;
        c.lookAt(sceneManager.get("cameraPivot"));
        sceneManager.set("controls", controls);

        sceneManager.camera = c;
        sceneManager.add(c);
    }
    ,
    addLight: function(){
        var ambientLight = new THREE.AmbientLight( 0x333333 );
        sceneManager.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 1, 0 );
        sceneManager.add(directionalLight);
    }
    ,
    get: function(name){ return mainVars[name]; }
    ,
    set: function(name, val){ mainVars[name] = val; }
}
});