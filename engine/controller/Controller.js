; (function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class Controller extends GameEngine.Body {
		constructor (texture, args = {}) {
			super(texture, args)
			this.events = {} // объект флагов (boolean) событий нажатия клавиш
		}

		eventsInit () {
			const events = this.parent.parent.keyboard.events // настройки клавиатуры { event: key }
			for (const event of Object.keys(events)) {
				// проверяем есть ли в контроллере метод с именем данного события
				if (this[event]) {
					this.events[event] = events[event]
				}
			}
			console.log(this.events)
		}
	}

	namespace.set(Controller) // регистрируем класс Game
})();