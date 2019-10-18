;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class Game {
		constructor (args = {}) {
			this.renderer = new GameEngine.Renderer(args) // объект рендера (инициализируем канвас)
			this.loader = new GameEngine.Loader() // объект загрузчика
			this.scenesCollection = new GameEngine.Container() // коллекция (массив) сцен - объект контейнера
			this.keyboard = new GameEngine.Keyboard() // объект клавиатуры

			// коллекция - работает с переданными аргументами, как с массивом
			// можно передать как коллекцию, так и 1 аргумент - add(...scenes), remove(scene)

			// добавляем сцены, если они заданы
			if (args.scenes) {
				this.addScene(...args.scenes) // передаем сцены в виде коллекции
			}

			// если передан родительский элемент для установки канваса и в него можно поместить дочерние элементы
			// устанавливаем канвас в целевой элемент
			if (args.el && args.el.appendChild) {
				args.el.appendChild(this.renderer.canvas)
			}

			// получаем массив всех сцен с активным флагом autoStart
			const autoStartedScenes = this.scenes.filter(x => x.autoStart)

			// сначала грузим все ресурсы, а потом уже отрисовываем актуальный набор ресурсов
			// чтобы не грузить самостоятельными объектами вспомогательные ресурсы,
			// которые нужны исключительно для формирования другого ресурса а не как самостоятельный объект

			// для каждой сцены с автостартом задаем статус и вызываем метод предзагрузки ресурсов (добавление в очередь загрузки)
			for (const scene of autoStartedScenes) {
				scene.status = 'loading'
				scene.loading(this.loader) // передаем загрузчик в качестве параметра
			}

			// вызываем метод загрузки ресурсов
			this.loader.load(() => {
				for (const scene of autoStartedScenes) {
					scene.status = 'init'
					scene.init() // инициализируем сцену
				}

				for (const scene of autoStartedScenes) {
					scene.status = 'started'
				}
			})

			requestAnimationFrame(timestamp => this.tick(timestamp)) // метод отрисовки фреймов (обновляется 60р в сек)
		}

		// геттер для получения сцен из контейнера
		get scenes() {
			return this.scenesCollection.displayObjects
		}

		// добавляет переданную коллекцию сцен в контейнер
		addScene (...scenes) {
			this.scenesCollection.add(...scenes) // добавляем в контейнер

			// для каждой сцены устанавливаем родительскую игру
			for (const scene of scenes) {
				scene.parent = this
			}
		}

		// вызывается при каждом обновлении фрейма (60р в сек)
		tick (timestamp) {
			const startedScenes = this.scenes.filter(x => x.status === 'started')

			// вызываем метод обновления и передаем ему время (скорость отрисовки - частоту обновления)
			for (const scene of startedScenes) {
				scene.update(timestamp)
			}
			
			this.renderer.clear() // очищаем область рендера

			 // перендериваем графику - вызываем из контейнера метод отрисовки отображаемых объектов
			for (const scene of startedScenes) {
				scene.draw(this.renderer.canvas, this.renderer.context)
			}

			requestAnimationFrame(timestamp => this.tick(timestamp)) // рекурсивно вызываем функцию tick для обновления фреймов
		}

		// получает сцену по имени
		getScene (name) {
			// если передан объект сцены, ищет такой элемент в коллекции
			if (name instanceof GameEngine.Scene) {
				if (this.scenes.includes(name)) {
					return name
				}
			}

			// если передано имя в виде строки, проходим в цикле по коллекции сцен и ищем совпдание имена
			if (typeof name === 'string') {
				for (const scene of this.scenes) {
					if (scene.name === name) {
						return scene
					}
				}
			}
		}

		// стартует сцену
		startScene (name) {
			const scene = this.getScene(name) // получаем сцену

			// если сцена не найдена, возвращаем false
			if (!scene) {
				return false
			}
			
			scene.status = 'loading' // меняем статус
			scene.loading(this.loader) // вызываем загрузчик ресурсов

			// загружаем установленные в очереди ресурсы
			this.loader.load(() => {
				scene.status = 'init'
				scene.init() // инициализируем сцену

				scene.status = 'started'
			})

			return true
		}

		// останавливает сцену
		finishScene (name) {
			const scene = this.getScene(name) // получаем сцену

			// если сцена не найдена, возвращаем false
			if (!scene) {
				return false
			}

			scene.status = 'finished' // меняем статус
			this.scenesCollection.remove(scene) // удаляем сцену
			scene.beforeDestroy() // вызывается перед удалением сцены и удаляет все объекты, созданные сценой

		}
	}

	// window.GameEngine = window.GameEngine || {}
	// window.GameEngine.Game = Game
	// регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
	namespace.set('BattleCityGame.GameEngine.Game', Game) // регистрируем класс Sprite в объекте GameEngine
	// BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();