;const init = (function () {
	'use strict'

	const config = Symbol() // имя защищенного свойства объекта конфигурации

	// класс инициализации
	// служит для инициализации конфигурационных файлов проекта и задания пространств имен

	class Init extends Waiter {
		constructor (args = {}) {
			super() // наследуем конструктор родителя
			
			this.projectName = args.name // имя проекта/разработчика
			this.projectNamespace = args.namespace || null // основное пространство имен проекта

			// глобальное пространство имен
			Namespace.init = this.projectNamespace ? `${this.projectName}.${this.projectNamespace}` : this.projectName
			// this.namespace = new Namespace()
			this.namespace = Namespace.instance // регистрируем пространство имен BattleCityGame.GameEngine в объекте window

			this.project = window[`${this.projectName}`] // объект проекта приложения
			this.core = this.project[`${this.projectNamespace}`] // объект ядра приложения

			this.configPath = args.config // путь к файлу с конфигурацией
		}

		// геттер объекта конфигурации
		get config () {
			return this[config]
		}

		// сеттер объекта конфигурации
		set config (value) {
			this[config] = this[config] || value
		}

		setConfig (game) {
			game.keyboard.init(this.config.keyboard)
		}

		// загружает конфигурацию и выполняет переданную callback-функцию
		loadConfig (callback) {
			this.showPreloader() // показываем прелоадер и скрываем контент
			// если передан файл конфигурации - загружаем его
			if (this.configPath) {
				/* return this.wait(() => Init.getConfig(address))
					.then(json => {
						this.config = json[0] // объект с конфигурацией
					}) */
				const promise = Init.
					getConfig(this.configPath)
					.then(json => {
						this.config = json[0] // объект конфигурации
					})
				// выполняем все промисы и затем выполняем переданную callback-функцию
				return Promise.all([promise]).then(callback)
			}
			callback() // выполняем переданную callback-функцию
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