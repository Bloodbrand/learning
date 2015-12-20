var Line = function (coord) {
	this.start = toCarthesian(coord.a);
	this.end = toCarthesian(coord.b);

	this.draw = function(){	
		ctx.beginPath();
		ctx.moveTo(this.start.x, this.start.y);		
		ctx.lineTo(this.end.x, this.end.y);		
		ctx.stroke();
    	ctx.closePath();
	}

	this.intersects = function(other){
		
	}

	function toCarthesian(c){
		return {x: width / 2 + c.x, y: height / 2 - c.y};
	}
};