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
			this.currentScene = null // текущая активная сцена
			this.status = 'waiting' // статус игры по умолчанию

			console.log('game ' + this.status)
			this.status = 'config loading' // меняем статус
			console.log('game ' + this.status)

			// загружаем конфигурацию игры
			init.loadConfig(() => {
				this.status = 'config loaded' // меняем статус
				console.log('game ' + this.status)
				console.log(init)
				init.setConfig(this) // устанавливаем настройки на основе хагруженной конфигурации

				// загружаем игру

				this.status = 'loading' // меняем статус
				console.log('game ' + this.status)

				// если передан родительский элемент для установки канваса и в него можно поместить дочерние элементы
				// устанавливаем канвас в целевой элемент
				if (args.el && args.el.appendChild) {
					args.el.appendChild(this.renderer.canvas)
				}

				// коллекция - работает с переданными аргументами, как с массивом
				// можно передать как коллекцию, так и 1 аргумент - add(...scenes), remove(scene)

				// добавляем сцены, если они заданы
				if (args.scenes) {
					this.addScene(...args.scenes) // передаем сцены в виде коллекции
				}

				// получаем массив всех сцен с активным флагом autoStart
				const autoStartedScenes = this.scenes.filter(x => x.autoStart)

				// вызываем метод загрузки ресурсов
				this.startScene(...autoStartedScenes) // загружаем ресурсы из очереди контейнера и инициализируем сцену
				
				requestAnimationFrame(timestamp => this.tick(timestamp)) // метод отрисовки фреймов (обновляется 60р в сек)
			})
		}

		// геттер для получения сцен из контейнера
		get scenes () {
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

		// устанавливает ресурсы сцены в очередь на загрузку
		loadScene (...scenes) {
			for (const scene of scenes) {
				scene.status = 'loading' // меняем статус
				scene.loading(this.loader) // вызываем загрузчик ресурсов
			}
		}

		// загружает/инициализирует ресурсы сцены, установленные в очереди
		initScene (...scenes) {
			// сначала грузим все ресурсы, а потом уже отрисовываем актуальный набор ресурсов
			// чтобы не грузить самостоятельными объектами вспомогательные ресурсы,
			// которые нужны исключительно для формирования другого ресурса а не как самостоятельный объект

			this.status = 'resources loading' // меняем статус
			console.log('game ' + this.status)

			// для каждой сцены с автостартом задаем статус и вызываем метод предзагрузки ресурсов (добавление в очередь загрузки)
			this.loadScene(...scenes) // устанавливаем ресурсы сцены в очередь на загрузку

			this.loader.load(() => {
				this.status = 'resources loaded' // меняем статус
				console.log('game ' + this.status)
				this.status = 'scenes init' // меняем статус
				console.log('game ' + this.status)

				for (const scene of scenes) {
					scene.status = 'init'
					scene.init() // инициализируем сцену
					scene.status = 'started'
				}

				this.currentScene = scenes

				this.status = 'scenes inited' // меняем статус
				console.log('game ' + this.status)

				init.showContent() // показываем контент и скрываем прелоадер
				this.status = 'started' // меняем статус
				console.log('game ' + this.status)
				console.log(this)
			})
		}

		// уничтожает инициализированную сцену
		destroyScene (...scenes) {
			for (const scene of scenes) {
				scene.status = 'finished' // меняем статус
				this.scenesCollection.remove(scene) // удаляем сцену
				scene.beforeDestroy() // вызывается перед удалением сцены и удаляет все объекты, созданные сценой
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

		// стартует сцену
		startScene (...names) {
			const scenes = this.findScene(...names)
			if (scenes) {
				this.initScene(...scenes) // загружаем установленные в очереди ресурсы
				return true
			}
			let noStartScenes = names.join(', ')
			try { throw `Can't start scenes: ${noStartScenes}!` }
			catch (err) {
				console.error(err)
				$('.preloader .content').html($('.preloader .content').html() + '<br>' + err)
			}
			return false
		}

		// останавливает сцену
		finishScene (...names) {
			const scenes = this.findScene(...names)
			if (scenes) {
				this.destroyScene(...scenes) // удаляем сцену
				return true
			}
			return false
		}

		// находит сцену по имени
		findScene (...names) {
			// ищем сцену в контейнере
			let scenes = []
			for (const name of names) {
				names.shift() // удаляем первый элемент массива
				const scene = this.getScene(name) // получаем сцену
				if (scene) {
					scenes.push(scene)
				}
				else break
			}

			// выбрасываем исключание, если в массиве переданных имен остались элементы (не все сцены найдены) 
			if (names.length !== 0) {
				let noFindScenes = names.join(', ')
				try { throw `Can't find scenes: ${noFindScenes}!` }
				catch (err) {
					console.error(err)
					$('.preloader .content').html(err)
				}
			}

			return names.length === 0 ? scenes : false // если сцена не найдена, возвращаем false
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

		// останавливает текущуюю сцену и запускает новую
		changeScene (scenes, action = null) {
			// action - изменение сцены по событию (Event)
			// если action не передан или равен false, ничего не делаем
			if (action !== null && !action) {
				return false
			}

			init.showPreloader() // показываем прелоадер и скрываем контент
			this.finishScene(...this.currentScene) // останавливаем текущую сцену
			return this.startScene(...scenes) // стартуем указанную сцену
		}
	}

	namespace.set(Game) // регистрируем класс Game
})();