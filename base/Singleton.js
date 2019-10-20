const Singleton = (function () {
	'use strict'

	let singleton = Symbol();
	let singletonEnforcer = Symbol();

	class Singleton {

		constructor(enforcer) {
			if (enforcer !== singletonEnforcer) {
				try { throw "Instantiation failed: use Singleton.getInstance() instead of new." }
				catch (err) { console.error(err) }
			}
			// код конструктора
		}

		static get instance() {
			if (!this[singleton])
				this[singleton] = new Singleton(singletonEnforcer)
			return this[singleton]
		}

		static set instance(v) {
			try { throw "Can't change constant property!" }
			catch (err) { console.error(err) }
		}
	}

	return Singleton
}());

/**
 * Singleton
 * https://habr.com/ru/post/132472/
 * https://stackoverflow.com/questions/48366563/es6-singleton-vs-instantiating-a-class-once
 * 
*/
/*
let singleton = Symbol();
let singletonEnforcer = Symbol();

class Singleton {

	constructor(enforcer) {
		if (enforcer !== singletonEnforcer)
			throw "Instantiation failed: use Singleton.getInstance() instead of new.";
		// код конструктора
	}

	static get instance() {
		if (!this[singleton])
			this[singleton] = new Singleton(singletonEnforcer);
		return this[singleton];
	}

	static set instance(v) { throw "Can't change constant property!" }
}
*/