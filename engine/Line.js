;(function () {
	'use strict'

	// отвечает за отрисовку линии

	class Line extends GameEngine.DisplayObject {
		constructor (args = {}) {
			super(args)

			this.color = args.color || 'red'
			this.x1 = args.x1 || 0
			this.y1 = args.y1 || 0
			this.x2 = args.x2 || 0
			this.y2 = args.y2 || 0
		}

		draw (canvas, context) {
			// вызываем метод отрисовки родителя
			super.draw(() => {
				context.strokeStyle = this.color // задаем цвет линии
				context.lineWidth = 1 // ширина линии

				context.beginPath()
				context.moveTo(this.x1, this.y1) // начальная точка
				context.lineTo(this.x2, this.y2) // конечная точка
				context.stroke() // отрисовываем линию
			})
		}
	}
	
	namespace.set(Line) // регистрируем класс Line
})();