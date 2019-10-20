;const init = (function () {
	'use strict'

	// класс инициализации
	// служит для инициализации конфигурационных файлов проекта и задания пространств имен

	class Init extends Waiter {
		constructor (args = {}) {
			super() // наследуем конструктор родителя
			
			this.projectName = args.name // имя проекта/разработчика
			this.projectNamespace = args.namespace || null // основное пространство имен проекта

			// глобальное пространство имен
			Namespace.init = this.projectNamespace ? `${this.projectName}.${this.projectNamespace}` : this.projectName
			// регистрируем пространство имен BattleCityGame.GameEngine в объекте window
			this.namespace = new Namespace()
			this.instance = Namespace.instance
			console.log(this.instance)

			this.project = window[`${this.projectName}`] // объект проекта приложения
			this.core = this.project[`${this.projectNamespace}`] // объект ядра приложения

			this.config // объект с конфигурацией
			// если передан файл конфигурации - загружаем его
			if (args.config) {
				this.setConfig(args.config, args, () => {
					console.log(this.config)
				})
			}
		}

		setConfig (address, args, callback) {
			this.showPreloader() // показываем прелоадер и скрываем контент
			/*
			this.wait(() => Init.getConfig(address))
				.then(json => {
					for (const prop of Object.keys(json[0])) {
						this[prop] = json[0][prop]
					}
					this.project = window[`${this.projectSettings.name}`]
					this.core = this.Project[`${this.projectSettings.namespace}`]
					this.namespace = `${this.projectSettings.name}.${this.projectSettings.namespace}`
					console.log('=> Project namespace initiolized')
					new Namespace // регистрируем пространство имен BattleCityGame.GameEngine в объекте window
					this.showContent() // показываем контент и скрываем прелоадер
				})
			*/
			const promise = Init.
				getConfig(address)
				.then(json => {
					this.config = json[0] // объект с конфигурацией
					this.showContent() // показываем контент и скрываем прелоадер
				})
			Promise.all([promise]).then(callback) // выполняем все промисы
		}

		static getConfig (address) {
			return new Promise((resolve, reject) => {
				// отправляем ajax-запрос и получаем json-файл
				// fetch - аналог ajax, который возвращает Promise
				fetch(address)
					.then(result => result.json()) // интерпретируем result как json
					.then(result => resolve(result)) // подписываемся на результат получения данных (файла)
					.catch(err => reject(err)) // отлавливаем ошибки (catch - подписываемся на ошибки)
			})
		}
	}

	return new Init(projectSettings)
})();