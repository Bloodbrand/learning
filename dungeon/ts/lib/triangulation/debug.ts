import {Geometry} from "geometryModule";
import {Utils} from "utils";
import {Loader} from "loader";
import {Animate} from "animate";
import {Update} from "update";
import THREE = require("three");

export class Debug{

  public static Point(point: Geometry.Vector2): THREE.Mesh{
    let geometry = new THREE.SphereGeometry( 2, 10, 3 );
    let whiteMat = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let blackMat = new THREE.MeshBasicMaterial( {color: 0x000000} );
    let innerMesh = new THREE.Mesh(geometry, blackMat);
    innerMesh.scale.y = 0.2;

    let outlineMesh = innerMesh.clone();
    outlineMesh.material = whiteMat;
    outlineMesh.scale.set(1.3, 0.1, 1.3);
    innerMesh.add(outlineMesh);

    innerMesh.position.set(point.x, 0, point.y);

    return innerMesh;
  }

  public static Line(line: Geometry.Line): THREE.Line{
    let geometry = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial({ color: 0xffffff });

    geometry.vertices.push(
        new THREE.Vector3( line.v1.x, 0, line.v1.y ),
        new THREE.Vector3( line.v2.x, 0, line.v2.y )
    );

    return new THREE.Line( geometry, material );
  }

  public static Triangle(tri: Geometry.Triangle): THREE.Mesh{
    let normal = new THREE.Vector3( 0, 1, 0 );
    let color = new THREE.Color( 0xffffff );
    let face = new THREE.Face3( 0, 1, 2, normal, color, 0 );
    let geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3( tri.a.x, 0, tri.a.y ),
        new THREE.Vector3( tri.b.x, 0, tri.b.y ),
        new THREE.Vector3( tri.c.x, 0, tri.c.y )
    );

    geometry.faces.push(face);

    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff, side: THREE.DoubleSide}));
  }

  public static Room(point: Geometry.Vector2): THREE.Mesh{
    if(!point.QuadTree) return new THREE.Mesh();
    let side = point.QuadTree.Side;
    let geometry = new THREE.BoxGeometry( side, 1, side );
    let material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(point.QuadTree.Centroid.x, -1, point.QuadTree.Centroid.y);
    return cube;
  }

  public static Rooms(points: Geometry.Vector2[]): THREE.Object3D{
    return this.RunMultiple(this.Room, points);
  }

  public static Points(points: Geometry.Vector2[]): THREE.Object3D{
    return this.RunMultiple(this.Point, points);
  }

  public static Lines(lines: Geometry.Line[]): THREE.Object3D{
    return this.RunMultiple(this.Line, lines);
  }

  public static Triangles(tris: Geometry.Triangle[]): THREE.Object3D{
    return this.RunMultiple(this.Triangle, tris);
  }

  public static RunMultiple(func, arr: any[]): THREE.Object3D{
    let holder = new THREE.Object3D();

    for(let i = 0; i < arr.length; i++)
      holder.add( func(arr[i]) );

    return holder;
  }

  public static RotateCamera(loader: Loader){

    class CameraRotator{
      private speed: number = 0.1;
      private cameraCircleRadius: number = 10;
      private cameraAngle: number = 0;
      private initialPosition: THREE.Vector3;

      constructor(private loader: Loader){
        this.initialPosition = Animate.Camera.position.clone();
      }

      public Update(): void{
        this.cameraAngle = this.cameraAngle % 360;
        let angle = Utils.DegToRad(this.cameraAngle += this.speed);
        let curX = this.initialPosition.x;
        let curY = this.initialPosition.y;

        Animate.Camera.position.set(
          curX * Math.cos(angle) - curY * Math.sin(angle),
          Animate.Camera.position.y,
          curX * Math.sin(angle) + curY * Math.cos(angle));

        Animate.Camera.lookAt(Animate.CameraTarget);
      }
    }

    Update.Add(new CameraRotator(loader));
  }

}
