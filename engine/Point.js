;(function () {
	'use strict'

	// отвечает за отрисовку точки

	class Point extends GameEngine.DisplayObject {
		constructor (args = {}) {
			super(args)

			this.color = args.color || 'red'
		}

		draw (canvas, context) {
			// вызываем метод отрисовки родителя
			super.draw(() => {
				context.fillStyle = this.color // цвет точки
				context.beginPath()
				// координаты x,y - 
				context.arc(this.x, this.y, 3, 0, Math.PI * 2) //параметры точки
				context.fill() // отрисовываем точку
			})
		}
	}
	
	namespace.set('BattleCityGame.GameEngine.Point', Point) // регистрируем класс Point в объекте GameEngine
})();