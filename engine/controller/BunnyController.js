;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class MainController extends GameEngine.Controller {
		constructor (texture, args = {}) {
			super(texture, args)

			this.speedRotation = args.speedRotation || Math.PI / 200 // скорость поворота
			this.speedMove = args.speedMove || 1 // скорость движения
		}

		eventUpdate (timestamp) {
			this.rotation = timestamp / 1000
		}

		jump () {
			console.log(this)
			console.log(this.events)
			this.speedRotation = this.events.jump ? Math.PI / 100 : Math.PI / 200 // скорость поворота
			this.speedMove = this.events.jump ? 2 : 1 // скорость движения
		}

		moveUp() {
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