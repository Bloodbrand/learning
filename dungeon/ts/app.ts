System.config({
  transpiler: "typescript"
  ,
  defaultJSExtensions: true
	,
  map:{
    geometryModule: "js/lib/triangulation/geometryModule.js",
    utils: "js/lib/triangulation/utils.js",
    quadTree: "js/lib/triangulation/quadTree.js",
		three  : "node_modules/three/three.js",
    main   : "js/main.js",
    animate: "js/animate.js",
    loader : "js/loader.js",
    map    : "js/map.js"
  }
});

System.import('main');
