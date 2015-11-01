var Vector = function () {
return{
	floatPrecision: 2
	,
	draw: function(v, col){
		ctx.lineWidth = 2.5;
		ctx.font="15px Arial";

		if(col)ctx.strokeStyle = col;
		else ctx.strokeStyle = '#000000'

		var newX = width / 2 + v.x;
		var newY = height / 2 - v.y;
		ctx.beginPath();
		ctx.moveTo(width / 2, height / 2);
		ctx.lineTo(newX, newY);
		if(v.y < 0) newX -= 50;
		ctx.fillText(this.magnitude(v), newX, newY);
		ctx.stroke();
	}
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
			mag = (this.magnitude(v1) + this.magnitude(v2)) / 2; //just average of the two
		return this.scale(sum, mag);
	}
	,
	drawArc: function(v1, v2){
		//to do
	}
	,
	drawGraph: function () {
		gridSize = 10;
		for (var w = 0.5; w < width; w += gridSize) {
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(0,0,0,0.3)';
			ctx.moveTo(0, w);
			ctx.lineTo(width, w);

			ctx.moveTo(w, 0);
			ctx.lineTo(w, height);
			ctx.stroke();
		}

		//axis
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.moveTo(width / 2, 0);
		ctx.lineTo(width / 2, height);
		ctx.moveTo(0, height / 2);
		ctx.lineTo(width, height / 2);
		ctx.stroke();

	}
	,
	radToDeg: function (rad) { return rad * (180 / Math.PI) }
	,
	degToRad: function (deg) { return deg * (Math.PI /180) }
	,
	random: function(){
		return {
			x: Math.round((Math.random() * 2 - 1) * width / 2),
			y: Math.round((Math.random() * 2 - 1) * height / 2)
		}
	}
}
}();
