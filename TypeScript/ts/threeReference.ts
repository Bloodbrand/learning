///<reference path="three.d.ts"/>

class ParamsTest implements THREE.MeshBasicMaterialParameters {
    color = 0xffffff;
}

class Main {
    static Init() {
        /*
        let params = new ParamsTest();
        let mat = new THREE.MeshBasicMaterial(params);
        let geom = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
        let mesh = new THREE.Mesh(geom, mat);
        */
    }
}
Main.Init();