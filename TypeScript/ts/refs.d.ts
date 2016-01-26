declare module Refs{
	export interface IHandler {
		name?: string;
		Update();
	}

	export interface Point2D{
		x: number;
		y: number;
	}

	export interface Point3D extends Point2D{
		z: number;
	}

	export interface ILevel{
		SpawnPoint: Point2D;
		Rooms: THREE.Mesh[];
		Doodads: THREE.Mesh[];
	}
}

export = Refs;