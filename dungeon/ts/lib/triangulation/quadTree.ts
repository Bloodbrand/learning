import {Geometry} from "geometryModule";
import {Utils} from "utils";
import {Debug} from "debug";

export class QuadTree{

  public Children: QuadTree[] = [];
  public BottomLayer: QuadTree[] = [];
  public Parent: QuadTree;
  public Vertices: Geometry.Vector2[];
  public Left: number;
  public Right: number;
  public Bottom: number;
  public Top: number;
  public Side: number;
  public Points: Geometry.Vector2[];
  public ID: number;
  public Centroid: Geometry.Vector2;
  public Depth: number;

  capacity: number = 1;
  containedPoints: Geometry.Vector2[] = [];

  constructor(a: Geometry.Vector2, b: Geometry.Vector2, c: Geometry.Vector2, d: Geometry.Vector2){
    this.ID = Utils.UniqueID();
    this.Vertices = [ a, b, c, d ];
    this.Centroid = Utils.FindPolyCentroid([ a, b, c, d ]);
    let verticesClone = this.Vertices.slice(0);

    Utils.Sort(verticesClone, "x");
    this.Left = verticesClone[0].x;
    this.Right = verticesClone[3].x;
    this.Side = this.Right - this.Left;

    Utils.Sort(verticesClone, "y");
    this.Bottom = verticesClone[0].y;
    this.Top = verticesClone[3].y;
  }

  public Contains( p: Geometry.Vector2 ): boolean{
    let x: number = p.x;
    let y: number = p.y;

    if ( ( x > this.Left && x < this.Right  ) &&
         ( y < this.Top  && y > this.Bottom ) )
        return true;
    else
        return false;
  }

  public Divide(depth: number): QuadTree[] {
    let width = this.Right - this.Left;
    let height = this.Top - this.Bottom;
    let midwayX = this.Left + width  / 2;
    let midwayY = this.Bottom + height / 2;

    let quad1 = new QuadTree(
        this.Vertices[0],
        new Geometry.Vector2( midwayX, this.Bottom ),
        new Geometry.Vector2( midwayX, midwayY ),
        new Geometry.Vector2( this.Left, midwayY )
    );

    let quad2 = new QuadTree(
        new Geometry.Vector2( midwayX, this.Bottom ),
        this.Vertices[1],
        new Geometry.Vector2( this.Right, midwayY ),
        new Geometry.Vector2( midwayX, midwayY )
    );

    let quad3 = new QuadTree(
        new Geometry.Vector2( midwayX, midwayY ),
        new Geometry.Vector2( this.Right, midwayY ),
        this.Vertices[2],
        new Geometry.Vector2( midwayX, this.Top )
    );

    let quad4 = new QuadTree(
        new Geometry.Vector2( this.Left, midwayY ),
        new Geometry.Vector2( midwayX, midwayY ),
        new Geometry.Vector2( midwayX, this.Top ),
        this.Vertices[3]
    );

    this.Children = [ quad1, quad2, quad3, quad4 ];

    for (let c = 0; c < this.Children.length; c++) {
        let curC = this.Children[c];
        curC.Parent = this;
        curC.Start( depth );
    }

    return this.Children;
  };

  public Start( depth: number ): any {
    if (!this.Parent)
      this.Depth = 0;
    else
      this.Depth = this.Parent.Depth + 1;

    if (this.Depth < depth)
      this.Divide(depth);
    else{
      let parent = this.Parent;
      let last;

      while(parent){
        last = parent;
        parent = parent.Parent;
      }

      last.BottomLayer.push(this);
    }
  };

}
