define(["three", "jquery", "sceneManager", "gameManager", "animate"],
    function(three, jquery, sceneManager, gameManager, animate){
    var mainVars = {
        width: 0,
        height: 0,
        container: undefined,
        camFov: 45,
        camNear: 0.1,
        camFar: 1000
    };
return{
    Init: function(){
        mainVars.width = $(window).width();
        mainVars.height = $(window).height();
        mainVars.container = $('#webGL');
        sceneManager.scene = new THREE.Scene();
        this.addRenderer();
        this.addCamera();
        this.addLight();
        animate.startAnimating();
        gameManager.generateMap();
    }
    ,
    addRenderer: function(){
        var r = new THREE.WebGLRenderer({antialias: true});
        r.setSize( mainVars.width, mainVars.height );
        mainVars.container.append( r.domElement );
        sceneManager.renderer = r;
    }
    ,
    addCamera: function(){
        var c = new THREE.PerspectiveCamera( mainVars.camFov, mainVars.width / mainVars.height,
            mainVars.camNear, mainVars.camFar );
        c.position.copy(sceneManager.get("cameraPosition"));
        c.lookAt(new THREE.Vector3( 0, 0, 0 ));
        //sceneManager.set("camera", c);
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