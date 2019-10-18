;(function () {
	'use strict'

	// занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
	// отвечает за отрисовку отдельного изображения (или его участка)
	// следит за всеми сценами

	class Game {
		constructor (args = {}) {
			this.renderer = new GameEngine.Renderer(args)
			this.loader = new GameEngine.Loader()
			this.scenesCollection = new GameEngine.Container()
			this.keyboard = new GameEngine.Keyboard()

			if (args.scenes) {
				this.addScene(...args.scenes)
			}

			if (args.el && args.el.appendChild) {
				args.el.appendChild(this.renderer.canvas)
			}

			const autoStartedScenes = this.scenes.filter(x => x.autoStart)

			for (const scene of autoStartedScenes) {
				scene.status = 'loading'
				scene.loading(this.loader)
			}

			this.loader.load(() => {
				for (const scene of autoStartedScenes) {
					scene.status = 'init'
					scene.init()
				}

				for (const scene of autoStartedScenes) {
					scene.status = 'started'
				}
			})

			requestAnimationFrame(timestamp => this.tick(timestamp))
		}

		addScene (...scenes) {
			this.scenesCollection.add(...scenes)

			for (const scene of scenes) {
				scene.parent = this
			}
		}

		get scenes () {
			return this.scenesCollection.displayObjects
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

		getScene (name) {
			if (name instanceof GameEngine.Scene) {
				if (this.scenes.includes(name)) {
					return name
				}
			}

			if (typeof name === 'string') {
				for (const scene of this.scenes) {
					if (scene.name === name) {
						return scene
					}
				}
			}
		}

		startScene (name) {
			const scene = this.getScene(name)

			if (!scene) {
				return false
			}
			
			scene.status = 'loading'
			scene.loading(this.loader)

			this.loader.load(() => {
				scene.status = 'init'
				scene.init()

				scene.status = 'started'
			})

			return true
		}

		finishScene (name) {
			const scene = this.getScene(name)

			if (!scene) {
				return false
			}

			scene.status = 'finished'
			this.scenesCollection.remove(scene)
			scene.beforeDestroy()

		}
	}

	// window.GameEngine = window.GameEngine || {}
	// window.GameEngine.Game = Game
	// регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
	namespace.set('BattleCityGame.GameEngine.Game', Game) // регистрируем класс Sprite в объекте GameEngine
	// BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();