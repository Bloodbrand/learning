require.config({
   paths: {
         "underscore" : "../bower_components/underscore/underscore",
             "jquery" : "../bower_components/jquery/dist/jquery",
              "three" : "../bower_components/three.js/build/three",
       "orbitControls": "../bower_components/three.js/orbitControls",
       "windowResize" : "../bower_components/threex.windowresize/threex.windowresize",
              "tween" : "../bower_components/tween.js/src/Tween",
           "fileSaver": "../bower_components/file-saver/FileSaver",
               "main" : "main",
            "animate" : "animate",
       "sceneManager" : "sceneManager",
             "models" : "models",
        "gameManager" : "gameManager",
        "pathfinding" : "pathfinding",
             "events" : "events",
               "maps" : "maps",
          "materials" : "materials"
   }
   ,
   shim: {
       fileSaver: { exports: "fileSaver" },
       tween: { exports: "tween" }
   }
});

requirejs(["main", "events"], function(main, events){
    main.Init();
});