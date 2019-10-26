;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class MainController extends GameEngine.Controller {
		constructor (texture, args = {}) {
			super(texture, args, {
				restore: ['jump'], // список событий, которые должны вызываться после завершения события (true => false)
				defaults: {
					jumpAccel: 2
				}
			})
		}

		eventUpdate (timestamp) {
			// this.rotation = timestamp / 1000
		}

		jump () {
			// скорость поворота
			this.speedRotation = this.events.jump ? this.defaults.speedRotation * this.jumpAccel : this.defaults.speedRotation
			// скорость движения
			this.speedMove = this.events.jump ? this.defaults.speedMove * this.jumpAccel : this.defaults.speedMove
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

	namespace.set(MainController, 'Controller') // регистрируем класс MainController
})();