import {Geometry} from "geometryModule";
import {Utils} from "utils";
import {Loader} from "loader";
import {Animate} from "animate";
import {Update} from "update";
import THREE = require("three");

export class Debug{

  public static Point(point: Geometry.Vector2): THREE.Mesh{
    let geometry = new THREE.SphereGeometry( 2, 10, 3 );
    let material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(point.x, 0, point.y);
    return mesh;
  }

  public static Line(line: Geometry.Line): THREE.Line{
    let geometry = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial({ color: 0xffffff });

    geometry.vertices.push(
        new THREE.Vector3( line.v1.x, 1, line.v1.y ),
        new THREE.Vector3( line.v2.x, 1, line.v2.y )
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

  public static Points(points: Geometry.Vector2[]): THREE.Object3D{
    let holder = new THREE.Object3D();

    for(let p = 0; p < points.length; p++)
      holder.add( this.Point(points[p]) );

    return holder;
  }

  public static Lines(lines: Geometry.Line[]): THREE.Object3D{
    let holder = new THREE.Object3D();

    for(let l = 0; l < lines.length; l++)
      holder.add( this.Line(lines[l]) );

    return holder;
  }

  public static Triangles(tris: Geometry.Triangle[]): THREE.Object3D{
    let holder = new THREE.Object3D();

    for(let t = 0; t < tris.length; t++)
      holder.add( this.Triangle(tris[t]) );

    return holder;
  }

  public static RotateCamera(loader: Loader){

    class CameraRotator{
      private speed = 1;
      private cameraCircleRadius = 10;
      private cameraAngle = 0;

      constructor(private loader: Loader){}

      public Update(){
        let angle = Utils.DegToRad(this.cameraAngle += this.speed);
        /*let newX = Animate.Camera.position.x + (this.cameraCircleRadius * Math.cos(angle));
        let newZ = Animate.Camera.position.z + (this.cameraCircleRadius * Math.sin(angle));*/
        let newX = Math.cos(angle) * (Animate.Camera.position.x-Animate.CameraTarget.x) - Math.sin(angle) *
          (Animate.Camera.position.y-Animate.CameraTarget.y) + Animate.CameraTarget.x
        let newZ = Math.sin(angle) * (Animate.Camera.position.x-Animate.CameraTarget.x) + Math.cos(angle) *
          (Animate.Camera.position.y-Animate.CameraTarget.y) + Animate.CameraTarget.y
        Animate.Camera.position.set(newX, Animate.Camera.position.y, newZ);
        Animate.Camera.lookAt(Animate.CameraTarget);
      }
    }

    Update.Add(new CameraRotator(loader));
  }

}
