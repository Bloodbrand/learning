require.config({
   paths: {
       "underscore" : "../bower_components/underscore/underscore",
       "jquery" : "../bower_components/jquery/dist/jquery",
       "three" : "../bower_components/three.js/build/three",
       "windowResize" : "../bower_components/threex.windowresize/threex.windowresize",
       "main": "main",
       "animate": "animate",
       "sceneManager": "sceneManager",
       "models" : "models",
       "gameManager" : "gameManager"
   }
});

requirejs(["main"], function(main){
    main.Init();
});