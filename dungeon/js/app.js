System.config({
    transpiler: "typescript",
    map: {
        three: "node_modules/three/three.js",
        main: "js/main.js",
        animate: "js/animate.js",
        loader: "js/loader.js",
        map: "js/map.js"
    }
});
System.import('main');
