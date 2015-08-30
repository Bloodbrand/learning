define(["three", "jquery", "animate"], function(three, jquery, animate){
    var mainVars = {
        width: 0,
        height: 0,
        container: undefined,
        scene: undefined,
        camFov: 45,
        camNear: 0.1,
        camFar: 1000
    };
return{
    Init: function(){
        mainVars.width = $(window).width();
        mainVars.height = $(window).height();
        mainVars.container = $('#webGL');
        mainVars.scene = new THREE.Scene();
        animate.set("scene", mainVars.scene);
        this.addRenderer();
        this.addCamera();
        this.addLight();
        animate.animate();
    }
    ,
    addRenderer: function(){
        var r = new THREE.WebGLRenderer();
        r.setSize( mainVars.width, mainVars.height );
        mainVars.container.append( r.domElement );
        animate.set("renderer", r);
    }
    ,
    addCamera: function(){
        var c = new THREE.PerspectiveCamera( mainVars.camFov, mainVars.width / mainVars.height,
            mainVars.camNear, mainVars.camFar );
        mainVars.scene.add(c);
        animate.set("camera", c);
    }
    ,
    addLight: function(){
        var ambientLight = new THREE.AmbientLight( 0xffffff );
        mainVars.scene.add( ambientLight );

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 1, 0 );
        mainVars.scene.add( directionalLight );
    }
    ,
    get: function(name){ return mainVars[name]; }
    ,
    set: function(name, val){ mainVars[name] = val; }
}
});