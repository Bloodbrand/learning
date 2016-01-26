/// <reference path="refs.d.ts"/>
import Refs = require("Refs");

class Updater{
	private static _handlers: Refs.IHandler[] = [];

	static Add(handler: Refs.IHandler) {
		this._handlers.push(handler);
	} 

	static Remove(handler: Refs.IHandler) {
		let index = this._handlers.indexOf(handler);
		if (index > -1) this._handlers.splice(index, 1);
	}

	static Clear(){
		this._handlers.length = 0;
	}

	static Update() {
		for (let i = 0; i < this._handlers.length; i++)
			this._handlers[i].Update();
	}
}

export = Updater;