/**
 * Singleton
 * https://medium.com/@frontman/реализация-одиночки-в-js-20d64da9d44b
 * https://habr.com/ru/post/132472/
 * https://stackoverflow.com/questions/48366563/es6-singleton-vs-instantiating-a-class-once
 * Тип данных Symbol
 * https://learn.javascript.ru/symbol
 */

;const Singleton = (function () {
	'use strict'

	let singleton = Symbol()
	let singletonEnforcer = Symbol()

	class Singleton {

		constructor (enforcer) {
			if (enforcer !== singletonEnforcer) {
				try { throw "Instantiation failed: use Singleton.instance instead of new." }
				catch (err) { console.error(err) }
			}
			// код конструктора
			console.log(enforcer)
			console.log(singletonEnforcer)
		}

		static get instance () {
			if (!this[singleton])
				this[singleton] = new Singleton(singletonEnforcer)
			console.log(this[Symbol()])
			console.log(this[singleton])
			return this[singleton]
		}

		static set instance (v) {
			try { throw "Can't change constant property!" }
			catch (err) { console.error(err) }
		}
	}

	return Singleton
}());