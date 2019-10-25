; (function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class Controller extends GameEngine.Body {
		constructor (texture, args = {}) {
			super(texture, args)
			this.keyboard = {} // объект клавиатуры
			this.events = {} // объект флагов (boolean) событий нажатия клавиш
			this.restore = [] // список событий, которые должны вызываться после завершения события (true => false)
		}

		// инициализирует список событий для данного контроллера на основе общего списка событий клавиатуры
		eventsInit() {
			this.keyboard = this.parent.parent.keyboard // объект клавиатуры
			this.events = this.keyboard.events // объект флагов (boolean) событий нажатия клавиш
			console.log(this.keyboard)
			console.log(this.events)
		}

		// вызывает у контроллера методы, соответствующие активным и завершенным (свойство restore) события клавиатуры
		event (timestamp) {
			// вызываем метод контроллера для динамического обновления (не зависящих от событий контроллера)
			if (this.eventUpdate) {
				this.eventUpdate(timestamp)
			}

			// обрабатываем все текущие события на клавиатуре
			if (this.keyboard.event.length > 0) {
				// вызываем соответствующие события у контроллера
				for (const event of this.keyboard.event) {
					if (this[event]) {
						this[event]() // вызываем метод контроллера по имени события
					}
				}
				console.log(this.events)
			}
			
			// обрабатываем все завершенные события на клавиатуре
			if (this.keyboard.stopEvent.length > 0) {
				console.log(this.events)
				// вызываем методы контроллера из свойства restore - события, которые завершились
				for (const restore of this.restore) {
					this.events[restore] = this.keyboard.events[restore] // получаем значение флага для данного события
					this[restore]() // вызывает метод контроллера по имени события
				}
				this.keyboard.stopEvent = null // обнуляем текущий список завершенных событий
				console.log('stopEvent: ' + this.keyboard.stopEvent)
				console.log(this.events)
			}
		}
	}

	namespace.set(Controller) // регистрируем класс Game
})();