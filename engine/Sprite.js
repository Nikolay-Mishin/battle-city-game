;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)

	class Sprite extends GameEngine.DisplayObject {
		constructor (texture, args = {}) {
			super(args) // метод super вызывает родительский конструктор (доступ к родителю идет через super - super.funA())

			const frame = args.frame || {} // участок изображения, который требуется отрисовать (по умолчанию весь спрайт)
			const velocity = args.velocity || {}

			this.texture = texture // переданное изображение (спрайт)

			this.keysDefault = args.keysDefault || []

			this.frames = []
			this.frameNumber = 0
			this.frameDelay = 0

			this.animations = {}
			this.animation = ''
			this.animationPaused = false

			this.velocity = {
				x: velocity.x || 0,
				y: velocity.y || 0
			}

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

		setFramesCollection(framesCollection) {
			this.frames = framesCollection
		}

		setAnimationsCollection(animationsCollection) {
			this.animations = animationsCollection
		}

		startAnimation(name) {
			if (!this.animations.hasOwnProperty(name)) {
				return false
			}

			const { duration = Infinity, keys } = this.animations[name]

			this.animation = name
			this.frameDelay = duration / keys.length
			this.setFrameByKeys(...keys[0])
		}

		pauseAnimation() {
			this.animationPaused = true
		}

		resumeAnimation() {
			this.animationPaused = false
		}

		setFrameByKeys(...keys) {
			const frame = this.getFrameByKeys(...keys, ...this.keysDefault)

			if (!frame) {
				return false
			}

			this.frame.x = frame.x
			this.frame.y = frame.y
			this.frame.width = frame.width
			this.frame.height = frame.height

			this.width = this.frame.width
			this.height = this.frame.height
		}

		getFrameByKeys(...keys) {
			let flag = false

			for (const frame of this.frames) {
				flag = true

				for (const key of keys) {
					if (!frame.keys.includes(key)) {
						flag = false
						break
					}
				}

				if (flag) {
					return frame
				}
			}
		}

		tick(timestamp) {
			if (!this.animationPaused && this.animation && GameEngine.Util.delay(this.animation + this.uid, this.frameDelay)) {
				const { keys } = this.animations[this.animation]

				this.frameNumber = (this.frameNumber + 1) % keys.length
				this.setFrameByKeys(...keys[this.frameNumber])

				this.emit('frameChange', this)
			}

			this.x += this.velocity.x
			this.y += this.velocity.y
		}
		
		// отрисовывает спрайт на основе установленных свойств
		draw (canvas, context) {
			// вызываем родительский метод отрисовки и передаем callback-функцию
			super.draw(() => {
				context.save() // сохраняем текущее состояние контекста
				context.translate(this.x, this.y) // переназначает начало системы координат
				context.rotate(this.rotation) // поворачивает объект (по часовой стрелке)
				// context.scale(this.scaleX, this.scaleY) // масштабирует объект

				if (this.texture) {
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
						this.width * this.scaleX,
						this.height * this.scaleY
					)
				}
	
				context.restore() // восстанавливаем контекст
			})
		}
	}

	namespace.set(Sprite) // регистрируем класс Sprite
})();