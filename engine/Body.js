;(function () {
	'use strict'

	// тело спрайта - Collider
	// отвечает за пересечение (столкновение) 2 объектов

	class Body extends GameEngine.Sprite {
		constructor (texture, args = {}) {
			super(texture, args)

			const body = args.body || {}

			this.debug = args.debug || false // флаг для отображения тела спрайта

			this.static = args.static || false

			// тело спрайта
			this.body = {}
			this.body.x = body.x || 0
			this.body.y = body.y || 0
			this.body.width = body.width || 1
			this.body.height = body.height || 1
		}

		get bodyRect() {
			return {
				x: this.absoluteX + this.width * this.scaleX * this.body.x,
				y: this.absoluteY + this.height * this.scaleY * this.body.y,
				width: this.width * this.scaleX * this.body.width,
				height: this.height * this.scaleY * this.body.height
			}
		}

		get tops() {
			const { x, y, width, height } = this.bodyRect

			return [
				[x, y],
				[x + width, y],
				[x, y + height],
				[x + width, y + height]
			]
		}

		isInside(x, y) {
			return GameEngine.Util.isInside({ x, y }, this.bodyRect)
		}

		// отрисовывает спрайт на основе установленных свойств
		draw (canvas, context) {
			// если объект не отображается (скрыт), ничего не делаем
			if (!this.visible) {
				return
			}

			context.save() // сохраняем текущее состояние контекста
			context.translate(this.x, this.y) // переназначает начало системы координат
			context.rotate(this.rotation) // поворачивает объект (по часовой стрелке)
			context.scale(this.scaleX, this.scaleY) // масштабирует объект

			// отрисовываем спрайт
			context.drawImage(
				this.texture,
				this.frame.x,
				this.frame.y,
				// ширину и высоту не умножаем на масштаб, тк scale используется в момент отрисовки спрайта
				this.frame.width,
				this.frame.height,
				// абсолютные координаты для отрисовки указывает без учета смещения (translate)
				this.absoluteX - this.x,
				this.absoluteY - this.y,
				this.width,
				this.height
			)

			// отображает тело спрайта (collider - отвечает за определение пересечения объектов)
			if (this.debug) {
				const { x, y, width, height } = this.bodyRect

				context.fillStyle = 'rgba(255, 0, 0, 0.2)' // устанавливаем цвет
				context.beginPath() // начинаем отрисовку объекта
				// создаем прямоугольную область
				context.rect(x - this.x, y - this.y, width, height)
				//context.rect(
				//	this.absoluteX - this.x + this.body.x * this.width,
				//	this.absoluteY - this.y + this.body.y * this.height,
				//	this.width * this.body.width,
				//	this.height * this.body.height
				//)
				context.fill() // отрисовываем объект

				context.fillStyle = 'rgb(0, 255, 0)'
				context.beginPath()
				context.arc(0, 0, 3, 0, Math.PI * 2)
				context.fill()
			}

			context.restore() // восстанавливаем контекст
		}
	}

	namespace.set(Body) // регистрируем класс Body
})();