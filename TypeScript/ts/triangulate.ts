import Refs = require("Refs"); 

class Triangulate {
	static AddPoints(points: Refs.Point2D[]){
		for (let i = 0; i < points.length; i++) {
			console.log(points[i]);
		}
	}
}

export = Triangulate;