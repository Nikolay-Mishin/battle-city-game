;(function () {
	'use strict'

	// отдельные сцены игры (меню, уровень, результат боя)
	// сцена - расширенный контейнер

	class Scene extends GameEngine.Container {
		constructor (args = {}) {
			super()

			this.autoStart = args.autoStart || false // запускать сцену автоматически или нет
			this.name = args.name || ''

			this.status = 'waiting' // статус сцены по умолчанию
			this.stage = this.displayObjects // хранилище объектов сцены (stage - алиас)
			this.game = null // ссылка на объект игры, к которой принадлежит сцена ()

			// loading, update и init переопределяем на уровне конструктора
			// bind(this) - копирует код функции и подменяет контекст(this - экземпляр данного класса)
			// без bind this бы ссылался на объект args при определении параметров экземпляра класса

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

		loading () {} // метод загрузки ресурсов
		init () {} // метод инициализации сцены - создает объекты загруженных ресурсов
		update () {} // метод обновления состояния спрайта
		beforeDestroy () {} // вызывается перед удалением сцены и удаляет все объекты, созданные сценой
	}

	new Namespace(Scene) // регистрируем класс Scene
})();