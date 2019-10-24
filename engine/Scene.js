;(function () {
	'use strict'

	const sceneObjects = Symbol()
	const sceneControllers = Symbol()

	// отдельные сцены игры (меню, уровень, результат боя)
	// сцена - расширенный контейнер

	class Scene extends GameEngine.Container {
		constructor (args = {}) {
			super(args)

			this.autoStart = args.autoStart || false // запускать сцену автоматически или нет
			this.name = args.name || ''

			this.status = 'waiting' // статус сцены по умолчанию
			this.stage = this.displayObjects // хранилище объектов? отображаемых на сцене (stage - алиас)
			this.sceneObjects = {} // контейнер объектов сцены (this.bunny, this.tank...)
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

		// контейнер объектов сцены (this.wall, this.bunny, this.tank...)

		get sceneObjects () {
			return this[sceneObjects]
		}

		set sceneObjects (value) {
			this[sceneObjects] = value
		}

		get sceneControllers() {
			return this.stage.filter(x => x instanceof Controller)
		}

		loading () {} // метод загрузки ресурсов
		init () {} // метод инициализации сцены - создает объекты загруженных ресурсов
		update () {} // метод обновления состояния спрайта
		beforeDestroy () { } // вызывается перед удалением сцены и удаляет все объекты, созданные сценой

		// вызывает события контроллеров сцены (this.bunny, this.tank...)
		eventControllers(timestamp) {
			const { keyboard } = this.parent
			const currentEvent = keyboard.event // текущие (выполнияемые) события клавиатуры

			for (const controller of this.sceneControllers) {
				// вызываем метод контроллера для динамического обновления (не зависящих от событий контроллера)
				if (controller.eventUpdate) {
					controller.eventUpdate(timestamp)
				}

				// обрабатываем все ьекущие события на клавиатуре
				if (currentEvent) {
					// для каждого активного события вызываем метод контроллера
					console.log(controller.events)
					for (const event of currentEvent) {
						// вызываем соответствующее событие у всех контроллеров, которые имеют это событие
						if (controller[event]) {
							controller.events[event] = keyboard.events[event] // получаем значение флага для данного события
							controller[event]() // вызывает метод контроллера по имени события
						}
					}
					console.log(controller.events)
				}
				/*
				// вызываем методы контроллера из свойства restore, которые завершились (не входят в массив currentEvent)
				for (const restore of controller.restore) {
					if (!currentEvent.includes(restore)) {
						controller.events[restore] = keyboard.events[restore] // получаем значение флага для данного события
						controller[restore]() // вызывает метод контроллера по имени события
					}
				}
				console.log(controller.events)
				*/
			}
		}
	}

	namespace.set(Scene) // регистрируем класс Scene
})();