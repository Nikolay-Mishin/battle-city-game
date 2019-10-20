;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class MainController extends GameEngine.Controller {
		constructor(args = {}) {
			super(args)
		}
	}

	namespace.set(MainController, 'Controller') // регистрируем класс Game
})();