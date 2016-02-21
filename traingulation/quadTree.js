function QuadTree ( a, b, c, d ) {

    var _this = this;
    this.children = [];
    this.parent = undefined;
    this.vertices = [ a, b, c, d ];    
    this.capacity = 1;
    this.containedPoints = [];
    this.points = undefined;
    this.side = undefined;
    this.left = undefined;
    this.right = undefined;
    this.bottom = undefined;
    this.top = undefined;

    (function constructor () {

        var verticesClone = _this.vertices.slice(0);

        Sort( verticesClone, "x" );
        _this.left = verticesClone[0].x;
        _this.right = verticesClone[3].x;
        _this.side = _this.right - _this.left;

        Sort( verticesClone, "y" );
        _this.bottom = verticesClone[0].y;
        _this.top = verticesClone[3].y;

    }());

    this.Contains = function ( p ) {

        var x = p.x;
        var y = p.y;

        if ( ( x > this.left && x < this.right  ) &&
             ( y < this.top  && y > this.bottom ) ) 
            return true;
        else 
            return false;

    };

    this.Divide = function () {

        var width = this.right - this.left;
        var height = this.top - this.bottom;
        var midwayX = this.left + width  / 2;
        var midwayY = this.bottom + height / 2;

        var quad1 = new QuadTree( 
            this.vertices[0]      ,
            new Vector2( midwayX  , this.bottom ),
            new Vector2( midwayX  ,     midwayY ),
            new Vector2( this.left,     midwayY )        
        );

        var quad2 = new QuadTree( 
            new Vector2( midwayX   , this.bottom ),
            this.vertices[1]       ,
            new Vector2( this.right,      midwayY),
            new Vector2( midwayX   ,      midwayY)        
        );

        var quad3 = new QuadTree( 
            new Vector2( midwayX   , midwayY ),
            new Vector2( this.right, midwayY ),
            this.vertices[2],   
            new Vector2( midwayX   , this.top)        
        );

        var quad4 = new QuadTree( 
            new Vector2( this.left, midwayY ),
            new Vector2( midwayX  , midwayY ),
            new Vector2( midwayX  , this.top),
            this.vertices[3]     
        );        

        this.children = [ quad1, quad2, quad3, quad4 ];

        for (var c = 0; c < this.children.length; c++) {

            var curC = this.children[ c ];
            curC.parent = this;
            curC.Start( this.points ); 
            
        }
            

        return this.children;

    };

    this.Start = function ( points ) {

        this.points = points;

        for ( var p = 0; p < this.points.length; p++ ) {

            var curP = this.points[p];

            if( this.Contains(curP) ) {

                if (this.containedPoints.length < this.capacity) {

                    curP.quadTree = this;
                    this.containedPoints.push( curP );

                }                    

                else {

                    this.containedPoints.length = 0;
                    this.Divide();
                    break;
                }

            }

        };

    };

}