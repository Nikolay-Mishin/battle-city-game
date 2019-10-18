;(function () {
	'use strict'

	// отдельные сцены игры (меню, уровень, результат боя)
	// сцена - расширенный контейнер

	/*
		autoStart - запускать сцену автоматически или нет
		по умолчанию false

		loading, update и init переопределяем на уровне конструктора
		bind(this) - копирует код функции и подменяет контекст (this - экземпляр данного класса)
		без bind this бы ссылался на объект args при определении параметров экземпляра класса

		loading - отвечает за загрузку ресурсов
		init - инициализирует (создает объекты) ресурсы

		parent - ссылается на Game
		this.add - вызываем метод контейнер и добавляем объект
		delete удаляет свойство из объекта
	*/

	class Scene extends GameEngine.Container {
		constructor (args = {}) {
			super()

			this.autoStart = args.autoStart || false
			this.name = args.name || ''

			this.status = 'waiting'
			this.stage = this.displayObjects
			this.game = null

			if (args.loading) {
				this.loading = args.loading.bind(this)
			}

			if (args.init) {
				this.init = args.init.bind(this)
			}

			if (args.update) {
				this.update = args.update.bind(this)
			}

			if (args.beforeDestroy) {
				this.beforeDestroy = args.beforeDestroy.bind(this)
			}
		}

		loading () {}
		init () {}
		update () {}
		beforeDestroy () {}
	}

	// window.GameEngine = window.GameEngine || {}
	// window.GameEngine.Scene = Scene
	// регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
	namespace.set('BattleCityGame.GameEngine.Scene', Scene) // регистрируем класс Sprite в объекте GameEngine
	// BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();