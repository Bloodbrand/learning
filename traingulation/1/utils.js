function randomNum (min, max){
	return Math.floor( Math.random() * (max - min + 1 ) + min );
}

function PointInTriangle (pt, tri) {
    function sign (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    var b1 = sign(pt, tri.a, tri.b) < 0;
    var b2 = sign(pt, tri.b, tri.c) < 0;
    var b3 = sign(pt, tri.c, tri.a) < 0;

    return ((b1 == b2) && (b2 == b3));    
}

function Magnitude (v) {
    return Number(Math.sqrt( Math.pow(v.x, 2) + Math.pow(v.y, 2) ).toFixed(2));
}

function Subtract (v1, v2){
    return { x: v1.x + -v2.x, y: v1.y + -v2.y };
}

function Vector2 (x, y) {
	this.x = x;
	this.y = y;
}

function Triangle (a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
}

