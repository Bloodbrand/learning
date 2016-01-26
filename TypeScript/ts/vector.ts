import Refs = require("Refs");

class Vector{
	static floatPrecision: number = 2;

	static Bisector(v1: Refs.Point2D, v2: Refs.Point2D): Refs.Point2D{
		let v1n: Refs.Point2D = this.Normalize(v1);
		let v2n: Refs.Point2D = this.Normalize(v2);
		let sum: Refs.Point2D = this.Add(v1n, v2n);
		return sum;
	}

	static Add(v1: Refs.Point2D, v2: Refs.Point2D): Refs.Point2D{
		return { x: v1.x + v2.x, y: v1.y + v2.y };
	}

	static Subtract(v1: Refs.Point2D, v2: Refs.Point2D): Refs.Point2D {
		return { x: v1.x + -v2.x, y: v1.y + -v2.y }
	}

	static Magnitude(v: Refs.Point2D): number{
		return Number(Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)).toFixed(this.floatPrecision));
	}

	static Normalize(v: Refs.Point2D): Refs.Point2D{
		let magnitude: number = this.Magnitude(v);
		return { x: v.x / magnitude, y: v.y / magnitude };
	}

	static Negative(v: Refs.Point2D): Refs.Point2D{
		return { x: v.x * -1, y: v.y * -1 };
	}

	static Scale(v: Refs.Point2D, length: number): Refs.Point2D{
		var n = this.Normalize(v);
		return { x: n.x * length, y: n.y * length };
	}

	static PointInPoly(v: Refs.Point2D, poly: Refs.Point2D[]){
		let x = v.x;
		let y = v.y;
		let inside = false;

		for (let i = 0, j = poly.length - 1; i < poly.length; j = i++){
			let xi = poly[i].x;
			let yi = poly[i].y;

			let xj = poly[j].x;
			let yj = poly[j].y;

			var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}
		return inside;
	}
}

export = Vector;