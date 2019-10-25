;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class MainController extends GameEngine.Controller {
		constructor (texture, args = {}) {
			super(texture, args)

			this.restore = ['jump'] // список событий, которые должны вызываться после завершения события (true => false)

			// параметры контроллера по умолчанию
			this.defaults = {
				speedMove: args.speedMove || 1, // скорость движения
				speedRotation: args.speedRotation || Math.PI / 200 // скорость поворота
			}
			
			// задаем дефолтные свойства контроллера на основе соответствующих параметров
			for (const prop of Object.keys(this.defaults)) {
				this[prop] = this.defaults[prop]
			}
		}

		eventUpdate (timestamp) {
			// this.rotation = timestamp / 1000
		}

		jump () {
			this.speedRotation = this.events.jump ? this.defaults.speedRotation * 2 : this.defaults.speedRotation // скорость поворота
			this.speedMove = this.events.jump ? this.defaults.speedMove * 2 : this.defaults.speedMove // скорость движения
		}

		moveUp() {
			console.log(this.speedMove)
			this.y -= this.speedMove
		}

		moveDown() {
			this.y += this.speedMove
		}

		moveRight() {
			this.rotation += this.speedRotation
		}

		moveLeft() {
			this.rotation -= this.speedRotation
		}
	}

	namespace.set(MainController, 'Controller') // регистрируем класс Game
})();