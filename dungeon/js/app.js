System.config({
    transpiler: "typescript",
    map: {
        three: "node_modules/three/three.js",
        main: "js/main.js",
        animate: "js/animate.js"
    }
});
System.import('main');
