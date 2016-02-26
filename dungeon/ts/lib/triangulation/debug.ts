import {Geometry} from "geometryModule";
import {Utils} from "utils";
import {Loader} from "loader";
import {Animate} from "animate";
import {QuadTree} from "QuadTree";
import {Update} from "update";
import {Room} from "room";
import THREE = require("three");

export class Debug{

  public static Point(point: Geometry.Vector2): THREE.Mesh{
    let sides = 6;
    let geometry = new THREE.CircleGeometry(1.5, sides);
    let mat = new THREE.MeshBasicMaterial( {color: 0x000000} );
    let innerMesh = new THREE.Mesh(geometry, mat);

    geometry = new THREE.CircleGeometry(2, sides);
    mat = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let outerMesh = new THREE.Mesh(geometry, mat);
    outerMesh.position.z -= 0.1;

    innerMesh.add(outerMesh);
    innerMesh.rotation.x -= Math.PI / 2;
    innerMesh.position.set(point.x, 0.1, point.y);

    return innerMesh;
  }

  public static Line(line: Geometry.Line): THREE.Line{
    let geometry = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial({ color: 0xffffff });
    let v1 = line.v1;
    let v2 = line.v2;

    if(v1.x == v2.x || v1.y == v2.y){ // straight line
      geometry.vertices.push(
          new THREE.Vector3( v1.x, 0, v1.y ),
          new THREE.Vector3( v2.x, 0, v2.y )
      );
    }
    else {                           // diagonal line
      geometry.vertices.push(
          new THREE.Vector3( v1.x, 0, v1.y ),
          new THREE.Vector3( v1.x, 0, v2.y )
      );

      geometry.vertices.push(
          new THREE.Vector3( v1.x, 0, v2.y ),
          new THREE.Vector3( v2.x, 0, v2.y )
      );
    }

    return new THREE.Line( geometry, material );
  }

  /*private straightLine(line: Geometry.Line): Geometry.Line{

  }*/

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

  public static Room(room: Room): THREE.Mesh{
    enum Color {gray, white, yellow, blue, red};
    let qt = room.QuadTree;
    let side = qt.Side;
    let geometry = new THREE.PlaneBufferGeometry(side, side);
    let material = new THREE.MeshBasicMaterial( {color: Color[room.Difficulty]} );
    let plane = new THREE.Mesh( geometry, material );
    plane.position.set(qt.Centroid.x, -1, qt.Centroid.y);
    plane.rotation.x -= Math.PI / 2;
    return plane;
  }

  public static Rooms(rooms: Room[]): THREE.Object3D{
    return this.RunMultiple(this.Room, rooms);
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
      private cameraCircleRadius: number = 50;
      private cameraAngle: number = 0;
      private initialPosition: THREE.Vector3;

      constructor(private loader: Loader){
        this.initialPosition = Animate.Camera.position.clone();
      }

      public Update(): void{
        this.cameraAngle = this.cameraAngle % 360;
        let angle = Utils.DegToRad(this.cameraAngle += this.speed);
        let curX = this.initialPosition.x + this.cameraCircleRadius;
        let curY = this.initialPosition.y + this.cameraCircleRadius;

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
