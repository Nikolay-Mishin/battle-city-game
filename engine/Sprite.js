;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)

	class Sprite extends GameEngine.DisplayObject {
		constructor (texture, args = {}) {
			super(args) // метод super вызывает родительский конструктор (доступ к родителю идет через super - super.funA())

			this.texture = texture // переданное изображение (спрайт)

			const frame = args.frame || {} // участок изображения, который требуется отрисовать (по умолчанию весь спрайт)
			// определяем параметры фрейма
			this.frame = {
				// координаты точки начала отрисовываемого участка
				x: frame.x || 0,
				y: frame.y || 0,
				// ширина и высота отрисовываемой области
				width: frame.width || texture.width,
				height: frame.height || texture.height
			}

			// если не передана ширина, устанавливаем значение из фрейма
			if (args.width === undefined) {
				this.width = this.frame.width
			}

			// если не передана высота, устанавливаем значение из фрейма
			if (args.height === undefined) {
				this.height = this.frame.height
			}
		}
		
		// отрисовывает спрайт на основе установленных свойств
		draw (canvas, context) {
			// вызываем родительский метод отрисовки и передаем callback-функцию
			super.draw(() => {
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
	
				context.restore() // восстанавливаем контекст
			})
		}
	}

	new Namespace(Sprite) // регистрируем класс Sprite
})();