require.config({
   paths: {
       "underscore" : "../bower_components/underscore/underscore",
       "jquery" : "../bower_components/jquery/dist/jquery",
       "three" : "../bower_components/three.js/build/three",
       "windowResize" : "../bower_components/threex.windowresize/threex.windowresize",
       "animate": "animate"
   }
});

requirejs(["main"], function(main){
    main.Init();
});