var Vector = function () {
return {
	floatPrecision: 2
	,
	magnitude: function(v) {
		return Number(Math.sqrt( Math.pow(v.x, 2) + Math.pow(v.y, 2) ).toFixed(this.floatPrecision));
	}
	,
	dotProduct: function(v1, v2){
		return v1.x * v2.x + v1.y * v2.y;
	}
	,
	add: function(v1, v2) {
		return {x: (v1.x + v2.x), y: (v1.y + v2.y)}
	}
	,
	subtract: function(v1, v2){
		return {x: v1.x + -v2.x, y: v1.y + -v2.y}
	}
	,
	normalize: function (v) {
		var m = this.magnitude(v);
		return {x: v.x / m, y: v.y / m};
	}
	,
	negative: function (v) {
		return{x: v.x * -1, y: v.y * -1}
	}
	,
	adjacent: function (v) {
		return{
			right: {x: -v.y, y: v.x},
			left:  {x: v.y, y: -v.x}
		}			
	}
	,
	scale: function (v, len) {
		var n = this.normalize(v);
		return {x: n.x * len, y: n.y * len};
	}
	,
	angle: function (v1, v2) {
		var cosAng = this.dotProduct(v1, v2) / (this.magnitude(v1) * this.magnitude(v2));
		return this.radToDeg(Math.acos(cosAng));
	}
	,
	bisector: function (v1, v2) {
		var v1n = this.normalize(v1),
			v2n = this.normalize(v2),
			sum = this.add(v1n, v2n),
			mag = ( this.magnitude(v1) + this.magnitude(v2) ) / 2; 
		return this.scale(sum, mag);
	}
	,
	drawArc: function(v1, v2){
		//to do
	}
	,
	radToDeg: function (rad) { return rad * ( 180 / Math.PI ) }
	,
	degToRad: function (deg) { return deg * ( Math.PI / 180 ) }
	,
	random: function(){
		return {
			x: Math.round( (Math.random() * 2 - 1) * width  / 2),
			y: Math.round( (Math.random() * 2 - 1) * height / 2)
		}
	}
}
}();
