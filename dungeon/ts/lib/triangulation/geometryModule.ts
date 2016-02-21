import {Utils} from "utils";
import {QuadTree} from "quadTree";

export module Geometry{

  export class Vector2{

    public DisjoinedSet: DisjoinedSet;
    public TriCCWAngle: number;
    public PolyCCWAngle: number;
    public QuadTree: QuadTree;

    constructor( public x: number, public y: number){}

    public Clone(): Vector2{
      return new Vector2( this.x, this.y );
    }

    public Magnitude(): number{
      return Number(Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) ).toFixed(2));
    }

    public Add( v: Vector2 ): Vector2{
      return new Vector2( this.x + v.x, this.y + v.y );
    }

    public Subtract( v: Vector2 ): Vector2{
      return new Vector2( this.x + -v.x, this.y + -v.y );
    }

  }

  export class Line{

    public Midpoint: Vector2;
    public Length: number;

    constructor( public v1: Vector2, public v2: Vector2 ){}

    public Clone(): Line{
      return new Line( this.v1, this.v2 );
    }

    public GetLength(): number{
      this.Length = this.v1.Subtract(this.v2).Magnitude();
      return this.Length;
    }

  }

  export class Triangle{

    public Centroid: Vector2;
    public Lines = {
      AB: <Line>undefined,
      BC: <Line>undefined,
      CA: <Line>undefined
    };

    constructor( public a: Vector2, public b: Vector2, public c: Vector2 ){
      this.Lines.AB = new Line( a, b );
      this.Lines.BC = new Line( b, c );
      this.Lines.CA = new Line( c, a );
    }

    public GetLinesLength(): void{
      this.Lines.AB.GetLength();
      this.Lines.BC.GetLength();
      this.Lines.CA.GetLength();
    }

    public GetLinesArray(): Line[]{
      return [ this.Lines.AB, this.Lines.BC, this.Lines.CA ];
    }

  }

  export class DisjoinedSet{
    public ID: number;
    public Points: Vector2[] = [];

    constructor( point: Vector2 ){
      this.ID = Utils.UniqueID();
      this.Points.push(point);
      point.DisjoinedSet = this;
    }

    public Merge( set: DisjoinedSet ): void{
      for ( let i = 0; i < set.Points.length; i++ ){
        set.Points[i].DisjoinedSet = this;
        this.Points.push( set.Points[i] );
      }
      set = this;
    }

  }

  export class Matrix2{

    constructor(public a, public b, public c, public d){}

    public Determine(): number{
      return this.a * this.d - this.b * this.c;
    }

  }

  export class Matrix3 extends Matrix2{

    constructor(a, b, c, d, public e, public f, public g, public h, public i){
      super(a, b, c, d);
    }

    public Determine(): number{
      return this.a * new Matrix2( this.e, this.f, this.h, this.i).Determine() -
             this.b * new Matrix2( this.d, this.f, this.g, this.i).Determine() +
             this.c * new Matrix2( this.d, this.e, this.g, this.h).Determine();
    }

  }

  export class Matrix4 extends Matrix3{

    constructor(a, b, c, d, e, f, g, h, i, public j, public k, public l, public m, public n, public o, public p){
      super(a, b, c, d, e, f, g, h, i);
    }

    public Determine(): number{
      return ( this.a * new Matrix3( this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p ).Determine() ) -
    			   ( this.b * new Matrix3( this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p ).Determine() ) +
    			   ( this.c * new Matrix3( this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p ).Determine() ) -
    			   ( this.d * new Matrix3( this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o ).Determine() );
    }

  }

}
